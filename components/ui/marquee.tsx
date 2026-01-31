'use client'

import React from "react"

import { useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface MarqueeProps {
  children: React.ReactNode
  className?: string
  pauseOnHover?: boolean
  reverse?: boolean
  speed?: 'slow' | 'normal' | 'fast'
}

export function Marquee({
  children,
  className,
  pauseOnHover = true,
  reverse = false,
  speed = 'normal',
}: MarqueeProps) {
  const prefersReducedMotion = useReducedMotion()

  const speedClass = {
    slow: 'animate-marquee-slow',
    normal: 'animate-marquee',
    fast: 'animate-marquee-fast',
  }

  if (prefersReducedMotion) {
    return (
      <div className={cn('flex gap-4 overflow-hidden', className)}>
        {children}
      </div>
    )
  }

  return (
    <div
      className={cn(
        'flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]',
        className
      )}
    >
      <div
        className={cn(
          'flex gap-4 shrink-0',
          speedClass[speed],
          reverse && 'direction-reverse',
          pauseOnHover && 'hover:[animation-play-state:paused]'
        )}
      >
        {children}
      </div>
      <div
        className={cn(
          'flex gap-4 shrink-0',
          speedClass[speed],
          reverse && 'direction-reverse',
          pauseOnHover && 'hover:[animation-play-state:paused]'
        )}
        aria-hidden="true"
      >
        {children}
      </div>
    </div>
  )
}
