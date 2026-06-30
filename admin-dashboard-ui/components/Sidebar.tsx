'use client';

import React from 'react';
import { 
  LayoutDashboard, 
  BarChart3, 
  Users, 
  CreditCard, 
  Settings, 
  LogOut, 
  Shield,
  Activity
} from 'lucide-react';
import { useToast } from '@/components/ToastProvider';

interface SidebarProps {
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
  isDesktopExpanded: boolean;
  setIsDesktopExpanded: (expanded: boolean) => void;
  activeItem: string;
  setActiveItem: (item: string) => void;
}

export default function Sidebar({ 
  isMobileOpen, 
  setIsMobileOpen, 
  isDesktopExpanded, 
  setIsDesktopExpanded, 
  activeItem, 
  setActiveItem 
}: SidebarProps) {
  const { showToast } = useToast();
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'transactions', label: 'Transactions', icon: CreditCard },
    { id: 'team', label: 'Team Members', icon: Users },
    { id: 'activity', label: 'Activity Logs', icon: Activity },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Sidebar Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm lg:hidden animate-in fade-in duration-300"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-45 flex flex-col transition-all duration-300 ease-in-out
          lg:static lg:translate-x-0
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          ${isDesktopExpanded ? 'lg:w-64' : 'lg:w-20'}
          w-64 glass-sidebar
        `}
      >
        {/* Header/Logo */}
        <div className="flex h-16 items-center px-4 border-b border-border-default">
          <button
            onClick={() => {
              if (window.innerWidth >= 1024) {
                setIsDesktopExpanded(!isDesktopExpanded);
              } else {
                setIsMobileOpen(false);
              }
            }}
            className="flex items-center gap-3 w-full text-left rounded-xl p-2 hover:bg-surface-hover transition-all duration-300 group focus:outline-none focus:ring-1 focus:ring-brand-purple/20 min-w-0"
            title={isDesktopExpanded ? "Collapse Sidebar" : "Expand Sidebar"}
          >
            {/* Logo Container with Gradient Border and Subtle Glow */}
            <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-brand-purple to-brand-teal p-0.5 shadow-sm group-hover:shadow-md transition-all duration-300 group-hover:scale-105">
              {/* Inner container to match theme bg */}
              <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-slate-900 dark:bg-slate-950 text-brand-teal group-hover:text-white transition-colors duration-300">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4.5 w-4.5"
                >
                  <rect x="3" y="3" width="7" height="10" rx="1.5" />
                  <rect x="3" y="16" width="7" height="5" rx="1" />
                  <rect x="14" y="3" width="7" height="5" rx="1" />
                  <rect x="14" y="11" width="7" height="10" rx="1.5" />
                </svg>
              </div>
            </div>

            {/* Title with Smooth Animate-In (Expand/Collapse) */}
            <div
              className={`flex flex-col min-w-0 overflow-hidden transition-all duration-300 ease-in-out
                ${isDesktopExpanded ? 'lg:opacity-100 lg:max-w-[150px] lg:translate-x-0' : 'lg:opacity-0 lg:max-w-0 lg:-translate-x-4 lg:pointer-events-none'}
                ${isMobileOpen ? 'opacity-100 max-w-[150px] translate-x-0' : 'opacity-0 max-w-0 -translate-x-4 pointer-events-none lg:opacity-100 lg:max-w-[150px] lg:translate-x-0'}
              `}
            >
              <div className="flex items-baseline gap-1.5 whitespace-nowrap">
                <span className="font-extrabold text-base tracking-tight bg-gradient-to-r from-brand-purple via-brand-indigo to-brand-teal bg-clip-text text-transparent group-hover:brightness-110 transition-all duration-300">
                  Admin
                </span>
                <span className="font-medium text-sm text-muted dark:text-subtle tracking-normal">
                  Dashboard
                </span>
              </div>
            </div>
          </button>
        </div>

        {/* Pro Banner / Premium Status */}
        <div className={`px-4 py-3 mx-4 my-4 rounded-xl bg-gradient-to-r from-brand-purple/10 to-brand-teal/10 border border-brand-purple/15 dark:border-brand-purple/10 text-xs text-brand-purple dark:text-brand-purple flex items-center justify-between transition-all duration-300 overflow-hidden
          ${isDesktopExpanded ? 'lg:opacity-100 lg:max-h-20 lg:my-4 lg:p-4 lg:border' : 'lg:opacity-0 lg:max-h-0 lg:my-0 lg:py-0 lg:border-none lg:pointer-events-none'}
          ${isMobileOpen ? 'opacity-100 max-h-20 my-4 p-4 border' : 'opacity-0 max-h-0 my-0 py-0 border-none pointer-events-none lg:opacity-100 lg:max-h-20 lg:my-4 lg:p-4 lg:border'}
        `}>
          <div className="flex items-center gap-2 shrink-0">
            <Shield className="h-3.5 w-3.5 text-brand-purple" />
            <span className="font-medium text-primary">Enterprise Node</span>
          </div>
          <span className="px-1.5 py-0.5 rounded bg-brand-purple text-[10px] text-white font-semibold uppercase tracking-wider shrink-0">
            v1.0
          </span>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 space-y-1.5 px-3 py-4 overflow-y-auto no-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveItem(item.id);
                  // Auto close sidebar on mobile after clicking
                  setIsMobileOpen(false);
                }}
                className={`w-full group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all relative overflow-hidden
                  ${isActive 
                    ? 'text-brand-purple dark:text-primary bg-sidebar-active shadow-sm border-glow' 
                    : 'text-secondary hover:text-primary hover:bg-sidebar-hover'
                  }
                `}
              >
                <Icon className={`h-5 w-5 shrink-0 transition-transform group-hover:scale-110 duration-200
                  ${isActive ? 'text-brand-purple dark:text-brand-teal' : 'text-muted group-hover:text-primary'}
                `} />
                <span className={`truncate transition-all duration-300
                  ${isDesktopExpanded ? 'lg:opacity-100 lg:max-w-[150px]' : 'lg:opacity-0 lg:max-w-0 lg:overflow-hidden'}
                  ${isMobileOpen ? 'opacity-100 max-w-[150px]' : 'opacity-0 max-w-0 overflow-hidden lg:opacity-100 lg:max-w-[150px]'}
                `}>
                  {item.label}
                </span>
                
                {/* Active Indicator Bar */}
                {isActive && (
                  <div className="absolute left-0 top-3 bottom-3 w-1 rounded-r-md bg-gradient-to-b from-brand-purple to-brand-teal" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom / Logout Action */}
        <div className="p-3 border-t border-border-default">
          <button
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-all group"
            onClick={() => showToast('Session terminated. Redirecting to auth portal...', 'info')}
          >
            <LogOut className="h-5 w-5 shrink-0 text-rose-400 group-hover:text-rose-600 group-hover:translate-x-0.5 transition-all duration-200" />
            <span className={`transition-all duration-300 truncate
              ${isDesktopExpanded ? 'lg:opacity-100 lg:max-w-[150px]' : 'lg:opacity-0 lg:max-w-0 lg:overflow-hidden'}
              ${isMobileOpen ? 'opacity-100 max-w-[150px]' : 'opacity-0 max-w-0 overflow-hidden lg:opacity-100 lg:max-w-[150px]'}
            `}>
              Sign Out
            </span>
          </button>
        </div>
      </aside>
    </>
  );
}
