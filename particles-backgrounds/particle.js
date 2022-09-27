import { neighborParticles } from '../utils/util.js'
import Line from '../utils/line.js'

class Particle {
  constructor(
    base,
    particles,
    x,
    y,
    size = 1,
    shape = 'circle',
    speed = 50,
    color = 'grey',
    opacity = 255,
    distance = 150
  ) {
    this.base = base
    this.maxSize = 10
    this.size = size <= this.maxSize ? size : this.maxSize
    this.x = x || Math.random() * this.base.canvasWidth
    this.y = y || Math.random() * this.base.canvasHeight
    this.shape = shape
    this.color = color
    this.opacity = opacity
    this.speed = speed * 0.1
    this.isXPositive = Math.random() > 0.5
    this.isYPositive = Math.random() > 0.5
    this.isMarkedForDeletion = false
    this.angle = Math.random() * Math.PI
    this.directionX = Math.sin(this.angle)
    this.directionY = Math.cos(this.angle)
    this.distance = distance
    // for each particle it will have neighbor particles which will be four particles
    this.neighborParticles = []
    this.particles = particles
    this.lines = []
  }
  update() {
    // move randomly from start position to a random position
    if (this.isXPositive) {
      this.x += this.speed * this.directionX
    } else {
      this.x -= this.speed * this.directionX
    }
    if (this.isYPositive) {
      this.y += this.speed * this.directionY
    } else {
      this.y -= this.speed * this.directionY
    }
    if (
      this.x < 0 ||
      this.x > this.base.canvasWidth ||
      this.y < 0 ||
      this.y > this.base.canvasHeight
    ) {
      this.isMarkedForDeletion = true
      this.lines.forEach((line) => (line.isMarkedForDeletion = true))
    }

    this.neighborParticles = neighborParticles(
      this,
      this.particles,
      this.distance
    )
    // clear lines
    this.lines = this.lines.filter((obj) => obj.isMarkedForDeletion !== true)

    // for each neighbors draw a line between them and this particle
    for (let i = 0; i < this.neighborParticles.length; i++) {
      this.lines.push(new Line(this.base, this, this.neighborParticles[i]))
    }
    this.lines.forEach((line) => line.update())
  }
  draw() {
    this.lines.forEach((line) => line.draw())
    const ctx = this.base.ctx
    ctx.save()
    ctx.beginPath()
    ctx.globalAlpha = this.opacity
    ctx.fillStyle = this.color
    ctx.arc(this.x, this.y, this.size * 0.5, 0, Math.PI * 2)
    ctx.fill()
    ctx.closePath()
    ctx.restore()
  }
}

export default Particle
