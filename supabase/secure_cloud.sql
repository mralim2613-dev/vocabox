-- Run against the Vocabox project, after its four base tables exist.
-- Existing learning data is retained. No client can access those tables directly.
begin;
-- Older deployments used auth.users IDs. Adapt only empty legacy tables;
-- populated tables require an explicit account mapping, never guessed ownership.
do $$
declare t text; constraint_name text; populated boolean;
begin
  foreach t in array array['user_progress','custom_decks','custom_items'] loop
    if not exists(select 1 from information_schema.columns where table_schema='public' and table_name=t and column_name='user_number') then
      execute format('lock table public.%I in access exclusive mode',t);
      execute format('select exists(select 1 from public.%I)',t) into populated;
      if populated then raise exception 'Legacy table % needs an explicit user mapping before migration',t; end if;
      execute format('alter table public.%I add column user_number text not null references public.licenses(user_number) on delete cascade',t);
      if t in ('custom_decks','custom_items') then
        select conname into constraint_name from pg_constraint where conrelid=format('public.%I',t)::regclass and contype='p';
        if constraint_name is not null then execute format('alter table public.%I drop constraint %I',t,constraint_name); end if;
        execute format('alter table public.%I add primary key(user_number,id)',t);
      else
        execute format('alter table public.%I add unique(user_number,item_id)',t);
      end if;
      execute format('alter table public.%I alter column user_id drop not null',t);
    end if;
    execute format('create index if not exists %I on public.%I(user_number)','idx_'||t||'_user_number',t);
  end loop;
end $$;
create schema if not exists extensions;
create extension if not exists pgcrypto with schema extensions;
create schema if not exists vocabox_private;
revoke all on schema vocabox_private from public, anon, authenticated;

create table if not exists vocabox_private.credentials (
  user_number text primary key references public.licenses(user_number) on delete cascade,
  key_hash text not null
);
create table if not exists vocabox_private.sessions (
  token_hash text primary key,
  user_number text not null references public.licenses(user_number) on delete cascade,
  expires_at timestamptz not null default now()+interval '30 days'
);
create table if not exists vocabox_private.snapshots (
  user_number text primary key references public.licenses(user_number) on delete cascade,
  snapshot jsonb not null,
  revision bigint not null default 1
);
alter table vocabox_private.credentials enable row level security;
alter table vocabox_private.sessions enable row level security;
alter table vocabox_private.snapshots enable row level security;
revoke all on all tables in schema vocabox_private from public, anon, authenticated;

do $$
declare t text; p record; f record;
begin
  foreach t in array array['licenses','user_progress','custom_decks','custom_items'] loop
    execute format('alter table public.%I enable row level security',t);
    execute format('revoke all on table public.%I from public, anon, authenticated',t);
    for p in select policyname from pg_policies where schemaname='public' and tablename=t loop
      execute format('drop policy %I on public.%I',p.policyname,t);
    end loop;
  end loop;
  for f in select proc.oid::regprocedure signature from pg_proc proc join pg_namespace n on n.oid=proc.pronamespace
    where n.nspname='public' and proc.proname in ('create_licenses','delete_user_account','handle_new_user') loop
    execute format('alter function %s set search_path = %L',f.signature,'');
    execute format('revoke execute on function %s from public, anon, authenticated',f.signature);
    execute format('grant execute on function %s to service_role',f.signature);
  end loop;
end $$;

-- Only an administrator can issue/rotate a 256-bit package access key.
create or replace function public.vocabox_provision_access_key(number text)
returns text language plpgsql security definer set search_path='' as $$
declare secret text:=encode(extensions.gen_random_bytes(32),'hex'); clean text:=upper(trim(number));
begin
  if not exists(select 1 from public.licenses where user_number=clean and is_active) then
    raise exception 'Aktiv istifadəçi nömrəsi tapılmadı.';
  end if;
  insert into vocabox_private.credentials values(clean,extensions.crypt(secret,extensions.gen_salt('bf',12)))
    on conflict(user_number) do update set key_hash=excluded.key_hash;
  delete from vocabox_private.sessions where user_number=clean;
  return secret;
end $$;
revoke execute on function public.vocabox_provision_access_key(text) from public,anon,authenticated;
grant execute on function public.vocabox_provision_access_key(text) to service_role;

create or replace function vocabox_private.account_for_token(token text)
returns text language plpgsql security definer set search_path='' as $$
declare account text;
begin
  select s.user_number into account from vocabox_private.sessions s
    join public.licenses l on l.user_number=s.user_number
    where s.token_hash=encode(extensions.digest(token,'sha256'),'hex') and s.expires_at>now() and l.is_active;
  if account is null then raise exception 'Sessiya bitib. Giriş açarı ilə yenidən daxil olun.' using errcode='28000'; end if;
  return account;
end $$;
revoke execute on function vocabox_private.account_for_token(text) from public,anon,authenticated;

create or replace function public.vocabox_login(number text, access_key text)
returns jsonb language plpgsql security definer set search_path='' as $$
declare clean text:=upper(trim(number)); account public.licenses%rowtype; hash text; token text;
begin
  -- Keys are generated by the administrator, never a short user-chosen password.
  if access_key is null or access_key !~ '^[a-f0-9]{64}$' then raise exception 'Nömrə və ya giriş açarı düzgün deyil.' using errcode='28000'; end if;
  select * into account from public.licenses where user_number=clean and is_active;
  select key_hash into hash from vocabox_private.credentials where user_number=clean;
  if account.user_number is null or hash is null or extensions.crypt(access_key,hash)<>hash then
    raise exception 'Nömrə və ya giriş açarı düzgün deyil.' using errcode='28000';
  end if;
  token:=encode(extensions.gen_random_bytes(32),'hex');
  delete from vocabox_private.sessions where expires_at<now();
  insert into vocabox_private.sessions(token_hash,user_number) values(encode(extensions.digest(token,'sha256'),'hex'),clean);
  update public.licenses set activated_at=coalesce(activated_at,now()) where user_number=clean;
  return jsonb_build_object('user_number',clean,'language',account.language,'token',token);
end $$;

create or replace function public.vocabox_session(session_token text)
returns jsonb language plpgsql security definer set search_path='' as $$
declare account text:=vocabox_private.account_for_token(session_token);
begin
  return (select jsonb_build_object('user_number',user_number,'language',language) from public.licenses where user_number=account);
end $$;

create or replace function public.vocabox_pull(session_token text)
returns jsonb language plpgsql security definer set search_path='' as $$
declare account text:=vocabox_private.account_for_token(session_token); result jsonb; legacy jsonb;
begin
  select jsonb_build_object('snapshot',snapshot,'revision',revision) into result from vocabox_private.snapshots where user_number=account;
  if result is not null then return result; end if;
  legacy:=jsonb_build_object(
    'decks',coalesce((select jsonb_agg(jsonb_build_object('id',id,'name',name,'language',language,'kind','custom')) from public.custom_decks where user_number=account),'[]'::jsonb),
    'items',coalesce((select jsonb_agg(jsonb_build_object('id',id,'deckId',deck_id,'language',language,'type',type,'term',term,'translation',translation,'definition',definition,'example',example,'cefrLevels',cefr_levels)) from public.custom_items where user_number=account),'[]'::jsonb),
    'progress',coalesce((select jsonb_object_agg(item_id,jsonb_build_object('level',level,'reviews',reviews,'correct',correct,'last',last)) from public.user_progress where user_number=account),'{}'::jsonb));
  return jsonb_build_object('snapshot',null,'revision',0,'legacy',legacy);
end $$;

create or replace function public.vocabox_push(session_token text, snapshot jsonb, expected_revision bigint)
returns jsonb language plpgsql security definer set search_path='' as $$
declare account text:=vocabox_private.account_for_token(session_token); current_revision bigint;
begin
  if snapshot is null or jsonb_typeof(snapshot)<>'object' or octet_length(snapshot::text)>50000000
     or snapshot->>'storageSchema' is distinct from 'vocabox-patch-v1' then raise exception 'Lüğət məlumatı düzgün deyil.'; end if;
  if expected_revision is null or expected_revision<0 then raise exception 'Versiya düzgün deyil.'; end if;
  -- Serialize writes for this account and compare revisions to avoid lost updates.
  perform 1 from public.licenses where user_number=account for update;
  select revision into current_revision from vocabox_private.snapshots where user_number=account;
  current_revision:=coalesce(current_revision,0);
  if current_revision<>expected_revision then return jsonb_build_object('conflict',true,'revision',current_revision); end if;
  insert into vocabox_private.snapshots(user_number,snapshot,revision) values(account,snapshot,current_revision+1)
    on conflict(user_number) do update set snapshot=excluded.snapshot,revision=excluded.revision;
  return jsonb_build_object('conflict',false,'revision',current_revision+1);
end $$;

create or replace function public.vocabox_logout(session_token text)
returns boolean language plpgsql security definer set search_path='' as $$
begin
  delete from vocabox_private.sessions where token_hash=encode(extensions.digest(session_token,'sha256'),'hex');
  return true;
end $$;

create or replace function public.vocabox_delete_account(session_token text)
returns boolean language plpgsql security definer set search_path='' as $$
declare account text:=vocabox_private.account_for_token(session_token);
begin
  -- All data, sessions and the license are removed in a single transaction.
  delete from public.user_progress where user_number=account;
  delete from public.custom_items where user_number=account;
  delete from public.custom_decks where user_number=account;
  delete from public.licenses where user_number=account;
  return true;
end $$;

revoke execute on function public.vocabox_login(text,text), public.vocabox_session(text), public.vocabox_pull(text), public.vocabox_push(text,jsonb,bigint), public.vocabox_logout(text), public.vocabox_delete_account(text) from public,anon,authenticated;
grant execute on function public.vocabox_login(text,text), public.vocabox_session(text), public.vocabox_pull(text), public.vocabox_push(text,jsonb,bigint), public.vocabox_logout(text), public.vocabox_delete_account(text) to anon,authenticated;
notify pgrst,'reload schema';
commit;
