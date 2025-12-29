"use client"

import { motion, useAnimation, useMotionValue } from "framer-motion"
import { useRef, useState } from "react"

export default function InertiaFlickingCard({ children, y,rotate,className = "", style = {} }) {
  const controls = useAnimation()
  const cardRef = useRef(null)
  const speedX= useMotionValue(0)
  const speedY= useMotionValue(0)
  const [lastPos, setLastPos] = useState({ x: 0, y })
  const [lastTime, setLastTime] = useState(0)

  const handleMouseMove = (e) => {
    setLastPos({ x: e.clientX, y: e.clientY })
    setLastTime(performance.now())
  }

  const handleMouseEnter = (e) => {
    if (!cardRef.current) return

    const now = performance.now()
    const dt = Math.max(now - lastTime, 16)

    speedX.set((e.clientX - lastPos.x) / dt)
     speedY.set((e.clientY - lastPos.y) / dt)

    // const moveScale = 280
    const moveScale = 80
    const rotateScale = 20

    const moveX = speedX.get() * moveScale
    const moveY = speedY.get()* moveScale
    const rotateIt = speedY.get() * -rotateScale

    controls.start({
      x: moveX,
      y: moveY,
      rotate:rotateIt,
      transition: { type: "spring", stiffness: 280, damping: 5 },
    })

    setTimeout(() => {
      controls.start({
        x: 0,
        y,
        rotate,
        transition: { type: "spring", stiffness: 100, damping: 8 },
      })
    }, 400)
  }

  const handleMouseLeave = () => {
    controls.start({
      x: 0,
      y,
      rotate,
      transition: { type: "spring", stiffness: 100, damping: 8 },
    })
  }

  return (
    <motion.div
      ref={cardRef}
      animate={controls}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative cursor-pointer select-none ${className}`}
      style={{
        transformStyle: "preserve-3d",
        perspective: 1000,
        ...style,
      }}
    >
      {children}
    </motion.div>
  )
}
