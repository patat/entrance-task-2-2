import initSwipeGesture from '../../js/initSwipeGesture';

export default function swipeCards(cardsClass, options = {}) {
  let viewportWidth = window.innerWidth;
  const swipeCards = document.querySelector(cardsClass);
  const cards = swipeCards.querySelectorAll('.swipe-cards__card');

  if (viewportWidth < 1366) {
    if (cardsClass === '.swipe-cards--devices') {
      initFiltersDropdown(swipeCards);
      initFiltering(cards);
    }
    return;
  }

  // add hiding hint to events scroll
  if (cardsClass === '.swipe-cards--events') {
    const scrollHint = swipeCards.querySelector('.swipe-cards__hint');
    const swipeCardsContainer = swipeCards.querySelector('.swipe-cards__container');
    swipeCardsContainer.addEventListener('scroll', function() {
      scrollHint.classList.add('swipe-cards__hint--hidden');
    }, { once: true});
    return;
  }

  const swipeCardsContainer = swipeCards.querySelector('.swipe-cards__container');
  const swipeCardsControls = swipeCards.parentNode.parentNode.querySelector('.swipe-cards__controls');
  const swipeCardsControlPrev = swipeCardsControls.querySelector('.swipe-cards__control--prev');
  const swipeCardsControlNext = swipeCardsControls.querySelector('.swipe-cards__control--next');
  
  let numSlides = Math.floor(cards.length / options.perSlide) + (cards.length % options.perSlide === 0 ? 0 : 1);

  let slideWidth = 0;
  let currContainerTranslate = 0;
  let isBeginning = true;
  let isEnd = numSlides === 1;
  let isSlidesShifted = false;
  
  initCardsCarousel(cards);

  if (cardsClass === '.swipe-cards--devices') {
    initFiltering(cards);
  }


  function initCardsCarousel(cards, numSlides) {
    const swipeCardsSlides = swipeCards.querySelectorAll('.swipe-cards__slide');
    // in rems
    slideWidth = options.perSlide * 13.4375;
    if (cardsClass === '.swipe-cards--scripts') {
      // in pixels
      slideWidth = swipeCardsSlides[0].offsetWidth;
    }
    

    console.log(slideWidth);

    numSlides = Math.floor(cards.length / options.perSlide) + (cards.length % options.perSlide === 0 ? 0 : 1);

    if (numSlides > 1) {
      swipeCardsControls.classList.remove('swipe-cards__controls--hidden');
    }

    currContainerTranslate = 0;
    let slideShift = 0;
    isSlidesShifted = false;
    if (cardsClass === '.swipe-cards--devices') {
      slideShift = 2.1875;
      isSlidesShifted = true;
    }
    isBeginning = true;
    isEnd = numSlides === 1;
    
    // container element listens to swipeLeft & swipeRight events
    initSwipeGesture(swipeCardsContainer);

    // remove all slides before adding new
    swipeCardsSlides.forEach(slide => {
      swipeCardsContainer.removeChild(slide);
    })

    // wrap each batch of cards into slide, then remove initial slide
    for (let i = 0; i < numSlides; i++) {
      const newSlide = swipeCardsSlides[0].cloneNode();
      for (let j = i * options.perSlide; j < (i+1) * options.perSlide; j++) {
        if (i === numSlides - 1 && j === cards.length) break;
        const newCard = cards[j].cloneNode(true);
        newSlide.appendChild(newCard);
      }
      newSlide.style.left = (slideWidth * i + slideShift) + (isSlidesShifted ? 'rem' : 'px');
      newSlide.style.width = slideWidth + (isSlidesShifted ? 'rem' : 'px');
      swipeCardsContainer.appendChild(newSlide);
    }
    
    swipeCardsContainer.style.width = (slideWidth * numSlides) + (isSlidesShifted ? 'rem' : 'px');;

    // prev control disabled by default
    swipeCardsControlPrev.classList.add('swipe-cards__control--disabled');
    // next control enabled if more than 1 slide
    if (numSlides > 1) {
      swipeCardsControlNext.classList.remove('swipe-cards__control--disabled');
    } else {
      swipeCardsControlNext.classList.add('swipe-cards__control--disabled');
    }

    swipeCardsControlNext.addEventListener('click', nextSlide);
    swipeCardsControlPrev.addEventListener('click', prevSlide);
    swipeCardsContainer.addEventListener('swipeLeft', nextSlide);
    swipeCardsContainer.addEventListener('swipeRight', prevSlide);
    
  }

  function destroyCardsCarousel() {
    //remove outdated listeners if any
    swipeCardsControls.classList.add('swipe-cards__controls--hidden');
    swipeCardsControlNext.removeEventListener('click', nextSlide);
    swipeCardsControlPrev.removeEventListener('click', prevSlide);
    swipeCardsContainer.removeEventListener('swipeLeft', nextSlide);
    swipeCardsContainer.removeEventListener('swipeRight', prevSlide);
  }

  function moveContainer() {
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

    swipeCardsContainer.style.transform = 
      `translateX(${currContainerTranslate}${isSlidesShifted ? 'rem' : 'px'})`;
  }

  function nextSlide() {
    if (!isEnd) {
      currContainerTranslate -= slideWidth;
      moveContainer();
    }
  }

  function prevSlide() {
    if (!isBeginning) {
      currContainerTranslate += slideWidth;
      moveContainer();
    }
  }

  function initFiltersDropdown() {
    const filters = swipeCards.parentNode.parentNode.querySelector('.filters');
    const filterItems = filters.querySelectorAll('.filters__item');

    let areFiltersExpanded = false;
    let isInTransition = false;
    const transitionDuration = 300;

    const closeFiltersDropdown = function() {
      if (areFiltersExpanded) {
        isInTransition = true;
        areFiltersExpanded = false;
        const filtersBG = filters.querySelector('.filters__bg');

        filtersBG.style.top = '';
        filtersBG.style.bottom = ''
        filterItems.forEach((filter) => {
          if (!filter.classList.contains('filters__item--active')) {
            filter.style.transform = '';
            filter.style.opacity = 0;
          }
        });

        setTimeout(() => {
          filters.classList.remove('filters--expand');
          filtersBG.parentNode.removeChild(filtersBG);
          filterItems.forEach((filter) => {
            if (!filter.classList.contains('filters__item--active')) {
              filter.style.opacity = '';
            }
          });
          isInTransition = false;
        }, transitionDuration); 
      }
    }

    const openFiltersDropdown = function() {
      isInTransition = true;
      filters.classList.add('filters--expand');

      let filterCnt = 0;
      filterItems.forEach((filter) => {
        if (!filter.classList.contains('filters__item--active')) {
          const shift = Math.floor(filterCnt / 2) + 1;
          filterCnt++;
          filter.style.transform = `translateY(${150 * (filterCnt % 2 > 0 ? shift : -shift)}%)`;
        }
      });

      const filtersBG = document.createElement('div');
      filtersBG.classList.add('filters__bg');
      filters.appendChild(filtersBG);
      const filtersBGTop = Math.floor(filterItems.length / 2) * 150 + 50;
      const filtersBGBottom = ((filterItems.length - 1) % 2 + Math.floor(filterItems.length / 2)) * 150 + 50;

      // async background expand after inserting it into DOM
      setTimeout(() => {
        filtersBG.style.top = `${-filtersBGTop}%`;
        filtersBG.style.bottom = `${-filtersBGBottom}%`;        
      }, 0);

      areFiltersExpanded = true;
      setTimeout(() => {
        isInTransition = false;
      }, transitionDuration);
    }

    filters.addEventListener('click', function(ev) {
      ev.stopPropagation();
      if (isInTransition) return;

      if (!areFiltersExpanded) {
        openFiltersDropdown();
      } else {
        closeFiltersDropdown();
      }
    });

    document.querySelector('.main-wrapper').addEventListener('click', function() {
      if (areFiltersExpanded) {
        closeFiltersDropdown();
      }
    });
  }

  function initFiltering(cards) {
    const filters = swipeCards.parentNode.parentNode.querySelectorAll('.filters__item');
    
    filters.forEach(filter => {
      filter.addEventListener('click', function(ev) {

        // active filter class async
        setTimeout(() => {
          // remove prev active filter
          filters.forEach(couldBeActiveFilter => {
            couldBeActiveFilter.classList.remove('filters__item--active');
          });
          // add new one
          filter.classList.add('filters__item--active');
        }, 300);
        
        const filterSlug = filter.getAttribute('data-filter');
        
        if (viewportWidth < 1366) {
          //cards = swipeCards.querySelectorAll('.swipe-cards__card');
          cards.forEach(card => {
            if (filterSlug === 'all') {
              card.classList.remove('swipe-card--hidden');
            } else {
              const cats = card.getAttribute('data-cat').split(' ');
              if (cats.includes(filterSlug)) {
                card.classList.remove('swipe-card--hidden');
              } else {
                card.classList.add('swipe-card--hidden');
              }
            }
          });
        } else {
          ev.stopPropagation();
          const cardsArr = Array.prototype.slice.call(cards, 0);
          let filteredCards = cardsArr;
          if (filterSlug !== 'all') {
            filteredCards = filteredCards.filter(card => {
              const cats = card.getAttribute('data-cat').split(' ');
              return cats.includes(filterSlug);
            });
          }
          destroyCardsCarousel();
          initCardsCarousel(filteredCards);
        }
      });
    });
  }

  function initFilteringMobile(cards) {
    const filters = swipeCards.parentNode.parentNode.querySelectorAll('.filters__item');
    filters.forEach(filter => {

    });
  }
}