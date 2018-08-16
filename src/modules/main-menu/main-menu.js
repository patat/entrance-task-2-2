export default function mainMenu() {
  const container = document.querySelector('.main-menu__container');
  const burger = document.querySelector('.main-menu__burger');

  burger.addEventListener('click', () => {
    container.classList.toggle('main-menu__container--hidden');
    burger.classList.remove('main-menu__burger-icon--active');
    console.log('click');
  });

  burger.addEventListener('pointerdown', () => {
    burger.classList.add('main-menu__burger-icon--active');
  });

  /* 
   * Menu Items
   */
   const menuItems = document.querySelectorAll('.main-menu__item');
   let currActiveMenuItem = 0;
   menuItems.forEach((menuItem, index) => {
    menuItem.addEventListener('click', function(ev) {
      menuItems[currActiveMenuItem].classList.remove('main-menu__item--active');
      this.classList.add('main-menu__item--active');
      currActiveMenuItem = index;
    });
   });
}