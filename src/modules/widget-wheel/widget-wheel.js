export default class WidgetWheel {
  constructor(el, options = {}) {
    this.valFrom = options.from || 10;
    this.valTo = options.to || 30;
    this.initialVal = options.initial || 20;
    this.spokesNum = 120;
    this.step = 2.5;
    this.spokeAngles = [...Array(this.spokesNum).keys()]
                    .map(item => item - Math.floor(this.spokesNum / 2))
                    .map(item => item * this.step);
    const spokes = this.spokeAngles.map(degree => {
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
    this.cursor = document.querySelector('.wheel__cursor-container');
    this.cursorPosition = 90;

    this.updateSpokes();

    this.tracking = false;
    this.disc.addEventListener('pointerdown', ev => this.wheelStart(ev), true);
    this.disc.addEventListener('pointermove', ev => this.wheelMove(ev), true);
    this.disc.addEventListener('pointerup', ev => this.wheelEnd(ev), true);
    this.disc.addEventListener('pointercancel', ev => this.wheelEnd(ev), true);
  }

  updateSpokes() {
    window.requestAnimationFrame(() => {
      for (let i = 0; i < this.cursorPosition; i++) {
        this.spokes[i].classList.add('wheel__spoke--active');
      }
      for (let i = this.cursorPosition; i < this.spokes.length; i++) {
        this.spokes[i].classList.remove('wheel__spoke--active');
      }

      if (this.cursorPosition === this.spokes.length - 1) {
        this.spokes[this.cursorPosition].classList.add('wheel__spoke--active');
      }
    });
  }

  updateCursor() {
    window.requestAnimationFrame(() => {
      this.cursor.style.transform = `rotate(${this.spokeAngles[this.cursorPosition] + this.step / 2}deg)`;
    });
  }

  wheelStart(ev) {
    if (!this.tracking) {
      this.disc.setPointerCapture(ev.pointerId);

      this.pointerPoint = {
        x: ev.clientX,
        y: ev.clientY
      };

      const discBoundingRect = this.disc.getBoundingClientRect();
      this.centerPoint = {
        x: discBoundingRect.left + this.disc.offsetWidth / 2,
        y: discBoundingRect.top + this.disc.offsetHeight / 2
      };

      this.pointerAngle = 0;

      this.tracking = true;
    }
  }

  wheelMove(ev) {
    if (this.tracking) {
      const newPointerPoint = {
        x: ev.clientX,
        y: ev.clientY
      };

      const deltaAngle = this._calcAngle(this.centerPoint, this.pointerPoint, newPointerPoint);

      let nextCursorPosition = this.cursorPosition + Math.floor(deltaAngle / this.step);

      if (nextCursorPosition < 0) {
        nextCursorPosition = 0;
        this.tracking = false;
      }
      if (nextCursorPosition >= this.spokeAngles.length) {
        nextCursorPosition = this.spokeAngles.length - 1;
        this.tracking = false;
      }

      this.cursorPosition = nextCursorPosition;
      if (this.prevCursorPosition !== this.cursorPosition) {
        this.prevCursorPosition = this.cursorPosition;
        this.pointerPoint = newPointerPoint;
        this.updateCursor();
        this.updateSpokes();
      }
    }
  }

  wheelEnd(ev) {
    if (this.tracking) {
      this.tracking = false;
    }
  }

  _calcAngle(center, point1, point2) {
    const vec1 = {
      x: point1.x - center.x,
      y: point1.y - center.y
    };
    const vec2 = {
      x: point2.x - center.x,
      y: point2.y - center.y
    };

    const dotProduct = vec1.x * vec2.x + vec1.y * vec2.y;
    const tripleProduct = vec1.x * vec2.y - vec1.y * vec2.x;

    // in rad
    const angle = Math.atan2(tripleProduct, dotProduct);

    // in deg
    return angle * 180 / Math.PI;
  }
}