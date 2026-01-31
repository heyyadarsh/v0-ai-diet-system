'use client'

import React from "react"

import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  selected?: boolean
  onClick?: () => void
  animate?: boolean
}

export function GlassCard({ 
  children, 
  className, 
  selected = false, 
  onClick,
  animate = true 
}: GlassCardProps) {
  const prefersReducedMotion = useReducedMotion()
  const shouldAnimate = animate && !prefersReducedMotion
  
  const baseClasses = cn(
    'relative p-6 rounded-2xl',
    onClick && 'cursor-pointer',
    'bg-glass backdrop-blur-xl',
    'border-2 transition-all duration-300',
    selected 
      ? 'border-primary animate-border-glow' 
      : 'border-glass-border hover:border-primary/30',
    prefersReducedMotion && selected && 'border-primary shadow-[0_0_20px_oklch(0.696_0.17_145_/_0.3)]',
    className
  )

  if (!shouldAnimate) {
    return (
      <div
        onClick={onClick}
        className={baseClasses}
        role={onClick ? 'button' : undefined}
        tabIndex={onClick ? 0 : undefined}
        onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick() : undefined}
      >
        {/* Glow effect when selected */}
        {selected && (
          <div className="absolute inset-0 rounded-2xl bg-primary/5 pointer-events-none" />
        )}
        <div className="relative z-10">{children}</div>
      </div>
    )
  }
  
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      className={baseClasses}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick() : undefined}
    >
      {/* Glow effect when selected */}
      {selected && (
        <motion.div 
          className="absolute inset-0 rounded-2xl bg-primary/5 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />
      )}
      
      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}
