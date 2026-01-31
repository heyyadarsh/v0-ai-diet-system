'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ProgressRingProps {
  progress: number // 0-100
  size?: number
  strokeWidth?: number
  color?: string
  bgColor?: string
  label?: string
  value?: string
  className?: string
}

export function ProgressRing({
  progress,
  size = 120,
  strokeWidth = 8,
  color = 'oklch(0.696 0.17 145)',
  bgColor = 'oklch(0.2 0.005 285)',
  label,
  value,
  className,
}: ProgressRingProps) {
  const prefersReducedMotion = useReducedMotion()
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (progress / 100) * circumference

  return (
    <div 
      className={cn('relative inline-flex items-center justify-center', className)}
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label ? `${label}: ${Math.round(progress)}%` : `${Math.round(progress)}%`}
    >
      <svg width={size} height={size} className="-rotate-90">
        {/* Background ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={bgColor}
          strokeWidth={strokeWidth}
        />
        
        {/* Progress ring */}
        {prefersReducedMotion ? (
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ filter: `drop-shadow(0 0 8px ${color})` }}
          />
        ) : (
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 2, ease: 'easeOut' }}
            style={{ filter: `drop-shadow(0 0 8px ${color})` }}
          />
        )}
      </svg>
      
      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {value && (
          <span className="text-lg sm:text-2xl font-bold text-foreground">{value}</span>
        )}
        {label && (
          <span className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 sm:mt-1">{label}</span>
        )}
      </div>
    </div>
  )
}
