'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { X, Clock, Flame, ChefHat, Copy, Check, Share2, Heart, Bookmark } from 'lucide-react'
import { ProgressRing } from '@/components/ui/progress-ring'
import { MicroBurst } from '@/components/ui/confetti'
import { cn } from '@/lib/utils'
import type { Meal } from '@/data/mock-plan'

interface MealDetailModalProps {
  meal: Meal | null
  isOpen: boolean
  onClose: () => void
  onComplete?: () => void
  isCompleted?: boolean
}

// Mock recipe steps for demo
const mockRecipeSteps = [
  { step: 1, instruction: 'Prepare all ingredients and gather equipment' },
  { step: 2, instruction: 'Heat pan over medium heat with olive oil' },
  { step: 3, instruction: 'Cook protein until golden brown, about 5-7 minutes' },
  { step: 4, instruction: 'Add vegetables and seasonings' },
  { step: 5, instruction: 'Plate and garnish with fresh herbs' },
]

export function MealDetailModal({ 
  meal, 
  isOpen, 
  onClose, 
  onComplete,
  isCompleted = false 
}: MealDetailModalProps) {
  const prefersReducedMotion = useReducedMotion()
  const [copied, setCopied] = useState(false)
  const [saved, setSaved] = useState(false)
  const [liked, setLiked] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [showBurst, setShowBurst] = useState(false)

  if (!meal) return null

  const handleCopyIngredients = () => {
    navigator.clipboard.writeText(meal.ingredients.join('\n'))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSave = () => {
    setSaved(!saved)
    if (!saved) {
      setShowBurst(true)
      setTimeout(() => setShowBurst(false), 100)
    }
  }

  const handleLike = () => {
    setLiked(!liked)
    if (!liked) {
      setShowBurst(true)
      setTimeout(() => setShowBurst(false), 100)
    }
  }

  const macros = [
    { label: 'Protein', value: meal.protein, max: 50, color: 'oklch(0.6 0.2 220)' },
    { label: 'Carbs', value: meal.carbs, max: 80, color: 'oklch(0.7 0.2 50)' },
    { label: 'Fat', value: meal.fat, max: 40, color: 'oklch(0.7 0.2 85)' },
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-4 sm:inset-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:max-w-lg sm:w-full sm:max-h-[85vh] z-50 bg-card border border-glass-border rounded-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="relative p-6 border-b border-glass-border shrink-0">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
                    <Clock className="w-4 h-4" />
                    <span>{meal.time}</span>
                  </div>
                  <h2 className="text-xl font-bold text-foreground">{meal.name}</h2>
                </div>
                <motion.button
                  whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
                  whileTap={prefersReducedMotion ? {} : { scale: 0.9 }}
                  onClick={onClose}
                  className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5 text-foreground" />
                </motion.button>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2 mt-4">
                <motion.button
                  whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                  whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                  onClick={handleLike}
                  className={cn(
                    'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm transition-all relative',
                    liked 
                      ? 'bg-red-500/20 text-red-400 border border-red-500/30' 
                      : 'bg-secondary text-muted-foreground hover:text-foreground'
                  )}
                >
                  <Heart className={cn('w-4 h-4', liked && 'fill-current')} />
                  <span>{liked ? 'Liked' : 'Like'}</span>
                  <MicroBurst isActive={showBurst && liked} x="50%" y="50%" />
                </motion.button>
                
                <motion.button
                  whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                  whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                  onClick={handleSave}
                  className={cn(
                    'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm transition-all relative',
                    saved 
                      ? 'bg-primary/20 text-primary border border-primary/30' 
                      : 'bg-secondary text-muted-foreground hover:text-foreground'
                  )}
                >
                  <Bookmark className={cn('w-4 h-4', saved && 'fill-current')} />
                  <span>{saved ? 'Saved' : 'Save'}</span>
                  <MicroBurst isActive={showBurst && saved} x="50%" y="50%" />
                </motion.button>
                
                <motion.button
                  whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                  whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm bg-secondary text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share</span>
                </motion.button>
              </div>
            </div>

            {/* Content - scrollable */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Macro rings */}
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-4 flex items-center gap-2">
                  <Flame className="w-4 h-4 text-primary" />
                  Nutrition Facts
                </h3>
                
                <div className="flex items-center justify-center gap-6">
                  {/* Calories - larger */}
                  <div className="text-center">
                    <ProgressRing
                      value={meal.calories}
                      max={800}
                      size={80}
                      strokeWidth={6}
                      color="oklch(0.696 0.17 145)"
                    >
                      <span className="text-lg font-bold text-foreground">{meal.calories}</span>
                      <span className="text-[10px] text-muted-foreground">cal</span>
                    </ProgressRing>
                  </div>
                  
                  {/* Other macros */}
                  {macros.map((macro) => (
                    <div key={macro.label} className="text-center">
                      <ProgressRing
                        value={macro.value}
                        max={macro.max}
                        size={60}
                        strokeWidth={5}
                        color={macro.color}
                      >
                        <span className="text-sm font-bold text-foreground">{macro.value}g</span>
                      </ProgressRing>
                      <p className="text-xs text-muted-foreground mt-1">{macro.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ingredients */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <ChefHat className="w-4 h-4 text-primary" />
                    Ingredients
                  </h3>
                  <motion.button
                    whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                    whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                    onClick={handleCopyIngredients}
                    className="flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs bg-secondary text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3 h-3 text-primary" />
                        <span className="text-primary">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy all</span>
                      </>
                    )}
                  </motion.button>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {meal.ingredients.map((ingredient, index) => (
                    <motion.span
                      key={ingredient}
                      initial={prefersReducedMotion ? {} : { opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: prefersReducedMotion ? 0 : index * 0.05 }}
                      className="px-3 py-1.5 text-sm rounded-full bg-secondary text-foreground border border-glass-border"
                    >
                      {ingredient}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Recipe steps */}
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-4">
                  Recipe Steps
                </h3>
                
                <div className="space-y-3">
                  {mockRecipeSteps.map((step, index) => (
                    <motion.button
                      key={step.step}
                      onClick={() => setCurrentStep(index)}
                      initial={prefersReducedMotion ? {} : { opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: prefersReducedMotion ? 0 : index * 0.1 }}
                      className={cn(
                        'w-full flex items-start gap-3 p-3 rounded-xl text-left transition-all',
                        currentStep === index 
                          ? 'bg-primary/10 border border-primary/30' 
                          : 'bg-secondary/50 hover:bg-secondary border border-transparent'
                      )}
                    >
                      <div className={cn(
                        'w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0',
                        currentStep === index 
                          ? 'bg-primary text-primary-foreground' 
                          : currentStep > index 
                            ? 'bg-primary/50 text-primary-foreground' 
                            : 'bg-muted text-muted-foreground'
                      )}>
                        {currentStep > index ? <Check className="w-3 h-3" /> : step.step}
                      </div>
                      <p className={cn(
                        'text-sm',
                        currentStep === index ? 'text-foreground' : 'text-muted-foreground'
                      )}>
                        {step.instruction}
                      </p>
                    </motion.button>
                  ))}
                </div>

                {/* Step navigation */}
                <div className="flex items-center justify-between mt-4">
                  <button
                    onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                    disabled={currentStep === 0}
                    className="px-4 py-2 text-sm rounded-lg bg-secondary text-muted-foreground hover:text-foreground disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Previous
                  </button>
                  <span className="text-xs text-muted-foreground">
                    Step {currentStep + 1} of {mockRecipeSteps.length}
                  </span>
                  <button
                    onClick={() => setCurrentStep(Math.min(mockRecipeSteps.length - 1, currentStep + 1))}
                    disabled={currentStep === mockRecipeSteps.length - 1}
                    className="px-4 py-2 text-sm rounded-lg bg-secondary text-muted-foreground hover:text-foreground disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-glass-border shrink-0">
              <motion.button
                whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
                onClick={() => {
                  onComplete?.()
                  onClose()
                }}
                className={cn(
                  'w-full py-4 rounded-xl font-semibold transition-all',
                  isCompleted
                    ? 'bg-secondary text-muted-foreground'
                    : 'bg-primary text-primary-foreground shadow-lg shadow-primary/20'
                )}
              >
                {isCompleted ? 'Already Completed' : 'Mark as Complete'}
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
