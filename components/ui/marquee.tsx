"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: React.ReactNode;
  className?: string;
  duration?: number;
}

export function Marquee({ children, className, duration = 10 }: MarqueeProps) {
  return (
    <div className={cn("overflow-hidden flex select-none gap-4 mask-linear-fade", className)}>
      <motion.div
        className="flex min-w-full shrink-0 items-center justify-around gap-4"
        animate={{ x: "-100%" }}
        transition={{
          duration,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {children}
        {children}
      </motion.div>
      <motion.div
        className="flex min-w-full shrink-0 items-center justify-around gap-4"
        animate={{ x: "-100%" }}
        transition={{
          duration,
          ease: "linear",
          repeat: Infinity,
        }}
         aria-hidden
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
}
