'use client';

import React from 'react';
import { 
  ShieldAlert, 
  Database, 
  UserPlus, 
  RefreshCw, 
  CheckCircle, 
  Terminal,
  Clock
} from 'lucide-react';

interface ActivityItem {
  id: string;
  type: 'deploy' | 'db' | 'signup' | 'warning' | 'security';
  title: string;
  desc: string;
  time: string;
  user?: string;
}

export default function ActivityOverview() {
  const activities: ActivityItem[] = [
    {
      id: '1',
      type: 'deploy',
      title: 'Branch deployment: main',
      desc: 'Version v1.4.2 successfully pushed to Kubernetes prod cluster.',
      time: '12 mins ago',
      user: 'Musarrat Chaudhary',
    },
    {
      id: '2',
      type: 'db',
      title: 'Database backup synchronized',
      desc: 'Incremental postgres backup serialized and saved to S3 glacier storage.',
      time: '34 mins ago',
    },
    {
      id: '3',
      type: 'warning',
      title: 'Anomalous traffic spikes',
      desc: 'API gateway rate limit triggered by 198.51.100.22 (540 req/min).',
      time: '1 hour ago',
    },
    {
      id: '4',
      type: 'signup',
      title: 'New customer onboarding',
      desc: 'Enterprise client "Vortex Labs" completed signup and node deployment.',
      time: '2 hours ago',
      user: 'Sophia Chen',
    },
    {
      id: '5',
      type: 'security',
      title: 'SSL/TLS certificate renewed',
      desc: 'Wildcard domain *.nexsoft.com cert successfully renewed for 90 days.',
      time: '4 hours ago',
    }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'deploy':
        return <CheckCircle className="h-4.5 w-4.5 text-emerald-500" />;
      case 'db':
        return <Database className="h-4.5 w-4.5 text-brand-purple" />;
      case 'warning':
        return <ShieldAlert className="h-4.5 w-4.5 text-amber-500" />;
      case 'signup':
        return <UserPlus className="h-4.5 w-4.5 text-brand-teal" />;
      default:
        return <RefreshCw className="h-4.5 w-4.5 text-brand-indigo" />;
    }
  };

  const getIconBg = (type: string) => {
    switch (type) {
      case 'deploy':
        return 'bg-emerald-500/10 dark:bg-emerald-500/20';
      case 'db':
        return 'bg-brand-purple/10 dark:bg-brand-purple/20';
      case 'warning':
        return 'bg-amber-500/10 dark:bg-amber-500/20';
      case 'signup':
        return 'bg-brand-teal/10 dark:bg-brand-teal/20';
      default:
        return 'bg-brand-indigo/10 dark:bg-brand-indigo/20';
    }
  };

  return (
    <div className="p-6 rounded-3xl border border-border-default bg-surface shadow-sm flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-bold text-primary text-base md:text-lg">
            System Activity Log
          </h3>
          <p className="text-xs text-muted mt-1">
            Real-time auditable events across infrastructure nodes.
          </p>
        </div>
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-surface-2 text-muted hover:text-primary transition-colors cursor-pointer">
          <Terminal className="h-4 w-4" />
        </div>
      </div>

      {/* Timeline items list */}
      <div className="relative flex-1 space-y-6 before:absolute before:bottom-2 before:left-5 before:top-2 before:w-0.5 before:bg-border-subtle">
        {activities.map((item) => (
          <div key={item.id} className="relative flex items-start gap-4 group pl-1">
            {/* Timeline icon */}
            <div className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-115 ${getIconBg(item.type)}`}>
              {getIcon(item.type)}
            </div>

            {/* Content body */}
            <div className="flex-1 space-y-1">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <span className="font-bold text-primary text-xs md:text-sm group-hover:text-brand-purple dark:group-hover:text-brand-teal transition-colors">
                  {item.title}
                </span>
                <span className="flex items-center gap-1 text-[10px] text-muted whitespace-nowrap">
                  <Clock className="h-3 w-3" />
                  {item.time}
                </span>
              </div>
              <p className="text-xs text-secondary leading-relaxed">
                {item.desc}
              </p>
              {item.user && (
                <div className="pt-1.5 flex items-center gap-1.5">
                  <span className="text-[10px] font-semibold text-muted">Triggered by:</span>
                  <span className="px-2 py-0.5 rounded-full bg-surface-2 text-[10px] font-medium text-secondary">
                    {item.user}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
