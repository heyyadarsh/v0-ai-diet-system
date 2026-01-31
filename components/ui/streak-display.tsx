'use client'

import { motion } from 'framer-motion'
import { Flame } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StreakDisplayProps {
  streak: number
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export function StreakDisplay({ streak, className, size = 'md' }: StreakDisplayProps) {
  const sizes = {
    sm: { icon: 'w-4 h-4', text: 'text-sm', padding: 'px-2 py-1' },
    md: { icon: 'w-5 h-5', text: 'text-base', padding: 'px-3 py-1.5' },
    lg: { icon: 'w-6 h-6', text: 'text-lg', padding: 'px-4 py-2' },
  }

  const isActive = streak > 0

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border',
        sizes[size].padding,
        isActive 
          ? 'bg-orange-500/10 border-orange-500/30 text-orange-400' 
          : 'bg-secondary border-glass-border text-muted-foreground',
        className
      )}
    >
      <motion.div
        animate={isActive ? { 
          scale: [1, 1.2, 1],
          rotate: [0, -10, 10, 0]
        } : {}}
        transition={{ 
          duration: 0.6, 
          repeat: isActive ? Infinity : 0, 
          repeatDelay: 2 
        }}
      >
        <Flame className={cn(sizes[size].icon, isActive && 'fill-orange-400')} />
      </motion.div>
      <span className={cn('font-semibold', sizes[size].text)}>
        {streak} {streak === 1 ? 'day' : 'days'}
      </span>
    </motion.div>
  )
}

// Large animated streak for profile
export function StreakCard({ streak, className }: { streak: number; className?: string }) {
  const milestones = [7, 14, 30, 60, 100]
  const nextMilestone = milestones.find(m => m > streak) || streak + 7
  const progress = (streak / nextMilestone) * 100

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        'bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-2xl border border-orange-500/20 p-6',
        className
      )}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, -5, 5, 0]
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center"
          >
            <Flame className="w-6 h-6 text-orange-400 fill-orange-400" />
          </motion.div>
          <div>
            <p className="text-sm text-muted-foreground">Current Streak</p>
            <p className="text-3xl font-bold text-foreground">{streak} days</p>
          </div>
        </div>
      </div>

      {/* Progress to next milestone */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Progress to {nextMilestone} day milestone</span>
          <span>{streak}/{nextMilestone}</span>
        </div>
        <div className="h-2 bg-secondary rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(progress, 100)}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full"
          />
        </div>
      </div>

      {/* Motivational text */}
      <p className="mt-4 text-sm text-muted-foreground">
        {streak === 0 && 'Start your streak today! Complete all your meals.'}
        {streak > 0 && streak < 7 && 'Great start! Keep the momentum going.'}
        {streak >= 7 && streak < 14 && 'One week strong! You\'re building a habit.'}
        {streak >= 14 && streak < 30 && 'Two weeks in! You\'re unstoppable.'}
        {streak >= 30 && 'Legendary streak! You\'re a nutrition master.'}
      </p>
    </motion.div>
  )
}
