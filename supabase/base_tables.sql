-- ========================================================
-- Vocabox - İstifadəçi Nömrəsi və Dil Məhdudiyyəti (SQL)
-- ========================================================

-- 1. İstifadəçi Nömrələri / Lisenziyalar cədvəli
-- Hər istifadəçi nömrəsi konkret 1 dilə bağlanır (en, ru, de, fr, it, es)
create table if not exists public.licenses (
  user_number text primary key,
  language text not null default 'en' check (language in ('en', 'ru', 'de', 'fr', 'it', 'es')),
  is_active boolean default true,
  notes text default '',
  activated_at timestamptz,
  created_at timestamptz default now()
);

-- Əgər cədvəl artıq mövcuddursa, language sütununu əlavə edirik
alter table public.licenses add column if not exists language text not null default 'en';

-- 2. İstifadəçi Tərəqqisi (Sözlərin qutu səviyyələri və statistikası)
create table if not exists public.user_progress (
  id uuid primary key default gen_random_uuid(),
  user_number text not null references public.licenses(user_number) on delete cascade,
  item_id text not null,
  level int not null default 3,
  reviews int not null default 0,
  correct int not null default 0,
  last bigint default 0,
  updated_at timestamptz default now(),
  unique (user_number, item_id)
);

-- 3. Fərdi Dəstlər (İstifadəçinin yaratdığı lüğət dəstləri)
create table if not exists public.custom_decks (
  id text not null,
  user_number text not null references public.licenses(user_number) on delete cascade,
  name text not null,
  language text not null,
  created_at timestamptz default now(),
  primary key (user_number, id)
);

-- 4. Fərdi Kartlar (İstifadəçinin əlavə etdiyi söz və ifadələr)
create table if not exists public.custom_items (
  id text not null,
  user_number text not null references public.licenses(user_number) on delete cascade,
  deck_id text not null,
  language text not null,
  type text not null,
  term text not null,
  translation text not null,
  definition text default '',
  example text default '',
  cefr_levels text[] default '{}',
  created_at timestamptz default now(),
  primary key (user_number, id)
);

-- İndekslər
create index if not exists idx_progress_user_number on public.user_progress(user_number);
create index if not exists idx_custom_decks_user_number on public.custom_decks(user_number);
create index if not exists idx_custom_items_user_number on public.custom_items(user_number);

