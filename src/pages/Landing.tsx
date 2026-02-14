import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Sparkles,
  GitBranch,
  Target,
  Brain,
  FileText,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Brain,
    title: "Clear Career Roadmaps",
    description:
      "Type in your dream role — like “Frontend Developer” — and get a structured roadmap showing exactly what to learn first, next, and later.",
  },
  {
    icon: GitBranch,
    title: "Interactive Skill Trees",
    description:
      "Click into every skill. See what it actually means. Understand why it matters. No fluff. No vague advice.",
  },
  {
    icon: Target,
    title: "Track Real Progress",
    description:
      "Check off what you’ve learned and see how far you’ve come — and what’s still ahead.",
  },
  {
    icon: Sparkles,
    title: "On-Demand Mentor Chat",
    description:
      "Stuck or confused? Ask questions anytime. It’s like having a career-savvy friend who never gets tired.",
  },
  {
    icon: FileText,
    title: "Resume Builder",
    description:
      "When you're ready to apply, turn your completed skills into a clean, structured resume in seconds.",
  },
  {
    icon: Zap,
    title: "Project Unlocks",
    description:
      "As you level up, unlock practical projects that prove you can actually do the job — not just talk about it.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 glass-card border-b">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
              <GitBranch className="w-4 h-4 text-primary" />
            </div>
            <span className="font-bold text-lg text-foreground">
              PathForge
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <Link to="/roadmap">
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground"
              >
                Dashboard
              </Button>
            </Link>

            <Link to="/roadmap">
              <Button
                size="sm"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Build My Roadmap
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Glow effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/3 w-[300px] h-[300px] rounded-full bg-accent/5 blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial="hidden"
            animate="visible"
          >
            <motion.div
              variants={fadeUp}
              custom={0}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium mb-8"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Stop guessing what to learn next
            </motion.div>

            <motion.h1
              variants={fadeUp}
              custom={1}
              className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6"
            >
              Finally, a clear path to your{" "}
              <span className="gradient-text">dream job</span>.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-10"
            >
              Tell us the job you want. We’ll break it down into the exact
              skills you need — in the right order — so you can stop watching
              random tutorials and start making real progress.
            </motion.p>

            <motion.div
              variants={fadeUp}
              custom={3}
              className="flex items-center justify-center gap-4"
            >
              <Link to="/roadmap">
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 glow px-8 h-12 text-base font-semibold"
                >
                  Show Me My Path
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeUp}
              custom={0}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Everything you need — nothing you don’t
            </motion.h2>

            <motion.p
              variants={fadeUp}
              custom={1}
              className="text-muted-foreground text-lg max-w-md mx-auto"
            >
              No overwhelming course lists. No vague advice. Just a clear,
              structured plan.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                variants={fadeUp}
                custom={i}
                className="glass-card rounded-xl p-6 hover:border-primary/30 transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <f.icon className="w-5 h-5 text-primary" />
                </div>

                <h3 className="font-semibold text-foreground mb-2">
                  {f.title}
                </h3>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {f.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card gradient-border rounded-2xl p-12 text-center max-w-2xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-4">
              Still figuring things out?
            </h2>

            <p className="text-muted-foreground mb-8">
              Start with the job you want. We’ll help you map the rest.
            </p>

            <Link to="/roadmap">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 glow px-8"
              >
                Build My Roadmap
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © 2026 PathForge — Built for people tired of career guesswork.
        </div>
      </footer>
    </div>
  );
};

export default Landing;
