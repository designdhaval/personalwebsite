export type Category = "CORE AI INTERFACES" | "ADVANCED AI INTERFACES" | "FUTURE AI SYSTEMS";

export interface LayoutItem {
  id: string;
  name: string;
  description: string;
  category: Category;
}

function getCategory(index: number): Category {
  if (index < 12) return "CORE AI INTERFACES";
  if (index < 20) return "ADVANCED AI INTERFACES";
  return "FUTURE AI SYSTEMS";
}

const rawLayouts: Omit<LayoutItem, "category">[] = [
  {
    id: "conversational-chat",
    name: "Conversational Chat Layout",
    description: "A familiar messaging interface for turn-based AI dialogue with streaming responses and context history.",
  },
  {
    id: "prompt-canvas",
    name: "Prompt + Canvas Layout",
    description: "Split-pane interface pairing a prompt input with a freeform canvas for visual AI generation.",
  },
  {
    id: "prompt-live-preview",
    name: "Prompt + Live Preview Layout",
    description: "Real-time preview panel that updates as users refine their prompts and parameters.",
  },
  {
    id: "studio-timeline",
    name: "Studio Timeline Layout",
    description: "Timeline-driven workspace for sequencing AI-generated media across multiple tracks.",
  },
  {
    id: "voice-studio",
    name: "Voice Studio Layout",
    description: "Audio-centric interface for AI voice synthesis, cloning, and real-time modulation.",
  },
  {
    id: "music-composer",
    name: "Music Composer Layout",
    description: "Multi-track composition environment for AI-assisted music creation and arrangement.",
  },
  {
    id: "node-workflow",
    name: "Node-Based Workflow Builder",
    description: "Visual programming interface connecting AI nodes into complex processing pipelines.",
  },
  {
    id: "copilot",
    name: "AI Copilot Layout",
    description: "Inline assistant overlay that augments existing workflows with contextual AI suggestions.",
  },
  {
    id: "command-palette",
    name: "AI Command Palette Layout",
    description: "Keyboard-first command interface for rapid AI actions and natural language queries.",
  },
  {
    id: "inspector",
    name: "AI Inspector Layout",
    description: "Detail panel for examining AI outputs, confidence scores, and decision explanations.",
  },
  {
    id: "playground",
    name: "AI Playground Layout",
    description: "Experimental sandbox for testing prompts, comparing models, and tuning parameters.",
  },
  {
    id: "agent-dashboard",
    name: "AI Agent Dashboard Layout",
    description: "Monitoring dashboard for autonomous AI agents with status, logs, and task queues.",
  },
  {
    id: "workspace",
    name: "AI Workspace Layout",
    description: "Flexible multi-panel workspace combining chat, tools, and output views in one screen.",
  },
  {
    id: "thinking-visualization",
    name: "AI Thinking Visualization Layout",
    description: "Transparent view into AI reasoning chains, showing step-by-step thought processes.",
  },
  {
    id: "multi-agent",
    name: "Multi-Agent Collaboration Layout",
    description: "Interface for orchestrating multiple AI agents working together on shared tasks.",
  },
  {
    id: "generation-timeline",
    name: "AI Generation Timeline Layout",
    description: "Chronological view of AI generation history with versioning and rollback capabilities.",
  },
  {
    id: "canvas-workspace",
    name: "AI Canvas Workspace Layout",
    description: "Infinite canvas for spatial arrangement of AI-generated content and annotations.",
  },
  {
    id: "memory-graph",
    name: "AI Memory Graph Layout",
    description: "Knowledge graph visualization of AI memory, connections, and learned associations.",
  },
  {
    id: "visual-prompt",
    name: "Visual Prompt Builder Layout",
    description: "Drag-and-drop prompt construction using visual blocks, references, and modifiers.",
  },
  {
    id: "insight-dashboard",
    name: "AI Insight Dashboard Layout",
    description: "Analytics dashboard surfacing AI-derived insights, trends, and recommendations.",
  },
  {
    id: "co-creation",
    name: "AI Co-Creation Studio Layout",
    description: "Collaborative workspace where human creativity and AI generation merge seamlessly.",
  },
  {
    id: "simulation",
    name: "AI Simulation Interface Layout",
    description: "Environment for running AI simulations with parameter controls and result visualization.",
  },
  {
    id: "debate",
    name: "AI Debate Interface Layout",
    description: "Side-by-side comparison of AI perspectives with argument mapping and synthesis.",
  },
  {
    id: "guided-workflow",
    name: "AI Guided Workflow Layout",
    description: "Step-by-step wizard interface with AI guidance at each stage of a complex process.",
  },
  {
    id: "artifact-inspector",
    name: "AI Artifact Inspector Layout",
    description: "Deep inspection view for AI-generated artifacts with metadata and provenance tracking.",
  },
  {
    id: "context-panel",
    name: "AI Context Side Panel Layout",
    description: "Collapsible side panel providing AI context, suggestions, and related information.",
  },
  {
    id: "control-center",
    name: "Autonomous AI Control Center Layout",
    description: "Mission control for autonomous AI systems with safety controls and override mechanisms.",
  },
];

export const layouts: LayoutItem[] = rawLayouts.map((item, index) => ({
  ...item,
  category: getCategory(index),
}));
