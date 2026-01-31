'use client'

import { useEffect, useState, useCallback } from 'react'

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
  vibe: 'chill' | 'energetic' | 'focused' | 'balanced'
  streak: number
  joinedDate: string
  completedOnboarding: boolean
}

export interface AppState {
  profile: UserProfile
  completedMeals: string[]
  waterGlasses: number
  hasSeenSplash: boolean
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
  streak: 0,
  joinedDate: '',
  completedOnboarding: false,
}

const defaultState: AppState = {
  profile: defaultProfile,
  completedMeals: [],
  waterGlasses: 0,
  hasSeenSplash: false,
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

// Custom hook for app state with localStorage persistence
export function useAppState() {
  const [state, setState] = useState<AppState>(defaultState)
  const [isLoaded, setIsLoaded] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    const loaded = loadState()
    setState(loaded)
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
    setState((prev) => ({
      ...prev,
      completedMeals: prev.completedMeals.includes(mealId)
        ? prev.completedMeals.filter((id) => id !== mealId)
        : [...prev.completedMeals, mealId],
    }))
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
  },
  energetic: {
    label: 'Energetic',
    description: 'High energy, crush goals',
    emoji: '⚡',
    accentHue: 45,
    greeting: 'Let\'s crush it!',
  },
  focused: {
    label: 'Focused',
    description: 'Dialed in, no distractions',
    emoji: '🎯',
    accentHue: 280,
    greeting: 'Stay locked in',
  },
  balanced: {
    label: 'Balanced',
    description: 'Steady and sustainable',
    emoji: '☯️',
    accentHue: 145,
    greeting: 'Balance is key',
  },
} as const

export type VibeType = keyof typeof vibeConfigs
