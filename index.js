/**
 * @type {HTMLCanvasElement}
 */
import Base from './base.js'
import Particle from './particles-backgrounds/particle.js'

// only happen when windows is fully loaded
window.addEventListener('load', () => {
  // setup canvas
  const canvas = document.getElementById('canvas')
  const ctx = canvas.getContext('2d')
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  let canvasPosition = canvas.getBoundingClientRect()

  // global variables
  const base = new Base(ctx, canvas.width, canvas.height, canvasPosition)
  // on mouseover create a particle

  let lastTime = 1

  function animate(timestamp) {
    //clear canvas on every frame
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    const deltatime = timestamp - lastTime
    lastTime = timestamp
    base.update(deltatime)
    base.draw()

    requestAnimationFrame(animate)
  }

  // start animating
  animate(0)
})
