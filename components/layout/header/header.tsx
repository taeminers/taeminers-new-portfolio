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
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % INFO_ITEMS.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{
        y: isScrolled ? 12 : 0,
        opacity: 1,
        width: isScrolled ? (isMobile ? "92%" : "96%") : "100%",
        borderRadius: isScrolled ? "24px" : "0px",
        backgroundColor: isScrolled ? "rgba(255, 255, 255, 0.6)" : "rgba(255, 255, 255, 0)",
        backdropFilter: isScrolled ? "blur(16px) saturate(180%)" : "blur(0px) saturate(100%)",
        borderColor: isScrolled ? "rgba(0, 0, 0, 0.08)" : "rgba(0,0,0,0)",
        padding: isScrolled 
            ? (isMobile ? "12px 16px" : "10px 24px") 
            : (isMobile ? "24px 24px" : "24px 48px")
      }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="fixed top-0 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between pointer-events-none border border-transparent box-border"
    >
      <div className="flex items-start gap-8 md:gap-20 pointer-events-auto text-neutral-900">
        {/* Desktop Layout - Static */}
        <div className="hidden md:flex items-start gap-20">
            <div className="flex flex-col gap-1">
            <span className="text-xs font-medium uppercase tracking-widest opacity-50">
                Building
            </span>
            <span className="text-sm font-bold uppercase tracking-widest">
                GRIDS
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
