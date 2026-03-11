import { useRef, useState } from "react";
import { Link } from "react-router";
import {
  ChevronRight,
  ArrowRight,
  Terminal,
  Mic,
  Sparkles,
  MessageSquare,
  Palette,
  Users,
  Shield,
  ChevronLeft,
} from "lucide-react";
import { SharedNav, SharedFooter } from "./shared-nav";

/* ─── Palette ─── */
const p = {
  bg: "#F1F5F9",
  fill: "#E2E8F0",
  mid: "#CBD5E1",
  dark: "#94A3B8",
  label: "#64748B",
  border: "#E2E8F0",
  white: "#FFFFFF",
};

/* ─── Era diagrams ─── */

function DeveloperDiagram() {
  return (
    <svg viewBox="0 0 320 180" fill="none" className="w-full h-full">
      <rect width={320} height={180} fill="#1a1a2e" rx={8} />
      {/* Terminal window */}
      <rect x={20} y={16} width={280} height={148} fill="#0d0d1a" rx={6} />
      {/* Title bar */}
      <rect x={20} y={16} width={280} height={20} fill="#252540" rx={6} />
      <rect x={20} y={30} width={280} height={6} fill="#252540" />
      <circle cx={34} cy={26} r={4} fill="#ff5f57" />
      <circle cx={48} cy={26} r={4} fill="#febc2e" />
      <circle cx={62} cy={26} r={4} fill="#28c840" />
      <rect x={120} y={22} width={80} height={8} fill="#3a3a5c" rx={2} />
      {/* Terminal lines */}
      <text x={30} y={52} fill="#5e5e8a" fontSize={9} fontFamily="monospace">$</text>
      <text x={42} y={52} fill="#a0e0a0" fontSize={9} fontFamily="monospace">python train_model.py</text>
      <text x={30} y={68} fill="#7070a0" fontSize={9} fontFamily="monospace">Epoch 1/100 ████░░░░ 42%</text>
      <text x={30} y={84} fill="#7070a0" fontSize={9} fontFamily="monospace">loss: 0.4523  acc: 0.821</text>
      <text x={30} y={100} fill="#7070a0" fontSize={9} fontFamily="monospace">Epoch 2/100 ██████░░ 67%</text>
      <text x={30} y={116} fill="#7070a0" fontSize={9} fontFamily="monospace">loss: 0.2891  acc: 0.903</text>
      <text x={30} y={136} fill="#5e5e8a" fontSize={9} fontFamily="monospace">$</text>
      <rect x={38} y={128} width={6} height={12} fill="#a0e0a0" opacity={0.7} />
      <text x={30} y={156} fill="#505078" fontSize={8} fontFamily="monospace">tensorflow v1.x | cuda 8.0</text>
    </svg>
  );
}

function VoiceDiagram() {
  return (
    <svg viewBox="0 0 320 180" fill="none" className="w-full h-full">
      <rect width={320} height={180} fill={p.bg} rx={8} />
      {/* Smart speaker shape */}
      <rect x={120} y={30} width={80} height={100} fill={p.fill} rx={40} stroke={p.border} strokeWidth={1} />
      <circle cx={160} cy={70} r={18} fill={p.mid} />
      <circle cx={160} cy={70} r={10} fill={p.dark} />
      <circle cx={160} cy={70} r={4} fill={p.white} />
      {/* Sound waves */}
      {[28, 36, 44].map((r, i) => (
        <path
          key={r}
          d={`M ${160 + r} 70 A ${r} ${r} 0 0 1 ${160 + r * Math.cos(Math.PI / 4)} ${70 - r * Math.sin(Math.PI / 4)}`}
          stroke={p.dark}
          strokeWidth={1.5}
          fill="none"
          opacity={0.6 - i * 0.15}
        />
      ))}
      {[28, 36, 44].map((r, i) => (
        <path
          key={`l${r}`}
          d={`M ${160 - r} 70 A ${r} ${r} 0 0 0 ${160 - r * Math.cos(Math.PI / 4)} ${70 - r * Math.sin(Math.PI / 4)}`}
          stroke={p.dark}
          strokeWidth={1.5}
          fill="none"
          opacity={0.6 - i * 0.15}
        />
      ))}
      {/* Status ring */}
      <rect x={130} y={100} width={60} height={4} fill={p.dark} rx={2} />
      {/* User speech bubble */}
      <rect x={32} y={140} width={120} height={24} fill={p.white} rx={6} stroke={p.border} strokeWidth={0.8} />
      <text x={92} y={156} textAnchor="middle" fill={p.label} fontSize={8} fontFamily="Inter,sans-serif">"Set a timer for 5 min"</text>
      {/* AI response */}
      <rect x={168} y={140} width={120} height={24} fill={p.dark} rx={6} />
      <text x={228} y={156} textAnchor="middle" fill={p.white} fontSize={8} fontFamily="Inter,sans-serif">"Timer set for 5 min"</text>
    </svg>
  );
}

function CopilotDiagram() {
  return (
    <svg viewBox="0 0 320 180" fill="none" className="w-full h-full">
      <rect width={320} height={180} fill={p.bg} rx={8} />
      {/* Editor */}
      <rect x={16} y={12} width={288} height={156} fill={p.white} rx={6} stroke={p.border} strokeWidth={0.8} />
      {/* Line numbers */}
      <rect x={16} y={12} width={24} height={156} fill="#f6f6f8" rx={6} />
      <rect x={34} y={12} width={6} height={156} fill="#f6f6f8" />
      {[24, 36, 48, 60, 72, 84, 96, 108, 120, 132, 144, 156].map((y, i) => (
        <text key={y} x={28} y={y + 8} textAnchor="middle" fill={p.mid} fontSize={7} fontFamily="monospace">{i + 1}</text>
      ))}
      {/* Code lines */}
      <rect x={44} y={26} width={100} height={6} fill={p.mid} rx={1.5} />
      <rect x={44} y={38} width={140} height={6} fill={p.mid} rx={1.5} />
      <rect x={44} y={50} width={80} height={6} fill={p.mid} rx={1.5} />
      <rect x={56} y={62} width={120} height={6} fill={p.mid} rx={1.5} />
      <rect x={56} y={74} width={160} height={6} fill={p.mid} rx={1.5} />
      <rect x={56} y={86} width={90} height={6} fill={p.mid} rx={1.5} />
      <rect x={44} y={98} width={60} height={6} fill={p.mid} rx={1.5} />
      {/* Ghost suggestion */}
      <rect x={44} y={112} width={180} height={6} fill={p.dark} rx={1.5} opacity={0.35} />
      <rect x={44} y={124} width={140} height={6} fill={p.dark} rx={1.5} opacity={0.35} />
      <rect x={44} y={136} width={100} height={6} fill={p.dark} rx={1.5} opacity={0.35} />
      {/* Copilot popup */}
      <rect x={180} y={106} width={118} height={52} fill={p.white} rx={6} stroke={p.dark} strokeWidth={1} strokeDasharray="3 2" />
      <rect x={190} y={114} width={60} height={6} fill={p.dark} rx={1.5} />
      <rect x={190} y={126} width={98} height={5} fill={p.mid} rx={1} />
      <rect x={190} y={136} width={80} height={5} fill={p.mid} rx={1} />
      <rect x={248} y={146} width={40} height={8} fill={p.dark} rx={3} />
      {/* Cursor */}
      <rect x={44} y={110} width={1.5} height={12} fill={p.dark} />
    </svg>
  );
}

function ConversationalDiagram() {
  return (
    <svg viewBox="0 0 320 180" fill="none" className="w-full h-full">
      <rect width={320} height={180} fill={p.bg} rx={8} />
      {/* Sidebar */}
      <rect x={12} y={12} width={70} height={156} fill={p.white} rx={6} stroke={p.border} strokeWidth={0.8} />
      <rect x={20} y={22} width={54} height={8} fill={p.dark} rx={2} />
      <rect x={20} y={38} width={54} height={16} fill={p.dark} rx={4} />
      {[64, 80, 96, 112].map((y) => (
        <rect key={y} x={20} y={y} width={54} height={10} fill={p.fill} rx={3} />
      ))}
      {/* Chat area */}
      <rect x={90} y={12} width={218} height={156} fill={p.white} rx={6} stroke={p.border} strokeWidth={0.8} />
      {/* Header */}
      <rect x={90} y={12} width={218} height={22} fill="#f8f8fa" rx={6} />
      <rect x={90} y={28} width={218} height={6} fill="#f8f8fa" />
      <rect x={102} y={18} width={80} height={10} fill={p.mid} rx={3} />
      {/* Messages */}
      <rect x={200} y={44} width={98} height={22} fill={p.dark} rx={8} />
      <rect x={210} y={50} width={60} height={5} fill={p.fill} rx={1} />
      <rect x={210} y={58} width={40} height={5} fill={p.fill} rx={1} />
      {/* AI */}
      <rect x={102} y={74} width={140} height={34} fill={p.fill} rx={8} />
      <circle cx={114} cy={86} r={6} fill={p.dark} />
      <rect x={126} y={82} width={80} height={4} fill={p.mid} rx={1} />
      <rect x={126} y={90} width={100} height={4} fill={p.mid} rx={1} />
      <rect x={126} y={98} width={60} height={4} fill={p.mid} rx={1} />
      {/* User */}
      <rect x={220} y={116} width={78} height={18} fill={p.dark} rx={8} />
      <rect x={230} y={122} width={50} height={5} fill={p.fill} rx={1} />
      {/* Input */}
      <rect x={98} y={142} width={202} height={18} fill={p.fill} rx={6} />
      <rect x={106} y={147} width={80} height={8} fill={p.mid} rx={2} />
      <rect x={276} y={145} width={18} height={12} fill={p.dark} rx={4} />
    </svg>
  );
}

function GenerativeDiagram() {
  return (
    <svg viewBox="0 0 320 180" fill="none" className="w-full h-full">
      <rect width={320} height={180} fill={p.bg} rx={8} />
      {/* Gallery grid */}
      <rect x={12} y={12} width={296} height={120} fill={p.white} rx={6} stroke={p.border} strokeWidth={0.8} />
      {/* Image cells */}
      <rect x={20} y={20} width={90} height={56} fill={p.fill} rx={4} />
      <rect x={32} y={34} width={66} height={28} fill={p.mid} rx={4} />
      <rect x={118} y={20} width={86} height={56} fill={p.fill} rx={4} />
      <rect x={130} y={34} width={62} height={28} fill={p.mid} rx={4} />
      <rect x={212} y={20} width={88} height={56} fill={p.fill} rx={4} />
      <rect x={224} y={34} width={64} height={28} fill={p.mid} rx={4} />
      {/* Second row */}
      <rect x={20} y={82} width={136} height={42} fill={p.fill} rx={4} />
      <rect x={32} y={90} width={112} height={26} fill={p.mid} rx={4} />
      <rect x={164} y={82} width={136} height={42} fill={p.fill} rx={4} />
      <rect x={176} y={90} width={112} height={26} fill={p.mid} rx={4} />
      {/* Sparkle badges */}
      <circle cx={98} cy={30} r={8} fill={p.dark} />
      <text x={98} y={33} textAnchor="middle" fill={p.white} fontSize={8} fontFamily="Inter,sans-serif">✦</text>
      <circle cx={192} cy={30} r={8} fill={p.dark} />
      <text x={192} y={33} textAnchor="middle" fill={p.white} fontSize={8} fontFamily="Inter,sans-serif">✦</text>
      <circle cx={288} cy={30} r={8} fill={p.dark} />
      <text x={288} y={33} textAnchor="middle" fill={p.white} fontSize={8} fontFamily="Inter,sans-serif">✦</text>
      {/* Prompt input */}
      <rect x={12} y={140} width={296} height={28} fill={p.white} rx={8} stroke={p.border} strokeWidth={0.8} />
      <rect x={24} y={148} width={16} height={12} fill={p.mid} rx={3} />
      <rect x={46} y={150} width={140} height={8} fill={p.mid} rx={2} />
      <rect x={276} y={147} width={24} height={14} fill={p.dark} rx={5} />
    </svg>
  );
}

function MultiAgentDiagram() {
  return (
    <svg viewBox="0 0 320 180" fill="none" className="w-full h-full">
      <rect width={320} height={180} fill={p.bg} rx={8} />
      {/* Central orchestrator */}
      <circle cx={160} cy={80} r={20} fill={p.white} stroke={p.dark} strokeWidth={1.5} />
      <circle cx={160} cy={80} r={10} fill={p.dark} />
      <circle cx={160} cy={80} r={4} fill={p.white} />
      {/* Agent nodes */}
      {[
        { x: 60, y: 50, label: "Research" },
        { x: 260, y: 50, label: "Analysis" },
        { x: 60, y: 120, label: "Writing" },
        { x: 260, y: 120, label: "Review" },
        { x: 160, y: 24, label: "Planning" },
      ].map((agent) => (
        <g key={agent.label}>
          <line x1={160} y1={80} x2={agent.x} y2={agent.y} stroke={p.mid} strokeWidth={1} strokeDasharray="4 3" />
          <circle cx={agent.x} cy={agent.y} r={14} fill={p.white} stroke={p.border} strokeWidth={1} />
          <circle cx={agent.x} cy={agent.y} r={6} fill={p.fill} />
          <text x={agent.x} y={agent.y + 24} textAnchor="middle" fill={p.label} fontSize={7} fontFamily="Inter,sans-serif">{agent.label}</text>
        </g>
      ))}
      {/* Status bar */}
      <rect x={40} y={154} width={240} height={16} fill={p.white} rx={4} stroke={p.border} strokeWidth={0.8} />
      <rect x={48} y={158} width={40} height={8} fill="#a0d8a0" rx={2} />
      <rect x={92} y={158} width={40} height={8} fill="#a0d8a0" rx={2} />
      <rect x={136} y={158} width={40} height={8} fill="#e8d888" rx={2} />
      <rect x={180} y={158} width={40} height={8} fill={p.fill} rx={2} />
      <rect x={224} y={158} width={40} height={8} fill={p.fill} rx={2} />
    </svg>
  );
}

function AutonomousDiagram() {
  return (
    <svg viewBox="0 0 320 180" fill="none" className="w-full h-full">
      <rect width={320} height={180} fill={p.bg} rx={8} />
      {/* Control center */}
      <rect x={12} y={12} width={296} height={156} fill={p.white} rx={6} stroke={p.border} strokeWidth={0.8} />
      {/* Top bar */}
      <rect x={12} y={12} width={296} height={24} fill="#f4f4f7" rx={6} />
      <rect x={12} y={30} width={296} height={6} fill="#f4f4f7" />
      <rect x={24} y={18} width={60} height={12} fill={p.dark} rx={3} />
      {/* Status indicators */}
      <circle cx={260} cy={24} r={5} fill="#a0d8a0" />
      <circle cx={276} cy={24} r={5} fill="#a0d8a0" />
      <circle cx={292} cy={24} r={5} fill="#e8d888" />
      {/* Metrics row */}
      <rect x={24} y={44} width={60} height={38} fill={p.fill} rx={4} />
      <rect x={32} y={50} width={30} height={6} fill={p.mid} rx={1.5} />
      <rect x={32} y={64} width={44} height={12} fill={p.dark} rx={2} />
      <rect x={92} y={44} width={60} height={38} fill={p.fill} rx={4} />
      <rect x={100} y={50} width={30} height={6} fill={p.mid} rx={1.5} />
      <rect x={100} y={64} width={44} height={12} fill={p.dark} rx={2} />
      <rect x={160} y={44} width={60} height={38} fill={p.fill} rx={4} />
      <rect x={168} y={50} width={30} height={6} fill={p.mid} rx={1.5} />
      <rect x={168} y={64} width={44} height={12} fill={p.dark} rx={2} />
      <rect x={228} y={44} width={68} height={38} fill={p.fill} rx={4} />
      <rect x={236} y={50} width={30} height={6} fill={p.mid} rx={1.5} />
      <rect x={236} y={64} width={52} height={12} fill={p.dark} rx={2} />
      {/* Activity log */}
      <rect x={24} y={90} width={178} height={68} fill={p.fill} rx={4} />
      {[96, 108, 120, 132, 144].map((y) => (
        <g key={y}>
          <circle cx={34} cy={y + 4} r={2.5} fill={y < 132 ? "#a0d8a0" : p.mid} />
          <rect x={42} y={y + 1} width={80 + Math.random() * 60} height={5} fill={p.mid} rx={1} />
        </g>
      ))}
      {/* Controls */}
      <rect x={210} y={90} width={86} height={30} fill={p.dark} rx={6} />
      <rect x={222} y={98} width={62} height={8} fill={p.fill} rx={2} />
      <rect x={222} y={110} width={36} height={5} fill={p.fill} rx={1} opacity={0.6} />
      <rect x={210} y={126} width={86} height={30} fill="#cc4444" rx={6} opacity={0.8} />
      <rect x={222} y={134} width={62} height={8} fill={p.white} rx={2} />
      <rect x={222} y={146} width={36} height={5} fill={p.white} rx={1} opacity={0.6} />
    </svg>
  );
}

/* ─── Milestone data ─── */

interface Milestone {
  year: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  diagram: React.ReactNode;
  examples: string[];
  patterns: string;
}

const milestones: Milestone[] = [
  {
    year: "2015",
    title: "Developer AI Interfaces",
    description:
      "The earliest AI interfaces were command-line tools and machine learning frameworks designed exclusively for developers. TensorFlow, Keras, and scikit-learn defined how engineers trained models through scripts, configuration files, and terminal output. The interface was the code itself — no visual feedback, no natural language, no consumer-facing UX.",
    icon: <Terminal className="w-5 h-5" />,
    diagram: <DeveloperDiagram />,
    examples: ["TensorFlow", "Keras", "scikit-learn", "Jupyter Notebooks"],
    patterns: "Command-line interfaces, notebook environments, terminal output",
  },
  {
    year: "2018",
    title: "Voice AI Interfaces",
    description:
      "Voice assistants brought AI interaction to mainstream consumers for the first time. Amazon Alexa, Google Assistant, and Apple Siri popularized conversational interaction through natural language commands. The interface disappeared entirely — replaced by voice as the primary input and output channel. This era established the expectation that AI should understand human intent without explicit instructions.",
    icon: <Mic className="w-5 h-5" />,
    diagram: <VoiceDiagram />,
    examples: ["Amazon Alexa", "Google Assistant", "Apple Siri", "Samsung Bixby"],
    patterns: "Voice-first interfaces, ambient computing, wake-word activation",
  },
  {
    year: "2020",
    title: "AI Copilots",
    description:
      "AI shifted from standalone tools to embedded assistants within existing workflows. GitHub Copilot pioneered inline code suggestions, while Notion AI and Grammarly brought intelligent assistance directly into writing tools. The interaction model became contextual — AI understood what users were doing and offered suggestions without disrupting the primary task flow.",
    icon: <Sparkles className="w-5 h-5" />,
    diagram: <CopilotDiagram />,
    examples: ["GitHub Copilot", "Notion AI", "Grammarly", "Tabnine"],
    patterns: "Inline suggestions, ghost text, contextual overlays, side panels",
  },
  {
    year: "2022",
    title: "Conversational AI",
    description:
      "ChatGPT fundamentally changed how humans interact with AI by introducing a simple chat interface for general-purpose intelligence. The conversational layout — sidebar, message thread, prompt input — became the dominant AI interaction pattern overnight. This era proved that powerful AI could be made accessible through familiar messaging UX, sparking a wave of chat-based AI products.",
    icon: <MessageSquare className="w-5 h-5" />,
    diagram: <ConversationalDiagram />,
    examples: ["ChatGPT", "Claude", "Gemini", "Perplexity"],
    patterns: "Chat interfaces, streaming responses, conversation history, system prompts",
  },
  {
    year: "2024",
    title: "Generative Media AI",
    description:
      "AI expanded beyond text into image generation, video creation, music composition, and voice synthesis. Products like Midjourney, Runway, Suno, and ElevenLabs required entirely new interface patterns — prompt-and-canvas layouts, timeline editors, preview panels, and gallery views. The design challenge shifted from displaying text to orchestrating rich, multimodal creative workflows.",
    icon: <Palette className="w-5 h-5" />,
    diagram: <GenerativeDiagram />,
    examples: ["Midjourney", "DALL·E 3", "Runway", "Suno", "ElevenLabs"],
    patterns: "Prompt + canvas, live preview, timeline editors, gallery grids",
  },
  {
    year: "2026",
    title: "Multi-Agent AI Systems",
    description:
      "AI products evolved from single-model interactions to orchestrated systems of specialized agents working in collaboration. Interfaces now need to represent multiple AI entities with distinct roles — researchers, analysts, writers, reviewers — coordinating on shared tasks. This requires new patterns for agent monitoring, task delegation, and collaborative workflow visualization.",
    icon: <Users className="w-5 h-5" />,
    diagram: <MultiAgentDiagram />,
    examples: ["Agent swarms", "AI team workflows", "Orchestration dashboards", "Task delegation"],
    patterns: "Multi-agent dashboards, agent status views, collaboration timelines",
  },
  {
    year: "2030",
    title: "Autonomous AI Systems",
    description:
      "The most advanced AI interfaces shift the human role from operator to supervisor. Autonomous AI systems execute complex, long-running tasks independently while humans monitor progress, set boundaries, and intervene when needed. These control center interfaces emphasize safety controls, override mechanisms, audit trails, and real-time system health — fundamentally different from any previous interaction model.",
    icon: <Shield className="w-5 h-5" />,
    diagram: <AutonomousDiagram />,
    examples: ["AI control centers", "Safety dashboards", "Override consoles", "Audit systems"],
    patterns: "Control centers, safety overrides, monitoring dashboards, audit logs",
  },
];

/* ─── Evolution flow data ─── */

const evolutionSteps = [
  { label: "Commands", year: "2015", color: "#6e6e80" },
  { label: "Voice", year: "2018", color: "#7a7a90" },
  { label: "Copilots", year: "2020", color: "#8686a0" },
  { label: "Chat", year: "2022", color: "#9292b0" },
  { label: "Creative AI", year: "2024", color: "#9e9ec0" },
  { label: "Agent Systems", year: "2026", color: "#aaaad0" },
  { label: "Autonomous AI", year: "2030", color: "#b6b6e0" },
];

/* ─── Page component ─── */

export function TimelinePage() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const scrollTimeline = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 440;
    scrollRef.current.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#FDFEFF]" style={{ fontFamily: "'Inter', sans-serif" }}>
      <SharedNav />

      {/* Breadcrumb */}
      <div className="max-w-[1440px] mx-auto px-16 pt-8">
        <div className="flex items-center gap-1.5 text-[12px]">
          <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3 text-muted-foreground/40" />
          <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">AI Interface Layout Library</Link>
          <ChevronRight className="w-3 h-3 text-muted-foreground/40" />
          <span className="text-foreground">Evolution Timeline</span>
        </div>
      </div>

      {/* ─── Hero ─── */}
      <section className="max-w-[1440px] mx-auto px-16 pt-14 pb-16">
        <div className="max-w-[740px]">
          <div className="flex items-center gap-2.5 mb-6">
            <span className="inline-block px-2.5 py-1 rounded-md bg-foreground/[0.06] text-[10px] tracking-[0.1em] uppercase text-foreground/60">
              Timeline
            </span>
          </div>

          <h1 className="text-[48px] tracking-[-0.03em] text-foreground leading-[1.1] mb-6">
            AI Interface Evolution Timeline
            <span className="text-muted-foreground ml-3 text-[32px]">(2015–2030)</span>
          </h1>

          <p className="text-[20px] text-muted-foreground leading-[1.55] mb-6 max-w-[650px]">
            How human–AI interaction models evolved from command interfaces to autonomous AI systems
          </p>

          <p className="text-[14px] text-muted-foreground/70 leading-[1.85] max-w-[580px]">
            AI interface design has undergone a rapid transformation over the past decade.
            What began as developer-only command-line tools has expanded into an entire
            ecosystem of interaction models — voice assistants, inline copilots, chat
            interfaces, creative studios, multi-agent dashboards, and autonomous control
            centers. This timeline traces the evolution of how humans interact with AI systems.
          </p>
        </div>

        {/* Year markers strip */}
        <div className="flex items-center gap-0 mt-16 pt-8 border-t border-border">
          {milestones.map((m, i) => (
            <div key={m.year} className="flex items-center flex-1">
              <button
                onClick={() => {
                  setActiveIdx(i);
                  if (scrollRef.current) {
                    scrollRef.current.scrollTo({ left: i * 420, behavior: "smooth" });
                  }
                }}
                className={`flex flex-col items-center cursor-pointer transition-all duration-300 group ${
                  activeIdx === i ? "scale-105" : ""
                }`}
                style={{ background: "none", border: "none", padding: 0 }}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    activeIdx === i
                      ? "bg-foreground text-background"
                      : "bg-foreground/[0.06] text-foreground/50 group-hover:bg-foreground/10"
                  }`}
                >
                  {m.icon}
                </div>
                <span
                  className={`text-[13px] mt-2 transition-colors ${
                    activeIdx === i ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {m.year}
                </span>
                <span className="text-[10px] text-muted-foreground/50 mt-0.5 max-w-[100px] text-center leading-tight">
                  {m.title}
                </span>
              </button>
              {i < milestones.length - 1 && (
                <div className="flex-1 h-px bg-border mx-3 mt-[-20px]" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ─── Horizontal scrolling timeline ─── */}
      <section className="w-full border-t border-border bg-[#F8FAFC]">
        <div className="max-w-[1440px] mx-auto px-16 py-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-1.5 h-1.5 rounded-full bg-foreground" />
                <span className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground">
                  Milestones
                </span>
              </div>
              <h2 className="text-[28px] tracking-[-0.02em] text-foreground leading-[1.2]">
                Seven defining eras of AI interface design
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => scrollTimeline("left")}
                className="w-10 h-10 rounded-lg border border-border bg-white flex items-center justify-center hover:bg-foreground/[0.03] transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4 text-foreground" />
              </button>
              <button
                onClick={() => scrollTimeline("right")}
                className="w-10 h-10 rounded-lg border border-border bg-white flex items-center justify-center hover:bg-foreground/[0.03] transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4 text-foreground" />
              </button>
            </div>
          </div>

          {/* Timeline track */}
          <div className="relative">
            {/* Connecting line */}
            <div className="absolute top-[14px] left-0 right-0 h-px bg-border z-0" />

            <div
              ref={scrollRef}
              className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {milestones.map((m, i) => (
                <div
                  key={m.year}
                  className="snap-start shrink-0 w-[400px]"
                  onMouseEnter={() => setActiveIdx(i)}
                  onMouseLeave={() => setActiveIdx(null)}
                >
                  {/* Year dot + line */}
                  <div className="flex items-center gap-3 mb-5 relative z-10">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${
                        activeIdx === i
                          ? "bg-foreground text-background scale-110"
                          : "bg-white border-2 border-[#CBD5E1] text-foreground/50"
                      }`}
                    >
                      <span className="text-[9px]" style={{ fontVariantNumeric: "tabular-nums" }}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <span className="text-[14px] text-foreground tabular-nums">{m.year}</span>
                    <div className="h-px flex-1 bg-border" />
                  </div>

                  {/* Card */}
                  <div
                    className={`rounded-2xl border bg-white overflow-hidden transition-all duration-300 ${
                      activeIdx === i
                        ? "shadow-lg border-[#2563EB]/30 -translate-y-1"
                        : "shadow-sm border-border hover:shadow-md"
                    }`}
                  >
                    {/* Diagram */}
                    <div className="aspect-[16/9] bg-[#F1F5F9] overflow-hidden">
                      <div
                        className="w-full h-full transition-transform duration-500"
                        style={{ transform: activeIdx === i ? "scale(1.02)" : "scale(1)" }}
                      >
                        {m.diagram}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-9 h-9 rounded-lg bg-foreground/[0.05] flex items-center justify-center text-foreground/60">
                          {m.icon}
                        </div>
                        <div>
                          <h3 className="text-[16px] text-foreground tracking-tight">{m.title}</h3>
                          <span className="text-[11px] text-muted-foreground/50 tabular-nums">{m.year}</span>
                        </div>
                      </div>

                      <p className="text-[13px] text-muted-foreground leading-[1.75] mb-4">
                        {m.description}
                      </p>

                      {/* Examples */}
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {m.examples.map((ex) => (
                          <span
                            key={ex}
                            className="px-2 py-0.5 rounded-md bg-foreground/[0.04] text-[10px] text-foreground/60"
                          >
                            {ex}
                          </span>
                        ))}
                      </div>

                      {/* Patterns */}
                      <div className="pt-3 border-t border-border">
                        <span className="text-[10px] tracking-[0.1em] uppercase text-muted-foreground/50">
                          Interface patterns
                        </span>
                        <p className="text-[12px] text-muted-foreground leading-[1.6] mt-1">
                          {m.patterns}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Vertical detailed timeline ─── */}
      <section className="w-full border-t border-border">
        <div className="max-w-[1440px] mx-auto px-16 py-20">
          <div className="max-w-[540px] mb-14">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-1.5 h-1.5 rounded-full bg-foreground" />
              <span className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground">
                Detailed View
              </span>
            </div>
            <h2 className="text-[28px] tracking-[-0.02em] text-foreground leading-[1.2] mb-3">
              Each era in context
            </h2>
            <p className="text-[14px] text-muted-foreground leading-[1.7]">
              A vertical walkthrough of every milestone with representative interface diagrams
              and the key interaction patterns that defined each era.
            </p>
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[39px] top-0 bottom-0 w-px bg-border" />

            <div className="flex flex-col gap-16">
              {milestones.map((m, i) => (
                <div key={m.year} className="flex gap-12 relative">
                  {/* Year badge on vertical line */}
                  <div className="shrink-0 w-[80px] flex flex-col items-center relative z-10">
                    <div className="w-[80px] h-[80px] rounded-2xl bg-foreground flex flex-col items-center justify-center text-background">
                      <span className="text-[22px] tracking-[-0.02em]">{m.year}</span>
                      <span className="text-[8px] opacity-60 mt-0.5">Era {i + 1}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 flex gap-8 items-start">
                    {/* Diagram */}
                    <div className="w-[380px] shrink-0 rounded-2xl border border-border overflow-hidden bg-white shadow-sm">
                      {m.diagram}
                    </div>

                    {/* Text */}
                    <div className="flex-1 pt-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-foreground/[0.05] flex items-center justify-center text-foreground/60">
                          {m.icon}
                        </div>
                        <h3 className="text-[20px] text-foreground tracking-tight">{m.title}</h3>
                      </div>

                      <p className="text-[14px] text-muted-foreground leading-[1.8] mb-5">
                        {m.description}
                      </p>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="rounded-xl bg-foreground/[0.02] border border-border p-4">
                          <span className="text-[10px] tracking-[0.1em] uppercase text-muted-foreground/50 block mb-2">
                            Key Products
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {m.examples.map((ex) => (
                              <span key={ex} className="px-2 py-0.5 rounded-md bg-[#F1F5F9] text-[11px] text-foreground/70 border border-border">
                                {ex}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="rounded-xl bg-foreground/[0.02] border border-border p-4">
                          <span className="text-[10px] tracking-[0.1em] uppercase text-muted-foreground/50 block mb-2">
                            UI Patterns
                          </span>
                          <p className="text-[12px] text-muted-foreground leading-[1.65]">{m.patterns}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Evolution insight ─── */}
      <section className="w-full border-t border-border bg-[#F8FAFC]">
        <div className="max-w-[1440px] mx-auto px-16 py-20">
          <div className="max-w-[540px] mb-14">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-1.5 h-1.5 rounded-full bg-foreground" />
              <span className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground">
                The Big Picture
              </span>
            </div>
            <h2 className="text-[28px] tracking-[-0.02em] text-foreground leading-[1.2] mb-3">
              The Evolution at a Glance
            </h2>
            <p className="text-[14px] text-muted-foreground leading-[1.7]">
              From typing commands in a terminal to supervising autonomous AI systems —
              each era represents a fundamental shift in the relationship between humans and AI.
            </p>
          </div>

          {/* Evolution flow */}
          <div className="rounded-2xl border border-border bg-white p-10 shadow-sm">
            <div className="flex items-center justify-between">
              {evolutionSteps.map((step, i) => (
                <div key={step.label} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className="w-[140px] h-[64px] rounded-xl flex flex-col items-center justify-center border border-border transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
                      style={{ backgroundColor: step.color + "18", borderColor: step.color + "30" }}
                    >
                      <span className="text-[13px] text-foreground">{step.label}</span>
                      <span className="text-[10px] text-muted-foreground/50 mt-1">{step.year}</span>
                    </div>
                  </div>
                  {i < evolutionSteps.length - 1 && (
                    <ArrowRight className="w-4 h-4 text-muted-foreground/30 mx-2 shrink-0" />
                  )}
                </div>
              ))}
            </div>

            {/* Narrative bar */}
            <div className="mt-8 pt-6 border-t border-border flex items-center gap-12">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] tracking-[0.1em] uppercase text-muted-foreground/50">Human Control</span>
                  <span className="text-[10px] tracking-[0.1em] uppercase text-muted-foreground/50">AI Autonomy</span>
                </div>
                <div className="w-full h-3 rounded-full bg-foreground/[0.04] overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      background: "linear-gradient(to right, #6e6e80, #adadb8, #c4c4ce)",
                      width: "100%",
                    }}
                  />
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-[10px] text-muted-foreground/40">Manual operation</span>
                  <span className="text-[10px] text-muted-foreground/40">Supervised autonomy</span>
                </div>
              </div>
            </div>
          </div>

          {/* Insight cards */}
          <div className="grid grid-cols-3 gap-6 mt-8">
            <div className="rounded-xl border border-border bg-white p-6">
              <div className="text-[36px] tracking-[-0.02em] text-foreground mb-1">15 years</div>
              <div className="text-[12px] text-muted-foreground/60 mb-3">of rapid evolution</div>
              <p className="text-[13px] text-muted-foreground leading-[1.7]">
                AI interfaces evolved from developer-only tools to consumer products used by
                hundreds of millions in less than a decade.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-white p-6">
              <div className="text-[36px] tracking-[-0.02em] text-foreground mb-1">7 eras</div>
              <div className="text-[12px] text-muted-foreground/60 mb-3">of interaction models</div>
              <p className="text-[13px] text-muted-foreground leading-[1.7]">
                Each era introduced fundamentally new interaction patterns that expanded
                what was possible in human–AI collaboration.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-white p-6">
              <div className="text-[36px] tracking-[-0.02em] text-foreground mb-1">27 patterns</div>
              <div className="text-[12px] text-muted-foreground/60 mb-3">documented in the library</div>
              <p className="text-[13px] text-muted-foreground leading-[1.7]">
                The AI Interface Layout Library captures the full spectrum of interaction
                patterns across all seven evolutionary eras.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="w-full border-t border-border">
        <div className="max-w-[1440px] mx-auto px-16 py-16 flex items-center justify-between">
          <div>
            <h3 className="text-[18px] text-foreground mb-1.5">Explore the full pattern library</h3>
            <p className="text-[13px] text-muted-foreground">
              See all 27 AI interface layout patterns organized by category.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/categories"
              className="flex items-center gap-2 px-6 py-3 rounded-lg border border-border bg-white text-foreground text-[13px] hover:bg-foreground/[0.03] transition-colors no-underline"
            >
              View Categories
            </Link>
            <Link
              to="/"
              className="flex items-center gap-2 px-6 py-3 rounded-lg bg-foreground text-background text-[13px] hover:opacity-90 transition-opacity no-underline"
            >
              View Full Library
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      <SharedFooter />
    </div>
  );
}