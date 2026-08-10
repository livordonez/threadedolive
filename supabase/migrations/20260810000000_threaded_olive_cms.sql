create extension if not exists pgcrypto;

create table public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admin_users where user_id = (select auth.uid())
  );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to anon, authenticated;

create table public.makes (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  title text not null default '',
  craft_type text not null default '',
  completion_date date,
  story text not null default '',
  materials text not null default '',
  pattern text not null default '',
  pattern_designer text not null default '',
  pattern_link text not null default '',
  tool_size text not null default '',
  modifications text not null default '',
  process_notes text not null default '',
  lessons text not null default '',
  images jsonb not null default '[]'::jsonb check (jsonb_typeof(images) = 'array'),
  status text not null default 'draft' check (status in ('draft', 'published')),
  display_order integer not null default 0,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.pages (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  title text not null default '',
  introduction text not null default '',
  sections jsonb not null default '[]'::jsonb check (jsonb_typeof(sections) = 'array'),
  status text not null default 'draft' check (status in ('draft', 'published')),
  show_in_navigation boolean not null default false,
  navigation_label text not null default '',
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.about_content (
  id uuid primary key default gen_random_uuid(),
  singleton boolean not null default true unique check (singleton),
  bio text not null default '',
  story text not null default '',
  images jsonb not null default '[]'::jsonb check (jsonb_typeof(images) = 'array'),
  instagram_url text not null default '',
  pinterest_url text not null default '',
  updated_at timestamptz not null default now()
);

create table public.site_settings (
  id uuid primary key default gen_random_uuid(),
  singleton boolean not null default true unique check (singleton),
  site_name text not null default 'Threaded Olive',
  short_description text not null default 'A thoughtful archive of handmade fiber arts.',
  instagram_url text not null default '',
  pinterest_url text not null default '',
  footer_text text not null default 'Made slowly and shared thoughtfully.',
  updated_at timestamptz not null default now()
);

create table public.navigation_items (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  href text not null,
  visible boolean not null default true,
  display_order integer not null default 0,
  page_id uuid references public.pages(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (href)
);

insert into public.about_content (bio, story) values ('', '');
insert into public.site_settings (site_name) values ('Threaded Olive');
insert into public.navigation_items (label, href, display_order) values
  ('Home', '/', 0),
  ('About', '/about', 1);

alter table public.admin_users enable row level security;
alter table public.makes enable row level security;
alter table public.pages enable row level security;
alter table public.about_content enable row level security;
alter table public.site_settings enable row level security;
alter table public.navigation_items enable row level security;

create policy "Admins can see their membership" on public.admin_users
  for select to authenticated using (user_id = (select auth.uid()));

create policy "Published makes are public" on public.makes
  for select using (status = 'published' or public.is_admin());
create policy "Admins manage makes" on public.makes
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "Published pages are public" on public.pages
  for select using (status = 'published' or public.is_admin());
create policy "Admins manage pages" on public.pages
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "About is public" on public.about_content for select using (true);
create policy "Admins manage about" on public.about_content
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "Settings are public" on public.site_settings for select using (true);
create policy "Admins manage settings" on public.site_settings
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "Visible navigation is public" on public.navigation_items
  for select using (visible or public.is_admin());
create policy "Admins manage navigation" on public.navigation_items
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'threaded-olive',
  'threaded-olive',
  true,
  15728640,
  array['image/jpeg', 'image/png', 'image/webp', 'image/avif']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

create policy "Public can view Threaded Olive images" on storage.objects
  for select using (bucket_id = 'threaded-olive');
create policy "Admins upload Threaded Olive images" on storage.objects
  for insert to authenticated with check (
    bucket_id = 'threaded-olive' and public.is_admin()
  );
create policy "Admins update Threaded Olive images" on storage.objects
  for update to authenticated using (
    bucket_id = 'threaded-olive' and public.is_admin()
  ) with check (bucket_id = 'threaded-olive' and public.is_admin());
create policy "Admins remove Threaded Olive images" on storage.objects
  for delete to authenticated using (
    bucket_id = 'threaded-olive' and public.is_admin()
  );

create index makes_public_order on public.makes (status, display_order, published_at desc);
create index pages_public_slug on public.pages (status, slug);
create index navigation_public_order on public.navigation_items (visible, display_order);
