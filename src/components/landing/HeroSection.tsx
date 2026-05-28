'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Sparkles, ArrowRight, Play, Zap, TrendingUp, Youtube } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 animated-gradient" />
      <div className="absolute inset-0 bg-grid opacity-50" />

      {/* Blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blob opacity-20"
        style={{ background: 'radial-gradient(circle, #8b5cf6, transparent)' }} />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blob blob-2 opacity-15"
        style={{ background: 'radial-gradient(circle, #3b82f6, transparent)' }} />
      <div className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full blob blob-3 opacity-10"
        style={{ background: 'radial-gradient(circle, #ec4899, transparent)' }} />

      {/* Nav */}
      <nav className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)' }}>
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="text-xl font-bold text-white">CreatorOS</span>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="hidden md:flex items-center gap-8">
          {['Features', 'How It Works', 'Pricing'].map((item) => (
            <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`}
              className="text-slate-400 hover:text-white transition-colors text-sm font-medium">
              {item}
            </a>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
          <Link href="/dashboard" className="btn-primary text-sm px-5 py-2.5">
            <Zap className="w-4 h-4" />
            Get Started Free
          </Link>
        </motion.div>
      </nav>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto pt-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="section-label mb-6 mx-auto w-fit">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Powered by Google Gemini AI</span>
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6 text-balance">
          Turn Any Content Idea Into{' '}
          <span className="gradient-text">Viral Social Media</span>{' '}
          Content
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
          className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          AI-powered SEO, captions, trends, thumbnails, and virality optimization using Gemini.
          One idea → complete content package in seconds.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link href="/dashboard" className="btn-primary text-base px-8 py-4 group">
            <Sparkles className="w-5 h-5" />
            Start Creating Free
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <button className="btn-secondary text-base px-8 py-4 group">
            <Play className="w-4 h-4" />
            Watch Demo
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }}
          className="flex flex-wrap items-center justify-center gap-8 text-sm text-slate-500">
          {[
            { icon: <Zap className="w-4 h-4 text-brand-400" />, text: '10x faster content creation' },
            { icon: <TrendingUp className="w-4 h-4 text-green-400" />, text: '3x more views on average' },
            { icon: <Youtube className="w-4 h-4 text-red-400" />, text: 'YouTube & Instagram optimized' },
          ].map((s) => (
            <div key={s.text} className="flex items-center gap-2">
              {s.icon}
              <span>{s.text}</span>
            </div>
          ))}
        </motion.div>

        {/* Dashboard preview */}
        <motion.div initial={{ opacity: 0, y: 60, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-16 relative mx-auto max-w-4xl">
          <div className="glass-card p-1 rounded-2xl overflow-hidden"
            style={{ boxShadow: '0 40px 80px rgba(0,0,0,0.6), 0 0 80px rgba(139,92,246,0.15)' }}>
            <div className="bg-dark-900 rounded-xl overflow-hidden">
              {/* Mock browser bar */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
                {['#ef4444','#f59e0b','#22c55e'].map((c) => (
                  <div key={c} className="w-3 h-3 rounded-full" style={{ background: c }} />
                ))}
                <div className="flex-1 mx-4 h-6 rounded-md bg-white/5 flex items-center px-3">
                  <span className="text-xs text-slate-500">creatoros.ai/dashboard</span>
                </div>
              </div>
              {/* Mock dashboard */}
              <div className="p-6 grid grid-cols-3 gap-4">
                {[
                  { label: 'Total Generations', value: '2,847', color: '#8b5cf6' },
                  { label: 'Avg Virality Score', value: '82/100', color: '#3b82f6' },
                  { label: 'Content Saved', value: '156', color: '#10b981' },
                ].map((card) => (
                  <div key={card.label} className="glass-card p-4">
                    <div className="text-xs text-slate-500 mb-1">{card.label}</div>
                    <div className="text-xl font-bold" style={{ color: card.color }}>{card.value}</div>
                  </div>
                ))}
                <div className="col-span-3 glass-card p-4 space-y-2">
                  <div className="text-xs text-slate-500 mb-3">Generated Titles</div>
                  {['🔥 10 AI Tools That Will Replace Your Entire Workflow in 2025',
                    '⚡ I Built a $10K Business Using Only Free AI Tools (Step by Step)',
                    '🚀 The AI Productivity Stack No One Talks About'].map((t, i) => (
                    <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-white/3">
                      <span className="text-xs text-slate-300">{t}</span>
                      <span className="text-xs font-bold text-green-400">{90 - i * 5}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* Glow */}
          <div className="absolute -inset-4 rounded-3xl opacity-20 blur-3xl -z-10"
            style={{ background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)' }} />
        </motion.div>
      </div>
    </section>
  );
}
