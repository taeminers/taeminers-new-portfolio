"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring } from "motion/react";
import { useRef, useEffect } from "react";
import Image from "next/image";

export function ProfileSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Zoom effect: scale from 0.5 to 1 as we scroll
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 1]);
  
  // Mouse movement tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring animation for mouse movement
  const springConfig = { damping: 25, stiffness: 150 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Normalize mouse position to -0.5 to 0.5
      const x = (e.clientX - centerX) / rect.width;
      const y = (e.clientY - centerY) / rect.height;
      
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[200vh] bg-white"
    >
      {/* Sticky container that holds the image and text */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center px-6 lg:px-12">
        <div className="max-w-[1600px] w-full mx-auto flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
          {/* Profile info - left side */}
          <motion.div
            style={{
              opacity: useTransform(scrollYProgress, [0.3, 0.5], [0, 1]),
            }}
            className="order-2 lg:order-1 lg:flex-shrink-0"
          >
            <div className="space-y-2 lg:space-y-4">
              <h5 className="text-xs uppercase tracking-widest text-neutral-500">(PROFILE)</h5>
              <h2 className="text-3xl lg:text-5xl font-light text-black">
                Taemin 'Kyle' Lee
              </h2>
              <div className="flex flex-col gap-1 lg:gap-2 text-neutral-700">
                 <p className="text-base lg:text-lg">
                  1998-09-14
                </p>
                <p className="text-base lg:text-lg">
                  Seoul National University
                </p>
                <p className="text-base lg:text-lg">
                  Computer Science & Engineering 17
                </p>
              </div>
            </div>
          </motion.div>

          {/* Animated image container - right side */}
          <motion.div
            style={{
              scale,
              rotateX,
              rotateY,
              transformPerspective: 1000,
            }}
            className="relative w-full max-w-2xl lg:max-w-3xl h-[50vh] lg:h-[70vh] order-1 lg:order-2"
        >
          <Image
            src="/images/taeminers.jpeg"
            alt="Profile"
            fill
            className="object-contain"
            priority
          />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
