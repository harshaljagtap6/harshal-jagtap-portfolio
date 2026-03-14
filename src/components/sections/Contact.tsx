"use client";
import { motion } from "framer-motion";
import { Mail, Phone, Github, Linkedin, Send } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-primary/5 rounded-full blur-[100px] -z-10 pointer-events-none" />
      
      <div className="container mx-auto px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid md:grid-cols-2 gap-16">
            
            {/* Contact Info */}
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Let's build something <span className="text-primary">great</span>.</h2>
              <p className="text-foreground/70 mb-10 text-lg leading-relaxed max-w-md">
                I'm currently looking for new opportunities. Whether you have a question, a game idea, or just want to say hi, I'll try my best to get back to you!
              </p>
              
              <div className="space-y-6">
                <a href="mailto:harshaljagtap6@gmail.com" className="flex items-center gap-4 text-foreground/80 hover:text-primary transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-card/50 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <span className="text-lg">harshaljagtap6@gmail.com</span>
                </a>
                
                <a href="tel:+917069046712" className="flex items-center gap-4 text-foreground/80 hover:text-primary transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-card/50 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                    <Phone className="w-5 h-5" />
                  </div>
                  <span className="text-lg">+91 7069046712</span>
                </a>
                
                <div className="flex gap-4 pt-4">
                  <a href="https://github.com/harshaljagtap6" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-card/50 flex items-center justify-center hover:bg-card hover:text-primary transition-all">
                    <Github className="w-5 h-5" />
                  </a>
                  <a href="https://linkedin.com/in/harshaljagtap6" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-card/50 flex items-center justify-center hover:bg-card hover:text-primary transition-all">
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-card/30 border border-white/5 rounded-3xl p-8 backdrop-blur-sm">
              <form 
                action="https://formsubmit.co/harshaljagtap6@gmail.com" 
                method="POST" 
                className="space-y-6"
              >
                {/* FormSubmit Configuration Fields */}
                <input type="hidden" name="_subject" value="New Message from Portfolio Website!" />
                <input type="hidden" name="_template" value="box" /> {/* Better email styling */}

                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground/80 mb-2">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name"
                    required
                    className="w-full bg-background/50 border border-white/5 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground/80 mb-2">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email"
                    required
                    className="w-full bg-background/50 border border-white/5 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground/80 mb-2">Message</label>
                  <textarea 
                    id="message" 
                    name="message"
                    required
                    rows={4}
                    className="w-full bg-background/50 border border-white/5 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow resize-none"
                    placeholder="Your message here..."
                  ></textarea>
                </div>
                <button 
                  type="submit"
                  className="w-full bg-primary text-background font-semibold py-4 rounded-xl hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
                >
                  Send Message <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
