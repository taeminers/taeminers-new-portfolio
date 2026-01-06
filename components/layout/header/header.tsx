"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/core/button";
import { MainCtaButton } from "@/components/ui/main-cta/main-cta-button";

const INFO_ITEMS = [
  { label: "Role", value: "Design Engineer" },
  { 
    label: "Status", 
    value: (
      <>
        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        Available
      </>
    ) 
  },
  { label: "Location", value: "Seoul, KR" },
];

export function Header() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % INFO_ITEMS.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex items-start justify-between px-6 py-6 md:px-12 pointer-events-none"
    >
      <div className="flex items-start gap-8 md:gap-20 pointer-events-auto text-neutral-900">
        {/* Desktop Layout - Static */}
        <div className="hidden md:flex items-start gap-20">
            <div className="flex flex-col gap-1">
            <span className="text-xs font-medium uppercase tracking-widest opacity-50">
                Role
            </span>
            <span className="text-sm font-bold uppercase tracking-widest">
                Design Engineer
            </span>
            </div>

            <div className="flex flex-col gap-1">
            <span className="text-xs font-medium uppercase tracking-widest opacity-50">
                Status
            </span>
            <span className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                Available
            </span>
            </div>

            <div className="flex flex-col gap-1">
            <span className="text-xs font-medium uppercase tracking-widest opacity-50">
                Location
            </span>
            <span className="text-sm font-bold uppercase tracking-widest">
                Seoul, KR 
            </span>
            </div>
        </div>

        {/* Mobile Layout - Slot Machine Animation */}
        <div className="md:hidden h-10 overflow-hidden relative min-w-[140px]">
             <AnimatePresence mode="popLayout">
                <motion.div
                    key={currentIndex}
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: "-100%", opacity: 0 }}
                    transition={{ duration: 1, ease: [0.32, 0.72, 0, 1] }}
                    className="flex flex-col gap-1 absolute top-0 left-0 w-full"
                >
                    <span className="text-xs font-medium uppercase tracking-widest opacity-50">
                        {INFO_ITEMS[currentIndex].label}
                    </span>
                    <span className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                        {INFO_ITEMS[currentIndex].value}
                    </span>
                </motion.div>
             </AnimatePresence>
        </div>
      </div>

      {/* Right Side: Actions */}
     <MainCtaButton />
    </motion.header>
  );
}
