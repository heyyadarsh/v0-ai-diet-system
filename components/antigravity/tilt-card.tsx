'use client'

import React from "react"

import { useRef } from 'react'
import { motion, useMotionValue, useTransform, useSpring, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface TiltCardProps {
  children: React.ReactNode
  className?: string
  glowOnHover?: boolean
}

export function TiltCard({ children, className, glowOnHover = true }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  
  const x = useMotionValue(0.5)
  const y = useMotionValue(0.5)
  
  const rotateX = useSpring(useTransform(y, [0, 1], [8, -8]), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(x, [0, 1], [-8, 8]), { stiffness: 300, damping: 30 })
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !ref.current) return
    
    const rect = ref.current.getBoundingClientRect()
    const xPos = (e.clientX - rect.left) / rect.width
    const yPos = (e.clientY - rect.top) / rect.height
    
    x.set(xPos)
    y.set(yPos)
  }
  
  const handleMouseLeave = () => {
    x.set(0.5)
    y.set(0.5)
  }

  // If reduced motion is preferred, return a simpler card
  if (prefersReducedMotion) {
    return (
      <div
        className={cn(
          'relative rounded-2xl',
          'bg-glass backdrop-blur-xl',
          'border border-glass-border',
          'transition-shadow duration-300',
          glowOnHover && 'hover:shadow-[0_0_30px_oklch(0.696_0.17_145_/_0.15)]',
          className
        )}
      >
        {children}
      </div>
    )
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      className={cn(
        'relative rounded-2xl',
        'bg-glass backdrop-blur-xl',
        'border border-glass-border',
        'transition-shadow duration-300',
        glowOnHover && 'hover:shadow-[0_0_30px_oklch(0.696_0.17_145_/_0.15)]',
        className
      )}
    >
      <div style={{ transform: 'translateZ(20px)' }}>
        {children}
      </div>
    </motion.div>
  )
}
