"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRole } from "@/app/providers";
import {
  Gamepad2,
  Server,
  Play,
  Cpu,
  ArrowUpRight,
  ExternalLink,
  Code2,
  Database,
  Terminal,
  Activity,
  Layers,
  Network
} from "lucide-react";

// Project data structures
const gameProjects = [
  {
    title: "Sky Vanguard 3D",
    category: "3D Aerial Combat Game",
    desc: "Engineered a responsive flight control system with modular weapon systems (homing missiles, free-fall bombs, flares), custom tactical dogfight AI, and mobile frame-rate optimization.",
    tech: ["Unity 3D", "C#", "URP", "Mobile Physics", "Object Pooling", "Splines AI"],
    metric: "40% Draw Call Reduction",
    image: "https://play-lh.googleusercontent.com/R3rjeaE1Ptxt9l4Dn6yHlufeVVkPeogml70pOq3zqTJupv7f0Ko1B44fgbrav5unX2fvRQmjfuJRKQ3Xk1n8uw",
    action: "LAUNCH MISSION",
    link: "https://play.google.com/store/apps/details?id=com.LLI.SkyVanguardWarplanesFury&hl=en-US"
  },
  {
    title: "Donut Sort - 3D Casual Game",
    category: "Published Google Play Game",
    desc: "Designed and published a complete hyper-casual 3D puzzle game. Developed core gameplay logic, virtual economy, level editor, inventory system, and mediated ad networks.",
    tech: ["Unity 3D", "C#", "Level Editor", "Economy System", "Ad Mediation", "Blender"],
    metric: "50+ Levels",
    iconType: "donut",
    image: "https://play-lh.googleusercontent.com/a6VOBuhCLB29LX0uPq1PdDSRMFckIA0wMMgzIjBRVaZZ0c5rTyrymfQGKeX2sZoMK_jwPOiSIjDA5cIzN526tw=w240-h480",
    action: "PLAY GAME",
    link: "https://play.google.com/store/apps/details?id=com.Code_V.donutsort"
  },
  {
    title: "3D Industrial Configurator",
    category: "Interactive Machine Simulation",
    desc: "Created a real-time interactive 3D simulation for packaging machinery (tube/jar fillers). Built optimized CAD-to-lowpoly asset pipeline and mobile pinch/rotate cameras.",
    tech: ["Unity 3D", "Blender", "C# Scripting", "Touch Controls", "ScriptableObjects"],
    metric: "1:1 Interactive CAD Simulation",
    iconType: "industrial",
    action: "LAUNCH DEMO",
    link: "https://prod-config.harshaljagtap.tech"
  },
  {
    title: "Sorting3DGame",
    category: "3D Puzzle & UX Mechanics",
    desc: "Developed tactile 'Bead Sort' physics touch mechanics using DOTween. Created chapter progress tracking, procedural levels hint solver, and undo-history stack.",
    tech: ["Unity", "C#", "DOTween", "Hint Algorithm", "Undo Stack", "LevelPlay Ads"],
    metric: "Zero-latency Physics Mechanics",
    image: "https://play-lh.googleusercontent.com/zJqdlbx8MBjzyLfIw-hq3RQnfgsb4TCh-rbnBUAB4lnmhh_kW82ujcOtKEwZoHYmNrS6",
    action: "PLAY PUZZLE",
    link: "https://play.google.com/store/apps/details?id=com.lli.sugarCubeSorter&hl=en-US"
  }
];

const aiProjects = [
  {
    title: "Self-Hosted AI & Business Automations",
    category: "Infrastructure & Orchestration",
    desc: "Deployed self-hosted n8n instance on Docker VPS with Cloudflare Tunnels for secure API webhooks. Authored Python parsing scripts within automated business workflows.",
    tech: ["Docker", "n8n", "Cloudflare Tunnels", "Python", "REST APIs", "Webhooks"],
    metric: "0$ SaaS Fees (Zapier Alternative)",
    iconType: "n8n",
    action: "VIEW PIPELINE",
    link: "https://github.com/harshaljagtap6"
  },
  {
    title: "LLM & Vector DB Chatbots",
    category: "Generative AI / RAG Architecture",
    desc: "Engineered customer-facing social media chatbots using OpenAI/Gemini APIs integrated with a Vector Database. Implemented semantic search (RAG) for internal doc Q&A.",
    tech: ["RAG Architecture", "Vector DBs", "OpenAI API", "Gemini API", "FastAPI"],
    metric: "+35% Query Extraction Accuracy",
    iconType: "chatbot",
    action: "EXPLORE AGENT",
    link: "https://github.com/harshaljagtap6"
  },
  {
    title: "Automated Booking Pipelines",
    category: "CRM & Workflow Automations",
    desc: "Built automated appointment booking pipelines for clinics handling multi-channel lead intake, dynamic scheduling, follow-ups, and IMAP/SMTP triggers.",
    tech: ["n8n", "CRON Jobs", "Google Calendar API", "IMAP/SMTP", "FastAPI"],
    metric: "200+ Automated Bookings / Mo",
    iconType: "booking",
    action: "VIEW WORKFLOW",
    link: "https://github.com/harshaljagtap6"
  },
  {
    title: "Conversational AI & Serverless Migration",
    category: "Backend Microservices & Cloud",
    desc: "Developed custom RASA conversational agents for mobile apps. Refactored Python FastAPI backend microservices and migrated endpoints to serverless Azure Functions.",
    tech: ["RASA NLU", "Azure Functions", "FastAPI", "Python", "Serverless", "PostgreSQL"],
    metric: "60% Lower Server Response Latency",
    iconType: "rasa",
    action: "VIEW ARCHITECTURE",
    link: "https://github.com/harshaljagtap6"
  }
];

export default function Projects() {
  const { role, setRole } = useRole();

  const activeProjects = role === "game" ? gameProjects : aiProjects;

  // Custom Inline Visual Icons for projects that do not have direct image URLs
  const renderProjectVisual = (p: typeof gameProjects[0] | typeof aiProjects[0]) => {
    // If it has a google play image URL, use it
    if ('image' in p && p.image) {
      return (
        <div className="relative w-full h-full min-h-[220px] bg-black/40 flex items-center justify-center overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={p.image}
            alt={p.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
        </div>
      );
    }

    // Otherwise render high fidelity SVG grids
    const colorClass = role === "game" ? "text-cyan-400" : "text-emerald-400";
    const bgGradient = role === "game"
      ? "from-cyan-500/10 to-purple-500/5 border-cyan-500/20"
      : "from-emerald-500/10 to-blue-500/5 border-emerald-500/20";

    return (
      <div className={`relative w-full h-full min-h-[220px] bg-[#0d0d12] rounded-t-2xl border-b flex flex-col items-center justify-center p-6 bg-gradient-to-br overflow-hidden ${bgGradient}`}>
        {/* Futuristic grids */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:15px_15px]" />
        
        {role === "game" ? (
          <div className="flex flex-col items-center gap-3 relative z-10">
            {p.iconType === "donut" ? (
              <>
                <Gamepad2 className={`w-12 h-12 text-pink-400 animate-pulse`} />
                <span className="font-theme-title text-xs tracking-wider text-pink-300">PUZZLE ENGINE</span>
              </>
            ) : (
              <>
                <Layers className="w-12 h-12 text-cyan-400 animate-bounce" />
                <span className="font-theme-title text-xs tracking-wider text-cyan-300">3D CONFIG_PIPELINE</span>
              </>
            )}
            <div className="text-[10px] font-mono text-foreground/40 mt-1 border border-white/5 px-2 py-0.5 rounded">
              RENDER_MODE: URP_MOBILE
            </div>
          </div>
        ) : (
          <div className="w-full flex flex-col gap-2 font-mono text-[10px] text-foreground/60 relative z-10">
            <div className="flex items-center justify-between border-b border-white/5 pb-1">
              <span className={colorClass}>&gt;_ SYSTEM_LOGS</span>
              <Activity className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
            </div>
            {p.iconType === "n8n" && (
              <>
                <div className="text-emerald-400/90">&gt; docker-compose up -d n8n</div>
                <div>&gt; binding cloudflare tunnel encryption... [OK]</div>
                <div className="text-blue-400">&gt; webhook_listener status: listening...</div>
              </>
            )}
            {p.iconType === "chatbot" && (
              <>
                <div className="text-emerald-400/90">&gt; init vector_db semantic search</div>
                <div>&gt; embedding input document chunks...</div>
                <div className="text-blue-400">&gt; response generated via RAG architecture</div>
              </>
            )}
            {p.iconType === "booking" && (
              <>
                <div className="text-emerald-400/90">&gt; monitoring imap/smtp trigger hooks</div>
                <div>&gt; parsing dynamic client details...</div>
                <div className="text-blue-400">&gt; schedules booked: gcal synced.</div>
              </>
            )}
            {p.iconType === "rasa" && (
              <>
                <div className="text-emerald-400/90">&gt; loading rasa dialogue manager...</div>
                <div>&gt; compiling fastapi microservice router...</div>
                <div className="text-blue-400">&gt; migrating to azure serverless... [OK]</div>
              </>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        
        {/* Title & Section Mode Selector */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-black flex items-center gap-4">
              <span className={`w-12 h-1 rounded-full ${role === "game" ? "bg-cyan-500" : "bg-emerald-500"}`}></span>
              Featured Projects
            </h2>
          </motion.div>

          {/* Sub Sector Tabs inside projects */}
          <div className="flex p-1 bg-card/50 backdrop-blur-md rounded-xl border border-white/5 self-stretch sm:self-auto">
            <button
              onClick={() => setRole("game")}
              className={`px-5 py-2 rounded-lg font-bold text-xs tracking-wider transition-all duration-300 ${
                role === "game"
                  ? "bg-cyan-500 text-black shadow-[0_0_12px_rgba(0,240,255,0.2)] font-theme-title"
                  : "text-foreground/50 hover:text-foreground font-sans"
              }`}
            >
              🎮 GAMES
            </button>
            <button
              onClick={() => setRole("ai")}
              className={`px-5 py-2 rounded-lg font-bold text-xs tracking-wider transition-all duration-300 ${
                role === "ai"
                  ? "bg-emerald-500 text-black shadow-[0_0_12px_rgba(16,185,129,0.2)] font-mono"
                  : "text-foreground/50 hover:text-foreground font-sans"
              }`}
            >
              🤖 AI & AUTO
            </button>
          </div>
        </div>

        {/* Dynamic Project Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          <AnimatePresence mode="wait">
            {activeProjects.map((project, idx) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -25 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className={`bg-card/35 backdrop-blur-md border border-white/5 hover:bg-card/50 transition-all duration-300 flex flex-col rounded-2xl group overflow-hidden ${
                  role === "game"
                    ? "pixel-corners hover:border-cyan-500/40 hover:shadow-[0_0_20px_rgba(0,240,255,0.1)]"
                    : "border-l-4 border-l-emerald-500/30 hover:border-emerald-500/40 hover:shadow-[0_0_20px_rgba(16,185,129,0.06)]"
                }`}
              >
                {/* Visual Header */}
                {renderProjectVisual(project)}

                {/* Body Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Project Category Tag */}
                    <span
                      className={`text-[10px] font-bold tracking-widest uppercase block mb-2 font-mono ${
                        role === "game" ? "text-cyan-400" : "text-blue-400"
                      }`}
                    >
                      {project.category}
                    </span>

                    {/* Title */}
                    <h3
                      className={`text-xl font-bold text-foreground mb-3 font-theme-title group-hover:text-white transition-colors duration-300 ${
                        role === "game" ? "tracking-wide" : "tracking-normal"
                      }`}
                    >
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-foreground/70 text-sm leading-relaxed mb-6">
                      {project.desc}
                    </p>
                  </div>

                  <div>
                    {/* Metric Highlight Badge */}
                    <div
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border text-xs font-semibold mb-5 font-mono ${
                        role === "game"
                          ? "bg-purple-500/5 border-purple-500/20 text-purple-400"
                          : "bg-emerald-500/5 border-emerald-500/20 text-emerald-400"
                      }`}
                    >
                      <Activity className="w-3 h-3 animate-pulse" />
                      <span>{project.metric}</span>
                    </div>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className={`text-[10px] font-mono px-2 py-0.5 rounded border border-white/5 bg-black/20 text-foreground/50`}
                        >
                          {role === "ai" ? `> ${t}` : t}
                        </span>
                      ))}
                    </div>

                    {/* Call To Actions */}
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full py-3 border rounded-xl font-bold text-xs tracking-wider flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer ${
                        role === "game"
                          ? "border-cyan-500/25 text-cyan-400 bg-cyan-500/5 hover:bg-cyan-500 hover:text-black hover:border-cyan-500 font-theme-title hover:shadow-[0_0_12px_rgba(0,240,255,0.3)]"
                          : "border-emerald-500/25 text-emerald-400 bg-emerald-500/5 hover:bg-emerald-500 hover:text-black hover:border-emerald-500 font-mono hover:shadow-[0_0_12px_rgba(16,185,129,0.3)]"
                      }`}
                    >
                      <span>{project.action}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
