'use client'

import React from "react"

import { useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface AuroraBackgroundProps {
  children?: React.ReactNode
  className?: string
}

export function AuroraBackground({ children, className }: AuroraBackgroundProps) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {/* Aurora gradient layers */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background" />
        
        {/* Aurora blobs */}
        <div
          className={cn(
            'absolute top-0 -left-1/4 w-1/2 h-1/2 bg-primary/20 rounded-full blur-[120px]',
            !prefersReducedMotion && 'animate-aurora-1'
          )}
        />
        <div
          className={cn(
            'absolute top-1/4 -right-1/4 w-1/2 h-1/2 bg-cyan-500/10 rounded-full blur-[120px]',
            !prefersReducedMotion && 'animate-aurora-2'
          )}
        />
        <div
          className={cn(
            'absolute -bottom-1/4 left-1/4 w-1/2 h-1/2 bg-primary/15 rounded-full blur-[120px]',
            !prefersReducedMotion && 'animate-aurora-3'
          )}
        />
        
        {/* Mesh gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(34,197,94,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(6,182,212,0.05),transparent_50%)]" />
      </div>
      
      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}
