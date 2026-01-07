"use client";

import { useEffect, useRef } from "react";
import createGlobe from "cobe";
import { motion } from "motion/react";
import { ArrowRight, Globe as GlobeIcon, Layers, PenTool } from "lucide-react";

export function World() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let phi = 0;
    let width = 0;
    let pointerInteracting = false;
    let pointerStartX = 0;

    const onResize = () => canvasRef.current && (width = canvasRef.current.offsetWidth)
    window.addEventListener('resize', onResize)
    onResize()

    if (!canvasRef.current) return;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.3,
      dark: 0,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [1, 1, 1],
      markerColor: [0.1, 0.8, 1],
      glowColor: [1, 1, 1],
      markers: [],
      onRender: (state) => {
        // Slow auto-spin if not interacting
        if (!pointerInteracting) {
            phi += 0.001; 
        }
        state.phi = phi;
        state.width = width * 2
        state.height = width * 2
      },
    });

    // Interaction Handlers
    const onPointerDown = (e: PointerEvent) => {
        pointerInteracting = true;
        pointerStartX = e.clientX;
        if (canvasRef.current) canvasRef.current.style.cursor = 'grabbing';
    }

    const onPointerUp = () => {
        pointerInteracting = false;
        if (canvasRef.current) canvasRef.current.style.cursor = 'grab';
    }

    const onPointerMove = (e: PointerEvent) => {
        if (pointerInteracting) {
            const delta = e.clientX - pointerStartX;
            pointerStartX = e.clientX;
            phi += delta * 0.005; // Drag sensitivity
        }
    }

    const canvas = canvasRef.current;
    canvas.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointermove', onPointerMove);

    return () => {
      globe.destroy();
      window.removeEventListener('resize', onResize);
      canvas.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointermove', onPointerMove);
    };
  }, []);

  return (
    <section className="relative w-full min-h-screen py-24 px-6 md:px-12 flex flex-col justify-center items-center overflow-hidden">
      <div className="max-w-[90rem] w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
        
        {/* Globe Side - Order 1 on Mobile (Top), Order 2 on Desktop (Right) */}
        <div className="order-1 md:order-2 w-full aspect-square relative flex items-center justify-center">
             <div className="absolute inset-0 bg-gradient-to-tr from-white/50 to-transparent rounded-full blur-3xl opacity-20" />
             <canvas
                ref={canvasRef}
                style={{ width: '100%', height: '100%', maxWidth: '600px', maxHeight: '600px', aspectRatio: 1, cursor: 'grab', touchAction: 'none' }}
                className="opacity-90 active:cursor-grabbing"
             />
        </div>

        {/* Content Side - Order 2 on Mobile (Bottom), Order 1 on Desktop (Left) */}
        <div className="order-2 md:order-1 flex flex-col gap-8 md:gap-12">
            <div>
                 <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase mb-4">
                    This is <br/>
                    <span className="text-neutral-400">my world</span>
                </h2>
                <div className="h-1 w-20 bg-black" />
            </div>

            <div className="grid grid-cols-1 gap-4">
                <Card 
                    icon={PenTool} 
                    title="Blog" 
                    description="Thoughts on design, engineering, and the future of digital interaction." 
                />
                <Card 
                    icon={Layers} 
                    title="Projects" 
                    description="A curated collection of experiments, products, and client work." 
                />
                <Card 
                    icon={GlobeIcon} 
                    title="Career" 
                    description="My professional journey and the teams I've had the privilege to lead." 
                />
            </div>
        </div>

      </div>
    </section>
  );
}

function Card({ icon: Icon, title, description }: { icon: any, title: string, description: string }) {
    return (
        <motion.div 
            whileHover={{ y: -5, backgroundColor: "rgba(255,255,255,0.8)" }}
            className="group flex items-start gap-4 p-6 rounded-2xl bg-white/40 border border-white/60 backdrop-blur-md shadow-sm transition-all cursor-pointer"
        >
            <div className="p-3 rounded-xl bg-white shadow-sm border border-neutral-100 group-hover:scale-110 transition-transform duration-300">
                <Icon className="w-5 h-5 text-neutral-800" />
            </div>
            <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold uppercase tracking-wide">{title}</h3>
                    <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </div>
                <p className="text-sm text-neutral-500 font-medium leading-relaxed">{description}</p>
            </div>
        </motion.div>
    )
}
