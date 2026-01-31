'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { GradientBorder } from '@/components/ui/gradient-border'
import { MagneticButton } from '@/components/antigravity/magnetic-button'
import { Check, Sparkles, Zap, Crown } from 'lucide-react'

const plans = [
  {
    name: 'Starter',
    icon: Zap,
    price: 'Free',
    period: 'forever',
    description: 'Perfect for getting started with AI nutrition',
    features: [
      'Basic meal suggestions',
      '3 meal swaps per day',
      'Calorie tracking',
      'Community support',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Pro',
    icon: Sparkles,
    price: '$9',
    period: '/month',
    description: 'Advanced features for serious health goals',
    features: [
      'Unlimited AI meal plans',
      'Unlimited meal swaps',
      'Macro & micronutrient tracking',
      'Smart recipe scaling',
      'Priority support',
      'Custom meal timing',
    ],
    cta: 'Start Free Trial',
    popular: true,
  },
  {
    name: 'Elite',
    icon: Crown,
    price: '$19',
    period: '/month',
    description: 'Complete solution for peak performance',
    features: [
      'Everything in Pro',
      '1-on-1 nutritionist chat',
      'Advanced analytics',
      'Family meal planning',
      'Supplement recommendations',
      'Competition prep mode',
      'API access',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
]

export function Pricing({ onGetStarted }: { onGetStarted?: () => void }) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="relative px-4 sm:px-6 py-20 sm:py-32" aria-labelledby="pricing-heading">
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
            Simple Pricing
          </span>
          <h2
            id="pricing-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4"
          >
            Choose Your Plan
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Start free, upgrade when you are ready. No hidden fees, cancel anytime.
          </p>
        </motion.div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: prefersReducedMotion ? 0 : index * 0.15, duration: 0.6 }}
              className="relative"
            >
              {plan.popular ? (
                <GradientBorder className="h-full">
                  <div className="p-6 lg:p-8 h-full flex flex-col">
                    {/* Popular badge */}
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="px-4 py-1 rounded-full bg-gradient-to-r from-primary to-cyan-400 text-xs font-semibold text-black">
                        Most Popular
                      </span>
                    </div>
                    
                    <PlanContent plan={plan} onGetStarted={onGetStarted} />
                  </div>
                </GradientBorder>
              ) : (
                <div className="h-full p-6 lg:p-8 rounded-2xl bg-card border border-glass-border hover:border-primary/30 transition-colors flex flex-col">
                  <PlanContent plan={plan} onGetStarted={onGetStarted} />
                </div>
              )}
            </motion.div>
          ))}
        </div>
        
        {/* Trust badges */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-6 mt-12 text-sm text-muted-foreground"
        >
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-primary" />
            <span>No credit card required</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-primary" />
            <span>14-day free trial on Pro</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-primary" />
            <span>Cancel anytime</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function PlanContent({ plan, onGetStarted }: { plan: typeof plans[0]; onGetStarted?: () => void }) {
  return (
    <>
      {/* Icon & Name */}
      <div className="flex items-center gap-3 mb-4">
        <div className={`p-2 rounded-lg ${plan.popular ? 'bg-primary/20' : 'bg-secondary'}`}>
          <plan.icon className={`w-5 h-5 ${plan.popular ? 'text-primary' : 'text-foreground'}`} />
        </div>
        <h3 className="text-xl font-semibold text-foreground">{plan.name}</h3>
      </div>
      
      {/* Price */}
      <div className="mb-4">
        <span className="text-4xl font-bold text-foreground">{plan.price}</span>
        <span className="text-muted-foreground">{plan.period}</span>
      </div>
      
      {/* Description */}
      <p className="text-sm text-muted-foreground mb-6">
        {plan.description}
      </p>
      
      {/* Features */}
      <ul className="space-y-3 mb-8 flex-1">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3">
            <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <span className="text-sm text-muted-foreground">{feature}</span>
          </li>
        ))}
      </ul>
      
      {/* CTA */}
      {plan.popular ? (
        <MagneticButton onClick={onGetStarted} className="w-full">
          {plan.cta}
        </MagneticButton>
      ) : (
        <button
          onClick={onGetStarted}
          className="w-full py-3 px-6 rounded-full font-semibold border border-glass-border hover:bg-secondary transition-colors"
        >
          {plan.cta}
        </button>
      )}
    </>
  )
}
