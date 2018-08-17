export default function swipeCards(cardsClass) {
  const swipeCards = document.querySelector(cardsClass);

  if (cardsClass === '.swipe-cards--events') {
    const scrollHint = swipeCards.querySelector('.swipe-cards__hint');
    const swipeCardsContainer = swipeCards.querySelector('.swipe-cards__container');
    swipeCardsContainer.addEventListener('scroll', function() {
      scrollHint.classList.add('swipe-cards__hint--hidden');
    }, { once: true});
  }
}