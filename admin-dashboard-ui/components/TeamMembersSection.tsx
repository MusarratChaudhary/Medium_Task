'use client';

import React, { useState } from 'react';
import { Mail, MessageSquare, ShieldAlert, Sparkles, Trash2, ShieldCheck } from 'lucide-react';
import { useToast } from '@/components/ToastProvider';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatarInitials: string;
  avatarBg: string;
  status: 'online' | 'busy' | 'offline';
  statusText: string;
}

export default function TeamMembersSection() {
  const { showToast } = useToast();
  const [members, setMembers] = useState<TeamMember[]>([
    {
      id: '1',
      name: 'Sophia Chen',
      role: 'Principal DevOps Architect',
      avatarInitials: 'SC',
      avatarBg: 'from-brand-purple to-purple-500',
      status: 'online',
      statusText: 'Online',
    },
    {
      id: '2',
      name: 'Marcus Aurelius',
      role: 'Chief Security Officer',
      avatarInitials: 'MA',
      avatarBg: 'from-amber-400 to-orange-500',
      status: 'busy',
      statusText: 'In Call',
    },
    {
      id: '3',
      name: 'Lina Vance',
      role: 'Staff Product UX',
      avatarInitials: 'LV',
      avatarBg: 'from-brand-teal to-emerald-500',
      status: 'online',
      statusText: 'Active',
    },
    {
      id: '4',
      name: 'Tariq Al-Fatah',
      role: 'Lead Cloud SRE',
      avatarInitials: 'TA',
      avatarBg: 'from-indigo-500 to-blue-500',
      status: 'offline',
      statusText: 'Away',
    }
  ]);

  const getStatusColor = (status: 'online' | 'busy' | 'offline') => {
    switch (status) {
      case 'online':
        return 'bg-emerald-500';
      case 'busy':
        return 'bg-amber-500';
      default:
        return 'bg-muted';
    }
  };

  return (
    <div className="p-6 rounded-3xl border border-border-default bg-surface shadow-sm flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-bold text-primary text-base md:text-lg">
            Operator Group
          </h3>
          <p className="text-xs text-muted mt-1">
            Active staff members logged into the Admin Dashboard.
          </p>
        </div>
      </div>

      {/* Member Cards List */}
      <div className="space-y-4 flex-1">
        {members.map((member) => (
          <div 
            key={member.id} 
            className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 gap-4 rounded-2xl border border-border-subtle hover:bg-surface-hover hover:shadow-xs transition-all duration-200 group"
          >
            <div className="flex items-center gap-3 min-w-0">
              {/* Initials Avatar */}
              <div className="relative shrink-0">
                <div className={`h-10 w-10 rounded-xl bg-gradient-to-tr ${member.avatarBg} p-0.5 shadow-sm`}>
                  <div className="h-full w-full rounded-[9px] bg-surface flex items-center justify-center font-bold text-xs text-primary">
                    {member.avatarInitials}
                  </div>
                </div>
                <div className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-surface ${getStatusColor(member.status)}`} />
              </div>

              <div className="min-w-0">
                <span className="font-bold text-xs md:text-sm text-primary group-hover:text-brand-purple dark:group-hover:text-brand-teal transition-colors block truncate">
                  {member.name}
                </span>
                <p className="text-[11px] text-muted mt-0.5 truncate">
                  {member.role}
                </p>
              </div>
            </div>

            {/* Actions Panel */}
            <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 w-full sm:w-auto">
              <span className={`px-2 py-0.5 rounded-full text-[9px] font-semibold tracking-wider uppercase
                ${member.status === 'online' ? 'bg-emerald-500/10 text-emerald-500' : ''}
                ${member.status === 'busy' ? 'bg-amber-500/10 text-amber-500' : ''}
                ${member.status === 'offline' ? 'bg-surface-2 text-muted' : ''}
              `}>
                {member.statusText}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    showToast(`Establishing secure encrypted tunnel with ${member.name}...`, 'info');
                    setTimeout(() => {
                      showToast(`Secure link established with ${member.name}.`, 'success');
                    }, 1200);
                  }}
                  className="h-8 w-8 rounded-lg bg-surface-2 hover:bg-brand-purple/10 hover:text-brand-purple dark:hover:bg-brand-purple/20 text-muted hover:text-primary transition-colors flex items-center justify-center cursor-pointer"
                  title="Message Member"
                >
                  <MessageSquare className="h-4 w-4" />
                </button>
                <button
                  onClick={() => {
                    showToast(`Revoking and updating security credentials for ${member.name}...`, 'info');
                    setTimeout(() => {
                      showToast(`Credentials verified and security token updated for ${member.name}.`, 'success');
                    }, 1000);
                  }}
                  className="h-8 w-8 rounded-lg bg-surface-2 hover:bg-emerald-500/10 hover:text-emerald-500 dark:hover:bg-emerald-500/20 text-muted hover:text-primary transition-colors flex items-center justify-center cursor-pointer"
                  title="Verify security clearance"
                >
                  <ShieldCheck className="h-4 w-4" />
                </button>
                <button
                  onClick={() => {
                    setMembers(prev => prev.filter(m => m.id !== member.id));
                    showToast(`Operator ${member.name} removed from active operations group.`, 'warning');
                  }}
                  className="h-8 w-8 rounded-lg bg-surface-2 hover:bg-rose-500/10 hover:text-rose-500 dark:hover:bg-rose-500/20 text-muted hover:text-primary transition-colors flex items-center justify-center cursor-pointer"
                  title="Remove Member"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
