"use client";

import { motion, useMotionValue, useTransform } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect } from "react";

interface WorkCardProps {
  title: string;
  icon: string;
  coverImage: string;
  videoSrc?: string;
  category: string;
  year: string;
  tags: string[];
  href: string;
}

function WorkCard({ title, icon, coverImage, videoSrc, category, year, tags, href }: WorkCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLAnchorElement>(null);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const y = e.clientY - rect.top;
      mouseY.set(y);
    };

    const card = cardRef.current;
    if (card) {
      card.addEventListener("mousemove", handleMouseMove);
      return () => card.removeEventListener("mousemove", handleMouseMove);
    }
  }, [mouseY]);

  const imageY = useTransform(mouseY, [0, 500], [0, -40]);

  return (
    <Link
      target="_blank"
      href={href}
      ref={cardRef}
      className="flex flex-col gap-4 lg:gap-5 px-3 lg:px-4 pt-3 lg:pt-4 pb-5 lg:pb-6 rounded-xl lg:rounded-2xl bg-neutral-900 cursor-pointer group relative"
    >
      {/* Media Container */}
      <div className="relative rounded-lg lg:rounded-xl overflow-hidden w-full h-[260px] md:h-[350px] lg:h-[clamp(500px,32vw,800px)]">
        {/* Blur Overlay */}
        <div className="absolute inset-0 bg-neutral-900/30 backdrop-blur-md z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out" />

        {/* Video Preview or Cover Image */}
        {videoSrc ? (
          <video
            ref={videoRef}
            src={videoSrc}
            className="absolute inset-0 w-full h-full object-cover z-20"
            loop
            playsInline
            muted
            autoPlay
          />
        ) : (
          <div className="absolute inset-0 w-full h-full z-20">
            <Image
              alt={title}
              src={coverImage}
              fill
              className="object-cover scale-100 group-hover:scale-110 transition-transform duration-500 ease-in-out"
              sizes="100vw"
            />
          </div>
        )}

        {/* Background Image */}
        <div className="w-full h-full">
          <motion.div
            className="absolute inset-0 w-full h-[120%] -top-[10%] lg:-top-[15%]"
            style={{ y: imageY }}
          >
            <Image
              alt={title}
              src={coverImage}
              fill
              className="object-cover scale-105 group-hover:scale-100 transition-transform duration-500 ease-in-out"
              sizes="100vw"
            />
          </motion.div>
        </div>
      </div>

      {/* Card Info */}
      <div className="flex flex-col gap-4 lg:gap-5 px-3 lg:px-4">
        {/* Header */}
        <div className="flex justify-between items-center w-full relative">
          <div className="flex items-center gap-2 lg:gap-3">
            <Image
              alt={title}
              src={icon}
              width={32}
              height={32}
              className="w-6 h-6 lg:w-8 lg:h-8 rounded-full"
            />
            <p className="text-[clamp(14px,1.2vw,18px)] uppercase font-semibold text-neutral-100 tracking-wide">
              {title}
            </p>
          </div>
          <div className="flex gap-3 lg:gap-5">
            <p className="text-[clamp(14px,1.2vw,18px)] uppercase font-semibold text-neutral-300 tracking-wide">
              {category}
            </p>
            <p className="text-[clamp(14px,1.2vw,18px)] uppercase font-semibold text-neutral-300 tracking-wide">
              {year}
            </p>
          </div>
        </div>

        {/* Scrolling Tags */}
        <div className="flex justify-center items-center h-4 md:h-4.5 overflow-hidden relative w-full">
          <div className="absolute left-0 h-full w-8 lg:w-10 bg-gradient-to-r from-neutral-900/95 to-neutral-900/0 z-10" />
          <div className="absolute right-0 h-full w-8 lg:w-10 bg-gradient-to-l from-neutral-900/95 to-neutral-900/0 z-10" />
          <div className="flex overflow-hidden">
            <motion.div
              className="flex whitespace-nowrap"
              animate={{ x: [0, -1000] }}
              transition={{ 
                duration: 20, 
                repeat: Infinity, 
                repeatType: "loop",
                ease: "linear" 
              }}
            >
              {/* Repeat tags multiple times for seamless loop */}
              {[...Array(10)].map((_, repeatIndex) => (
                <p
                  key={repeatIndex}
                  className="text-[10px] md:text-xs tracking-widest text-neutral-300 uppercase whitespace-nowrap pr-1.5"
                >
                  {tags.map((tag, i) => (
                    <span key={i}>{tag}, </span>
                  ))}
                </p>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export function WorkShowcase() {
  const works = [
      {
      title: "The Clear Labs",
      icon: "/images/theclearlabs.png",
      coverImage: "/images/theclearlabs.png",
      videoSrc: "/videos/work/tcl-ad.mp4",
      category: "e-commerce",
      year: "2025",
      tags: ["K-beauty", "cosmetics", "shopify", "commerce"],
      href: "https://theclearlabs.com/",
    },
    {
      title: "FABLO APP",
      icon: "/images/profile/fablo-logo.png",
      coverImage: "/images/fablo-app.png",
      category: "Product",
      year: "2025",
      tags: [
       "Mobile App",
       "Play to Earn",
       "647,789 users",
      ],
      href: "https://www.playfablo.com/",
    },

  ];

  return (
    <section className="relative py-16 lg:py-24 px-6 lg:px-12 bg-white">
      <div className="max-w-[1600px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end mb-8 lg:mb-12 gap-4">
          <div>
            <h5 className="text-xs uppercase tracking-widest text-neutral-500 mb-2">
              (SELECTED WORK)
            </h5>
            <h2 className="text-4xl lg:text-6xl font-light text-black">
              Recent Projects
            </h2>
          </div>
          <Link
            href="/"
            className="text-sm lg:text-base uppercase tracking-wider text-black hover:text-neutral-600 transition-colors font-semibold group flex items-center gap-2"
          >
            More coming soon
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

        {/* Work Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {works.map((work, index) => (
            <motion.div
              key={work.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <WorkCard {...work} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
