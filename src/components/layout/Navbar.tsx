"use client";
import { useState, useEffect } from "react";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-md shadow-md py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto max-w-5xl px-6 flex justify-between items-center">
        <a href="#" className="text-xl font-bold tracking-tighter text-foreground">
          HJ<span className="text-primary">.</span>
        </a>
        
        <nav className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>
        
        <a
          href="#contact"
          className="hidden md:inline-flex items-center justify-center px-6 py-2 border border-primary text-primary rounded-full hover:bg-primary hover:text-background transition-colors text-sm font-medium"
        >
          Let's Talk
        </a>
      </div>
    </header>
  );
}
