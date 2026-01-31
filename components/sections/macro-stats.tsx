'use client'

import { useState } from 'react'
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion'
import { ProgressRing } from '@/components/ui/progress-ring'
import type { DailyPlan } from '@/data/mock-plan'
import { TrendingUp, TrendingDown, Minus, Info, X, Flame, Beef, Wheat, Droplet } from 'lucide-react'
import { cn } from '@/lib/utils'

interface MacroStatsProps {
  plan: DailyPlan
  consumed: {
    calories: number
    protein: number
    carbs: number
    fat: number
  }
}

const macroInfo = {
  Calories: {
    icon: Flame,
    description: 'Total energy from food. Aim for balance based on your goals.',
    tip: 'Eating at maintenance keeps weight stable. Deficit for loss, surplus for gain.',
  },
  Protein: {
    icon: Beef,
    description: 'Essential for muscle repair and growth. Aim for 0.8-1g per lb of body weight.',
    tip: 'Spread protein intake across meals for optimal absorption.',
  },
  Carbs: {
    icon: Wheat,
    description: 'Primary energy source for your brain and muscles.',
    tip: 'Complex carbs provide sustained energy. Time them around workouts.',
  },
  Fat: {
    icon: Droplet,
    description: 'Essential for hormone production and nutrient absorption.',
    tip: 'Focus on healthy fats from nuts, avocados, and olive oil.',
  },
}

export function MacroStats({ plan, consumed }: MacroStatsProps) {
  const prefersReducedMotion = useReducedMotion()
  const [selectedMacro, setSelectedMacro] = useState<string | null>(null)
  const [hoveredMacro, setHoveredMacro] = useState<string | null>(null)
  
  const calorieProgress = Math.min((consumed.calories / plan.targetCalories) * 100, 100)
  const proteinProgress = Math.min((consumed.protein / plan.targetProtein) * 100, 100)
  const carbsProgress = Math.min((consumed.carbs / plan.targetCarbs) * 100, 100)
  const fatProgress = Math.min((consumed.fat / plan.targetFat) * 100, 100)

  const macros = [
    {
      name: 'Calories',
      progress: calorieProgress,
      consumed: consumed.calories,
      target: plan.targetCalories,
      unit: 'kcal',
      color: 'oklch(0.696 0.17 145)',
      shortUnit: '',
      bgColor: 'from-primary/20 to-primary/5',
    },
    {
      name: 'Protein',
      progress: proteinProgress,
      consumed: consumed.protein,
      target: plan.targetProtein,
      unit: 'g',
      color: 'oklch(0.65 0.2 10)',
      shortUnit: 'g',
      bgColor: 'from-red-500/20 to-red-500/5',
    },
    {
      name: 'Carbs',
      progress: carbsProgress,
      consumed: consumed.carbs,
      target: plan.targetCarbs,
      unit: 'g',
      color: 'oklch(0.75 0.15 70)',
      shortUnit: 'g',
      bgColor: 'from-amber-500/20 to-amber-500/5',
    },
    {
      name: 'Fat',
      progress: fatProgress,
      consumed: consumed.fat,
      target: plan.targetFat,
      unit: 'g',
      color: 'oklch(0.65 0.18 250)',
      shortUnit: 'g',
      bgColor: 'from-blue-500/20 to-blue-500/5',
    },
  ]

  const getTrendIcon = (progress: number) => {
    if (progress >= 90) return { icon: TrendingUp, color: 'text-primary', label: 'On track' }
    if (progress >= 50) return { icon: Minus, color: 'text-muted-foreground', label: 'Moderate' }
    return { icon: TrendingDown, color: 'text-orange-400', label: 'Behind' }
  }

  const overallTrend = getTrendIcon(calorieProgress)

  return (
    <motion.div
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-card backdrop-blur-xl rounded-2xl border border-glass-border overflow-hidden"
    >
      {/* Header */}
      <div className="p-4 sm:p-6 border-b border-glass-border bg-gradient-to-r from-primary/5 to-transparent">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base sm:text-lg font-semibold text-foreground">{"Today's Progress"}</h2>
            <p className="text-xs text-muted-foreground mt-0.5">Track your nutrition goals</p>
          </div>
          <motion.div 
            whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium',
              calorieProgress >= 90 ? 'bg-primary/10 text-primary' : 
              calorieProgress >= 50 ? 'bg-secondary text-muted-foreground' : 
              'bg-orange-500/10 text-orange-400'
            )}
          >
            <overallTrend.icon className="w-3.5 h-3.5" />
            <span>{overallTrend.label}</span>
          </motion.div>
        </div>
      </div>

      {/* Macro rings */}
      <div className="p-4 sm:p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {macros.map((macro, index) => {
            const info = macroInfo[macro.name as keyof typeof macroInfo]
            const Icon = info.icon
            const isHovered = hoveredMacro === macro.name
            const isSelected = selectedMacro === macro.name
            
            return (
              <motion.div
                key={macro.name}
                initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: prefersReducedMotion ? 0 : index * 0.1 }}
                onMouseEnter={() => setHoveredMacro(macro.name)}
                onMouseLeave={() => setHoveredMacro(null)}
                onClick={() => setSelectedMacro(isSelected ? null : macro.name)}
                className={cn(
                  'relative flex flex-col items-center p-3 sm:p-4 rounded-xl cursor-pointer transition-all duration-300',
                  'bg-gradient-to-b',
                  macro.bgColor,
                  (isHovered || isSelected) && 'ring-1 ring-primary/30'
                )}
              >
                {/* Info button */}
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isHovered || isSelected ? 1 : 0 }}
                  className="absolute top-2 right-2 p-1 rounded-full bg-secondary/80"
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedMacro(isSelected ? null : macro.name)
                  }}
                >
                  {isSelected ? (
                    <X className="w-3 h-3 text-muted-foreground" />
                  ) : (
                    <Info className="w-3 h-3 text-muted-foreground" />
                  )}
                </motion.button>

                {/* Ring with icon overlay */}
                <div className="relative">
                  <ProgressRing
                    progress={macro.progress}
                    size={80}
                    strokeWidth={6}
                    color={macro.color}
                    value={`${macro.consumed}${macro.shortUnit}`}
                    label={macro.name.toLowerCase()}
                    className="sm:hidden"
                  />
                  <ProgressRing
                    progress={macro.progress}
                    size={100}
                    strokeWidth={8}
                    color={macro.color}
                    value={`${macro.consumed}${macro.shortUnit}`}
                    label={macro.name.toLowerCase()}
                    className="hidden sm:block"
                  />
                  
                  {/* Floating icon on hover */}
                  <AnimatePresence>
                    {isHovered && !prefersReducedMotion && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0, y: 10 }}
                        className="absolute -top-2 -right-2 p-1.5 rounded-full bg-card border border-glass-border shadow-lg"
                      >
                        <Icon className="w-3 h-3" style={{ color: macro.color }} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <p className="text-[10px] sm:text-xs text-muted-foreground mt-2 sm:mt-3 text-center">
                  of {macro.target}{macro.unit}
                </p>
                
                {/* Progress bar underneath */}
                <div className="w-full h-1 mt-2 rounded-full bg-secondary overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${macro.progress}%` }}
                    transition={{ duration: prefersReducedMotion ? 0 : 1, delay: prefersReducedMotion ? 0 : 0.2 + index * 0.1 }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: macro.color }}
                  />
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Info panel */}
        <AnimatePresence>
          {selectedMacro && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
              className="overflow-hidden"
            >
              <div className="p-4 rounded-xl bg-secondary/50 border border-glass-border">
                <div className="flex items-start gap-3">
                  {(() => {
                    const info = macroInfo[selectedMacro as keyof typeof macroInfo]
                    const Icon = info.icon
                    return (
                      <>
                        <div className="p-2 rounded-lg bg-primary/10">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-foreground mb-1">{selectedMacro}</h4>
                          <p className="text-sm text-muted-foreground mb-2">{info.description}</p>
                          <p className="text-xs text-primary/80 bg-primary/5 rounded-lg p-2">
                            <strong>Tip:</strong> {info.tip}
                          </p>
                        </div>
                      </>
                    )
                  })()}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Quick summary bar */}
      <div className="px-4 sm:px-6 pb-4 sm:pb-6">
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: prefersReducedMotion ? 0 : 0.5 }}
          className="flex items-center justify-between p-3 rounded-xl bg-secondary/50"
        >
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-primary" />
            <span className="text-xs sm:text-sm text-muted-foreground">Remaining today</span>
          </div>
          <motion.span 
            key={consumed.calories}
            initial={prefersReducedMotion ? {} : { scale: 1.2 }}
            animate={{ scale: 1 }}
            className="font-bold text-foreground"
          >
            {Math.max(plan.targetCalories - consumed.calories, 0)} kcal
          </motion.span>
        </motion.div>
      </div>
    </motion.div>
  )
}
