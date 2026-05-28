'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Check, Sparkles, Zap, Crown } from 'lucide-react';

const plans = [
  {
    name: 'Starter', price: 'Free', period: '', icon: Zap, color: '#64748b',
    desc: 'Perfect for creators just getting started.',
    features: ['10 AI generations/month', 'YouTube SEO optimizer', 'Basic Instagram captions', 'Hashtag generator', 'Community support'],
    cta: 'Get Started Free', primary: false,
  },
  {
    name: 'Creator', price: '$19', period: '/month', icon: Sparkles, color: '#8b5cf6',
    desc: 'For serious creators scaling their channels.',
    features: ['Unlimited generations', 'All AI tools included', 'Virality Analyzer', 'Trend Explorer', 'Thumbnail Studio', 'Priority support', 'Export & history'],
    cta: 'Start 7-Day Free Trial', primary: true,
  },
  {
    name: 'Agency', price: '$79', period: '/month', icon: Crown, color: '#f59e0b',
    desc: 'For agencies and professional creators.',
    features: ['Everything in Creator', '10 team members', 'Client management', 'White-label exports', 'API access', 'Dedicated support', 'Custom integrations'],
    cta: 'Contact Sales', primary: false,
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="relative py-32 px-4">
      <div className="absolute inset-0 bg-radial-blue opacity-20" />
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}>
          <div className="section-label mx-auto w-fit mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Simple Pricing</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Invest in Your <span className="gradient-text">Creator Growth</span>
          </h2>
          <p className="text-slate-400 text-lg">Start free. Upgrade when you're ready to scale.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <motion.div key={plan.name}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className={`relative glass-card p-8 flex flex-col gap-6 ${plan.primary ? 'border-brand-500/40 ring-1 ring-brand-500/30' : ''}`}>
              {plan.primary && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-semibold text-white"
                  style={{ background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)' }}>
                  Most Popular
                </div>
              )}
              <div>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${plan.color}20`, border: `1px solid ${plan.color}40` }}>
                  <plan.icon className="w-5 h-5" style={{ color: plan.color }} />
                </div>
                <h3 className="text-white font-bold text-xl mb-1">{plan.name}</h3>
                <p className="text-slate-400 text-sm mb-4">{plan.desc}</p>
                <div className="flex items-end gap-1">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  {plan.period && <span className="text-slate-400 mb-1">{plan.period}</span>}
                </div>
              </div>
              <ul className="space-y-3 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm">
                    <Check className="w-4 h-4 flex-shrink-0" style={{ color: plan.color }} />
                    <span className="text-slate-300">{f}</span>
                  </li>
                ))}
              </ul>
              <Link href="/dashboard"
                className={`w-full text-center py-3 rounded-xl font-semibold transition-all duration-300 text-sm ${
                  plan.primary
                    ? 'btn-primary justify-center'
                    : 'btn-secondary justify-center'
                }`}>
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
