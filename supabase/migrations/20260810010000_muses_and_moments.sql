create table public.muses (
  id uuid primary key default gen_random_uuid(),
  title text not null default '',
  category text not null default '',
  note text not null default '',
  source_name text not null default '',
  source_url text not null default '',
  images jsonb not null default '[]'::jsonb check (jsonb_typeof(images) = 'array'),
  status text not null default 'draft' check (status in ('draft', 'published')),
  display_order integer not null default 0,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.moments (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  title text not null default '',
  excerpt text not null default '',
  body text not null default '',
  moment_date date not null default current_date,
  images jsonb not null default '[]'::jsonb check (jsonb_typeof(images) = 'array'),
  status text not null default 'draft' check (status in ('draft', 'published')),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.muses enable row level security;
alter table public.moments enable row level security;

create policy "Published muses are public" on public.muses
  for select using (status = 'published' or public.is_admin());
create policy "Admins manage muses" on public.muses
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "Published moments are public" on public.moments
  for select using (status = 'published' or public.is_admin());
create policy "Admins manage moments" on public.moments
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

create index muses_public_order on public.muses (status, display_order, published_at desc);
create index moments_public_date on public.moments (status, moment_date desc);

update public.navigation_items set display_order = display_order + 4;
insert into public.navigation_items (label, href, display_order) values
  ('Makes', '/makes', 1),
  ('Muses', '/muses', 2),
  ('Moments', '/moments', 3)
on conflict (href) do update set label = excluded.label, visible = true, display_order = excluded.display_order;
update public.navigation_items set display_order = 4 where href = '/about';
update public.navigation_items set display_order = 0 where href = '/';
