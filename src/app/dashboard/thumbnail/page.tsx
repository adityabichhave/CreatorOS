'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image, Loader2, Download, RefreshCw, Palette } from 'lucide-react';
import toast from 'react-hot-toast';
import { CopyButton } from '@/components/ui/CopyButton';
import type { ThumbnailConcept } from '@/types';

const STYLES = ['Realistic', 'Illustrated', 'Minimalist', 'Bold & Flashy', 'Cinematic', 'Neon Glow'];
const MOODS = ['Shocking', 'Exciting', 'Mysterious', 'Inspiring', 'Funny', 'Dramatic', 'Educational'];
const COLORS = ['Red & Black', 'Blue & White', 'Yellow & Black', 'Purple & Gold', 'Green & Dark', 'Neon on Dark'];

export default function ThumbnailPage() {
  const [form, setForm] = useState({
    topic: '', style: 'Bold & Flashy', mood: 'Shocking',
    hasFace: false, colorTheme: 'Red & Black', thumbnailText: '',
  });
  const [loading, setLoading] = useState(false);
  const [concepts, setConcepts] = useState<ThumbnailConcept[]>([]);

  const handleGenerate = async () => {
    if (!form.topic) { toast.error('Enter a video topic'); return; }
    setLoading(true);
    try {
      const res = await fetch('/api/thumbnail', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setConcepts(data.data);
      toast.success(`Generated ${data.data.length} thumbnail concepts!`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Generation failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-white mb-1 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #f59e0b, #ef4444)' }}>
            <Image className="w-5 h-5 text-white" />
          </div>
          Thumbnail Studio
        </h1>
        <p className="text-slate-400 ml-12">Generate stunning thumbnail concepts with AI-powered composition ideas.</p>
      </motion.div>

      {/* Form */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="glass-card p-6 space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-300 mb-2">Video Topic *</label>
            <input type="text" placeholder="e.g. 10 AI Tools That Will Replace Your Job"
              value={form.topic} onChange={(e) => setForm({ ...form, topic: e.target.value })}
              className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Thumbnail Text</label>
            <input type="text" placeholder="e.g. MY LIFE CHANGED"
              value={form.thumbnailText} onChange={(e) => setForm({ ...form, thumbnailText: e.target.value })}
              className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Style</label>
            <select value={form.style} onChange={(e) => setForm({ ...form, style: e.target.value })} className="input-field">
              {STYLES.map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Mood</label>
            <select value={form.mood} onChange={(e) => setForm({ ...form, mood: e.target.value })} className="input-field">
              {MOODS.map((m) => <option key={m}>{m}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Color Theme</label>
            <select value={form.colorTheme} onChange={(e) => setForm({ ...form, colorTheme: e.target.value })} className="input-field">
              {COLORS.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-300 mb-3">Face in Thumbnail?</label>
            <div className="flex gap-3">
              {[true, false].map((val) => (
                <button key={String(val)}
                  onClick={() => setForm({ ...form, hasFace: val })}
                  className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 border ${
                    form.hasFace === val
                      ? 'border-brand-500/50 text-brand-300 bg-brand-500/15'
                      : 'border-white/8 text-slate-400 bg-white/3 hover:border-white/20'
                  }`}>
                  {val ? '👤 Yes, with face' : '🎨 No face'}
                </button>
              ))}
            </div>
          </div>
        </div>
        <button onClick={handleGenerate} disabled={loading} className="btn-primary">
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Palette className="w-4 h-4" />}
          {loading ? 'Generating Concepts...' : 'Generate Thumbnail Concepts'}
        </button>
      </motion.div>

      {/* Results */}
      <AnimatePresence>
        {concepts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {concepts.map((concept, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card overflow-hidden">
                {/* Thumbnail preview area */}
                <div className="h-36 flex items-center justify-center relative overflow-hidden"
                  style={{ background: `linear-gradient(135deg, ${concept.colorPalette?.[0] || '#1e293b'}, ${concept.colorPalette?.[1] || '#0f172a'})` }}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-white font-black text-xl leading-tight drop-shadow-2xl max-w-[85%] mx-auto">
                        {concept.textOverlay || concept.concept}
                      </p>
                    </div>
                  </div>
                  <div className="absolute top-2 right-2 flex gap-2">
                    {concept.colorPalette?.slice(0, 4).map((c, j) => (
                      <div key={j} className="w-4 h-4 rounded-full border border-white/30" style={{ background: c }} />
                    ))}
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-white font-semibold">{concept.concept}</h3>
                    <span className="text-xs px-2 py-1 rounded-md" style={{ background: 'rgba(139,92,246,0.15)', color: '#a78bfa' }}>
                      {concept.emotion}
                    </span>
                  </div>
                  <p className="text-slate-400 text-sm">{concept.composition}</p>

                  {concept.prompt && (
                    <div className="p-3 rounded-xl bg-white/3 border border-white/5">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-xs text-slate-500 font-medium">AI Image Prompt</p>
                        <CopyButton text={concept.prompt} variant="icon" />
                      </div>
                      <p className="text-slate-300 text-xs leading-relaxed line-clamp-3">{concept.prompt}</p>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 transition-all border border-white/5">
                      <RefreshCw className="w-3.5 h-3.5" />
                      Regenerate
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-medium text-amber-300 hover:text-white bg-amber-500/10 hover:bg-amber-500/20 transition-all border border-amber-500/20">
                      <Download className="w-3.5 h-3.5" />
                      Download
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
