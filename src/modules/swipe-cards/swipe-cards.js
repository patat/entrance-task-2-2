import initSwipeGesture from '../../js/initSwipeGesture';

export default function swipeCards(cardsClass, options = {}) {
  let viewportWidth = window.innerWidth;

  // desktop only
  if (viewportWidth < 1366) return;

  const swipeCards = document.querySelector(cardsClass);

  // add hiding hint to events scroll
  if (cardsClass === '.swipe-cards--events') {
    const scrollHint = swipeCards.querySelector('.swipe-cards__hint');
    const swipeCardsContainer = swipeCards.querySelector('.swipe-cards__container');
    swipeCardsContainer.addEventListener('scroll', function() {
      scrollHint.classList.add('swipe-cards__hint--hidden');
    }, { once: true});
    return;
  }

  // initialize carousel
  initCardsCarousel(swipeCards, options);
}

function initCardsCarousel(swipeCards, options) {
  const swipeCardsContainer = swipeCards.querySelector('.swipe-cards__container');
  const swipeCardsSlide = swipeCards.querySelector('.swipe-cards__slide');
  const slideWidth = swipeCardsSlide.offsetWidth;
  const cards = swipeCardsSlide.querySelectorAll('.swipe-cards__card');



  if (cards.length > options.perSlide) {
    const swipeCardsControls = swipeCards.parentNode.parentNode.querySelector('.swipe-cards__controls');
    const numSlides = Math.floor(cards.length / options.perSlide) + 1;
    const swipeCardsControlPrev = swipeCardsControls.querySelector('.swipe-cards__control--prev');
    const swipeCardsControlNext = swipeCardsControls.querySelector('.swipe-cards__control--next');
    let currContainerTranslate = 0;
    let isBeginning = true;
    let isEnd = false;

    // container element listens to swipeLeft & swipeRight events
    initSwipeGesture(swipeCardsContainer);

    // wrap each batch of cards into slide, then remove initial slide
    for (let i = 0; i < numSlides; i++) {
      const newSlide = swipeCardsSlide.cloneNode();
      console.log('new slide', newSlide);
      for (let j = i * options.perSlide; j < (i+1) * options.perSlide; j++) {
        if (i === numSlides - 1 && j === cards.length) break;
        const newCard = cards[j].cloneNode(true);
        newSlide.appendChild(newCard);
        console.log('new card', newSlide);
      }
      newSlide.style.left = slideWidth * i;
      newSlide.style.width = slideWidth;
      swipeCardsContainer.appendChild(newSlide);
    }
    swipeCardsContainer.removeChild(swipeCardsSlide);
    swipeCardsContainer.style.width = slideWidth * numSlides;

    // prev control disabled by default
    swipeCardsControlPrev.classList.add('swipe-cards__control--disabled');

    const moveContainer = function() {
      isBeginning = currContainerTranslate === 0;
      isEnd = currContainerTranslate === slideWidth * (1 - numSlides);
      if (isEnd) {
        swipeCardsControlNext.classList.add('swipe-cards__control--disabled');
      } else {
        swipeCardsControlNext.classList.remove('swipe-cards__control--disabled');
      }
      if (isBeginning) {
        swipeCardsControlPrev.classList.add('swipe-cards__control--disabled');
      } else {
        swipeCardsControlPrev.classList.remove('swipe-cards__control--disabled');
      }

      swipeCardsContainer.style.transform = `translateX(${currContainerTranslate}px)`;
    }

    const nextSlide = function() {
      if (!isEnd) {
        currContainerTranslate -= slideWidth;
        moveContainer();
      }
    }

    const prevSlide = function() {
      if (!isBeginning) {
        currContainerTranslate += slideWidth;
        moveContainer();
      }
    }

    swipeCardsControlNext.addEventListener('click', nextSlide, false);
    swipeCardsControlPrev.addEventListener('click', prevSlide, false);
    swipeCardsContainer.addEventListener('swipeLeft', nextSlide, false);
    swipeCardsContainer.addEventListener('swipeRight', prevSlide, false);
  }
}