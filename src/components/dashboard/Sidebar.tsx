'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sparkles, LayoutDashboard, Wand2, TrendingUp, Image,
  BarChart3, Clock, Settings, ChevronLeft, Zap, Link2
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: Wand2, label: 'AI Generator', href: '/dashboard/generator' },
  { icon: TrendingUp, label: 'Trend Explorer', href: '/dashboard/trends' },
  { icon: Image, label: 'Thumbnail Studio', href: '/dashboard/thumbnail' },
  { icon: BarChart3, label: 'Virality Analyzer', href: '/dashboard/virality' },
  { icon: Link2, label: 'Competitor Analyzer', href: '/dashboard/competitor' },
  { icon: Clock, label: 'History', href: '/dashboard/history' },
  { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
];

interface SidebarProps {
  activePage: string;
  setActivePage: (page: any) => void;
  isOpen: boolean;
}

export function Sidebar({ isOpen }: SidebarProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.aside
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 260, opacity: 1 }}
          exit={{ width: 0, opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          className="h-full flex flex-col border-r border-white/5 overflow-hidden flex-shrink-0"
          style={{ background: 'rgba(9, 14, 28, 0.95)' }}>
          {/* Logo */}
          <div className="flex items-center gap-3 px-5 py-5 border-b border-white/5 flex-shrink-0">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)' }}>
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-white font-bold text-base leading-none">CreatorOS</p>
              <p className="text-xs text-slate-500 mt-0.5">AI Growth Copilot</p>
            </div>
          </div>

          {/* Plan badge */}
          <div className="px-4 py-3 border-b border-white/5 flex-shrink-0">
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-brand-500/10 border border-brand-500/20">
              <Zap className="w-3.5 h-3.5 text-brand-400" />
              <span className="text-xs font-medium text-brand-300">Creator Plan Active</span>
              <span className="ml-auto text-xs text-brand-400">∞</span>
            </div>
          </div>

          {/* Nav */}
          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            <p className="text-xs text-slate-600 uppercase tracking-wider px-3 mb-3 font-medium">Workspace</p>
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link key={item.href} href={item.href}
                  className={cn(
                    'sidebar-item relative',
                    isActive && 'active'
                  )}>
                  <item.icon className="w-4.5 h-4.5 flex-shrink-0" style={{ width: 18, height: 18 }} />
                  <span className="text-sm whitespace-nowrap">{item.label}</span>
                  {isActive && (
                    <motion.div layoutId="sidebar-active"
                      className="absolute right-3 w-1.5 h-1.5 rounded-full bg-brand-500"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Bottom profile */}
          <div className="px-4 py-4 border-t border-white/5 flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)' }}>
                CU
              </div>
              <div className="min-w-0">
                <p className="text-white text-sm font-medium truncate">Creator User</p>
                <p className="text-slate-500 text-xs truncate">creator@example.com</p>
              </div>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
