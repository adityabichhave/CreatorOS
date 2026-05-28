'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, Search, Wand2, Image, ArrowUpRight, Loader2, Flame } from 'lucide-react';
import toast from 'react-hot-toast';
import type { TrendingTopic } from '@/types';

const CATEGORIES = ['AI', 'Tech', 'Gaming', 'Finance', 'Education', 'Vlogs', 'Motivation', 'Coding', 'Business', 'Documentary'];

const growthColor = (g: number) =>
  g >= 200 ? '#ef4444' : g >= 100 ? '#f59e0b' : '#10b981';

export default function TrendsPage() {
  const [category, setCategory] = useState('AI');
  const [loading, setLoading] = useState(false);
  const [trends, setTrends] = useState<TrendingTopic[]>([]);

  const handleExplore = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/trends', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setTrends(data.data);
      toast.success(`Found ${data.data.length} trending topics!`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to explore trends');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-white mb-1 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #3b82f6, #06b6d4)' }}>
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          Trend Explorer
        </h1>
        <p className="text-slate-400 ml-12">Discover viral content opportunities in any niche.</p>
      </motion.div>

      {/* Search */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="glass-card p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-slate-300 mb-2">Content Category</label>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((c) => (
                <button key={c} onClick={() => setCategory(c)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    category === c
                      ? 'text-white border-brand-500/50'
                      : 'text-slate-400 border-white/8 hover:border-white/20 hover:text-white'
                  } border`}
                  style={category === c ? { background: 'rgba(139,92,246,0.2)' } : { background: 'rgba(255,255,255,0.03)' }}>
                  {c}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-end">
            <button onClick={handleExplore} disabled={loading} className="btn-primary whitespace-nowrap">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
              {loading ? 'Exploring...' : 'Explore Trends'}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Results */}
      <AnimatePresence>
        {trends.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {trends.map((trend, i) => (
              <motion.div key={trend.topic}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                className="glass-card-hover p-6 space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-white font-semibold text-base mb-1">{trend.topic}</h3>
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1 text-sm font-bold"
                        style={{ color: growthColor(trend.growth) }}>
                        <ArrowUpRight className="w-4 h-4" />
                        {trend.growth}% growth
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded-md"
                        style={{ background: 'rgba(255,255,255,0.06)', color: '#94a3b8' }}>
                        Vol: {trend.searchVolume}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded-md"
                        style={{ background: 'rgba(255,255,255,0.06)', color: '#94a3b8' }}>
                        Comp: {trend.competition}
                      </span>
                    </div>
                  </div>
                  {trend.growth >= 200 && <Flame className="w-5 h-5 text-red-400 flex-shrink-0" />}
                </div>

                {/* Viral Titles */}
                {trend.viralTitles?.length > 0 && (
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wide mb-2">Viral Title Formats</p>
                    <div className="space-y-1.5">
                      {trend.viralTitles.map((t, j) => (
                        <p key={j} className="text-slate-300 text-sm py-1.5 px-3 rounded-lg bg-white/3 leading-snug">
                          {t}
                        </p>
                      ))}
                    </div>
                  </div>
                )}

                {/* Related Searches */}
                {trend.relatedSearches?.length > 0 && (
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wide mb-2">Related Searches</p>
                    <div className="flex flex-wrap gap-1.5">
                      {trend.relatedSearches.map((s) => (
                        <span key={s} className="tag-chip text-xs">{s}</span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  <button className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-medium transition-all duration-200 text-brand-300 hover:text-white border border-brand-500/30 hover:border-brand-500/60 hover:bg-brand-500/10">
                    <Wand2 className="w-3.5 h-3.5" />
                    Generate Idea
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-medium transition-all duration-200 text-amber-300 hover:text-white border border-amber-500/30 hover:border-amber-500/60 hover:bg-amber-500/10">
                    <Image className="w-3.5 h-3.5" />
                    Thumbnail
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Empty state */}
      {trends.length === 0 && !loading && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="glass-card p-16 text-center">
          <TrendingUp className="w-12 h-12 text-slate-600 mx-auto mb-4" />
          <p className="text-white font-semibold text-lg mb-2">Discover What's Trending</p>
          <p className="text-slate-400 text-sm">Select a category and click "Explore Trends" to find viral content opportunities.</p>
        </motion.div>
      )}
    </div>
  );
}
