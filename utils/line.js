class Line {
  constructor(
    base,
    particleA,
    particleB,
    size = 0,
    maxSize = 5,
    color = 'grey'
  ) {
    this.base = base
    this.size = size
    this.color = color
    this.particleA = particleA
    this.particleB = particleB
    this.isMarkedForDeletion = false
  }
  update() {
    // once the particle is removed
    // remove the line
    if (this.particleA !== this.particleB) {
      this.isMarkedForDeletion = true
    }
  }
  draw() {
    const ctx = this.base.ctx
    ctx.beginPath()
    ctx.strokeStyle = this.color
    ctx.lineWidth = this.size
    ctx.moveTo(this.particleA.x, this.particleA.y)
    ctx.lineTo(this.particleB.x, this.particleB.y)
    ctx.stroke()
    ctx.closePath()
  }
}
export default Line
