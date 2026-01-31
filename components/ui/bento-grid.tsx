'use client'

import React from "react"

import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface BentoGridProps {
  children: React.ReactNode
  className?: string
}

export function BentoGrid({ children, className }: BentoGridProps) {
  return (
    <div
      className={cn(
        'grid auto-rows-[18rem] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4',
        className
      )}
    >
      {children}
    </div>
  )
}

interface BentoCardProps {
  title: string
  description: string
  icon?: React.ReactNode
  className?: string
  background?: React.ReactNode
  children?: React.ReactNode
}

export function BentoCard({
  title,
  description,
  icon,
  className,
  background,
  children,
}: BentoCardProps) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      whileHover={prefersReducedMotion ? {} : { scale: 1.02, y: -4 }}
      transition={{ duration: 0.3 }}
      className={cn(
        'group relative overflow-hidden rounded-2xl border border-glass-border bg-card p-6',
        'hover:border-primary/30 transition-colors duration-300',
        className
      )}
    >
      {/* Background element */}
      {background && (
        <div className="absolute inset-0 pointer-events-none">{background}</div>
      )}
      
      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        {icon && (
          <div className="mb-4 p-3 w-fit rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
            {icon}
          </div>
        )}
        <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed flex-1">
          {description}
        </p>
        {children}
      </div>
      
      {/* Hover gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </motion.div>
  )
}
