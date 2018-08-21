export default class Modal {
  constructor(el) {
    this.el = el;
    this.buttons = el.querySelectorAll('.modal__btn');
    this.pageBody = document.querySelector('body');

    this.buttons.forEach(button => {
      button.addEventListener('click', () => this.close());
    });
  }

  open() {
    this.pageBody.classList.add('open-modal');
    this.el.classList.add('modal--active');
  }

  close() {
    this.pageBody.classList.remove('open-modal');
    this.el.classList.remove('modal--active');
  }

}