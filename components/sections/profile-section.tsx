"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from "motion/react";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { BadgeCheck, X } from "lucide-react";

interface ProfileCard {
  id: string;
  title: string;
  subtitle: string;
  bgColor: string;
  image?: string;
}

export function ProfileSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedCard, setSelectedCard] = useState<ProfileCard | null>(null);
  
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

  const profileCards: ProfileCard[] = [
    {
      id: "birthday",
      title: "1998-09-14",
      subtitle: "Birthday",
      image: "/images/taeminers.jpeg",
      bgColor: "bg-gradient-to-br from-purple-400 to-purple-600",
    },
    {
      id: "education",
      title: "Seoul National University",
      subtitle: "Computer Science & Engineering 17",
      image: "/images/profile/snu-logo.png",
      bgColor: "bg-gradient-to-br from-blue-400 to-blue-600",
    },
    {
      id: "grids",
      title: "GRIDS",
      subtitle: "CEO",
      image: "/images/profile/grids-logo.jpg",
      bgColor: "bg-gradient-to-br from-green-400 to-green-600",
    },
    {
      id: "lgcns",
      title: "LG CNS Intern",
      subtitle: "Mobile Service Development Team",
        image: "/images/profile/lg-logo.png",
      bgColor: "bg-gradient-to-br from-red-400 to-red-600",
    },
    {
      id: "factblock",
      title: "FACTBLOCK",
      subtitle: "Frontend Developer",
      image: "/images/profile/fb-logo.webp",
      bgColor: "bg-gradient-to-br from-yellow-400 to-yellow-600",
    },
    {
      id: "vws",
      title: "VWS",
      subtitle: "Product Engineer (PM & SWE)",
      image: "/images/profile/vws-logo.jpeg",
      bgColor: "bg-gradient-to-br from-pink-400 to-pink-600",
    },
  ];

  return (
    <section
      ref={containerRef}
      className="relative min-h-[200vh] bg-white"
    >
      {/* Sticky container that holds the image and text */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center px-6 lg:px-12">
        <div className="max-w-[1600px] w-full mx-auto flex flex-col lg:flex-row items-start justify-center ">
          {/* Animated image container - left side */}
          <motion.div
            style={{
              scale,
              rotateX,
              rotateY,
              transformPerspective: 1000,
            }}
            className="relative w-full max-w-xl lg:max-w-2xl h-[50vh] lg:h-[70vh] order-1 lg:order-1">
          <Image
            src="/images/taeminers.jpeg"
            alt="Profile"
            fill
            className="object-contain"
            priority
          />
          </motion.div>

          {/* Profile info - right side */}
          <motion.div
            style={{
              opacity: useTransform(scrollYProgress, [0.3, 0.5], [0, 1]),
            }}
            className="order-2 lg:order-2 lg:flex-shrink-0 w-full lg:w-auto"
          >
            <div className="space-y-4 lg:space-y-6">
              <div>
                {/* <h5 className="text-xs uppercase tracking-widest text-neutral-500">(PROFILE)</h5> */}
                <h2 className="text-3xl lg:text-5xl font-light text-black">
                  Kyle Lee (이태민) <BadgeCheck className="inline text-white" size={32} fill="#1DA1F2" />
                </h2>
              </div>

              {/* Instagram-style grid */}
              <div className="grid grid-cols-3  gap-0.5 max-w-lg lg:max-w-xl">
                {profileCards.map((card, index) => (
                  <motion.button
                    key={card.id}
                    onClick={() => setSelectedCard(card)}
                    className="bg-white aspect-[4/6] rounded-sm overflow-hidden relative cursor-pointer hover:scale-101 transition-transform"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {/* Background Image */}
                    {card.image && (
                      <Image
                        src={card.image}
                        alt={card.title}
                        fill
                        className="object-contain"
                      />
                    )}
                    
                    {/* Gradient overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    
                    {/* Text content */}
                    <div className="absolute bottom-0 left-0 right-0 p-3 lg:p-4 text-left">
                      <p className="text-white font-bold text-xs lg:text-sm line-clamp-2">
                        {card.title}
                      </p>
                      <p className="text-white/80 text-[10px] lg:text-xs line-clamp-1">
                        {card.subtitle}
                      </p>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedCard && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCard(null)}
              className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
            />
            
            {/* Modal content */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 max-h-[80vh] overflow-y-auto"
            >
              {/* Modal header */}
              <div className="sticky top-0 bg-white border-b border-neutral-200 px-6 py-4 flex justify-between items-center rounded-t-3xl">
                <h3 className="text-xl font-semibold text-black">{selectedCard.title}</h3>
                <button
                  onClick={() => setSelectedCard(null)}
                  className="p-2 hover:bg-neutral-100 rounded-full transition-colors"
                >
                  <X size={24} className="text-neutral-600" />
                </button>
              </div>

              {/* Modal body - blank for now */}
              <div className="p-6 min-h-[400px]">
                <p className="text-neutral-600">{selectedCard.subtitle}</p>
                {/* Content will go here */}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
