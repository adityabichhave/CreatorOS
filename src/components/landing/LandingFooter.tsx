'use client';

import { Sparkles, Twitter, Youtube, Instagram, Github } from 'lucide-react';
import Link from 'next/link';

export function LandingFooter() {
  return (
    <footer className="relative border-t border-white/5 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)' }}>
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold text-white">CreatorOS</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm mb-6">
              The AI operating system for content creators. Transform your ideas into viral content packages powered by Google Gemini.
            </p>
            <div className="flex gap-3">
              {[Twitter, Youtube, Instagram, Github].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center text-slate-400 hover:text-white hover:bg-brand-500/20 hover:border-brand-500/40 transition-all duration-200">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {[
            { title: 'Product', links: ['AI Generator', 'Virality Analyzer', 'Trend Explorer', 'Thumbnail Studio', 'Pricing'] },
            { title: 'Company', links: ['About', 'Blog', 'Careers', 'Privacy Policy', 'Terms of Service'] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-white font-semibold mb-4 text-sm">{col.title}</h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-slate-400 hover:text-white text-sm transition-colors duration-200">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">© 2025 CreatorOS. Built with ❤️ using Google Gemini AI.</p>
          <p className="text-slate-600 text-xs">Powered by Google Gemini • Next.js • Framer Motion</p>
        </div>
      </div>
    </footer>
  );
}
