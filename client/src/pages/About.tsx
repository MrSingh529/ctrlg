import { Layout } from "@/components/Layout";
import { motion } from "framer-motion";
import { Check, User, Briefcase, Zap, Mail, Linkedin } from "lucide-react";
import { Helmet } from "react-helmet-async";

export default function About() {
  const points = [
    "Practical ideas you can use immediately at work",
    "Clear judgment on what tech is useful vs just hype",
    "A calmer, more intentional way to work with AI and automation",
  ];

  return (
    <Layout>
      <Helmet>
        <title>About Ctrl + G — Excel, Automation & Practical AI</title>
        <meta
          name="description"
          content="About Ctrl + G, an independent writing project by Harpinder Singh focused on Excel automation, applied AI, and practical work systems."
        />
      </Helmet>

      <div className="max-w-4xl mx-auto mt-8 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* About Ctrl + G Section */}
          <section className="mb-16">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">
              About Ctrl + G
            </h1>

            <div className="prose-custom prose-lg mb-12">
              <p className="text-xl text-foreground font-medium leading-relaxed mb-8">
                Ctrl + G is a personal space about working smarter — not louder.
                It's built for people who actually do the work, not just talk about tools.
              </p>

              <p className="text-muted-foreground mb-6">
                <strong>Ctrl + G</strong> is an independent personal blog and writing project
                by <strong>Harpinder Singh</strong>, focused on practical work systems,
                Excel automation, and applied AI.
              </p>

              <p className="text-muted-foreground">
                I spend most of my time inside real systems — Excel sheets,
                internal dashboards, approval flows, messy processes, and
                half-working tools. Over time, one thing became clear:
                productivity isn't about knowing more software. It's about
                knowing what <em>not</em> to use.
              </p>

              <p className="text-muted-foreground">
                This site is where I write about that thinking. Automation that
                saves mental energy. AI that supports decisions instead of
                replacing judgment. Simple systems that survive real-world
                constraints like deadlines, people, and imperfect data.
              </p>

              <p className="text-muted-foreground">
                You won't find "10 tools you must use" lists here. You'll find
                lessons from building, breaking, and fixing workflows — and from
                learning the hard way what actually compounds over time.
              </p>
            </div>
          </section>

          {/* About the Author Section */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-primary/10 rounded-lg">
                <User className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-3xl font-bold">About the Author</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              {/* Author Info Card */}
              <div className="lg:col-span-1">
                <div className="bg-card border rounded-2xl p-6 sticky top-24">
                  <div className="space-y-6">
                    {/* Profile Picture */}
                    <div className="flex flex-col items-center">
                      <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-2 border-primary/20">
                        <img 
                          src="/harpinder.jpg" 
                          alt="Harpinder Singh"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="text-center">
                        <h3 className="text-2xl font-bold">Harpinder Singh</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Writer • Automation Builder • Executive Assistant
                        </p>
                      </div>
                    </div>

                    {/* Roles */}
                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-2 justify-center">
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                          <Briefcase className="w-3 h-3" /> Writer
                        </span>
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                          <Zap className="w-3 h-3" /> Automation Builder
                        </span>
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                          <Briefcase className="w-3 h-3" /> Executive Assistant
                        </span>
                      </div>
                    </div>

                    {/* Social Links */}
                    <div className="pt-4 border-t">
                      <p className="text-sm font-medium mb-3 text-center">Connect</p>
                      <div className="flex justify-center gap-4">
                        <a
                          href="https://www.linkedin.com/in/harpindersingh99bab81a1/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          <Linkedin className="w-4 h-4" />
                          <span>LinkedIn</span>
                        </a>
                        <span className="text-muted-foreground">•</span>
                        <a
                          href="mailto:harpindersingh529@gmail.com"
                          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          <Mail className="w-4 h-4" />
                          <span>Email</span>
                        </a>
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <p className="text-sm text-muted-foreground text-center">
                        <strong>Ctrl + G</strong> is independently published and maintained by
                        <strong> Harpinder Singh</strong>. Based in India.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Author Bio */}
              <div className="lg:col-span-2">
                <div className="space-y-6">
                  <div className="prose-custom prose-lg">
                    <p className="text-foreground">
                      By profession, I work as an <strong>Executive Assistant at RV Solutions Pvt. Ltd.</strong>, where my role goes far beyond calendars and coordination. I actively design and automate workflows using tools like Excel, Python, Microsoft 365, and internal systems to reduce manual effort and improve operational clarity.
                    </p>

                    <p className="text-foreground">
                      Most of the ideas on <strong>Ctrl + G</strong> come from this environment:
                    </p>

                    <ul className="space-y-3 my-6">
                      <li className="flex items-start gap-3">
                        <div className="mt-1 bg-primary text-primary-foreground rounded-full p-0.5">
                          <Check className="w-3 h-3" />
                        </div>
                        <span>Working inside live business processes</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="mt-1 bg-primary text-primary-foreground rounded-full p-0.5">
                          <Check className="w-3 h-3" />
                        </div>
                        <span>Automating repetitive tasks</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="mt-1 bg-primary text-primary-foreground rounded-full p-0.5">
                          <Check className="w-3 h-3" />
                        </div>
                        <span>Supporting decision-making with cleaner data</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="mt-1 bg-primary text-primary-foreground rounded-full p-0.5">
                          <Check className="w-3 h-3" />
                        </div>
                        <span>Seeing firsthand what actually works — and what doesn't</span>
                      </li>
                    </ul>

                    <p className="text-foreground">
                      <strong>Ctrl + G</strong> is where these experiences are distilled into clear writing for others facing the same problems.
                    </p>

                    {/* Contact CTA */}
                    <div className="mt-8 p-6 bg-primary/5 rounded-xl">
                      <h4 className="font-bold mb-2">Want to connect?</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        I'm always open to discussing automation, productivity, or potential collaborations.
                      </p>
                      <div className="flex flex-wrap gap-3">
                        <a
                          href="https://www.linkedin.com/in/harpindersingh99bab81a1/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                        >
                          <Linkedin className="w-4 h-4" />
                          Connect on LinkedIn
                        </a>
                        <a
                          href="mailto:harpindersingh529@gmail.com"
                          className="inline-flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg text-sm font-medium hover:bg-secondary/80 transition-colors"
                        >
                          <Mail className="w-4 h-4" />
                          Send an Email
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* What to Expect Section */}
          <section>
            <div className="bg-secondary/30 rounded-2xl p-8">
              <h3 className="text-xl font-bold mb-6">What to Expect</h3>
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
          </section>
        </motion.div>
      </div>
    </Layout>
  );
}