import { useState, useRef, useCallback, useEffect } from "react";
import {
  Plus,
  Play,
  Pause,
  RotateCcw,
  Search,
  ChevronDown,
  ChevronRight,
  GripVertical,
  X,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Circle,
  Zap,
  FileText,
  Globe,
  Database,
  Bot,
  Filter,
  Code2,
  Terminal,
  ArrowRight,
  Settings,
  Trash2,
  Sparkles,
  MessageSquare,
  Layers,
  GitBranch,
  type LucideIcon,
} from "lucide-react";

/* ─── Types ─── */
interface Port {
  id: string;
  label: string;
  type: "input" | "output";
  dataType: "text" | "data" | "image" | "any";
}

interface WorkflowNode {
  id: string;
  type: string;
  label: string;
  category: string;
  icon: LucideIcon;
  color: string;
  x: number;
  y: number;
  inputs: Port[];
  outputs: Port[];
  config?: Record<string, string>;
  status?: "idle" | "running" | "completed" | "error";
}

interface Connection {
  id: string;
  fromNode: string;
  fromPort: string;
  toNode: string;
  toPort: string;
}

interface LogEntry {
  id: string;
  timestamp: string;
  nodeLabel: string;
  type: "info" | "success" | "warning" | "error" | "running";
  message: string;
}

/* ─── Node Library Data ─── */
interface LibraryItem {
  type: string;
  label: string;
  category: string;
  icon: LucideIcon;
  color: string;
  inputs: Omit<Port, "id">[];
  outputs: Omit<Port, "id">[];
}

const nodeLibrary: LibraryItem[] = [
  { type: "text-input", label: "Text Input", category: "Input", icon: FileText, color: "#3B82F6", inputs: [], outputs: [{ label: "text", type: "output", dataType: "text" }] },
  { type: "data-source", label: "Data Source", category: "Input", icon: Database, color: "#3B82F6", inputs: [], outputs: [{ label: "data", type: "output", dataType: "data" }] },
  { type: "web-scraper", label: "Web Scraper", category: "Input", icon: Globe, color: "#3B82F6", inputs: [{ label: "url", type: "input", dataType: "text" }], outputs: [{ label: "content", type: "output", dataType: "text" }] },
  { type: "llm", label: "LLM Model", category: "AI", icon: Bot, color: "#8B5CF6", inputs: [{ label: "prompt", type: "input", dataType: "text" }], outputs: [{ label: "response", type: "output", dataType: "text" }] },
  { type: "classifier", label: "Classifier", category: "AI", icon: Filter, color: "#8B5CF6", inputs: [{ label: "input", type: "input", dataType: "text" }], outputs: [{ label: "label", type: "output", dataType: "text" }, { label: "score", type: "output", dataType: "data" }] },
  { type: "embeddings", label: "Embeddings", category: "AI", icon: Sparkles, color: "#8B5CF6", inputs: [{ label: "text", type: "input", dataType: "text" }], outputs: [{ label: "vectors", type: "output", dataType: "data" }] },
  { type: "summarizer", label: "Summarizer", category: "AI", icon: MessageSquare, color: "#8B5CF6", inputs: [{ label: "text", type: "input", dataType: "text" }], outputs: [{ label: "summary", type: "output", dataType: "text" }] },
  { type: "transform", label: "Transform", category: "Processing", icon: Code2, color: "#10B981", inputs: [{ label: "input", type: "input", dataType: "any" }], outputs: [{ label: "output", type: "output", dataType: "any" }] },
  { type: "merge", label: "Merge", category: "Processing", icon: GitBranch, color: "#10B981", inputs: [{ label: "input_a", type: "input", dataType: "any" }, { label: "input_b", type: "input", dataType: "any" }], outputs: [{ label: "merged", type: "output", dataType: "any" }] },
  { type: "text-output", label: "Text Output", category: "Output", icon: Terminal, color: "#F59E0B", inputs: [{ label: "text", type: "input", dataType: "text" }], outputs: [] },
  { type: "json-output", label: "JSON Output", category: "Output", icon: Layers, color: "#F59E0B", inputs: [{ label: "data", type: "input", dataType: "data" }], outputs: [] },
];

const categoryColors: Record<string, string> = {
  Input: "#3B82F6",
  AI: "#8B5CF6",
  Processing: "#10B981",
  Output: "#F59E0B",
};

/* ─── Pre-built workflow ─── */
const defaultNodes: WorkflowNode[] = [
  {
    id: "n1", type: "text-input", label: "User Prompt", category: "Input", icon: FileText, color: "#3B82F6",
    x: 60, y: 80,
    inputs: [],
    outputs: [{ id: "n1-out-0", label: "text", type: "output", dataType: "text" }],
    config: { value: "Analyze recent AI trends..." },
    status: "idle",
  },
  {
    id: "n2", type: "data-source", label: "Knowledge Base", category: "Input", icon: Database, color: "#3B82F6",
    x: 60, y: 260,
    inputs: [],
    outputs: [{ id: "n2-out-0", label: "data", type: "output", dataType: "data" }],
    config: { source: "vector-store-01" },
    status: "idle",
  },
  {
    id: "n3", type: "embeddings", label: "Embed Query", category: "AI", icon: Sparkles, color: "#8B5CF6",
    x: 310, y: 165,
    inputs: [{ id: "n3-in-0", label: "text", type: "input", dataType: "text" }],
    outputs: [{ id: "n3-out-0", label: "vectors", type: "output", dataType: "data" }],
    status: "idle",
  },
  {
    id: "n4", type: "merge", label: "Context Merge", category: "Processing", icon: GitBranch, color: "#10B981",
    x: 520, y: 130,
    inputs: [
      { id: "n4-in-0", label: "input_a", type: "input", dataType: "any" },
      { id: "n4-in-1", label: "input_b", type: "input", dataType: "any" },
    ],
    outputs: [{ id: "n4-out-0", label: "merged", type: "output", dataType: "any" }],
    status: "idle",
  },
  {
    id: "n5", type: "llm", label: "GPT-4 Turbo", category: "AI", icon: Bot, color: "#8B5CF6",
    x: 730, y: 140,
    inputs: [{ id: "n5-in-0", label: "prompt", type: "input", dataType: "text" }],
    outputs: [{ id: "n5-out-0", label: "response", type: "output", dataType: "text" }],
    config: { model: "gpt-4-turbo", temperature: "0.7" },
    status: "idle",
  },
  {
    id: "n6", type: "text-output", label: "Final Output", category: "Output", icon: Terminal, color: "#F59E0B",
    x: 940, y: 150,
    inputs: [{ id: "n6-in-0", label: "text", type: "input", dataType: "text" }],
    outputs: [],
    status: "idle",
  },
];

const defaultConnections: Connection[] = [
  { id: "c1", fromNode: "n1", fromPort: "n1-out-0", toNode: "n3", toPort: "n3-in-0" },
  { id: "c2", fromNode: "n3", fromPort: "n3-out-0", toNode: "n4", toPort: "n4-in-0" },
  { id: "c3", fromNode: "n2", fromPort: "n2-out-0", toNode: "n4", toPort: "n4-in-1" },
  { id: "c4", fromNode: "n4", fromPort: "n4-out-0", toNode: "n5", toPort: "n5-in-0" },
  { id: "c5", fromNode: "n5", fromPort: "n5-out-0", toNode: "n6", toPort: "n6-in-0" },
];

/* ─── Helper: get port position ─── */
function getPortPosition(
  node: WorkflowNode,
  portId: string,
  portType: "input" | "output"
): { x: number; y: number } {
  const nodeWidth = 180;
  const headerH = 32;
  const portH = 22;
  const ports = portType === "input" ? node.inputs : node.outputs;
  const portIdx = ports.findIndex((p) => p.id === portId);
  const inputsH = node.inputs.length * portH;
  const baseY = headerH + (portType === "input" ? 0 : inputsH);

  return {
    x: portType === "input" ? node.x : node.x + nodeWidth,
    y: node.y + baseY + portIdx * portH + portH / 2 + 4,
  };
}

/* ─── Connection SVG path ─── */
function ConnectionPath({
  from,
  to,
  color = "#94A3B8",
  animated = false,
}: {
  from: { x: number; y: number };
  to: { x: number; y: number };
  color?: string;
  animated?: boolean;
}) {
  const dx = to.x - from.x;
  const cp = Math.max(Math.abs(dx) * 0.5, 50);
  const d = `M ${from.x} ${from.y} C ${from.x + cp} ${from.y}, ${to.x - cp} ${to.y}, ${to.x} ${to.y}`;
  return (
    <>
      <path d={d} fill="none" stroke={color} strokeWidth={2} opacity={0.5} />
      {animated && (
        <circle r="3" fill={color}>
          <animateMotion dur="1.5s" repeatCount="indefinite" path={d} />
        </circle>
      )}
    </>
  );
}

/* ─── Draggable Node ─── */
function NodeBlock({
  node,
  isSelected,
  onSelect,
  onDragStart,
  onPortMouseDown,
  onDelete,
}: {
  node: WorkflowNode;
  isSelected: boolean;
  onSelect: () => void;
  onDragStart: (e: React.MouseEvent) => void;
  onPortMouseDown: (portId: string, portType: "input" | "output") => void;
  onDelete: () => void;
}) {
  const Icon = node.icon;
  const portH = 22;
  const headerH = 32;
  const bodyH = Math.max(node.inputs.length, node.outputs.length) * portH + 8;
  const totalH = headerH + bodyH;

  const statusColors: Record<string, { bg: string; border: string; glow?: string }> = {
    idle: { bg: "white", border: isSelected ? node.color : "#E2E8F0" },
    running: { bg: "#FFFDF5", border: "#F59E0B", glow: "0 0 12px rgba(245,158,11,0.25)" },
    completed: { bg: "#F0FDF4", border: "#22C55E", glow: "0 0 12px rgba(34,197,94,0.2)" },
    error: { bg: "#FEF2F2", border: "#EF4444", glow: "0 0 12px rgba(239,68,68,0.2)" },
  };
  const s = statusColors[node.status || "idle"];

  const dataTypeColors: Record<string, string> = {
    text: "#3B82F6",
    data: "#10B981",
    image: "#EC4899",
    any: "#94A3B8",
  };

  return (
    <g>
      {/* Node body */}
      <foreignObject x={node.x} y={node.y} width={180} height={totalH}>
        <div
          onMouseDown={(e) => { e.stopPropagation(); onSelect(); onDragStart(e); }}
          className="rounded-lg overflow-hidden cursor-grab active:cursor-grabbing select-none"
          style={{
            border: `2px solid ${s.border}`,
            background: s.bg,
            boxShadow: s.glow || (isSelected ? `0 0 0 2px ${node.color}33, 3px 4px 0px 0px ${node.color}40` : "1px 2px 4px rgba(0,0,0,0.08)"),
            transition: "box-shadow 0.15s, border-color 0.15s",
            width: 180,
            height: totalH,
          }}
        >
          {/* Header */}
          <div
            className="flex items-center gap-1.5 px-2.5"
            style={{ height: headerH, background: `${node.color}10`, borderBottom: `1px solid ${node.color}20` }}
          >
            <Icon className="w-3 h-3 shrink-0" style={{ color: node.color }} />
            <span className="text-[10px] text-[#0F172A] truncate flex-1" style={{ fontWeight: 600 }}>
              {node.label}
            </span>
            {node.status === "running" && <Loader2 className="w-3 h-3 animate-spin" style={{ color: "#F59E0B" }} />}
            {node.status === "completed" && <CheckCircle2 className="w-3 h-3" style={{ color: "#22C55E" }} />}
            {node.status === "error" && <AlertCircle className="w-3 h-3" style={{ color: "#EF4444" }} />}
            <button
              onClick={(e) => { e.stopPropagation(); onDelete(); }}
              className="p-0.5 rounded hover:bg-[#00000010] transition-colors cursor-pointer opacity-0 hover:opacity-100"
              style={{ color: "#94A3B8" }}
            >
              <X className="w-2.5 h-2.5" />
            </button>
          </div>

          {/* Ports */}
          <div className="px-1 pt-1" style={{ height: bodyH - 4 }}>
            {/* Inputs */}
            {node.inputs.map((port) => (
              <div key={port.id} className="flex items-center gap-1 h-[22px] relative -ml-1">
                <div
                  onMouseDown={(e) => { e.stopPropagation(); onPortMouseDown(port.id, "input"); }}
                  className="w-2.5 h-2.5 rounded-full border-2 cursor-crosshair shrink-0 hover:scale-150 transition-transform z-10"
                  style={{ borderColor: dataTypeColors[port.dataType], background: "white" }}
                />
                <span className="text-[9px] text-[#94A3B8]">{port.label}</span>
              </div>
            ))}
            {/* Outputs */}
            {node.outputs.map((port) => (
              <div key={port.id} className="flex items-center justify-end gap-1 h-[22px] relative -mr-1">
                <span className="text-[9px] text-[#94A3B8]">{port.label}</span>
                <div
                  onMouseDown={(e) => { e.stopPropagation(); onPortMouseDown(port.id, "output"); }}
                  className="w-2.5 h-2.5 rounded-full border-2 cursor-crosshair shrink-0 hover:scale-150 transition-transform z-10"
                  style={{ borderColor: dataTypeColors[port.dataType], background: "white" }}
                />
              </div>
            ))}
          </div>
        </div>
      </foreignObject>
    </g>
  );
}

/* ═══════════════════════════════════════════════
   Main Component
   ═══════════════════════════════════════════════ */
export function NodeWorkflowExample() {
  const [nodes, setNodes] = useState<WorkflowNode[]>(defaultNodes);
  const [connections, setConnections] = useState<Connection[]>(defaultConnections);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({ Input: true, AI: true, Processing: true, Output: true });
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [dragState, setDragState] = useState<{ nodeId: string; offsetX: number; offsetY: number } | null>(null);
  const [drawingConnection, setDrawingConnection] = useState<{ fromNode: string; fromPort: string; mouseX: number; mouseY: number } | null>(null);
  const canvasRef = useRef<SVGSVGElement>(null);
  const nodeIdCounter = useRef(7);
  const logsEndRef = useRef<HTMLDivElement>(null);

  const filteredLibrary = nodeLibrary.filter((n) =>
    n.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
    n.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const groupedLibrary = filteredLibrary.reduce<Record<string, LibraryItem[]>>((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  /* ─── Add node from library ─── */
  const addNode = useCallback((item: LibraryItem) => {
    const id = `n${nodeIdCounter.current++}`;
    const newNode: WorkflowNode = {
      id,
      type: item.type,
      label: item.label,
      category: item.category,
      icon: item.icon,
      color: item.color,
      x: 300 + Math.random() * 200,
      y: 100 + Math.random() * 200,
      inputs: item.inputs.map((p, i) => ({ ...p, id: `${id}-in-${i}` })),
      outputs: item.outputs.map((p, i) => ({ ...p, id: `${id}-out-${i}` })),
      status: "idle",
    };
    setNodes((prev) => [...prev, newNode]);
    setSelectedNodeId(id);
    addLog(item.label, "info", `Added "${item.label}" node to canvas`);
  }, []);

  /* ─── Delete node ─── */
  const deleteNode = useCallback((nodeId: string) => {
    setNodes((prev) => prev.filter((n) => n.id !== nodeId));
    setConnections((prev) => prev.filter((c) => c.fromNode !== nodeId && c.toNode !== nodeId));
    if (selectedNodeId === nodeId) setSelectedNodeId(null);
  }, [selectedNodeId]);

  /* ─── Node dragging ─── */
  const handleNodeDragStart = useCallback((nodeId: string, e: React.MouseEvent) => {
    const svg = canvasRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const node = nodes.find((n) => n.id === nodeId);
    if (!node) return;
    setDragState({
      nodeId,
      offsetX: e.clientX - rect.left - node.x,
      offsetY: e.clientY - rect.top - node.y,
    });
  }, [nodes]);

  const handleCanvasMouseMove = useCallback((e: React.MouseEvent) => {
    const svg = canvasRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();

    if (dragState) {
      const newX = Math.max(0, e.clientX - rect.left - dragState.offsetX);
      const newY = Math.max(0, e.clientY - rect.top - dragState.offsetY);
      setNodes((prev) =>
        prev.map((n) => (n.id === dragState.nodeId ? { ...n, x: newX, y: newY } : n))
      );
    }

    if (drawingConnection) {
      setDrawingConnection((prev) =>
        prev ? { ...prev, mouseX: e.clientX - rect.left, mouseY: e.clientY - rect.top } : null
      );
    }
  }, [dragState, drawingConnection]);

  const handleCanvasMouseUp = useCallback(() => {
    setDragState(null);
    setDrawingConnection(null);
  }, []);

  /* ─── Port connection ─── */
  const handlePortMouseDown = useCallback((nodeId: string, portId: string, portType: "input" | "output") => {
    if (portType === "output") {
      const svg = canvasRef.current;
      if (!svg) return;
      const node = nodes.find((n) => n.id === nodeId);
      if (!node) return;
      const pos = getPortPosition(node, portId, "output");
      setDrawingConnection({ fromNode: nodeId, fromPort: portId, mouseX: pos.x, mouseY: pos.y });
    } else if (drawingConnection) {
      // Complete connection
      const exists = connections.some(
        (c) => c.fromNode === drawingConnection.fromNode && c.toNode === nodeId
      );
      if (!exists && drawingConnection.fromNode !== nodeId) {
        const newConn: Connection = {
          id: `c${Date.now()}`,
          fromNode: drawingConnection.fromNode,
          fromPort: drawingConnection.fromPort,
          toNode: nodeId,
          toPort: portId,
        };
        setConnections((prev) => [...prev, newConn]);
        const fromLabel = nodes.find((n) => n.id === drawingConnection.fromNode)?.label || "";
        const toLabel = nodes.find((n) => n.id === nodeId)?.label || "";
        addLog("System", "info", `Connected "${fromLabel}" → "${toLabel}"`);
      }
      setDrawingConnection(null);
    }
  }, [drawingConnection, connections, nodes]);

  /* ─── Log helper ─── */
  const addLog = useCallback((nodeLabel: string, type: LogEntry["type"], message: string) => {
    const now = new Date();
    setLogs((prev) => [
      ...prev,
      {
        id: `log-${Date.now()}-${Math.random()}`,
        timestamp: now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
        nodeLabel,
        type,
        message,
      },
    ].slice(-40));
  }, []);

  /* ─── Run pipeline ─── */
  const runPipeline = useCallback(() => {
    if (isRunning) return;
    setIsRunning(true);
    setLogs([]);

    // Topological order based on connections
    const visited = new Set<string>();
    const order: string[] = [];
    const adjMap = new Map<string, string[]>();

    // Build adjacency
    for (const conn of connections) {
      if (!adjMap.has(conn.fromNode)) adjMap.set(conn.fromNode, []);
      adjMap.get(conn.fromNode)!.push(conn.toNode);
    }

    // Find root nodes (no incoming connections)
    const hasIncoming = new Set(connections.map((c) => c.toNode));
    const roots = nodes.filter((n) => !hasIncoming.has(n.id));

    function dfs(nodeId: string) {
      if (visited.has(nodeId)) return;
      visited.add(nodeId);
      order.push(nodeId);
      for (const next of adjMap.get(nodeId) || []) dfs(next);
    }
    roots.forEach((r) => dfs(r.id));
    // Add any unvisited
    nodes.forEach((n) => { if (!visited.has(n.id)) order.push(n.id); });

    // Reset all statuses
    setNodes((prev) => prev.map((n) => ({ ...n, status: "idle" as const })));

    const runMessages: Record<string, string[]> = {
      "text-input": ["Reading text input value...", "Text loaded: 128 characters"],
      "data-source": ["Connecting to vector store...", "Retrieved 2,847 indexed documents"],
      "web-scraper": ["Fetching URL content...", "Extracted 4.2KB of text content"],
      "llm": ["Sending prompt to GPT-4 Turbo...", "Generating response (temperature: 0.7)...", "Response received: 342 tokens"],
      "classifier": ["Running classification model...", "Label: 'positive' (score: 0.94)"],
      "embeddings": ["Computing text embeddings...", "Generated 1536-dim vector representation"],
      "summarizer": ["Analyzing text structure...", "Summary generated: 85 words"],
      "transform": ["Applying transformation...", "Data transformed successfully"],
      "merge": ["Merging input streams...", "Combined context: 2 sources merged"],
      "text-output": ["Formatting final output...", "Output ready: 342 tokens"],
      "json-output": ["Serializing to JSON...", "JSON output: 2.1KB"],
    };

    let stepIdx = 0;
    const runNext = () => {
      if (stepIdx >= order.length) {
        setIsRunning(false);
        addLog("Pipeline", "success", "Pipeline execution completed successfully!");
        return;
      }

      const nodeId = order[stepIdx];
      const node = nodes.find((n) => n.id === nodeId);
      if (!node) { stepIdx++; runNext(); return; }

      // Mark running
      setNodes((prev) => prev.map((n) => (n.id === nodeId ? { ...n, status: "running" as const } : n)));
      addLog(node.label, "running", `Executing "${node.label}"...`);

      const msgs = runMessages[node.type] || ["Processing..."];
      let msgIdx = 0;

      const msgInterval = setInterval(() => {
        if (msgIdx < msgs.length) {
          addLog(node.label, "info", msgs[msgIdx]);
          msgIdx++;
        } else {
          clearInterval(msgInterval);
          // Mark completed
          setNodes((prev) => prev.map((n) => (n.id === nodeId ? { ...n, status: "completed" as const } : n)));
          addLog(node.label, "success", `"${node.label}" completed`);
          stepIdx++;
          setTimeout(runNext, 300);
        }
      }, 500);
    };

    addLog("Pipeline", "info", `Starting pipeline execution (${order.length} nodes)...`);
    setTimeout(runNext, 400);
  }, [isRunning, connections, nodes, addLog]);

  const resetPipeline = useCallback(() => {
    setNodes((prev) => prev.map((n) => ({ ...n, status: "idle" as const })));
    setIsRunning(false);
    setLogs([]);
  }, []);

  // Auto-scroll logs
  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  const logTypeIcon = (type: LogEntry["type"]) => {
    switch (type) {
      case "success": return <CheckCircle2 className="w-2.5 h-2.5 text-[#22C55E] shrink-0" />;
      case "error": return <AlertCircle className="w-2.5 h-2.5 text-[#EF4444] shrink-0" />;
      case "warning": return <AlertCircle className="w-2.5 h-2.5 text-[#F59E0B] shrink-0" />;
      case "running": return <Loader2 className="w-2.5 h-2.5 text-[#F59E0B] animate-spin shrink-0" />;
      default: return <Circle className="w-2 h-2 text-[#94A3B8] shrink-0" />;
    }
  };

  const logColor = (type: LogEntry["type"]) => {
    switch (type) {
      case "success": return "#86EFAC";
      case "error": return "#FCA5A5";
      case "warning": return "#FDE68A";
      case "running": return "#FDE68A";
      default: return "#94A3B8";
    }
  };

  return (
    <div
      className="w-full rounded-2xl border-2 border-[#333] bg-white overflow-hidden shadow-[5px_6px_0px_0px_#333]"
      style={{ fontFamily: "'Inter', sans-serif", height: 640 }}
    >
      {/* ═══ Top Bar ═══ */}
      <div className="flex items-center justify-between px-4 py-2 bg-white border-b border-[#E2E8F0]">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#F8FAFC]">
            <GitBranch className="w-3.5 h-3.5 text-[#8B5CF6]" />
            <span className="text-[12px] text-[#0F172A]" style={{ fontWeight: 600 }}>Workflow Builder</span>
          </div>
          <div className="h-4 w-px bg-[#E2E8F0]" />
          <span className="text-[10px] text-[#94A3B8]">
            {nodes.length} nodes · {connections.length} connections
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={resetPipeline}
            className="flex items-center gap-1 px-2 py-1 rounded-md text-[10px] border border-[#E2E8F0] text-[#64748B] hover:bg-[#F8FAFC] transition-colors cursor-pointer"
            style={{ fontWeight: 500 }}
          >
            <RotateCcw className="w-2.5 h-2.5" />
            Reset
          </button>
          <button
            onClick={runPipeline}
            disabled={isRunning}
            className="flex items-center gap-1 px-3 py-1 rounded-md text-[10px] text-white transition-colors cursor-pointer disabled:opacity-50"
            style={{ fontWeight: 500, background: isRunning ? "#F59E0B" : "#22C55E" }}
          >
            {isRunning ? (
              <><Loader2 className="w-2.5 h-2.5 animate-spin" /> Running...</>
            ) : (
              <><Play className="w-2.5 h-2.5" /> Run Pipeline</>
            )}
          </button>
        </div>
      </div>

      <div className="flex" style={{ height: "calc(100% - 41px)" }}>
        {/* ═══ Zone A — Node Library ═══ */}
        <div className="w-[190px] min-w-[190px] border-r border-[#E2E8F0] bg-[#FAFBFC] flex flex-col">
          <div className="px-3 pt-3 pb-2">
            <div className="flex items-center gap-1.5 mb-2">
              <Layers className="w-3 h-3 text-[#64748B]" />
              <span className="text-[11px] text-[#0F172A]" style={{ fontWeight: 600 }}>Node Library</span>
            </div>
            <div className="relative">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-[#94A3B8]" />
              <input
                type="text"
                placeholder="Search nodes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-7 pr-2 py-1.5 rounded-md border border-[#E2E8F0] bg-white text-[10px] text-[#334155] placeholder:text-[#CBD5E1] outline-none focus:border-[#8B5CF6] transition-colors"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-2 pb-2">
            {Object.entries(groupedLibrary).map(([category, items]) => (
              <div key={category} className="mb-1">
                <button
                  onClick={() => setExpandedCategories((prev) => ({ ...prev, [category]: !prev[category] }))}
                  className="flex items-center gap-1.5 w-full px-2 py-1.5 rounded text-left cursor-pointer hover:bg-[#F1F5F9] transition-colors"
                >
                  {expandedCategories[category] ? (
                    <ChevronDown className="w-2.5 h-2.5 text-[#94A3B8]" />
                  ) : (
                    <ChevronRight className="w-2.5 h-2.5 text-[#94A3B8]" />
                  )}
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: categoryColors[category] }} />
                  <span className="text-[10px] text-[#64748B]" style={{ fontWeight: 600 }}>{category}</span>
                  <span className="text-[9px] text-[#CBD5E1] ml-auto">{items.length}</span>
                </button>

                {expandedCategories[category] && (
                  <div className="ml-2 mt-0.5">
                    {items.map((item) => {
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.type}
                          onClick={() => addNode(item)}
                          className="flex items-center gap-2 w-full px-2 py-1.5 rounded-md text-left cursor-pointer hover:bg-white border border-transparent hover:border-[#E2E8F0] transition-all group mb-0.5"
                        >
                          <div
                            className="w-5 h-5 rounded flex items-center justify-center shrink-0"
                            style={{ background: `${item.color}12`, color: item.color }}
                          >
                            <Icon className="w-3 h-3" />
                          </div>
                          <span className="text-[10px] text-[#475569] group-hover:text-[#0F172A] truncate" style={{ fontWeight: 450 }}>
                            {item.label}
                          </span>
                          <Plus className="w-2.5 h-2.5 text-[#CBD5E1] group-hover:text-[#94A3B8] ml-auto opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ═══ Right side: Canvas + Execution ═══ */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* ═══ Zone B — Workflow Canvas ═══ */}
          <div className="flex-1 relative min-h-0 bg-[#FAFBFC]" style={{
            backgroundImage: "radial-gradient(circle, #E2E8F0 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}>
            <svg
              ref={canvasRef}
              className="w-full h-full"
              onMouseMove={handleCanvasMouseMove}
              onMouseUp={handleCanvasMouseUp}
              onMouseLeave={handleCanvasMouseUp}
              onClick={() => setSelectedNodeId(null)}
            >
              {/* Connections */}
              {connections.map((conn) => {
                const fromNode = nodes.find((n) => n.id === conn.fromNode);
                const toNode = nodes.find((n) => n.id === conn.toNode);
                if (!fromNode || !toNode) return null;
                const from = getPortPosition(fromNode, conn.fromPort, "output");
                const to = getPortPosition(toNode, conn.toPort, "input");
                const isAnimated = fromNode.status === "running" || toNode.status === "running";
                const color =
                  fromNode.status === "completed" && toNode.status === "completed"
                    ? "#22C55E"
                    : isAnimated
                    ? "#F59E0B"
                    : "#CBD5E1";
                return (
                  <ConnectionPath
                    key={conn.id}
                    from={from}
                    to={to}
                    color={color}
                    animated={isAnimated}
                  />
                );
              })}

              {/* Drawing connection */}
              {drawingConnection && (() => {
                const fromNode = nodes.find((n) => n.id === drawingConnection.fromNode);
                if (!fromNode) return null;
                const from = getPortPosition(fromNode, drawingConnection.fromPort, "output");
                return (
                  <ConnectionPath
                    from={from}
                    to={{ x: drawingConnection.mouseX, y: drawingConnection.mouseY }}
                    color="#8B5CF6"
                  />
                );
              })()}

              {/* Nodes */}
              {nodes.map((node) => (
                <NodeBlock
                  key={node.id}
                  node={node}
                  isSelected={selectedNodeId === node.id}
                  onSelect={() => setSelectedNodeId(node.id)}
                  onDragStart={(e) => handleNodeDragStart(node.id, e)}
                  onPortMouseDown={(portId, portType) => handlePortMouseDown(node.id, portId, portType)}
                  onDelete={() => deleteNode(node.id)}
                />
              ))}
            </svg>

            {/* Canvas controls hint */}
            <div className="absolute bottom-3 left-3 flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-white/80 border border-[#E2E8F0] backdrop-blur-sm">
              <span className="text-[9px] text-[#94A3B8]">Drag nodes to move · Click ports to connect · Click library to add</span>
            </div>
          </div>

          {/* ═══ Zone C — Execution Panel ═══ */}
          <div className="h-[180px] min-h-[180px] border-t border-[#E2E8F0] flex flex-col">
            <div className="flex items-center justify-between px-4 py-2 bg-[#FAFBFC] border-b border-[#F1F5F9]">
              <div className="flex items-center gap-2">
                <Terminal className="w-3 h-3 text-[#64748B]" />
                <span className="text-[11px] text-[#0F172A]" style={{ fontWeight: 600 }}>Execution Output</span>
                {isRunning && (
                  <span className="flex items-center gap-1 text-[9px] text-[#F59E0B]" style={{ fontWeight: 500 }}>
                    <span className="w-1 h-1 rounded-full bg-[#F59E0B] animate-pulse" />
                    Running
                  </span>
                )}
                {!isRunning && logs.length > 0 && logs[logs.length - 1]?.type === "success" && (
                  <span className="flex items-center gap-1 text-[9px] text-[#22C55E]" style={{ fontWeight: 500 }}>
                    <CheckCircle2 className="w-2.5 h-2.5" />
                    Complete
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[9px] text-[#94A3B8]">{logs.length} entries</span>
                <button
                  onClick={() => setLogs([])}
                  className="text-[9px] text-[#94A3B8] hover:text-[#64748B] cursor-pointer"
                  style={{ fontWeight: 500 }}
                >
                  Clear
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto bg-[#0F172A] font-mono">
              {logs.length === 0 && (
                <div className="flex items-center justify-center h-full text-[11px] text-[#475569]">
                  Click "Run Pipeline" to execute the workflow
                </div>
              )}
              {logs.map((log) => (
                <div
                  key={log.id}
                  className="flex items-start gap-2 px-4 py-1 hover:bg-[#1E293B] transition-colors text-[10px] leading-[1.5]"
                >
                  <span className="text-[#475569] shrink-0 w-[68px]">{log.timestamp}</span>
                  {logTypeIcon(log.type)}
                  <span className="shrink-0 text-[#64748B] w-[80px] truncate" style={{ fontWeight: 500 }}>
                    [{log.nodeLabel}]
                  </span>
                  <span style={{ color: logColor(log.type) }}>{log.message}</span>
                </div>
              ))}
              <div ref={logsEndRef} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}