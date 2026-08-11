alter table public.site_settings
  alter column site_name set default 'The Threaded Olive';

update public.site_settings
set site_name = 'The Threaded Olive'
where site_name = 'Threaded Olive';

update public.navigation_items
set visible = false
where href = '/moments';

update public.navigation_items
set display_order = 3
where href = '/about';
