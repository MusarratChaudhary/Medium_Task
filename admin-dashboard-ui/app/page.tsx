'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import WelcomeBanner from '@/components/WelcomeBanner';
import AnalyticsCard from '@/components/AnalyticsCard';
import RevenueChart from '@/components/RevenueChart';
import UserGrowthChart from '@/components/UserGrowthChart';
import ActivityOverview from '@/components/ActivityOverview';
import RecentTransactionsTable from '@/components/RecentTransactionsTable';
import TeamMembersSection from '@/components/TeamMembersSection';
import QuickActionsPanel from '@/components/QuickActionsPanel';
import { 
  Terminal, 
  Settings as SettingsIcon, 
  HelpCircle, 
  AlertCircle,
  Database,
  Cpu,
  Layers,
  Fingerprint
} from 'lucide-react';

import { useToast } from '@/components/ToastProvider';

export default function Home() {
  const { showToast } = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [activeItem, setActiveItem] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Settings States
  const [securityShield, setSecurityShield] = useState(true);
  const [scaleLimit, setScaleLimit] = useState(48);
  const [cacheTtl, setCacheTtl] = useState(300);
  const [isSavingSettings, setIsSavingSettings] = useState(false);

  // Renders view dynamically based on selected sidebar item
  const renderContent = () => {
    switch (activeItem) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            {/* Welcome Greeting Banner */}
            <WelcomeBanner />

            {/* Top Stat Summary Cards */}
            <AnalyticsCard />

            {/* Interactive Performance Charts */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <RevenueChart />
              <UserGrowthChart />
            </div>

            {/* Detailed Info (Table & Event Logs) */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <div className="xl:col-span-2">
                <RecentTransactionsTable searchQuery={searchQuery} />
              </div>
              <div className="xl:col-span-1">
                <ActivityOverview />
              </div>
            </div>

            {/* Quick Administrative Action Panels */}
            <QuickActionsPanel />

            {/* Operator Listing Section */}
            <TeamMembersSection />
          </div>
        );

      case 'analytics':
        return (
          <div className="space-y-6">
            <div className="p-6 rounded-3xl border border-border-default bg-surface shadow-xs">
              <h2 className="text-xl font-bold mb-2">Detailed Analytics Engine</h2>
              <p className="text-sm text-secondary">Detailed graphs tracking data ingress, cache hits, server CPU rates, and database load multipliers.</p>
            </div>
            
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <RevenueChart />
              <UserGrowthChart />
            </div>

            {/* Additional mock analytical charts details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-6 rounded-3xl border border-border-default bg-surface">
                <p className="text-xs text-secondary font-semibold mb-1 uppercase">CPU Latency Factor</p>
                <p className="text-2xl font-bold text-primary">1.04ms</p>
                <div className="mt-4 h-2 bg-emerald-500/25 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full w-[85%]" />
                </div>
              </div>
              <div className="p-6 rounded-3xl border border-border-default bg-surface">
                <p className="text-xs text-secondary font-semibold mb-1 uppercase">Global CDN Ingress</p>
                <p className="text-2xl font-bold text-primary">4.8 GB/s</p>
                <div className="mt-4 h-2 bg-brand-purple/25 rounded-full overflow-hidden">
                  <div className="h-full bg-brand-purple rounded-full w-[64%]" />
                </div>
              </div>
              <div className="p-6 rounded-3xl border border-border-default bg-surface">
                <p className="text-xs text-secondary font-semibold mb-1 uppercase">Memory Allocation</p>
                <p className="text-2xl font-bold text-primary">45.2 TB</p>
                <div className="mt-4 h-2 bg-brand-teal/25 rounded-full overflow-hidden">
                  <div className="h-full bg-brand-teal rounded-full w-[72%]" />
                </div>
              </div>
            </div>
          </div>
        );

      case 'customers':
        return (
          <div className="space-y-6">
            <div className="p-6 rounded-3xl border border-border-default bg-surface shadow-xs">
              <h2 className="text-xl font-bold mb-2 text-primary">Client Accounts Directory</h2>
              <p className="text-sm text-secondary">View and audit all consumer organizations, node groups, subscription models, and cluster permissions.</p>
            </div>
            <TeamMembersSection />
          </div>
        );

      case 'transactions':
        return (
          <div className="space-y-6">
            <div className="p-6 rounded-3xl border border-border-default bg-surface shadow-xs">
              <h2 className="text-xl font-bold mb-2 text-primary">Finance Ledger Logs</h2>
              <p className="text-sm text-secondary">Auditable transaction log entries, receipt indices, invoice summaries, and client billing states.</p>
            </div>
            <RecentTransactionsTable searchQuery={searchQuery} />
          </div>
        );

      case 'team':
        return (
          <div className="space-y-6">
            <div className="p-6 rounded-3xl border border-border-default bg-surface shadow-xs">
              <h2 className="text-xl font-bold mb-2 text-primary">Operator Team Registry</h2>
              <p className="text-sm text-secondary">Provision roles, check staff session status, and audit workspace log histories.</p>
            </div>
            <TeamMembersSection />
          </div>
        );

      case 'activity':
        return (
          <div className="space-y-6">
            <div className="p-6 rounded-3xl border border-border-default bg-surface shadow-xs">
              <h2 className="text-xl font-bold mb-2 text-primary">Workspace Audit Logs</h2>
              <p className="text-sm text-secondary">Centralized system event log outputs monitoring firewall breaches, backup rates, and deployments.</p>
            </div>
            <ActivityOverview />
          </div>
        );

      case 'settings':
        return (
          <div className="space-y-6">
            <div className="p-6 rounded-3xl border border-border-default bg-surface shadow-sm">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-primary">
                <SettingsIcon className="h-5 w-5 text-brand-purple" /> System Preferences
              </h2>
              
              <div className="space-y-5 divide-y divide-border-border-subtle">
                <div className="pt-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h4 className="text-sm font-semibold text-primary">Cluster Security Shield</h4>
                    <p className="text-xs text-secondary mt-1">Force cryptographic audits on API calls and token generation.</p>
                  </div>
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      checked={securityShield} 
                      onChange={(e) => {
                        const val = e.target.checked;
                        setSecurityShield(val);
                        if (val) {
                          showToast("Cluster Security Shield activated. Strict cryptographic enforcement is online.", "success");
                        } else {
                          showToast("Warning: Security Shield deactivated. Cluster endpoints are exposed to standard validation.", "warning");
                        }
                      }}
                      className="h-4.5 w-4.5 rounded border-slate-300 text-brand-purple focus:ring-brand-purple cursor-pointer transition-colors" 
                    />
                  </div>
                </div>

                <div className="pt-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h4 className="text-sm font-semibold text-primary">Edge Auto-Scale Limiters</h4>
                    <p className="text-xs text-secondary mt-1">Set maximum instances the hypervisor can trigger under peak request spikes.</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => {
                        setScaleLimit(prev => Math.max(1, prev - 1));
                        showToast(`Decreased scale limit to ${Math.max(1, scaleLimit - 1)} instances.`, 'info');
                      }}
                      className="h-8 w-8 rounded-lg bg-surface-2 hover:bg-surface-hover border border-border-subtle text-primary transition-all flex items-center justify-center font-bold cursor-pointer"
                    >
                      -
                    </button>
                    <span className="text-xs font-semibold px-4 py-1.5 rounded-lg bg-surface-2 text-primary border border-border-subtle w-24 text-center">
                      {scaleLimit} instances
                    </span>
                    <button 
                      onClick={() => {
                        setScaleLimit(prev => prev + 1);
                        showToast(`Increased scale limit to ${scaleLimit + 1} instances.`, 'info');
                      }}
                      className="h-8 w-8 rounded-lg bg-surface-2 hover:bg-surface-hover border border-border-subtle text-primary transition-all flex items-center justify-center font-bold cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="pt-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h4 className="text-sm font-semibold text-primary">CDN Cache Lifespans</h4>
                    <p className="text-xs text-secondary mt-1">TTL constraints for global edge static caching configurations.</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <select
                      value={cacheTtl}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setCacheTtl(val);
                        showToast(`CDN TTL cache lifetime set to ${val} seconds.`, 'success');
                      }}
                      className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-surface-2 text-primary border border-border-subtle cursor-pointer focus:outline-none focus:ring-1 focus:ring-brand-purple"
                    >
                      <option value={60}>60 seconds (1 min)</option>
                      <option value={300}>300 seconds (5 mins)</option>
                      <option value={900}>900 seconds (15 mins)</option>
                      <option value={3600}>3600 seconds (1 hour)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="border-t border-border-subtle mt-8 pt-6 flex items-center justify-end gap-3">
                <button
                  onClick={() => {
                    setSecurityShield(true);
                    setScaleLimit(48);
                    setCacheTtl(300);
                    showToast("System configurations reset to factory defaults.", "info");
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-semibold hover:bg-surface-hover transition-colors cursor-pointer border border-border-subtle text-secondary hover:text-primary animate-hover"
                >
                  Reset Defaults
                </button>
                <button
                  onClick={() => {
                    setIsSavingSettings(true);
                    showToast("Syncing system preferences with hypervisor clusters...", "info");
                    setTimeout(() => {
                      setIsSavingSettings(false);
                      showToast("System preferences successfully saved and synchronized.", "success");
                    }, 1200);
                  }}
                  disabled={isSavingSettings}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-brand-purple text-white hover:bg-brand-purple/90 transition-colors shadow-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed animate-hover"
                >
                  {isSavingSettings ? 'Saving...' : 'Save Settings'}
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="p-8 text-center text-secondary">
            Select an option from the sidebar directory.
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-page text-primary">
      {/* Sidebar Navigation */}
      <Sidebar 
        isMobileOpen={sidebarOpen}
        setIsMobileOpen={setSidebarOpen}
        isDesktopExpanded={sidebarExpanded}
        setIsDesktopExpanded={setSidebarExpanded}
        activeItem={activeItem} 
        setActiveItem={setActiveItem} 
      />

      {/* Primary Scrollable Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Sticky top navigation header */}
        <Header 
          sidebarOpen={sidebarOpen} 
          setSidebarOpen={setSidebarOpen} 
          onSearchChange={setSearchQuery} 
        />

        {/* Dynamic page main content body */}
        <main className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 scroll-smooth">
          <div className="mx-auto max-w-7.5xl">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}
