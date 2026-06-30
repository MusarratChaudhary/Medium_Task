'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  BarChart, 
  Bar, 
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
  { name: 'Wk 1', newUsers: 1400, activeUsers: 2200 },
  { name: 'Wk 2', newUsers: 1850, activeUsers: 2800 },
  { name: 'Wk 3', newUsers: 2200, activeUsers: 3400 },
  { name: 'Wk 4', newUsers: 2100, activeUsers: 3900 },
  { name: 'Wk 5', newUsers: 2900, activeUsers: 4800 },
  { name: 'Wk 6', newUsers: 3400, activeUsers: 5600 },
  { name: 'Wk 7', newUsers: 4300, activeUsers: 6800 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-2xl border border-border-default bg-surface p-3.5 shadow-lg backdrop-blur-md">
        <p className="text-xs font-semibold text-secondary mb-2">{label} Analytics</p>
        <div className="space-y-1.5">
          <div className="flex items-center gap-6 justify-between">
            <span className="text-xs font-medium text-secondary flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-brand-purple" />
              Active Nodes:
            </span>
            <span className="text-xs font-bold text-primary">
              {payload[1].value?.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center gap-6 justify-between">
            <span className="text-xs font-medium text-secondary flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-brand-indigo" />
              Registrations:
            </span>
            <span className="text-xs font-semibold text-secondary">
              +{payload[0].value?.toLocaleString()}
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

// Custom shape using Framer Motion for premium sequential spring animations
const AnimatedBar = (props: any) => {
  const { x, y, width, height, fill, index, isInView } = props;

  // Return null if dimensions are invalid or not provided yet
  if (x === undefined || y === undefined || !width || !height) return null;

  return (
    <motion.rect
      x={x}
      width={width}
      fill={fill}
      rx={3}
      ry={3}
      initial={{ y: y + height, height: 0 }}
      animate={isInView ? { y, height } : { y: y + height, height: 0 }}
      transition={{ 
        type: 'spring', 
        stiffness: 90, 
        damping: 15, 
        delay: isInView ? index * 0.05 : 0 
      }}
    />
  );
};

export default function UserGrowthChart() {
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

  // Smooth scroll transformations for grid parallax
  const gridY = useTransform(scrollYProgress, [0, 1], [-8, 8]);
  const gridYSpring = useSpring(gridY, { stiffness: 80, damping: 25 });

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
      } as any}
      className="p-6 rounded-3xl border border-border-default bg-surface shadow-sm flex flex-col h-[400px] relative overflow-hidden"
    >
      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          .recharts-cartesian-grid {
            transform: translateY(var(--grid-y, 0px));
            will-change: transform;
          }
          .recharts-tooltip-wrapper {
            transition: transform 0.15s ease-out !important;
          }
          .recharts-rectangle {
            transition: filter 0.2s ease-out;
          }
          .recharts-rectangle:hover {
            filter: brightness(1.15);
          }
        }
      `}</style>

      {/* Header Info */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-primary text-base md:text-lg">
              User & Host Growth
            </h3>
            <span className="inline-flex items-center gap-0.5 rounded-full bg-indigo-500/10 px-2 py-0.5 text-xs font-semibold text-brand-indigo dark:text-brand-teal">
              <TrendingUp className="h-3.5 w-3.5" />
              <span>+24.1% MoM</span>
            </span>
          </div>
          <p className="text-xs text-muted mt-1">
            Weekly registrations vs total online client nodes.
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 text-xs font-medium text-secondary">
          <div className="flex items-center gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-brand-indigo" />
            <span>Registrations</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-brand-purple" />
            <span>Active Nodes</span>
          </div>
        </div>
      </div>

      {/* Bar Chart Container */}
      <div className="flex-1 w-full min-h-0 text-xs">
        {isInView && (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={rawData}
              margin={{ top: 5, right: 10, left: -20, bottom: 0 }}
              barGap={4}
            >
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
              <Bar 
                dataKey="newUsers" 
                fill="var(--color-brand-indigo)" 
                maxBarSize={16}
                isAnimationActive={false}
                shape={(props: any) => <AnimatedBar {...props} isInView={isInView} />}
              />
              <Bar 
                dataKey="activeUsers" 
                fill="var(--color-brand-purple)" 
                maxBarSize={16}
                isAnimationActive={false}
                shape={(props: any) => <AnimatedBar {...props} isInView={isInView} />}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </motion.div>
  );
}
