"use client";

import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { Home, Lightbulb, Mail, LayoutGrid, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "@/components/ui/button";

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
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={cn(
        "fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center overflow-hidden",
        "bg-white/10 backdrop-blur-xl backdrop-saturate-150",
        "border border-white/20",
        "shadow-[0_8px_32px_0_rgba(0,0,0,0.36)]", // Deep outer shadow
        "outline outline-1 outline-white/30", // Extra rim light
        
        "w-[90vw] max-w-[350px] rounded-3xl", 
        isOpen ? "p-4" : "p-2"
      )}
    >
        <AnimatePresence>
          
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex flex-col gap-2 mb-4 w-full"
                >
                    {navItems.map((item) => (
                        <Link key={item.name} href={item.href} passHref>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex items-center gap-4 p-3 rounded-xl hover:bg-black/5 transition-colors"
                            >
                                <div className="p-2 rounded-lg bg-white">
                                     <item.icon className="w-5 h-5 text-neutral-500" />
                                </div>
                                <span className="font-medium text-sm">{item.name}</span>
                            </motion.div>
                        </Link>
                    ))}
                     <div className="w-full h-px bg-black/10 my-1" />
                </motion.div>
            )}
        </AnimatePresence>

        <div className="flex items-center justify-between w-full gap-4 px-2">
             <div className="flex items-center gap-3">
              
                <div className="w-10 h-10 rounded-full bg-neutral-200" />
                <div className="flex flex-col">
                    <span className="text-xs font-bold uppercase">Menu</span>
                    <span className="text-[10px] text-neutral-500 uppercase tracking-widest">Navigation</span>
                </div>
             </div>
            
            <Button
                variant="ghost"
                size="icon"
                className="rounded-full w-12 h-12 hover:bg-black/5 ml-auto"
                onClick={() => setIsOpen(!isOpen)}
            >
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.div
                            key="close"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                        >
                            <X className="w-6 h-6" />
                        </motion.div>
                    ) : (
                         <motion.div
                            key="menu"
                            initial={{ rotate: 90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: -90, opacity: 0 }}
                        >
                            <Menu className="w-6 h-6" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </Button>
      </div>
    </motion.div>
  );
}
