"use client";

import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import lottie, { AnimationItem } from "lottie-web";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const profileImages = [
  { src: "/images/profile/snu-logo.png", size: 80 },
  { src: "/images/profile/grids-logo.jpg", size: 100 },
  { src: "/images/profile/lg-logo.png", size: 90 },
  { src: "/images/profile/fb-logo.webp", size: 85 },
  { src: "/images/profile/vws-logo.jpeg", size: 95 },
  { src: "/images/profile/fablo-logo.png", size: 110 },
];

// Generate random positions for floating images
const generateRandomPosition = (index: number) => {
  const positions = [
    { top: "15%", left: "15%" },
    { top: "20%", right: "18%" },
    { bottom: "25%", left: "18%" },
    { bottom: "20%", right: "15%" },
    { top: "50%", left: "12%" },
    { top: "55%", right: "20%" },
  ];
  return positions[index % positions.length];
};

export function TransitionSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lottieRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<AnimationItem | null>(null);

  useEffect(() => {
    if (!lottieRef.current || !sectionRef.current) return;

    // Load Lottie animation from local file
    animationRef.current = lottie.loadAnimation({
      container: lottieRef.current,
      renderer: "svg",
      loop: false,
      autoplay: false,
      path: "/lottie/lottie-animation.json",
    });

    const animation = animationRef.current;

    // Wait for animation to load
    animation.addEventListener("DOMLoaded", () => {
      const totalFrames = animation.totalFrames;

      // Create ScrollTrigger for scrubbing animation
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          const frame = Math.floor(self.progress * (totalFrames - 1));
          animation.goToAndStop(frame, true);
        },
      });
    });

    // Cleanup
    return () => {
      animation.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="sticky top-0 min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 px-6 overflow-hidden"
      style={{
        zIndex: 15,
        willChange: "transform",
        transform: "translateZ(0)",
      }}
    >
      {/* Floating Profile Images */}
      {profileImages.map((img, index) => (
        <motion.div
          key={img.src}
          className="absolute"
          style={{
            ...generateRandomPosition(index),
            width: img.size,
            height: img.size,
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 8 + index * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.5,
          }}
        >
          <div className="relative w-full h-full rounded-lg overflow-hidden shadow-lg">
            <Image
              src={img.src}
              alt="Profile"
              fill
              className="object-contain"
            />
          </div>
        </motion.div>
      ))}

      {/* Lottie Animation Container */}
      <div
        ref={lottieRef}
        className="w-[45vw] md:w-[30vw] max-w-sm aspect-square z-10"
      />
    </section>
  );
}
