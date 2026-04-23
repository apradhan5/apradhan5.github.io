import React from 'react';
import { motion } from 'motion/react';
import { ArrowDown, Download, ExternalLink, Terminal } from 'lucide-react';
import resumeData from '../data/resume.json';

export const Hero: React.FC = () => {
  const { basics } = resumeData;

  const handleDownload = () => {
    // Generate a simple PDF or trigger a download
    // For now, we'll just alert or open a new window
    alert('Resume download triggered!');
  };

  return (
    <section id="hero" className="relative flex flex-col items-center justify-center min-h-screen px-6 pt-20 overflow-hidden text-center text-theme-text">
      {/* Subtle grid background for command center feel */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--theme-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--theme-border)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="z-10 max-w-4xl mx-auto relative"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 text-xs font-mono font-semibold tracking-wider text-theme-accent uppercase border rounded-full border-theme-accent/30 bg-theme-accent/10 backdrop-blur-md"
        >
          <Terminal className="w-3.5 h-3.5" />
          {basics.title}
        </motion.div>

        <motion.h1
          className="mb-6 text-5xl font-extrabold tracking-tight md:text-7xl lg:text-8xl bg-clip-text text-transparent bg-gradient-to-r from-theme-text to-theme-accent"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {basics.name}
        </motion.h1>

        <motion.p
          className="max-w-2xl mx-auto mb-10 text-lg leading-relaxed text-theme-text-muted md:text-xl font-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          {basics.summary.split('.')[0]}. {basics.summary.split('.')[1]}.
        </motion.p>

        <motion.div
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <a
            href="#experience"
            className="flex items-center justify-center w-full px-8 py-4 text-sm font-medium text-theme-button-text transition-all duration-300 bg-theme-text rounded-full sm:w-auto hover:bg-theme-text-muted hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
          >
            Explore Solutions
            <ArrowDown className="w-4 h-4 ml-2" />
          </a>
          <button
            onClick={handleDownload}
            className="flex items-center justify-center w-full px-8 py-4 text-sm font-medium text-theme-text transition-all duration-300 border rounded-full sm:w-auto border-theme-border bg-theme-card backdrop-blur-md hover:bg-theme-card-hover hover:scale-105 active:scale-95"
          >
            Download Resume
            <Download className="w-4 h-4 ml-2" />
          </button>
        </motion.div>

        <motion.div
          className="flex items-center justify-center gap-6 mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
        >
          {basics.links.map((link, i) => (
            <a
              key={i}
              href={link.url.startsWith('http') ? link.url : `https://${link.url}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-theme-text-muted transition-colors hover:text-theme-text flex items-center gap-2 text-sm font-mono"
            >
              {link.name}
              <ExternalLink className="w-3 h-3" />
            </a>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-theme-text-muted"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <span className="text-xs uppercase tracking-widest font-mono">System Ready</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="w-[1px] h-12 bg-gradient-to-b from-theme-text-muted to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
};
