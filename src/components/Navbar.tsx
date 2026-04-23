import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Sun, Moon, Bot } from 'lucide-react';
import clsx from 'clsx';
import { useTheme } from '../context/ThemeContext';

const navItems = [
  { name: 'Home', href: '#hero' },
  { name: 'Experience', href: '#experience' },
  { name: 'Impact', href: '#impact' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Education', href: '#education' },
  { name: 'Contact', href: '#contact' },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Scroll spy
      const sections = navItems.map(item => item.href.substring(1));
      let current = '';
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && window.scrollY >= element.offsetTop - 200) {
          current = section;
        }
      }
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={clsx(
          'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
          isScrolled ? 'py-4 bg-theme-nav backdrop-blur-lg border-b border-theme-border' : 'py-6 bg-transparent'
        )}
      >
        <div className="flex items-center justify-between max-w-7xl px-6 mx-auto">
          <a
            href="#hero"
            onClick={(e) => { e.preventDefault(); scrollTo('#hero'); }}
            className="text-2xl font-bold tracking-tighter text-theme-text"
          >
            A<span className="text-theme-accent">P</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => { e.preventDefault(); scrollTo(item.href); }}
                className={clsx(
                  'text-sm font-medium transition-colors hover:text-theme-accent',
                  activeSection === item.href.substring(1) ? 'text-theme-accent' : 'text-theme-text-muted'
                )}
              >
                {item.name}
              </a>
            ))}
            
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-theme-card hover:bg-theme-card-hover border border-theme-border transition-colors text-theme-text"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); scrollTo('#contact'); }}
              className="px-4 py-2 text-sm font-medium text-theme-button-text bg-theme-text rounded-full hover:bg-theme-text-muted transition-colors flex items-center gap-2 shadow-[0_0_15px_rgba(255,255,255,0.1)]"
            >
              <Bot className="w-4 h-4" />
              Ask Agentforce
            </a>
          </div>

          {/* Mobile Menu Toggle & Theme Toggle */}
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-theme-card hover:bg-theme-card-hover border border-theme-border transition-colors text-theme-text"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              className="p-2 text-theme-text"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-30 pt-24 pb-6 px-6 bg-theme-bg backdrop-blur-xl md:hidden flex flex-col items-center justify-center gap-8"
          >
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => { e.preventDefault(); scrollTo(item.href); }}
                className={clsx(
                  'text-2xl font-bold transition-colors',
                  activeSection === item.href.substring(1) ? 'text-theme-accent' : 'text-theme-text'
                )}
              >
                {item.name}
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); scrollTo('#contact'); }}
              className="px-6 py-3 text-lg font-medium text-theme-button-text bg-theme-text rounded-full hover:bg-theme-text-muted transition-colors flex items-center gap-2 mt-4"
            >
              <Bot className="w-5 h-5" />
              Ask Agentforce
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
