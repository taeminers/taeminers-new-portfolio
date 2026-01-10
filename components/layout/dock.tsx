"use client";

import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { Home, Lightbulb, Mail, LayoutGrid, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "@/components/ui/core/button";
import { Marquee } from "@/components/ui/marquee";

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Work", href: "/work", icon: LayoutGrid },
  { name: "About", href: "/about", icon: Lightbulb },
];

export function Dock() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      layout
      transition={{ type: "spring", damping: 25, stiffness: 260, mass: 0.8 }} // Snappy, organic spring
      className={cn(
        "fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col justify-end items-center overflow-hidden",
        // High-Fidelity Liquid Glass Effect
        "backdrop-blur-3xl backdrop-saturate-[180%]",
        "bg-gradient-to-b from-white/30 to-white/10",
        "border border-white/40",
        "shadow-[0_8px_32px_0_rgba(31,38,135,0.15)]",
        "ring-1 ring-white/30 ring-inset",

        "w-[320px] md:w-3/5 md:max-w-4xl rounded-3xl", 
        "p-2"
      )}
      style={{
           // Setting a min-height ensures distinct 'closed' and 'open' states for the spring to animate between
      }}
    >
        <AnimatePresence mode="popLayout">
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)", transition: { delay: 0.1, duration: 0.2 } }}
                    exit={{ opacity: 0, y: 0, filter: "blur(4px)", transition: { duration: 0.15 } }}
                    className="flex flex-col gap-2 mb-4 w-full"
                >
                    {navItems.map((item, i) => (
                        <Link key={item.name} href={item.href} passHref>
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10, transition: { duration: 0.1 } }}
                                transition={{ delay: 0.1 + (i * 0.05), type: "spring", stiffness: 300, damping: 20 }}
                                className="flex items-center gap-4 p-3 rounded-xl hover:bg-black/5 transition-colors group"
                            >
                                <div className="p-2 rounded-lg bg-white/50 group-hover:bg-white transition-colors shadow-sm">
                                     <item.icon className="w-5 h-5 text-neutral-600 transition-colors" />
                                </div>
                                <span className="font-medium text-sm text-neutral-800" style={{ mixBlendMode: 'difference' }}>{item.name}</span>
                            </motion.div>
                        </Link>
                    ))}
                     <div className="w-full h-px bg-black/5 my-1" />
                </motion.div>
            )}
        </AnimatePresence>


        <motion.div 
            layout="position" // Ensures this bar sticks to the bottom smoothly during expansion
            className="flex items-center justify-between w-full gap-4 px-2"
        >
             <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-20 h-20 rounded-lg border border-white/50 shadow-inner overflow-hidden relative shrink-0">
                    <video 
                        src="/videos/kyle-hero-video.mp4" 
                        autoPlay 
                        loop 
                        muted 
                        playsInline
                        className="w-full h-full object-cover" 
                    />
                </div>
                <div className="flex flex-col overflow-hidden flex-1 min-w-0 pr-2">
                    <span className="text-sm font-bold uppercase text-neutral-800 whitespace-nowrap" style={{ mixBlendMode: 'difference' }}>Kyle Lee</span>
                    <Marquee className="[--gap:0.5rem] w-full" duration={15}>
                        <span className="text-xs font-medium text-neutral-500 uppercase tracking-wider" style={{ mixBlendMode: 'difference' }}>Product Engineer • Creative Entrepreneur• </span>
                    </Marquee>
                </div>
             </div>
            
            <Button
                variant="ghost"
                size="icon"
                className="rounded-full w-12 h-12 hover:bg-white/20 ml-auto shrink-0"
                onClick={() => setIsOpen(!isOpen)}
            >
                <AnimatePresence mode="wait" initial={false}>
                    {isOpen ? (
                        <motion.div
                            key="close"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <X className="w-6 h-6 text-neutral-800" />
                        </motion.div>
                    ) : (
                         <motion.div
                            key="menu"
                            initial={{ rotate: 90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: -90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Menu className="w-6 h-6 text-neutral-800" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </Button>
      </motion.div>
    </motion.div>
  );
}
