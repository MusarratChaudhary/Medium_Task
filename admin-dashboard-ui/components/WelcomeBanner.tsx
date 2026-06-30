'use client';

import React from 'react';
import { Sparkles, Activity, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { AnimatedCounter } from '@/components/AnalyticsCard';

export default function WelcomeBanner() {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-brand-violet to-brand-indigo text-white p-6 md:p-8 shadow-xl shadow-brand-purple/10"
    >
      {/* Decorative Blur Circles */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-brand-teal/20 blur-3xl" />
      <div className="absolute bottom-0 right-1/4 -mb-16 h-48 w-48 rounded-full bg-brand-purple/30 blur-2xl" />

      {/* Main Grid Content */}
      <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2.5 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-white/10 dark:bg-black/25 px-3 py-1 text-xs font-semibold text-brand-teal tracking-wide backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5 animate-pulse" />
            <span>Systems Online</span>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
            Welcome back, <span className="bg-gradient-to-r from-white via-slate-100 to-brand-teal bg-clip-text text-transparent">Musarrat Chaudhary</span>!
          </h1>
          
          <p className="text-sm md:text-base text-slate-100/90 leading-relaxed font-light">
            NexSoft cluster deployment <code className="px-1.5 py-0.5 rounded bg-black/20 text-xs font-mono text-brand-teal">ns-core-prod</code> is healthy. Primary latency index is optimal at <span className="font-semibold text-emerald-400">12ms</span>.
          </p>

          <p className="text-xs text-slate-200/60 font-medium">
            {today}
          </p>
        </div>

        {/* Live Cluster Stats Panel */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          className="grid grid-cols-2 gap-3 shrink-0 sm:w-80"
        >
          <div className="rounded-2xl bg-white/5 dark:bg-black/15 border border-white/10 p-3.5 backdrop-blur-md hover:bg-white/10 transition-colors">
            <div className="flex items-center justify-between text-slate-200/80 mb-1.5">
              <span className="text-[11px] font-semibold tracking-wider uppercase">Cluster Health</span>
              <Activity className="h-4 w-4 text-emerald-400" />
            </div>
            <p className="text-lg font-bold text-white tracking-tight">
              <AnimatedCounter value={99.98} decimals={2} suffix="%" trigger={true} />
            </p>
            <p className="text-[10px] text-emerald-400 font-medium mt-0.5">▲ 0.02% (24h)</p>
          </div>

          <div className="rounded-2xl bg-white/5 dark:bg-black/15 border border-white/10 p-3.5 backdrop-blur-md hover:bg-white/10 transition-colors">
            <div className="flex items-center justify-between text-slate-200/80 mb-1.5">
              <span className="text-[11px] font-semibold tracking-wider uppercase">Active Tasks</span>
              <Zap className="h-4 w-4 text-brand-teal" />
            </div>
            <p className="text-lg font-bold text-white tracking-tight">
              <AnimatedCounter value={1482} trigger={true} />
            </p>
            <p className="text-[10px] text-brand-teal font-medium mt-0.5">▲ 14.5% rate</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

