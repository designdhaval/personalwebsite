import { Link } from "react-router";
import { ChevronRight, ArrowRight, Lightbulb, BookOpen, Layers, Zap } from "lucide-react";
import { SharedNav, SharedFooter } from "./shared-nav";

/* ─── Shared diagram palette ─── */
const p = {
  bg: "#F1F5F9",
  fill: "#E2E8F0",
  mid: "#CBD5E1",
  dark: "#94A3B8",
  label: "#64748B",
  border: "#E2E8F0",
  white: "#FFFFFF",
};

/* ─── Core block wireframe diagrams ─── */

function SidebarDiagram() {
  return (
    <svg viewBox="0 0 280 200" fill="none" className="w-full h-full">
      <rect width={280} height={200} fill={p.bg} rx={8} />
      {/* Sidebar */}
      <rect x={0} y={0} width={72} height={200} fill={p.fill} rx={8} />
      <rect x={72} y={0} width={1} height={200} fill={p.border} />
      {/* Logo area */}
      <rect x={12} y={14} width={48} height={8} fill={p.dark} rx={2} />
      {/* New action button */}
      <rect x={12} y={32} width={48} height={20} fill={p.dark} rx={5} />
      <rect x={22} y={38} width={28} height={8} fill={p.fill} rx={2} />
      {/* Nav items */}
      {[64, 84, 104, 124, 144].map((y, i) => (
        <g key={y}>
          <rect x={10} y={y} width={52} height={14} fill={i === 0 ? p.white : "transparent"} rx={4} stroke={i === 0 ? p.border : "none"} strokeWidth={0.8} />
          <rect x={16} y={y + 3} width={8} height={8} fill={i === 0 ? p.dark : p.mid} rx={2} />
          <rect x={28} y={y + 4} width={28} height={6} fill={i === 0 ? p.dark : p.mid} rx={1.5} />
        </g>
      ))}
      {/* Main content placeholder */}
      <rect x={84} y={14} width={184} height={172} fill={p.fill} rx={6} />
      <rect x={100} y={80} width={150} height={8} fill={p.mid} rx={2} />
      <rect x={120} y={96} width={110} height={6} fill={p.mid} rx={2} />
      {/* Labels */}
      <text x={36} y={190} textAnchor="middle" fill={p.label} fontSize={8} fontFamily="Inter,sans-serif" fontWeight={500}>SIDEBAR</text>
      <text x={176} y={190} textAnchor="middle" fill={p.label} fontSize={8} fontFamily="Inter,sans-serif" fontWeight={500}>MAIN CONTENT</text>
    </svg>
  );
}

function CanvasDiagram() {
  return (
    <svg viewBox="0 0 280 200" fill="none" className="w-full h-full">
      <rect width={280} height={200} fill={p.bg} rx={8} />
      {/* Toolbar top */}
      <rect x={0} y={0} width={280} height={24} fill={p.fill} rx={8} />
      <rect x={280 - 8} y={24 - 8} width={8} height={8} fill={p.fill} />
      {[12, 36, 60, 84].map((x) => (
        <rect key={x} x={x} y={7} width={18} height={10} fill={p.mid} rx={3} />
      ))}
      {/* Canvas area with scattered elements */}
      <rect x={24} y={40} width={90} height={64} fill={p.fill} rx={6} />
      <rect x={32} y={48} width={74} height={38} fill={p.mid} rx={4} />
      <rect x={44} y={94} width={50} height={6} fill={p.dark} rx={1.5} />
      <rect x={140} y={56} width={116} height={80} fill={p.fill} rx={6} />
      <rect x={150} y={66} width={96} height={48} fill={p.mid} rx={4} />
      <rect x={162} y={124} width={72} height={6} fill={p.dark} rx={1.5} />
      <rect x={40} y={120} width={70} height={60} fill={p.fill} rx={6} />
      <rect x={48} y={128} width={54} height={34} fill={p.mid} rx={4} />
      <rect x={52} y={170} width={46} height={5} fill={p.dark} rx={1.5} />
      <rect x={140} y={148} width={80} height={36} fill={p.fill} rx={6} />
      <rect x={148} y={154} width={64} height={18} fill={p.mid} rx={3} />
      {/* Label */}
      <text x={140} y={196} textAnchor="middle" fill={p.label} fontSize={8} fontFamily="Inter,sans-serif" fontWeight={500}>CANVAS / WORKSPACE</text>
    </svg>
  );
}

function AssistantPanelDiagram() {
  return (
    <svg viewBox="0 0 280 200" fill="none" className="w-full h-full">
      <rect width={280} height={200} fill={p.bg} rx={8} />
      {/* Main content area */}
      <rect x={12} y={12} width={172} height={176} fill={p.fill} rx={6} />
      <rect x={24} y={24} width={148} height={80} fill={p.mid} rx={4} />
      <rect x={24} y={114} width={70} height={60} fill={p.mid} rx={4} />
      <rect x={102} y={114} width={70} height={60} fill={p.mid} rx={4} />
      {/* Divider */}
      <rect x={192} y={0} width={1} height={200} fill={p.border} />
      {/* Assistant panel */}
      <rect x={193} y={0} width={87} height={200} fill={p.fill} rx={8} />
      <rect x={193} y={0} width={4} height={200} fill={p.fill} />
      {/* Panel title */}
      <rect x={203} y={16} width={56} height={8} fill={p.dark} rx={2} />
      {/* Chat bubbles */}
      <rect x={203} y={34} width={68} height={22} fill={p.mid} rx={5} />
      <rect x={209} y={40} width={50} height={4} fill={p.dark} rx={1} />
      <rect x={209} y={48} width={36} height={4} fill={p.dark} rx={1} />
      <rect x={215} y={64} width={60} height={18} fill={p.white} rx={5} stroke={p.border} strokeWidth={0.8} />
      <rect x={221} y={70} width={40} height={4} fill={p.mid} rx={1} />
      <rect x={203} y={90} width={68} height={30} fill={p.mid} rx={5} />
      <rect x={209} y={96} width={50} height={4} fill={p.dark} rx={1} />
      <rect x={209} y={104} width={42} height={4} fill={p.dark} rx={1} />
      <rect x={209} y={112} width={30} height={4} fill={p.dark} rx={1} />
      {/* Input */}
      <rect x={203} y={174} width={68} height={16} fill={p.mid} rx={4} />
      <rect x={251} y={177} width={16} height={10} fill={p.dark} rx={3} />
      {/* Labels */}
      <text x={98} y={192} textAnchor="middle" fill={p.label} fontSize={8} fontFamily="Inter,sans-serif" fontWeight={500}>MAIN CONTENT</text>
      <text x={237} y={160} textAnchor="middle" fill={p.label} fontSize={8} fontFamily="Inter,sans-serif" fontWeight={500}>ASSISTANT</text>
      <text x={237} y={170} textAnchor="middle" fill={p.label} fontSize={8} fontFamily="Inter,sans-serif" fontWeight={500}>PANEL</text>
    </svg>
  );
}

function TimelineDiagram() {
  return (
    <svg viewBox="0 0 280 200" fill="none" className="w-full h-full">
      <rect width={280} height={200} fill={p.bg} rx={8} />
      {/* Preview area */}
      <rect x={12} y={12} width={256} height={120} fill={p.fill} rx={6} />
      <rect x={90} y={40} width={100} height={60} fill={p.mid} rx={6} />
      <rect x={120} y={60} width={40} height={20} fill={p.dark} rx={4} />
      {/* Timeline area */}
      <rect x={12} y={140} width={256} height={48} fill={p.fill} rx={6} />
      {/* Tracks */}
      <rect x={18} y={146} width={100} height={12} fill={p.mid} rx={3} />
      <rect x={130} y={146} width={60} height={12} fill={p.dark} rx={3} />
      <rect x={200} y={146} width={50} height={12} fill={p.mid} rx={3} />
      <rect x={18} y={162} width={160} height={12} fill={p.dark} rx={3} />
      <rect x={190} y={162} width={60} height={12} fill={p.mid} rx={3} />
      {/* Playhead */}
      <line x1={160} y1={140} x2={160} y2={188} stroke={p.dark} strokeWidth={1.5} />
      <circle cx={160} cy={140} r={3} fill={p.dark} />
      {/* Labels */}
      <text x={140} y={106} textAnchor="middle" fill={p.label} fontSize={8} fontFamily="Inter,sans-serif" fontWeight={500}>PREVIEW AREA</text>
      <text x={140} y={196} textAnchor="middle" fill={p.label} fontSize={8} fontFamily="Inter,sans-serif" fontWeight={500}>TIMELINE</text>
    </svg>
  );
}

function PromptInputDiagram() {
  return (
    <svg viewBox="0 0 280 200" fill="none" className="w-full h-full">
      <rect width={280} height={200} fill={p.bg} rx={8} />
      {/* Content area above */}
      <rect x={12} y={12} width={256} height={120} fill={p.fill} rx={6} />
      {/* Content lines */}
      <rect x={32} y={30} width={160} height={6} fill={p.mid} rx={1.5} />
      <rect x={32} y={44} width={200} height={6} fill={p.mid} rx={1.5} />
      <rect x={32} y={58} width={140} height={6} fill={p.mid} rx={1.5} />
      <rect x={32} y={76} width={180} height={6} fill={p.mid} rx={1.5} />
      <rect x={32} y={90} width={210} height={6} fill={p.mid} rx={1.5} />
      <rect x={32} y={104} width={120} height={6} fill={p.mid} rx={1.5} />
      {/* Prompt input bar */}
      <rect x={12} y={146} width={256} height={42} fill={p.white} rx={10} stroke={p.border} strokeWidth={1.2} />
      {/* Attachment icon */}
      <rect x={24} y={158} width={18} height={18} fill={p.mid} rx={4} />
      {/* Placeholder text */}
      <rect x={50} y={162} width={120} height={8} fill={p.mid} rx={2} />
      {/* Send button */}
      <rect x={236} y={156} width={24} height={22} fill={p.dark} rx={6} />
      {/* Labels */}
      <text x={140} y={80} textAnchor="middle" fill={p.label} fontSize={8} fontFamily="Inter,sans-serif" fontWeight={500}>CONTENT AREA</text>
      <text x={140} y={198} textAnchor="middle" fill={p.label} fontSize={8} fontFamily="Inter,sans-serif" fontWeight={500}>PROMPT INPUT</text>
    </svg>
  );
}

/* ─── Construction diagram: Chat layout assembled from blocks ─── */

function ConstructionDiagram() {
  return (
    <svg viewBox="0 0 880 360" fill="none" className="w-full h-auto">
      <rect width={880} height={360} fill={p.bg} rx={12} />

      {/* ── Block A: Sidebar ── */}
      <rect x={24} y={24} width={160} height={312} fill={p.white} rx={8} stroke={p.border} strokeWidth={1} />
      {/* Label badge */}
      <rect x={36} y={34} width={60} height={16} fill={p.dark} rx={4} />
      <text x={66} y={45} textAnchor="middle" fill={p.white} fontSize={8} fontFamily="Inter,sans-serif" fontWeight={500}>SIDEBAR</text>
      {/* Logo */}
      <rect x={36} y={60} width={80} height={8} fill={p.fill} rx={2} />
      {/* New chat btn */}
      <rect x={36} y={78} width={136} height={22} fill={p.dark} rx={5} />
      <rect x={56} y={84} width={96} height={10} fill={p.fill} rx={2} />
      {/* Search */}
      <rect x={36} y={110} width={136} height={18} fill={p.fill} rx={5} />
      <rect x={46} y={116} width={60} height={6} fill={p.mid} rx={1.5} />
      {/* Conversation items */}
      {[140, 164, 188, 212, 236].map((y, i) => (
        <g key={y}>
          <rect x={36} y={y} width={136} height={18} fill={i === 0 ? p.fill : "transparent"} rx={4} stroke={i === 0 ? p.border : "none"} strokeWidth={0.6} />
          <rect x={44} y={y + 4} width={10} height={10} fill={i === 0 ? p.dark : p.mid} rx={2} />
          <rect x={60} y={y + 6} width={70 - i * 6} height={6} fill={i === 0 ? p.dark : p.mid} rx={1.5} />
        </g>
      ))}
      {/* Settings */}
      <rect x={36} y={300} width={136} height={18} fill={p.fill} rx={4} />
      <rect x={44} y={306} width={10} height={6} fill={p.mid} rx={1.5} />
      <rect x={60} y={306} width={40} height={6} fill={p.mid} rx={1.5} />

      {/* ── Divider ── */}
      <rect x={192} y={24} width={1} height={312} fill={p.border} />

      {/* ── Block B: Conversation Thread ── */}
      <rect x={196} y={24} width={480} height={252} fill={p.white} rx={8} stroke={p.border} strokeWidth={1} />
      {/* Label badge */}
      <rect x={208} y={34} width={128} height={16} fill={p.dark} rx={4} />
      <text x={272} y={45} textAnchor="middle" fill={p.white} fontSize={8} fontFamily="Inter,sans-serif" fontWeight={500}>CONVERSATION THREAD</text>
      {/* Header bar */}
      <rect x={208} y={58} width={456} height={24} fill={p.fill} rx={5} />
      <rect x={220} y={66} width={80} height={8} fill={p.mid} rx={2} />
      <rect x={620} y={66} width={32} height={8} fill={p.mid} rx={2} />
      {/* User message */}
      <rect x={420} y={94} width={240} height={30} fill={p.dark} rx={8} />
      <rect x={434} y={104} width={160} height={6} fill={p.fill} rx={1.5} />
      <rect x={434} y={114} width={100} height={6} fill={p.fill} rx={1.5} />
      {/* AI message */}
      <rect x={220} y={136} width={320} height={50} fill={p.fill} rx={8} />
      <circle cx={238} cy={152} r={10} fill={p.dark} />
      <rect x={256} y={148} width={60} height={6} fill={p.dark} rx={1.5} />
      <rect x={256} y={160} width={260} height={5} fill={p.mid} rx={1} />
      <rect x={256} y={170} width={220} height={5} fill={p.mid} rx={1} />
      {/* User message 2 */}
      <rect x={460} y={198} width={200} height={26} fill={p.dark} rx={8} />
      <rect x={474} y={206} width={140} height={6} fill={p.fill} rx={1.5} />
      {/* AI message 2 */}
      <rect x={220} y={234} width={280} height={32} fill={p.fill} rx={8} />
      <circle cx={238} cy={248} r={10} fill={p.dark} />
      <rect x={256} y={242} width={50} height={6} fill={p.dark} rx={1.5} />
      <rect x={256} y={252} width={220} height={5} fill={p.mid} rx={1} />

      {/* ── Block C: Prompt Input ── */}
      <rect x={196} y={284} width={480} height={52} fill={p.white} rx={8} stroke={p.border} strokeWidth={1} />
      {/* Label badge */}
      <rect x={208} y={292} width={90} height={16} fill={p.dark} rx={4} />
      <text x={253} y={303} textAnchor="middle" fill={p.white} fontSize={8} fontFamily="Inter,sans-serif" fontWeight={500}>PROMPT INPUT</text>
      {/* Input field */}
      <rect x={310} y={292} width={320} height={32} fill={p.fill} rx={8} />
      <rect x={322} y={302} width={16} height={14} fill={p.mid} rx={3} />
      <rect x={346} y={304} width={120} height={8} fill={p.mid} rx={2} />
      <rect x={598} y={298} width={24} height={20} fill={p.dark} rx={5} />

      {/* ── Assembly arrows ── */}
      {/* Arrow from sidebar to thread */}
      <line x1={186} y1={180} x2={194} y2={180} stroke={p.dark} strokeWidth={1.5} strokeDasharray="4 3" />
      {/* Arrow from thread to input */}
      <line x1={436} y1={278} x2={436} y2={282} stroke={p.dark} strokeWidth={1.5} strokeDasharray="4 3" />
    </svg>
  );
}

/* ─── Diagram style rule visual ─── */

function StyleRuleDiagram({ type }: { type: "regions" | "labels" | "minimal" | "architecture" }) {
  const h = 120;
  const w = 200;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} fill="none" className="w-full h-full">
      <rect width={w} height={h} fill={p.bg} rx={6} />
      {type === "regions" && (
        <>
          <rect x={8} y={8} width={60} height={h - 16} fill={p.fill} rx={4} />
          <rect x={76} y={8} width={w - 84} height={50} fill={p.fill} rx={4} />
          <rect x={76} y={64} width={w - 84} height={h - 72} fill={p.fill} rx={4} />
        </>
      )}
      {type === "labels" && (
        <>
          <rect x={8} y={8} width={60} height={h - 16} fill={p.fill} rx={4} />
          <text x={38} y={h / 2 + 2} textAnchor="middle" fill={p.label} fontSize={7} fontFamily="Inter,sans-serif">Sidebar</text>
          <rect x={76} y={8} width={w - 84} height={h - 16} fill={p.fill} rx={4} />
          <text x={76 + (w - 84) / 2} y={h / 2 + 2} textAnchor="middle" fill={p.label} fontSize={7} fontFamily="Inter,sans-serif">Canvas</text>
        </>
      )}
      {type === "minimal" && (
        <>
          <rect x={8} y={8} width={w - 16} height={h - 16} fill={p.fill} rx={4} />
          <rect x={20} y={20} width={w - 40} height={h - 40} fill={p.mid} rx={4} />
          <rect x={60} y={46} width={80} height={20} fill={p.dark} rx={4} />
        </>
      )}
      {type === "architecture" && (
        <>
          <rect x={8} y={8} width={40} height={h - 16} fill={p.fill} rx={4} />
          <rect x={54} y={8} width={w - 100} height={(h - 24) * 0.7} fill={p.fill} rx={4} />
          <rect x={54} y={8 + (h - 24) * 0.7 + 6} width={w - 100} height={(h - 24) * 0.3 - 6} fill={p.fill} rx={4} />
          <rect x={w - 42} y={8} width={34} height={h - 16} fill={p.fill} rx={4} />
        </>
      )}
    </svg>
  );
}

/* ─── Style rule data ─── */

const styleRules = [
  {
    type: "regions" as const,
    title: "Interface Regions",
    description: "Light grey rectangles represent distinct functional areas of the interface. Each rectangle maps to a zone that serves a specific purpose in the layout.",
  },
  {
    type: "labels" as const,
    title: "Functional Labels",
    description: "Simple text labels identify each region's role. Labels describe what happens in each zone rather than prescribing visual design details.",
  },
  {
    type: "minimal" as const,
    title: "Minimal Structure",
    description: "Diagrams use only shapes and neutral tones — no color, icons, or UI styling. This keeps focus on spatial relationships and information hierarchy.",
  },
  {
    type: "architecture" as const,
    title: "Layout Architecture",
    description: "Diagrams communicate how interface zones are arranged relative to each other — proportions, nesting, and adjacency — not pixel-level design.",
  },
];

/* ─── Core block data ─── */

const coreBlocks = [
  {
    name: "Sidebar",
    description: "A vertical navigation panel anchored to the left edge. Houses conversation history, thread lists, tool navigation, or workspace switching. Typically 200–280px wide.",
    diagram: <SidebarDiagram />,
  },
  {
    name: "Canvas / Workspace",
    description: "The primary content area where users interact with AI-generated outputs. Can be a freeform canvas, document editor, code view, or infinite scrolling workspace.",
    diagram: <CanvasDiagram />,
  },
  {
    name: "Assistant Panel",
    description: "A contextual side panel providing AI assistance alongside the main content. Displays suggestions, chat threads, or analysis results without disrupting the primary workflow.",
    diagram: <AssistantPanelDiagram />,
  },
  {
    name: "Timeline",
    description: "A horizontal track-based component for sequencing content over time. Used in video, audio, and animation tools with playhead controls and multi-track layering.",
    diagram: <TimelineDiagram />,
  },
  {
    name: "Prompt Input",
    description: "A text input component for composing natural language instructions. Anchored to the bottom of the viewport with support for attachments, formatting, and model selection.",
    diagram: <PromptInputDiagram />,
  },
];

/* ─── Why reasons ─── */

const whyReasons = [
  {
    icon: <Zap className="w-5 h-5" />,
    title: "AI interfaces are evolving fast",
    description: "New interaction patterns emerge constantly as AI capabilities expand. A shared diagram language helps teams evaluate and adopt patterns without starting from scratch each time.",
  },
  {
    icon: <BookOpen className="w-5 h-5" />,
    title: "Designers need shared vocabulary",
    description: "When discussing layout architecture, teams benefit from a consistent visual shorthand. These diagrams serve as a common reference point across design, engineering, and product.",
  },
  {
    icon: <Layers className="w-5 h-5" />,
    title: "Patterns are composable",
    description: "Complex AI interfaces are built by combining simpler blocks. Understanding the building blocks — sidebars, panels, timelines — makes it easier to design and document new patterns.",
  },
  {
    icon: <Lightbulb className="w-5 h-5" />,
    title: "Structure over style",
    description: "The diagram system deliberately strips away visual design to focus on spatial relationships. This separation allows designers to reason about layout architecture independently from aesthetics.",
  },
];

/* ─── Page component ─── */

export function DiagramSystemPage() {
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
          <span className="text-foreground">Diagram System</span>
        </div>
      </div>

      {/* ─── Hero Section ─── */}
      <section className="max-w-[1440px] mx-auto px-16 pt-14 pb-20">
        <div className="max-w-[740px]">
          <div className="flex items-center gap-2.5 mb-6">
            <span className="inline-block px-2.5 py-1 rounded-md bg-foreground/[0.06] text-[10px] tracking-[0.1em] uppercase text-foreground/60">
              Documentation
            </span>
          </div>

          <h1 className="text-[48px] tracking-[-0.03em] text-foreground leading-[1.1] mb-6">
            AI Layout Diagram System
          </h1>

          <p className="text-[20px] text-muted-foreground leading-[1.55] mb-6 max-w-[620px]">
            A visual language for representing AI interface structures
          </p>

          <p className="text-[14px] text-muted-foreground/70 leading-[1.85] max-w-[580px]">
            AI product interfaces share a set of recurring structural patterns — sidebars,
            canvases, assistant panels, timelines, and prompt inputs. This diagram system
            provides a consistent, minimal visual language for documenting how these
            reusable blocks are arranged to form complete interface layouts.
          </p>
        </div>
      </section>

      {/* ─── Core Layout Blocks ─── */}
      <section className="w-full border-t border-border bg-[#F8FAFC]">
        <div className="max-w-[1440px] mx-auto px-16 py-20">
          <div className="max-w-[540px] mb-14">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-1.5 h-1.5 rounded-full bg-foreground" />
              <span className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground">
                Building Blocks
              </span>
            </div>
            <h2 className="text-[28px] tracking-[-0.02em] text-foreground leading-[1.2] mb-3">
              Core Layout Blocks
            </h2>
            <p className="text-[14px] text-muted-foreground leading-[1.7]">
              Every AI interface layout is composed from a small set of fundamental interface
              blocks. These are the spatial primitives used to construct complex interaction patterns.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {coreBlocks.map((block) => (
              <div
                key={block.name}
                className="group rounded-2xl border border-border bg-white overflow-hidden hover:shadow-lg hover:border-[#06B6D4]/20 transition-all duration-300"
              >
                <div className="aspect-[7/5] bg-[#F1F5F9] p-5 overflow-hidden">
                  <div
                    className="w-full h-full rounded-lg overflow-hidden border border-[#E2E8F0]/50 transition-transform duration-500 group-hover:scale-[1.02]"
                  >
                    {block.diagram}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-[16px] text-foreground mb-2 tracking-tight">{block.name}</h3>
                  <p className="text-[13px] text-muted-foreground leading-[1.75]">
                    {block.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Diagram Style Rules ─── */}
      <section className="w-full border-t border-border">
        <div className="max-w-[1440px] mx-auto px-16 py-20">
          <div className="max-w-[540px] mb-14">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-1.5 h-1.5 rounded-full bg-foreground" />
              <span className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground">
                Visual Language
              </span>
            </div>
            <h2 className="text-[28px] tracking-[-0.02em] text-foreground leading-[1.2] mb-3">
              Diagram Style Rules
            </h2>
            <p className="text-[14px] text-muted-foreground leading-[1.7]">
              The visual language follows strict constraints to keep diagrams readable,
              consistent, and focused on layout architecture rather than visual design.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {styleRules.map((rule) => (
              <div
                key={rule.title}
                className="rounded-2xl border border-border bg-white p-6 hover:shadow-md hover:border-[#06B6D4]/20 transition-all duration-300"
              >
                <div className="flex gap-6">
                  <div className="w-[200px] shrink-0 rounded-xl overflow-hidden border border-border">
                    <StyleRuleDiagram type={rule.type} />
                  </div>
                  <div className="flex-1 py-1">
                    <h3 className="text-[15px] text-foreground mb-2.5 tracking-tight">{rule.title}</h3>
                    <p className="text-[13px] text-muted-foreground leading-[1.75]">
                      {rule.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Palette strip */}
          <div className="mt-10 rounded-xl border border-border bg-white p-6">
            <div className="text-[11px] tracking-[0.1em] uppercase text-muted-foreground/50 mb-4">Color Palette</div>
            <div className="flex items-center gap-4">
              {[
                { color: p.bg, label: "Background" },
                { color: p.fill, label: "Region fill" },
                { color: p.mid, label: "Content" },
                { color: p.dark, label: "Emphasis" },
                { color: p.white, label: "Highlight" },
                { color: p.border, label: "Borders" },
                { color: p.label, label: "Labels" },
              ].map((swatch) => (
                <div key={swatch.label} className="flex items-center gap-2.5">
                  <div
                    className="w-8 h-8 rounded-md border border-border"
                    style={{ backgroundColor: swatch.color }}
                  />
                  <div>
                    <div className="text-[12px] text-foreground">{swatch.label}</div>
                    <div className="text-[10px] text-muted-foreground/50 uppercase tracking-wider">{swatch.color}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Example Layout Construction ─── */}
      <section className="w-full border-t border-border bg-[#F8FAFC]">
        <div className="max-w-[1440px] mx-auto px-16 py-20">
          <div className="max-w-[540px] mb-14">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-1.5 h-1.5 rounded-full bg-foreground" />
              <span className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground">
                Assembly
              </span>
            </div>
            <h2 className="text-[28px] tracking-[-0.02em] text-foreground leading-[1.2] mb-3">
              Example Layout Construction
            </h2>
            <p className="text-[14px] text-muted-foreground leading-[1.7]">
              The Conversational Chat Layout is assembled from three core blocks: a sidebar
              for conversation management, a message thread for dialogue display, and a prompt
              input bar for composing messages.
            </p>
          </div>

          {/* Block formula */}
          <div className="flex items-center gap-4 mb-10">
            {["Sidebar", "Conversation Thread", "Prompt Input"].map((block, i) => (
              <div key={block} className="flex items-center gap-4">
                <div className="px-5 py-3 rounded-xl bg-[#F1F5F9] border border-border text-[14px] text-foreground">
                  {block}
                </div>
                {i < 2 && (
                  <span className="text-[18px] text-muted-foreground/40 select-none">+</span>
                )}
              </div>
            ))}
            <span className="text-[18px] text-muted-foreground/40 mx-2 select-none">=</span>
            <div className="px-5 py-3 rounded-xl bg-foreground text-background text-[14px]">
              Conversational Chat Layout
            </div>
          </div>

          {/* Construction diagram */}
          <div className="w-full bg-white rounded-2xl border border-border p-8 shadow-sm">
            <ConstructionDiagram />
          </div>

          {/* Block descriptions */}
          <div className="grid grid-cols-3 gap-6 mt-8">
            <div className="rounded-xl border border-border bg-white p-5">
              <div className="text-[11px] tracking-[0.1em] uppercase text-muted-foreground/60 mb-2">Block A</div>
              <div className="text-[14px] text-foreground mb-1.5">Sidebar</div>
              <p className="text-[12px] text-muted-foreground leading-[1.7]">
                Provides conversation history navigation, new chat creation, and search. Occupies
                the left 20–25% of the viewport.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-white p-5">
              <div className="text-[11px] tracking-[0.1em] uppercase text-muted-foreground/60 mb-2">Block B</div>
              <div className="text-[14px] text-foreground mb-1.5">Conversation Thread</div>
              <p className="text-[12px] text-muted-foreground leading-[1.7]">
                Scrollable message area showing alternating user and AI messages. Content is
                center-aligned with a constrained max-width for readability.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-white p-5">
              <div className="text-[11px] tracking-[0.1em] uppercase text-muted-foreground/60 mb-2">Block C</div>
              <div className="text-[14px] text-foreground mb-1.5">Prompt Input</div>
              <p className="text-[12px] text-muted-foreground leading-[1.7]">
                Bottom-anchored text field for composing messages. Includes attachment controls,
                model selector, and a send action button.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Why This System Exists ─── */}
      <section className="w-full border-t border-border">
        <div className="max-w-[1440px] mx-auto px-16 py-20">
          <div className="max-w-[540px] mb-14">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-1.5 h-1.5 rounded-full bg-foreground" />
              <span className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground">
                Purpose
              </span>
            </div>
            <h2 className="text-[28px] tracking-[-0.02em] text-foreground leading-[1.2] mb-3">
              Why This System Exists
            </h2>
            <p className="text-[14px] text-muted-foreground leading-[1.7]">
              AI interface patterns are evolving rapidly. This diagram system helps designers,
              engineers, and product teams understand layout structures quickly — enabling
              faster communication, better design decisions, and more consistent documentation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {whyReasons.map((reason) => (
              <div
                key={reason.title}
                className="rounded-xl border border-border bg-white p-7 hover:shadow-md hover:border-[#06B6D4]/20 transition-all duration-300"
              >
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-xl bg-foreground/[0.04] flex items-center justify-center shrink-0 text-foreground/50">
                    {reason.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-[15px] text-foreground mb-2">{reason.title}</h3>
                    <p className="text-[13px] text-muted-foreground leading-[1.75]">
                      {reason.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="w-full border-t border-border bg-[#F8FAFC]">
        <div className="max-w-[1440px] mx-auto px-16 py-16 flex items-center justify-between">
          <div>
            <h3 className="text-[18px] text-foreground mb-1.5">See these blocks in action</h3>
            <p className="text-[13px] text-muted-foreground">
              Browse the full collection of 27 AI interface layout patterns.
            </p>
          </div>
          <Link
            to="/"
            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-foreground text-background text-[13px] hover:opacity-90 transition-opacity no-underline"
          >
            View Layout Library
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      <SharedFooter />
    </div>
  );
}