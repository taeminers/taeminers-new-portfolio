"use client";

import { Header } from "@/components/layout/header/header";
import { Dock } from "@/components/layout/dock";
import { Hero } from "@/components/sections/hero";
import { IntroSection } from "@/components/sections/intro-section";
import { MockSection } from "@/components/sections/mock-section";
import { ProfileSection } from "@/components/sections/profile-section";
import { WorkShowcase } from "@/components/sections/work-showcase";
import { Footer } from "@/components/layout/footer";

export default function Home() {
  return (
    <>
      <main className="relative min-h-screen w-full bg-background text-foreground selection:bg-primary/20 selection:text-primary">
        <Header />
        
        {/* Glow Effects */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/5 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-primary/5 blur-[120px] rounded-full" />
        </div>

        <Hero />
        <IntroSection />
        <ProfileSection />
        <WorkShowcase />
        <MockSection />
        <Dock />
        <Footer />
      </main>
    </>
  );
}
