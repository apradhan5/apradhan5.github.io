import React from 'react';
import { motion } from 'motion/react';
import { AchievementCanvas, Productivity3D, Resolution3D, Award3D, Star3D } from './3d/AchievementIcons';

const metrics = [
  {
    label: "Productivity Increase",
    value: "70%+",
    context: "via REST API & CI/CD automation",
    icon3D: <Productivity3D />
  },
  {
    label: "Resolution Time",
    value: "50%↓",
    context: "via custom exception framework",
    icon3D: <Resolution3D />
  },
  {
    label: "Outstanding Student",
    value: "Award",
    context: "Illinois Institute of Technology",
    icon3D: <Award3D />
  },
  {
    label: "Star Performer",
    value: "Award",
    context: "For leading cross-functional teams",
    icon3D: <Star3D />
  }
];

export const ImpactHighlights: React.FC = () => {
  return (
    <section className="relative py-12 px-6 max-w-7xl mx-auto z-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-theme-border/50">
        {metrics.map((metric, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex flex-col items-center text-center pt-6 md:pt-0 px-4 first:pt-0"
          >
            <AchievementCanvas>
              {metric.icon3D}
            </AchievementCanvas>
            <div className="text-3xl font-bold text-theme-text mb-1 tracking-tight">{metric.value}</div>
            <div className="text-sm font-semibold text-theme-text uppercase tracking-wider mb-2">{metric.label}</div>
            <div className="text-xs text-theme-text-muted">{metric.context}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
