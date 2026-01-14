import { Layout } from "@/components/Layout";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

export default function About() {
  const points = [
    "Learn what to apply immediately in your day-to-day",
    "Know what emerging tech noise to safely ignore",
    "Think clearly and strategically in the age of AI"
  ];

  return (
    <Layout>
      <div className="max-w-2xl mx-auto mt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">About Ctrl + G</h1>
          
          <div className="prose-custom prose-lg mb-12">
            <p className="text-xl text-foreground font-medium leading-relaxed mb-8">
              Most people don’t need more tools. They need clarity. 
              Ctrl + G exists to help people move from copying workflows blindly to growing intentionally — using technology that actually works in real jobs.
            </p>
            
            <p className="text-muted-foreground">
              We live in an era of tool overload. Every week there's a new app, a new AI model, a new framework. It's exhausting to keep up, and frankly, most of it isn't worth your time. 
            </p>
            
            <p className="text-muted-foreground">
              This site is a collection of notes, guides, and essays on navigating modern work with better leverage. It's for the analyst stuck in Excel, the manager overwhelmed by Slack, and the creative trying to make sense of generative AI.
            </p>
          </div>

          <div className="bg-secondary/30 rounded-2xl p-8 mb-12">
            <h3 className="text-lg font-bold mb-6">Our Promise</h3>
            <ul className="space-y-4">
              {points.map((point, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="mt-1 bg-primary text-primary-foreground rounded-full p-0.5">
                    <Check className="w-3 h-3" />
                  </div>
                  <span className="text-foreground font-medium">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}
