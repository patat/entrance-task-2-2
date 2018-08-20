export default function initSwipeGesture(el) {
  const swipeLeft = new Event('swipeLeft');
  const swipeRight = new Event('swipeRight');
  const thresholdTime = 5000;
  const thresholdDistance = 5;
  const begin = {};
  const end = {};
  let inProgress = false;

  const gestureBegin = function(e) {
    inProgress = true;
    begin.t = new Date().getTime();
    begin.x = e.clientX;
    begin.y = e.clientY;
  };

  const gestureMove = function(e) {
    if (inProgress) {
      e.preventDefault();
      end.x = e.clientX;
      end.y = e.clientY;
    }
  }

  const gestureEnd = function(e) {
    if (inProgress) {
      inProgress = false;
      const now = new Date().getTime();
      const deltaTime = now - begin.t;
      const deltaX = end.x - begin.x;
      const deltaY = end.y - begin.y;
      /* work out what the movement was */
      if (deltaTime > thresholdTime) {
        /* gesture too slow */
        return;
      } else {
        if ((deltaX > thresholdDistance) && (Math.abs(deltaY) < thresholdDistance)) {
          el.dispatchEvent(swipeRight);
        }

        if ((-deltaX > thresholdDistance) && (Math.abs(deltaY) < thresholdDistance)) {
          el.dispatchEvent(swipeLeft);
        }
      }
    }
  }

  el.addEventListener('pointerdown', gestureBegin, false);
  el.addEventListener('pointermove', gestureMove, false);
  el.addEventListener('pointerup', gestureEnd, false);
  el.addEventListener('pointerleave', gestureEnd, false);
  el.addEventListener('pointercancel', gestureEnd, false);
}