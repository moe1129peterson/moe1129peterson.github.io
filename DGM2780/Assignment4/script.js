// gsap.from('.header', { duration: 1, y: '-100%', ease: 'bounce' })
// gsap.from('.link', { duration: 1, opacity: 0, delay: 1, stagger: .5 })
// gsap.from('.right', { duration: 1, x: '-100vw', delay: 1, ease: 'power2.in' })
// gsap.from('.left', { duration: 1, delay: 1.5, x: '-100%' })
// gsap.to('.footer', { duration: 1, y: 0, ease: 'elastic', delay: 2.5 })
// gsap.fromTo('.button', { opacity: 0, scale: 0, rotation: 720 }, { duration: 1, delay: 3.5, opacity: 1, scale: 1, rotation: 0 })

const timeline = gsap.timeline({ defaults: { duration: 1 }})
timeline
  .from('.header-div', { y: '-100%', ease: 'bounce' })
  .from('.navbar-background-none', { opacity: 0, stagger: .5 })
  .from('.navbar-background', { x: '-100vw', ease: 'power2.in' }, 1)
  .from('.img1', { y: '-200%', ease: 'bounce' })
  .fromTo('.btn', { opacity: 0, scale: 0, rotation: 720 }, { opacity: 1, scale: 1, rotation: 0 })
  .from('.img2', { y: '-250%', ease: 'bounce' })
  .fromTo('.img3', { opacity: 0, scale: 0, }, { opacity: 1, scale: 1, })
  .fromTo('.img4', { opacity: 0, scale: 0, }, { opacity: 1, scale: 1, })
  .fromTo('.img5', { opacity: 0, scale: 0, }, { opacity: 1, scale: 1, })
  .fromTo('.img6', { opacity: 0, scale: 0, }, { opacity: 1, scale: 1, })
  .fromTo('.img7', { opacity: 0, scale: 0, }, { opacity: 1, scale: 1, })

const button = document.querySelector('.btn')

button.addEventListener('click', () => {
  timeline.timeScale(3)
  timeline.reverse()
})

const undoBtn = document.querySelector('#undo')

undoBtn.addEventListener('click', () => {
  timeline.timeScale(3)
})
