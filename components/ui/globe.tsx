"use client";

import { useEffect, useRef } from "react";
import createGlobe from "cobe";
import { cn } from "@/lib/utils";

interface GlobeProps {
  className?: string;
}

export function Globe({ className }: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let phi = 0;
    let width = 0;

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
        phi += 0.001; // Slow rotation
        state.phi = phi;
        state.width = width * 2
        state.height = width * 2
      },
    });

    return () => {
      globe.destroy();
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <div className={cn("w-full h-full flex items-center justify-center", className)}>
      <canvas
        ref={canvasRef}
        style={{ 
          width: '100%', 
          height: '100%', 
          maxWidth: '600px', maxHeight: '600px', aspectRatio: 1, cursor: 'grab', touchAction: 'none' 
        }}
      />
    </div>
  );
}
