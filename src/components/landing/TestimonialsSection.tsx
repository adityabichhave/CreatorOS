'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  { name: 'Alex Rivera', role: 'Tech YouTuber · 280K subs', avatar: 'AR', text: 'CreatorOS literally 10x\'d my upload speed. I used to spend 4 hours on titles and descriptions alone. Now it\'s 10 minutes and the quality is actually better.', rating: 5, metric: '+340% views' },
  { name: 'Priya Sharma', role: 'AI Content Creator · 95K subs', avatar: 'PS', text: 'The virality analyzer is insane. It told me my hook was weak before I uploaded and suggested changes. My next video hit 500K views — first time ever.', rating: 5, metric: '500K views' },
  { name: 'Marcus Chen', role: 'Finance Educator · 450K subs', avatar: 'MC', text: 'I\'ve tried every creator tool out there. CreatorOS is on a different level. The Gemini integration understands context in a way other tools just don\'t.', rating: 5, metric: '2x subscribers' },
  { name: 'Sofia Martinez', role: 'Lifestyle Vlogger · 180K subs', avatar: 'SM', text: 'The Instagram captions and hashtag generation saved my entire workflow. I post 5 times per week across platforms and CreatorOS handles all of it.', rating: 5, metric: '5x faster' },
  { name: 'James Kim', role: 'Gaming Creator · 620K subs', avatar: 'JK', text: 'Thumbnail Studio is a game changer. The AI composition ideas are exactly what I would come up with after hours of brainstorming. But it\'s instant.', rating: 5, metric: '+180% CTR' },
  { name: 'Emma Walsh', role: 'Education Channel · 310K subs', avatar: 'EW', text: 'The Trend Explorer helped me find a viral niche I would have never thought of. Made my most viewed video ever — 1.2M views in first week.', rating: 5, metric: '1.2M views' },
];

export function TestimonialsSection() {
  return (
    <section className="relative py-32 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}>
          <div className="section-label mx-auto w-fit mb-4">
            <Star className="w-3.5 h-3.5" />
            <span>Creator Stories</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Loved by <span className="gradient-text">10,000+ Creators</span>
          </h2>
          <p className="text-slate-400 text-lg">Real results from real creators who use CreatorOS every day.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {testimonials.map((t, i) => (
            <motion.div key={t.name}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="glass-card-hover p-6 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)' }}>
                  {t.avatar}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{t.name}</p>
                  <p className="text-slate-500 text-xs">{t.role}</p>
                </div>
                <span className="ml-auto px-2 py-1 rounded-md text-xs font-bold text-green-400 bg-green-400/10 border border-green-400/20">
                  {t.metric}
                </span>
              </div>
              <div className="flex gap-0.5">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">"{t.text}"</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
