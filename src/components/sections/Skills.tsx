"use client";

import { motion } from "framer-motion";
import { useRole } from "@/app/providers";
import { Gamepad2, BrainCircuit, Code, Settings, Sparkles, Layers } from "lucide-react";

// Categorized skill matrix items
const skillCategories = [
  {
    id: "game",
    title: "Game Engines & 3D",
    icon: Gamepad2,
    skills: [
      { name: "Unity 3D", rating: "Expert" },
      { name: "C#", rating: "Expert" },
      { name: "URP", rating: "Advanced" },
      { name: "Blender", rating: "Intermediate" },
      { name: "HLSL Shaders", rating: "Intermediate" },
      { name: "DOTween", rating: "Advanced" },
      { name: "Dreamteck Splines", rating: "Advanced" },
      { name: "Object Pooling", rating: "Expert" }
    ]
  },
  {
    id: "ai",
    title: "AI & LLM Automation",
    icon: BrainCircuit,
    skills: [
      { name: "n8n", rating: "Expert" },
      { name: "OpenAI APIs", rating: "Advanced" },
      { name: "Gemini", rating: "Advanced" },
      { name: "RAG Architecture", rating: "Advanced" },
      { name: "Vector DBs", rating: "Advanced" },
      { name: "RASA", rating: "Intermediate" },
      { name: "Cloudflare Tunnels", rating: "Advanced" }
    ]
  },
  {
    id: "backend",
    title: "Backend & DevOps",
    icon: Settings,
    skills: [
      { name: "Python", rating: "Advanced" },
      { name: "FastAPI", rating: "Advanced" },
      { name: "Docker", rating: "Advanced" },
      { name: "Azure Functions", rating: "Advanced" },
      { name: "REST APIs", rating: "Expert" },
      { name: "PostgreSQL", rating: "Advanced" },
      { name: "MongoDB", rating: "Intermediate" },
      { name: "Git", rating: "Expert" }
    ]
  }
];

export default function Skills() {
  const { role } = useRole();

  // Helper to determine if a skill group is relevant to the active role
  const isGroupActive = (groupId: string) => {
    if (role === "game") {
      return groupId === "game" || groupId === "backend"; // Backend is somewhat helper for both
    } else {
      return groupId === "ai" || groupId === "backend";
    }
  };

  // Helper to determine if a specific skill badge should glow/highlight
  const isSkillHighlighted = (groupName: string) => {
    if (role === "game") {
      return groupName === "game";
    } else {
      return groupName === "ai";
    }
  };

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        
        {/* Section Title */}
        <div className="flex flex-col items-start gap-4 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4"
          >
            <span className={`w-12 h-1 rounded-full ${role === "game" ? "bg-cyan-500" : "bg-emerald-500"}`}></span>
            <h2 className="text-3xl md:text-5xl font-black font-theme-title">
              Skills & Interactive Tech Matrix
            </h2>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-foreground/60 max-w-md text-sm md:text-base"
          >
            Hover over skills. Active credentials expand and glow based on your chosen mode.
          </motion.p>
        </div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {skillCategories.map((category, idx) => {
            const Icon = category.icon;
            const groupActive = isGroupActive(category.id);
            const forceHighlight = isSkillHighlighted(category.id);

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`bg-[#0d0d12]/40 backdrop-blur-md border p-6 rounded-2xl flex flex-col justify-between transition-all duration-500 ${
                  role === "game"
                    ? forceHighlight
                      ? "border-cyan-500/40 shadow-[0_0_20px_rgba(0,240,255,0.06)] pixel-corners"
                      : "border-white/5 opacity-60 hover:opacity-100"
                    : forceHighlight
                    ? "border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.06)] border-t-4 border-t-emerald-500"
                    : "border-white/5 opacity-60 hover:opacity-100"
                }`}
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-500 ${
                      forceHighlight
                        ? role === "game"
                          ? "bg-cyan-500/10 border-cyan-400/45 text-cyan-400"
                          : "bg-emerald-500/10 border-emerald-400/45 text-emerald-400"
                        : "bg-white/5 border-white/5 text-foreground/40"
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className={`text-base font-bold font-theme-title ${
                        forceHighlight
                          ? role === "game"
                            ? "text-cyan-400 [text-shadow:0_0_8px_rgba(0,240,255,0.3)]"
                            : "text-emerald-400"
                          : "text-foreground/80"
                      }`}>
                        {category.title}
                      </h3>
                      <span className="text-[10px] text-foreground/30 font-mono block uppercase">
                        {category.skills.length} technical skills
                      </span>
                    </div>
                  </div>

                  {/* Skill Items */}
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => {
                      const highlighted = forceHighlight || (category.id === "backend" && groupActive);
                      return (
                        <motion.div
                          key={skill.name}
                          whileHover={{ scale: 1.05 }}
                          className={`px-3 py-1.5 rounded-lg border text-xs font-medium tracking-wide flex items-center gap-1 transition-all duration-300 ${
                            highlighted
                              ? role === "game"
                                ? "bg-cyan-500/5 border-cyan-500/30 text-cyan-300 shadow-[0_0_10px_rgba(0,240,255,0.05)] hover:border-cyan-400 hover:text-white"
                                : "bg-emerald-500/5 border-emerald-500/30 text-emerald-300 hover:border-emerald-400 hover:text-white font-mono"
                              : "bg-black/10 border-white/5 text-foreground/40 hover:text-foreground hover:border-white/10"
                          }`}
                        >
                          {role === "ai" && highlighted && <span className="text-[9px] text-blue-400 mr-0.5">&gt;</span>}
                          <span>{skill.name}</span>
                          
                          {/* Rating tag */}
                          {highlighted && (
                            <span className={`text-[8px] font-bold uppercase tracking-widest ml-1 font-mono px-1 rounded ${
                              role === "game" 
                                ? "bg-purple-500/10 text-purple-400" 
                                : "bg-blue-500/10 text-blue-400"
                            }`}>
                              {skill.rating}
                            </span>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* Sub status tag */}
                {forceHighlight && (
                  <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-foreground/30 uppercase">
                    <span>CORE_DOMAIN</span>
                    <span className="animate-pulse">ACTIVE_SECTOR</span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
