import React from 'react';
import { motion } from 'motion/react';
import { TrendingUp, Clock, Zap, Users, Activity, CheckCircle2, BarChart3, Target } from 'lucide-react';
import resumeData from '../data/resume.json';

const iconMap = {
  'Improved Productivity': <TrendingUp className="w-6 h-6 text-emerald-500 dark:text-emerald-400" />,
  'Decreased Issue Resolution Time': <Clock className="w-6 h-6 text-blue-500 dark:text-blue-400" />,
  'Increased Support Engineer\'s Productivity': <Zap className="w-6 h-6 text-amber-500 dark:text-amber-400" />,
  'Decreased Pitching Time': <Clock className="w-6 h-6 text-purple-500 dark:text-purple-400" />,
  'Increased Operational Efficiency': <Activity className="w-6 h-6 text-teal-500 dark:text-teal-400" />,
  'Cut Quotation Turnaround Time': <BarChart3 className="w-6 h-6 text-sky-500 dark:text-sky-400" />,
  'Saved Manual Process Time': <Target className="w-6 h-6 text-pink-500 dark:text-pink-400" />,
  'Improved Hiring Efficiency': <Users className="w-6 h-6 text-orange-500 dark:text-orange-400" />,
};

export const Achievements: React.FC = () => {
  const { achievements } = resumeData;

  return (
    <section id="impact" className="relative py-24 px-6 max-w-7xl mx-auto z-10 text-theme-text">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="mb-16 text-center"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-theme-accent/10 border border-theme-accent/20 text-theme-accent text-xs font-semibold uppercase tracking-wider mb-4">
          Delivery Metrics
        </div>
        <h2 className="text-4xl font-extrabold tracking-tight md:text-5xl mb-4">
          Solution Impact
        </h2>
        <div className="w-20 h-1 bg-theme-accent rounded-full mx-auto"></div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {achievements.map((achievement, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative p-6 rounded-2xl bg-theme-card border border-theme-border backdrop-blur-sm group hover:border-theme-accent/50 transition-colors"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-2.5 rounded-xl bg-theme-bg border border-theme-border shadow-sm">
                {iconMap[achievement.title as keyof typeof iconMap] || <CheckCircle2 className="w-6 h-6 text-theme-accent" />}
              </div>
              <span className="text-xs font-mono text-theme-text-muted bg-theme-bg px-2 py-1 rounded-md border border-theme-border">
                KPI-0{index + 1}
              </span>
            </div>
            
            <h3 className="text-lg font-bold mb-3 text-theme-text leading-tight group-hover:text-theme-accent transition-colors">
              {achievement.title}
            </h3>
            
            <p className="text-sm text-theme-text-muted leading-relaxed">
              {achievement.context}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
