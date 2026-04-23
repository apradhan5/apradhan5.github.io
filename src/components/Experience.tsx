import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { ChevronDown, ChevronUp, MapPin, Calendar, Terminal } from 'lucide-react';
import resumeData from '../data/resume.json';
import clsx from 'clsx';

export const Experience: React.FC = () => {
  const { experience } = resumeData;
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section id="experience" className="relative py-24 px-6 max-w-5xl mx-auto z-10 text-theme-text">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="mb-16 text-center"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-theme-accent/10 border border-theme-accent/20 text-theme-accent text-xs font-semibold uppercase tracking-wider mb-4">
          Professional Timeline
        </div>
        <h2 className="text-4xl font-extrabold tracking-tight md:text-5xl mb-4">
          Experience
        </h2>
        <div className="w-20 h-1 bg-theme-accent rounded-full mx-auto"></div>
      </motion.div>

      <div ref={containerRef} className="relative ml-4 md:ml-8 pb-12">
        {/* The background track for the timeline */}
        <div className="absolute left-0 top-0 bottom-0 w-px bg-theme-border" />
        
        {/* The animated glowing line that draws itself */}
        <motion.div 
          className="absolute left-[0px] top-0 w-[2px] bg-theme-accent origin-top shadow-[0_0_10px_var(--theme-accent)]"
          style={{ height: lineHeight, transform: 'translateX(-50%)' }}
        />

        {experience.map((exp, index) => {
          const isExpanded = expandedIndex === index;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-12 relative pl-8 md:pl-12 group"
            >
              {/* Timeline dot that pops in */}
              <motion.div 
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.2 }}
                className="absolute -left-[6px] top-6 w-3 h-3 rounded-full bg-theme-accent shadow-[0_0_10px_var(--theme-accent)] z-10" 
              />

              <div
                className={clsx(
                  "p-6 rounded-2xl border transition-all duration-300 cursor-pointer backdrop-blur-md",
                  isExpanded ? "bg-theme-card border-theme-border shadow-2xl" : "bg-theme-card/50 border-theme-border/50 hover:bg-theme-card-hover hover:border-theme-border"
                )}
                onClick={() => toggleExpand(index)}
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-theme-text mb-1 tracking-tight">{exp.role}</h3>
                    <h4 className="text-lg text-theme-accent font-medium font-mono text-sm">{exp.company}</h4>
                  </div>
                  <div className="flex flex-col gap-2 text-sm text-theme-text-muted font-mono">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{exp.dates}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{exp.location}</span>
                    </div>
                  </div>
                </div>

                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 mt-4 border-t border-theme-border">
                        <ul className="space-y-3">
                          {exp.bullets.map((bullet, i) => (
                            <li key={i} className="flex items-start gap-3 text-theme-text-muted leading-relaxed text-sm md:text-base">
                              <Terminal className="w-4 h-4 text-theme-accent mt-1 flex-shrink-0" />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex justify-center mt-4">
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-theme-text-muted" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-theme-text-muted" />
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
