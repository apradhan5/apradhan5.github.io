import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export const SplashScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 400);
          return 100;
        }
        return prev + 5;
      });
    }, 40);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-theme-bg text-theme-text"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="relative flex items-center justify-center w-24 h-24 mb-8"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="absolute inset-0 border border-theme-border rounded-full animate-spin-slow" />
        <div className="absolute inset-2 border border-theme-border/50 rounded-full animate-reverse-spin" />
        <span className="text-3xl font-light tracking-widest font-serif italic">AP</span>
      </motion.div>

      <div className="w-48 h-[2px] bg-theme-border rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-theme-accent"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>
      <div className="mt-4 text-xs tracking-widest text-theme-text-muted uppercase font-mono">
        Initializing {progress}%
      </div>
    </motion.div>
  );
};
