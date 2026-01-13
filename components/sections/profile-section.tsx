"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import Image from "next/image";

interface ProfileCard {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  image: string;
  video?: string;
}

function ProfileCard({ card, index }: { card: ProfileCard; index: number }) {
  const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax effect: background moves slower than content
  // Adjusted range to prevent gaps
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full flex items-center justify-start overflow-hidden"
    >
      {/* Background Image/Video with Parallax */}
      <motion.div 
        className="absolute inset-0 h-[120%] -top-[10%]"
        style={{ y: backgroundY }}
      >
        {card.video ? (
          <video
            src={card.video}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        ) : (
          <Image
            src={card.image}
            alt={card.title}
            fill
            className="object-cover"
            priority={index === 0}
          />
        )}
      </motion.div>

      {/* Content with Parallax */}
      <motion.div 
        className="relative z-10 max-w-[1600px] mx-auto w-full px-6 lg:px-12 h-screen flex flex-col justify-between py-20 mix-blend-difference"
        style={{ y: contentY }}
      >
        {/* Top - Category */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs md:text-sm uppercase tracking-widest text-white font-semibold">
            {card.category}
          </p>
        </motion.div>

        {/* Middle - Main Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-3xl"
        >
          <h2 className="text-5xl font-bold text-white  leading-tight">
            {card.title}
          </h2>
          <p className="text-md font-bold text-white">
            {card.subtitle}
          </p>
        </motion.div>

        {/* Bottom - Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-2xl"
        >
          <p className="text-base font-bold md:text-md text-white leading-relaxed">
            {card.description}
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}

export function ProfileSection() {
  const profileCards: ProfileCard[] = [
    {
      id: "birthday",
      title: "Kyle Lee",
      subtitle: "Born September 14, 1998",
      description: "A journey that started in Seoul, Korea",
      category: "About Me",
      image: "/images/kyle.jpg",
    },
    {
      id: "education",
      title: "Seoul National University",
      subtitle: "Computer Science & Engineering '17",
      description: "Building the foundation for innovation and problem-solving",
      category: "2017 - 2024",
      image: "/images/profile/snu-logo.png",
      video: "/videos/cse-video.mp4"
    },
    {
      id: "grids",
      title: "GRIDS",
      subtitle: "CEO & Co-Founder",
      description: "Leading a team to revolutionize digital experiences",
      category: "2022/03 - 2023/03",
      image: "/images/grids.jpg",

    },
    {
      id: "lgcns",
      title: "LG CNS",
      subtitle: "Mobile Service Development Team Intern",
      description: "Gained hands-on experience in enterprise mobile solutions",
      category: "2023/06 - 2023/08",
      image: "/images/sciencepark.jpg",
    },
    {
      id: "factblock",
      title: "FACTBLOCK",
      subtitle: "Frontend Developer",
      description: "Crafted intuitive user interfaces for blockchain technology",
      category: "2024/02 - 2025/02",
      image: "/images/profile/fb-logo.webp",
      video: "/videos/fb-video.mp4",
    },
    {
      id: "vws",
      title: "VWS",
      subtitle: "Product Engineer (PM & SWE)",
      description: "Bridging product vision with technical execution",
      category: "2025/05 - 2025/10",
      image: "/images/seoul.jpg",
    },
  ];

  return (
    <>
      {profileCards.map((card, index) => (
        <ProfileCard key={card.id} card={card} index={index} />
      ))}
    </>
  );
}
