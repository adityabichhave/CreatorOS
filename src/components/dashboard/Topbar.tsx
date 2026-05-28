'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Bell, Menu, Sparkles, Settings } from 'lucide-react';

interface TopbarProps {
  onMenuToggle: () => void;
}

export function Topbar({ onMenuToggle }: TopbarProps) {
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <header className="flex items-center gap-4 px-6 py-4 border-b border-white/5 flex-shrink-0"
      style={{ background: 'rgba(9, 14, 28, 0.9)', backdropFilter: 'blur(12px)' }}>
      {/* Menu toggle */}
      <button onClick={onMenuToggle}
        className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all duration-200">
        <Menu className="w-5 h-5" />
      </button>

      {/* Search */}
      <motion.div
        animate={{ width: searchFocused ? 400 : 280 }}
        transition={{ duration: 0.2 }}
        className="relative hidden md:block">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
        <input
          type="text"
          placeholder="Search projects, trends, history..."
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
          className="input-field pl-9 py-2 text-sm w-full"
        />
      </motion.div>

      {/* Right actions */}
      <div className="ml-auto flex items-center gap-2">
        {/* Quick generate badge */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-brand-500/10 border border-brand-500/20">
          <Sparkles className="w-3.5 h-3.5 text-brand-400" />
          <span className="text-xs text-brand-300 font-medium">∞ Generations</span>
        </div>

        {/* Notifications */}
        <button className="relative p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all duration-200">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-brand-500" />
        </button>

        {/* Settings */}
        <button className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all duration-200">
          <Settings className="w-5 h-5" />
        </button>

        {/* Avatar */}
        <div className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold text-white cursor-pointer hover:opacity-80 transition-opacity"
          style={{ background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)' }}>
          CU
        </div>
      </div>
    </header>
  );
}
