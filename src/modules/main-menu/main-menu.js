export default function mainMenu() {
  const container = document.querySelector('.main-menu__container');
  const menu = document.querySelector('.main-menu')
  const burger = document.querySelector('.main-menu__burger');

  burger.addEventListener('click', () => {
    container.classList.toggle('main-menu__container--active');
    menu.classList.toggle('main-menu--active');
    burger.classList.remove('main-menu__burger-icon--active');
    console.log('click');
  });

  burger.addEventListener('pointerdown', () => {
    burger.classList.add('main-menu__burger-icon--active');
  });
}