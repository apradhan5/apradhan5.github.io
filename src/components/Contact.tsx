import React from 'react';
import { motion } from 'motion/react';
import { Bot, Loader2, Linkedin, Github, Link as LinkIcon, Mail } from 'lucide-react';
import clsx from 'clsx';

interface ContactProps {
  handleOpenAgentforce: () => void;
  isAgentforceLoading: boolean;
  isAgentforceLoaded: boolean;
}

export const Contact: React.FC<ContactProps> = ({ 
  handleOpenAgentforce, 
  isAgentforceLoading, 
  isAgentforceLoaded 
}) => {
  return (
    <section id="contact" className="relative py-24 px-6 max-w-6xl mx-auto z-10 text-theme-text">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="mb-16 text-center"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-theme-accent/10 border border-theme-accent/20 text-theme-accent text-xs font-semibold uppercase tracking-wider mb-4">
          Command Center
        </div>
        <h2 className="text-4xl font-extrabold tracking-tight md:text-5xl mb-4">
          Initiate Contact
        </h2>
        <div className="w-20 h-1 bg-theme-accent rounded-full mx-auto"></div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        
        {/* Left Side: Agentforce Terminal */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lg:col-span-3 relative overflow-hidden rounded-3xl bg-theme-card/80 border border-theme-border backdrop-blur-xl shadow-2xl p-8"
        >
          {/* Glowing accent border top */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-theme-accent to-transparent opacity-50"></div>
          
          <div className="flex items-center gap-3 mb-6">
            <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-theme-accent/10 border border-theme-accent/30 text-theme-accent">
              <Bot className="w-6 h-6 z-10" />
              {/* Pulse effect rings */}
              <div className="absolute inset-0 rounded-full border border-theme-accent animate-ping opacity-20 pointer-events-none"></div>
            </div>
            <div>
              <h3 className="text-2xl font-bold tracking-tight">Agentforce Network</h3>
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-500 uppercase tracking-widest mt-1">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                System Online
              </div>
            </div>
          </div>

          <div className="bg-theme-bg/50 border border-theme-border/50 rounded-xl p-6 mb-8 font-mono text-sm leading-relaxed text-theme-text-muted relative">
            <div className="absolute top-3 left-3 flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/80 pointer-events-none"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 pointer-events-none"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/80 pointer-events-none"></div>
            </div>
            <div className="mt-6">
              <span className="text-theme-accent font-bold">&gt; INITIALIZING SECURE COMM-LINK...</span>
              <br/><br/>
              To protect against spam and ensure prompt responses, my direct contact details are securely handled by my AI Agent. 
              <br/><br/>
              Please initiate a chat with the Agentforce Assistant to request my phone number, email, or to schedule a meeting directly into my calendar.
              <span className="animate-pulse font-bold text-theme-text">_</span>
            </div>
          </div>

          <button
            onClick={handleOpenAgentforce}
            disabled={isAgentforceLoading}
            className="w-full relative group overflow-hidden px-8 py-4 rounded-xl bg-theme-accent text-theme-button-text font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-lg hover:opacity-90 cursor-pointer"
          >
            {/* Button Shine Effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"></div>
            
            {isAgentforceLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin relative z-10" />
                <span className="relative z-10 tracking-widest uppercase text-sm">Connecting Uplink...</span>
              </>
            ) : isAgentforceLoaded ? (
              <>
                <Bot className="w-5 h-5 relative z-10 animate-bounce" />
                <span className="relative z-10 tracking-widest uppercase text-sm">Open Terminal window</span>
              </>
            ) : (
              <>
                <Bot className="w-5 h-5 relative z-10 group-hover:scale-110 transition-transform" />
                <span className="relative z-10 tracking-widest uppercase text-sm">Launch Agentforce</span>
              </>
            )}
          </button>
        </motion.div>

        {/* Right Side: Social Connections */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="lg:col-span-2 flex flex-col gap-4"
        >
          <div className="p-6 rounded-3xl bg-theme-card/50 border border-theme-border text-sm text-theme-text-muted mb-2">
            Alternatively, you can find me across the web on these platforms. I'm highly active on Trailhead and LinkedIn.
          </div>

          {[
            { 
              name: "LinkedIn", 
              desc: "Professional Network", 
              icon: <Linkedin className="w-6 h-6" />, 
              href: "https://www.linkedin.com/in/adityapradhan2103/",
              color: "hover:border-blue-500/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.2)] hover:text-blue-500"
            },
            { 
              name: "Trailhead", 
              desc: "Salesforce Profile", 
              icon: <LinkIcon className="w-6 h-6" />, 
              href: "https://www.salesforce.com/trailblazer/apradhan",
              color: "hover:border-sky-500/50 hover:shadow-[0_0_15px_rgba(14,165,233,0.2)] hover:text-sky-500"
            },
            { 
              name: "GitHub", 
              desc: "Code Repositories", 
              icon: <Github className="w-6 h-6" />, 
              href: "https://github.com/AdityaPradhan1",
              color: "hover:border-purple-500/50 hover:shadow-[0_0_15px_rgba(168,85,247,0.2)] hover:text-purple-500"
            }
          ].map((social, i) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={clsx(
                "group flex items-center justify-between p-5 rounded-2xl bg-theme-card border border-theme-border backdrop-blur-sm transition-all duration-300",
                social.color
              )}
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-theme-bg border border-theme-border group-hover:scale-110 transition-transform duration-300">
                  {social.icon}
                </div>
                <div>
                  <h4 className="font-bold text-theme-text group-hover:text-inherit transition-colors">{social.name}</h4>
                  <p className="text-xs text-theme-text-muted">{social.desc}</p>
                </div>
              </div>
              <LinkIcon className="w-4 h-4 text-theme-text-muted group-hover:text-inherit -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300" />
            </a>
          ))}
        </motion.div>

      </div>
    </section>
  );
};
