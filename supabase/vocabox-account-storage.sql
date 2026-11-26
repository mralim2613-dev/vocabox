begin;

create table if not exists public.vocabox_account_state (
  user_id uuid primary key references auth.users(id) on delete cascade,
  snapshot jsonb not null check (
    jsonb_typeof(snapshot) = 'object'
    and octet_length(snapshot::text) <= 8388608
  ),
  revision bigint not null default 1 check (revision > 0)
);

alter table public.vocabox_account_state enable row level security;
revoke all on public.vocabox_account_state from public, anon, authenticated;
grant select, insert, update on public.vocabox_account_state to authenticated;

drop policy if exists vocabox_read_own_state on public.vocabox_account_state;
create policy vocabox_read_own_state on public.vocabox_account_state
  for select to authenticated using ((select auth.uid()) = user_id);

drop policy if exists vocabox_insert_own_state on public.vocabox_account_state;
create policy vocabox_insert_own_state on public.vocabox_account_state
  for insert to authenticated with check ((select auth.uid()) = user_id);

drop policy if exists vocabox_update_own_state on public.vocabox_account_state;
create policy vocabox_update_own_state on public.vocabox_account_state
  for update to authenticated using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

commit;
