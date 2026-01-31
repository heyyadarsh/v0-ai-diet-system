'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { SpotlightCard } from '@/components/ui/spotlight-card'
import { ClipboardList, Brain, UtensilsCrossed, TrendingUp, ArrowRight } from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: ClipboardList,
    title: 'Share Your Goals',
    description: 'Tell us about your fitness goals, dietary preferences, allergies, and lifestyle. Our AI listens and learns.',
    color: 'from-primary to-emerald-400',
  },
  {
    number: '02',
    icon: Brain,
    title: 'AI Analyzes',
    description: 'Our advanced algorithms process your biometrics, preferences, and goals to craft the perfect nutrition strategy.',
    color: 'from-cyan-400 to-blue-500',
  },
  {
    number: '03',
    icon: UtensilsCrossed,
    title: 'Get Your Plan',
    description: 'Receive a personalized meal plan with recipes, portions, and timing optimized for your success.',
    color: 'from-orange-400 to-amber-500',
  },
  {
    number: '04',
    icon: TrendingUp,
    title: 'Track & Adapt',
    description: 'Log meals, track progress, and watch as BiteAI continuously adapts your plan for optimal results.',
    color: 'from-purple-400 to-pink-500',
  },
]

export function HowItWorks() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="relative px-4 sm:px-6 py-20 sm:py-32" aria-labelledby="how-it-works-heading">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Simple Process
          </span>
          <h2
            id="how-it-works-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4"
          >
            How BiteAI Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Four simple steps to transform your nutrition journey forever
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: prefersReducedMotion ? 0 : index * 0.15, duration: 0.6 }}
              className="relative"
            >
              {/* Connection line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-[calc(50%+40px)] w-[calc(100%-80px)] h-[2px]">
                  <div className="w-full h-full bg-gradient-to-r from-glass-border to-transparent" />
                  <ArrowRight className="absolute -right-3 -top-[7px] w-4 h-4 text-muted-foreground" />
                </div>
              )}
              
              <SpotlightCard className="h-full">
                <div className="p-6 text-center">
                  {/* Step number */}
                  <motion.span
                    initial={prefersReducedMotion ? {} : { scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: prefersReducedMotion ? 0 : 0.3 + index * 0.1, type: 'spring' }}
                    className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br ${step.color} text-white text-lg font-bold mb-4`}
                  >
                    {step.number}
                  </motion.span>
                  
                  {/* Icon */}
                  <div className="flex justify-center mb-4">
                    <div className="p-3 rounded-xl bg-secondary">
                      <step.icon className="w-6 h-6 text-foreground" />
                    </div>
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
