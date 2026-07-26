"use client";

import { motion } from "framer-motion";
import { useRole } from "@/app/providers";
import { Gamepad2, BrainCircuit, FileDown, ShieldCheck, CheckCircle2, Terminal } from "lucide-react";

export default function ResumeCenter() {
  const { role } = useRole();

  const gameResumeHighlights = [
    "Proficient in C# Scripting & URP Graphics",
    "Physics-driven Flight & Aerodynamics Logic",
    "Level Editor Tool Development in Unity",
    "Mediated Ad Integration (Unity LevelPlay)",
    "Blender low-poly modeling & optimization"
  ];

  const aiResumeHighlights = [
    "Orchestration workflows (n8n, Webhooks)",
    "RAG Architecture & LLM API Integrations",
    "Serverless Azure Functions & REST APIs",
    "Docker containerization & secure tunnels",
    "FastAPI & Python backend microservices"
  ];

  return (
    <section id="resume-center" className="py-24 relative overflow-hidden bg-card/5">
      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        
        {/* Title */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-5xl font-black mb-4 font-theme-title"
          >
            Download Resume Center
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-foreground/60 max-w-md mx-auto text-sm md:text-base"
          >
            Access specialized versions of my CV tailored to each of my technical domains.
          </motion.p>
        </div>

        {/* Dual Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          
          {/* 1. Game Dev Resume Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`bg-[#0d0d12]/90 border p-8 rounded-2xl flex flex-col justify-between transition-all duration-300 relative group ${
              role === "game"
                ? "border-cyan-500/40 shadow-[0_0_20px_rgba(0,240,255,0.08)] pixel-corners"
                : "border-white/5 hover:border-cyan-500/20"
            }`}
          >
            {/* Hologram top tag */}
            <div className="absolute top-4 right-4 flex items-center gap-1 text-[10px] font-mono text-cyan-400/50 bg-cyan-400/5 px-2 py-0.5 rounded border border-cyan-400/10">
              <ShieldCheck className="w-3 h-3" />
              <span>GAME_SPECIFIC</span>
            </div>

            <div>
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                <Gamepad2 className="w-6 h-6" />
              </div>

              <h3 className="text-xl font-bold font-theme-title text-cyan-400 tracking-wide mb-2">
                Unity & 3D Interactive CV
              </h3>
              <p className="text-foreground/50 text-xs mb-6 font-mono">
                Targeting: Game Engine Architecture, Gameplay Systems, VR/AR, Graphics URP Optimization.
              </p>

              {/* Highlights */}
              <ul className="space-y-3 mb-8">
                {gameResumeHighlights.map((hl, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-foreground/80">
                    <CheckCircle2 className="w-4 h-4 text-purple-400 mt-0.5 shrink-0" />
                    <span>{hl}</span>
                  </li>
                ))}
              </ul>
            </div>

            <a
              href="/Harshal_Jagtap_Unity_Developer_Resume.pdf"
              download="Harshal_Jagtap_Unity_Developer_Resume.pdf"
              className="w-full py-4 bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 text-black font-bold rounded-xl flex items-center justify-center gap-2.5 transition-all duration-300 font-theme-title shadow-[0_4px_15px_rgba(0,240,255,0.25)] hover:shadow-[0_4px_25px_rgba(0,240,255,0.45)] cursor-pointer"
            >
              <FileDown className="w-5 h-5" />
              <span>DOWNLOAD GAME DEV RESUME</span>
            </a>
          </motion.div>

          {/* 2. AI Automation Resume Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`bg-[#0d0d12]/90 border p-8 rounded-2xl flex flex-col justify-between transition-all duration-300 relative group ${
              role === "ai"
                ? "border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.08)] border-l-4 border-l-emerald-500/50"
                : "border-white/5 hover:border-emerald-500/20"
            }`}
          >
            {/* Terminal top tag */}
            <div className="absolute top-4 right-4 flex items-center gap-1 text-[10px] font-mono text-emerald-400/50 bg-emerald-400/5 px-2 py-0.5 rounded border border-emerald-400/10">
              <Terminal className="w-3 h-3" />
              <span>AI_SPECIFIC</span>
            </div>

            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                <BrainCircuit className="w-6 h-6" />
              </div>

              <h3 className="text-xl font-bold font-mono text-emerald-400 mb-2">
                AI Automation & Backend CV
              </h3>
              <p className="text-foreground/50 text-xs mb-6 font-mono">
                Targeting: Workflow Orchestration, ML Internships, RAG Integrations, FastAPI Microservices.
              </p>

              {/* Highlights */}
              <ul className="space-y-3 mb-8">
                {aiResumeHighlights.map((hl, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-foreground/80">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                    <span className="font-mono text-xs">{hl}</span>
                  </li>
                ))}
              </ul>
            </div>

            <a
              href="/Harshal_Jagtap_AI_Automation_Resume.pdf"
              download="Harshal_Jagtap_AI_Automation_Resume.pdf"
              className="w-full py-4 bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-400 hover:to-blue-400 text-black font-bold rounded-xl flex items-center justify-center gap-2.5 transition-all duration-300 font-mono shadow-[0_4px_15px_rgba(16,185,129,0.2)] hover:shadow-[0_4px_25px_rgba(16,185,129,0.4)] cursor-pointer"
            >
              <FileDown className="w-5 h-5" />
              <span>DOWNLOAD AI AUTOMATION RESUME</span>
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
