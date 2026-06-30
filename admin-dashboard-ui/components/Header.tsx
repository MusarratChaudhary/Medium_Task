'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Bell, 
  Search, 
  Menu, 
  User, 
  Settings, 
  ShieldAlert, 
  ChevronDown, 
  UserCheck, 
  Cpu, 
  CloudLightning,
  Sparkles,
  CreditCard
} from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import ThemeToggle from '@/components/ThemeToggle';
import { useToast } from '@/components/ToastProvider';

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  onSearchChange?: (val: string) => void;
}

interface NotificationItem {
  id: string;
  title: string;
  desc: string;
  time: string;
  type: 'info' | 'success' | 'warning';
  read: boolean;
}

export default function Header({ sidebarOpen, setSidebarOpen, onSearchChange }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const { showToast } = useToast();
  
  const [searchVal, setSearchVal] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const notificationsRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: '1',
      title: 'Database connection scale-out',
      desc: 'Primary database cluster auto-scaled due to high query load.',
      time: '5 mins ago',
      type: 'info',
      read: false,
    },
    {
      id: '2',
      title: 'New API token issued',
      desc: 'An API key was successfully provisioned for the production branch.',
      time: '1 hour ago',
      type: 'success',
      read: false,
    },
    {
      id: '3',
      title: 'Memory consumption exceeds limit',
      desc: 'Server ns-prod-03 node exceeded 85% RAM utilization.',
      time: '3 hours ago',
      type: 'warning',
      read: true,
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  // Close dropdowns on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Search input handler
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchVal(e.target.value);
    if (onSearchChange) {
      onSearchChange(e.target.value);
    }
  };

  // Listen for Cmd+K or Ctrl+K search shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        const input = document.getElementById('dashboard-search');
        if (input) input.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between px-4 sm:px-6 glass-header">
      {/* Search Bar / Menu button */}
      <div className="flex flex-1 items-center gap-4">
        {/* Toggle Sidebar (Mobile) */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-border-default bg-surface text-secondary hover:text-primary lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Search Bar Wrapper */}
        <div className="relative hidden max-w-md w-full sm:block">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-4.5 w-4.5 text-muted" />
          </div>
          <input
            id="dashboard-search"
            type="search"
            placeholder="Search dashboards, analytics, metrics..."
            value={searchVal}
            onChange={handleSearch}
            className="w-full h-10 rounded-xl border border-border-border-default bg-surface pl-10 pr-12 text-sm text-primary placeholder-muted focus:outline-none focus:ring-2 focus:ring-brand-purple/25 focus:border-brand-purple dark:focus:border-brand-purple shadow-sm dark:shadow-none transition-all"
          />
          <div className="absolute right-3 top-2.5 hidden items-center gap-0.5 rounded border border-border-border-default bg-surface-2 px-1.5 py-0.5 text-[10px] font-medium text-muted sm:flex">
            <span>⌘</span>
            <span>K</span>
          </div>
        </div>
      </div>

      {/* Right Navigation Elements */}
      <div className="flex items-center gap-3">
        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Notifications Dropdown Container */}
        <div className="relative" ref={notificationsRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-border-border-default bg-surface text-secondary hover:text-primary hover:bg-surface-hover transition-all"
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand-purple text-[10px] font-bold text-white ring-2 ring-white dark:ring-slate-950">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown Panel */}
          {showNotifications && (
            <div className="fixed md:absolute top-16 md:top-auto left-4 md:left-auto right-4 md:right-0 mt-2 z-50 w-[calc(100vw-32px)] md:w-96 max-w-none md:max-w-[420px] origin-top-right rounded-2xl border border-border-border-default bg-surface shadow-xl dark:shadow-premium-dark p-2 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="flex items-center justify-between px-3 py-2 border-b border-border-border-subtle">
                <span className="font-semibold text-sm">Notifications</span>
                {unreadCount > 0 && (
                  <button 
                    onClick={markAllRead} 
                    className="text-xs text-brand-purple dark:text-brand-teal hover:underline font-medium"
                  >
                    Mark all read
                  </button>
                )}
              </div>
              <div className="max-h-[50vh] md:max-h-72 overflow-y-auto py-1">
                {notifications.map((item) => (
                  <div
                    key={item.id}
                    className={`flex items-start gap-3 p-3 rounded-xl hover:bg-surface-hover transition-colors cursor-pointer mb-1 last:mb-0
                      ${!item.read ? 'bg-brand-purple/5 dark:bg-brand-purple/5' : ''}
                    `}
                  >
                    <div className="mt-0.5 shrink-0">
                      {item.type === 'warning' && (
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500">
                          <ShieldAlert className="h-4.5 w-4.5" />
                        </div>
                      )}
                      {item.type === 'success' && (
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500">
                          <UserCheck className="h-4.5 w-4.5" />
                        </div>
                      )}
                      {item.type === 'info' && (
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-purple/10 text-brand-purple">
                          <Cpu className="h-4.5 w-4.5" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0 space-y-0.5">
                      <div className="flex items-baseline justify-between gap-2">
                        <p className={`text-xs font-semibold break-words ${!item.read ? 'text-primary' : 'text-secondary'}`}>
                          {item.title}
                        </p>
                        <span className="text-[10px] text-muted whitespace-nowrap shrink-0">
                          {item.time}
                        </span>
                      </div>
                      <p className="text-[11px] text-secondary break-words leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-border-border-subtle pt-2 pb-1 text-center">
                <button className="text-xs font-medium text-secondary hover:text-primary w-full py-1">
                  View all system logs
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="h-6 w-px divider" />

        {/* User Profile Dropdown Container */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2 rounded-xl p-1.5 hover:bg-surface-hover transition-all text-left"
          >
            {/* Avatar Group */}
            <div className="relative h-9 w-9 shrink-0">
              <div className="h-full w-full rounded-xl bg-gradient-to-tr from-brand-purple to-brand-teal p-0.5">
                <div className="h-full w-full rounded-[10px] bg-slate-950 flex items-center justify-center font-bold text-xs text-white">
                  MC
                </div>
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-950" />
            </div>
            
            <div className="hidden md:flex flex-col pr-1">
              <span className="font-semibold text-xs text-primary">Musarrat Chaudhary</span>
              <span className="text-[10px] text-secondary">Full Stack Developer Intern</span>
            </div>
            <ChevronDown className="h-4 w-4 text-muted hidden md:block" />
          </button>

          {/* User Profile Menu */}
          {showProfileMenu && (
            <div className="fixed sm:absolute top-16 sm:top-auto left-4 sm:left-auto right-4 sm:right-0 mt-2 z-50 w-[calc(100vw-32px)] sm:w-64 origin-top-right rounded-2xl border border-border-default bg-surface p-2 shadow-xl dark:shadow-premium-dark animate-in fade-in slide-in-from-top-2 duration-200">
              {/* Account Overview Header */}
              <div className="px-3 py-2.5 border-b border-border-subtle">
                <p className="text-xs text-muted font-medium">Signed in as</p>
                <p className="text-xs font-semibold text-primary truncate">musarrat.chaudhary@nexsoft.com</p>
                <div className="mt-2 flex items-center gap-1.5">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-500">
                    <CloudLightning className="h-2.5 w-2.5" /> Core Staff
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-brand-purple/10 text-brand-purple dark:text-brand-teal">
                    <Sparkles className="h-2.5 w-2.5" /> Enterprise
                  </span>
                </div>
              </div>

              {/* Menu Options */}
              <div className="py-1">
                <button className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-primary hover:bg-surface-hover rounded-lg transition-colors text-left cursor-pointer">
                  <User className="h-4 w-4 text-slate-400" />
                  My Profile
                </button>
                <button className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-primary hover:bg-surface-hover rounded-lg transition-colors text-left cursor-pointer">
                  <Settings className="h-4 w-4 text-slate-400" />
                  Organization Settings
                </button>
                <button className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-primary hover:bg-surface-hover rounded-lg transition-colors text-left cursor-pointer">
                  <CreditCard className="h-4 w-4 text-slate-400" />
                  Billing & Subscriptions
                </button>
              </div>

              <div className="border-t border-border-subtle mt-1 pt-1">
                <button 
                  onClick={() => {
                    showToast('Signing out... Terminating system session.', 'info');
                    setTimeout(() => {
                      showToast('Successfully signed out.', 'success');
                    }, 1200);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 rounded-lg transition-colors text-left cursor-pointer"
                >
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
