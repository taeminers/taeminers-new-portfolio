"use client";

import { motion } from "motion/react";
import Image from "next/image";

export function IntroSection() {
  // Animation variants for staggered text reveal
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.43, 0.13, 0.23, 0.96] as const,
      },
    },
  };

  const descriptionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 0.8,
        ease: [0.43, 0.13, 0.23, 0.96] as const,
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 1.1 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: [0.43, 0.13, 0.23, 0.96] as const,
      },
    },
  };

  // Split the heading into words for animation
  const headingLine1 = ["I", "prioritize", "the"];
  const headingLine2 = ["development", "of"];
  const headingLine3 = ["market-driven", "solutions"];
  const headingLine4 = ["that", "deliver", "clear"];
  const headingLine5 = ["business", "value", "over"];
  const headingLine6 = ["engineering", "purely"];
  const headingLine7 = ["technical", "endeavors."];

  return (
    <section className="relative min-h-screen px-6 lg:px-12 py-8 lg:py-20 bg-white">
      <div className="max-w-[1600px] mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[600px_1fr] gap-6 lg:gap-16">
          {/* Left Side - Sticky Image */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={imageVariants}
            className="relative w-full max-w-[600px] mx-auto lg:mx-0 order-1 lg:sticky lg:top-24 lg:self-start"
          >
            <div className="aspect-video overflow-hidden rounded-lg">
              <video
                src="/videos/hero-video.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-xs text-neutral-500 mt-2 italic text-right">my current mood:</p>
          </motion.div>

          {/* Right Side - Text Content */}
          <div className="flex flex-col justify-center order-2 lg:min-h-[120vh]">
            {/* Main Heading - Animated word by word */}
            <motion.h1
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={containerVariants}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light leading-[1.1] mb-8 lg:mb-12"
            >
              {/* Line 1 */}
              <div className="flex flex-wrap gap-x-3 lg:gap-x-4 mb-2">
                {headingLine1.map((word, index) => (
                  <motion.span
                    key={`line1-${index}`}
                    variants={wordVariants}
                    className="text-black"
                  >
                    {word}
                  </motion.span>
                ))}
              </div>

              {/* Line 2 */}
              <div className="flex flex-wrap gap-x-3 lg:gap-x-4 mb-2">
                {headingLine2.map((word, index) => (
                  <motion.span
                    key={`line2-${index}`}
                    variants={wordVariants}
                    className="text-black"
                  >
                    {word}
                  </motion.span>
                ))}
              </div>

              {/* Line 3 */}
              <div className="flex flex-wrap gap-x-3 lg:gap-x-4 mb-2">
                {headingLine3.map((word, index) => (
                  <motion.span
                    key={`line3-${index}`}
                    variants={wordVariants}
                    className={word === "market-driven" ? "italic text-black" : "text-black"}
                  >
                    {word}
                  </motion.span>
                ))}
              </div>

              {/* Line 4 */}
              <div className="flex flex-wrap gap-x-3 lg:gap-x-4 mb-2">
                {headingLine4.map((word, index) => (
                  <motion.span
                    key={`line4-${index}`}
                    variants={wordVariants}
                    className="text-black"
                  >
                    {word}
                  </motion.span>
                ))}
              </div>

              {/* Line 5 */}
              <div className="flex flex-wrap gap-x-3 lg:gap-x-4 mb-2">
                {headingLine5.map((word, index) => (
                  <motion.span
                    key={`line5-${index}`}
                    variants={wordVariants}
                    className={word === "business" || word === "value" ? "text-emerald-600" : "text-black"}
                  >
                    {word}
                  </motion.span>
                ))}
              </div>

              {/* Line 6 */}
              <div className="flex flex-wrap gap-x-3 lg:gap-x-4 mb-2">
                {headingLine6.map((word, index) => (
                  <motion.span
                    key={`line6-${index}`}
                    variants={wordVariants}
                    className="text-black"
                  >
                    {word}
                  </motion.span>
                ))}
              </div>

              {/* Line 7 */}
              <div className="flex flex-wrap gap-x-3 lg:gap-x-4">
                {headingLine7.map((word, index) => (
                  <motion.span
                    key={`line7-${index}`}
                    variants={wordVariants}
                    className={word === "technical" ? "italic text-black/60" : "text-black/60"}
                  >
                    {word}
                  </motion.span>
                ))}
              </div>
            </motion.h1>

            {/* Description Text - Animated */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={descriptionVariants}
              className="max-w-md"
            >
              <p className="text-neutral-700 text-sm sm:text-base leading-relaxed">
                (Intro)
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
