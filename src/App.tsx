/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AnimatedBackground } from './components/AnimatedBackground';
import { SplashScreen } from './components/SplashScreen';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ImpactHighlights } from './components/ImpactHighlights';
import { Experience } from './components/Experience';
import { Achievements } from './components/Achievements';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Education } from './components/Education';
import { Contact } from './components/Contact';
import { AnimatePresence } from 'motion/react';
import { ThemeProvider } from './context/ThemeContext';
import { BotMessageSquare, Loader2 } from 'lucide-react';

declare global {
  interface Window {
    embeddedservice_bootstrap?: any;
    initEmbeddedMessaging?: () => void;
  }
}

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [isAgentforceLoading, setIsAgentforceLoading] = useState(false);
  const [isAgentforceLoaded, setIsAgentforceLoaded] = useState(false);

  useEffect(() => {
    const handleChatMinimized = () => setIsAgentforceLoaded(false);
    const handleChatMaximized = () => setIsAgentforceLoaded(true);

    window.addEventListener("onEmbeddedMessagingWindowMinimized", handleChatMinimized);
    window.addEventListener("onEmbeddedMessagingWindowHidden", handleChatMinimized);
    window.addEventListener("onEmbeddedMessagingWindowMaximized", handleChatMaximized);
    window.addEventListener("onEmbeddedMessagingReady", handleChatMaximized);

    return () => {
      window.removeEventListener("onEmbeddedMessagingWindowMinimized", handleChatMinimized);
      window.removeEventListener("onEmbeddedMessagingWindowHidden", handleChatMinimized);
      window.removeEventListener("onEmbeddedMessagingWindowMaximized", handleChatMaximized);
      window.removeEventListener("onEmbeddedMessagingReady", handleChatMaximized);
    };
  }, []);

const handleOpenAgentforce = () => {
  setIsAgentforceLoading(true);

  const launchWhenReady = () => {
    try {
      if (window.embeddedservice_bootstrap?.utilAPI) {
        window.embeddedservice_bootstrap.utilAPI.launchChat();
        setIsAgentforceLoading(false);
        setIsAgentforceLoaded(true);
      }
    } catch (e) {
      console.error("Error launching chat:", e);
      setIsAgentforceLoading(false);
    }
  };

  window.addEventListener(
    "onEmbeddedMessagingButtonCreated",
    launchWhenReady,
    { once: true }
  );

  if (window.embeddedservice_bootstrap?.utilAPI) {
    launchWhenReady();
    return;
  }

  if (document.getElementById("sf-embedded-script")) {
    return;
  }

  window.initEmbeddedMessaging = () => {
    try {
      window.embeddedservice_bootstrap.settings.language = "en_US";

      window.embeddedservice_bootstrap.init(
        "00Daj00000mC8UP",
        "Recruiter_Channel",
        "https://infobeans-11a-dev-ed.develop.my.site.com/ESWRecruiterChannel1773201585456",
        {
          scrt2URL:
            "https://infobeans-11a-dev-ed.develop.my.salesforce-scrt.com",
        }
      );
    } catch (err) {
      console.error("Error loading Embedded Messaging: ", err);
      setIsAgentforceLoading(false);
    }
  };

  const script = document.createElement("script");
  script.id = "sf-embedded-script";
  script.type = "text/javascript";
  script.src =
    "https://infobeans-11a-dev-ed.develop.my.site.com/ESWRecruiterChannel1773201585456/assets/js/bootstrap.min.js";
  script.onload = () => window.initEmbeddedMessaging?.();
  document.body.appendChild(script);
};

  return (
    <ThemeProvider>
      <div className="relative min-h-screen text-theme-text selection:bg-theme-accent/30 selection:text-theme-text font-sans overflow-x-hidden">
        <AnimatePresence mode="wait">
          {showSplash ? (
            <SplashScreen key="splash" onComplete={() => setShowSplash(false)} />
          ) : (
            <div key="content" className="relative z-10">
              <AnimatedBackground />
              <Navbar />
              <main>
                <Hero />
                <ImpactHighlights />
                <Experience />
                <Achievements />
                <Projects />
                <Skills />
                <Education />
                
                <Contact 
                  handleOpenAgentforce={handleOpenAgentforce} 
                  isAgentforceLoading={isAgentforceLoading} 
                  isAgentforceLoaded={isAgentforceLoaded} 
                />
              </main>
              <footer className="py-8 text-center text-sm text-theme-text-muted border-t border-theme-border mt-12">
                <p>© {new Date().getFullYear()} Aditya Pradhan. All rights reserved.</p>
              </footer>

              {/* Floating Agentforce Launcher */}
              {!isAgentforceLoaded && (
                <button 
                  onClick={handleOpenAgentforce}
                  className="fixed bottom-6 right-6 z-40 p-4 rounded-full bg-theme-text text-theme-button-text shadow-2xl hover:scale-105 transition-transform flex items-center justify-center group"
                  aria-label="Open Agentforce Assistant"
                >
                  {isAgentforceLoading ? (
                    <Loader2 className="w-6 h-6 animate-spin" />
                  ) : (
                    <BotMessageSquare className="w-6 h-6" />
                  )}
                  <span className="absolute right-full mr-4 bg-theme-card text-theme-text text-xs px-3 py-1.5 rounded-lg border border-theme-border opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    Ask Agentforce
                  </span>
                </button>
              )}
            </div>
          )}
        </AnimatePresence>
      </div>
    </ThemeProvider>
  );
}
