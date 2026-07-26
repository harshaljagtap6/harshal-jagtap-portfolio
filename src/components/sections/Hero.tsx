"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRole } from "@/app/providers";
import {
  Github,
  Mail,
  Linkedin,
  Gamepad2,
  BrainCircuit,
  Terminal,
  MapPin,
  GraduationCap,
  Sparkles,
  Play,
  Cpu,
  FileDown
} from "lucide-react";

export default function Hero() {
  const { role, setRole } = useRole();

  // Mode-specific content configs
  const headlines = {
    game: {
      tag: "Unity & 3D Interactive Developer",
      tagColor: "bg-cyan-500/10 border-cyan-400/30 text-cyan-400 [text-shadow:0_0_6px_rgba(0,240,255,0.2)]",
      titlePre: "Crafting Immersive",
      titleHighlight: "3D Worlds & Games",
      gradient: "from-cyan-400 via-indigo-400 to-purple-500",
      desc: "Specializing in mobile physics-driven systems, tactical flight combat AI, and procedural puzzle mechanics. Expert in pipeline automation from Blender to Unity and high-fidelity graphics optimization.",
      ctaPrimary: "LAUNCH PROJECTS",
      ctaPrimaryHref: "#projects",
      ctaSecondary: "GET GAME DEV RESUME",
      stats: [
        { label: "Location", val: "Ahmedabad, India", icon: MapPin, color: "text-cyan-400 bg-cyan-500/10" },
        { label: "Credentials", val: "B.Tech CSE (8.7 CGPA)", icon: GraduationCap, color: "text-purple-400 bg-purple-500/10" },
        { label: "Specialty", val: "Unity & C# Scripting", icon: Gamepad2, color: "text-pink-400 bg-pink-500/10" }
      ]
    },
    ai: {
      tag: "AI Automation & Backend Engineer",
      tagColor: "bg-emerald-500/10 border-emerald-400/30 text-emerald-400",
      titlePre: "Engineering Smart",
      titleHighlight: "Automations & AI Agent Pipelines",
      gradient: "from-emerald-400 via-teal-400 to-blue-500",
      desc: "Specializing in self-hosted orchestration (n8n on Docker), Large Language Model applications (RAG architecture, vector databases), and scalable serverless backend microservices (Azure Functions, FastAPI).",
      ctaPrimary: "EXPLORE PIPELINES",
      ctaPrimaryHref: "#projects",
      ctaSecondary: "GET AI RESUME",
      stats: [
        { label: "Location", val: "Ahmedabad, India", icon: MapPin, color: "text-emerald-400 bg-emerald-500/10" },
        { label: "Credentials", val: "B.Tech CSE (8.7 CGPA)", icon: GraduationCap, color: "text-blue-400 bg-blue-500/10" },
        { label: "Specialty", val: "n8n, LLM RAG & Python", icon: Cpu, color: "text-teal-400 bg-teal-500/10" }
      ]
    }
  };

  const active = headlines[role];

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
      <div className="container mx-auto px-6 z-10 max-w-5xl">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Role Selector, Typography & Stats */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* 1. Large Dynamic Role Switcher */}
            <div className="relative w-full flex p-1 bg-[#121217]/90 backdrop-blur-md rounded-2xl border border-white/5 max-w-md mb-8 shadow-2xl">
              <button
                onClick={() => setRole("game")}
                className={`relative z-10 flex-1 py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-300 text-xs md:text-sm cursor-pointer select-none ${
                  role === "game" ? "text-black" : "text-foreground/50 hover:text-foreground"
                }`}
              >
                {role === "game" && (
                  <motion.div
                    layoutId="hero-active-role"
                    className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-xl -z-10 shadow-[0_0_15px_rgba(0,240,255,0.4)]"
                    transition={{ type: "spring", stiffness: 350, damping: 28 }}
                  />
                )}
                <Gamepad2 className="w-4 h-4" />
                <span className="font-theme-title tracking-wider">GAME DEV MODE</span>
              </button>
              <button
                onClick={() => setRole("ai")}
                className={`relative z-10 flex-1 py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-300 text-xs md:text-sm cursor-pointer select-none ${
                  role === "ai" ? "text-black" : "text-foreground/50 hover:text-foreground"
                }`}
              >
                {role === "ai" && (
                  <motion.div
                    layoutId="hero-active-role"
                    className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-xl -z-10 shadow-[0_0_15px_rgba(16,185,129,0.4)]"
                    transition={{ type: "spring", stiffness: 350, damping: 28 }}
                  />
                )}
                <BrainCircuit className="w-4 h-4" />
                <span className="font-mono">AI AUTO MODE</span>
              </button>
            </div>

            {/* 2. Intro Subtitle Tag */}
            <AnimatePresence mode="wait">
              <motion.div
                key={role + "-tag"}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
                className={`inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full border text-xs font-semibold uppercase tracking-wider ${active.tagColor}`}
              >
                <Sparkles className="w-3.5 h-3.5 animate-spin" />
                <span>{active.tag}</span>
              </motion.div>
            </AnimatePresence>

            {/* 3. Main Title */}
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-5 leading-none">
              Harshal Jagtap
              <span className="block mt-2 text-2xl md:text-4xl font-semibold text-foreground/50 font-sans">
                {active.titlePre}{" "}
                <AnimatePresence mode="wait">
                  <motion.span
                    key={role + "-highlight"}
                    initial={{ opacity: 0, filter: "blur(5px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, filter: "blur(5px)" }}
                    transition={{ duration: 0.4 }}
                    className={`block lg:inline text-transparent bg-clip-text bg-gradient-to-r ${active.gradient} font-theme-title`}
                  >
                    {active.titleHighlight}
                  </motion.span>
                </AnimatePresence>
              </span>
            </h1>

            {/* 4. Professional Description */}
            <div className="relative min-h-[100px] mb-8">
              <AnimatePresence mode="wait">
                <motion.p
                  key={role + "-desc"}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="text-base md:text-lg text-foreground/75 leading-relaxed max-w-xl"
                >
                  {active.desc}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* 5. Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 w-full mb-8">
              {active.stats.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={role + "-stat-" + idx}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1, duration: 0.4 }}
                    className={`bg-card/40 border border-white/5 rounded-2xl p-4 backdrop-blur-md relative overflow-hidden group hover:border-white/10 hover:bg-card/60 transition-all duration-300 ${
                      role === "game" ? "pixel-corners" : "border-l-2 border-l-emerald-500/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${item.color} group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="overflow-hidden">
                        <span className="text-[10px] uppercase tracking-wider text-foreground/40 block font-mono">
                          {item.label}
                        </span>
                        <span className="font-semibold text-xs md:text-sm text-foreground/90 block truncate font-mono">
                          {item.val}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* 6. CTA & Social Center */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              <a
                href={active.ctaPrimaryHref}
                className={`px-8 py-3.5 rounded-xl font-bold flex items-center justify-center gap-2.5 transition-all duration-300 cursor-pointer ${
                  role === "game"
                    ? "bg-cyan-500 text-black hover:bg-cyan-400 font-theme-title shadow-[0_0_15px_rgba(0,240,255,0.3)] hover:shadow-[0_0_25px_rgba(0,240,255,0.6)]"
                    : "bg-emerald-500 text-black hover:bg-emerald-400 font-mono shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.6)]"
                }`}
              >
                {role === "game" ? <Play className="w-4 h-4 fill-black" /> : <Terminal className="w-4 h-4" />}
                <span>{active.ctaPrimary}</span>
              </a>

              <a
                href="#resume-center"
                className={`px-6 py-3.5 border rounded-xl font-bold flex items-center justify-center gap-2 bg-card/20 backdrop-blur-sm transition-all duration-300 cursor-pointer ${
                  role === "game"
                    ? "border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400 font-theme-title"
                    : "border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-400 font-mono"
                }`}
              >
                <FileDown className="w-4 h-4" />
                <span>{active.ctaSecondary}</span>
              </a>

              {/* Social links */}
              <div className="flex items-center justify-center gap-3.5 pt-2 sm:pt-0 sm:pl-3">
                <a
                  href="https://github.com/harshaljagtap6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 border border-white/5 bg-card/30 backdrop-blur-sm rounded-xl flex items-center justify-center text-foreground/60 hover:text-white hover:border-white/10 transition-colors"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="https://linkedin.com/in/harshaljagtap6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 border border-white/5 bg-card/30 backdrop-blur-sm rounded-xl flex items-center justify-center text-foreground/60 hover:text-white hover:border-white/10 transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="mailto:harshaljagtap6@gmail.com"
                  className="w-11 h-11 border border-white/5 bg-card/30 backdrop-blur-sm rounded-xl flex items-center justify-center text-foreground/60 hover:text-white hover:border-white/10 transition-colors"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Profile Picture Visual Frame */}
          <div className="lg:col-span-5 flex justify-center items-center relative mt-8 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="relative w-full max-w-[320px] aspect-[4/5]"
            >
              {/* Animated HUD details in Game Mode */}
              <AnimatePresence>
                {role === "game" && (
                  <>
                    {/* Retro Cyber Corner Target Markers */}
                    <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-cyan-400 pointer-events-none z-25" />
                    <div className="absolute -top-3 -right-3 w-6 h-6 border-t-2 border-r-2 border-cyan-400 pointer-events-none z-25" />
                    <div className="absolute -bottom-3 -left-3 w-6 h-6 border-b-2 border-l-2 border-cyan-400 pointer-events-none z-25" />
                    <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-cyan-400 pointer-events-none z-25" />
                    {/* Floating HUD Text */}
                    <span className="absolute -top-6 left-0 text-[10px] font-mono text-cyan-400/70 tracking-widest uppercase">
                      OBJ_DETECTION: ON
                    </span>
                    <span className="absolute -bottom-6 right-0 text-[10px] font-mono text-purple-400/70 tracking-widest uppercase">
                      GRID_LOC: [AHD-IND]
                    </span>
                  </>
                )}
              </AnimatePresence>

              {/* Animated Tech Details in AI Mode */}
              <AnimatePresence>
                {role === "ai" && (
                  <>
                    {/* Matrix overlay boxes */}
                    <div className="absolute inset-0 border border-emerald-500/20 pointer-events-none z-20 m-2 rounded-[1.5rem]" />
                    {/* Server logs overlay text */}
                    <div className="absolute -top-6 left-2 font-mono text-[9px] text-emerald-400/60 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                      <span>STATUS: RUNNING</span>
                    </div>
                    <div className="absolute -bottom-6 left-2 font-mono text-[9px] text-emerald-400/60">
                      <span>SYSTEM_INTEGRATION_OK: 100%</span>
                    </div>
                  </>
                )}
              </AnimatePresence>

              {/* Main Image Frame Container */}
              <div
                className={`relative w-full h-full rounded-[2rem] overflow-hidden border shadow-2xl transition-all duration-700 bg-[#0e0e12] z-10 ${
                  role === "game"
                    ? "border-cyan-500/30 shadow-[0_0_30px_rgba(0,240,255,0.15)] group hover:shadow-[0_0_40px_rgba(0,240,255,0.3)] pixel-corners"
                    : "border-emerald-500/20 shadow-[0_0_30px_rgba(16,185,129,0.1)] hover:border-emerald-500/40"
                }`}
              >
                {/* Fallback code grid */}
                <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:15px_15px] z-0" />
                
                {/* Profile Image */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/profile.jpeg"
                  alt="Harshal Jagtap Profile"
                  className="w-full h-full object-cover relative z-10 filter grayscale group-hover:grayscale-0 contrast-110 hover:scale-105 transition-all duration-700"
                />

                {/* Shimmer gradient overlays */}
                <div
                  className={`absolute inset-0 mix-blend-overlay opacity-60 z-20 pointer-events-none transition-all duration-500 ${
                    role === "game"
                      ? "bg-gradient-to-tr from-cyan-500/20 to-purple-500/20"
                      : "bg-gradient-to-tr from-emerald-500/20 to-blue-500/20"
                  }`}
                />
              </div>

              {/* Visual backglow blobs */}
              <div
                className={`absolute -top-4 -right-4 w-40 h-40 rounded-full blur-[70px] -z-10 transition-all duration-500 ${
                  role === "game" ? "bg-cyan-500/30" : "bg-emerald-500/20"
                }`}
              />
              <div
                className={`absolute -bottom-4 -left-4 w-40 h-40 rounded-full blur-[70px] -z-10 transition-all duration-500 ${
                  role === "game" ? "bg-purple-500/30" : "bg-blue-500/20"
                }`}
              />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
