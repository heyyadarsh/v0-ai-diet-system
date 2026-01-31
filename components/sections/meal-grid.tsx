'use client'

import { motion } from 'framer-motion'
import { TiltCard } from '@/components/antigravity/tilt-card'
import { Clock, Flame, Check } from 'lucide-react'
import type { Meal } from '@/data/mock-plan'
import { cn } from '@/lib/utils'

interface MealGridProps {
  meals: Meal[]
  completedMeals: string[]
  onToggleMeal: (id: string) => void
}

export function MealGrid({ meals, completedMeals, onToggleMeal }: MealGridProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.6 }}
    >
      <h2 className="text-lg font-semibold text-foreground mb-4">{"Today's Meals"}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {meals.map((meal, index) => {
          const isCompleted = completedMeals.includes(meal.id)
          
          return (
            <motion.div
              key={meal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
            >
              <TiltCard
                className={cn(
                  'p-5 transition-all duration-300',
                  isCompleted && 'opacity-60'
                )}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{meal.time}</span>
                    </div>
                    
                    <h3 className={cn(
                      'font-semibold text-foreground mb-3',
                      isCompleted && 'line-through'
                    )}>
                      {meal.name}
                    </h3>
                    
                    {/* Macro pills */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary">
                        <Flame className="w-3 h-3 inline mr-1" />
                        {meal.calories} cal
                      </span>
                      <span className="px-2 py-1 text-xs rounded-full bg-secondary text-secondary-foreground">
                        P: {meal.protein}g
                      </span>
                      <span className="px-2 py-1 text-xs rounded-full bg-secondary text-secondary-foreground">
                        C: {meal.carbs}g
                      </span>
                      <span className="px-2 py-1 text-xs rounded-full bg-secondary text-secondary-foreground">
                        F: {meal.fat}g
                      </span>
                    </div>
                    
                    {/* Ingredients preview */}
                    <p className="text-xs text-muted-foreground">
                      {meal.ingredients.slice(0, 3).join(', ')}
                      {meal.ingredients.length > 3 && ` +${meal.ingredients.length - 3} more`}
                    </p>
                  </div>
                  
                  {/* Completion toggle */}
                  <button
                    onClick={() => onToggleMeal(meal.id)}
                    className={cn(
                      'shrink-0 w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300',
                      isCompleted
                        ? 'bg-primary border-primary text-primary-foreground'
                        : 'border-glass-border hover:border-primary/50 text-muted-foreground hover:text-foreground'
                    )}
                    aria-label={isCompleted ? 'Mark as incomplete' : 'Mark as complete'}
                  >
                    <Check className="w-5 h-5" />
                  </button>
                </div>
              </TiltCard>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
