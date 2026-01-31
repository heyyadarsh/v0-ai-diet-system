'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

const shimmer = {
  initial: { x: '-100%' },
  animate: { x: '100%' },
}

function SkeletonBase({ className }: { className?: string }) {
  return (
    <div className={cn('relative overflow-hidden rounded-lg bg-secondary', className)}>
      <motion.div
        variants={shimmer}
        initial="initial"
        animate="animate"
        transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-muted/50 to-transparent"
      />
    </div>
  )
}

export function MacroStatsSkeleton() {
  return (
    <div className="bg-glass backdrop-blur-xl rounded-2xl border border-glass-border p-6">
      <SkeletonBase className="h-6 w-40 mb-6" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex flex-col items-center gap-3">
            <SkeletonBase className="w-[100px] h-[100px] rounded-full" />
            <SkeletonBase className="h-4 w-16" />
          </div>
        ))}
      </div>
    </div>
  )
}

export function MealCardSkeleton() {
  return (
    <div className="bg-glass backdrop-blur-xl rounded-2xl border border-glass-border p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 space-y-3">
          <SkeletonBase className="h-4 w-20" />
          <SkeletonBase className="h-6 w-40" />
          <div className="flex gap-2">
            <SkeletonBase className="h-6 w-16 rounded-full" />
            <SkeletonBase className="h-6 w-12 rounded-full" />
            <SkeletonBase className="h-6 w-12 rounded-full" />
          </div>
          <SkeletonBase className="h-4 w-full" />
        </div>
        <SkeletonBase className="w-10 h-10 rounded-full shrink-0" />
      </div>
    </div>
  )
}

export function MealGridSkeleton() {
  return (
    <div className="space-y-4">
      <SkeletonBase className="h-6 w-32" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[...Array(4)].map((_, i) => (
          <MealCardSkeleton key={i} />
        ))}
      </div>
    </div>
  )
}

export function WaterTrackerSkeleton() {
  return (
    <div className="bg-glass backdrop-blur-xl rounded-2xl border border-glass-border p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <SkeletonBase className="w-5 h-5 rounded" />
          <SkeletonBase className="h-6 w-32" />
        </div>
        <SkeletonBase className="h-4 w-20" />
      </div>
      <SkeletonBase className="h-48 w-full rounded-2xl mb-6" />
      <div className="flex items-center justify-center gap-4">
        <SkeletonBase className="w-12 h-12 rounded-full" />
        <SkeletonBase className="h-4 w-32" />
        <SkeletonBase className="w-12 h-12 rounded-full" />
      </div>
    </div>
  )
}

export function ProfileCardSkeleton() {
  return (
    <div className="bg-glass backdrop-blur-xl rounded-2xl border border-glass-border p-6">
      <div className="flex items-center gap-4 mb-6">
        <SkeletonBase className="w-20 h-20 rounded-full" />
        <div className="flex-1 space-y-2">
          <SkeletonBase className="h-6 w-32" />
          <SkeletonBase className="h-4 w-48" />
        </div>
      </div>
      <div className="space-y-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex justify-between items-center">
            <SkeletonBase className="h-4 w-24" />
            <SkeletonBase className="h-4 w-20" />
          </div>
        ))}
      </div>
    </div>
  )
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <MacroStatsSkeleton />
      <MealGridSkeleton />
      <WaterTrackerSkeleton />
    </div>
  )
}
