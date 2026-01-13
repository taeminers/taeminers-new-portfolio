"use client";

import { Button } from "../core/button"
import { motion } from "motion/react"

export const MainCtaButton = () => {
    return (
         <motion.div 
            className="flex items-center gap-4 pointer-events-auto relative z-50 p-2"
            initial="initial"
            whileHover="hover"
         >
             <motion.div
                className="absolute left-1 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-neutral-900 flex items-center justify-center -z-10 shadow-sm border border-white/10"
                variants={{
                    initial: { 
                        x: 0, 
                        opacity: 0, 
                        rotate: 0,
                        transition: {
                            type: "spring", 
                            damping: 14, 
                            stiffness: 80,
                            mass: 0.8
                        }
                    },
                    hover: { 
                        x: -41, 
                        opacity: 1, 
                        rotate: -360,
                        transition: { 
                            type: "spring", 
                            damping: 14, 
                            stiffness: 80,
                            mass: 0.8
                        },
                    },

                }}
             >
                <span className="text-2xl text-white not-italic leading-none grayscale-0">🤙🏻</span>
             </motion.div>

            <Button 
                className="rounded-full bg-neutral-900 text-white hover:bg-neutral-800 text-[20px] relative z-20 shadow-sm border border-white/10"
                size="lg"
                onClick={() => {
                
                }}
            >
                Let&apos;s Talk
            </Button>
      </motion.div>
    )
}