"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";

const slides = [
  {
    id: 1,
    title: "LOUIS PAILLE",
    date: "2025-09-12",
    developedBy: "DEVELOPED BY",
    designedBy: "DESIGNED BY MICHAEL",
    developer: "MICHAEL BARDOU",
    developerRole: "DEVELOPED BY",
    image: "/images/intro-1.jpg",
  },
  {
    id: 2,
    title: "DESIGN ENGINEER",
    date: "2025-10-15",
    developedBy: "DEVELOPED BY",
    designedBy: "DESIGNED BY MICHAEL",
    developer: "MICHAEL BARDOU",
    developerRole: "DEVELOPED BY",
    image: "/images/intro-2.jpg",
  },
  {
    id: 3,
    title: "CREATIVE STUDIO",
    date: "2025-11-20",
    developedBy: "DEVELOPED BY",
    designedBy: "DESIGNED BY MICHAEL",
    developer: "MICHAEL BARDOU",
    developerRole: "DEVELOPED BY",
    image: "/images/intro-3.jpg",
  },
];

export function IntroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const currentSlide = slides[currentIndex];

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 py-20 bg-white">
      <div className="max-w-[1800px] mx-auto w-full">
        <div className="relative flex items-center justify-center">
       

          {/* Center Content */}
          <div className="flex flex-col items-center gap-6 mx-auto w-[300px] md:w-[600px]">
            {/* Image Container */}
            <div className="relative w-full aspect-video overflow-hidden rounded-lg">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide.id}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
                  className="absolute inset-0"
                >
                  {/* Placeholder gradient */}
                  <div className="w-full h-full bg-gradient-to-br from-emerald-200 via-emerald-300 to-emerald-400" />
                  {/* Uncomment when you have images:
                  <Image
                    src={currentSlide.image}
                    alt={currentSlide.title}
                    fill
                    className="object-cover"
                    priority
                  />
                  */}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Text Information */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="w-full flex justify-between items-start text-xs uppercase tracking-wider"
              >
                <div className="flex flex-col gap-1">
                  <h2 className="font-bold text-neutral-900">{currentSlide.title}</h2>
                  <p className="text-neutral-500">{currentSlide.date}</p>
                </div>

                <div className="flex flex-col gap-1 text-center">
                  <p className="text-neutral-500">{currentSlide.developedBy}</p>
                  <p className="text-neutral-500">{currentSlide.designedBy}</p>
                </div>

                <div className="flex flex-col gap-1 text-right">
                  <p className="font-bold text-neutral-900">{currentSlide.developer}</p>
                  <p className="text-neutral-500">{currentSlide.developerRole}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        
        </div>
      </div>
    </section>
  );
}
