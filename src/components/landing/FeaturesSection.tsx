'use client';

import { motion } from 'framer-motion';
import { Zap, TrendingUp, Image, BarChart3, Hash, Youtube, Instagram, Scissors, Search } from 'lucide-react';

const features = [
  { icon: Youtube, title: 'YouTube SEO', desc: '5 optimized titles with CTR scores, rich descriptions, and 30 targeted tags.', color: '#ef4444' },
  { icon: Instagram, title: 'Instagram Captions', desc: 'Hook-first captions in multiple styles — emotional, educational, storytelling.', color: '#e1306c' },
  { icon: Hash, title: 'Viral Hashtags', desc: 'Trending, category, and viral hashtag sets optimized for maximum reach.', color: '#8b5cf6' },
  { icon: Scissors, title: 'Shorts Hooks', desc: 'First-3-second attention grabbers and complete hook scripts for YouTube Shorts.', color: '#3b82f6' },
  { icon: Image, title: 'Thumbnail Studio', desc: 'AI-generated thumbnail concepts with composition, colors, and text overlays.', color: '#f59e0b' },
  { icon: BarChart3, title: 'Virality Analyzer', desc: 'Score your content on 6 dimensions: hook, retention, emotion, CTR, and more.', color: '#10b981' },
  { icon: TrendingUp, title: 'Trend Explorer', desc: 'Discover rising niches, viral title formats, and untapped content opportunities.', color: '#06b6d4' },
  { icon: Search, title: 'Competitor Analyzer', desc: 'Paste any YouTube URL and get deep psychology and SEO analysis.', color: '#a855f7' },
  { icon: Zap, title: 'One-Click Export', desc: 'Copy, download or save your entire content package with one click.', color: '#fbbf24' },
];

export function FeaturesSection() {
  return (
    <section id="features" className="relative py-32 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <div className="section-label mx-auto w-fit mb-4">
            <Zap className="w-3.5 h-3.5" />
            <span>Everything You Need</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            The Complete <span className="gradient-text">Creator Toolkit</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            From a raw idea to a fully optimized multi-platform content package — powered by Google Gemini.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <motion.div key={f.title}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.07, duration: 0.5 }}
              className="glass-card-hover p-6 group cursor-pointer">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                style={{ background: `${f.color}20`, border: `1px solid ${f.color}40` }}>
                <f.icon className="w-6 h-6" style={{ color: f.color }} />
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">{f.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
