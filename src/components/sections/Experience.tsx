"use client";
import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";

export default function Experience() {
  return (
    <section id="experience" className="py-24 relative">
      <div className="container mx-auto px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-12 flex items-center gap-4">
            <span className="w-12 h-[2px] bg-primary"></span>
            Experience
          </h2>

          <div className="space-y-12 border-l-2 border-primary/20 ml-4 md:ml-6">
            
            {/* Job 1 */}
            <div className="relative pl-8 md:pl-12">
              <span className="absolute -left-[11px] top-2 w-5 h-5 rounded-full bg-background border-4 border-primary shadow-[0_0_10px_rgba(56,189,248,0.5)]"></span>
              
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-foreground">Junior Game Developer</h3>
                  <div className="text-primary font-medium flex items-center gap-2 mt-1">
                    <Briefcase className="w-4 h-4" /> LemonLogic Interactive
                  </div>
                </div>
                <div className="inline-block mt-2 md:mt-0 px-3 py-1 bg-card rounded-full text-sm text-foreground/60 border border-white/5">
                  Jan 2025 – Mar 2026
                </div>
              </div>

              <div className="space-y-6 mt-6">
                <div className="bg-card/30 border border-white/5 rounded-2xl p-6 hover:bg-card/50 transition-colors">
                  <h4 className="text-lg font-semibold mb-3">Project: Sky Vanguard 3D</h4>
                  <ul className="list-disc list-inside space-y-2 text-foreground/70">
                    <li>Built a responsive flight control system</li>
                    <li>Developed modular weapon systems with missiles, bombs, and flares</li>
                    <li>Designed enemy AI behaviors using Unity Navigation and spline-based flight paths</li>
                    <li>Optimized mobile performance using object pooling and custom URP shaders</li>
                  </ul>
                </div>
                
                <div className="bg-card/30 border border-white/5 rounded-2xl p-6 hover:bg-card/50 transition-colors">
                  <h4 className="text-lg font-semibold mb-3">Project: Sorting3DGame</h4>
                  <ul className="list-disc list-inside space-y-2 text-foreground/70">
                    <li>Developed bead sorting puzzle mechanics</li>
                    <li>Implemented level progression and procedural challenges</li>
                    <li>Built in-game economy and shop system with Unity LevelPlay monetization</li>
                    <li>Developed intelligent hint system and undo pathfinding system</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Job 2 */}
            <div className="relative pl-8 md:pl-12">
              <span className="absolute -left-[11px] top-2 w-5 h-5 rounded-full bg-background border-4 border-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]"></span>
              
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-foreground">ML Intern</h3>
                  <div className="text-purple-400 font-medium flex items-center gap-2 mt-1">
                    <Briefcase className="w-4 h-4" /> Dev Information Technology
                  </div>
                </div>
                <div className="inline-block mt-2 md:mt-0 px-3 py-1 bg-card rounded-full text-sm text-foreground/60 border border-white/5">
                  Jan 2024 – June 2024
                </div>
              </div>

              <div className="mt-6 bg-card/30 border border-white/5 rounded-2xl p-6 hover:bg-card/50 transition-colors">
                <ul className="list-disc list-inside space-y-2 text-foreground/70">
                  <li>Built RASA chatbot improving extraction accuracy</li>
                  <li>Developed neural network regression models using TensorFlow</li>
                  <li>Built data dashboards using Power BI</li>
                  <li>Integrated LLM APIs like Gemini and OpenAI</li>
                  <li>Migrated APIs to Azure Functions</li>
                </ul>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
