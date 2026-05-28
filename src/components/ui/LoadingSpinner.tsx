'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  className?: string;
}

export function LoadingSpinner({ size = 'md', text, className }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className={cn('flex flex-col items-center justify-center gap-3', className)}>
      <div className={cn('relative', sizeClasses[size])}>
        <div className={cn('absolute inset-0 rounded-full border-2 border-brand-500/20', sizeClasses[size])} />
        <div
          className={cn(
            'absolute inset-0 rounded-full border-2 border-transparent border-t-brand-500 animate-spin',
            sizeClasses[size]
          )}
        />
        <div
          className={cn(
            'absolute inset-1 rounded-full border-2 border-transparent border-t-accent-500 animate-spin',
            size === 'lg' ? 'w-10 h-10' : size === 'md' ? 'w-6 h-6' : 'w-2 h-2'
          )}
          style={{ animationDirection: 'reverse', animationDuration: '0.8s' }}
        />
      </div>
      {text && (
        <p className="text-slate-400 text-sm font-medium">{text}</p>
      )}
    </div>
  );
}

/** AI Thinking animation */
export function AIThinking({ text = 'AI is thinking...' }: { text?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center gap-6 py-16"
    >
      {/* Animated orb */}
      <div className="relative w-20 h-20">
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)' }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="absolute inset-2 rounded-full bg-dark-950 flex items-center justify-center">
          <motion.div
            className="text-2xl"
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          >
            ✦
          </motion.div>
        </div>
      </div>

      {/* Thinking dots */}
      <div className="flex flex-col items-center gap-2">
        <p className="text-white font-semibold text-lg">{text}</p>
        <div className="thinking-dots flex gap-2">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="w-2 h-2 rounded-full bg-brand-500 block"
              animate={{ scale: [0.6, 1, 0.6], opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-64 h-1 bg-dark-800 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: 'linear-gradient(90deg, #8b5cf6, #3b82f6)' }}
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    </motion.div>
  );
}

/** Skeleton card */
export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div className={cn('glass-card p-6 space-y-4', className)}>
      <div className="skeleton h-4 w-32 rounded" />
      <div className="skeleton h-6 w-full rounded" />
      <div className="skeleton h-6 w-3/4 rounded" />
      <div className="skeleton h-4 w-1/2 rounded" />
    </div>
  );
}
