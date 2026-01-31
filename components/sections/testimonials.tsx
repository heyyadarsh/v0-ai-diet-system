'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Marquee } from '@/components/ui/marquee'
import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Fitness Enthusiast',
    avatar: 'SC',
    content: 'BiteAI completely transformed how I approach nutrition. Lost 20lbs in 3 months while actually enjoying my meals!',
    rating: 5,
  },
  {
    name: 'Marcus Johnson',
    role: 'Software Engineer',
    avatar: 'MJ',
    content: 'As someone with a busy schedule, the AI meal suggestions are a lifesaver. Smart, quick, and delicious.',
    rating: 5,
  },
  {
    name: 'Emily Rodriguez',
    role: 'Personal Trainer',
    avatar: 'ER',
    content: 'I recommend BiteAI to all my clients. The personalization is incredible - it actually understands individual needs.',
    rating: 5,
  },
  {
    name: 'David Kim',
    role: 'Marathon Runner',
    avatar: 'DK',
    content: 'The macro tracking and meal timing features helped me PR my marathon. Game changer for endurance athletes!',
    rating: 5,
  },
  {
    name: 'Olivia Thompson',
    role: 'Busy Mom',
    avatar: 'OT',
    content: 'Finally, an app that understands family cooking! BiteAI scales recipes perfectly for my household of 5.',
    rating: 5,
  },
  {
    name: 'James Wilson',
    role: 'Bodybuilder',
    avatar: 'JW',
    content: 'Precise macro calculations and smart swaps during cutting season. This AI knows its stuff!',
    rating: 5,
  },
]

function TestimonialCard({ testimonial }: { testimonial: typeof testimonials[0] }) {
  return (
    <div className="w-[350px] shrink-0 p-6 rounded-2xl bg-card border border-glass-border hover:border-primary/30 transition-colors">
      {/* Quote icon */}
      <Quote className="w-8 h-8 text-primary/30 mb-4" />
      
      {/* Rating */}
      <div className="flex gap-1 mb-3">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-primary text-primary" />
        ))}
      </div>
      
      {/* Content */}
      <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
        {`"${testimonial.content}"`}
      </p>
      
      {/* Author */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-cyan-400 flex items-center justify-center text-sm font-semibold text-white">
          {testimonial.avatar}
        </div>
        <div>
          <div className="font-semibold text-foreground text-sm">{testimonial.name}</div>
          <div className="text-xs text-muted-foreground">{testimonial.role}</div>
        </div>
      </div>
    </div>
  )
}

export function Testimonials() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="relative py-20 sm:py-32 overflow-hidden" aria-labelledby="testimonials-heading">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background pointer-events-none" />
      
      <div className="relative z-10">
        {/* Header */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center px-4 mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Loved by Thousands
          </span>
          <h2
            id="testimonials-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4"
          >
            What Our Users Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join 50,000+ people transforming their health with BiteAI
          </p>
        </motion.div>

        {/* Marquee rows */}
        <div className="space-y-4">
          <Marquee speed="slow">
            {testimonials.slice(0, 3).map((testimonial) => (
              <TestimonialCard key={testimonial.name} testimonial={testimonial} />
            ))}
          </Marquee>
          <Marquee speed="slow" reverse>
            {testimonials.slice(3).map((testimonial) => (
              <TestimonialCard key={testimonial.name} testimonial={testimonial} />
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  )
}
