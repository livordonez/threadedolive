-- Surface Moments in public navigation alongside Makes and Muses.
update public.navigation_items
set visible = true,
    display_order = 3
where href = '/moments';

update public.navigation_items
set display_order = 4
where href = '/about';

update public.navigation_items
set display_order = 0
where href = '/';

update public.navigation_items
set display_order = 1
where href = '/makes';

update public.navigation_items
set display_order = 2
where href = '/muses';
