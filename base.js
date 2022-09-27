import Particle from './particles-backgrounds/particle.js'

class Base {
  constructor(
    ctx,
    canvasWidth,
    canvasHeight,
    canvasPosition,
    maxParticles = 200
  ) {
    this.ctx = ctx
    this.maxParticles = maxParticles
    this.canvasWidth = canvasWidth
    this.canvasHeight = canvasHeight
    this.canvasPosition = canvasPosition
    this.particles = []

    this.timeSinceLastParticle = 0
    this.particleInterval = 200
    this.#addParticles(this.maxParticles)
  }
  update(deltaTime) {
    // filter objects marked for deletion
    this.particles = this.particles.filter(
      (obj) => obj.isMarkedForDeletion !== true
    )

    this.timeSinceLastParticle += deltaTime
    let particlesDifference = this.maxParticles - this.particles.length
    if (this.timeSinceLastParticle > this.particleInterval) {
      // add a particle
      this.#addParticles(particlesDifference)
      this.timeSinceLastParticle = 0
    }

    ;[...this.particles].forEach((obj) => obj.update(deltaTime))
    // check the particle difference cuurently on canvas
  }
  draw() {
    ;[...this.particles].forEach((obj) => obj.draw())
  }
  #addParticles(particlesDifference) {
    for (let i = 0; i < particlesDifference; i++) {
      this.particles.push(new Particle(this, this.particles))
    }
  }
}

export default Base
