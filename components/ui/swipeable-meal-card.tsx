'use client'

import { useState } from 'react'
import { motion, useMotionValue, useTransform, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Clock, Flame, Check, RefreshCw, Info, ChevronDown, Sparkles, Timer, Utensils } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Meal } from '@/data/mock-plan'

interface SwipeableMealCardProps {
  meal: Meal
  isCompleted: boolean
  onToggle: () => void
  onSwap?: () => void
  onViewDetails?: () => void
}

const mealTips: Record<string, { tip: string; icon: 'timer' | 'sparkles' | 'utensils' }> = {
  'Power Breakfast Bowl': { tip: 'Protein-rich breakfast helps maintain muscle and keeps you full longer.', icon: 'sparkles' },
  'Mediterranean Lunch': { tip: 'Mediterranean diet is linked to improved heart health and longevity.', icon: 'sparkles' },
  'Pre-Workout Snack': { tip: 'Eating 1-2 hours before exercise optimizes your performance.', icon: 'timer' },
  'Lean Dinner': { tip: 'Omega-3s from salmon support brain function and reduce inflammation.', icon: 'utensils' },
}

const tipIcons = {
  timer: Timer,
  sparkles: Sparkles,
  utensils: Utensils,
}

export function SwipeableMealCard({ meal, isCompleted, onToggle, onSwap, onViewDetails }: SwipeableMealCardProps) {
  const prefersReducedMotion = useReducedMotion()
  const [isExpanded, setIsExpanded] = useState(false)
  const [showTip, setShowTip] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const x = useMotionValue(0)
  
  const swapOpacity = useTransform(x, [-100, -50, 0], [1, 0.5, 0])
  const completeOpacity = useTransform(x, [0, 50, 100], [0, 0.5, 1])
  const cardRotate = useTransform(x, [-100, 0, 100], [-3, 0, 3])
  const cardScale = useTransform(x, [-100, 0, 100], [0.98, 1, 0.98])

  const handleDragEnd = () => {
    const xVal = x.get()
    if (xVal < -80 && onSwap) {
      onSwap()
    } else if (xVal > 80) {
      onToggle()
    }
    x.set(0)
  }

  const tipData = mealTips[meal.name]
  const TipIcon = tipData ? tipIcons[tipData.icon] : Sparkles

  return (
    <div className="relative">
      {/* Background actions */}
      <div className="absolute inset-0 rounded-2xl flex overflow-hidden">
        {/* Swap action (left swipe) */}
        <motion.div
          style={{ opacity: swapOpacity }}
          className="flex-1 bg-gradient-to-r from-blue-500/30 to-blue-500/10 rounded-l-2xl flex items-center justify-start px-6"
        >
          <div className="flex items-center gap-2 text-blue-400">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
              <RefreshCw className="w-6 h-6" />
            </motion.div>
            <span className="text-sm font-medium">Swap</span>
          </div>
        </motion.div>
        
        {/* Complete action (right swipe) */}
        <motion.div
          style={{ opacity: completeOpacity }}
          className="flex-1 bg-gradient-to-l from-primary/30 to-primary/10 rounded-r-2xl flex items-center justify-end px-6"
        >
          <div className="flex items-center gap-2 text-primary">
            <span className="text-sm font-medium">Done</span>
            <Check className="w-6 h-6" />
          </div>
        </motion.div>
      </div>

      {/* Card */}
      <motion.div
        style={{ x, rotate: prefersReducedMotion ? 0 : cardRotate, scale: prefersReducedMotion ? 1 : cardScale }}
        drag={prefersReducedMotion ? false : 'x'}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.1}
        onDragEnd={handleDragEnd}
        whileTap={prefersReducedMotion ? {} : { cursor: 'grabbing' }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={cn(
          'relative bg-card backdrop-blur-xl rounded-2xl border border-glass-border overflow-hidden',
          'transition-all duration-300',
          isCompleted && 'opacity-60',
          !prefersReducedMotion && 'cursor-grab active:cursor-grabbing'
        )}
      >
        {/* Gradient overlay on hover */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none"
        />
        
        {/* Glow effect */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="absolute inset-0 shadow-[inset_0_0_30px_oklch(0.696_0.17_145_/_0.1)] pointer-events-none rounded-2xl"
        />

        <div className="relative p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              {/* Time and info */}
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">{meal.time}</span>
                </div>
                
                {/* Info tip button */}
                {tipData && (
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation()
                      setShowTip(!showTip)
                    }}
                    whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
                    whileTap={prefersReducedMotion ? {} : { scale: 0.9 }}
                    className={cn(
                      'p-1.5 rounded-full transition-colors',
                      showTip ? 'bg-primary/20 text-primary' : 'bg-secondary text-muted-foreground hover:text-foreground'
                    )}
                    aria-label="Show nutrition tip"
                  >
                    <Info className="w-3.5 h-3.5" />
                  </motion.button>
                )}
              </div>
              
              {/* Meal name */}
              <h3 className={cn(
                'font-semibold text-foreground text-lg mb-3 truncate',
                isCompleted && 'line-through text-muted-foreground'
              )}>
                {meal.name}
              </h3>
              
              {/* Macro pills */}
              <div className="flex flex-wrap gap-2">
                <motion.span 
                  whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                  className="px-2.5 py-1 text-xs font-medium rounded-full bg-gradient-to-r from-primary/20 to-primary/10 text-primary flex items-center gap-1.5 border border-primary/20"
                >
                  <Flame className="w-3 h-3" />
                  {meal.calories} cal
                </motion.span>
                <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  P: {meal.protein}g
                </span>
                <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20">
                  C: {meal.carbs}g
                </span>
                <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
                  F: {meal.fat}g
                </span>
              </div>

              {/* Tip tooltip */}
              <AnimatePresence>
                {showTip && tipData && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: 'auto', marginTop: 12 }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="flex items-start gap-2 p-3 rounded-xl bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20">
                      <TipIcon className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <p className="text-xs text-foreground/80 leading-relaxed">
                        {tipData.tip}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Completion toggle */}
            <div className="flex flex-col items-center gap-2">
              <motion.button
                onClick={(e) => {
                  e.stopPropagation()
                  onToggle()
                }}
                whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.9 }}
                className={cn(
                  'shrink-0 w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-300',
                  isCompleted
                    ? 'bg-primary border-primary text-primary-foreground shadow-[0_0_20px_oklch(0.696_0.17_145_/_0.4)]'
                    : 'border-glass-border hover:border-primary/50 text-muted-foreground hover:text-foreground bg-secondary/50'
                )}
                aria-label={isCompleted ? 'Mark as incomplete' : 'Mark as complete'}
              >
                <motion.div
                  initial={false}
                  animate={isCompleted ? { scale: [1, 1.3, 1] } : {}}
                  transition={{ duration: 0.3 }}
                >
                  <Check className="w-5 h-5" />
                </motion.div>
              </motion.button>
              
              {/* Swap button */}
              {onSwap && (
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation()
                    onSwap()
                  }}
                  whileHover={prefersReducedMotion ? {} : { scale: 1.1, rotate: 180 }}
                  whileTap={prefersReducedMotion ? {} : { scale: 0.9 }}
                  className="p-2 rounded-full bg-secondary text-muted-foreground hover:text-blue-400 hover:bg-blue-500/10 transition-colors"
                  aria-label="Swap meal"
                >
                  <RefreshCw className="w-4 h-4" />
                </motion.button>
              )}
            </div>
          </div>

          {/* Expand button */}
          <div className="flex items-center gap-2 mt-4 pt-3 border-t border-glass-border">
            <motion.button
              onClick={() => setIsExpanded(!isExpanded)}
              whileHover={prefersReducedMotion ? {} : { y: isExpanded ? 2 : -2 }}
              className="flex-1 flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <span>{isExpanded ? 'Hide' : 'Show'} ingredients</span>
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="w-4 h-4" />
              </motion.div>
            </motion.button>
            
            {onViewDetails && (
              <motion.button
                onClick={(e) => {
                  e.stopPropagation()
                  onViewDetails()
                }}
                whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                className="px-3 py-1.5 text-sm font-medium text-primary bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors"
              >
                View Recipe
              </motion.button>
            )}
          </div>

          {/* Expanded content */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
                className="overflow-hidden"
              >
                <div className="pt-4">
                  <div className="flex flex-wrap gap-2">
                    {meal.ingredients.map((ingredient, index) => (
                      <motion.span
                        key={ingredient}
                        initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: prefersReducedMotion ? 0 : index * 0.05 }}
                        whileHover={prefersReducedMotion ? {} : { scale: 1.05, y: -2 }}
                        className="px-3 py-1.5 text-xs font-medium rounded-full bg-secondary hover:bg-secondary/80 text-foreground border border-glass-border cursor-default"
                      >
                        {ingredient}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Completion celebration */}
        <AnimatePresence>
          {isCompleted && !prefersReducedMotion && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute top-2 right-2"
            >
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 1, scale: 0, y: 0 }}
                  animate={{ 
                    opacity: [1, 0],
                    scale: [0, 1],
                    y: [0, -20 - i * 10],
                    x: [(i - 1) * 15]
                  }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="absolute"
                >
                  <Sparkles className="w-3 h-3 text-primary" />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
