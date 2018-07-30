export default function() {
  const burger = document.getElementById('header-menu-burger');
  const menu = document.getElementById('header-menu');

  burger.addEventListener('click', function() {
    menu.classList.toggle('header-menu--active');
  });
}