import { useCallback, useEffect, useMemo } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  type Node,
  type Edge,
  BackgroundVariant,
  ConnectionMode,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import SkillTreeNode from "./SkillTreeNode";
import type { Roadmap, SkillNode } from "@/lib/roadmap-data";

interface SkillTreeGraphProps {
  roadmap: Roadmap;
  onUpdateNode: (nodeId: string, updates: Partial<SkillNode>) => void;
}

function buildLayout(roadmapNodes: SkillNode[], onToggleComplete: (id: string) => void) {
  const levelGroups: Record<number, SkillNode[]> = {};
  roadmapNodes.forEach((n) => {
    if (!levelGroups[n.level]) levelGroups[n.level] = [];
    levelGroups[n.level].push(n);
  });

  const HORIZONTAL_GAP = 320;
  const VERTICAL_GAP = 180;
  const nodes: Node[] = [];
  const edges: Edge[] = [];

  Object.entries(levelGroups).forEach(([level, group]) => {
    const y = Number(level) * VERTICAL_GAP;
    const totalWidth = (group.length - 1) * HORIZONTAL_GAP;
    const startX = -totalWidth / 2;

    group.forEach((skillNode, i) => {
      nodes.push({
        id: skillNode.id,
        type: "skillNode",
        position: { x: startX + i * HORIZONTAL_GAP, y },
        data: { ...skillNode, onToggleComplete },
      });
    });
  });

  roadmapNodes.forEach((skillNode) => {
    skillNode.children.forEach((childId) => {
      edges.push({
        id: `${skillNode.id}-${childId}`,
        source: skillNode.id,
        target: childId,
        animated: skillNode.status === "in-progress" || skillNode.status === "completed",
        style: {
          stroke:
            skillNode.status === "completed"
              ? "hsl(150 80% 50%)"
              : skillNode.status === "in-progress"
              ? "hsl(45 95% 55%)"
              : "hsl(222 30% 25%)",
          strokeWidth: 2,
        },
      });
    });
  });

  return { nodes, edges };
}

export default function SkillTreeGraph({ roadmap, onUpdateNode }: SkillTreeGraphProps) {
  const handleToggleComplete = useCallback(
    (nodeId: string) => {
      onUpdateNode(nodeId, { status: "completed" });
    },
    [onUpdateNode]
  );

  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  useEffect(() => {
    const layout = buildLayout(roadmap.nodes, handleToggleComplete);
    setNodes(layout.nodes);
    setEdges(layout.edges);
  }, [roadmap.nodes, handleToggleComplete, setNodes, setEdges]);

  const nodeTypes = useMemo(() => ({ skillNode: SkillTreeNode }), []);

  return (
    <div className="w-full" style={{ height: "calc(100vh - 56px)" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        connectionMode={ConnectionMode.Loose}
        fitView
        fitViewOptions={{ padding: 0.3 }}
        minZoom={0.3}
        maxZoom={1.5}
        proOptions={{ hideAttribution: true }}
      >
        <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="hsl(222 30% 15%)" />
        <Controls
          className="!bg-secondary !border-border !rounded-lg !shadow-lg"
          showInteractive={false}
        />
      </ReactFlow>
    </div>
  );
}
