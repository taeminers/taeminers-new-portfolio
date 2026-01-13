"use client";

import { motion, Variants } from "motion/react";
import { Globe } from "@/components/ui/globe";

const textReveal: Variants = {
  hidden: { y: 100, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: i * 0.1,
      duration: 1,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export function Hero() {
  return (
    <section className="relative flex flex-col justify-center min-h-[100dvh] px-6 md:px-12 overflow-hidden">
      {/* Globe Background - Behind everything */}
      <div className="absolute inset-0 flex items-center justify-center" style={{ zIndex: 1 }}>
        <div className="w-full max-w-[600px] ">
          <Globe />
        </div>
      </div>

      {/* Left Decorative Line with Dots and Social Icons */}
      <div className="absolute left-6 md:left-12 top-0 bottom-0 flex flex-col items-center justify-center py-12" style={{ zIndex: 2 }}>
        {/* Top dot */}
        <div className="w-2 h-2 rounded-full bg-black" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }} />
        
        {/* Vertical line */}
        <div className="h-[120px] w-px bg-black" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }} />
        
        {/* Social Icons */}
        <div className="flex flex-col gap-6 my-8">
          <motion.a
            href="https://linkedin.com/in/taeminers"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            whileHover={{ scale: 1.2 }}
            className="text-black hover:opacity-70 transition-opacity"
            style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          </motion.a>
          
          <motion.a
            href="https://github.com/taeminers"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.4, duration: 0.5 }}
            whileHover={{ scale: 1.2 }}
            className="text-black hover:opacity-70 transition-opacity"
            style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </motion.a>
          
          <motion.a
            href="mailto:taeminers@gmail.com"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.6, duration: 0.5 }}
            whileHover={{ scale: 1.2 }}
            className="text-black hover:opacity-70 transition-opacity"
            style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
          </motion.a>
        </div>
        
        {/* Vertical line */}
        <div className="h-[120px] w-px bg-black" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }} />
        
        {/* Bottom dot */}
        <div className="w-2 h-2 rounded-full bg-black" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }} />
      </div>

      {/* Content Layer - In front */}
      <div className="max-w-[90rem] mx-auto w-full relative flex items-center justify-center min-h-[100dvh]" style={{ zIndex: 1 }}>
        <motion.div
          initial="hidden"
          animate="visible"
          className="flex flex-col font-heading font-bold tracking-tighter leading-[0.85] text-center"
        >
          <div className="overflow-hidden">
            <motion.h1
              custom={0}
              variants={textReveal}
              className="text-[7vw] md:text-[7vw] uppercase mix-blend-difference"
            >
              AI Creator
            </motion.h1>
          </div>
          <div className="overflow-hidden flex items-baseline gap-4 md:gap-8 justify-center">
             <motion.h1
              custom={1}
              variants={textReveal}
              className="text-[7vw] md:text-[7vw] uppercase text-neutral-500"
            >
              &
            </motion.h1>
             <motion.h1
              custom={2}
              variants={textReveal}
              className="text-[7vw] md:text-[7vw] uppercase"
            >
              Software
            </motion.h1>
          </div>
          <div className="overflow-hidden">
             <motion.h1
              custom={3}
              variants={textReveal}
              className="text-[7vw] md:text-[7vw] uppercase text-neutral-500"
            >
              Engineer
            </motion.h1>
          </div>

          {/* Scroll indicator - below title */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-8 flex justify-center"
          >
            <div className="flex items-center gap-2 text-neutral-500">
              <span className="text-xs text-black font-bold uppercase tracking-widest">Scroll for more</span>
              <svg 
                width="14" 
                height="14" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="black" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="animate-bounce"
              >
                <path d="M12 5v14M19 12l-7 7-7-7"/>
              </svg>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
