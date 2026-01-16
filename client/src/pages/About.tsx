import { Layout } from "@/components/Layout";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

export default function About() {
  const points = [
    "Practical ideas you can use immediately at work",
    "Clear judgment on what tech is useful vs just hype",
    "A calmer, more intentional way to work with AI and automation",
  ];

  return (
    <Layout>
      <div className="max-w-2xl mx-auto mt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">
            About Ctrl + G
          </h1>

          <div className="prose-custom prose-lg mb-12">
            <p className="text-xl text-foreground font-medium leading-relaxed mb-8">
              Ctrl + G is a personal space about working smarter — not louder.
              It’s built for people who actually do the work, not just talk about tools.
            </p>

            <p className="text-muted-foreground">
              I spend most of my time inside real systems — Excel sheets,
              internal dashboards, approval flows, messy processes, and
              half-working tools. Over time, one thing became clear:
              productivity isn’t about knowing more software. It’s about
              knowing what <em>not</em> to use.
            </p>

            <p className="text-muted-foreground">
              This site is where I write about that thinking. Automation that
              saves mental energy. AI that supports decisions instead of
              replacing judgment. Simple systems that survive real-world
              constraints like deadlines, people, and imperfect data.
            </p>

            <p className="text-muted-foreground">
              You won’t find “10 tools you must use” lists here. You’ll find
              lessons from building, breaking, and fixing workflows — and from
              learning the hard way what actually compounds over time.
            </p>
          </div>

          <div className="bg-secondary/30 rounded-2xl p-8 mb-12">
            <h3 className="text-lg font-bold mb-6">What to Expect</h3>
            <ul className="space-y-4">
              {points.map((point, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="mt-1 bg-primary text-primary-foreground rounded-full p-0.5">
                    <Check className="w-3 h-3" />
                  </div>
                  <span className="text-foreground font-medium">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}
