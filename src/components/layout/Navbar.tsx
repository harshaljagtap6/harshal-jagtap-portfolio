"use client";

import { useState, useEffect } from "react";
import { useRole } from "@/app/providers";
import { Gamepad2, BrainCircuit, Menu, X } from "lucide-react";

const navLinks = [
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Resume Center", href: "#resume-center" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const { role, toggleRole } = useRole();
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? role === "game"
            ? "bg-[#050508]/85 border-b border-cyan-500/10 backdrop-blur-md shadow-[0_4px_30px_rgba(0,240,255,0.05)] py-3"
            : "bg-[#030712]/90 border-b border-emerald-500/10 backdrop-blur-md shadow-[0_4px_30px_rgba(16,185,129,0.05)] py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="w-full mx-auto max-w-5xl px-6 flex justify-between items-center">
        {/* Brand Logo */}
        <a
          href="#"
          className={`text-xl font-bold tracking-wider transition-all duration-300 flex items-center gap-1.5 font-theme-title whitespace-nowrap ${
            role === "game"
              ? "text-cyan-400 [text-shadow:0_0_8px_rgba(0,240,255,0.4)]"
              : "text-emerald-400"
          }`}
        >
          {role === "game" ? (
            <>
              <Gamepad2 className="w-5 h-5 animate-pulse text-purple-400" />
              <span>HARSHAL</span>
              <span className="text-purple-400">.</span>
              <span className="text-xs text-cyan-400/70 border border-cyan-400/30 px-1 py-0.5 rounded ml-1 tracking-normal font-sans font-normal">HUD</span>
            </>
          ) : (
            <>
              <BrainCircuit className="w-5 h-5 text-blue-400" />
              <span>&gt;HARSHAL</span>
              <span className="text-blue-400">.exe</span>
            </>
          )}
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`text-sm font-medium tracking-wide transition-colors duration-300 hover:text-white whitespace-nowrap ${
                role === "game" ? "font-theme-title text-cyan-400/80" : "font-mono text-emerald-400/80"
              }`}
            >
              {role === "ai" && <span className="text-blue-400 mr-0.5">&gt;</span>}
              {link.name === "Resume Center" ? "Resumes" : link.name}
            </a>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="hidden lg:flex items-center gap-4">
          {/* Mini-Switcher */}
          <button
            onClick={toggleRole}
            className={`p-1.5 rounded-full border transition-all duration-500 flex items-center gap-2 cursor-pointer ${
              role === "game"
                ? "bg-[#0c0c14] border-cyan-500/30 text-cyan-400 shadow-[0_0_10px_rgba(0,240,255,0.1)] hover:border-cyan-400"
                : "bg-[#0b1329] border-emerald-500/30 text-emerald-400 hover:border-emerald-400"
            }`}
            title={`Switch to ${role === "game" ? "AI Automation" : "Game Dev"} Mode`}
          >
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                role === "game" ? "bg-cyan-500 text-black scale-110" : "bg-emerald-500 text-black scale-110"
              }`}
            >
              {role === "game" ? <Gamepad2 className="w-3.5 h-3.5" /> : <BrainCircuit className="w-3.5 h-3.5" />}
            </div>
            <span className="text-xs font-semibold pr-2 select-none font-mono">
              {role === "game" ? "GAME DEV" : "AI AUTO"}
            </span>
          </button>

          <a
            href="#contact"
            className={`px-5 py-1.5 border rounded-full transition-all duration-500 text-sm font-semibold tracking-wide whitespace-nowrap ${
              role === "game"
                ? "border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black font-theme-title hover:shadow-[0_0_15px_rgba(0,240,255,0.4)]"
                : "border-emerald-500 text-emerald-400 hover:bg-emerald-500 hover:text-black font-mono"
            }`}
          >
            {role === "game" ? "LET'S PLAY" : "INIT_CONNECT"}
          </a>
        </div>

        {/* Mobile Controls */}
        <div className="flex lg:hidden items-center gap-3">
          {/* Mobile Theme Toggle */}
          <button
            onClick={toggleRole}
            className={`p-2 rounded-lg border transition-colors ${
              role === "game"
                ? "bg-[#0c0c14] border-cyan-500/30 text-cyan-400"
                : "bg-[#0b1329] border-emerald-500/30 text-emerald-400"
            }`}
            title="Toggle Mode"
          >
            {role === "game" ? <Gamepad2 className="w-4 h-4" /> : <BrainCircuit className="w-4 h-4" />}
          </button>

          {/* Menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`p-2 rounded-lg border transition-colors ${
              role === "game" ? "border-cyan-500/20 text-cyan-400" : "border-emerald-500/20 text-emerald-400"
            }`}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div
          className={`absolute top-full left-0 w-full border-t border-white/5 py-6 px-8 flex flex-col gap-4 shadow-2xl transition-all duration-300 lg:hidden ${
            role === "game" ? "bg-[#050508]/95 border-cyan-500/10" : "bg-[#030712]/98 border-emerald-500/10"
          }`}
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`text-base font-medium py-2 border-b border-white/5 transition-colors ${
                role === "game" ? "font-theme-title text-cyan-400 hover:text-white" : "font-mono text-emerald-400 hover:text-white"
              }`}
            >
              {role === "ai" && <span className="text-blue-400 mr-1">&gt;</span>}
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setIsOpen(false)}
            className={`w-full py-3 mt-2 border text-center rounded-xl font-semibold transition-all ${
              role === "game"
                ? "border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black font-theme-title"
                : "border-emerald-500 text-emerald-400 hover:bg-emerald-500 hover:text-black font-mono"
            }`}
          >
            {role === "game" ? "START CHAT" : "INIT_CONNECT"}
          </a>
        </div>
      )}
    </header>
  );
}
