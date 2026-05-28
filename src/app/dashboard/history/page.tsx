'use client';

import { motion } from 'framer-motion';
import { Clock, ArrowRight, Youtube, Instagram, Scissors } from 'lucide-react';

const history = [
  { id: '1', title: '10 AI Tools That Will 10x Your Productivity in 2025', niche: 'AI', platform: 'YouTube', score: 91, time: '2 hours ago', tags: 24 },
  { id: '2', title: 'How I Made My First $10K Creating Content (Full Story)', niche: 'Finance', platform: 'Multi-platform', score: 87, time: '5 hours ago', tags: 28 },
  { id: '3', title: 'The Gaming Setup That Changed Everything', niche: 'Gaming', platform: 'YouTube', score: 78, time: 'Yesterday', tags: 22 },
  { id: '4', title: 'Morning Routine of a 7-Figure Creator (6AM Wake Up)', niche: 'Vlogs', platform: 'Instagram', score: 84, time: '2 days ago', tags: 30 },
  { id: '5', title: 'I Tried Every AI Writing Tool for 30 Days - Results', niche: 'Tech', platform: 'YouTube', score: 89, time: '3 days ago', tags: 26 },
  { id: '6', title: 'Coding 8 Hours a Day Changed My Brain', niche: 'Coding', platform: 'Shorts', score: 82, time: '4 days ago', tags: 20 },
];

const platformIcon = (p: string) => {
  if (p === 'YouTube') return <Youtube className="w-3.5 h-3.5 text-red-400" />;
  if (p === 'Instagram') return <Instagram className="w-3.5 h-3.5 text-pink-400" />;
  if (p === 'Shorts') return <Scissors className="w-3.5 h-3.5 text-amber-400" />;
  return <Youtube className="w-3.5 h-3.5 text-blue-400" />;
};

export default function HistoryPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-white mb-1 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #64748b, #475569)' }}>
            <Clock className="w-5 h-5 text-white" />
          </div>
          History
        </h1>
        <p className="text-slate-400 ml-12">All your previously generated content packages.</p>
      </motion.div>

      <div className="glass-card divide-y divide-white/5">
        {history.map((item, i) => (
          <motion.div key={item.id}
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.07 }}
            className="flex items-center gap-4 p-5 hover:bg-white/3 transition-colors cursor-pointer group">
            <div className="flex-1 min-w-0">
              <p className="text-white font-medium text-sm mb-2 truncate">{item.title}</p>
              <div className="flex items-center gap-3 flex-wrap">
                <span className="flex items-center gap-1.5 text-xs text-slate-500">
                  {platformIcon(item.platform)}
                  {item.platform}
                </span>
                <span className="text-xs px-2 py-0.5 rounded-md" style={{ background: 'rgba(139,92,246,0.12)', color: '#a78bfa' }}>
                  {item.niche}
                </span>
                <span className="text-xs text-slate-600">{item.tags} tags</span>
                <span className="text-xs text-slate-600">•</span>
                <span className="text-xs text-slate-600">{item.time}</span>
              </div>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <div className={`score-badge text-sm ${item.score >= 80 ? 'score-high' : 'score-medium'}`}>
                {item.score}%
              </div>
              <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-slate-400 transition-colors" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
