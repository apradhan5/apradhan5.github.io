import React from 'react';
import { motion } from 'motion/react';
import { Code, Database, Wrench, Globe, Star, Settings, Terminal } from 'lucide-react';
import resumeData from '../data/resume.json';
import clsx from 'clsx';

const iconMap = {
  'Programming Language': <Code className="w-5 h-5 text-blue-500 dark:text-blue-400" />,
  'Salesforce Development': <Star className="w-5 h-5 text-sky-500 dark:text-sky-400" />,
  'DevOps, Backend, Web Services': <Database className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />,
  'Salesforce Admin': <Settings className="w-5 h-5 text-purple-500 dark:text-purple-400" />,
  'Tools': <Wrench className="w-5 h-5 text-orange-500 dark:text-orange-400" />,
  'Top Skills': <Star className="w-5 h-5 text-pink-500 dark:text-pink-400" />,
  'Languages': <Globe className="w-5 h-5 text-teal-500 dark:text-teal-400" />,
};

export const Skills: React.FC = () => {
  const { skills } = resumeData;

  return (
    <section id="skills" className="relative py-24 px-6 max-w-7xl mx-auto z-10 text-theme-text">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="mb-16 text-center"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-theme-accent/10 border border-theme-accent/20 text-theme-accent text-xs font-semibold uppercase tracking-wider mb-4">
          Technical Arsenal
        </div>
        <h2 className="text-4xl font-extrabold tracking-tight md:text-5xl mb-4">
          Skills & Technologies
        </h2>
        <div className="w-20 h-1 bg-theme-accent rounded-full mx-auto"></div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map((skillGroup, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="p-6 rounded-2xl bg-theme-card border border-theme-border backdrop-blur-sm group hover:border-theme-accent/50 transition-colors"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-theme-bg border border-theme-border shadow-sm">
                {iconMap[skillGroup.group as keyof typeof iconMap] || <Terminal className="w-5 h-5 text-gray-500 dark:text-gray-400" />}
              </div>
              <h3 className="text-lg font-bold text-theme-text tracking-tight">{skillGroup.group}</h3>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {skillGroup.items.map((item, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 text-xs font-mono font-medium text-theme-text bg-theme-bg border border-theme-border rounded-lg hover:border-theme-accent/50 hover:text-theme-accent transition-colors cursor-default"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
