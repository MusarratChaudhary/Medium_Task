'use client';

import React from 'react';
import { 
  PlusCircle, 
  Key, 
  Trash2, 
  Sliders, 
  RefreshCw, 
  LifeBuoy,
  Cpu,
  ShieldCheck,
  Zap,
  Globe
} from 'lucide-react';
import { useToast } from '@/components/ToastProvider';

interface QuickAction {
  id: string;
  label: string;
  desc: string;
  icon: React.ComponentType<any>;
  color: 'purple' | 'teal' | 'indigo' | 'emerald' | 'rose' | 'amber';
  actionName: string;
}

export default function QuickActionsPanel() {
  const { showToast } = useToast();
  const actions: QuickAction[] = [
    {
      id: '1',
      label: 'Provision Host',
      desc: 'Deploy custom node container',
      icon: PlusCircle,
      color: 'purple',
      actionName: 'provisioning node',
    },
    {
      id: '2',
      label: 'Rotate API Keys',
      desc: 'Invalidate current API headers',
      icon: Key,
      color: 'teal',
      actionName: 'rotating API tokens',
    },
    {
      id: '3',
      label: 'CDN Cache Purge',
      desc: 'Flush edge endpoints globally',
      icon: Trash2,
      color: 'indigo',
      actionName: 'CDN cache purge',
    },
    {
      id: '4',
      label: 'Scale Cluster',
      desc: 'Modify load balancing parameters',
      icon: Sliders,
      color: 'emerald',
      actionName: 'scaling clusters',
    },
    {
      id: '5',
      label: 'Reboot Systems',
      desc: 'Perform safe cluster restart',
      icon: RefreshCw,
      color: 'rose',
      actionName: 'rebooting host server nodes',
    },
    {
      id: '6',
      label: 'Operator Assist',
      desc: 'Open direct DevOps support lines',
      icon: LifeBuoy,
      color: 'amber',
      actionName: 'opening developer support ticket',
    }
  ];

  const colorStyles = {
    purple: 'bg-brand-purple/5 text-violet-700 border-brand-purple/10 hover:border-brand-purple/35 dark:bg-brand-purple/10 dark:text-violet-300 dark:border-brand-purple/20',
    teal: 'bg-brand-teal/5 text-teal-700 border-brand-teal/10 hover:border-brand-teal/35 dark:bg-brand-teal/10 dark:text-teal-300 dark:border-brand-teal/20',
    indigo: 'bg-brand-indigo/5 text-indigo-700 border-brand-indigo/10 hover:border-brand-indigo/35 dark:bg-brand-indigo/10 dark:text-indigo-300 dark:border-brand-indigo/20',
    emerald: 'bg-emerald-500/5 text-emerald-700 border-emerald-500/10 hover:border-emerald-500/35 dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-500/20',
    rose: 'bg-rose-500/5 text-rose-700 border-rose-500/10 hover:border-rose-500/35 dark:bg-rose-500/10 dark:text-rose-300 dark:border-rose-500/20',
    amber: 'bg-amber-500/5 text-amber-800 border-amber-500/10 hover:border-amber-500/35 dark:bg-amber-500/10 dark:text-amber-300 dark:border-amber-500/20',
  };

  const handleAction = (label: string, actionName: string) => {
    showToast(`Initializing task: [${label}] - Authorizing system ${actionName}...`, 'info');
    setTimeout(() => {
      showToast(`Task [${label}] completed and verified across all active nodes.`, 'success');
    }, 1500);
  };

  return (
    <div className="p-6 rounded-3xl border border-border-default bg-surface shadow-sm flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-bold text-primary text-base md:text-lg">
            DevOps Console Actions
          </h3>
          <p className="text-xs text-muted mt-1">
            Perform instant cluster-wide maintenance operations.
          </p>
        </div>
      </div>

      {/* Grid List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 flex-1">
        {actions.map((act) => {
          const Icon = act.icon;
          return (
            <button
              key={act.id}
              onClick={() => handleAction(act.label, act.actionName)}
              className={`p-4 rounded-2xl border text-left flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-pointer select-none group
                ${colorStyles[act.color]}
              `}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 rounded-xl bg-surface shadow-xs group-hover:scale-110 transition-transform">
                  <Icon className="h-5.5 w-5.5" />
                </div>
                <Zap className="h-3 w-3 text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              <div>
                <span className="font-bold text-xs md:text-sm text-primary block">
                  {act.label}
                </span>
                <p className="text-[10px] text-muted mt-1 font-medium leading-relaxed">
                  {act.desc}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
