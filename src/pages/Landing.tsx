import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  Sparkles, 
  GitBranch, 
  Target, 
  Brain, 
  FileText, 
  Zap, 
  CheckCircle2, 
  Play, 
  Users, 
  TrendingUp,
  Menu,
  X
} from 'lucide-react';
import { Link } from "react-router-dom";

// --- Types ---
interface Feature {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
}

interface Step {
  id: number;
  title: string;
  desc: string;
}

// --- Mock Data ---
const FEATURES: Feature[] = [
  {
    id: '1',
    icon: Brain,
    title: "AI-Powered Roadmaps",
    description: "Stop guessing. Our engine analyzes industry trends to generate a hyper-personalized learning path tailored to your specific career goals.",
    color: "from-blue-500 to-cyan-400"
  },
  {
    id: '2',
    icon: GitBranch,
    title: "Interactive Skill Trees",
    description: "Visualize your journey. Unlock nodes as you progress, see dependencies between technologies, and understand the 'why' behind every skill.",
    color: "from-purple-500 to-pink-400"
  },
  {
    id: '3',
    icon: Target,
    title: "Milestone Tracking",
    description: "Gamify your growth. Earn badges, track streaks, and watch your progress bar fill up as you conquer real-world competencies.",
    color: "from-orange-500 to-amber-400"
  },
  {
    id: '4',
    icon: Sparkles,
    title: "Smart Mentor AI",
    description: "Stuck on a bug? Our integrated AI mentor explains concepts contextually based on exactly where you are in your roadmap.",
    color: "from-emerald-500 to-teal-400"
  },
  {
    id: '5',
    icon: FileText,
    title: "Auto-Resume Builder",
    description: "Turn your completed skills into a professionally formatted, ATS-friendly resume with one click when you're ready to apply.",
    color: "from-indigo-500 to-violet-400"
  },
  {
    id: '6',
    icon: Zap,
    title: "Project Portfolio",
    description: "Unlock curated capstone projects at each level. Build a portfolio that proves you can do the job, not just talk about it.",
    color: "from-rose-500 to-red-400"
  }
];

const STEPS: Step[] = [
  { id: 1, title: "Tell us your dream role", desc: "Frontend Dev? Data Scientist? UI Designer? Pick your path." },
  { id: 2, title: "Get your custom map", desc: "We break down the role into digestible, ordered milestones." },
  { id: 3, title: "Learn & Build", desc: "Follow the path, unlock projects, and track your mastery." }
];

const TESTIMONIALS = [
  { name: "Sarah L.", role: "Frontend Engineer @ Spotify", text: "I went from tutorial hell to my first job in 4 months. The roadmap kept me focused." },
  { name: "Mike R.", role: "Product Designer @ Airbnb", text: "The skill tree visualization is genius. It helped me understand what I was missing." },
  { name: "Jessica T.", role: "Full Stack Dev", text: "Finally, a platform that respects my time. No fluff, just pure value." }
];

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-950/80 backdrop-blur-md border-b border-slate-800 py-4' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <GitBranch className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            PathForge
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Features</a>
          <a href="#how-it-works" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">How it Works</a>
          <a href="#testimonials" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Stories</a>
          <button className="px-5 py-2.5 rounded-full bg-slate-800 text-white text-sm font-medium hover:bg-slate-700 transition-all border border-slate-700 hover:border-slate-600">
            Log In
          </button>


<Link
  to="/roadmap"
  className="px-5 py-2.5 rounded-full bg-white text-slate-950 text-sm font-bold hover:bg-slate-200 transition-all shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)] inline-block text-center"
>
  Get Started
</Link>

        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-slate-950 border-b border-slate-800 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              <a href="#features" className="text-slate-300">Features</a>
              <a href="#how-it-works" className="text-slate-300">How it Works</a>
              <button className="w-full py-3 rounded-lg bg-slate-800 text-white font-medium">Log In</button>
              <button className="w-full py-3 rounded-lg bg-white text-slate-950 font-bold">Get Started</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-slate-950">
      {/* Abstract Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px]" />
        <div className="absolute top-[20%] right-[20%] w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[100px]" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-sm font-medium mb-8 backdrop-blur-sm"
          >
            <Sparkles className="w-4 h-4" />
            <span>Trusted by 10,000+ career switchers</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-8 leading-[1.1]"
          >
            Escape <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Tutorial Hell.</span> <br />
            Forge Your Path.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            We don't just give you a list of links. We build a strategic, step-by-step 
            blueprint to take you from zero to hireable in your dream tech role.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button className="group relative px-8 py-4 rounded-full bg-white text-slate-950 font-bold text-lg overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.5)]">
              <Link
  to="/roadmap"
  className="px-5 py-2.5 rounded-full bg-white text-slate-950 text-sm font-bold hover:bg-slate-200 transition-all shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)] inline-block text-center"
>
  Get Started
</Link>
            </button>
            
            <button className="group px-8 py-4 rounded-full bg-slate-800/50 text-white font-medium text-lg border border-slate-700 hover:bg-slate-800 transition-all flex items-center gap-2 backdrop-blur-sm">
              <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                <Play className="w-3 h-3 fill-current" />
              </div>
              Watch Demo
            </button>
          </motion.div>

          {/* Social Proof Ticker */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="mt-20 pt-10 border-t border-slate-800/50"
          >
            <p className="text-slate-500 text-sm mb-6 uppercase tracking-widest font-semibold">Accelerated careers at</p>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
               {/* Simple text logos for demo purposes */}
               {['Google', 'Meta', 'Netflix', 'Spotify', 'Airbnb'].map((company) => (
                 <span key={company} className="text-xl font-bold text-slate-300">{company}</span>
               ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Features = () => {
  return (
    <section id="features" className="py-32 bg-slate-950 relative">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Everything you need to <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">get hired.</span>
          </h2>
          <p className="text-slate-400 text-lg">
            We stripped away the noise. No more "100 best resources" lists. 
            Just a focused, linear path to mastery.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature, idx) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group relative p-8 rounded-3xl bg-slate-900/50 border border-slate-800 hover:border-slate-600 transition-all duration-300 hover:bg-slate-800/50"
            >
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors">
                {feature.title}
              </h3>
              <p className="text-slate-400 leading-relaxed">
                {feature.description}
              </p>
              
              {/* Hover Glow Effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-32 bg-slate-900 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
      
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              How it works
            </h2>
            <div className="space-y-12">
              {STEPS.map((step, idx) => (
                <motion.div 
                  key={step.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.2 }}
                  className="flex gap-6"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-indigo-400 font-bold text-xl">
                    {step.id}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                    <p className="text-slate-400">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <button className="mt-12 px-8 py-3 rounded-full bg-indigo-600 text-white font-bold hover:bg-indigo-500 transition-colors shadow-[0_0_20px_-5px_rgba(79,70,229,0.5)]">
              Generate My Roadmap
            </button>
          </div>

          <div className="relative">
            {/* Abstract Visual Representation of App */}
            <div className="relative rounded-2xl overflow-hidden border border-slate-700 shadow-2xl bg-slate-950">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between mb-6">
                  <div className="h-4 w-32 bg-slate-800 rounded animate-pulse" />
                  <div className="h-8 w-8 bg-slate-800 rounded-full" />
                </div>
                {[1, 2, 3].map((i) => (
                  <div key={i} className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-lg ${i === 1 ? 'bg-green-500/20 text-green-400' : 'bg-slate-800 text-slate-500'} flex items-center justify-center`}>
                      {i === 1 ? <CheckCircle2 size={20} /> : <div className="w-5 h-5 rounded-full border-2 border-current" />}
                    </div>
                    <div className="flex-1">
                      <div className="h-3 w-3/4 bg-slate-800 rounded mb-2" />
                      <div className="h-2 w-1/2 bg-slate-800 rounded" />
                    </div>
                  </div>
                ))}
                
                <div className="mt-8 p-6 rounded-xl bg-gradient-to-br from-indigo-900/20 to-purple-900/20 border border-indigo-500/20">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white">
                      <Brain size={20} />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-indigo-300 mb-1">AI Suggestion</div>
                      <div className="text-xs text-slate-400">Based on your progress, you should focus on React Hooks next. It usually takes 3 days.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating Badge */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -bottom-6 -left-6 bg-slate-800 p-4 rounded-xl border border-slate-700 shadow-xl flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                <TrendingUp size={20} />
              </div>
              <div>
                <div className="text-xs text-slate-400">Weekly Progress</div>
                <div className="text-lg font-bold text-white">+24%</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-32 bg-slate-950">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-bold text-center text-white mb-16">
          Loved by career switchers
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800 relative"
            >
              <div className="text-4xl text-indigo-500 absolute top-6 right-8 opacity-20 font-serif">"</div>
              <p className="text-slate-300 mb-6 relative z-10 italic">{t.text}</p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-700 to-slate-600 flex items-center justify-center text-white font-bold">
                  {t.name[0]}
                </div>
                <div>
                  <div className="text-white font-bold text-sm">{t.name}</div>
                  <div className="text-slate-500 text-xs">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTA = () => {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-indigo-950/30" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-600/20 rounded-full blur-[120px]" />
      
      <div className="container mx-auto px-6 relative z-10 text-center">
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
          Ready to build your future?
        </h2>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-12">
          Join thousands of others who stopped scrolling and started building. 
          Your personalized roadmap is waiting.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <button className="px-10 py-5 rounded-full bg-white text-slate-950 font-bold text-lg hover:scale-105 transition-transform shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]">
            Get Started for Free
          </button>
          <div className="flex items-center gap-2 text-slate-400 text-sm">
            <Users size={16} />
            <span>No credit card required</span>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
                <GitBranch className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold text-white">PathForge</span>
            </div>
            <p className="text-slate-500 max-w-sm">
              The intelligent career platform for the modern workforce. 
              We help you navigate the chaos of tech learning.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6">Product</h4>
            <ul className="space-y-4 text-slate-500 text-sm">
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Roadmaps</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Mentor AI</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Community</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Pricing</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6">Company</h4>
            <ul className="space-y-4 text-slate-500 text-sm">
              <li><a href="#" className="hover:text-indigo-400 transition-colors">About</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-600 text-sm">
            © 2026 PathForge Inc. All rights reserved.
          </p>
          <div className="flex gap-6">
             {/* Social placeholders */}
             <div className="w-5 h-5 bg-slate-800 rounded-full hover:bg-indigo-500 transition-colors cursor-pointer" />
             <div className="w-5 h-5 bg-slate-800 rounded-full hover:bg-indigo-500 transition-colors cursor-pointer" />
             <div className="w-5 h-5 bg-slate-800 rounded-full hover:bg-indigo-500 transition-colors cursor-pointer" />
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Main App Component ---
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-indigo-500/30 font-sans">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
