'use client'

import { useState, useMemo, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence, Reorder, useReducedMotion } from 'framer-motion'
import { FloatingDock } from '@/components/antigravity/floating-dock'
import { MacroStats } from '@/components/sections/macro-stats'
import { WaterTracker } from '@/components/sections/water-tracker'
import { SwipeableMealCard } from '@/components/ui/swipeable-meal-card'
import { MealDetailModal } from '@/components/ui/meal-detail-modal'
import { FloatingActionButton } from '@/components/ui/floating-action-button'
import { VibeSwitcher } from '@/components/ui/vibe-switcher'
import { StreakDisplay } from '@/components/ui/streak-display'
import { DashboardSkeleton } from '@/components/ui/skeleton-loaders'
import { SmartEmptyState } from '@/components/ui/smart-empty-state'
import { PageTransition } from '@/components/ui/page-transition'
import { Confetti } from '@/components/ui/confetti'
import { useAppState, vibeConfigs } from '@/lib/store'
import { mockPlan, type Meal } from '@/data/mock-plan'
import { Calendar, ChevronLeft, ChevronRight, Sparkles, RefreshCw, GripVertical } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function DashboardPage() {
  const router = useRouter()
  const prefersReducedMotion = useReducedMotion()
  const { 
    state, isLoaded, toggleMeal, addWater, removeWater, updateProfile, 
    setMealOrder, markDayComplete, addAchievement 
  } = useAppState()
  
  const [isLoading, setIsLoading] = useState(true)
  const [swappingMeal, setSwappingMeal] = useState<string | null>(null)
  const [showAiThinking, setShowAiThinking] = useState(false)
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null)
  const [showConfetti, setShowConfetti] = useState(false)
  const [mealOrder, setLocalMealOrder] = useState<Meal[]>(mockPlan.meals)

  // Initialize meal order from state or defaults
  useEffect(() => {
    if (isLoaded) {
      if (state.mealOrder.length > 0) {
        const orderedMeals = state.mealOrder
          .map(id => mockPlan.meals.find(m => m.id === id))
          .filter((m): m is Meal => m !== undefined)
        setLocalMealOrder(orderedMeals)
      } else {
        setLocalMealOrder(mockPlan.meals)
      }
    }
  }, [isLoaded, state.mealOrder])

  // Simulate initial load
  useEffect(() => {
    if (isLoaded) {
      const timer = setTimeout(() => setIsLoading(false), 800)
      return () => clearTimeout(timer)
    }
  }, [isLoaded])

  // Check for achievements
  useEffect(() => {
    if (!isLoaded) return
    
    // First meal achievement
    if (state.completedMeals.length === 1 && !state.achievements.includes('firstMeal')) {
      addAchievement('firstMeal')
    }
    
    // All meals achievement
    if (state.completedMeals.length === mockPlan.meals.length) {
      if (!state.achievements.includes('allMeals')) {
        addAchievement('allMeals')
        setShowConfetti(true)
        setTimeout(() => setShowConfetti(false), 100)
        markDayComplete()
      }
    }
    
    // Streak achievements
    if (state.profile.streak >= 3 && !state.achievements.includes('streak3')) {
      addAchievement('streak3')
    }
    if (state.profile.streak >= 7 && !state.achievements.includes('streak7')) {
      addAchievement('streak7')
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 100)
    }
    
    // Meal count achievements
    if (state.profile.totalMealsCompleted >= 50 && !state.achievements.includes('meals50')) {
      addAchievement('meals50')
    }
    if (state.profile.totalMealsCompleted >= 100 && !state.achievements.includes('meals100')) {
      addAchievement('meals100')
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 100)
    }
  }, [isLoaded, state.completedMeals.length, state.profile.streak, state.profile.totalMealsCompleted, state.achievements, addAchievement, markDayComplete])

  // Calculate consumed macros based on completed meals
  const consumed = useMemo(() => {
    const completed = mockPlan.meals.filter((meal) => state.completedMeals.includes(meal.id))
    return {
      calories: completed.reduce((sum, meal) => sum + meal.calories, 0),
      protein: completed.reduce((sum, meal) => sum + meal.protein, 0),
      carbs: completed.reduce((sum, meal) => sum + meal.carbs, 0),
      fat: completed.reduce((sum, meal) => sum + meal.fat, 0),
    }
  }, [state.completedMeals])

  const handleNavigate = (href: string) => {
    router.push(href)
  }

  const handleSwapMeal = useCallback((mealId: string) => {
    setSwappingMeal(mealId)
    setShowAiThinking(true)
    
    // Simulate AI thinking
    setTimeout(() => {
      setShowAiThinking(false)
      setSwappingMeal(null)
      // In a real app, this would fetch a new meal suggestion
    }, 2000)
  }, [])

  const handleAiSuggest = useCallback(() => {
    setShowAiThinking(true)
    setTimeout(() => setShowAiThinking(false), 2000)
  }, [])

  const handleMealReorder = useCallback((newOrder: Meal[]) => {
    setLocalMealOrder(newOrder)
    setMealOrder(newOrder.map(m => m.id))
  }, [setMealOrder])

  const handleMealToggle = useCallback((mealId: string) => {
    toggleMeal(mealId)
  }, [toggleMeal])

  const today = new Date()
  const formattedDate = today.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })

  const currentVibe = vibeConfigs[state.profile.vibe]
  const greeting = state.profile.name 
    ? `${currentVibe.greeting}, ${state.profile.name.split(' ')[0]}`
    : currentVibe.greeting

  // Redirect to onboarding if not completed
  useEffect(() => {
    if (isLoaded && !state.profile.completedOnboarding) {
      router.push('/onboarding')
    }
  }, [isLoaded, state.profile.completedOnboarding, router])

  if (!isLoaded || isLoading) {
    return (
      <main className="relative min-h-screen bg-background pb-24">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <DashboardSkeleton />
        </div>
        <FloatingDock activeIndex={2} onNavigate={handleNavigate} />
      </main>
    )
  }

  return (
    <PageTransition>
      <main className="relative min-h-screen bg-background pb-24">
        {/* Confetti celebration */}
        <Confetti isActive={showConfetti} />

        {/* AI Thinking Overlay */}
        <AnimatePresence>
          {showAiThinking && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-card border border-glass-border rounded-2xl p-8 text-center max-w-sm mx-4"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  className="w-12 h-12 mx-auto mb-4 rounded-full border-2 border-primary border-t-transparent"
                />
                <h3 className="text-lg font-semibold text-foreground mb-2 shimmer-text">
                  AI is thinking...
                </h3>
                <p className="text-sm text-muted-foreground">
                  {state.profile.goal === 'weight-loss' 
                    ? 'Finding low-calorie alternatives for you'
                    : state.profile.goal === 'muscle-gain'
                    ? 'Finding high-protein options for you'
                    : 'Finding the perfect alternative for you'}
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
          className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-glass-border"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0">
                <h1 className="text-lg sm:text-xl font-bold text-foreground truncate">
                  {greeting}
                </h1>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                  <Calendar className="w-4 h-4 shrink-0" />
                  <span className="truncate">{formattedDate}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2 shrink-0">
                <StreakDisplay streak={state.profile.streak} size="sm" />
                <VibeSwitcher
                  currentVibe={state.profile.vibe}
                  onVibeChange={(vibe) => updateProfile({ vibe })}
                  compact
                />
              </div>
            </div>

            {/* Date navigation */}
            <div className="flex items-center justify-center gap-2 mt-4">
              <motion.button
                whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.9 }}
                className="p-2 rounded-lg hover:bg-secondary transition-colors"
                aria-label="Previous day"
              >
                <ChevronLeft className="w-5 h-5 text-muted-foreground" />
              </motion.button>
              <button
                className="px-4 py-2 rounded-lg bg-primary/10 text-primary text-sm font-medium"
              >
                Today
              </button>
              <motion.button
                whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.9 }}
                className="p-2 rounded-lg hover:bg-secondary transition-colors"
                aria-label="Next day"
              >
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </motion.button>
            </div>
          </div>
        </motion.header>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 sm:space-y-8">
          {/* Macro Stats */}
          <MacroStats plan={mockPlan} consumed={consumed} />

          {/* Meals */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: prefersReducedMotion ? 0 : 0.6 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold text-foreground">{"Today's Meals"}</h2>
                <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded-full flex items-center gap-1">
                  <GripVertical className="w-3 h-3" />
                  Drag to reorder
                </span>
              </div>
              <motion.button
                whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                onClick={handleAiSuggest}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Regenerate
              </motion.button>
            </div>
            
            {mealOrder.length === 0 ? (
              <SmartEmptyState type="meals" onAction={() => router.push('/onboarding')} />
            ) : (
              <Reorder.Group 
                axis="y" 
                values={mealOrder} 
                onReorder={handleMealReorder}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                {mealOrder.map((meal, index) => (
                  <Reorder.Item
                    key={meal.id}
                    value={meal}
                    className="cursor-grab active:cursor-grabbing"
                    whileDrag={{ scale: 1.02, zIndex: 50 }}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: prefersReducedMotion ? 0 : 0.1 * index, duration: prefersReducedMotion ? 0 : 0.5 }}
                    >
                      <SwipeableMealCard
                        meal={meal}
                        isCompleted={state.completedMeals.includes(meal.id)}
                        onToggle={() => handleMealToggle(meal.id)}
                        onSwap={() => handleSwapMeal(meal.id)}
                        onViewDetails={() => setSelectedMeal(meal)}
                      />
                      
                      {/* Swapping indicator */}
                      {swappingMeal === meal.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="mt-2 flex items-center justify-center gap-2 text-sm text-primary"
                        >
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>Finding alternative...</span>
                        </motion.div>
                      )}
                    </motion.div>
                  </Reorder.Item>
                ))}
              </Reorder.Group>
            )}
          </motion.div>

          {/* Water Tracker */}
          <WaterTracker
            current={state.waterGlasses}
            goal={mockPlan.waterGoal}
            onAdd={addWater}
            onRemove={removeWater}
          />

          {/* Summary card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: prefersReducedMotion ? 0 : 0.6 }}
            className="bg-glass backdrop-blur-xl rounded-2xl border border-glass-border p-6 text-center"
          >
            <p className="text-muted-foreground mb-2">
              {"You've completed"}{' '}
              <motion.span
                key={state.completedMeals.length}
                initial={prefersReducedMotion ? {} : { scale: 1.5, color: 'oklch(0.696 0.17 145)' }}
                animate={{ scale: 1, color: 'oklch(0.696 0.17 145)' }}
                className="font-semibold"
              >
                {state.completedMeals.length}
              </motion.span>{' '}
              of <span className="text-foreground font-semibold">{mockPlan.meals.length}</span> meals today
            </p>
            <div className="w-full bg-secondary rounded-full h-2 mt-4 overflow-hidden">
              <motion.div
                className="bg-primary h-full rounded-full"
                initial={{ width: 0 }}
                animate={{
                  width: `${(state.completedMeals.length / mockPlan.meals.length) * 100}%`,
                }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.5, ease: 'easeOut' }}
              />
            </div>
            
            {/* Completion message */}
            <AnimatePresence>
              {state.completedMeals.length === mockPlan.meals.length && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-4 p-3 rounded-xl bg-primary/10 border border-primary/20"
                >
                  <p className="text-sm text-primary font-medium">
                    Awesome! You completed all your meals today!
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Meal Detail Modal */}
        <MealDetailModal
          meal={selectedMeal}
          isOpen={!!selectedMeal}
          onClose={() => setSelectedMeal(null)}
          onComplete={() => {
            if (selectedMeal) {
              handleMealToggle(selectedMeal.id)
            }
          }}
          isCompleted={selectedMeal ? state.completedMeals.includes(selectedMeal.id) : false}
        />

        <FloatingActionButton
          onQuickSwap={() => handleSwapMeal(mealOrder[0]?.id)}
          onAiSuggest={handleAiSuggest}
        />
        
        <FloatingDock activeIndex={2} onNavigate={handleNavigate} />
      </main>
    </PageTransition>
  )
}
