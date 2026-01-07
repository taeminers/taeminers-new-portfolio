"use client";

import { motion } from "motion/react";

export function MockSection() {
  return (
    <section 
      className="sticky top-0 min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-6" 
      style={{ 
        zIndex: 15,
        willChange: 'transform',
        transform: 'translateZ(0)', // Force GPU acceleration
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto text-center"
      >
        <h2 className="text-6xl md:text-8xl font-bold tracking-tight mb-6 bg-gradient-to-r from-neutral-700 via-neutral-900 to-neutral-700 bg-clip-text text-transparent">
          Featured Work
        </h2>
        <p className="text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto">
          This section stays fixed while the footer slides up from below.
          Scroll down to see the effect in action.
        </p>
      </motion.div>
    </section>
  );
}
