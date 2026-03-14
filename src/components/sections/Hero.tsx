"use client";
import { motion } from "framer-motion";
import { Github, Mail, FolderHeart, FileText, MapPin, GraduationCap, Briefcase } from "lucide-react";

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-16">
      {/* Background gradients */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-[30rem] h-[30rem] bg-primary/10 rounded-full blur-[128px]" />
        <div className="absolute bottom-[10%] right-[10%] w-[30rem] h-[30rem] bg-purple-500/10 rounded-full blur-[128px]" />
      </div>

      <div className="container mx-auto px-6 z-10 max-w-5xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column: Text & Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="inline-block mb-6 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium"
            >
              Unity Game Developer
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
              Hi, I'm <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400 whitespace-nowrap">
                Harshal Jagtap
              </span>
            </h1>
            
            <div className="text-lg text-foreground/70 mb-10 leading-relaxed max-w-lg space-y-4">
              <p>
                I'm a Unity Game Developer with experience building gameplay systems, AI behaviors, and optimized mobile game mechanics.
              </p>
              <p>
                My work ranges from flight combat systems to casual puzzle games. I enjoy building modular systems that are scalable and maintainable.
              </p>
            </div>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
              <div className="bg-card/30 border border-white/5 rounded-2xl p-4 backdrop-blur-sm relative overflow-hidden group hover:bg-card/50 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-3 group-hover:scale-110 transition-transform">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm text-foreground/50 mb-1">Location</h4>
                  <p className="font-medium text-sm">Ahmedabad, India</p>
                </div>
              </div>
              
              <div className="bg-card/30 border border-white/5 rounded-2xl p-4 backdrop-blur-sm relative overflow-hidden group hover:bg-card/50 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 mb-3 group-hover:scale-110 transition-transform">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm text-foreground/50 mb-1">Education</h4>
                  <p className="font-medium text-sm">B.Tech CS</p>
                </div>
              </div>
              
              <div className="bg-card/30 border border-white/5 rounded-2xl p-4 backdrop-blur-sm relative overflow-hidden group hover:bg-card/50 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-3 group-hover:scale-110 transition-transform">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm text-foreground/50 mb-1">Experience</h4>
                  <p className="font-medium text-sm">1+ Yr Game Dev</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap items-center gap-4">
                <a href="#projects" className="px-6 py-3 bg-primary text-background font-medium rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2">
                  <FolderHeart className="w-5 h-5" /> View Projects
                </a>
                <a href="/resume.pdf" download="Harshal_Jagtap_Resume.pdf" className="px-6 py-3 border border-primary/30 bg-primary/5 text-primary font-medium rounded-lg hover:bg-primary/10 hover:border-primary/50 transition-colors flex items-center gap-2">
                  <FileText className="w-5 h-5" /> Resume
                </a>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <a href="#contact" className="px-5 py-3 border border-card bg-card/30 text-foreground font-medium rounded-lg hover:bg-card transition-colors flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                </a>
                <a href="https://github.com/harshaljagtap6" target="_blank" rel="noopener noreferrer" className="px-5 py-3 border border-card bg-card/30 text-foreground rounded-lg hover:bg-card transition-colors flex items-center justify-center">
                  <Github className="w-5 h-5" />
                </a>
              </div>
            </div>
          </motion.div>
          
          {/* Right Column: Profile Picture */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
            className="flex justify-center lg:justify-end relative"
          >
            <div className="relative w-full max-w-sm lg:max-w-md group mt-12 lg:mt-0">
              <div className="relative rounded-[2rem] overflow-hidden aspect-[4/5] border border-white/10 shadow-2xl bg-card/20 z-10 transition-transform duration-700 hover:scale-[1.02]">
                {/* Fallback pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />
                
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src="/profile.jpeg" 
                  alt="Harshal Jagtap"
                  className="w-full h-full object-cover relative z-10"
                />
                
                <div className="absolute inset-0 bg-primary/20 mix-blend-overlay group-hover:opacity-0 transition-opacity duration-500 z-20 pointer-events-none" />
              </div>

              {/* Decorative glows behind image */}
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-primary/30 rounded-full blur-[60px] -z-10 group-hover:bg-primary/40 transition-colors duration-500" />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-purple-500/30 rounded-full blur-[60px] -z-10 group-hover:bg-purple-500/40 transition-colors duration-500" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
