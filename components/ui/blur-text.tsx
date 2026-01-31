'use client'

import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface BlurTextProps {
  text: string
  className?: string
  delay?: number
}

export function BlurText({ text, className, delay = 0 }: BlurTextProps) {
  const prefersReducedMotion = useReducedMotion()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay * 1000)
    return () => clearTimeout(timer)
  }, [delay])

  if (prefersReducedMotion) {
    return <span className={className}>{text}</span>
  }

  const words = text.split(' ')

  return (
    <span className={cn('inline-flex flex-wrap', className)}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-flex mr-[0.25em]">
          {word.split('').map((char, charIndex) => (
            <motion.span
              key={charIndex}
              initial={{ opacity: 0, filter: 'blur(10px)', y: 10 }}
              animate={isVisible ? { opacity: 1, filter: 'blur(0px)', y: 0 } : {}}
              transition={{
                duration: 0.4,
                delay: wordIndex * 0.1 + charIndex * 0.03,
                ease: [0.4, 0, 0.2, 1],
              }}
              className="inline-block"
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </span>
  )
}
