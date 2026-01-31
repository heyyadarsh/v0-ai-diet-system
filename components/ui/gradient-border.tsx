'use client'

import React from "react"

import { cn } from '@/lib/utils'

interface GradientBorderProps {
  children: React.ReactNode
  className?: string
  borderClassName?: string
  animate?: boolean
}

export function GradientBorder({
  children,
  className,
  borderClassName,
  animate = true,
}: GradientBorderProps) {
  return (
    <div className={cn('relative rounded-2xl p-[1px]', className)}>
      {/* Gradient border */}
      <div
        className={cn(
          'absolute inset-0 rounded-2xl',
          'bg-gradient-to-r from-primary via-cyan-400 to-primary',
          animate && 'animate-gradient-xy',
          borderClassName
        )}
      />
      
      {/* Content container */}
      <div className="relative rounded-2xl bg-card">
        {children}
      </div>
    </div>
  )
}
