"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { 
  SiReact, 
  SiNextdotjs, 
  SiTypescript, 
  SiTailwindcss, 
  SiSupabase,
  SiJira,
  SiSlack,
  SiNotion,
  SiFigma,
  SiRedux
} from "react-icons/si";

const skills = [
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", icon: SiNextdotjs, color: "#000000" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "Tailwind", icon: SiTailwindcss, color: "#06B6D4" },
  { name: "Redux", icon: SiRedux, color: "#443E38" },
  { name: "Supabase", icon: SiSupabase, color: "#3ECF8E" },
  { name: "Jira", icon: SiJira, color: "#0052CC" },
  { name: "Slack", icon: SiSlack, color: "#4A154B" },
  { name: "Notion", icon: SiNotion, color: "#000000" },
  { name: "Figma", icon: SiFigma, color: "#F24E1E" },
];

export function SkillsSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section 
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-6 py-20"
    >
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2 bg-gradient-to-r from-neutral-700 via-neutral-900 to-neutral-700 bg-clip-text text-transparent">
            Skills
          </h2>
          <p className="text-sm md:text-base text-neutral-600">
            Technologies and tools I work with
          </p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-0">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="relative bg-white border border-neutral-200 rounded-xl p-8 flex flex-col items-center justify-center gap-4 aspect-square overflow-hidden group"
              >
                {/* Animated black background */}
                {hoveredIndex === index && (
                  <motion.div
                    layoutId="hoverBackground"
                    className="absolute inset-0 bg-black rounded-xl"
                    style={{ backgroundColor: "#000000" }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 50
                    }}
                  />
                )}

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center justify-center gap-4">
                  {skill.icon ? (
                    <skill.icon 
                      className="w-12 h-12 md:w-16 md:h-16 transition-colors duration-300" 
                      style={{ color: hoveredIndex === index ? "#ffffff" : skill.color }} 
                    />
                  ) : (
                    <div className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center">
                      <span 
                        className="text-2xl md:text-3xl font-bold transition-colors duration-300" 
                        style={{ color: hoveredIndex === index ? "#ffffff" : skill.color }}
                      >
                        Z
                      </span>
                    </div>
                  )}
                  <span 
                    className={`text-sm md:text-base font-medium text-center transition-colors duration-300 ${
                      hoveredIndex === index ? "text-white" : "text-neutral-700"
                    }`}
                  >
                    {skill.name}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
