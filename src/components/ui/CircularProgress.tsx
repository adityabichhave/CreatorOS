'use client';

import { motion } from 'framer-motion';
import { getScoreHexColor, getScoreColor } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface CircularProgressProps {
  score: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  sublabel?: string;
  className?: string;
  animate?: boolean;
}

export function CircularProgress({
  score,
  size = 120,
  strokeWidth = 8,
  label,
  sublabel,
  className,
  animate = true,
}: CircularProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color = getScoreHexColor(score);

  return (
    <div className={cn('flex flex-col items-center gap-2', className)}>
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth={strokeWidth}
          />
          {/* Glow filter */}
          <defs>
            <filter id={`glow-${score}`}>
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {/* Progress circle */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={animate ? { strokeDashoffset: offset } : { strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
            style={{
              transform: 'rotate(-90deg)',
              transformOrigin: '50% 50%',
              filter: `url(#glow-${score})`,
            }}
          />
        </svg>
        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            className="text-2xl font-bold text-white"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            {score}
          </motion.span>
          {sublabel && (
            <span className="text-xs text-slate-400">{sublabel}</span>
          )}
        </div>
      </div>
      {label && (
        <p className="text-sm text-slate-400 text-center font-medium">{label}</p>
      )}
    </div>
  );
}

interface ScoreBarProps {
  label: string;
  score: number;
  className?: string;
}

export function ScoreBar({ label, score, className }: ScoreBarProps) {
  const color = getScoreHexColor(score);

  return (
    <div className={cn('space-y-2', className)}>
      <div className="flex justify-between items-center">
        <span className="text-sm text-slate-400 font-medium">{label}</span>
        <span className="text-sm font-bold" style={{ color }}>{score}/100</span>
      </div>
      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}aa, ${color})` }}
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
        />
      </div>
    </div>
  );
}
