"use client";

import { motion, useScroll, useTransform, animate } from "motion/react";
import { ArrowUp, Github, Linkedin, Mail, Twitter } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState, useRef } from "react";

const socialLinks = [
  { name: "GitHub", href: "https://github.com/taeminers", icon: Github },
  { name: "LinkedIn", href: "https://linkedin.com/in/taeminers", icon: Linkedin },
  { name: "Twitter", href: "https://twitter.com/taeminers", icon: Twitter },
  { name: "Email", href: "mailto:hello@taeminers.com", icon: Mail },
];

export function Footer() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const scrollToTop = () => {
    const startPosition = window.scrollY;
    const duration = 1200; // milliseconds
    let startTime: number | null = null;

    // Easing function for smooth animation
    const easeInOutCubic = (t: number): number => {
      return t < 0.5 
        ? 4 * t * t * t 
        : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    const animation = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const ease = easeInOutCubic(progress);
      
      window.scrollTo(0, startPosition * (1 - ease));

      if (progress < 1) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const getTimezone = () => {
    return Intl.DateTimeFormat().resolvedOptions().timeZone.split("/")[1] || "LOCAL";
  };

  return (
    <footer 
      ref={footerRef}
      className="relative w-full h-screen flex items-center justify-center overflow-hidden"
      style={{ 
        zIndex: 20,
        willChange: 'transform',
        transform: 'translateZ(0)', // Force GPU acceleration
      }}
    >
      {/* Gradient Background with Glassmorphism */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
        {/* Animated Gradient Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-gradient-to-br from-blue-400/40 to-purple-400/40 blur-[120px] rounded-full"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.7, 0.5],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-gradient-to-tl from-pink-400/40 to-orange-400/40 blur-[120px] rounded-full"
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-between p-8 md:p-16">
     

        {/* Large Name Display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex-1 flex items-center justify-center"
        >
          <h2
            className={cn(
              "text-6xl md:text-[10rem] lg:text-[14rem] font-bold tracking-tight text-center",
              "bg-gradient-to-r from-neutral-700 via-neutral-900 to-neutral-700 bg-clip-text text-transparent"
            )}
          >
            Kyle Lee
          </h2>
        </motion.div>
  {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex items-center gap-6 mt-8 mb-8"
        >
          {socialLinks.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.7 + i * 0.1 }}
              className={cn(
                "p-3 rounded-full",
                "backdrop-blur-md bg-white/40 hover:bg-white/60",
                "border border-white/50 hover:border-white/70",
                "transition-all duration-300 hover:scale-110"
              )}
              aria-label={link.name}
            >
              <link.icon className="w-5 h-5 text-neutral-800" />
            </motion.a>
          ))}
        </motion.div>
        {/* Bottom Info Bar */}
        <div className="w-full pb-30 md:pb-20 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0">
          {/* Time and Location */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center gap-2"
          >
            <span className="text-xs md:text-sm font-medium tracking-widest text-neutral-700 uppercase">
              {getTimezone()} {formatTime(currentTime)}
            </span>
          </motion.div>

          {/* Professional Role */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center"
          >
            <p className="text-xs md:text-sm font-medium tracking-widest text-neutral-700 uppercase">
              Design Engineer / Working Worldwide
            </p>
          </motion.div>

          {/* Back to Top Button */}
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            onClick={scrollToTop}
            className={cn(
              "group flex items-center gap-2 px-4 py-2 rounded-full",
              "backdrop-blur-md bg-white/40 hover:bg-white/60",
              "border border-white/50 hover:border-white/70",
              "transition-all duration-300"
            )}
          >
            <span className="text-xs font-medium tracking-widest text-neutral-800 uppercase">
              Back to Top
            </span>
            <ArrowUp className="w-4 h-4 text-neutral-800 group-hover:-translate-y-1 transition-transform duration-300" />
          </motion.button>
        </div>

    </div>
    
    </footer>
  );
}
