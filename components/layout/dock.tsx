"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { Home, Lightbulb, Mail, LayoutGrid } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Work", href: "/work", icon: LayoutGrid },
  { name: "About", href: "/about", icon: Lightbulb },
  { name: "Contact", href: "/contact", icon: Mail },
];

export function Dock() {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
    >
      <div className="flex items-center gap-2 p-2 rounded-full bg-neutral-900/80 backdrop-blur-xl border border-white/10 shadow-2xl pointer-events-auto">
        <div className="flex items-center gap-1 pl-2">
          {navItems.map((item) => (
            <Link key={item.name} href={item.href} passHref>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "relative flex items-center justify-center w-10 h-10 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
                )}
              >
                <item.icon className="w-5 h-5" />
                <span className="sr-only">{item.name}</span>
              </motion.div>
            </Link>
          ))}
        </div>
        
        <div className="w-px h-6 bg-white/10 mx-2" />

        <Button 
            className="rounded-full bg-white text-black hover:bg-neutral-200"
            size="sm"
        >
            Let&apos;s Talk
        </Button>
      </div>
    </motion.div>
  );
}
