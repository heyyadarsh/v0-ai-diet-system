'use client'

import { useCallback, useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

interface ConfettiPiece {
  id: number
  x: number
  color: string
  rotation: number
  scale: number
}

interface ConfettiProps {
  isActive: boolean
  count?: number
  colors?: string[]
  duration?: number
  spread?: number
}

const defaultColors = [
  '#22c55e', // primary green
  '#06b6d4', // cyan
  '#f59e0b', // amber
  '#ec4899', // pink
  '#8b5cf6', // violet
]

export function Confetti({ 
  isActive, 
  count = 30, 
  colors = defaultColors,
  duration = 2000,
  spread = 200,
}: ConfettiProps) {
  const prefersReducedMotion = useReducedMotion()
  const [pieces, setPieces] = useState<ConfettiPiece[]>([])

  const generatePieces = useCallback(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * spread - spread / 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      scale: 0.5 + Math.random() * 0.5,
    }))
  }, [count, colors, spread])

  useEffect(() => {
    if (isActive && !prefersReducedMotion) {
      setPieces(generatePieces())
      const timer = setTimeout(() => setPieces([]), duration)
      return () => clearTimeout(timer)
    }
  }, [isActive, generatePieces, duration, prefersReducedMotion])

  if (prefersReducedMotion) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      <AnimatePresence>
        {pieces.map((piece) => (
          <motion.div
            key={piece.id}
            initial={{ 
              x: '50vw', 
              y: '50vh', 
              opacity: 1,
              scale: 0,
              rotate: 0,
            }}
            animate={{ 
              x: `calc(50vw + ${piece.x}px)`,
              y: ['50vh', '120vh'],
              opacity: [1, 1, 0],
              scale: piece.scale,
              rotate: piece.rotation + 720,
            }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: duration / 1000,
              ease: [0.25, 0.46, 0.45, 0.94],
              y: { duration: duration / 1000, ease: [0.22, 1, 0.36, 1] },
            }}
            className="absolute"
          >
            <div 
              className="w-3 h-3 rounded-sm"
              style={{ backgroundColor: piece.color }}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

// Micro-burst for smaller celebrations
export function MicroBurst({ 
  isActive, 
  x = '50%', 
  y = '50%',
  count = 8,
}: { 
  isActive: boolean
  x?: string | number
  y?: string | number
  count?: number
}) {
  const prefersReducedMotion = useReducedMotion()
  const [particles, setParticles] = useState<number[]>([])

  useEffect(() => {
    if (isActive && !prefersReducedMotion) {
      setParticles(Array.from({ length: count }, (_, i) => i))
      const timer = setTimeout(() => setParticles([]), 600)
      return () => clearTimeout(timer)
    }
  }, [isActive, count, prefersReducedMotion])

  if (prefersReducedMotion) return null

  return (
    <div 
      className="absolute pointer-events-none"
      style={{ left: x, top: y }}
    >
      <AnimatePresence>
        {particles.map((i) => {
          const angle = (i / count) * Math.PI * 2
          const distance = 30 + Math.random() * 20
          return (
            <motion.div
              key={i}
              initial={{ 
                scale: 0, 
                x: 0, 
                y: 0, 
                opacity: 1,
              }}
              animate={{ 
                scale: [0, 1, 0.5],
                x: Math.cos(angle) * distance,
                y: Math.sin(angle) * distance,
                opacity: [1, 1, 0],
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="absolute w-1.5 h-1.5 rounded-full bg-primary"
            />
          )
        })}
      </AnimatePresence>
    </div>
  )
}

// Celebration sparkles
export function CelebrationSparkles({ isActive }: { isActive: boolean }) {
  const prefersReducedMotion = useReducedMotion()
  
  if (prefersReducedMotion || !isActive) return null
  
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0, x: '50%', y: '50%' }}
          animate={{ 
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
            x: `${30 + i * 10}%`,
            y: `${20 + (i % 3) * 20}%`,
          }}
          transition={{ 
            duration: 0.8, 
            delay: i * 0.1,
            ease: 'easeOut',
          }}
          className="absolute text-2xl"
        >
          ✨
        </motion.div>
      ))}
    </div>
  )
}
