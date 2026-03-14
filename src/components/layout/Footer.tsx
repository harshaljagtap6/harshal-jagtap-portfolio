import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-8 border-t border-card mt-auto">
      <div className="container mx-auto max-w-5xl px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm text-foreground/60">
          © {new Date().getFullYear()} Harshal Jagtap. All rights reserved.
        </p>
        
        <div className="flex items-center gap-6">
          <a href="https://github.com/harshaljagtap6" target="_blank" rel="noopener noreferrer" className="text-foreground/60 hover:text-primary transition-colors">
            <Github className="w-5 h-5" />
          </a>
          <a href="https://linkedin.com/in/harshaljagtap6" target="_blank" rel="noopener noreferrer" className="text-foreground/60 hover:text-primary transition-colors">
            <Linkedin className="w-5 h-5" />
          </a>
          <a href="mailto:harshaljagtap6@gmail.com" className="text-foreground/60 hover:text-primary transition-colors">
            <Mail className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
