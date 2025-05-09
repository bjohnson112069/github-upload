gsap.registerPlugin(ScrollTrigger);

const wrapper = document.querySelector('#section__experience');
const header  = document.querySelector('.section__title');
const cards  = document.querySelectorAll('.panel');
const moreButtons = document.querySelectorAll('.view-more-button');

const animationTL = gsap.timeline()
let cardHeight

function handleViewMoreClick() {
  const span = this.querySelector('span');
  this.classList.toggle('expanded');

  span.textContent = this.matches('.expanded') ? 'View Less' : 'View More';
}

function initCards(){
  animationTL.clear()
  cardHeight = cards[0].offsetHeight
  console.log("initCards()", cardHeight)
  cards.forEach((card, index) => {
    if(index > 0){
    //increment y value of each card by cardHeight
      gsap.set(card, {y:index * cardHeight})
    //animate each card back to 0 (for stacking)
      animationTL.to(card, {y:0, duration:index*0.5, ease:"none"},0)
    }
  })
}

initCards()

ScrollTrigger.create({
  trigger:wrapper,
  start:"top top",
  pin:true,
  end:()=>`+=${(cards.length * cardHeight) + header.offsetHeight}`,
  scrub:true,
  animation:animationTL,
  // markers:true,
  invalidateOnRefresh:true
})

// Event Listeners
ScrollTrigger.addEventListener("refreshInit", initCards)
moreButtons.forEach(button => button.addEventListener('click', handleViewMoreClick));
