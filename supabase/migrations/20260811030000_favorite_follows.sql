create table if not exists public.favorite_follows (
  id uuid primary key default gen_random_uuid(),
  name text not null default '',
  url text not null default '',
  avatar jsonb not null default '{}'::jsonb check (jsonb_typeof(avatar) = 'object'),
  description text not null default '',
  handle text not null default '',
  youtube_channel_id text not null default '',
  display_order integer not null default 0,
  visible boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.favorite_follows enable row level security;

drop policy if exists "Visible favorite follows are public" on public.favorite_follows;
drop policy if exists "Admins manage favorite follows" on public.favorite_follows;

create policy "Visible favorite follows are public" on public.favorite_follows
  for select using (visible or public.is_admin());

create policy "Admins manage favorite follows" on public.favorite_follows
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

create index if not exists favorite_follows_public_order
  on public.favorite_follows (visible, display_order, created_at);

insert into public.favorite_follows (
  name,
  url,
  avatar,
  description,
  youtube_channel_id,
  display_order,
  visible
)
select
  'Syd Graham',
  'https://www.youtube.com/@HiSydGraham',
  '{"url":"/images/creators/syd-graham.jpg","path":"local:syd-graham","alt":"Portrait of Syd Graham"}'::jsonb,
  'Patterns, photography, and a quietly personal approach to making.',
  'UCeD1USYxuRnh3yfiydz6cTQ',
  0,
  true
where not exists (
  select 1 from public.favorite_follows
  where url = 'https://www.youtube.com/@HiSydGraham'
);

insert into public.favorite_follows (
  name,
  url,
  avatar,
  description,
  display_order,
  visible
)
select
  'Bethany Ciotola',
  'https://www.instagram.com/bethanyciotola/?hl=en',
  '{"url":"/images/creators/bethany-ciotola.jpg","path":"local:bethany-ciotola","alt":"Portrait of Bethany Ciotola"}'::jsonb,
  'A favorite source of everyday visual inspiration.',
  1,
  true
where not exists (
  select 1 from public.favorite_follows
  where url = 'https://www.instagram.com/bethanyciotola/?hl=en'
);

notify pgrst, 'reload schema';
