import { useState } from "react";
import { Link } from "react-router";
import { ChevronRight, ArrowRight, Cpu, Layers, Rocket } from "lucide-react";
import { SharedNav, SharedFooter } from "./shared-nav";
import { layouts } from "./layout-data";
import { wireframeMap } from "./wireframes";

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

/* ─── Category hero diagrams ─── */

function CoreDiagram() {
  return (
    <svg viewBox="0 0 480 180" fill="none" className="w-full h-auto">
      <rect width={480} height={180} fill={p.bg} rx={10} />
      {/* Chat layout mini */}
      <rect x={16} y={16} width={136} height={148} fill={p.white} rx={6} stroke={p.border} strokeWidth={0.8} />
      <rect x={16} y={16} width={36} height={148} fill={p.fill} rx={6} />
      <rect x={36} y={16} width={1} height={148} fill={p.fill} />
      <rect x={24} y={28} width={20} height={6} fill={p.dark} rx={1.5} />
      {[44, 56, 68, 80].map(y => <rect key={y} x={22} y={y} width={24} height={8} fill={p.mid} rx={2} />)}
      <rect x={62} y={28} width={60} height={14} fill={p.mid} rx={4} />
      <rect x={72} y={50} width={70} height={18} fill={p.fill} rx={4} />
      <rect x={62} y={76} width={50} height={12} fill={p.mid} rx={4} />
      <rect x={72} y={96} width={66} height={20} fill={p.fill} rx={4} />
      <rect x={58} y={138} width={88} height={16} fill={p.mid} rx={4} />
      <text x={84} y={174} textAnchor="middle" fill={p.label} fontSize={7} fontFamily="Inter,sans-serif">Chat</text>

      {/* Canvas layout mini */}
      <rect x={172} y={16} width={136} height={148} fill={p.white} rx={6} stroke={p.border} strokeWidth={0.8} />
      <rect x={172} y={16} width={136} height={22} fill={p.fill} rx={6} />
      <rect x={172} y={32} width={136} height={6} fill={p.fill} />
      {[180, 204, 228].map(x => <rect key={x} x={x} y={22} width={16} height={10} fill={p.mid} rx={3} />)}
      <rect x={184} y={48} width={54} height={40} fill={p.fill} rx={4} />
      <rect x={248} y={48} width={48} height={56} fill={p.fill} rx={4} />
      <rect x={184} y={96} width={112} height={38} fill={p.fill} rx={4} />
      <rect x={184} y={140} width={112} height={16} fill={p.mid} rx={4} />
      <text x={240} y={174} textAnchor="middle" fill={p.label} fontSize={7} fontFamily="Inter,sans-serif">Canvas</text>

      {/* Copilot layout mini */}
      <rect x={328} y={16} width={136} height={148} fill={p.white} rx={6} stroke={p.border} strokeWidth={0.8} />
      <rect x={340} y={28} width={80} height={124} fill={p.fill} rx={4} />
      <rect x={348} y={36} width={64} height={6} fill={p.mid} rx={1.5} />
      <rect x={348} y={48} width={64} height={6} fill={p.mid} rx={1.5} />
      <rect x={348} y={60} width={50} height={6} fill={p.mid} rx={1.5} />
      <rect x={348} y={76} width={64} height={6} fill={p.mid} rx={1.5} />
      <rect x={348} y={88} width={40} height={6} fill={p.mid} rx={1.5} />
      {/* Copilot overlay */}
      <rect x={396} y={56} width={60} height={84} fill={p.white} rx={5} stroke={p.border} strokeWidth={0.8} />
      <rect x={402} y={64} width={48} height={6} fill={p.dark} rx={1.5} />
      <rect x={402} y={76} width={46} height={10} fill={p.mid} rx={3} />
      <rect x={402} y={92} width={46} height={10} fill={p.mid} rx={3} />
      <rect x={402} y={108} width={46} height={10} fill={p.mid} rx={3} />
      <rect x={402} y={124} width={46} height={10} fill={p.dark} rx={3} />
      <text x={396} y={174} textAnchor="middle" fill={p.label} fontSize={7} fontFamily="Inter,sans-serif">Copilot</text>

      {/* Category label */}
      <text x={240} y={12} textAnchor="middle" fill={p.label} fontSize={8} fontFamily="Inter,sans-serif" fontWeight={500}>CORE AI INTERFACES — Established patterns powering today's AI products</text>
    </svg>
  );
}

function AdvancedDiagram() {
  return (
    <svg viewBox="0 0 480 180" fill="none" className="w-full h-auto">
      <rect width={480} height={180} fill={p.bg} rx={10} />
      {/* Workspace mini */}
      <rect x={16} y={16} width={136} height={148} fill={p.white} rx={6} stroke={p.border} strokeWidth={0.8} />
      <rect x={16} y={16} width={30} height={148} fill={p.fill} rx={6} />
      <rect x={30} y={16} width={1} height={148} fill={p.fill} />
      <rect x={22} y={26} width={18} height={6} fill={p.dark} rx={1.5} />
      {[40, 52, 64].map(y => <rect key={y} x={22} y={y} width={18} height={8} fill={p.mid} rx={2} />)}
      <rect x={54} y={22} width={50} height={60} fill={p.fill} rx={4} />
      <rect x={108} y={22} width={38} height={60} fill={p.fill} rx={4} />
      <rect x={54} y={88} width={92} height={34} fill={p.fill} rx={4} />
      <rect x={54} y={128} width={92} height={28} fill={p.mid} rx={4} />
      <text x={84} y={174} textAnchor="middle" fill={p.label} fontSize={7} fontFamily="Inter,sans-serif">Workspace</text>

      {/* Memory graph mini */}
      <rect x={172} y={16} width={136} height={148} fill={p.white} rx={6} stroke={p.border} strokeWidth={0.8} />
      <circle cx={220} cy={70} r={12} fill={p.fill} stroke={p.dark} strokeWidth={1} />
      <circle cx={260} cy={50} r={8} fill={p.fill} stroke={p.dark} strokeWidth={1} />
      <circle cx={195} cy={100} r={10} fill={p.fill} stroke={p.dark} strokeWidth={1} />
      <circle cx={255} cy={110} r={7} fill={p.fill} stroke={p.dark} strokeWidth={1} />
      <circle cx={280} cy={80} r={6} fill={p.fill} stroke={p.dark} strokeWidth={1} />
      <circle cx={235} cy={130} r={9} fill={p.fill} stroke={p.dark} strokeWidth={1} />
      <line x1={220} y1={70} x2={260} y2={50} stroke={p.mid} strokeWidth={1} />
      <line x1={220} y1={70} x2={195} y2={100} stroke={p.mid} strokeWidth={1} />
      <line x1={220} y1={70} x2={255} y2={110} stroke={p.mid} strokeWidth={1} />
      <line x1={260} y1={50} x2={280} y2={80} stroke={p.mid} strokeWidth={1} />
      <line x1={195} y1={100} x2={235} y2={130} stroke={p.mid} strokeWidth={1} />
      <line x1={255} y1={110} x2={235} y2={130} stroke={p.mid} strokeWidth={1} />
      <rect x={182} y={142} width={116} height={14} fill={p.mid} rx={4} />
      <text x={240} y={174} textAnchor="middle" fill={p.label} fontSize={7} fontFamily="Inter,sans-serif">Memory Graph</text>

      {/* Thinking visualization mini */}
      <rect x={328} y={16} width={136} height={148} fill={p.white} rx={6} stroke={p.border} strokeWidth={0.8} />
      <rect x={340} y={28} width={112} height={14} fill={p.fill} rx={4} />
      {/* Chain of thought steps */}
      {[0, 1, 2, 3].map(i => (
        <g key={i}>
          <rect x={350} y={52 + i * 26} width={90} height={18} fill={i === 3 ? p.dark : p.fill} rx={4} />
          <rect x={358} y={56 + i * 26} width={50 + i * 5} height={6} fill={i === 3 ? p.fill : p.mid} rx={1.5} />
          <rect x={358} y={64 + i * 26} width={30 + i * 3} height={4} fill={i === 3 ? p.fill : p.mid} rx={1} />
          {i < 3 && <line x1={395} y1={70 + i * 26} x2={395} y2={78 + i * 26} stroke={p.dark} strokeWidth={1} strokeDasharray="2 2" />}
        </g>
      ))}
      <text x={396} y={174} textAnchor="middle" fill={p.label} fontSize={7} fontFamily="Inter,sans-serif">Thinking</text>

      <text x={240} y={12} textAnchor="middle" fill={p.label} fontSize={8} fontFamily="Inter,sans-serif" fontWeight={500}>ADVANCED AI INTERFACES — Complex workflows and multi-system orchestration</text>
    </svg>
  );
}

function FutureDiagram() {
  return (
    <svg viewBox="0 0 480 180" fill="none" className="w-full h-auto">
      <rect width={480} height={180} fill={p.bg} rx={10} />
      {/* Co-creation mini */}
      <rect x={16} y={16} width={136} height={148} fill={p.white} rx={6} stroke={p.border} strokeWidth={0.8} />
      <rect x={16} y={16} width={68} height={148} fill={p.fill} rx={6} />
      <rect x={68} y={16} width={1} height={148} fill={p.border} />
      <rect x={24} y={28} width={52} height={6} fill={p.dark} rx={1.5} />
      <rect x={24} y={42} width={52} height={40} fill={p.mid} rx={4} />
      <rect x={24} y={90} width={52} height={26} fill={p.mid} rx={4} />
      <rect x={24} y={124} width={52} height={14} fill={p.dark} rx={4} />
      {/* AI generation side */}
      <rect x={77} y={28} width={67} height={6} fill={p.dark} rx={1.5} />
      <rect x={77} y={42} width={67} height={68} fill={p.mid} rx={4} />
      <rect x={77} y={118} width={67} height={20} fill={p.mid} rx={4} />
      <text x={84} y={174} textAnchor="middle" fill={p.label} fontSize={7} fontFamily="Inter,sans-serif">Co-Creation</text>

      {/* Debate mini */}
      <rect x={172} y={16} width={136} height={148} fill={p.white} rx={6} stroke={p.border} strokeWidth={0.8} />
      <rect x={172} y={16} width={136} height={20} fill={p.fill} rx={6} />
      <rect x={172} y={30} width={136} height={6} fill={p.fill} />
      <rect x={182} y={22} width={50} height={8} fill={p.mid} rx={2} />
      {/* Left panel */}
      <rect x={180} y={44} width={58} height={90} fill={p.fill} rx={4} />
      <rect x={186} y={52} width={46} height={6} fill={p.dark} rx={1.5} />
      <rect x={186} y={64} width={46} height={4} fill={p.mid} rx={1} />
      <rect x={186} y={74} width={40} height={4} fill={p.mid} rx={1} />
      <rect x={186} y={84} width={46} height={4} fill={p.mid} rx={1} />
      <rect x={186} y={94} width={36} height={4} fill={p.mid} rx={1} />
      <rect x={186} y={108} width={46} height={4} fill={p.mid} rx={1} />
      <rect x={186} y={118} width={30} height={4} fill={p.mid} rx={1} />
      {/* Divider */}
      <rect x={240} y={44} width={1} height={90} fill={p.border} />
      {/* Right panel */}
      <rect x={243} y={44} width={58} height={90} fill={p.fill} rx={4} />
      <rect x={249} y={52} width={46} height={6} fill={p.dark} rx={1.5} />
      <rect x={249} y={64} width={40} height={4} fill={p.mid} rx={1} />
      <rect x={249} y={74} width={46} height={4} fill={p.mid} rx={1} />
      <rect x={249} y={84} width={36} height={4} fill={p.mid} rx={1} />
      <rect x={249} y={94} width={46} height={4} fill={p.mid} rx={1} />
      <rect x={249} y={108} width={46} height={4} fill={p.mid} rx={1} />
      <rect x={249} y={118} width={40} height={4} fill={p.mid} rx={1} />
      {/* Synthesis */}
      <rect x={180} y={140} width={121} height={16} fill={p.dark} rx={4} />
      <text x={240} y={174} textAnchor="middle" fill={p.label} fontSize={7} fontFamily="Inter,sans-serif">Debate</text>

      {/* Control center mini */}
      <rect x={328} y={16} width={136} height={148} fill={p.white} rx={6} stroke={p.border} strokeWidth={0.8} />
      <rect x={328} y={16} width={136} height={20} fill={p.fill} rx={6} />
      <rect x={328} y={30} width={136} height={6} fill={p.fill} />
      <rect x={338} y={22} width={60} height={8} fill={p.dark} rx={2} />
      {/* Status grid */}
      <rect x={336} y={44} width={40} height={32} fill={p.fill} rx={4} />
      <rect x={380} y={44} width={40} height={32} fill={p.fill} rx={4} />
      <rect x={424} y={44} width={32} height={32} fill={p.fill} rx={4} />
      {/* Activity log */}
      <rect x={336} y={82} width={120} height={44} fill={p.fill} rx={4} />
      {[88, 98, 108, 118].map(y => <rect key={y} x={342} y={y} width={108} height={4} fill={p.mid} rx={1} />)}
      {/* Controls */}
      <rect x={336} y={132} width={56} height={22} fill={p.dark} rx={5} />
      <rect x={398} y={132} width={56} height={22} fill={p.mid} rx={5} />
      <text x={396} y={174} textAnchor="middle" fill={p.label} fontSize={7} fontFamily="Inter,sans-serif">Control Center</text>

      <text x={240} y={12} textAnchor="middle" fill={p.label} fontSize={8} fontFamily="Inter,sans-serif" fontWeight={500}>FUTURE AI SYSTEMS — Emerging patterns for next-generation AI interactions</text>
    </svg>
  );
}

/* ─── Category data ─── */

interface CategorySection {
  key: string;
  label: string;
  icon: React.ReactNode;
  count: number;
  range: string;
  description: string;
  longDescription: string;
  diagram: React.ReactNode;
  layoutIds: string[];
}

const categories: CategorySection[] = [
  {
    key: "core",
    label: "Core AI Interfaces",
    icon: <Cpu className="w-5 h-5" />,
    count: 12,
    range: "Patterns 01–12",
    description: "The foundational interaction patterns powering today's AI products.",
    longDescription:
      "Core AI Interfaces represent the most established and widely adopted layout patterns in AI product design. These are the building blocks that users already understand — conversational chat, prompt-and-canvas, copilot overlays, and command palettes. They form the backbone of products like ChatGPT, Midjourney, GitHub Copilot, and Runway. Designers working on any AI product will likely start with one of these patterns as their primary interaction model.",
    diagram: <CoreDiagram />,
    layoutIds: [
      "conversational-chat", "prompt-canvas", "prompt-live-preview", "studio-timeline",
      "voice-studio", "music-composer", "node-workflow", "copilot",
      "command-palette", "inspector", "playground", "agent-dashboard",
    ],
  },
  {
    key: "advanced",
    label: "Advanced AI Interfaces",
    icon: <Layers className="w-5 h-5" />,
    count: 8,
    range: "Patterns 13–20",
    description: "Complex workflows for multi-system orchestration and deep AI interaction.",
    longDescription:
      "Advanced AI Interfaces push beyond single-purpose interactions into multi-panel workspaces, reasoning visualizations, and multi-agent orchestration. These patterns serve power users and professional workflows where AI is not just an assistant but a collaborative partner. They appear in tools like Notion AI workspaces, chain-of-thought debugging interfaces, and knowledge graph explorers. These layouts handle higher information density while maintaining usability.",
    diagram: <AdvancedDiagram />,
    layoutIds: [
      "workspace", "thinking-visualization", "multi-agent", "generation-timeline",
      "canvas-workspace", "memory-graph", "visual-prompt", "insight-dashboard",
    ],
  },
  {
    key: "future",
    label: "Future AI Systems",
    icon: <Rocket className="w-5 h-5" />,
    count: 7,
    range: "Patterns 21–27",
    description: "Emerging interaction models for next-generation AI experiences.",
    longDescription:
      "Future AI Systems represent the frontier of AI interface design — patterns that are just beginning to appear in research prototypes, experimental products, and forward-thinking design explorations. These include co-creation studios where humans and AI work in tandem, debate interfaces for comparing AI perspectives, simulation environments, and autonomous control centers with safety mechanisms. These patterns anticipate where AI products are heading as capabilities continue to expand.",
    diagram: <FutureDiagram />,
    layoutIds: [
      "co-creation", "simulation", "debate", "guided-workflow",
      "artifact-inspector", "context-panel", "control-center",
    ],
  },
];

/* ─── Layout card within category ─── */

function CategoryLayoutCard({
  id,
  globalIndex,
}: {
  id: string;
  globalIndex: number;
}) {
  const [hovered, setHovered] = useState(false);
  const layout = layouts.find((l) => l.id === id);
  const WireframeComponent = wireframeMap[id];
  if (!layout) return null;

  return (
    <Link
      to={`/pattern/${id}`}
      className="group flex flex-col rounded-xl border border-border bg-white overflow-hidden no-underline"
      style={{
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        boxShadow: hovered ? "0 16px 32px -10px rgba(0,0,0,0.08)" : "0 1px 3px rgba(0,0,0,0.04)",
        borderColor: hovered ? "rgba(37,99,235,0.2)" : undefined,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Wireframe */}
      <div className="relative aspect-[4/3] bg-[#F1F5F9] overflow-hidden p-4">
        <div
          className="w-full h-full rounded-md overflow-hidden border border-[#E2E8F0]/60"
          style={{
            transition: "transform 0.4s ease",
            transform: hovered ? "scale(1.03)" : "scale(1)",
          }}
        >
          {WireframeComponent && <WireframeComponent />}
        </div>
        <div className="absolute top-2.5 left-2.5 px-1.5 py-0.5 rounded bg-white/90 backdrop-blur-sm border border-[#E2E8F0]">
          <span className="text-[9px] tracking-[0.12em] text-muted-foreground tabular-nums">
            {String(globalIndex + 1).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-1.5 flex-1">
        <h4 className="text-[13px] text-foreground tracking-tight leading-snug">{layout.name}</h4>
        <p className="text-[12px] text-muted-foreground leading-[1.65] flex-1">{layout.description}</p>
        <div
          className="flex items-center gap-1 mt-1"
          style={{
            transition: "all 0.25s ease",
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateX(0)" : "translateX(-4px)",
          }}
        >
          <span className="text-[11px] text-foreground">View pattern</span>
          <ArrowRight className="w-3 h-3 text-foreground" />
        </div>
      </div>
    </Link>
  );
}

/* ─── Page ─── */

export function CategoriesPage() {
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
          <span className="text-foreground">Pattern Categories</span>
        </div>
      </div>

      {/* ─── Hero ─── */}
      <section className="max-w-[1440px] mx-auto px-16 pt-14 pb-20">
        <div className="max-w-[740px]">
          <div className="flex items-center gap-2.5 mb-6">
            <span className="inline-block px-2.5 py-1 rounded-md bg-foreground/[0.06] text-[10px] tracking-[0.1em] uppercase text-foreground/60">
              Framework
            </span>
          </div>

          <h1 className="text-[48px] tracking-[-0.03em] text-foreground leading-[1.1] mb-6">
            AI Interface Pattern Categories
          </h1>

          <p className="text-[20px] text-muted-foreground leading-[1.55] mb-6 max-w-[620px]">
            Understanding how AI products structure their user interfaces
          </p>

          <p className="text-[14px] text-muted-foreground/70 leading-[1.85] max-w-[580px]">
            The AI Interface Layout Library organizes 27 interaction patterns into three
            progressive categories — from foundational layouts that power today's AI
            products to emerging patterns that define how humans will interact with
            next-generation AI systems. Each category represents a level of interface
            complexity and adoption maturity.
          </p>
        </div>

        {/* Category overview strip */}
        <div className="flex items-stretch gap-6 mt-16 pt-10 border-t border-border">
          {categories.map((cat) => (
            <a
              key={cat.key}
              href={`#${cat.key}`}
              className="flex-1 group rounded-xl border border-border bg-white p-6 hover:shadow-md hover:border-[#2563EB]/20 transition-all duration-300 no-underline cursor-pointer"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-foreground/[0.05] flex items-center justify-center text-foreground/50">
                  {cat.icon}
                </div>
                <div>
                  <div className="text-[14px] text-foreground">{cat.label}</div>
                  <div className="text-[11px] text-muted-foreground/50">{cat.range}</div>
                </div>
              </div>
              <p className="text-[13px] text-muted-foreground leading-[1.65]">{cat.description}</p>
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
                <span className="text-[28px] tracking-[-0.02em] text-foreground">{cat.count}</span>
                <span className="text-[11px] text-muted-foreground/50">layouts</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ─── Category Sections ─── */}
      {categories.map((cat, catIdx) => {
        const isEven = catIdx % 2 === 0;
        // Calculate global index offset
        let globalOffset = 0;
        for (let i = 0; i < catIdx; i++) globalOffset += categories[i].count;

        return (
          <section
            key={cat.key}
            id={cat.key}
            className={`w-full border-t border-border ${isEven ? "bg-[#F8FAFC]" : "bg-background"}`}
          >
            <div className="max-w-[1440px] mx-auto px-16 py-20">
              {/* Section header */}
              <div className="flex items-start gap-16 mb-14">
                <div className="max-w-[480px] shrink-0">
                  <div className="flex items-center gap-2.5 mb-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-foreground" />
                    <span className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground">
                      Category {catIdx + 1} of 3
                    </span>
                  </div>

                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-foreground flex items-center justify-center text-background">
                      {cat.icon}
                    </div>
                    <div>
                      <h2 className="text-[28px] tracking-[-0.02em] text-foreground leading-[1.2]">
                        {cat.label}
                      </h2>
                      <span className="text-[12px] text-muted-foreground/50">{cat.range} &middot; {cat.count} layouts</span>
                    </div>
                  </div>

                  <p className="text-[14px] text-muted-foreground leading-[1.8]">
                    {cat.longDescription}
                  </p>
                </div>

                {/* Category diagram */}
                <div className="flex-1 rounded-2xl border border-border bg-white p-5 shadow-sm overflow-hidden">
                  {cat.diagram}
                </div>
              </div>

              {/* Layout cards grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {cat.layoutIds.map((id, i) => (
                  <CategoryLayoutCard key={id} id={id} globalIndex={globalOffset + i} />
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* ─── Summary stats ─── */}
      {/* ─── CTA ─── */}
      <section className="w-full border-t border-border bg-[#F8FAFC]">
        <div className="max-w-[1440px] mx-auto px-16 py-16 flex items-center justify-between">
          <div>
            <h3 className="text-[18px] text-foreground mb-1.5">Explore all patterns</h3>
            <p className="text-[13px] text-muted-foreground">
              Browse the complete AI Interface Layout Library with all 27 patterns.
            </p>
          </div>
          <Link
            to="/"
            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-[#2563EB] text-white text-[13px] hover:opacity-90 transition-opacity no-underline"
          >
            View Full Library
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      <SharedFooter />
    </div>
  );
}