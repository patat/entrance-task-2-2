export default class WidgetSlider {
  constructor(el, options = {}) {
    this.sliderCursor = el.querySelector('.slider__cursor');
    this.isVertical = window.innerWidth < 1366;
    this.cursorDisplacement = Number.parseInt(this.sliderCursor.style.left, 10) || 0;

    this.sliderCursor.style.left = this.cursorDisplacement + 'px';

    this.tracking = false;

    this.sliderCursor.addEventListener('pointerdown', ev => this.sliderStart(ev), true);
    this.sliderCursor.addEventListener('pointermove', ev => this.sliderMove(ev), true);
    this.sliderCursor.addEventListener('pointerup', ev => this.sliderEnd(ev), true);
    this.sliderCursor.addEventListener('pointercancel', ev => this.sliderEnd(ev), true);
  
  }


  sliderStart(ev) {
    if (!this.tracking) {
      this.sliderCursor.setPointerCapture(ev.pointerId);
      this.cursorDisplacement = Number.parseInt(this.sliderCursor.style.left, 10);
      if (Number.isNaN(this.cursorDisplacement)) {
        this.cursorDisplacement = 0;
      }
      this.minDisplacement = 0;
      this.maxDisplacement = this.sliderCursor.parentElement.offsetWidth - this.sliderCursor.offsetWidth;
      this.prevCoord = this.isVertical ? ev.clientY : ev.clientX;
      this.tracking = true;
    }
  }

  sliderMove(ev) {
    if (this.tracking) {
      const currCoord = (this.isVertical ? ev.clientY : ev.clientX);
      let delta = currCoord - this.prevCoord;
      if (this.isVertical) delta = -delta;
      this.prevCoord = currCoord;
      let nextDisplacement = this.cursorDisplacement + delta;

      if (nextDisplacement < this.minDisplacement) {
        nextDisplacement = this.minDisplacement;
      } else if ( nextDisplacement > this.maxDisplacement) {
        nextDisplacement = this.maxDisplacement;
      }

      this.cursorDisplacement = nextDisplacement;

      requestAnimationFrame(() => {
        if (this.isVertical) {
          this.sliderCursor.style.left = nextDisplacement + 'px';
          return;
        }

        this.sliderCursor.style.left = nextDisplacement + 'px';
      });
    }
  }

  sliderEnd() {
    if (this.tracking) {
      this.tracking = false;
    }
  }
}