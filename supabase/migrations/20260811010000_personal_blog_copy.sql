alter table public.site_settings
  alter column short_description set default 'Things I make, wear, read & love.';

update public.site_settings
set short_description = 'Things I make, wear, read & love.'
where short_description = 'A thoughtful archive of handmade fiber arts.';
