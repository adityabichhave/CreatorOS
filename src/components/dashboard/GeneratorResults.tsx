'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Youtube, Instagram, Hash, Scissors, Image, Search, ChevronDown, ChevronUp } from 'lucide-react';
import { CopyButton } from '@/components/ui/CopyButton';
import { CircularProgress } from '@/components/ui/CircularProgress';
import { getScoreColor } from '@/lib/utils';
import type { GeneratedContent, GeneratorInput } from '@/types';

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

function ResultCard({ title, icon: Icon, color, children, index }: {
  title: string; icon: any; color: string; children: React.ReactNode; index: number;
}) {
  const [expanded, setExpanded] = useState(true);
  return (
    <motion.div custom={index} variants={cardVariants} initial="hidden" animate="visible"
      className="glass-card overflow-hidden">
      <div className="flex items-center justify-between p-5 cursor-pointer border-b border-white/5"
        onClick={() => setExpanded(!expanded)}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: `${color}20`, border: `1px solid ${color}30` }}>
            <Icon className="w-4 h-4" style={{ color }} />
          </div>
          <span className="text-white font-semibold text-sm">{title}</span>
        </div>
        {expanded ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
      </div>
      {expanded && <div className="p-5">{children}</div>}
    </motion.div>
  );
}

interface GeneratorResultsProps {
  content: GeneratedContent;
  input: GeneratorInput;
}

export function GeneratorResults({ content, input }: GeneratorResultsProps) {
  return (
    <div className="space-y-4">
      {/* YouTube Titles */}
      {content.youtubeTitles?.length > 0 && (
        <ResultCard title="YouTube SEO Titles" icon={Youtube} color="#ef4444" index={0}>
          <div className="space-y-3">
            {content.youtubeTitles.map((t, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="flex items-start gap-3 p-3 rounded-xl bg-white/3 hover:bg-white/5 transition-colors group">
                <span className="text-slate-600 text-sm font-mono mt-0.5 flex-shrink-0">#{i + 1}</span>
                <p className="text-slate-200 text-sm flex-1 leading-relaxed">{t.title}</p>
                <div className="flex items-center gap-2 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className={`score-badge ${getScoreColor(t.ctrScore)}`}>CTR {t.ctrScore}%</span>
                  <CopyButton text={t.title} variant="icon" />
                </div>
              </motion.div>
            ))}
          </div>
          {content.keywordSuggestions && (
            <div className="mt-4 pt-4 border-t border-white/5">
              <p className="text-xs text-slate-500 mb-2">Keyword Suggestions</p>
              <div className="flex flex-wrap gap-2">
                {content.keywordSuggestions.slice(0, 8).map((k) => (
                  <span key={k} className="tag-chip text-xs">{k}</span>
                ))}
              </div>
            </div>
          )}
        </ResultCard>
      )}

      {/* YouTube Description */}
      {content.youtubeDescription && (
        <ResultCard title="YouTube Description" icon={Youtube} color="#ef4444" index={1}>
          <div className="relative">
            <pre className="text-slate-300 text-xs leading-relaxed whitespace-pre-wrap font-sans max-h-48 overflow-y-auto">
              {content.youtubeDescription}
            </pre>
            <div className="absolute top-2 right-2">
              <CopyButton text={content.youtubeDescription} label="Copy All" />
            </div>
          </div>
        </ResultCard>
      )}

      {/* Tags */}
      {content.tags?.length > 0 && (
        <ResultCard title={`SEO Tags (${content.tags.length})`} icon={Search} color="#06b6d4" index={2}>
          <div className="flex flex-wrap gap-2 mb-3">
            {content.tags.map((tag) => (
              <span key={tag} className="tag-chip text-xs">{tag}</span>
            ))}
          </div>
          <CopyButton text={content.tags.join(', ')} label="Copy All Tags" />
        </ResultCard>
      )}

      {/* Instagram Captions */}
      {content.instagramCaptions?.length > 0 && (
        <ResultCard title="Instagram Captions" icon={Instagram} color="#e1306c" index={3}>
          <div className="space-y-4">
            {content.instagramCaptions.map((c, i) => (
              <div key={i} className="p-3 rounded-xl bg-white/3 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-md"
                    style={{ background: 'rgba(225,48,108,0.15)', color: '#e1306c' }}>
                    {c.style}
                  </span>
                  <CopyButton text={c.caption} variant="icon" />
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">{c.caption}</p>
              </div>
            ))}
          </div>
        </ResultCard>
      )}

      {/* Hashtags */}
      {content.hashtags && (
        <ResultCard title="Hashtag Sets" icon={Hash} color="#8b5cf6" index={4}>
          <div className="space-y-4">
            {Object.entries(content.hashtags).map(([type, tags]) => (
              tags.length > 0 && (
                <div key={type}>
                  <p className="text-xs text-slate-500 uppercase tracking-wide mb-2 capitalize">{type}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {tags.map((tag: string) => (
                      <span key={tag} className="tag-chip text-xs">{tag}</span>
                    ))}
                  </div>
                </div>
              )
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-white/5">
            <CopyButton
              text={Object.values(content.hashtags).flat().join(' ')}
              label="Copy All Hashtags"
            />
          </div>
        </ResultCard>
      )}

      {/* Shorts Hooks */}
      {content.shortsHooks?.length > 0 && (
        <ResultCard title="YouTube Shorts Hooks" icon={Scissors} color="#f59e0b" index={5}>
          <div className="space-y-3">
            {content.shortsHooks.map((h, i) => (
              <div key={i} className="p-3 rounded-xl bg-white/3 space-y-2 group">
                <div className="flex items-center justify-between">
                  <span className="text-xs px-2 py-0.5 rounded-md capitalize"
                    style={{ background: 'rgba(245,158,11,0.15)', color: '#f59e0b' }}>
                    {h.type}
                  </span>
                  <CopyButton text={h.hook} variant="icon" />
                </div>
                <p className="text-white text-sm font-medium">{h.hook}</p>
                {h.firstThreeSeconds && (
                  <p className="text-slate-400 text-xs italic">⏱ First 3s: "{h.firstThreeSeconds}"</p>
                )}
              </div>
            ))}
          </div>
        </ResultCard>
      )}

      {/* Thumbnail Ideas */}
      {content.thumbnailIdeas?.length > 0 && (
        <ResultCard title="Thumbnail Concepts" icon={Image} color="#10b981" index={6}>
          <div className="space-y-4">
            {content.thumbnailIdeas.map((t, i) => (
              <div key={i} className="p-4 rounded-xl bg-white/3 space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-white font-semibold text-sm">{t.title}</p>
                  <span className="text-xs px-2 py-0.5 rounded-md" style={{ background: 'rgba(16,185,129,0.15)', color: '#10b981' }}>
                    {t.emotion}
                  </span>
                </div>
                <p className="text-slate-300 text-sm">Text: <span className="text-white font-medium">"{t.text}"</span></p>
                <p className="text-slate-400 text-sm">{t.composition}</p>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500">Colors:</span>
                  {t.colors?.map((c) => (
                    <div key={c} className="w-5 h-5 rounded-md border border-white/10" style={{ background: c }} title={c} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ResultCard>
      )}

      {/* Virality Analysis */}
      {content.viralityAnalysis && (
        <ResultCard title="Virality Analysis" icon={CircularProgress as any} color="#8b5cf6" index={7}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            <CircularProgress score={content.viralityAnalysis.overallScore} size={90} label="Overall" />
            <CircularProgress score={content.viralityAnalysis.hookStrength} size={90} label="Hook" />
            <CircularProgress score={content.viralityAnalysis.clickability} size={90} label="CTR" />
            <CircularProgress score={content.viralityAnalysis.emotionalImpact} size={90} label="Emotion" />
          </div>
          {content.viralityAnalysis.improvements && (
            <div>
              <p className="text-sm font-semibold text-white mb-3">Improvement Suggestions</p>
              <ul className="space-y-2">
                {content.viralityAnalysis.improvements.map((imp, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                    <span className="text-brand-400 mt-0.5">→</span>
                    {imp}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </ResultCard>
      )}
    </div>
  );
}
