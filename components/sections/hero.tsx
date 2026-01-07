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
    <section className="relative flex flex-col justify-center min-h-[100dvh] px-6 pt-32 pb-40 md:px-12 overflow-hidden">
      {/* Globe Background - Behind everything */}
      <div className="absolute inset-0 flex items-center justify-center" style={{ zIndex: 1 }}>
        <div className="w-full max-w-[600px] ">
          <Globe />
        </div>
      </div>

      {/* Content Layer - In front */}
      <div className="max-w-[90rem] mx-auto w-full relative" style={{ zIndex: 1 }}>
        <motion.div
          initial="hidden"
          animate="visible"
          className="flex flex-col font-heading font-bold tracking-tighter leading-[0.85]"
        >
          <div className="overflow-hidden">
            <motion.h1
              custom={0}
              variants={textReveal}
              className="text-[10vw] md:text-[10vw] uppercase"
            >
              Entrepreneur
            </motion.h1>
          </div>
          <div className="overflow-hidden flex items-baseline gap-4 md:gap-8">
             <motion.h1
              custom={1}
              variants={textReveal}
              className="text-[10vw] md:text-[10vw] uppercase text-neutral-500"
            >
              &
            </motion.h1>
             <motion.h1
              custom={2}
              variants={textReveal}
              className="text-[10vw] md:text-[10vw] uppercase"
            >
              Software
            </motion.h1>
          </div>
          <div className="overflow-hidden">
             <motion.h1
              custom={3}
              variants={textReveal}
              className="text-[10vw] md:text-[10vw] uppercase ml-[10vw] text-neutral-500"
            >
              Engineer
            </motion.h1>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-12 md:mt-24 max-w-xl ml-auto"
        >
         
          <div className="flex mt-[200px] md:mt-[150px] justify-end  items-center gap-2 text-neutral-500">
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
      </div>
    </section>
  );
}
