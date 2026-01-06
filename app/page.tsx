"use client";

import { motion, Variants } from "motion/react";
import { Header } from "@/components/layout/header/header";
import { Dock } from "@/components/layout/dock";

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

export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-background text-foreground selection:bg-primary/20 selection:text-primary">
      <Header />
      
      {/* Glow Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-primary/5 blur-[120px] rounded-full" />
      </div>

      <section className="relative flex flex-col justify-center min-h-[100dvh] px-6 pt-32 pb-40 md:px-12">
        <div className="max-w-[90rem] mx-auto w-full">
          <motion.div
            initial="hidden"
            animate="visible"
            className="flex flex-col font-heading font-bold tracking-tighter leading-[0.85]"
          >
            {/* Massive Heading */}
            <div className="overflow-hidden">
              <motion.h1
                custom={0}
                variants={textReveal}
                className="text-[14vw] md:text-[12vw] uppercase"
              >
                Design
              </motion.h1>
            </div>
            <div className="overflow-hidden flex items-baseline gap-4 md:gap-8">
               <motion.h1
                custom={1}
                variants={textReveal}
                className="text-[14vw] md:text-[12vw] uppercase text-neutral-500"
              >
                &
              </motion.h1>
               <motion.h1
                custom={2}
                variants={textReveal}
                className="text-[14vw] md:text-[12vw] uppercase"
              >
                Code
              </motion.h1>
            </div>
            <div className="overflow-hidden">
               <motion.h1
                custom={3}
                variants={textReveal}
                className="text-[14vw] md:text-[12vw] uppercase ml-[10vw] text-neutral-500"
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
             <p className="text-xl md:text-2xl font-medium text-neutral-400 leading-relaxed">
              I build immersive digital experiences that blend aesthetic precision with technical robustness. Based in Seoul.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Just a spacer for now to allow scroll testing */}
      <div className="h-screen w-full flex items-center justify-center text-neutral-800">
        <span className="uppercase tracking-widest text-sm">Scroll to explore</span>
      </div>

      <Dock />
    </main>
  );
}
