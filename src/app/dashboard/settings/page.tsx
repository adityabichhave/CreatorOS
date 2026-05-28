'use client';

import { motion } from 'framer-motion';
import { Settings, Key, Bell, Palette, User, Shield } from 'lucide-react';
import toast from 'react-hot-toast';
import { useState } from 'react';

export default function SettingsPage() {
  const [apiKey, setApiKey] = useState('');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    toast.success('Settings saved!');
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-white mb-1 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #64748b, #475569)' }}>
            <Settings className="w-5 h-5 text-white" />
          </div>
          Settings
        </h1>
        <p className="text-slate-400 ml-12">Configure your CreatorOS preferences.</p>
      </motion.div>

      {[
        {
          icon: Key, title: 'API Configuration', color: '#8b5cf6',
          content: (
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Gemini API Key</label>
                <input type="password" placeholder="Enter your Gemini API key..."
                  value={apiKey} onChange={(e) => setApiKey(e.target.value)}
                  className="input-field" />
                <p className="text-xs text-slate-500 mt-2">Get your free API key at <a href="https://aistudio.google.com" target="_blank" rel="noopener noreferrer" className="text-brand-400 hover:underline">aistudio.google.com</a></p>
              </div>
            </div>
          ),
        },
        {
          icon: User, title: 'Profile', color: '#3b82f6',
          content: (
            <div className="grid grid-cols-2 gap-4">
              {['Creator Name', 'Email', 'YouTube Channel', 'Primary Niche'].map((f) => (
                <div key={f}>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">{f}</label>
                  <input type="text" placeholder={f} className="input-field text-sm" />
                </div>
              ))}
            </div>
          ),
        },
        {
          icon: Palette, title: 'Appearance', color: '#f59e0b',
          content: (
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/3">
                <span className="text-sm text-slate-300">Theme</span>
                <div className="flex gap-2">
                  {['Dark', 'Light', 'System'].map((t) => (
                    <button key={t} className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${t === 'Dark' ? 'bg-brand-500/20 text-brand-300 border border-brand-500/30' : 'bg-white/5 text-slate-400 border border-white/8 hover:border-white/20'}`}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ),
        },
        {
          icon: Bell, title: 'Notifications', color: '#10b981',
          content: (
            <div className="space-y-3">
              {['Generation complete', 'Trend alerts', 'Weekly performance report', 'Product updates'].map((n) => (
                <div key={n} className="flex items-center justify-between p-3 rounded-xl bg-white/3">
                  <span className="text-sm text-slate-300">{n}</span>
                  <div className="w-10 h-5 rounded-full bg-brand-500/50 relative cursor-pointer">
                    <div className="absolute right-0.5 top-0.5 w-4 h-4 rounded-full bg-brand-400" />
                  </div>
                </div>
              ))}
            </div>
          ),
        },
      ].map(({ icon: Icon, title, color, content }, i) => (
        <motion.div key={title}
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="glass-card p-6 space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: `${color}20`, border: `1px solid ${color}30` }}>
              <Icon className="w-4 h-4" style={{ color }} />
            </div>
            <h2 className="text-white font-semibold">{title}</h2>
          </div>
          {content}
        </motion.div>
      ))}

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
        <button onClick={handleSave} className="btn-primary">
          <Shield className="w-4 h-4" />
          {saved ? 'Saved!' : 'Save Settings'}
        </button>
      </motion.div>
    </div>
  );
}
