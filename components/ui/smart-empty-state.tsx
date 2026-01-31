'use client'

import { motion } from 'framer-motion'
import { Utensils, Droplets, Target, User } from 'lucide-react'
import { MagneticButton } from '@/components/antigravity/magnetic-button'

interface SmartEmptyStateProps {
  type: 'meals' | 'water' | 'goals' | 'profile'
  onAction?: () => void
}

const configs = {
  meals: {
    icon: Utensils,
    title: 'No meals planned yet',
    description: "Let's fix that. Generate your personalized meal plan in seconds.",
    actionLabel: 'Generate Plan',
    gradient: 'from-primary/20 to-emerald-500/20',
  },
  water: {
    icon: Droplets,
    title: 'Start tracking your hydration',
    description: "Staying hydrated is key to your goals. Let's begin!",
    actionLabel: 'Add First Glass',
    gradient: 'from-blue-500/20 to-cyan-500/20',
  },
  goals: {
    icon: Target,
    title: 'Set your nutrition goals',
    description: 'Tell us what you want to achieve and we\'ll create your roadmap.',
    actionLabel: 'Set Goals',
    gradient: 'from-orange-500/20 to-yellow-500/20',
  },
  profile: {
    icon: User,
    title: 'Complete your profile',
    description: 'Help us personalize your experience with a few details.',
    actionLabel: 'Complete Profile',
    gradient: 'from-purple-500/20 to-pink-500/20',
  },
}

export function SmartEmptyState({ type, onAction }: SmartEmptyStateProps) {
  const config = configs[type]
  const Icon = config.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative bg-gradient-to-br ${config.gradient} rounded-2xl border border-glass-border p-8 text-center overflow-hidden`}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: '24px 24px',
        }} />
      </div>

      <div className="relative z-10">
        {/* Animated icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.2 }}
          className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-glass border border-glass-border flex items-center justify-center"
        >
          <motion.div
            animate={{ 
              y: [0, -5, 0],
              rotate: [0, -5, 5, 0]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Icon className="w-10 h-10 text-foreground" />
          </motion.div>
        </motion.div>

        <h3 className="text-xl font-semibold text-foreground mb-2">
          {config.title}
        </h3>
        <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
          {config.description}
        </p>

        {onAction && (
          <MagneticButton onClick={onAction} strength={0.3}>
            {config.actionLabel}
          </MagneticButton>
        )}
      </div>
    </motion.div>
  )
}
