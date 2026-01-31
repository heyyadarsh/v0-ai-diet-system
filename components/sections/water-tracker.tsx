'use client'

import { motion, useReducedMotion, AnimatePresence } from 'framer-motion'
import { Droplets, Plus, Minus, Award } from 'lucide-react'
import { cn } from '@/lib/utils'

interface WaterTrackerProps {
  current: number
  goal: number
  onAdd: () => void
  onRemove: () => void
}

export function WaterTracker({ current, goal, onAdd, onRemove }: WaterTrackerProps) {
  const prefersReducedMotion = useReducedMotion()
  const percentage = Math.min((current / goal) * 100, 100)
  const isComplete = current >= goal

  return (
    <motion.div
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.6 }}
      className="bg-glass backdrop-blur-xl rounded-2xl border border-glass-border p-4 sm:p-6"
      id="water"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <motion.div
            animate={isComplete && !prefersReducedMotion ? { scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 0.5, repeat: isComplete ? Infinity : 0, repeatDelay: 2 }}
          >
            <Droplets className={cn('w-5 h-5', isComplete ? 'text-primary' : 'text-blue-400')} />
          </motion.div>
          <h2 className="text-base sm:text-lg font-semibold text-foreground">Water Intake</h2>
        </div>
        <div className="flex items-center gap-2">
          {isComplete && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex items-center gap-1 px-2 py-1 rounded-full bg-primary/10 text-primary text-xs"
            >
              <Award className="w-3 h-3" />
              <span>Goal reached!</span>
            </motion.div>
          )}
          <span className="text-xs sm:text-sm text-muted-foreground">
            {current} / {goal} glasses
          </span>
        </div>
      </div>

      {/* Water tank visualization */}
      <div className="relative h-40 sm:h-48 w-full rounded-2xl bg-secondary overflow-hidden mb-4 sm:mb-6">
        {/* Wave effect */}
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: `${percentage}%` }}
          transition={{ duration: prefersReducedMotion ? 0.3 : 1, ease: 'easeOut' }}
          className={cn(
            'absolute bottom-0 left-0 right-0',
            isComplete 
              ? 'bg-gradient-to-t from-primary/80 to-primary/60' 
              : 'bg-gradient-to-t from-blue-500/80 to-blue-400/60'
          )}
        >
          {/* Animated wave overlay */}
          {!prefersReducedMotion && (
            <div className="absolute -top-2 left-0 right-0 h-4 overflow-hidden">
              <motion.div
                animate={{ x: [0, -200] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                className="absolute top-0 w-[400%] h-full"
                style={{
                  background: `repeating-linear-gradient(
                    90deg,
                    transparent 0%,
                    oklch(0.7 0.15 230 / 0.3) 25%,
                    transparent 50%
                  )`,
                }}
              />
            </div>
          )}
          
          {/* Bubble effects */}
          {percentage > 10 && !prefersReducedMotion && (
            <>
              <motion.div
                animate={{ y: [-10, -50], opacity: [1, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0 }}
                className="absolute bottom-4 left-1/4 w-2 h-2 rounded-full bg-white/30"
              />
              <motion.div
                animate={{ y: [-10, -60], opacity: [1, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                className="absolute bottom-4 left-1/2 w-3 h-3 rounded-full bg-white/20"
              />
              <motion.div
                animate={{ y: [-10, -40], opacity: [1, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                className="absolute bottom-4 left-3/4 w-2 h-2 rounded-full bg-white/25"
              />
            </>
          )}
        </motion.div>

        {/* Glass marks */}
        <div className="absolute inset-0 flex flex-col justify-between py-2 px-3 pointer-events-none">
          {[...Array(Math.min(goal, 8))].map((_, i) => (
            <div
              key={`mark-${goal - i}`}
              className="flex items-center gap-2 text-[10px] sm:text-xs text-muted-foreground/50"
            >
              <div className="w-2 h-px bg-muted-foreground/30" />
              <span className="hidden sm:inline">{goal - i}</span>
            </div>
          ))}
        </div>

        {/* Center display */}
        <div className="absolute inset-0 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={prefersReducedMotion ? {} : { scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={prefersReducedMotion ? {} : { scale: 1.2, opacity: 0 }}
              className="flex flex-col items-center"
            >
              <span className="text-4xl sm:text-5xl font-bold text-white drop-shadow-lg">
                {current}
              </span>
              <span className="text-xs text-white/70 mt-1">glasses</span>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between gap-4">
        <motion.button
          whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
          whileTap={prefersReducedMotion ? {} : { scale: 0.9 }}
          onClick={onRemove}
          disabled={current <= 0}
          className={cn(
            'p-3 sm:p-4 rounded-full border border-glass-border transition-all duration-200',
            current <= 0
              ? 'opacity-30 cursor-not-allowed'
              : 'hover:bg-secondary hover:border-primary/30 active:bg-secondary'
          )}
          aria-label="Remove one glass"
        >
          <Minus className="w-5 h-5 sm:w-6 sm:h-6 text-foreground" />
        </motion.button>

        <div className="flex-1 text-center">
          <div className="text-sm sm:text-base font-semibold text-foreground">
            {Math.round(percentage)}%
          </div>
          <div className="text-xs text-muted-foreground">of daily goal</div>
        </div>

        <motion.button
          whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
          whileTap={prefersReducedMotion ? {} : { scale: 0.9 }}
          onClick={onAdd}
          disabled={current >= goal}
          className={cn(
            'p-3 sm:p-4 rounded-full border border-glass-border transition-all duration-200',
            current >= goal
              ? 'opacity-30 cursor-not-allowed'
              : 'hover:bg-primary hover:border-primary text-foreground hover:text-primary-foreground active:bg-primary'
          )}
          aria-label="Add one glass"
        >
          <Plus className="w-5 h-5 sm:w-6 sm:h-6" />
        </motion.button>
      </div>

      {/* Hydration tip */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-xs text-center text-muted-foreground mt-4 px-4"
      >
        {current === 0 && 'Start your day with a glass of water!'}
        {current > 0 && current < goal / 2 && 'Keep going! Staying hydrated boosts energy.'}
        {current >= goal / 2 && current < goal && "You're doing great! Almost there."}
        {current >= goal && 'Excellent! You\'ve met your hydration goal!'}
      </motion.p>
    </motion.div>
  )
}
