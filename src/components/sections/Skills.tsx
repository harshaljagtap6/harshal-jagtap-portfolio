"use client";
import { motion } from "framer-motion";

const skills = [
  {
    category: "Game Development",
    items: ["Unity Engine", "URP", "DOTween", "Dreamteck Splines", "Object Pooling", "Game AI", "Mobile Optimization"]
  },
  {
    category: "Programming",
    items: ["C#", "Python", "C++", "JavaScript", "SQL"]
  },
  {
    category: "AI & Tools",
    items: ["Prompt Engineering", "ChatGPT", "Claude", "Cursor AI"]
  },
  {
    category: "Machine Learning",
    items: ["TensorFlow", "PyTorch", "Scikit-learn", "Pandas", "NumPy"]
  },
  {
    category: "Backend",
    items: ["FastAPI", "Flask", "Django", "REST APIs"]
  },
  {
    category: "Automation & DevOps",
    items: ["Docker", "n8n", "Cloudflare Tunnel", "PostgreSQL", "MongoDB", "MySQL", "SQLite"]
  }
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 bg-card/10">
      <div className="container mx-auto px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-12 flex items-center gap-4">
            <span className="w-12 h-[2px] bg-primary"></span>
            Skills & Tech
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skillGroup, idx) => (
              <motion.div
                key={skillGroup.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-card/40 border border-white/5 rounded-2xl p-6 hover:bg-card/60 transition-colors"
              >
                <h3 className="text-lg font-semibold mb-4 text-primary/90">{skillGroup.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((item) => (
                    <span 
                      key={item} 
                      className="px-3 py-1 bg-background/50 text-foreground/80 rounded-full text-sm border border-white/5"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
