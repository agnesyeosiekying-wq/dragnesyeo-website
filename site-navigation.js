(() => {
 const header = document.getElementById('site-header');
 const button = document.getElementById('site-menu-toggle');
 const nav = document.getElementById('site-navigation');
 if (!header || !button || !nav) return;
 const menus = [...nav.querySelectorAll('details')];
 header.classList.add('site-menu-ready');
 button.hidden = false;
 function closeMenu() {
   header.classList.remove('site-menu-open');
   button.setAttribute('aria-expanded', 'false');
   button.textContent = 'Menu';
   menus.forEach(menu => menu.open = false);
 }
 button.addEventListener('click', () => {
   const open = header.classList.toggle('site-menu-open');
   button.setAttribute('aria-expanded', String(open));
   button.textContent = open ? 'Close menu' : 'Menu';
 });
 menus.forEach(menu => menu.addEventListener('toggle', () => {
   if (menu.open) menus.forEach(other => { if (other !== menu) other.open = false; });
 }));
 nav.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
 document.addEventListener('click', event => { if (!header.contains(event.target)) closeMenu(); });
 document.addEventListener('keydown', event => {
   if (event.key !== 'Escape') return;
   const open = menus.find(menu => menu.open);
   if (open) { open.open = false; open.querySelector('summary').focus(); }
   else if (header.classList.contains('site-menu-open')) { closeMenu(); button.focus(); }
 });
 window.matchMedia('(max-width:1100px)').addEventListener('change', closeMenu);
 nav.querySelector('.site-contact').addEventListener('click', () => {
   window.dataLayer = window.dataLayer || [];
   window.dataLayer.push({event: 'whatsapp_click', page: location.pathname});
 });
})();