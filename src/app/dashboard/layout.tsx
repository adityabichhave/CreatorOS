'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { Topbar } from '@/components/dashboard/Topbar';
import type { AppPage } from '@/types';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [activePage, setActivePage] = useState<AppPage>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-dark-950 overflow-hidden">
      <Sidebar activePage={activePage} setActivePage={setActivePage} isOpen={sidebarOpen} />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Topbar onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
