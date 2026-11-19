const menu = document.querySelector('.menu');
const links = document.getElementById('nav-links');
menu.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open));
  links.classList.toggle('open', open);
});
links.addEventListener('click', event => {
  if (event.target.closest('a')) { links.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); }
});
document.getElementById('year').textContent = new Date().getFullYear();
