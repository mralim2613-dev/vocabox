const menuButton = document.getElementById('mobileNavButton');
const navigation = document.querySelector('header nav');
const menu = document.createElement('dialog');
menu.id = 'mobileNavigation';
menu.setAttribute('aria-label', 'Əsas menyu');
const close = document.createElement('button');
close.type = 'button';
close.className = 'small';
close.textContent = 'Bağla';
const links = navigation.cloneNode(true);
menu.append(close, links);
document.body.append(menu);
menuButton.setAttribute('aria-haspopup', 'dialog');
menuButton.setAttribute('aria-controls', menu.id);
menuButton.addEventListener('click', () => menu.showModal());
close.addEventListener('click', () => menu.close());
menu.addEventListener('click', (event) => {
  if (event.target === menu || event.target.closest('[data-tab]')) menu.close();
});
matchMedia('(max-width: 680px)').addEventListener('change', (event) => {
  if (!event.matches && menu.open) menu.close();
});
