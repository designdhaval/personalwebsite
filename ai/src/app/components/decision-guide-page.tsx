import { useState } from "react";
import { Link } from "react-router";
import {
  ChevronRight,
  ArrowRight,
  MessageSquare,
  Palette,
  Workflow,
  Shield,
  Check,
  Lightbulb,
  Layers,
  ArrowDown,
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

/* ─── Branch data ─── */

interface BranchLayout {
  id: string;
  name: string;
  fit: string;
}

interface Branch {
  key: string;
  title: string;
  icon: React.ReactNode;
  question: string;
  description: string;
  color: string;
  layouts: BranchLayout[];
}

const branches: Branch[] = [
  {
    key: "info",
    title: "Information & Q\u00A0A",
    icon: <MessageSquare className="w-5 h-5" />,
    question: "Does the user need answers, explanations, or contextual help?",
    description:
      "When the primary interaction is asking questions and receiving AI-generated answers, use layouts that center the conversational exchange. These patterns work best for search, research, customer support, and inline assistance where the user drives the dialogue.",
    color: "#5b8af5",
    layouts: [
      {
        id: "conversational-chat",
        name: "Conversational Chat Layout",
        fit: "Best for turn-based dialogue with full conversation history and streaming responses.",
      },
      {
        id: "command-palette",
        name: "AI Command Palette Layout",
        fit: "Best for quick keyboard-driven queries embedded within an existing application.",
      },
      {
        id: "copilot",
        name: "AI Copilot Layout",
        fit: "Best for contextual assistance that appears inline alongside the user's current work.",
      },
    ],
  },
  {
    key: "creative",
    title: "Creative Generation",
    icon: <Palette className="w-5 h-5" />,
    question: "Is the user generating images, video, audio, or other creative assets?",
    description:
      "When the AI creates visual, audio, or multimedia content, the interface needs to pair prompt controls with a rich preview area. These layouts support iterative generation workflows where users refine prompts, adjust parameters, and compare outputs.",
    color: "#c065d0",
    layouts: [
      {
        id: "prompt-canvas",
        name: "Prompt + Canvas Layout",
        fit: "Best for freeform visual generation with spatial arrangement of AI outputs on a canvas.",
      },
      {
        id: "prompt-live-preview",
        name: "Prompt + Live Preview Layout",
        fit: "Best for real-time preview workflows where the output updates as the user edits the prompt.",
      },
      {
        id: "studio-timeline",
        name: "Studio Timeline Layout",
        fit: "Best for time-based media — video, audio, and animation — with multi-track sequencing.",
      },
    ],
  },
  {
    key: "workflow",
    title: "Workflow Automation",
    icon: <Workflow className="w-5 h-5" />,
    question: "Is the user building or managing automated AI-driven processes?",
    description:
      "When the AI executes multi-step processes, pipelines, or complex workflows, the interface needs to represent nodes, connections, status, and history. These layouts are built for composing, monitoring, and debugging complex AI operations.",
    color: "#e0943a",
    layouts: [
      {
        id: "node-workflow",
        name: "Node-Based Workflow Builder",
        fit: "Best for visual programming where users connect AI processing nodes into pipelines.",
      },
      {
        id: "workspace",
        name: "AI Workspace Layout",
        fit: "Best for multi-panel environments combining chat, tools, and output views in one screen.",
      },
      {
        id: "generation-timeline",
        name: "AI Generation Timeline Layout",
        fit: "Best for tracking generation history with versioning, rollback, and comparison features.",
      },
    ],
  },
  {
    key: "agent",
    title: "Agent Supervision",
    icon: <Shield className="w-5 h-5" />,
    question: "Is the user monitoring or controlling autonomous AI agents?",
    description:
      "When AI operates autonomously and the human role shifts to supervision, the interface needs monitoring dashboards, safety controls, and override mechanisms. These layouts support the transition from AI-as-tool to AI-as-agent.",
    color: "#4abe8a",
    layouts: [
      {
        id: "agent-dashboard",
        name: "AI Agent Dashboard Layout",
        fit: "Best for monitoring autonomous agents with status indicators, logs, and task queues.",
      },
      {
        id: "control-center",
        name: "Autonomous AI Control Center Layout",
        fit: "Best for mission-critical systems with safety overrides, kill switches, and audit trails.",
      },
      {
        id: "multi-agent",
        name: "Multi-Agent Collaboration Layout",
        fit: "Best for orchestrating multiple specialized agents working on shared tasks.",
      },
    ],
  },
];

/* ─── Selection table data ─── */

interface TableRow {
  task: string;
  primary: string;
  primaryId: string;
  alternative: string;
  alternativeId: string;
  complexity: "Low" | "Medium" | "High";
  userRole: string;
}

const tableRows: TableRow[] = [
  { task: "General Q&A / Chat", primary: "Conversational Chat", primaryId: "conversational-chat", alternative: "AI Copilot", alternativeId: "copilot", complexity: "Low", userRole: "Questioner" },
  { task: "Quick commands / Search", primary: "AI Command Palette", primaryId: "command-palette", alternative: "Conversational Chat", alternativeId: "conversational-chat", complexity: "Low", userRole: "Power user" },
  { task: "Image generation", primary: "Prompt + Canvas", primaryId: "prompt-canvas", alternative: "Prompt + Live Preview", alternativeId: "prompt-live-preview", complexity: "Medium", userRole: "Creator" },
  { task: "Video / Audio editing", primary: "Studio Timeline", primaryId: "studio-timeline", alternative: "Prompt + Canvas", alternativeId: "prompt-canvas", complexity: "High", userRole: "Editor" },
  { task: "Code assistance", primary: "AI Copilot", primaryId: "copilot", alternative: "Conversational Chat", alternativeId: "conversational-chat", complexity: "Medium", userRole: "Developer" },
  { task: "Data analysis", primary: "AI Insight Dashboard", primaryId: "insight-dashboard", alternative: "AI Workspace", alternativeId: "workspace", complexity: "Medium", userRole: "Analyst" },
  { task: "AI pipeline building", primary: "Node-Based Workflow", primaryId: "node-workflow", alternative: "AI Workspace", alternativeId: "workspace", complexity: "High", userRole: "Builder" },
  { task: "Agent monitoring", primary: "AI Agent Dashboard", primaryId: "agent-dashboard", alternative: "Control Center", alternativeId: "control-center", complexity: "High", userRole: "Supervisor" },
  { task: "Multi-model testing", primary: "AI Playground", primaryId: "playground", alternative: "Conversational Chat", alternativeId: "conversational-chat", complexity: "Medium", userRole: "Researcher" },
  { task: "AI reasoning inspection", primary: "Thinking Visualization", primaryId: "thinking-visualization", alternative: "AI Inspector", alternativeId: "inspector", complexity: "High", userRole: "Debugger" },
  { task: "Document co-authoring", primary: "AI Co-Creation Studio", primaryId: "co-creation", alternative: "AI Copilot", alternativeId: "copilot", complexity: "Medium", userRole: "Collaborator" },
  { task: "Autonomous operations", primary: "Control Center", primaryId: "control-center", alternative: "Agent Dashboard", alternativeId: "agent-dashboard", complexity: "High", userRole: "Operator" },
];

/* ─── Product mapping data ─── */

interface ProductExample {
  product: string;
  company: string;
  patterns: { name: string; id: string }[];
  description: string;
}

const products: ProductExample[] = [
  {
    product: "ChatGPT",
    company: "OpenAI",
    patterns: [
      { name: "Conversational Chat", id: "conversational-chat" },
      { name: "AI Canvas Workspace", id: "canvas-workspace" },
    ],
    description: "Primary chat interface with a sidebar for conversation history, plus a canvas mode for collaborative editing.",
  },
  {
    product: "Claude",
    company: "Anthropic",
    patterns: [
      { name: "Conversational Chat", id: "conversational-chat" },
      { name: "AI Artifact Inspector", id: "artifact-inspector" },
    ],
    description: "Chat-first interface with an artifacts panel for rendering code, documents, and interactive outputs.",
  },
  {
    product: "Midjourney",
    company: "Midjourney",
    patterns: [
      { name: "Prompt + Canvas", id: "prompt-canvas" },
      { name: "AI Generation Timeline", id: "generation-timeline" },
    ],
    description: "Prompt-driven image generation with a gallery view and generation history for iterative refinement.",
  },
  {
    product: "GitHub Copilot",
    company: "GitHub / Microsoft",
    patterns: [
      { name: "AI Copilot", id: "copilot" },
      { name: "Conversational Chat", id: "conversational-chat" },
    ],
    description: "Inline code suggestions within the editor, paired with a chat sidebar for longer conversations.",
  },
  {
    product: "Runway",
    company: "Runway",
    patterns: [
      { name: "Studio Timeline", id: "studio-timeline" },
      { name: "Prompt + Live Preview", id: "prompt-live-preview" },
    ],
    description: "Video generation and editing with a timeline interface and real-time preview of AI effects.",
  },
  {
    product: "Notion AI",
    company: "Notion",
    patterns: [
      { name: "AI Copilot", id: "copilot" },
      { name: "AI Command Palette", id: "command-palette" },
    ],
    description: "Context-aware writing assistant embedded in the document editor with a slash-command palette.",
  },
  {
    product: "Perplexity",
    company: "Perplexity AI",
    patterns: [
      { name: "Conversational Chat", id: "conversational-chat" },
      { name: "AI Inspector", id: "inspector" },
    ],
    description: "Search-oriented chat interface with source citations and an inspection view for verifying claims.",
  },
  {
    product: "ComfyUI",
    company: "Open Source",
    patterns: [
      { name: "Node-Based Workflow", id: "node-workflow" },
      { name: "Prompt + Live Preview", id: "prompt-live-preview" },
    ],
    description: "Visual node graph for building complex image generation pipelines with live output preview.",
  },
];

/* ─── Decision flow diagram (SVG) ─── */

function DecisionFlowDiagram({ activeBranch }: { activeBranch: string | null }) {
  const bx = [110, 360, 610, 860]; // branch x centers
  const branchColors = ["#5b8af5", "#c065d0", "#e0943a", "#4abe8a"];

  return (
    <svg viewBox="0 0 980 520" fill="none" className="w-full h-auto">
      {/* Background */}
      <rect width={980} height={520} fill={p.bg} rx={12} />

      {/* Start node */}
      <rect x={390} y={16} width={200} height={44} fill={p.white} rx={22} stroke={p.dark} strokeWidth={1.5} />
      <text x={490} y={43} textAnchor="middle" fill="#1a1a2e" fontSize={12} fontFamily="Inter,sans-serif" fontWeight={500}>
        What does the user need?
      </text>

      {/* Vertical stem */}
      <line x1={490} y1={60} x2={490} y2={100} stroke={p.dark} strokeWidth={1.5} />

      {/* Horizontal distribution line */}
      <line x1={bx[0]} y1={100} x2={bx[3]} y2={100} stroke={p.dark} strokeWidth={1.5} />

      {/* Branches */}
      {branches.map((b, i) => {
        const cx = bx[i];
        const isActive = activeBranch === b.key;
        const color = branchColors[i];

        return (
          <g key={b.key} opacity={activeBranch && !isActive ? 0.35 : 1} style={{ transition: "opacity 0.3s ease" }}>
            {/* Vertical drop from distribution line */}
            <line x1={cx} y1={100} x2={cx} y2={130} stroke={color} strokeWidth={1.5} />
            <circle cx={cx} cy={100} r={4} fill={color} />

            {/* Branch category box */}
            <rect x={cx - 90} y={130} width={180} height={50} fill={p.white} rx={10} stroke={color} strokeWidth={isActive ? 2 : 1.2} />
            <text x={cx} y={152} textAnchor="middle" fill="#1a1a2e" fontSize={11} fontFamily="Inter,sans-serif" fontWeight={500}>
              {b.title}
            </text>
            <text x={cx} y={168} textAnchor="middle" fill={p.label} fontSize={8} fontFamily="Inter,sans-serif">
              {b.layouts.length} recommended layouts
            </text>

            {/* Stem down to layouts */}
            <line x1={cx} y1={180} x2={cx} y2={210} stroke={color} strokeWidth={1} strokeDasharray="4 3" />

            {/* Layout recommendation cards */}
            {b.layouts.map((layout, li) => {
              const ly = 210 + li * 90;
              return (
                <g key={layout.id}>
                  {/* Connector */}
                  {li > 0 && (
                    <line x1={cx} y1={ly - 30} x2={cx} y2={ly} stroke={color} strokeWidth={1} strokeDasharray="4 3" />
                  )}
                  <rect
                    x={cx - 90}
                    y={ly}
                    width={180}
                    height={60}
                    fill={p.white}
                    rx={8}
                    stroke={isActive ? color : p.border}
                    strokeWidth={isActive ? 1.2 : 0.8}
                  />
                  {/* Number badge */}
                  <circle cx={cx - 78} cy={ly + 14} r={8} fill={color + "20"} />
                  <text x={cx - 78} y={ly + 18} textAnchor="middle" fill={color} fontSize={8} fontFamily="Inter,sans-serif" fontWeight={600}>
                    {li + 1}
                  </text>
                  {/* Layout name */}
                  <text x={cx - 64} y={ly + 18} fill="#1a1a2e" fontSize={9} fontFamily="Inter,sans-serif" fontWeight={500}>
                    {layout.name.replace(" Layout", "")}
                  </text>
                  {/* Fit description */}
                  {(() => {
                    const words = layout.fit.split(" ");
                    const line1 = words.slice(0, 6).join(" ");
                    const line2 = words.slice(6, 12).join(" ");
                    const line3 = words.slice(12).join(" ");
                    return (
                      <>
                        <text x={cx - 78} y={ly + 34} fill={p.label} fontSize={7.5} fontFamily="Inter,sans-serif">{line1}</text>
                        {line2 && <text x={cx - 78} y={ly + 44} fill={p.label} fontSize={7.5} fontFamily="Inter,sans-serif">{line2}</text>}
                        {line3 && <text x={cx - 78} y={ly + 54} fill={p.label} fontSize={7.5} fontFamily="Inter,sans-serif">{line3}</text>}
                      </>
                    );
                  })()}
                </g>
              );
            })}
          </g>
        );
      })}
    </svg>
  );
}

/* ─── Complexity badge ─── */

function ComplexityBadge({ level }: { level: "Low" | "Medium" | "High" }) {
  const styles = {
    Low: "bg-emerald-50 text-emerald-600 border-emerald-100",
    Medium: "bg-amber-50 text-amber-600 border-amber-100",
    High: "bg-rose-50 text-rose-600 border-rose-100",
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-md border text-[11px] ${styles[level]}`}>
      {level}
    </span>
  );
}

/* ─── Page ─── */

export function DecisionGuidePage() {
  const [activeBranch, setActiveBranch] = useState<string | null>(null);

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
          <span className="text-foreground">Decision Guide</span>
        </div>
      </div>

      {/* ─── Hero ─── */}
      <section className="max-w-[1440px] mx-auto px-16 pt-14 pb-20">
        <div className="max-w-[740px]">
          <div className="flex items-center gap-2.5 mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 border-[#333] shadow-[3px_4px_0px_0px_#333] bg-white text-[10px] tracking-[0.1em] uppercase text-[#555]">
              Guide
            </span>
          </div>

          <h1 className="text-[48px] tracking-[0.01em] text-[#333] leading-[1.1] mb-6" style={{ fontFamily: "'Zilla Slab', serif" }}>
            AI Interface Decision Guide
          </h1>

          <p className="text-[20px] text-[#888] leading-[1.55] mb-6 max-w-[620px]">
            Choosing the right interface layout for AI-powered products
          </p>

          <p className="text-[14px] text-[#777] leading-[1.85] max-w-[580px]">
            Different AI systems support fundamentally different interaction models —
            from conversational Q&A to autonomous agent supervision. The right layout
            depends on what the user is trying to accomplish, how much control they need,
            and how complex the AI's output is. This guide helps designers navigate those
            decisions by mapping user needs to recommended interface patterns.
          </p>
        </div>

        {/* Branch selector cards */}
        <div className="grid grid-cols-4 gap-5 mt-16 pt-10 border-t-2 border-[#333]">
          {branches.map((b) => {
            const isActive = activeBranch === b.key;
            return (
              <button
                key={b.key}
                onClick={() => setActiveBranch(isActive ? null : b.key)}
                className="text-left rounded-xl border-2 border-[#333] p-5 transition-all duration-200 cursor-pointer bg-white"
                style={{
                  boxShadow: isActive
                    ? `5px 6px 0px 0px ${b.color}`
                    : "4px 5px 0px 0px #333",
                  transform: isActive ? "translate(-2px, -2px)" : "translate(0, 0)",
                  borderColor: isActive ? b.color : "#333",
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: b.color + "15", color: b.color }}
                  >
                    {b.icon}
                  </div>
                  <div>
                    <div className="text-[14px] text-foreground">{b.title}</div>
                    <div className="text-[11px] text-muted-foreground/50">{b.layouts.length} layouts</div>
                  </div>
                </div>
                <p className="text-[12px] text-muted-foreground leading-[1.65]">{b.question}</p>
              </button>
            );
          })}
        </div>
      </section>

      {/* ─── Decision Flow ─── */}
      <section className="w-full border-t border-border bg-[#F8FAFC]">
        <div className="max-w-[1440px] mx-auto px-16 py-20">
          <div className="max-w-[540px] mb-14">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-1.5 h-1.5 rounded-full bg-foreground" />
              <span className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground">
                Decision Flow
              </span>
            </div>
            <h2 className="text-[28px] tracking-[-0.02em] text-foreground leading-[1.2] mb-3">
              How to choose the right layout
            </h2>
            <p className="text-[14px] text-muted-foreground leading-[1.7]">
              Start with the user's primary need, then follow the branch to find the
              recommended interface layouts. Click a category above to highlight its branch.
            </p>
          </div>

          {/* Diagram */}
          <div className="w-full rounded-2xl border border-border bg-white p-6 shadow-sm overflow-hidden">
            <DecisionFlowDiagram activeBranch={activeBranch} />
          </div>

          {/* Expanded branch detail */}
          {activeBranch && (
            <div className="mt-8 rounded-2xl border border-border bg-white p-8 shadow-sm">
              {(() => {
                const b = branches.find((x) => x.key === activeBranch)!;
                return (
                  <div>
                    <div className="flex items-center gap-4 mb-5">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: b.color + "15", color: b.color }}
                      >
                        {b.icon}
                      </div>
                      <div>
                        <h3 className="text-[20px] text-foreground tracking-tight">{b.title}</h3>
                        <p className="text-[12px] text-muted-foreground">{b.question}</p>
                      </div>
                    </div>
                    <p className="text-[14px] text-muted-foreground leading-[1.8] mb-6 max-w-[700px]">
                      {b.description}
                    </p>
                    <div className="grid grid-cols-3 gap-5">
                      {b.layouts.map((layout, i) => (
                        <Link
                          key={layout.id}
                          to={`/pattern/${layout.id}`}
                          className="rounded-xl border border-border p-5 hover:shadow-md hover:border-foreground/10 transition-all duration-300 no-underline group"
                        >
                          <div className="flex items-center gap-3 mb-3">
                            <div
                              className="w-7 h-7 rounded-md flex items-center justify-center text-[11px]"
                              style={{ backgroundColor: b.color + "15", color: b.color }}
                            >
                              {i + 1}
                            </div>
                            <h4 className="text-[14px] text-foreground">{layout.name}</h4>
                          </div>
                          <p className="text-[12px] text-muted-foreground leading-[1.7] mb-3">
                            {layout.fit}
                          </p>
                          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="text-[11px] text-foreground">View pattern</span>
                            <ArrowRight className="w-3 h-3 text-foreground" />
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              })()}
            </div>
          )}
        </div>
      </section>

      {/* ─── Layout Selection Table ─── */}
      <section className="w-full border-t border-border">
        <div className="max-w-[1440px] mx-auto px-16 py-20">
          <div className="max-w-[540px] mb-14">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-1.5 h-1.5 rounded-full bg-foreground" />
              <span className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground">
                Reference
              </span>
            </div>
            <h2 className="text-[28px] tracking-[-0.02em] text-foreground leading-[1.2] mb-3">
              Layout Selection Table
            </h2>
            <p className="text-[14px] text-muted-foreground leading-[1.7]">
              A quick-reference table mapping common AI tasks to their recommended
              primary and alternative interface layouts, complexity level, and the
              typical user role.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-white overflow-hidden shadow-sm">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-border bg-[#F8FAFC]">
                  <th className="px-6 py-4 text-[11px] tracking-[0.1em] uppercase text-muted-foreground/60">
                    AI Task
                  </th>
                  <th className="px-6 py-4 text-[11px] tracking-[0.1em] uppercase text-muted-foreground/60">
                    Primary Layout
                  </th>
                  <th className="px-6 py-4 text-[11px] tracking-[0.1em] uppercase text-muted-foreground/60">
                    Alternative
                  </th>
                  <th className="px-6 py-4 text-[11px] tracking-[0.1em] uppercase text-muted-foreground/60">
                    Complexity
                  </th>
                  <th className="px-6 py-4 text-[11px] tracking-[0.1em] uppercase text-muted-foreground/60">
                    User Role
                  </th>
                </tr>
              </thead>
              <tbody>
                {tableRows.map((row, i) => (
                  <tr
                    key={row.task}
                    className={`border-b border-border last:border-0 hover:bg-foreground/[0.015] transition-colors ${
                      i % 2 === 1 ? "bg-[#F8FAFC]" : ""
                    }`}
                  >
                    <td className="px-6 py-4 text-[13px] text-foreground">{row.task}</td>
                    <td className="px-6 py-4">
                      <Link
                        to={`/pattern/${row.primaryId}`}
                        className="text-[13px] text-foreground hover:underline no-underline"
                      >
                        {row.primary}
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        to={`/pattern/${row.alternativeId}`}
                        className="text-[13px] text-muted-foreground hover:text-foreground hover:underline no-underline"
                      >
                        {row.alternative}
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      <ComplexityBadge level={row.complexity} />
                    </td>
                    <td className="px-6 py-4 text-[12px] text-muted-foreground">{row.userRole}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ─── Example Product Mapping ─── */}
      <section className="w-full border-t border-border bg-[#F8FAFC]">
        <div className="max-w-[1440px] mx-auto px-16 py-20">
          <div className="max-w-[540px] mb-14">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-1.5 h-1.5 rounded-full bg-foreground" />
              <span className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground">
                Real-World Examples
              </span>
            </div>
            <h2 className="text-[28px] tracking-[-0.02em] text-foreground leading-[1.2] mb-3">
              Example Product Mapping
            </h2>
            <p className="text-[14px] text-muted-foreground leading-[1.7]">
              See how leading AI products map to the interface patterns in this library.
              Most products combine multiple layout patterns to support different
              interaction modes within a single experience.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {products.map((prod) => (
              <div
                key={prod.product}
                className="rounded-xl border border-border bg-white p-6 hover:shadow-md hover:border-[#2563EB]/20 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-[18px] text-foreground tracking-tight">{prod.product}</h3>
                    <span className="text-[12px] text-muted-foreground/50">{prod.company}</span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-1">
                    {prod.patterns.map((pat, pi) => (
                      <span key={pat.id} className="flex items-center gap-1">
                        <Link
                          to={`/pattern/${pat.id}`}
                          className="px-2.5 py-1 rounded-md bg-foreground/[0.04] text-[10px] text-foreground/70 hover:bg-foreground/[0.08] transition-colors no-underline"
                        >
                          {pat.name}
                        </Link>
                        {pi < prod.patterns.length - 1 && (
                          <span className="text-[10px] text-muted-foreground/30 mx-0.5">+</span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-[13px] text-muted-foreground leading-[1.7]">
                  {prod.description}
                </p>
                {/* Visual pattern indicator */}
                <div className="flex items-center gap-3 mt-4 pt-4 border-t border-border">
                  <Layers className="w-3.5 h-3.5 text-muted-foreground/30" />
                  <span className="text-[11px] text-muted-foreground/50">
                    {prod.patterns.length} interface {prod.patterns.length > 1 ? "patterns" : "pattern"} combined
                  </span>
                  <div className="flex-1" />
                  <div className="flex items-center gap-1">
                    {prod.patterns.map((_, pi) => (
                      <div
                        key={pi}
                        className="w-5 h-2 rounded-sm bg-foreground/10"
                        style={{ opacity: 1 - pi * 0.3 }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Key Insight ─── */}
      <section className="w-full border-t border-border">
        <div className="max-w-[1440px] mx-auto px-16 py-20">
          <div className="rounded-2xl border border-border bg-white overflow-hidden shadow-sm">
            <div className="flex">
              {/* Left visual */}
              <div className="w-[400px] shrink-0 bg-foreground p-10 flex flex-col items-center justify-center">
                <Lightbulb className="w-10 h-10 text-background/60 mb-6" />
                <div className="text-[11px] tracking-[0.2em] uppercase text-background/40 mb-2">
                  Key Insight
                </div>
                <div className="text-[28px] text-background tracking-tight text-center leading-[1.3]">
                  Interfaces are composable
                </div>

                {/* Composition diagram */}
                <div className="flex flex-col items-center gap-2 mt-8">
                  {[
                    { label: "Chat", w: 100 },
                    { label: "Canvas", w: 120 },
                    { label: "Copilot", w: 90 },
                  ].map((block, i) => (
                    <div key={block.label} className="flex flex-col items-center gap-2">
                      <div
                        className="rounded-lg border border-white/20 flex items-center justify-center text-background/70 text-[11px]"
                        style={{ width: block.w, height: 28 }}
                      >
                        {block.label}
                      </div>
                      {i < 2 && <ArrowDown className="w-3 h-3 text-background/30" />}
                    </div>
                  ))}
                  <ArrowDown className="w-3 h-3 text-background/30" />
                  <div className="w-[140px] h-[34px] rounded-lg bg-white/15 border border-white/25 flex items-center justify-center text-background text-[12px]">
                    Complete Product
                  </div>
                </div>
              </div>

              {/* Right content */}
              <div className="flex-1 p-10">
                <h3 className="text-[24px] text-foreground tracking-tight mb-4 leading-[1.3]">
                  Modern AI products rarely use a single layout pattern
                </h3>
                <p className="text-[14px] text-muted-foreground leading-[1.85] mb-6">
                  The most successful AI products combine multiple interface patterns into
                  a cohesive experience. ChatGPT pairs a conversational chat layout with a
                  canvas workspace. GitHub Copilot layers an inline copilot over an existing
                  code editor with a chat sidebar. Runway combines a studio timeline with
                  prompt-driven generation.
                </p>
                <p className="text-[14px] text-muted-foreground leading-[1.85] mb-8">
                  When designing an AI product, don't think of these patterns as mutually
                  exclusive choices. Instead, identify the user's primary interaction mode
                  to select the dominant layout, then layer in secondary patterns to support
                  complementary workflows. The best AI interfaces feel like a single
                  unified experience even when they're composed from multiple layout primitives.
                </p>

                {/* Principles */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { title: "Start with the primary task", desc: "Choose the layout that best supports what users do 80% of the time." },
                    { title: "Layer secondary patterns", desc: "Add complementary layouts for less frequent but important workflows." },
                    { title: "Maintain a single mental model", desc: "Combined layouts should feel like one product, not multiple tools." },
                    { title: "Progressive disclosure", desc: "Reveal complex layout features gradually as users develop expertise." },
                  ].map((principle) => (
                    <div key={principle.title} className="flex gap-3">
                      <div className="w-5 h-5 rounded-md bg-foreground/[0.05] flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-foreground/40" />
                      </div>
                      <div>
                        <div className="text-[13px] text-foreground mb-1">{principle.title}</div>
                        <div className="text-[12px] text-muted-foreground leading-[1.6]">{principle.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="w-full border-t border-border bg-[#F8FAFC]">
        <div className="max-w-[1440px] mx-auto px-16 py-16 flex items-center justify-between">
          <div>
            <h3 className="text-[18px] text-foreground mb-1.5">Ready to explore the patterns?</h3>
            <p className="text-[13px] text-muted-foreground">
              Browse the full AI Interface Layout Library with all 27 documented patterns.
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
              className="flex items-center gap-2 px-6 py-3 rounded-lg border border-border bg-white text-foreground text-[13px] hover:bg-foreground/[0.03] transition-colors no-underline"
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