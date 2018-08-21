export default class WidgetWheel {
  constructor(el, options = {}) {
    this.valFrom = options.from || 10;
    this.valTo = options.to || 30;
    this.initialVal = options.initial || 20;
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
    
    this.cursorPosition = 90;
    //console.log(spokes);
    this.updateSpokes();
  }

  // updateCursorPosition() {
  //   const valRange = this.valTo - this.valFrom + 1;
  //   //this.cursorPosition = 
  // }

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