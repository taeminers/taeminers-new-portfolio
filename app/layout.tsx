"use client";

import { useState, useEffect } from "react";
import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { AnimatePresence } from "motion/react";

import { SmoothScroll } from "@/components/smooth-scroll";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { LoadingScreen } from "@/components/loading-screen";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    // Small delay to ensure smooth transition
    setTimeout(() => {
      setShowContent(true);
    }, 100);
  };

  return (
    <html lang="en">
      <head>
        <title>Kyle Lee | Entrepreneur & SWE</title>
        <meta name="description" content="Personal Portfolio for Taemin Kyle Lee" />
        <meta property="og:title" content="Kyle Lee | Entrepreneur & SWE" />
        <meta property="og:description" content="Personal Portfolio for Taemin Kyle Lee" />
        <meta property="og:image" content="/images/opengraph.jpeg" />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable,
          outfit.variable
        )}
      >
        <AnimatePresence mode="wait">
          {isLoading && (
            <LoadingScreen key="loading" onLoadingComplete={handleLoadingComplete} />
          )}
        </AnimatePresence>
        
        {showContent && (
          <>
            <CustomCursor />
            <SmoothScroll>{children}</SmoothScroll>
          </>
        )}
      </body>
    </html>
  );
}
