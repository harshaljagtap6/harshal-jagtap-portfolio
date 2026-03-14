"use client";
import { motion } from "framer-motion";
import { Gamepad2, Server, Database, Cloud, Code2, Network } from "lucide-react";

const projects = [
  {
    title: "Sky Vanguard 3D",
    type: "3D Aerial Combat Game",
    description: "Built a responsive flight control system with modular weapon systems (missiles, bombs, flares), AI dogfight patterns, and mobile optimization.",
    tech: ["Unity", "C#", "URP", "Mobile Optimization", "AI Navigation"],
    playstore: "https://play.google.com/store/apps/details?id=com.LLI.SkyVanguardWarplanesFury&hl=en-US",
    image: "https://play-lh.googleusercontent.com/R3rjeaE1Ptxt9l4Dn6yHlufeVVkPeogml70pOq3zqTJupv7f0Ko1B44fgbrav5unX2fvRQmjfuJRKQ3Xk1n8uw"
  },
  {
    title: "Sorting3DGame",
    type: "3D Casual Puzzle Game",
    description: "Developed bead sorting mechanics, procedural levels, intelligent hint/undo pathfinding, and integrated Unity LevelPlay monetization.",
    tech: ["Unity", "C#", "Procedural Generation", "Monetization API"],
    playstore: "https://play.google.com/store/apps/details?id=com.lli.sugarCubeSorter&hl=en-US",
    image: "https://play-lh.googleusercontent.com/zJqdlbx8MBjzyLfIw-hq3RQnfgsb4TCh-rbnBUAB4lnmhh_kW82ujcOtKEwZoHYmNrS6"
  },
  {
    title: "Self Hosted Automation Platform",
    type: "Backend & Infrastructure",
    description: "Self-hosted automation platform using n8n. Secured using Cloudflare Tunnel. Built workflows for lead automation and data extraction.",
    tech: ["Docker", "n8n", "Python", "Cloudflare", "API Integration"],
    isTechStackImage: true
  }
];

const TechStackGraphic = () => (
  <div className="w-full h-full min-h-[300px] md:min-h-[400px] bg-card/20 rounded-2xl flex items-center justify-center relative overflow-hidden backdrop-blur-sm border border-white/5 group">
    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-purple-500/10 opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
    
    <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8 relative z-10 p-8 max-w-sm">
      <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 4, delay: 0 }} className="flex flex-col items-center gap-3 text-blue-400">
        <Server className="w-10 h-10" />
        <span className="text-sm font-medium">Docker</span>
      </motion.div>
      <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 4, delay: 1 }} className="flex flex-col items-center gap-3 text-orange-500">
        <Network className="w-10 h-10" />
        <span className="text-sm font-medium">n8n</span>
      </motion.div>
      <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 4, delay: 2 }} className="flex flex-col items-center gap-3 text-emerald-400">
        <Code2 className="w-10 h-10" />
        <span className="text-sm font-medium">Python</span>
      </motion.div>
      <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 4, delay: 3 }} className="flex flex-col items-center gap-3 text-orange-400">
        <Cloud className="w-10 h-10" />
        <span className="text-sm font-medium">Cloudflare</span>
      </motion.div>
    </div>
  </div>
);

export default function Projects() {
  return (
    <section id="projects" className="py-24 bg-card/5">
      <div className="container mx-auto px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-16 flex items-center gap-4">
            <span className="w-12 h-[2px] bg-primary"></span>
            Featured Projects
          </h2>

          <div className="space-y-24">
            {projects.map((project, idx) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7 }}
                className={`flex flex-col gap-8 md:gap-16 items-center ${idx % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'}`}
              >
                {/* Media Container */}
                <div className="w-full md:w-[55%] rounded-2xl overflow-hidden shadow-2xl relative group h-[250px] md:h-[350px]">
                  {project.image ? (
                    <>
                      <div className="absolute inset-0 bg-primary/20 mix-blend-overlay group-hover:opacity-0 transition-opacity duration-500 z-10" />
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img 
                        src={project.image}
                        alt={`${project.title} Preview`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </>
                  ) : (
                    <TechStackGraphic />
                  )}
                </div>

                {/* Content Container */}
                <div className="w-full md:w-[45%] flex flex-col justify-center">
                  <span className="text-primary text-sm font-mono tracking-wider font-semibold mb-3 block">
                    {project.type}
                  </span>
                  
                  <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                    {project.title}
                  </h3>

                  <div className="bg-card/40 border border-white/5 rounded-2xl p-6 mb-8 backdrop-blur-sm shadow-[0_10px_30px_rgba(0,0,0,0.2)]">
                    <p className="text-foreground/80 leading-relaxed text-lg">
                      {project.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tech.map((t) => (
                      <span key={t} className="text-sm font-medium text-foreground/70 bg-card px-3 py-1.5 rounded-lg border border-white/5">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    {'playstore' in project && (
                      <a 
                        href={project.playstore} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-background rounded-xl font-semibold transition-all duration-300"
                      >
                        <Gamepad2 className="w-5 h-5" /> View on Play Store
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
