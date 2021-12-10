

const timeline = gsap.timeline({ defaults: { duration: 1 }})
timeline
  .from('.header-div', { y: '-100%', ease: 'bounce' })
  .from('.navbar-background-none', { opacity: 0, stagger: .5 })
  .fromTo('.btn', { opacity: 0, scale: 0, rotation: 720 }, { opacity: 1, scale: 1, rotation: 0 })
  .from('.navbar-background', { x: '-100vw', ease: 'power2.in' }, 1)
  .fromTo('.img-divs', { opacity: 0, scale: 0, rotation: 720 }, {  opacity: 1, scale: 1, y: 0, ease: 'elastic' })
  .from('.left', { x: '-100%' }, '<.5')
  .to('.footer', {  y: 0, ease: 'elastic' })
  

const button = document.querySelector('.button')

button.addEventListener('click', () => {
  timeline.timeScale(3)
  timeline.reverse()
})