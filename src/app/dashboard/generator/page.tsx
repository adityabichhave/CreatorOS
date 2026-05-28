'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wand2, Zap, BarChart3, ChevronDown } from 'lucide-react';
import toast from 'react-hot-toast';
import { AIThinking } from '@/components/ui/LoadingSpinner';
import { GeneratorResults } from '@/components/dashboard/GeneratorResults';
import type { GeneratedContent, GeneratorInput } from '@/types';

const NICHES = ['Tech', 'Gaming', 'Documentary', 'AI', 'Education', 'Finance', 'Vlogs', 'Motivation', 'Coding', 'Business'];
const TONES = ['Emotional', 'Viral', 'Professional', 'Educational', 'Funny', 'Dramatic', 'Documentary'];
const PLATFORMS = ['YouTube', 'Instagram', 'Shorts', 'Multi-platform'];

function SelectField({ label, value, onChange, options }: {
  label: string; value: string; onChange: (v: string) => void; options: string[];
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-300 mb-2">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="input-field appearance-none pr-10 cursor-pointer">
          {options.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
      </div>
    </div>
  );
}

export default function GeneratorPage() {
  const [input, setInput] = useState<GeneratorInput>({
    videoTitle: '', topic: '', script: '',
    niche: 'Tech', tone: 'Viral', platform: 'YouTube',
  });
  const [loading, setLoading] = useState(false);
  const [loadingType, setLoadingType] = useState('');
  const [results, setResults] = useState<GeneratedContent | null>(null);

  const handleGenerate = async (type: 'generate' | 'seo' | 'virality') => {
    if (!input.videoTitle && !input.topic) {
      toast.error('Please enter a video title or topic');
      return;
    }
    setLoading(true);
    setLoadingType(type);

    const endpoint = type === 'virality' ? '/api/virality' : '/api/generate';
    const loadingMsg = type === 'virality' ? 'Analyzing virality potential...' : 'Generating your content package...';

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Generation failed');

      if (type === 'virality') {
        setResults((prev) => ({ ...prev!, viralityAnalysis: data.data }));
      } else {
        setResults(data.data);
      }
      toast.success('Content generated successfully!');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-white mb-1 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)' }}>
            <Wand2 className="w-5 h-5 text-white" />
          </div>
          AI Content Generator
        </h1>
        <p className="text-slate-400 ml-12">Transform your idea into a complete viral content package.</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Input Panel */}
        <motion.div
          initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
          className="lg:col-span-2 glass-card p-6 space-y-5 h-fit">
          <h2 className="text-white font-semibold text-base">Content Details</h2>

          {/* Video Title */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Video Title *</label>
            <input type="text" placeholder="e.g. 10 AI Tools That Changed My Life"
              value={input.videoTitle}
              onChange={(e) => setInput({ ...input, videoTitle: e.target.value })}
              className="input-field" />
          </div>

          {/* Topic */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Topic / Main Idea</label>
            <input type="text" placeholder="e.g. Best free AI productivity tools in 2025"
              value={input.topic}
              onChange={(e) => setInput({ ...input, topic: e.target.value })}
              className="input-field" />
          </div>

          {/* Script */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Script / Description <span className="text-slate-600">(optional)</span>
            </label>
            <textarea
              placeholder="Paste your script, key points, or a rough description of your video..."
              value={input.script}
              onChange={(e) => setInput({ ...input, script: e.target.value })}
              rows={5}
              className="input-field resize-none text-sm"
            />
          </div>

          {/* Selectors */}
          <div className="grid grid-cols-1 gap-4">
            <SelectField label="Niche" value={input.niche} onChange={(v) => setInput({ ...input, niche: v })} options={NICHES} />
            <SelectField label="Tone" value={input.tone} onChange={(v) => setInput({ ...input, tone: v })} options={TONES} />
            <SelectField label="Platform" value={input.platform} onChange={(v) => setInput({ ...input, platform: v })} options={PLATFORMS} />
          </div>

          {/* Buttons */}
          <div className="space-y-3 pt-2">
            <button onClick={() => handleGenerate('generate')} disabled={loading}
              className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed">
              <Wand2 className="w-4 h-4" />
              {loading && loadingType === 'generate' ? 'Generating...' : 'Generate Content'}
            </button>
            <button onClick={() => handleGenerate('virality')} disabled={loading}
              className="btn-secondary w-full justify-center disabled:opacity-60">
              <BarChart3 className="w-4 h-4" />
              Analyze Virality
            </button>
          </div>
        </motion.div>

        {/* Output Panel */}
        <div className="lg:col-span-3">
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div key="loading"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="glass-card h-full min-h-96 flex items-center justify-center">
                <AIThinking text={loadingType === 'virality' ? 'Analyzing virality...' : 'Generating content package...'} />
              </motion.div>
            ) : results ? (
              <motion.div key="results"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <GeneratorResults content={results} input={input} />
              </motion.div>
            ) : (
              <motion.div key="empty"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="glass-card h-full min-h-96 flex flex-col items-center justify-center gap-4 text-center p-8">
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.2), rgba(59,130,246,0.2))' }}>
                  <Zap className="w-10 h-10 text-brand-400" />
                </div>
                <div>
                  <p className="text-white font-semibold text-lg mb-2">Ready to Generate</p>
                  <p className="text-slate-400 text-sm max-w-sm">Fill in your content details and click "Generate Content" to get your complete AI-powered content package.</p>
                </div>
                <div className="flex flex-wrap gap-2 justify-center">
                  {['YouTube Titles', 'Instagram Captions', 'Hashtags', 'Shorts Hooks', 'Thumbnails'].map((t) => (
                    <span key={t} className="tag-chip text-xs">{t}</span>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
