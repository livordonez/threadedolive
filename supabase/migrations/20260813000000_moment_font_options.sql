alter table public.moments
  add column if not exists title_font text not null default 'caveat',
  add column if not exists body_font text not null default 'caveat';
