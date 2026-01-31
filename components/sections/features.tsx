'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { BentoGrid, BentoCard } from '@/components/ui/bento-grid'
import { SpotlightCard } from '@/components/ui/spotlight-card'
import { Brain, Zap, Shield, LineChart, Sparkles, Clock, Camera, Users, Globe } from 'lucide-react'

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Analysis',
    description: 'Advanced algorithms analyze your biometrics, preferences, and goals to create the perfect nutrition plan tailored just for you.',
    className: 'md:col-span-2',
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />
    ),
  },
  {
    icon: Zap,
    title: 'Real-Time Adaptation',
    description: 'Your meal plan evolves with you. BiteAI learns from your feedback and adjusts recommendations instantly.',
    className: '',
  },
  {
    icon: Camera,
    title: 'Photo Recognition',
    description: 'Snap a photo of your meal and let AI identify ingredients and calculate nutrition automatically.',
    className: '',
  },
  {
    icon: Shield,
    title: 'Scientifically Backed',
    description: 'Every recommendation is grounded in peer-reviewed nutritional science and validated by registered dietitians.',
    className: 'md:col-span-2',
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent" />
    ),
  },
]

const additionalFeatures = [
  {
    icon: LineChart,
    title: 'Progress Tracking',
    description: 'Visualize your journey with beautiful dashboards showing macros, calories, and goal progress.',
  },
  {
    icon: Sparkles,
    title: 'Smart Suggestions',
    description: 'Get intelligent meal swaps and alternatives that fit your taste while meeting your nutritional needs.',
  },
  {
    icon: Clock,
    title: 'Meal Timing',
    description: 'Optimize when you eat for better energy, performance, and results based on your lifestyle.',
  },
  {
    icon: Users,
    title: 'Family Planning',
    description: 'Scale recipes and create meal plans for your entire family with dietary preferences respected.',
  },
  {
    icon: Globe,
    title: 'Global Cuisines',
    description: 'Explore healthy recipes from around the world, adapted to your nutritional requirements.',
  },
]

export function Features() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="relative px-4 sm:px-6 py-20 sm:py-32" aria-labelledby="features-heading">
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
            Powerful Features
          </span>
          <h2 
            id="features-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4"
          >
            Nutrition, Reimagined
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience the future of personalized nutrition with cutting-edge AI technology
          </p>
        </motion.div>

        {/* Bento Grid */}
        <BentoGrid className="mb-16">
          {features.map((feature, index) => (
            <BentoCard
              key={feature.title}
              icon={<feature.icon className="w-6 h-6" />}
              title={feature.title}
              description={feature.description}
              className={feature.className}
              background={feature.background}
            />
          ))}
        </BentoGrid>

        {/* Additional features grid */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h3 className="text-xl font-semibold text-foreground text-center mb-8">
            And so much more...
          </h3>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {additionalFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: prefersReducedMotion ? 0 : index * 0.1, duration: 0.6 }}
            >
              <SpotlightCard className="h-full p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-primary/10 text-primary shrink-0">
                    <feature.icon className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA hint */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16"
        >
          <p className="text-sm text-muted-foreground">
            Join <span className="text-primary font-semibold">50,000+</span> users transforming their nutrition journey
          </p>
        </motion.div>
      </div>
    </section>
  )
}
