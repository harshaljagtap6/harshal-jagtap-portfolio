"use client";

import { motion } from "framer-motion";
import { useRole } from "@/app/providers";
import { Mail, Phone, Github, Linkedin, Send, Terminal, Sparkles } from "lucide-react";

export default function Contact() {
  const { role } = useRole();

  const titlePrefix = role === "game" ? "Ready to launch" : "Initiate a";
  const titleHighlight = role === "game" ? "your next project?" : "data connection";
  
  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background radial overlays */}
      <div className={`absolute top-0 right-0 w-[40rem] h-[40rem] rounded-full blur-[120px] -z-10 pointer-events-none transition-colors duration-500 ${
        role === "game" ? "bg-cyan-500/5" : "bg-emerald-500/3"
      }`} />
      
      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
            
            {/* Left Column: Contact Info */}
            <div className="flex flex-col justify-between">
              <div>
                <h2 className="text-3xl md:text-5xl font-black mb-6 font-theme-title leading-tight">
                  {titlePrefix}{" "}
                  <span className={role === "game" ? "text-cyan-400 [text-shadow:0_0_8px_rgba(0,240,255,0.3)]" : "text-emerald-400"}>
                    {titleHighlight}
                  </span>
                </h2>
                
                <p className="text-foreground/70 mb-10 text-base md:text-lg leading-relaxed max-w-md">
                  I'm currently open to freelance opportunities, contract roles, and full-time employment. Whether you have a complex game system to architect or a workflow process to automate, let's talk!
                </p>
                
                <div className="space-y-5">
                  <a
                    href="mailto:harshaljagtap6@gmail.com"
                    className="flex items-center gap-4 text-foreground/80 hover:text-white transition-colors group"
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-300 ${
                      role === "game"
                        ? "bg-[#0c0c14] border-cyan-500/20 text-cyan-400 group-hover:border-cyan-400"
                        : "bg-[#0b1329] border-emerald-500/20 text-emerald-400 group-hover:border-emerald-400"
                    }`}>
                      <Mail className="w-5 h-5" />
                    </div>
                    <span className="text-sm md:text-base font-mono">harshaljagtap6@gmail.com</span>
                  </a>
                  
                  <a
                    href="tel:+917069046712"
                    className="flex items-center gap-4 text-foreground/80 hover:text-white transition-colors group"
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-300 ${
                      role === "game"
                        ? "bg-[#0c0c14] border-cyan-500/20 text-cyan-400 group-hover:border-cyan-400"
                        : "bg-[#0b1329] border-emerald-500/20 text-emerald-400 group-hover:border-emerald-400"
                    }`}>
                      <Phone className="w-5 h-5" />
                    </div>
                    <span className="text-sm md:text-base font-mono">+91 7069046712</span>
                  </a>
                </div>
              </div>

              {/* Social profile grids */}
              <div className="mt-12">
                <span className="text-[10px] text-foreground/35 uppercase font-mono tracking-widest block mb-4">
                  {role === "game" ? "HUD_CHANNELS" : "API_ENDPOINTS"}
                </span>
                <div className="flex gap-4">
                  <a
                    href="https://github.com/harshaljagtap6"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-all duration-300 ${
                      role === "game"
                        ? "bg-card/40 border-white/5 hover:border-cyan-400 hover:text-cyan-400"
                        : "bg-card/40 border-white/5 hover:border-emerald-400 hover:text-emerald-400"
                    }`}
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <a
                    href="https://linkedin.com/in/harshaljagtap6"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-all duration-300 ${
                      role === "game"
                        ? "bg-card/40 border-white/5 hover:border-cyan-400 hover:text-cyan-400"
                        : "bg-card/40 border-white/5 hover:border-emerald-400 hover:text-emerald-400"
                    }`}
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div className={`bg-[#0d0d12]/50 border backdrop-blur-md p-8 rounded-3xl transition-all duration-500 ${
              role === "game"
                ? "border-cyan-500/20 hover:border-cyan-500/40 hover:shadow-[0_0_20px_rgba(0,240,255,0.06)] pixel-corners"
                : "border-emerald-500/20 hover:border-emerald-500/40 hover:shadow-[0_0_20px_rgba(16,185,129,0.06)]"
            }`}>
              
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
                <span className="text-[10px] text-foreground/40 font-mono flex items-center gap-1.5">
                  {role === "game" ? (
                    <>
                      <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                      <span>MISSION_FORM_CONTROL</span>
                    </>
                  ) : (
                    <>
                      <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                      <span>POST_payload.sh</span>
                    </>
                  )}
                </span>
                <span className="text-[9px] text-foreground/30 font-mono">
                  {role === "game" ? "SECURE HUD v2" : "Cloudflare Tunnels ON"}
                </span>
              </div>

              <form 
                action="https://formsubmit.co/harshaljagtap6@gmail.com" 
                method="POST" 
                className="space-y-5"
              >
                {/* FormSubmit Configuration */}
                <input type="hidden" name="_subject" value={`New Contact from Portfolio (${role.toUpperCase()})`} />
                <input type="hidden" name="_template" value="box" />

                <div>
                  <label 
                    htmlFor="name" 
                    className={`block text-xs font-semibold mb-2 font-mono ${role === "game" ? "text-cyan-400" : "text-foreground/60"}`}
                  >
                    {role === "game" ? "PILOT_NAME" : "NAME"}
                  </label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name"
                    required
                    className={`w-full bg-[#050508]/60 border rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 transition-all duration-300 ${
                      role === "game"
                        ? "border-cyan-500/30 focus:border-cyan-400 focus:ring-cyan-400/50"
                        : "border-white/5 focus:border-emerald-500 focus:ring-emerald-500/50 font-mono"
                    }`}
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label 
                    htmlFor="email" 
                    className={`block text-xs font-semibold mb-2 font-mono ${role === "game" ? "text-cyan-400" : "text-foreground/60"}`}
                  >
                    {role === "game" ? "COMMS_CHANNEL_EMAIL" : "EMAIL"}
                  </label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email"
                    required
                    className={`w-full bg-[#050508]/60 border rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 transition-all duration-300 ${
                      role === "game"
                        ? "border-cyan-500/30 focus:border-cyan-400 focus:ring-cyan-400/50"
                        : "border-white/5 focus:border-emerald-500 focus:ring-emerald-500/50 font-mono"
                    }`}
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label 
                    htmlFor="message" 
                    className={`block text-xs font-semibold mb-2 font-mono ${role === "game" ? "text-cyan-400" : "text-foreground/60"}`}
                  >
                    {role === "game" ? "TRANSMISSION_DETAILS" : "MESSAGE"}
                  </label>
                  <textarea 
                    id="message" 
                    name="message"
                    required
                    rows={4}
                    className={`w-full bg-[#050508]/60 border rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 transition-all duration-300 resize-none ${
                      role === "game"
                        ? "border-cyan-500/30 focus:border-cyan-400 focus:ring-cyan-400/50"
                        : "border-white/5 focus:border-emerald-500 focus:ring-emerald-500/50 font-mono"
                    }`}
                    placeholder="Hello Harshal, I'd like to collaborate on..."
                  />
                </div>

                <button 
                  type="submit"
                  className={`w-full py-4 rounded-xl font-bold text-xs tracking-wider flex items-center justify-center gap-2.5 transition-all duration-300 cursor-pointer ${
                    role === "game"
                      ? "bg-cyan-500 text-black hover:bg-cyan-400 font-theme-title shadow-[0_4px_15px_rgba(0,240,255,0.2)] hover:shadow-[0_4px_25px_rgba(0,240,255,0.4)]"
                      : "bg-emerald-500 text-black hover:bg-emerald-400 font-mono shadow-[0_4px_15px_rgba(16,185,129,0.2)] hover:shadow-[0_4px_25px_rgba(16,185,129,0.4)]"
                  }`}
                >
                  <span>{role === "game" ? "LAUNCH SIGNAL" : "SUBMIT_PAYLOAD.sh"}</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
