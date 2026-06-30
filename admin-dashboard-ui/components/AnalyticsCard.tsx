'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  DollarSign, 
  Users, 
  Percent, 
  Activity, 
  TrendingUp, 
  TrendingDown, 
  Server,
  HelpCircle
} from 'lucide-react';
import { motion } from 'framer-motion';

// Hardware-accelerated count-up component using requestAnimationFrame
interface AnimatedCounterProps {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  trigger?: boolean;
}

export function AnimatedCounter({ value, duration = 1200, prefix = '', suffix = '', decimals = 0, trigger = false }: AnimatedCounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;

    let startTime: number | null = null;
    const startValue = 0;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const currentValue = startValue + progress * (value - startValue);
      setCount(currentValue);

      if (progress < 1) {
        window.requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };

    window.requestAnimationFrame(animate);
  }, [value, duration, trigger]);

  const formatted = count.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}

interface MetricCardProps {
  title: string;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  change: number;
  changeType: 'increase' | 'decrease';
  changeTimeframe: string;
  icon: React.ComponentType<any>;
  glowColor: 'purple' | 'emerald' | 'teal' | 'indigo';
}

export function MetricCard({
  title,
  value,
  prefix = '',
  suffix = '',
  decimals = 0,
  change,
  changeType,
  changeTimeframe,
  icon: Icon,
  glowColor,
}: MetricCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const glowClasses = {
    purple: 'hover:shadow-glow-purple border-brand-purple/10 hover:border-brand-purple/30',
    emerald: 'hover:shadow-glow-emerald border-brand-emerald/10 hover:border-brand-emerald/30',
    teal: 'hover:shadow-glow-teal border-brand-teal/10 hover:border-brand-teal/30',
    indigo: 'hover:shadow-glow-purple border-brand-indigo/10 hover:border-brand-indigo/30',
  };

  const iconBgClasses = {
    purple: 'bg-brand-purple/10 text-brand-purple dark:bg-brand-purple/20',
    emerald: 'bg-brand-emerald/10 text-brand-emerald dark:bg-brand-emerald/20',
    teal: 'bg-brand-teal/10 text-brand-teal dark:bg-brand-teal/20',
    indigo: 'bg-brand-indigo/10 text-brand-indigo dark:bg-brand-indigo/20',
  };

  return (
    <motion.div 
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`p-6 rounded-3xl border bg-surface shadow-sm transition-all duration-300 group hover:-translate-y-1 select-none
        ${glowClasses[glowColor]}
      `}
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold text-muted uppercase tracking-wider">
          {title}
        </span>
        <div className={`p-2.5 rounded-xl transition-all duration-300 group-hover:scale-110 ${iconBgClasses[glowColor]}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>

      <div className="space-y-1">
        <h3 className="text-2xl font-bold tracking-tight text-primary">
          <AnimatedCounter 
            value={value} 
            prefix={prefix} 
            suffix={suffix} 
            decimals={decimals} 
            trigger={isInView}
          />
        </h3>
        
        <div className="flex items-center gap-1.5 pt-1">
          {changeType === 'increase' ? (
            <div className="inline-flex items-center gap-0.5 rounded-md bg-emerald-500/10 px-1.5 py-0.5 text-xs font-semibold text-emerald-500">
              <TrendingUp className="h-3 w-3" />
              <span>+{change}%</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-0.5 rounded-md bg-rose-500/10 px-1.5 py-0.5 text-xs font-semibold text-rose-500">
              <TrendingDown className="h-3 w-3" />
              <span>-{change}%</span>
            </div>
          )}
          <span className="text-[11px] font-medium text-muted">
            {changeTimeframe}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function AnalyticsCard() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
      <MetricCard
        title="Monthly Revenue"
        value={84245.50}
        prefix="$"
        decimals={2}
        change={12.5}
        changeType="increase"
        changeTimeframe="vs. last month"
        icon={DollarSign}
        glowColor="purple"
      />
      <MetricCard
        title="Active Cluster Users"
        value={18482}
        decimals={0}
        change={8.2}
        changeType="increase"
        changeTimeframe="vs. last month"
        icon={Users}
        glowColor="emerald"
      />
      <MetricCard
        title="Request Hit Rate"
        value={99.98}
        suffix="%"
        decimals={2}
        change={0.02}
        changeType="increase"
        changeTimeframe="vs. yesterday"
        icon={Percent}
        glowColor="teal"
      />
      <MetricCard
        title="Active Host Instances"
        value={1248}
        decimals={0}
        change={1.5}
        changeType="decrease"
        changeTimeframe="vs. last week"
        icon={Server}
        glowColor="indigo"
      />
    </div>
  );
}
