import React from 'react';
import { motion } from 'motion/react';
import { Server, Database, GitBranch, ArrowRight, Layers, Workflow } from 'lucide-react';
import resumeData from '../data/resume.json';

export const Projects: React.FC = () => {
  const { projects } = resumeData;

  return (
    <section id="projects" className="relative py-24 px-6 max-w-7xl mx-auto z-10 text-theme-text">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="mb-16 text-center"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-theme-accent/10 border border-theme-accent/20 text-theme-accent text-xs font-semibold uppercase tracking-wider mb-4">
          Solution Architecture
        </div>
        <h2 className="text-4xl font-extrabold tracking-tight md:text-5xl mb-4">
          Project Case Studies
        </h2>
        <div className="w-20 h-1 bg-theme-accent rounded-full mx-auto"></div>
      </motion.div>

      <div className="space-y-12">
        {projects.map((project, index) => {
          const stackItems = project.stack.split('|').map(s => s.trim());
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="relative rounded-3xl bg-theme-card border border-theme-border backdrop-blur-sm overflow-hidden"
            >
              {/* Top Bar / Metadata */}
              <div className="border-b border-theme-border bg-theme-bg/50 px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-theme-accent/10 rounded-lg border border-theme-accent/20">
                    <Layers className="w-5 h-5 text-theme-accent" />
                  </div>
                  <h3 className="text-xl font-bold text-theme-text tracking-tight">{project.title}</h3>
                </div>
                <div className="flex items-center gap-3 text-sm font-mono text-theme-text-muted">
                  <span className="flex items-center gap-1.5">
                    <Workflow className="w-4 h-4" />
                    {project.dates}
                  </span>
                </div>
              </div>

              <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Implementation Details */}
                <div className="lg:col-span-2 space-y-6">
                  <div>
                    <h4 className="text-sm font-semibold text-theme-text uppercase tracking-wider mb-4 flex items-center gap-2">
                      <Server className="w-4 h-4 text-theme-accent" />
                      Implementation Overview
                    </h4>
                    <ul className="space-y-4">
                      {project.bullets.map((bullet, i) => (
                        <li key={i} className="flex items-start gap-3 text-theme-text-muted text-sm leading-relaxed">
                          <ArrowRight className="w-4 h-4 text-theme-accent mt-1 flex-shrink-0" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Right Column: Stack & Architecture */}
                <div className="space-y-6 lg:border-l border-theme-border lg:pl-8">
                  <div>
                    <h4 className="text-sm font-semibold text-theme-text uppercase tracking-wider mb-4 flex items-center gap-2">
                      <Database className="w-4 h-4 text-theme-accent" />
                      Technology Stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {stackItems.map((tech, i) => (
                        <span 
                          key={i} 
                          className="px-3 py-1.5 text-xs font-mono font-medium text-theme-text bg-theme-bg border border-theme-border rounded-lg"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-xl bg-theme-bg border border-theme-border">
                    <h4 className="text-xs font-semibold text-theme-text-muted uppercase tracking-wider mb-2 flex items-center gap-2">
                      <GitBranch className="w-3 h-3" />
                      System Role
                    </h4>
                    <p className="text-sm text-theme-text">
                      End-to-end solution design, development, and deployment within an enterprise Salesforce environment.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
