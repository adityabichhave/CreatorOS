'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart3, Loader2, Sparkles, Clock, Users, Target } from 'lucide-react';
import toast from 'react-hot-toast';
import { CircularProgress, ScoreBar } from '@/components/ui/CircularProgress';
import type { ViralityData, GeneratorInput } from '@/types';

const NICHES = ['Tech', 'Gaming', 'AI', 'Education', 'Finance', 'Vlogs', 'Motivation', 'Coding', 'Business'];
const TONES = ['Viral', 'Emotional', 'Professional', 'Educational', 'Funny', 'Dramatic'];
const PLATFORMS = ['YouTube', 'Instagram', 'Shorts', 'Multi-platform'];

export default function ViralityPage() {
  const [input, setInput] = useState<Partial<GeneratorInput>>({
    videoTitle: '', topic: '', script: '', niche: 'Tech', tone: 'Viral', platform: 'YouTube',
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ViralityData | null>(null);

  const handleAnalyze = async () => {
    if (!input.videoTitle && !input.topic) {
      toast.error('Enter a title or topic to analyze');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/virality', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setResult(data.data);
      toast.success('Virality analysis complete!');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Analysis failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-white mb-1 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #10b981, #06b6d4)' }}>
            <BarChart3 className="w-5 h-5 text-white" />
          </div>
          Virality Analyzer
        </h1>
        <p className="text-slate-400 ml-12">Score your content on 6 virality dimensions powered by AI.</p>
      </motion.div>

      {/* Input */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="glass-card p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Video Title *</label>
            <input type="text" placeholder="Your video title..."
              value={input.videoTitle}
              onChange={(e) => setInput({ ...input, videoTitle: e.target.value })}
              className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Topic</label>
            <input type="text" placeholder="Main topic..."
              value={input.topic}
              onChange={(e) => setInput({ ...input, topic: e.target.value })}
              className="input-field" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Script / Hook (optional)</label>
          <textarea rows={3} placeholder="Paste your hook or first 30 seconds..."
            value={input.script}
            onChange={(e) => setInput({ ...input, script: e.target.value })}
            className="input-field resize-none text-sm" />
        </div>
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Niche', key: 'niche', opts: NICHES },
            { label: 'Tone', key: 'tone', opts: TONES },
            { label: 'Platform', key: 'platform', opts: PLATFORMS },
          ].map(({ label, key, opts }) => (
            <div key={key}>
              <label className="block text-sm font-medium text-slate-300 mb-2">{label}</label>
              <select value={(input as any)[key]}
                onChange={(e) => setInput({ ...input, [key]: e.target.value })}
                className="input-field">
                {opts.map((o) => <option key={o}>{o}</option>)}
              </select>
            </div>
          ))}
        </div>
        <button onClick={handleAnalyze} disabled={loading} className="btn-primary">
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <BarChart3 className="w-4 h-4" />}
          {loading ? 'Analyzing...' : 'Analyze Virality'}
        </button>
      </motion.div>

      {/* Results */}
      <AnimatePresence>
        {result && (
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            className="space-y-4">
            {/* Score circles */}
            <div className="glass-card p-8">
              <h2 className="text-white font-semibold text-base mb-8 text-center">Virality Scores</h2>
              <div className="grid grid-cols-3 md:grid-cols-7 gap-6 justify-items-center">
                <CircularProgress score={result.overallScore} size={110} label="Overall" sublabel="/100" />
                <CircularProgress score={result.hookStrength} size={90} label="Hook" sublabel="/100" />
                <CircularProgress score={result.retentionPotential} size={90} label="Retention" sublabel="/100" />
                <CircularProgress score={result.emotionalImpact} size={90} label="Emotion" sublabel="/100" />
                <CircularProgress score={result.clickability} size={90} label="CTR" sublabel="/100" />
                <CircularProgress score={result.trendPotential} size={90} label="Trend" sublabel="/100" />
                <CircularProgress score={result.engagementPotential} size={90} label="Engagement" sublabel="/100" />
              </div>
            </div>

            {/* Score Bars */}
            <div className="glass-card p-6">
              <h3 className="text-white font-semibold mb-5">Detailed Breakdown</h3>
              <div className="space-y-4">
                <ScoreBar label="Hook Strength" score={result.hookStrength} />
                <ScoreBar label="Audience Retention Potential" score={result.retentionPotential} />
                <ScoreBar label="Emotional Impact" score={result.emotionalImpact} />
                <ScoreBar label="Clickability / Thumbnail CTR" score={result.thumbnailCTR} />
                <ScoreBar label="Trend Potential" score={result.trendPotential} />
                <ScoreBar label="Engagement Potential" score={result.engagementPotential} />
              </div>
            </div>

            {/* Platform & Insights */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="glass-card p-6 space-y-4">
                <h3 className="text-white font-semibold">Platform Suitability</h3>
                {result.platformSuitability?.map((p) => (
                  <div key={p.platform}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-slate-300">{p.platform}</span>
                      <span className="text-sm font-bold text-white">{p.score}/100</span>
                    </div>
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden mb-1">
                      <motion.div className="h-full rounded-full bg-gradient-to-r from-brand-500 to-accent-500"
                        initial={{ width: 0 }} animate={{ width: `${p.score}%` }}
                        transition={{ duration: 1, ease: 'easeOut' }} />
                    </div>
                    <p className="text-xs text-slate-500">{p.reason}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <div className="glass-card p-5 flex items-start gap-3">
                  <Users className="w-5 h-5 text-brand-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-white mb-1">Target Audience</p>
                    <p className="text-sm text-slate-400">{result.audienceType}</p>
                  </div>
                </div>
                <div className="glass-card p-5 flex items-start gap-3">
                  <Clock className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-white mb-1">Best Upload Timing</p>
                    <p className="text-sm text-slate-400">{result.bestUploadTiming}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Improvements */}
            {result.improvements?.length > 0 && (
              <div className="glass-card p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-4 h-4 text-brand-400" />
                  <h3 className="text-white font-semibold">AI Improvement Suggestions</h3>
                </div>
                <div className="space-y-3">
                  {result.improvements.map((imp, i) => (
                    <motion.div key={i}
                      initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start gap-3 p-3 rounded-xl bg-brand-500/5 border border-brand-500/15">
                      <Target className="w-4 h-4 text-brand-400 flex-shrink-0 mt-0.5" />
                      <p className="text-slate-300 text-sm">{imp}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
