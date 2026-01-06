"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

export function Header() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          timeZoneName: "short",
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex items-start justify-between px-6 py-6 md:px-12 pointer-events-none mix-blend-difference text-white"
    >
      <div className="flex items-start gap-8 md:gap-20 pointer-events-auto">
        {/* Block 1: Name/Role */}
        <div className="flex flex-col gap-1">
          <span className="text-xs font-medium uppercase tracking-widest opacity-50">
            Role
          </span>
          <span className="text-sm font-bold uppercase tracking-widest">
            Design Engineer
          </span>
        </div>

        {/* Block 2: Status */}
        <div className="flex flex-col gap-1 max-sm:hidden">
          <span className="text-xs font-medium uppercase tracking-widest opacity-50">
            Status
          </span>
          <span className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse mix-blend-screen" />
            Available
          </span>
        </div>

        {/* Block 3: Location */}
        <div className="flex flex-col gap-1 max-sm:hidden">
          <span className="text-xs font-medium uppercase tracking-widest opacity-50">
            Location
          </span>
          <span className="text-sm font-bold uppercase tracking-widest">
            Seoul, KR
          </span>
        </div>
      </div>

      {/* Right Side: Time */}
      <div className="flex flex-col gap-1 items-end pointer-events-auto">
        <span className="text-xs font-medium uppercase tracking-widest opacity-50">
          Local Time
        </span>
        <span className="text-sm font-bold uppercase tracking-widest tabular-nums">
          {time}
        </span>
      </div>
    </motion.header>
  );
}
