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

  const handleOpenAgentforce = () => {
    // If the chat is already loaded, try to launch it directly
    if (window.embeddedservice_bootstrap && window.embeddedservice_bootstrap.utilAPI) {
      try {
        window.embeddedservice_bootstrap.utilAPI.launchChat();
      } catch (e) {
        console.error("Error launching chat:", e);
      }
      return;
    }

    // If the script is already injected but not fully initialized, do nothing
    if (document.getElementById('sf-embedded-script')) {
      return;
    }

    setIsAgentforceLoading(true);

    // Define the initialization function globally so the script can call it
    window.initEmbeddedMessaging = () => {
      try {
        window.embeddedservice_bootstrap.settings.language = 'en_US';

        window.embeddedservice_bootstrap.init(
          '00Daj00000mC8UP',
          'Recruiter_Channel',
          'https://infobeans-11a-dev-ed.develop.my.site.com/ESWRecruiterChannel1773201585456',
          {
            scrt2URL: 'https://infobeans-11a-dev-ed.develop.my.salesforce-scrt.com'
          }
        );

        // Attempt to open the chat window automatically after initialization
        setTimeout(() => {
          if (window.embeddedservice_bootstrap && window.embeddedservice_bootstrap.utilAPI) {
            window.embeddedservice_bootstrap.utilAPI.launchChat();
          }
          setIsAgentforceLoading(false);
          setIsAgentforceLoaded(true); // Hide our custom floating button
        }, 1500);
      } catch (err) {
        console.error('Error loading Embedded Messaging: ', err);
        setIsAgentforceLoading(false);
      }
    };

    // Dynamically inject the Salesforce script
    const script = document.createElement('script');
    script.id = 'sf-embedded-script';
    script.type = 'text/javascript';
    script.src = 'https://infobeans-11a-dev-ed.develop.my.site.com/ESWRecruiterChannel1773201585456/assets/js/bootstrap.min.js';
    script.onload = () => {
      if (window.initEmbeddedMessaging) {
        window.initEmbeddedMessaging();
      }
    };
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
                
                {/* Agentforce Assistant Section */}
                <div id="agentforce-assistant-placeholder" className="py-24 px-6 text-center max-w-3xl mx-auto">
                  <div className="inline-flex items-center justify-center p-4 rounded-full bg-theme-card border border-theme-border mb-6">
                    <BotMessageSquare className="w-8 h-8 text-theme-accent" />
                  </div>
                  <h2 className="text-3xl font-bold text-theme-text mb-4">Agentforce Assistant</h2>
                  <p className="text-theme-text-muted mb-8">
                    Have questions about my experience or want to discuss a project? Chat with my AI assistant directly from my Salesforce org.
                  </p>
                  <button
                    onClick={handleOpenAgentforce}
                    disabled={isAgentforceLoading}
                    className="px-8 py-4 rounded-full bg-theme-accent text-theme-button-text font-bold hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center gap-2 mx-auto"
                  >
                    {isAgentforceLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Connecting...
                      </>
                    ) : isAgentforceLoaded ? (
                      <>
                        <BotMessageSquare className="w-5 h-5" />
                        Open Chat
                      </>
                    ) : (
                      <>
                        <BotMessageSquare className="w-5 h-5" />
                        Start Chat
                      </>
                    )}
                  </button>
                </div>
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
