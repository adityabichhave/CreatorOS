'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Wand2, TrendingUp, Image, BarChart3, Zap, ArrowRight, Clock, Flame } from 'lucide-react';

const stats = [
  { label: 'Total Generations', value: '2,847', change: '+12%', icon: Zap, color: '#8b5cf6' },
  { label: 'Avg Virality Score', value: '82/100', change: '+5pts', icon: Flame, color: '#f59e0b' },
  { label: 'Content Saved', value: '156', change: '+28%', icon: Clock, color: '#10b981' },
  { label: 'Trending Topics', value: '24', change: 'Live', icon: TrendingUp, color: '#3b82f6' },
];

const quickActions = [
  { icon: Wand2, label: 'AI Generator', desc: 'Generate complete content package', href: '/dashboard/generator', color: '#8b5cf6' },
  { icon: TrendingUp, label: 'Trend Explorer', desc: 'Discover viral opportunities', href: '/dashboard/trends', color: '#3b82f6' },
  { icon: Image, label: 'Thumbnail Studio', desc: 'Create stunning thumbnails', href: '/dashboard/thumbnail', color: '#f59e0b' },
  { icon: BarChart3, label: 'Virality Analyzer', desc: 'Score your content', href: '/dashboard/virality', color: '#10b981' },
];

const recentProjects = [
  { title: '10 AI Tools That Will 10x Your Productivity', niche: 'AI', platform: 'YouTube', score: 88, time: '2h ago' },
  { title: 'How I Made $5K in 30 Days with Content Creation', niche: 'Finance', platform: 'Multi', score: 91, time: '5h ago' },
  { title: 'The Gaming Setup That Changed My Life', niche: 'Gaming', platform: 'YouTube', score: 76, time: '1d ago' },
  { title: 'Morning Routine of a 7-Figure Creator', niche: 'Vlogs', platform: 'Instagram', score: 84, time: '2d ago' },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8 max-w-7xl">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-white mb-1">Welcome back, Creator 👋</h1>
        <p className="text-slate-400">Here's your content creation overview for today.</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <motion.div key={s.label}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-5 flex flex-col gap-3 group hover:border-white/15 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: `${s.color}20`, border: `1px solid ${s.color}30` }}>
                <s.icon className="w-5 h-5" style={{ color: s.color }} />
              </div>
              <span className="text-xs font-medium px-2 py-1 rounded-md"
                style={{ background: `${s.color}15`, color: s.color }}>
                {s.change}
              </span>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{s.value}</p>
              <p className="text-sm text-slate-400">{s.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((a, i) => (
            <motion.div key={a.label}
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.35 + i * 0.08 }}>
              <Link href={a.href}
                className="glass-card-hover p-5 flex flex-col gap-3 block group">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 duration-300"
                  style={{ background: `${a.color}20`, border: `1px solid ${a.color}35` }}>
                  <a.icon className="w-6 h-6" style={{ color: a.color }} />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm mb-1">{a.label}</p>
                  <p className="text-slate-400 text-xs">{a.desc}</p>
                </div>
                <div className="flex items-center gap-1 text-xs font-medium mt-auto"
                  style={{ color: a.color }}>
                  <span>Open</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Recent Projects */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">Recent Projects</h2>
          <Link href="/dashboard/history" className="text-sm text-brand-400 hover:text-brand-300 flex items-center gap-1 transition-colors">
            View all <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="glass-card divide-y divide-white/5">
          {recentProjects.map((p, i) => (
            <motion.div key={p.title}
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.55 + i * 0.08 }}
              className="flex items-center gap-4 p-4 hover:bg-white/3 transition-colors cursor-pointer">
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium truncate">{p.title}</p>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-xs text-slate-500">{p.niche}</span>
                  <span className="w-1 h-1 rounded-full bg-slate-600" />
                  <span className="text-xs text-slate-500">{p.platform}</span>
                  <span className="w-1 h-1 rounded-full bg-slate-600" />
                  <span className="text-xs text-slate-600">{p.time}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <div className={`score-badge ${p.score >= 80 ? 'score-high' : 'score-medium'}`}>
                  {p.score}%
                </div>
                <ArrowRight className="w-4 h-4 text-slate-600" />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
