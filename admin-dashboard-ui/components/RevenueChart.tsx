'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from 'recharts';
import { TrendingUp } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const rawData = [
  { name: 'Jan', revenue: 45000, expenses: 24000 },
  { name: 'Feb', revenue: 52000, expenses: 27000 },
  { name: 'Mar', revenue: 49000, expenses: 26000 },
  { name: 'Apr', revenue: 63000, expenses: 31000 },
  { name: 'May', revenue: 58000, expenses: 29000 },
  { name: 'Jun', revenue: 71000, expenses: 35000 },
  { name: 'Jul', revenue: 84245, expenses: 41000 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-2xl border border-border-default bg-surface p-3.5 shadow-lg backdrop-blur-md">
        <p className="text-xs font-semibold text-secondary mb-2">{label} 2026</p>
        <div className="space-y-1.5">
          <div className="flex items-center gap-6 justify-between">
            <span className="text-xs font-medium text-secondary flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-brand-purple" />
              Revenue:
            </span>
            <span className="text-xs font-bold text-primary">
              ${payload[0].value?.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center gap-6 justify-between">
            <span className="text-xs font-medium text-secondary flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-brand-teal" />
              Expenses:
            </span>
            <span className="text-xs font-semibold text-secondary">
              ${payload[1].value?.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

function ChartSkeleton() {
  return (
    <div className="w-full h-80 rounded-3xl border border-border-default bg-surface p-6 flex flex-col justify-between shimmer-loader">
      <div className="space-y-2">
        <div className="h-4 w-40 bg-surface-3 rounded-md" />
        <div className="h-3 w-60 bg-surface-2 rounded-md" />
      </div>
      <div className="h-48 w-full bg-surface-2/40 dark:bg-surface-3/30 rounded-xl" />
    </div>
  );
}

export default function RevenueChart() {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !container) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    observer.observe(container);

    return () => observer.disconnect();
  }, [mounted, container]);

  // Capture scroll progress relative to the state-controlled container element
  const { scrollYProgress } = useScroll({
    target: container ? { current: container } : undefined,
    offset: ["start end", "end start"]
  });

  // Smooth scroll transformations for grid parallax and line wave offset
  const gridY = useTransform(scrollYProgress, [0, 1], [-8, 8]);
  const gridYSpring = useSpring(gridY, { stiffness: 80, damping: 25 });

  const lineY = useTransform(scrollYProgress, [0, 0.5, 1], [4, -4, 4]);
  const lineYSpring = useSpring(lineY, { stiffness: 80, damping: 25 });

  const tickColor = theme === 'dark' ? '#94a3b8' : '#475569';
  const gridColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(15, 23, 42, 0.05)';

  if (!mounted) {
    return <ChartSkeleton />;
  }

  return (
    <motion.div 
      ref={setContainer}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{
        '--grid-y': gridYSpring,
        '--line-y': lineYSpring,
      } as any}
      className="p-6 rounded-3xl border border-border-default bg-surface shadow-sm flex flex-col h-[400px] relative overflow-hidden"
    >
      <style>{`
        @keyframes wave {
          0%, 100% { transform: translateY(var(--line-y, 0px)) scaleY(1); }
          50% { transform: translateY(calc(var(--line-y, 0px) - 2px)) scaleY(0.99); }
        }
        @media (prefers-reduced-motion: no-preference) {
          .recharts-cartesian-grid {
            transform: translateY(var(--grid-y, 0px));
            will-change: transform;
          }
          .recharts-area-curve, .recharts-area-area {
            animation: wave 6s ease-in-out infinite;
            transform-origin: bottom;
            will-change: transform;
          }
          .recharts-tooltip-wrapper {
            transition: transform 0.15s ease-out !important;
          }
          .recharts-active-dot {
            transition: r 0.2s ease-out, stroke-width 0.2s ease-out;
          }
        }
      `}</style>

      {/* Title & Info Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-primary text-base md:text-lg">
              Financial Performance
            </h3>
            <span className="inline-flex items-center gap-0.5 rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-semibold text-emerald-500">
              <TrendingUp className="h-3.5 w-3.5" />
              <span>+18.4% YoY</span>
            </span>
          </div>
          <p className="text-xs text-muted mt-1">
            Tracking company gross revenue and operating expenses.
          </p>
        </div>

        {/* Legend Indicator */}
        <div className="flex items-center gap-4 text-xs font-medium text-secondary">
          <div className="flex items-center gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-brand-purple" />
            <span>Revenue</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-brand-teal" />
            <span>Expenses</span>
          </div>
        </div>
      </div>

      {/* Chart Wrapper */}
      <div className="flex-1 w-full min-h-0 text-xs">
        {isInView && (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              key={isInView ? 'visible' : 'hidden'}
              data={rawData}
              margin={{ top: 5, right: 10, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-brand-purple)" stopOpacity={0.18}/>
                  <stop offset="95%" stopColor="var(--color-brand-purple)" stopOpacity={0.01}/>
                </linearGradient>
                <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-brand-teal)" stopOpacity={0.12}/>
                  <stop offset="95%" stopColor="var(--color-brand-teal)" stopOpacity={0.01}/>
                </linearGradient>
              </defs>
              <CartesianGrid 
                strokeDasharray="3 3" 
                vertical={false} 
                stroke={gridColor} 
              />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: tickColor, fontSize: 10 }} 
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: tickColor, fontSize: 10 }} 
                dx={-5}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area 
                type="monotone" 
                dataKey="revenue" 
                stroke="var(--color-brand-purple)" 
                strokeWidth={3} 
                fillOpacity={1} 
                fill="url(#colorRevenue)" 
                isAnimationActive={true}
                animationDuration={1000}
                animationEasing="ease-out"
              />
              <Area 
                type="monotone" 
                dataKey="expenses" 
                stroke="var(--color-brand-teal)" 
                strokeWidth={2} 
                fillOpacity={1} 
                fill="url(#colorExpenses)" 
                isAnimationActive={true}
                animationDuration={1200}
                animationEasing="ease-out"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </motion.div>
  );
}
