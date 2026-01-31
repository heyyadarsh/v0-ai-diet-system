'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppState } from '@/lib/store'
import { Check, Sparkles } from 'lucide-react'

const analysisSteps = [
  { text: 'Analyzing your profile...', duration: 1000 },
  { text: 'Calculating optimal macros...', duration: 1200 },
  { text: 'Personalizing meal timing...', duration: 1000 },
  { text: 'Generating recipes for you...', duration: 1400 },
  { text: 'Finalizing your custom plan...', duration: 1200 },
]

// Personalized tips based on goals
const goalTips: Record<string, string[]> = {
  'weight-loss': [
    'Prioritizing protein to preserve muscle',
    'Creating a sustainable calorie deficit',
    'Timing meals for optimal fat burn',
  ],
  'muscle-gain': [
    'Calculating protein for muscle synthesis',
    'Planning pre & post workout nutrition',
    'Optimizing meal frequency for gains',
  ],
  'maintain': [
    'Balancing macros for maintenance',
    'Planning for lifestyle flexibility',
    'Setting up sustainable habits',
  ],
  'performance': [
    'Fueling for peak performance',
    'Timing carbs around training',
    'Optimizing recovery nutrition',
  ],
}

export default function AnalyzingPage() {
  const router = useRouter()
  const { state, isLoaded } = useAppState()
  const [currentStep, setCurrentStep] = useState(0)
  const [progress, setProgress] = useState(0)
  const [personalTip, setPersonalTip] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  const tips = state.profile.goal ? goalTips[state.profile.goal] || goalTips.maintain : goalTips.maintain

  const advanceStep = useCallback(() => {
    setCurrentStep((prev) => {
      if (prev < analysisSteps.length - 1) {
        return prev + 1
      }
      return prev
    })
  }, [])

  useEffect(() => {
    // Step progression
    const stepTimers: NodeJS.Timeout[] = []
    let totalDelay = 0

    analysisSteps.forEach((step, index) => {
      if (index > 0) {
        const timer = setTimeout(() => {
          advanceStep()
        }, totalDelay)
        stepTimers.push(timer)
      }
      totalDelay += step.duration
    })

    // Progress bar
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 100) {
          return Math.min(prev + 1.5, 100)
        }
        return prev
      })
    }, 60)

    // Tip rotation
    const tipInterval = setInterval(() => {
      setPersonalTip((prev) => (prev + 1) % tips.length)
    }, 2000)

    // Complete and redirect
    const completeTimer = setTimeout(() => {
      setIsComplete(true)
    }, totalDelay + 500)

    const redirectTimer = setTimeout(() => {
      router.push('/dashboard')
    }, totalDelay + 1500)

    return () => {
      stepTimers.forEach(clearTimeout)
      clearInterval(progressInterval)
      clearInterval(tipInterval)
      clearTimeout(completeTimer)
      clearTimeout(redirectTimer)
    }
  }, [router, advanceStep, tips.length])

  // Show loading while state loads
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <main className="relative min-h-screen bg-background flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/10 blur-3xl"
        />
      </div>

      <div className="relative z-10 flex flex-col items-center max-w-md w-full">
        {/* 3D Rotating Ring */}
        <div className="relative w-40 h-40 mb-8" style={{ perspective: '1000px' }}>
          {/* Outer ring */}
          <motion.div
            animate={{ rotateZ: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0"
            style={{ transformStyle: 'preserve-3d', transform: 'rotateX(60deg)' }}
          >
            <div
              className="absolute inset-0 rounded-full border-4 border-primary/30"
              style={{ boxShadow: '0 0 30px oklch(0.696 0.17 145 / 0.3)' }}
            />
          </motion.div>

          {/* Middle ring */}
          <motion.div
            animate={{ rotateZ: -360 }}
            transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-4"
            style={{ transformStyle: 'preserve-3d', transform: 'rotateX(60deg)' }}
          >
            <div
              className="absolute inset-0 rounded-full border-4 border-primary/50"
              style={{ boxShadow: '0 0 20px oklch(0.696 0.17 145 / 0.4)' }}
            />
          </motion.div>

          {/* Inner ring */}
          <motion.div
            animate={{ rotateZ: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-8"
            style={{ transformStyle: 'preserve-3d', transform: 'rotateX(60deg)' }}
          >
            <div
              className="absolute inset-0 rounded-full border-4 border-primary"
              style={{ boxShadow: '0 0 15px oklch(0.696 0.17 145 / 0.6)' }}
            />
          </motion.div>

          {/* Center content */}
          <AnimatePresence mode="wait">
            {isComplete ? (
              <motion.div
                key="complete"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-primary flex items-center justify-center"
                style={{ boxShadow: '0 0 30px oklch(0.696 0.17 145 / 0.8)' }}
              >
                <Check className="w-6 h-6 text-primary-foreground" />
              </motion.div>
            ) : (
              <motion.div
                key="loading"
                animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-primary"
                style={{ boxShadow: '0 0 20px oklch(0.696 0.17 145 / 0.8)' }}
              />
            )}
          </AnimatePresence>
        </div>

        {/* Personalized greeting */}
        {state.profile.name && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-muted-foreground mb-2"
          >
            Hey {state.profile.name.split(' ')[0]},
          </motion.p>
        )}

        {/* Shimmer text */}
        <AnimatePresence mode="wait">
          <motion.h1
            key={isComplete ? 'complete' : currentStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`text-xl md:text-2xl font-bold text-center mb-4 ${isComplete ? 'text-primary' : 'shimmer-text'}`}
          >
            {isComplete ? 'Your plan is ready!' : analysisSteps[currentStep].text}
          </motion.h1>
        </AnimatePresence>

        {/* Personalized tip */}
        <AnimatePresence mode="wait">
          <motion.div
            key={personalTip}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="flex items-center gap-2 text-sm text-muted-foreground mb-8"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span>{tips[personalTip]}</span>
          </motion.div>
        </AnimatePresence>

        {/* Progress bar */}
        <div className="w-full max-w-xs h-1.5 rounded-full bg-secondary overflow-hidden mb-2">
          <motion.div
            className="h-full bg-primary rounded-full"
            style={{ boxShadow: '0 0 10px oklch(0.696 0.17 145 / 0.5)' }}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>

        {/* Progress percentage */}
        <motion.p
          key={Math.floor(progress)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-muted-foreground"
        >
          {Math.floor(progress)}% Complete
        </motion.p>

        {/* Analysis steps list */}
        <div className="mt-10 space-y-3 w-full">
          {analysisSteps.map((step, index) => (
            <motion.div
              key={step.text}
              initial={{ opacity: 0, x: -20 }}
              animate={{
                opacity: index <= currentStep ? 1 : 0.3,
                x: 0,
              }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              className="flex items-center gap-3"
            >
              <motion.div
                animate={
                  index < currentStep
                    ? { scale: 1, backgroundColor: 'oklch(0.696 0.17 145)' }
                    : index === currentStep
                      ? { scale: [1, 1.3, 1] }
                      : {}
                }
                transition={index === currentStep ? { duration: 0.8, repeat: Infinity } : {}}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  index < currentStep
                    ? 'bg-primary'
                    : index === currentStep
                      ? 'bg-primary'
                      : 'bg-muted'
                }`}
              />
              <span
                className={`text-sm transition-colors ${
                  index <= currentStep ? 'text-foreground' : 'text-muted-foreground'
                }`}
              >
                {step.text}
              </span>
              {index < currentStep && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: 'spring' }}
                >
                  <Check className="w-4 h-4 text-primary" />
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  )
}
