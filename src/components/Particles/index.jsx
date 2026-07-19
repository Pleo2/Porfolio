'use client'

import {useEffect, useRef} from 'react'

const COLOR = '197, 94, 88'

export default function Particles({quantity = 76, staticity = 90, ease = 70}) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext('2d', {alpha: true})
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const mouse = {x: 0, y: 0, active: false}
    let particles = []
    let width = 0
    let height = 0
    let frame = null
    let resizeFrame = null

    const createParticle = () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      offsetX: 0,
      offsetY: 0,
      radius: 1 + Math.random() * 1.6,
      alpha: 0.12 + Math.random() * 0.36,
      velocityX: (Math.random() - 0.5) * 0.12,
      velocityY: (Math.random() - 0.5) * 0.12,
      magnetism: 0.4 + Math.random() * 1.8,
    })

    const draw = () => {
      context.clearRect(0, 0, width, height)
      for (let index = 0; index < particles.length; index += 1) {
        const particle = particles[index]
        context.beginPath()
        context.arc(particle.x + particle.offsetX, particle.y + particle.offsetY, particle.radius, 0, Math.PI * 2)
        context.fillStyle = `rgba(${COLOR}, ${particle.alpha})`
        context.fill()
      }
    }

    const setup = () => {
      width = window.innerWidth
      height = window.innerHeight
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(dpr, 0, 0, dpr, 0, 0)

      const responsiveQuantity = Math.max(34, Math.round((width * height) / 18000))
      const particleCount = Math.min(quantity, responsiveQuantity)
      particles = Array.from({length: particleCount}, createParticle)
      draw()
    }

    const animate = () => {
      for (let index = 0; index < particles.length; index += 1) {
        const particle = particles[index]
        particle.x += particle.velocityX
        particle.y += particle.velocityY

        if (particle.x < -4) particle.x = width + 4
        if (particle.x > width + 4) particle.x = -4
        if (particle.y < -4) particle.y = height + 4
        if (particle.y > height + 4) particle.y = -4

        const targetX = mouse.active ? ((mouse.x - width / 2) / staticity) * particle.magnetism : 0
        const targetY = mouse.active ? ((mouse.y - height / 2) / staticity) * particle.magnetism : 0
        particle.offsetX += (targetX - particle.offsetX) / ease
        particle.offsetY += (targetY - particle.offsetY) / ease
      }
      draw()
      frame = window.requestAnimationFrame(animate)
    }

    const handlePointerMove = event => {
      mouse.x = event.clientX
      mouse.y = event.clientY
      mouse.active = true
    }
    const handlePointerLeave = () => { mouse.active = false }
    const handleResize = () => {
      if (resizeFrame !== null) window.cancelAnimationFrame(resizeFrame)
      resizeFrame = window.requestAnimationFrame(setup)
    }
    const handleVisibility = () => {
      if (document.hidden && frame !== null) {
        window.cancelAnimationFrame(frame)
        frame = null
      } else if (!document.hidden && !reducedMotion && frame === null) {
        frame = window.requestAnimationFrame(animate)
      }
    }

    setup()
    if (!reducedMotion) {
      frame = window.requestAnimationFrame(animate)
      window.addEventListener('pointermove', handlePointerMove, {passive: true})
      document.documentElement.addEventListener('pointerleave', handlePointerLeave)
    }
    window.addEventListener('resize', handleResize, {passive: true})
    document.addEventListener('visibilitychange', handleVisibility)

    return () => {
      if (frame !== null) window.cancelAnimationFrame(frame)
      if (resizeFrame !== null) window.cancelAnimationFrame(resizeFrame)
      window.removeEventListener('pointermove', handlePointerMove)
      document.documentElement.removeEventListener('pointerleave', handlePointerLeave)
      window.removeEventListener('resize', handleResize)
      document.removeEventListener('visibilitychange', handleVisibility)
    }
  }, [ease, quantity, staticity])

  return (
    <div className='pointer-events-none fixed inset-0 z-0 overflow-hidden' aria-hidden='true'>
      <canvas className='block h-full w-full' ref={canvasRef} />
    </div>
  )
}
