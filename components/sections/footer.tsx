'use client'

import React from "react"

import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Sparkles, Twitter, Github, Linkedin, Instagram, ArrowRight, Loader2 } from 'lucide-react'
import Link from 'next/link'

const footerLinks = {
  product: [
    { label: 'Features', href: '#' },
    { label: 'Pricing', href: '#' },
    { label: 'Integrations', href: '#' },
    { label: 'Changelog', href: '#' },
  ],
  company: [
    { label: 'About', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Press', href: '#' },
  ],
  resources: [
    { label: 'Help Center', href: '#' },
    { label: 'Documentation', href: '#' },
    { label: 'API Reference', href: '#' },
    { label: 'Community', href: '#' },
  ],
  legal: [
    { label: 'Privacy', href: '#' },
    { label: 'Terms', href: '#' },
    { label: 'Security', href: '#' },
    { label: 'Cookies', href: '#' },
  ],
}

const socialLinks = [
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Instagram, href: '#', label: 'Instagram' },
]

export function Footer() {
  const prefersReducedMotion = useReducedMotion()
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSubmitting(false)
    setIsSubscribed(true)
    setEmail('')
  }

  return (
    <footer className="relative px-4 sm:px-6 pt-20 pb-8 border-t border-glass-border">
      <div className="max-w-6xl mx-auto">
        {/* Newsletter */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 p-8 rounded-2xl bg-gradient-to-r from-primary/10 to-cyan-400/10 border border-glass-border"
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="text-center lg:text-left">
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Stay in the loop
              </h3>
              <p className="text-muted-foreground">
                Get nutrition tips, product updates, and exclusive offers delivered to your inbox.
              </p>
            </div>
            
            <form onSubmit={handleSubscribe} className="w-full lg:w-auto flex gap-3">
              <div className="relative flex-1 lg:w-64">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 rounded-xl bg-background border border-glass-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                  disabled={isSubscribed}
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting || isSubscribed}
                className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {isSubmitting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : isSubscribed ? (
                  'Subscribed!'
                ) : (
                  <>
                    Subscribe
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </motion.div>

        {/* Links grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-bold text-lg text-foreground">BiteAI</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              AI-powered nutrition for a healthier you. Transform your eating habits with personalized meal plans.
            </p>
            
            {/* Social links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="p-2 rounded-lg bg-secondary hover:bg-primary/20 hover:text-primary transition-colors"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold text-foreground capitalize mb-4">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-glass-border flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© 2026 BiteAI. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with
            <motion.span
              animate={prefersReducedMotion ? {} : { scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="text-primary"
            >
              ♥
            </motion.span>
            for healthier humans
          </p>
        </div>
      </div>
    </footer>
  )
}
