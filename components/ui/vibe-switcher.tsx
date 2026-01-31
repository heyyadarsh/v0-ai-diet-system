'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { vibeConfigs, type VibeType } from '@/lib/store'
import { cn } from '@/lib/utils'
import { ChevronDown, Check } from 'lucide-react'

interface VibeSwitcherProps {
  currentVibe: VibeType
  onVibeChange: (vibe: VibeType) => void
  compact?: boolean
}

export function VibeSwitcher({ currentVibe, onVibeChange, compact = false }: VibeSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false)
  const current = vibeConfigs[currentVibe]

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          'flex items-center gap-2 rounded-xl border border-glass-border bg-glass backdrop-blur-xl transition-colors',
          'hover:border-primary/30',
          compact ? 'px-3 py-2' : 'px-4 py-3'
        )}
      >
        <span className="text-lg">{current.emoji}</span>
        {!compact && (
          <>
            <span className="text-sm font-medium text-foreground">{current.label}</span>
            <ChevronDown
              className={cn(
                'w-4 h-4 text-muted-foreground transition-transform',
                isOpen && 'rotate-180'
              )}
            />
          </>
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40"
            />

            {/* Dropdown */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={cn(
                'absolute top-full mt-2 z-50 w-64 p-2',
                'rounded-xl border border-glass-border bg-card/95 backdrop-blur-xl',
                'shadow-[0_8px_32px_rgba(0,0,0,0.4)]',
                compact ? 'right-0' : 'left-0'
              )}
            >
              <p className="px-3 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                {"Today's Vibe"}
              </p>
              
              {(Object.keys(vibeConfigs) as VibeType[]).map((vibe) => {
                const config = vibeConfigs[vibe]
                const isSelected = vibe === currentVibe
                
                return (
                  <motion.button
                    key={vibe}
                    onClick={() => {
                      onVibeChange(vibe)
                      setIsOpen(false)
                    }}
                    whileHover={{ x: 4 }}
                    className={cn(
                      'w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-colors text-left',
                      isSelected ? 'bg-primary/10' : 'hover:bg-secondary'
                    )}
                  >
                    <span className="text-xl">{config.emoji}</span>
                    <div className="flex-1">
                      <p className={cn(
                        'text-sm font-medium',
                        isSelected ? 'text-primary' : 'text-foreground'
                      )}>
                        {config.label}
                      </p>
                      <p className="text-xs text-muted-foreground">{config.description}</p>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-primary" />}
                  </motion.button>
                )
              })}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
