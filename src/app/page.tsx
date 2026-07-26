"use client";

import Hero from "@/components/sections/Hero";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import ResumeCenter from "@/components/sections/ResumeCenter";
import Contact from "@/components/sections/Contact";
import { useRole } from "./providers";

export default function Home() {
  const { role } = useRole();

  return (
    <div className={`relative min-h-screen transition-colors duration-500 ${role === "game" ? "bg-[#050508]" : "bg-[#030712]"}`}>
      {/* Background decorations for Game Dev Mode */}
      {role === "game" && (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-[600px] grid-perspective -z-20">
            <div className="w-full h-full grid-perspective-lines" />
          </div>
          {/* Subtle Cyber Grid throughout page */}
          <div className="absolute inset-0 cyber-grid-bg -z-20 opacity-40 [mask-image:linear-gradient(to_bottom,rgba(0,0,0,0.8),rgba(0,0,0,0.2))]" />
          
          {/* Glowing orbs */}
          <div className="absolute top-[10%] left-[20%] w-[30rem] h-[30rem] bg-cyan-500/10 rounded-full blur-[140px] -z-20" />
          <div className="absolute top-[50%] right-[10%] w-[35rem] h-[35rem] bg-purple-600/10 rounded-full blur-[160px] -z-20" />
          <div className="absolute bottom-[10%] left-[10%] w-[30rem] h-[30rem] bg-cyan-600/5 rounded-full blur-[140px] -z-20" />
          
          <div className="scanlines-overlay" />
        </div>
      )}

      {/* Background decorations for AI Mode */}
      {role === "ai" && (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 ai-terminal-bg -z-20" />
          
          {/* Neural net style glowing orbs */}
          <div className="absolute top-[15%] left-[5%] w-[35rem] h-[35rem] bg-emerald-500/5 rounded-full blur-[130px] -z-20" />
          <div className="absolute top-[40%] right-[5%] w-[35rem] h-[35rem] bg-blue-500/5 rounded-full blur-[140px] -z-20" />
          <div className="absolute bottom-[5%] left-[15%] w-[30rem] h-[30rem] bg-emerald-600/5 rounded-full blur-[130px] -z-20" />
        </div>
      )}

      <div className="relative z-10">
        <Hero />
        <Skills />
        <Experience />
        <Projects />
        <ResumeCenter />
        <Contact />
      </div>
    </div>
  );
}
