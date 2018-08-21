export default class WidgetWheel {
  constructor(el) {
    this.spokesNum = 120;
    this.step = 2.5;
    this.degrees = [...Array(this.spokesNum).keys()]
                    .map(item => item - Math.floor(this.spokesNum / 2))
                    .map(item => item * this.step);
    const spokes = this.degrees.map(degree => {
      const spoke = document.createElement('div');
      spoke.classList.add('wheel__spoke');
      spoke.style.transform = `rotate(${degree}deg)`;
      return spoke;
    });

    this.disc = el.querySelector('.wheel__disc');

    spokes.forEach(spoke => {
      this.disc.appendChild(spoke);
    });

    this.spokes = document.querySelectorAll('.wheel__spoke');
    this.cursorPosition = 100;
    //console.log(spokes);
    this.updateSpokes();
  }

  updateSpokes() {
    window.requestAnimationFrame(() => {
      for (let i = 0; i <= this.cursorPosition; i++) {
        this.spokes[i].classList.add('wheel__spoke--active');
      }
      for (let i = this.cursorPosition + 1; i < this.spokes.length; i++) {
        this.spokes[i].classList.remove('wheel__spoke--active');
      }
    });
  }
}