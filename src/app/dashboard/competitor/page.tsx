'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link2, Loader2, ExternalLink, Search, Lightbulb, Key } from 'lucide-react';
import toast from 'react-hot-toast';
import { CopyButton } from '@/components/ui/CopyButton';
import type { CompetitorAnalysis } from '@/types';

export default function CompetitorPage() {
  const [videoUrl, setVideoUrl] = useState('');
  const [context, setContext] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CompetitorAnalysis | null>(null);

  const handleAnalyze = async () => {
    if (!videoUrl) { toast.error('Paste a YouTube URL to analyze'); return; }
    setLoading(true);
    try {
      const res = await fetch('/api/competitor', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ videoUrl, additionalContext: context }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setResult(data.data);
      toast.success('Competitor analysis complete!');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Analysis failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-white mb-1 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #a855f7, #6366f1)' }}>
            <Link2 className="w-5 h-5 text-white" />
          </div>
          Competitor Analyzer
        </h1>
        <p className="text-slate-400 ml-12">Decode any YouTube video's success formula with AI intelligence.</p>
      </motion.div>

      {/* Input */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="glass-card p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">YouTube Video URL *</label>
          <div className="flex gap-3">
            <input type="url" placeholder="https://youtube.com/watch?v=..."
              value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)}
              className="input-field flex-1" />
            <button onClick={handleAnalyze} disabled={loading} className="btn-primary whitespace-nowrap">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
              {loading ? 'Analyzing...' : 'Analyze'}
            </button>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Additional Context <span className="text-slate-600">(optional)</span>
          </label>
          <input type="text" placeholder="e.g. This is a tech review video with 2M views"
            value={context} onChange={(e) => setContext(e.target.value)}
            className="input-field" />
        </div>
      </motion.div>

      {/* Results */}
      <AnimatePresence>
        {result && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="space-y-4">
            {/* Header */}
            <div className="glass-card p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs text-slate-500 mb-1">Analyzed Video</p>
                  <h2 className="text-white font-bold text-lg">{result.videoTitle}</h2>
                </div>
                <a href={videoUrl} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-brand-400 hover:text-brand-300 transition-colors flex-shrink-0">
                  <ExternalLink className="w-3.5 h-3.5" />
                  Open Video
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Why it performed */}
              <div className="glass-card p-5 space-y-3">
                <div className="flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-400" />
                  <h3 className="text-white font-semibold text-sm">Why It Performed Well</h3>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">{result.whyItPerformed}</p>
              </div>

              {/* Title Psychology */}
              <div className="glass-card p-5 space-y-3">
                <h3 className="text-white font-semibold text-sm">Title Psychology</h3>
                <p className="text-slate-300 text-sm leading-relaxed">{result.titlePsychology}</p>
              </div>

              {/* Thumbnail Strategy */}
              <div className="glass-card p-5 space-y-3">
                <h3 className="text-white font-semibold text-sm">Thumbnail Strategy</h3>
                <p className="text-slate-300 text-sm leading-relaxed">{result.thumbnailStrategy}</p>
              </div>

              {/* Audience */}
              <div className="glass-card p-5 space-y-3">
                <h3 className="text-white font-semibold text-sm">Audience Targeting</h3>
                <p className="text-slate-300 text-sm leading-relaxed">{result.audienceTargeting}</p>
              </div>
            </div>

            {/* SEO Keywords */}
            {result.seoKeywords?.length > 0 && (
              <div className="glass-card p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Key className="w-4 h-4 text-brand-400" />
                    <h3 className="text-white font-semibold text-sm">SEO Keywords</h3>
                  </div>
                  <CopyButton text={result.seoKeywords.join(', ')} label="Copy All" />
                </div>
                <div className="flex flex-wrap gap-2">
                  {result.seoKeywords.map((kw) => (
                    <span key={kw} className="tag-chip text-xs">{kw}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Hook Techniques */}
            {result.hookTechniques?.length > 0 && (
              <div className="glass-card p-5 space-y-3">
                <h3 className="text-white font-semibold text-sm">Hook Techniques Used</h3>
                <div className="space-y-2">
                  {result.hookTechniques.map((h, i) => (
                    <div key={i} className="flex items-start gap-2 p-2 rounded-lg bg-white/3">
                      <span className="text-brand-400 text-sm">→</span>
                      <p className="text-slate-300 text-sm">{h}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Similar Ideas */}
            {result.similarIdeas?.length > 0 && (
              <div className="glass-card p-5 space-y-3">
                <h3 className="text-white font-semibold text-sm">Similar Viral Content Ideas</h3>
                <div className="space-y-2">
                  {result.similarIdeas.map((idea, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-brand-500/5 border border-brand-500/15">
                      <span className="text-brand-400 font-bold text-sm">#{i + 1}</span>
                      <p className="text-slate-300 text-sm">{idea}</p>
                    </div>
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
