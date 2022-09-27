// function for looking at all particles which and find those close the centerParticle
export function neighborParticles(centerParticle, particles, distance) {
  let neighborParticles = []
  for (let i = 0; i < particles.length; i++) {
    let distanceX = Math.abs(centerParticle.x - particles[i].x)
    let distanceY = Math.abs(centerParticle.y - particles[i].y)
    if (distanceX < distance && distanceY < distance) {
      neighborParticles.push(particles[i])
    }
  }
  return neighborParticles.filter((particles) => {
    let distanceX = Math.abs(centerParticle.x - particles.x)
    let distanceY = Math.abs(centerParticle.y - particles.y)
    return distanceX < distance && distanceY < distance
  })
}
