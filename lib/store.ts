'use client'

import { useEffect, useState, useCallback, useMemo } from 'react'

export interface UserProfile {
  name: string
  age: string
  height: string
  weight: string
  targetWeight: string
  goal: string | null
  dietaryPreferences: string[]
  activityLevel: string
  allergies: string[]
  cravings: string[]
  vibe: VibeType
  vibeIntensity: number
  streak: number
  longestStreak: number
  totalMealsCompleted: number
  joinedDate: string
  lastActiveDate: string
  completedOnboarding: boolean
  reducedMotion: boolean
}

export interface AppState {
  profile: UserProfile
  completedMeals: string[]
  waterGlasses: number
  hasSeenSplash: boolean
  mealOrder: string[]
  achievements: string[]
  dailyStreak: { [date: string]: boolean }
}

const defaultProfile: UserProfile = {
  name: '',
  age: '',
  height: '',
  weight: '',
  targetWeight: '',
  goal: null,
  dietaryPreferences: [],
  activityLevel: 'moderate',
  allergies: [],
  cravings: [],
  vibe: 'balanced',
  vibeIntensity: 50,
  streak: 0,
  longestStreak: 0,
  totalMealsCompleted: 0,
  joinedDate: '',
  lastActiveDate: '',
  completedOnboarding: false,
  reducedMotion: false,
}

const defaultState: AppState = {
  profile: defaultProfile,
  completedMeals: [],
  waterGlasses: 0,
  hasSeenSplash: false,
  mealOrder: [],
  achievements: [],
  dailyStreak: {},
}

const STORAGE_KEY = 'biteai-state'

function loadState(): AppState {
  if (typeof window === 'undefined') return defaultState
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      return { ...defaultState, ...parsed, profile: { ...defaultProfile, ...parsed.profile } }
    }
  } catch {
    // Ignore parse errors
  }
  return defaultState
}

function saveState(state: AppState) {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // Ignore storage errors
  }
}

// Get today's date string
function getTodayString() {
  return new Date().toISOString().split('T')[0]
}

// Custom hook for app state with localStorage persistence
export function useAppState() {
  const [state, setState] = useState<AppState>(defaultState)
  const [isLoaded, setIsLoaded] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    const loaded = loadState()
    
    // Check and update streak
    const today = getTodayString()
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]
    
    let updatedProfile = { ...loaded.profile }
    
    // Update streak logic
    if (loaded.profile.lastActiveDate === yesterday) {
      // Continuing streak
      updatedProfile.lastActiveDate = today
    } else if (loaded.profile.lastActiveDate !== today) {
      // Streak broken (not yesterday and not today)
      if (loaded.profile.lastActiveDate) {
        updatedProfile.streak = 0
      }
      updatedProfile.lastActiveDate = today
    }
    
    setState({ ...loaded, profile: updatedProfile })
    setIsLoaded(true)
  }, [])

  // Save to localStorage on state change
  useEffect(() => {
    if (isLoaded) {
      saveState(state)
    }
  }, [state, isLoaded])

  const updateProfile = useCallback((updates: Partial<UserProfile>) => {
    setState((prev) => ({
      ...prev,
      profile: { ...prev.profile, ...updates },
    }))
  }, [])

  const setCompletedMeals = useCallback((meals: string[]) => {
    setState((prev) => ({ ...prev, completedMeals: meals }))
  }, [])

  const toggleMeal = useCallback((mealId: string) => {
    setState((prev) => {
      const wasCompleted = prev.completedMeals.includes(mealId)
      const newCompletedMeals = wasCompleted
        ? prev.completedMeals.filter((id) => id !== mealId)
        : [...prev.completedMeals, mealId]
      
      // Update total meals completed
      const newTotal = wasCompleted 
        ? prev.profile.totalMealsCompleted 
        : prev.profile.totalMealsCompleted + 1
      
      return {
        ...prev,
        completedMeals: newCompletedMeals,
        profile: {
          ...prev.profile,
          totalMealsCompleted: newTotal,
        },
      }
    })
  }, [])

  const setWaterGlasses = useCallback((glasses: number) => {
    setState((prev) => ({ ...prev, waterGlasses: glasses }))
  }, [])

  const addWater = useCallback(() => {
    setState((prev) => ({ ...prev, waterGlasses: Math.min(prev.waterGlasses + 1, 12) }))
  }, [])

  const removeWater = useCallback(() => {
    setState((prev) => ({ ...prev, waterGlasses: Math.max(prev.waterGlasses - 1, 0) }))
  }, [])

  const setHasSeenSplash = useCallback((seen: boolean) => {
    setState((prev) => ({ ...prev, hasSeenSplash: seen }))
  }, [])

  const setMealOrder = useCallback((order: string[]) => {
    setState((prev) => ({ ...prev, mealOrder: order }))
  }, [])

  const incrementStreak = useCallback(() => {
    setState((prev) => {
      const newStreak = prev.profile.streak + 1
      const newLongest = Math.max(newStreak, prev.profile.longestStreak)
      return {
        ...prev,
        profile: {
          ...prev.profile,
          streak: newStreak,
          longestStreak: newLongest,
        },
      }
    })
  }, [])

  const addAchievement = useCallback((achievement: string) => {
    setState((prev) => {
      if (prev.achievements.includes(achievement)) return prev
      return {
        ...prev,
        achievements: [...prev.achievements, achievement],
      }
    })
  }, [])

  const markDayComplete = useCallback(() => {
    const today = getTodayString()
    setState((prev) => {
      if (prev.dailyStreak[today]) return prev
      
      const newStreak = prev.profile.streak + 1
      const newLongest = Math.max(newStreak, prev.profile.longestStreak)
      
      return {
        ...prev,
        dailyStreak: { ...prev.dailyStreak, [today]: true },
        profile: {
          ...prev.profile,
          streak: newStreak,
          longestStreak: newLongest,
        },
      }
    })
  }, [])

  const resetState = useCallback(() => {
    setState(defaultState)
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY)
    }
  }, [])

  return {
    state,
    isLoaded,
    updateProfile,
    setCompletedMeals,
    toggleMeal,
    setWaterGlasses,
    addWater,
    removeWater,
    setHasSeenSplash,
    setMealOrder,
    incrementStreak,
    addAchievement,
    markDayComplete,
    resetState,
  }
}

// Vibe configurations for UI theming
export const vibeConfigs = {
  chill: {
    label: 'Chill',
    description: 'Relaxed vibes, easy pace',
    emoji: '🌊',
    accentHue: 200,
    greeting: 'Take it easy today',
    copyTone: 'relaxed',
    animationSpeed: 1.2,
    colors: {
      accent: 'oklch(0.7 0.15 200)',
      glow: 'rgba(56, 189, 248, 0.3)',
    },
  },
  energetic: {
    label: 'Energetic',
    description: 'High energy, crush goals',
    emoji: '⚡',
    accentHue: 45,
    greeting: "Let's crush it!",
    copyTone: 'pumped',
    animationSpeed: 0.8,
    colors: {
      accent: 'oklch(0.8 0.2 85)',
      glow: 'rgba(251, 191, 36, 0.3)',
    },
  },
  focused: {
    label: 'Focused',
    description: 'Dialed in, no distractions',
    emoji: '🎯',
    accentHue: 280,
    greeting: 'Stay locked in',
    copyTone: 'precise',
    animationSpeed: 1.0,
    colors: {
      accent: 'oklch(0.6 0.2 280)',
      glow: 'rgba(167, 139, 250, 0.3)',
    },
  },
  balanced: {
    label: 'Balanced',
    description: 'Steady and sustainable',
    emoji: '☯️',
    accentHue: 145,
    greeting: 'Balance is key',
    copyTone: 'calm',
    animationSpeed: 1.0,
    colors: {
      accent: 'oklch(0.696 0.17 145)',
      glow: 'rgba(34, 197, 94, 0.3)',
    },
  },
} as const

export type VibeType = keyof typeof vibeConfigs

// Allergies list
export const commonAllergies = [
  { id: 'dairy', label: 'Dairy' },
  { id: 'gluten', label: 'Gluten' },
  { id: 'nuts', label: 'Tree Nuts' },
  { id: 'peanuts', label: 'Peanuts' },
  { id: 'soy', label: 'Soy' },
  { id: 'eggs', label: 'Eggs' },
  { id: 'shellfish', label: 'Shellfish' },
  { id: 'fish', label: 'Fish' },
]

// Common cravings
export const commonCravings = [
  { id: 'sweet', label: 'Sweet' },
  { id: 'salty', label: 'Salty' },
  { id: 'savory', label: 'Savory' },
  { id: 'spicy', label: 'Spicy' },
  { id: 'crunchy', label: 'Crunchy' },
  { id: 'creamy', label: 'Creamy' },
  { id: 'fresh', label: 'Fresh' },
  { id: 'comfort', label: 'Comfort Food' },
]

// Achievement definitions
export const achievements = {
  firstMeal: { id: 'firstMeal', title: 'First Bite', description: 'Complete your first meal', icon: '🍽️' },
  streak3: { id: 'streak3', title: 'Hat Trick', description: '3 day streak', icon: '🔥' },
  streak7: { id: 'streak7', title: 'Week Warrior', description: '7 day streak', icon: '💪' },
  streak30: { id: 'streak30', title: 'Monthly Master', description: '30 day streak', icon: '🏆' },
  hydrated: { id: 'hydrated', title: 'Stay Hydrated', description: 'Hit water goal 7 days', icon: '💧' },
  allMeals: { id: 'allMeals', title: 'Clean Plate', description: 'Complete all daily meals', icon: '✨' },
  meals50: { id: 'meals50', title: 'Halfway Hero', description: 'Complete 50 meals', icon: '🎯' },
  meals100: { id: 'meals100', title: 'Century Club', description: 'Complete 100 meals', icon: '💯' },
}

// Custom hook for vibe-aware animations
export function useVibeAnimation(baseAnimation: object, vibe: VibeType) {
  const config = vibeConfigs[vibe]
  
  return useMemo(() => {
    const speed = config.animationSpeed
    
    // Adjust animation durations based on vibe
    const adjustedAnimation = { ...baseAnimation }
    
    if ('duration' in adjustedAnimation && typeof adjustedAnimation.duration === 'number') {
      adjustedAnimation.duration = adjustedAnimation.duration * speed
    }
    
    return adjustedAnimation
  }, [baseAnimation, config.animationSpeed])
}
