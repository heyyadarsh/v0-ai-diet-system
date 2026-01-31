'use client'

import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Sparkles, Apple, Leaf, Salad, Carrot } from 'lucide-react'

interface SplashScreenProps {
  onComplete: () => void
  minDuration?: number
}

const floatingIcons = [
  { icon: Apple, color: 'text-red-400', x: -120, y: -80 },
  { icon: Leaf, color: 'text-emerald-400', x: 130, y: -60 },
  { icon: Salad, color: 'text-green-400', x: -100, y: 90 },
  { icon: Carrot, color: 'text-orange-400', x: 110, y: 70 },
]

export function SplashScreen({ onComplete, minDuration = 2500 }: SplashScreenProps) {
  const prefersReducedMotion = useReducedMotion()
  const [isExiting, setIsExiting] = useState(false)
  const [loadingProgress, setLoadingProgress] = useState(0)

  useEffect(() => {
    // Animate loading progress
    const progressInterval = setInterval(() => {
      setLoadingProgress((prev) => Math.min(prev + Math.random() * 15, 100))
    }, 200)

    const timer = setTimeout(() => {
      setIsExiting(true)
      clearInterval(progressInterval)
    }, minDuration)

    return () => {
      clearTimeout(timer)
      clearInterval(progressInterval)
    }
  }, [minDuration])

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Animated background */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Aurora effect */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="absolute inset-0"
            >
              <motion.div
                animate={prefersReducedMotion ? {} : { scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-r from-primary/20 via-cyan-500/10 to-primary/20 blur-3xl"
              />
            </motion.div>
            
            {/* Grid pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(34,197,94,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(34,197,94,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
          </div>

          {/* Logo container */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Floating food icons */}
            {!prefersReducedMotion && (
              <div className="absolute inset-0">
                {floatingIcons.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                    animate={{ 
                      opacity: [0, 0.6, 0.6],
                      scale: [0, 1, 1],
                      x: item.x,
                      y: item.y,
                    }}
                    transition={{ 
                      delay: 0.8 + index * 0.1,
                      duration: 0.5,
                    }}
                    className={`absolute left-1/2 top-1/2 ${item.color}`}
                  >
                    <motion.div
                      animate={{ y: [-5, 5, -5], rotate: [-10, 10, -10] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: index * 0.2 }}
                    >
                      <item.icon className="w-6 h-6" />
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Animated logo */}
            <motion.div
              initial={{ scale: 0, opacity: 0, rotate: -180 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
              className="relative mb-8"
            >
              {/* Outer ring with gradient */}
              <motion.div
                animate={prefersReducedMotion ? {} : { rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                className="absolute -inset-6 rounded-full"
                style={{
                  background: 'conic-gradient(from 0deg, transparent, rgba(34, 197, 94, 0.3), transparent, rgba(6, 182, 212, 0.2), transparent)',
                }}
              />
              
              {/* Inner ring */}
              <motion.div
                animate={prefersReducedMotion ? {} : { rotate: -360 }}
                transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                className="absolute -inset-3 rounded-full border border-primary/20"
              />
              
              {/* Logo circle */}
              <div className="w-28 h-28 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 flex items-center justify-center backdrop-blur-sm">
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, type: 'spring' }}
                  className="flex items-center gap-1"
                >
                  <span className="text-4xl font-bold text-primary">B</span>
                  <Sparkles className="w-5 h-5 text-primary" />
                </motion.div>
              </div>
              
              {/* Multiple pulse effects */}
              {!prefersReducedMotion && [0, 0.5, 1].map((delay, i) => (
                <motion.div
                  key={i}
                  animate={{ scale: [1, 2], opacity: [0.4, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay }}
                  className="absolute inset-0 rounded-full border border-primary"
                />
              ))}
            </motion.div>

            {/* Brand name with gradient */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-4xl font-bold mb-2"
            >
              <span className="bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
                BiteAI
              </span>
            </motion.h1>

            {/* Animated tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="text-sm text-muted-foreground mb-8"
            >
              <motion.span
                animate={prefersReducedMotion ? {} : { opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Preparing your personalized experience...
              </motion.span>
            </motion.p>

            {/* Loading bar with percentage */}
            <div className="w-48 space-y-2">
              <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${loadingProgress}%` }}
                  transition={{ duration: 0.3 }}
                  className="h-full bg-gradient-to-r from-primary to-cyan-400 rounded-full relative"
                >
                  {/* Shimmer effect */}
                  {!prefersReducedMotion && (
                    <motion.div
                      animate={{ x: ['-100%', '200%'] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                      className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    />
                  )}
                </motion.div>
              </div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-xs text-center text-muted-foreground tabular-nums"
              >
                {Math.round(loadingProgress)}% loaded
              </motion.p>
            </div>
          </div>

          {/* Bottom decoration */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="absolute bottom-8 text-xs text-muted-foreground/50"
          >
            Powered by AI
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
