import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Award, MapPin, Calendar, BookOpen, Star } from 'lucide-react';
import resumeData from '../data/resume.json';

export const Education: React.FC = () => {
  const { education, certifications, awards, extra } = resumeData;

  return (
    <section id="education" className="relative py-24 px-6 max-w-7xl mx-auto z-10 text-theme-text">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="mb-16 text-center"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-theme-accent/10 border border-theme-accent/20 text-theme-accent text-xs font-semibold uppercase tracking-wider mb-4">
          Credentials & Training
        </div>
        <h2 className="text-4xl font-extrabold tracking-tight md:text-5xl mb-4">
          Education & Certifications
        </h2>
        <div className="w-20 h-1 bg-theme-accent rounded-full mx-auto"></div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Education Column */}
        <div>
          <h3 className="text-xl font-bold mb-8 flex items-center gap-3 text-theme-text uppercase tracking-wider text-sm">
            <GraduationCap className="w-5 h-5 text-theme-accent" />
            Academic Background
          </h3>
          <div className="space-y-6">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-theme-card border border-theme-border backdrop-blur-sm group hover:border-theme-accent/50 transition-colors"
              >
                <h4 className="text-lg font-bold text-theme-text mb-1 tracking-tight">{edu.degree}</h4>
                <p className="text-theme-accent mb-4 font-mono text-sm">{edu.institution}</p>
                <div className="flex flex-col sm:flex-row gap-4 text-sm text-theme-text-muted font-mono">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{edu.dates}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{edu.location}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Certifications & Awards Column */}
        <div className="space-y-12">
          <div>
            <h3 className="text-xl font-bold mb-8 flex items-center gap-3 text-theme-text uppercase tracking-wider text-sm">
              <Award className="w-5 h-5 text-theme-accent" />
              Salesforce Certifications
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="p-4 rounded-xl bg-theme-card border border-theme-border backdrop-blur-sm hover:border-theme-accent/50 transition-colors flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 flex-shrink-0 bg-theme-bg rounded-lg p-2 border border-theme-border">
                    <img 
                      src={cert.logo} 
                      alt={cert.name} 
                      className="w-full h-full object-contain"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                        (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                    <div className="hidden w-full h-full flex items-center justify-center">
                      <Award className="w-6 h-6 text-theme-accent" />
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-theme-text group-hover:text-theme-accent transition-colors leading-tight">{cert.name}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-8 flex items-center gap-3 text-theme-text uppercase tracking-wider text-sm">
              <Star className="w-5 h-5 text-theme-accent" />
              Honors & Awards
            </h3>
            <div className="space-y-3">
              {awards.map((award, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="p-4 rounded-xl bg-theme-card border border-theme-border backdrop-blur-sm flex items-center gap-3 hover:border-theme-accent/50 transition-colors"
                >
                  <Award className="w-4 h-4 text-theme-accent flex-shrink-0" />
                  <span className="text-sm font-medium text-theme-text">{award}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {extra && extra.length > 0 && (
            <div>
              <h3 className="text-xl font-bold mb-8 flex items-center gap-3 text-theme-text uppercase tracking-wider text-sm">
                <BookOpen className="w-5 h-5 text-theme-accent" />
                Additional
              </h3>
              <div className="space-y-4">
                {extra.map((item, index) => (
                  <div key={index} className="p-6 rounded-xl bg-theme-card border border-theme-border backdrop-blur-sm">
                    <h4 className="text-sm font-bold text-theme-text mb-3 uppercase tracking-wider">{item.title}</h4>
                    <ul className="space-y-2">
                      {item.items.map((subItem, i) => (
                        <li key={i} className="text-sm text-theme-text-muted flex items-start gap-2">
                          <span className="text-theme-accent mt-1">•</span>
                          {subItem}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
