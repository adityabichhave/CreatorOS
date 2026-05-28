'use client';

import { motion } from 'framer-motion';
import { FileText, Sparkles, Share2, Rocket } from 'lucide-react';

const steps = [
  { icon: FileText, step: '01', title: 'Input Your Idea', desc: 'Enter your video title, topic, niche, and optional script. Even a rough idea works.', color: '#8b5cf6' },
  { icon: Sparkles, step: '02', title: 'AI Analyzes & Generates', desc: 'Gemini AI processes your content, detecting niche, tone, and audience for maximum virality.', color: '#3b82f6' },
  { icon: Share2, step: '03', title: 'Get Your Content Package', desc: 'Receive optimized titles, descriptions, captions, hashtags, hooks, and thumbnail ideas instantly.', color: '#10b981' },
  { icon: Rocket, step: '04', title: 'Publish & Grow', desc: 'Copy, export, or save your package. Track performance and improve with every upload.', color: '#f59e0b' },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative py-32 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-radial-purple opacity-30" />
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}>
          <div className="section-label mx-auto w-fit mb-4">
            <Rocket className="w-3.5 h-3.5" />
            <span>Simple 4-Step Process</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            From Idea to <span className="gradient-text">Viral Content</span> in Minutes
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connector line */}
          <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-brand-500/0 via-brand-500/50 to-brand-500/0" />

          {steps.map((s, i) => (
            <motion.div key={s.step}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.15 }}
              className="flex flex-col items-center text-center glass-card p-6 relative group">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 relative transition-transform group-hover:scale-110 duration-300"
                style={{ background: `${s.color}20`, border: `1px solid ${s.color}40` }}>
                <s.icon className="w-7 h-7" style={{ color: s.color }} />
                <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-dark-900 border flex items-center justify-center text-xs font-bold"
                  style={{ borderColor: s.color, color: s.color }}>
                  {i + 1}
                </div>
              </div>
              <span className="text-xs font-mono text-slate-600 mb-1">{s.step}</span>
              <h3 className="text-white font-semibold text-base mb-2">{s.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
