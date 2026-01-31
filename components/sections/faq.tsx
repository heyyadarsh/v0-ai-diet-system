'use client'

import { motion, useReducedMotion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'
import { cn } from '@/lib/utils'

const faqs = [
  {
    question: 'How does BiteAI create personalized meal plans?',
    answer: 'BiteAI uses advanced machine learning algorithms that analyze your biometrics, dietary preferences, health goals, allergies, and lifestyle patterns. Our AI continuously learns from your feedback to refine recommendations, ensuring each meal plan gets more accurate over time.',
  },
  {
    question: 'Can I use BiteAI if I have dietary restrictions?',
    answer: 'Absolutely! BiteAI supports all major dietary preferences including vegan, vegetarian, keto, paleo, gluten-free, dairy-free, and many more. You can also specify individual ingredient allergies, and our AI will never suggest foods that conflict with your restrictions.',
  },
  {
    question: 'How accurate is the calorie and macro tracking?',
    answer: 'BiteAI uses one of the most comprehensive food databases available, with over 1 million verified food items. Our AI can also estimate portions from photos with 95%+ accuracy. For packaged foods, simply scan the barcode for instant, precise nutrition data.',
  },
  {
    question: 'Can I swap meals if I dont like a suggestion?',
    answer: 'Yes! With one tap, our AI instantly suggests alternatives that match your nutritional targets. Pro users get unlimited swaps, while free users get 3 per day. Each swap is intelligently chosen to keep your daily macros and calories on track.',
  },
  {
    question: 'Is my health data secure?',
    answer: 'Your privacy is our top priority. All data is encrypted end-to-end using bank-level security (AES-256). We never sell your data to third parties, and you can request complete data deletion at any time. We are HIPAA compliant and regularly audited.',
  },
  {
    question: 'Can BiteAI work with my fitness app or wearable?',
    answer: 'BiteAI integrates seamlessly with Apple Health, Google Fit, Fitbit, Garmin, and 30+ other platforms. This allows our AI to factor in your actual activity levels, sleep quality, and more for even better nutrition recommendations.',
  },
]

export function FAQ() {
  const prefersReducedMotion = useReducedMotion()
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="relative px-4 sm:px-6 py-20 sm:py-32" aria-labelledby="faq-heading">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            FAQ
          </span>
          <h2
            id="faq-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4"
          >
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground">
            Got questions? We have got answers.
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: prefersReducedMotion ? 0 : index * 0.1, duration: 0.5 }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className={cn(
                  'w-full flex items-center justify-between p-5 rounded-2xl text-left transition-all duration-300',
                  'bg-card border border-glass-border hover:border-primary/30',
                  openIndex === index && 'border-primary/50 bg-primary/5'
                )}
                aria-expanded={openIndex === index}
              >
                <span className="font-semibold text-foreground pr-4">
                  {faq.question}
                </span>
                <span className="shrink-0 p-1 rounded-full bg-secondary">
                  {openIndex === index ? (
                    <Minus className="w-4 h-4 text-primary" />
                  ) : (
                    <Plus className="w-4 h-4 text-muted-foreground" />
                  )}
                </span>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-5 pt-2 text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
