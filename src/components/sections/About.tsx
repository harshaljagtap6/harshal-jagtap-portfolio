"use client";
import { motion } from "framer-motion";
import { MapPin, GraduationCap, Briefcase } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-24 relative">
      <div className="container mx-auto px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-12 flex items-center gap-4">
            <span className="w-12 h-[2px] bg-primary"></span>
            About Me
          </h2>
          
          <div className="grid md:grid-cols-12 gap-12 items-start">
            {/* Photo Column */}
            <div className="md:col-span-4 lg:col-span-5 relative group">
              <div className="relative rounded-3xl overflow-hidden aspect-[4/5] border border-white/10 shadow-2xl bg-card/20">
                {/* Fallback pattern in case image isn't loaded yet */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />
                
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src="/profile.jpeg" 
                  alt="Harshal"
                  className="w-full h-full object-cover relative z-10 transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-primary/20 mix-blend-overlay group-hover:opacity-0 transition-opacity duration-500 z-20 pointer-events-none" />
              </div>
            </div>

            {/* Content Column */}
            <div className="md:col-span-8 lg:col-span-7 space-y-8">
              <div className="space-y-6 text-foreground/80 leading-relaxed text-lg">
                <p>
                  I'm a Unity Game Developer with experience building gameplay systems, AI behaviors, and optimized mobile game mechanics. I focus on creating engaging gameplay experiences while maintaining high performance across devices.
                </p>
                <p>
                  My work ranges from flight combat systems to casual puzzle games, and I enjoy building modular systems that are scalable and maintainable.
                </p>
                <p>
                  Beyond game development, I work with automation tools, backend APIs, and AI tools which help me build intelligent systems and improve development workflows.
                </p>
              </div>
              
              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/5">
                <div className="bg-card/30 border border-white/5 rounded-2xl p-5 backdrop-blur-sm relative overflow-hidden group hover:bg-card/50 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm text-foreground/50 mb-1">Location</h4>
                    <p className="font-medium">Ahmedabad, India</p>
                  </div>
                </div>
                
                <div className="bg-card/30 border border-white/5 rounded-2xl p-5 backdrop-blur-sm relative overflow-hidden group hover:bg-card/50 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 mb-4 group-hover:scale-110 transition-transform">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm text-foreground/50 mb-1">Education</h4>
                    <p className="font-medium">B.Tech CS</p>
                  </div>
                </div>
                
                <div className="bg-card/30 border border-white/5 rounded-2xl p-5 backdrop-blur-sm relative overflow-hidden group hover:bg-card/50 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-110 transition-transform">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm text-foreground/50 mb-1">Experience</h4>
                    <p className="font-medium">1+ Year Game Dev</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
