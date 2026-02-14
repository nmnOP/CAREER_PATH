import { memo, useState } from "react";
import { Handle, Position, type NodeProps } from "@xyflow/react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Lock, Clock, ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import type { SkillNode } from "@/lib/roadmap-data";

const statusConfig = {
  locked: {
    bg: "bg-node-locked",
    border: "border-muted",
    icon: Lock,
    label: "Locked",
    barColor: "bg-muted-foreground/20",
  },
  active: {
    bg: "bg-secondary",
    border: "border-primary/40",
    icon: null,
    label: "Ready",
    barColor: "bg-primary/30",
  },
  "in-progress": {
    bg: "bg-secondary",
    border: "border-node-in-progress/50",
    icon: Clock,
    label: "In Progress",
    barColor: "bg-node-in-progress",
  },
  completed: {
    bg: "bg-secondary",
    border: "border-node-completed/50",
    icon: Check,
    label: "Completed",
    barColor: "bg-node-completed",
  },
};

function SkillTreeNode({ data }: NodeProps) {
  const node = data as unknown as SkillNode & { onToggleComplete: (id: string) => void };
  const [expanded, setExpanded] = useState(false);
  const config = statusConfig[node.status];
  const StatusIcon = config.icon;
  const progress = node.status === "completed" ? 100 : node.status === "in-progress" ? 50 : 0;

  return (
    <div className="relative">
      <Handle type="target" position={Position.Top} className="!bg-primary/50 !border-none !w-2 !h-2" />

      <motion.div
        layout
        className={`rounded-xl border ${config.border} ${config.bg} min-w-[220px] max-w-[280px] shadow-lg`}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Header */}
        <div
          className="p-4 cursor-pointer select-none"
          onClick={() => node.status !== "locked" && setExpanded(!expanded)}
        >
          <div className="flex items-center justify-between gap-2 mb-2">
            <h3 className={`font-semibold text-sm ${node.status === "locked" ? "text-muted-foreground" : "text-foreground"}`}>
              {node.label}
            </h3>
            <div className="flex items-center gap-1.5">
              {StatusIcon && (
                <StatusIcon className={`w-3.5 h-3.5 ${
                  node.status === "completed" ? "text-node-completed" :
                  node.status === "in-progress" ? "text-node-in-progress" :
                  "text-muted-foreground"
                }`} />
              )}
              {node.status !== "locked" && (
                expanded ? <ChevronUp className="w-3.5 h-3.5 text-muted-foreground" /> : <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
              )}
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden">
            <motion.div
              className={`h-full rounded-full ${config.barColor}`}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>

          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-muted-foreground">{node.estimatedHours}h estimated</span>
            <span className={`text-xs font-medium ${
              node.status === "completed" ? "text-node-completed" :
              node.status === "in-progress" ? "text-node-in-progress" :
              node.status === "active" ? "text-primary" :
              "text-muted-foreground"
            }`}>
              {config.label}
            </span>
          </div>
        </div>

        {/* Expanded content */}
        <AnimatePresence>
          {expanded && node.status !== "locked" && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="px-4 pb-4 border-t border-border/50 pt-3">
                <p className="text-xs text-muted-foreground mb-3 leading-relaxed">{node.description}</p>

                {node.resources.length > 0 && (
                  <div className="mb-3">
                    <p className="text-xs font-medium text-foreground mb-1.5">Resources</p>
                    {node.resources.map((r) => (
                      <a
                        key={r.url}
                        href={r.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs text-primary hover:underline mb-1"
                      >
                        <ExternalLink className="w-3 h-3" />
                        {r.title}
                      </a>
                    ))}
                  </div>
                )}

                {node.status !== "completed" && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      node.onToggleComplete(node.id);
                    }}
                    className="w-full py-1.5 rounded-lg text-xs font-medium bg-node-completed/10 text-node-completed hover:bg-node-completed/20 transition-colors"
                  >
                    Mark as Complete
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <Handle type="source" position={Position.Bottom} className="!bg-primary/50 !border-none !w-2 !h-2" />
    </div>
  );
}

export default memo(SkillTreeNode);
