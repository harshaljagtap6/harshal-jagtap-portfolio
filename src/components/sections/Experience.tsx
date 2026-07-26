"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRole } from "@/app/providers";
import { Briefcase, Calendar, CheckCircle2, Shield } from "lucide-react";

// Experience configs tailored to the selected profile
const gameExperience = [
  {
    company: "LemonLogic Interactive",
    role: "Unity Developer",
    period: "Jan 2025 – Mar 2026",
    projects: [
      {
        name: "Sky Vanguard 3D (3D Aerial Combat – Unity URP)",
        details: [
          "Engineered a responsive flight control system and a modular, extensible weapon framework handling Homing Missiles, Free-fall Bombs, and Defensive Flares.",
          "Programmed tactical dogfight combat AI behaviors using Unity AI Navigation and Dreamteck Splines for aerial and ground target routines.",
          "Optimized mobile frame rates by implementing memory-efficient Object Pooling systems and custom lightweight URP post-processing shaders (volumetric fog, motion blur)."
        ]
      },
      {
        name: "Sorting3DGame (3D Casual Puzzle – Unity)",
        details: [
          "Authored core 'Bead Sort' touch interaction mechanics using DOTween to deliver high-performance gameplay feedback and tactile animations.",
          "Architected a scalable chapter progression system featuring procedural challenge generation and a dynamic shop/currency economy.",
          "Integrated Unity LevelPlay for ad monetization and engineered custom PerformanceManager to log player accuracy and level completion efficiency.",
          "Developed an intelligent hint generation algorithm and pathfinding-based 'Undo' stack mechanism to improve retention."
        ]
      }
    ]
  },
  {
    company: "Dev Information Technology",
    role: "Machine Learning Intern",
    period: "Jan 2024 – June 2024",
    projects: [
      {
        name: "Conversational AI & Predictive Analytics",
        details: [
          "Improved NLP data extraction accuracy by 30% by developing and deploying RASA-based conversational AI integrations for mobile applications.",
          "Migrated FastAPI backend services to Azure Functions, optimizing serverless scalability and resource availability.",
          "Built predictive neural network models using TensorFlow/Keras to process operational datasets, visualizing system telemetry via Power BI dashboards."
        ]
      }
    ]
  }
];

const aiExperience = [
  {
    company: "Self-Hosted AI & Business Automations",
    role: "Project Lead (Remote / Freelance)",
    period: "Apr 2026 – Present",
    projects: [
      {
        name: "Automated Booking Pipelines",
        details: [
          "Built an end-to-end automated appointment booking workflow for veterinary clinics, handling multi-channel lead intake, dynamic scheduling, and follow-up communications."
        ]
      },
      {
        name: "LLM & Vector DB Chatbots",
        details: [
          "Engineered customer-facing social media chat agents utilizing LLMs connected to a Vector Database to accurately extract, process, and answer queries based on internal document context."
        ]
      },
      {
        name: "Infrastructure & Security",
        details: [
          "Deployed and maintained self-hosted automation infrastructure using n8n on a Docker VPS; configured secure public API endpoints via Cloudflare Tunnels without exposing server ports.",
          "Authored Python scripts within n8n workflows to fetch, parse, and structure complex JSON payloads from third-party REST APIs and inventory systems."
        ]
      }
    ]
  },
  {
    company: "LemonLogic Interactive",
    role: "Systems & Software Developer",
    period: "Jan 2025 – Mar 2026",
    projects: [
      {
        name: "Complex Logic & Systems Engineering",
        details: [
          "Engineered modular logic and customized data structures to handle diverse configurations, performance tracking, and dynamic interactive workflows.",
          "Implemented search algorithms and intelligent feedback systems to dynamically evaluate user logic and route multi-step processes.",
          "Designed resource-efficient logic loops and implemented Object Pooling to maintain high performance in processing-heavy simulation environments."
        ]
      }
    ]
  },
  {
    company: "Dev Information Technology",
    role: "Machine Learning & Backend Intern",
    period: "Jan 2024 – June 2024",
    projects: [
      {
        name: "AI Integrations & Serverless Cloud",
        details: [
          "Developed and deployed custom RASA conversational agents for mobile platforms, increasing end-user data extraction accuracy by 30%.",
          "Successfully refactored and migrated Python FastAPI microservices into Azure Functions, enhancing endpoint scalability and reducing response latency.",
          "Integrated Hugging Face transformers alongside commercial LLMs (Google Gemini, OpenAI) to execute complex text processing workflows and natural language understanding tasks."
        ]
      }
    ]
  }
];

export default function Experience() {
  const { role } = useRole();

  const activeExperience = role === "game" ? gameExperience : aiExperience;

  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        
        {/* Section Header */}
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
              Work History & Projects
            </h2>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-foreground/60 max-w-md text-sm md:text-base"
          >
            A chronological timeline of my professional work experience.
          </motion.p>
        </div>

        {/* Timeline container */}
        <div className="relative border-l-2 border-white/5 ml-4 md:ml-8 space-y-12">
          <AnimatePresence mode="wait">
            {activeExperience.map((exp, idx) => (
              <motion.div
                key={role + "-" + exp.company + "-" + idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="relative pl-8 md:pl-12 group"
              >
                {/* Timeline node dot */}
                <span className={`absolute -left-[9px] top-2.5 w-4 h-4 rounded-full bg-[#0a0a0c] border-2 transition-all duration-500 ${
                  role === "game"
                    ? "border-cyan-400 shadow-[0_0_10px_rgba(0,240,255,0.4)] group-hover:border-purple-400 group-hover:shadow-[0_0_10px_rgba(189,0,255,0.4)]"
                    : "border-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.3)] group-hover:border-blue-400 group-hover:shadow-[0_0_10px_rgba(59,130,246,0.3)]"
                }`} />

                {/* Card Title & Meta */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-6">
                  <div>
                    <h3 className={`text-xl font-bold text-foreground font-theme-title group-hover:text-white transition-colors`}>
                      {exp.role}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-foreground/50 mt-1 font-mono">
                      <Briefcase className={`w-4 h-4 ${role === "game" ? "text-cyan-400" : "text-emerald-400"}`} />
                      <span>{exp.company}</span>
                    </div>
                  </div>

                  <div className="inline-flex items-center gap-2 self-start sm:self-auto px-3.5 py-1 bg-card/60 rounded-full text-xs text-foreground/60 border border-white/5 font-mono">
                    <Calendar className="w-3.5 h-3.5 text-foreground/40" />
                    <span>{exp.period}</span>
                  </div>
                </div>

                {/* Sub-projects list */}
                <div className="space-y-5">
                  {exp.projects.map((proj, pIdx) => (
                    <div
                      key={pIdx}
                      className={`bg-[#0d0d12]/30 border border-white/5 rounded-2xl p-6 hover:bg-[#0d0d12]/60 transition-all duration-300 ${
                        role === "game"
                          ? "pixel-corners hover:border-cyan-500/20"
                          : "hover:border-emerald-500/20"
                      }`}
                    >
                      <h4 className={`text-sm font-semibold mb-3.5 font-theme-title flex items-center gap-2 ${
                        role === "game" ? "text-cyan-400/90" : "text-emerald-400/90"
                      }`}>
                        <Shield className="w-3.5 h-3.5 shrink-0" />
                        <span>{proj.name}</span>
                      </h4>

                      <ul className="space-y-2 text-xs md:text-sm text-foreground/70 leading-relaxed list-none pl-1">
                        {proj.details.map((detail, dIdx) => (
                          <li key={dIdx} className="flex items-start gap-2">
                            <span className={`text-[10px] mt-1.5 shrink-0 ${role === "game" ? "text-purple-400" : "text-blue-400"}`}>
                              {role === "game" ? "■" : ">"}
                            </span>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
