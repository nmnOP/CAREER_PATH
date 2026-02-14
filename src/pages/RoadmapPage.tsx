import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Sparkles, Search, BarChart3, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import SkillTreeGraph from "@/components/SkillTreeGraph";
import { type Roadmap, type SkillNode } from "@/lib/roadmap-data";

export default function RoadmapPage() {
  const [dreamJob, setDreamJob] = useState("");
  const [roadmap, setRoadmap] = useState<Roadmap | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!dreamJob.trim()) return;
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("generate-roadmap", {
        body: { dreamJob: dreamJob.trim() },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      setRoadmap({
        id: crypto.randomUUID(),
        title: data.title || dreamJob.trim(),
        dreamJob: dreamJob.trim(),
        createdAt: new Date().toISOString(),
        nodes: data.nodes,
      });
    } catch (err: any) {
      console.error("Roadmap generation failed:", err);
      toast({
        title: "Generation failed",
        description: err.message || "Could not generate roadmap. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateNode = useCallback((nodeId: string, updates: Partial<SkillNode>) => {
    setRoadmap((prev) => {
      if (!prev) return prev;
      const updatedNodes = prev.nodes.map((n) => {
        if (n.id === nodeId) {
          const updated = { ...n, ...updates };
          // If completed, unlock children
          if (updates.status === "completed") {
            return updated;
          }
          return updated;
        }
        return n;
      });

      // Unlock children of completed nodes
      if (updates.status === "completed") {
        const completedNode = updatedNodes.find((n) => n.id === nodeId);
        if (completedNode) {
          completedNode.children.forEach((childId) => {
            const child = updatedNodes.find((n) => n.id === childId);
            if (child && child.status === "locked") {
              // Check if all parents are completed
              const parents = updatedNodes.filter((n) => n.children.includes(childId));
              const allParentsDone = parents.every((p) => p.status === "completed" || p.id === nodeId);
              if (allParentsDone) {
                child.status = "active";
              }
            }
          });
        }
      }

      return { ...prev, nodes: updatedNodes };
    });
  }, []);

  const totalNodes = roadmap?.nodes.length || 0;
  const completedNodes = roadmap?.nodes.filter((n) => n.status === "completed").length || 0;
  const overallProgress = totalNodes > 0 ? Math.round((completedNodes / totalNodes) * 100) : 0;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="glass-card border-b sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between h-14 px-4">
          <div className="flex items-center gap-3">
            <Link to="/">
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <h1 className="font-semibold text-foreground">
              {roadmap ? roadmap.title : "Career Roadmap"}
            </h1>
          </div>
          {roadmap && (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-primary" />
                <span className="text-sm text-muted-foreground">
                  {completedNodes}/{totalNodes} skills
                </span>
              </div>
              <div className="w-24 h-2 rounded-full bg-muted overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-node-completed"
                  initial={{ width: 0 }}
                  animate={{ width: `${overallProgress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <span className="text-sm font-medium text-node-completed">{overallProgress}%</span>
            </div>
          )}
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 flex flex-col">
        <AnimatePresence mode="wait">
          {!roadmap ? (
            <motion.div
              key="input"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex-1 flex items-center justify-center p-4"
            >
              <div className="max-w-lg w-full text-center">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
                  <Sparkles className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-3xl font-bold mb-3">What's your dream job?</h2>
                <p className="text-muted-foreground mb-8">
                  Tell us where you want to be, and AI will map the skills you need to get there.
                </p>
                <div className="flex gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="e.g. Full-Stack Developer, Data Scientist..."
                      value={dreamJob}
                      onChange={(e) => setDreamJob(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
                      className="pl-10 h-12 bg-secondary border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
                    />
                  </div>
                  <Button
                    onClick={handleGenerate}
                    disabled={loading || !dreamJob.trim()}
                    className="h-12 px-6 bg-primary text-primary-foreground hover:bg-primary/90 glow"
                  >
                    {loading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        Generate
                        <Sparkles className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </div>

                {/* Quick suggestions */}
                <div className="mt-6 flex flex-wrap justify-center gap-2">
                  {["Full-Stack Developer", "Data Scientist", "UX Designer", "DevOps Engineer"].map((job) => (
                    <button
                      key={job}
                      onClick={() => setDreamJob(job)}
                      className="px-3 py-1.5 rounded-full text-xs border border-border text-muted-foreground hover:border-primary/40 hover:text-primary transition-colors"
                    >
                      {job}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="tree"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex-1"
            >
              <SkillTreeGraph roadmap={roadmap} onUpdateNode={handleUpdateNode} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
