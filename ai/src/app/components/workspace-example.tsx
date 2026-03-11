import { useState, useRef, useEffect, useCallback } from "react";
import {
  FileText,
  FolderOpen,
  FolderClosed,
  Search,
  Plus,
  ChevronRight,
  ChevronDown,
  Clock,
  Star,
  Sparkles,
  Wand2,
  MessageSquare,
  Send,
  Check,
  X,
  RotateCcw,
  Copy,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  List,
  ListOrdered,
  Image,
  Link2,
  Code,
  MoreHorizontal,
  Lightbulb,
  Zap,
  ArrowRight,
  GripVertical,
  Settings,
  PanelRightClose,
  PanelRightOpen,
  Home,
  Users,
  BookOpen,
  Trash2,
} from "lucide-react";

/* ─── Types ─── */
interface FileNode {
  id: string;
  name: string;
  type: "file" | "folder";
  icon?: string;
  children?: FileNode[];
  expanded?: boolean;
}

interface AISuggestion {
  id: string;
  type: "improve" | "expand" | "fix" | "insight";
  title: string;
  description: string;
  preview?: string;
  accepted?: boolean;
  dismissed?: boolean;
}

interface ChatMsg {
  id: string;
  role: "user" | "ai";
  text: string;
  time: string;
}

/* ─── Data ─── */
const initialFiles: FileNode[] = [
  {
    id: "p1", name: "Product Launch", type: "folder", expanded: true, children: [
      { id: "f1", name: "Launch Strategy.md", type: "file" },
      { id: "f2", name: "Market Analysis.md", type: "file" },
      { id: "f3", name: "Competitor Review.md", type: "file" },
      {
        id: "p2", name: "Assets", type: "folder", expanded: false, children: [
          { id: "f4", name: "Brand Guidelines.pdf", type: "file" },
          { id: "f5", name: "Logo Variants.svg", type: "file" },
        ],
      },
    ],
  },
  {
    id: "p3", name: "Q1 Planning", type: "folder", expanded: false, children: [
      { id: "f6", name: "OKRs 2026.md", type: "file" },
      { id: "f7", name: "Budget Forecast.xlsx", type: "file" },
      { id: "f8", name: "Team Roadmap.md", type: "file" },
    ],
  },
  { id: "f9", name: "Meeting Notes — Mar 10.md", type: "file" },
  { id: "f10", name: "Research Summary.md", type: "file" },
];

const recentActivity = [
  { id: "r1", name: "Launch Strategy.md", action: "Edited", time: "2 min ago" },
  { id: "r2", name: "Market Analysis.md", action: "AI-enhanced", time: "15 min ago" },
  { id: "r3", name: "Team Roadmap.md", action: "Commented", time: "1 hr ago" },
  { id: "r4", name: "OKRs 2026.md", action: "Created", time: "3 hrs ago" },
];

const documentContent = {
  title: "Launch Strategy",
  subtitle: "Product Launch — Q1 2026",
  blocks: [
    { id: "b1", type: "heading" as const, text: "Executive Summary" },
    { id: "b2", type: "paragraph" as const, text: "Our Q1 2026 product launch represents a strategic pivot toward AI-first experiences. The core value proposition centers on making complex workflows effortless through intelligent automation, contextual assistance, and adaptive interfaces that learn from user behavior." },
    { id: "b3", type: "paragraph" as const, text: "Market research indicates a 340% increase in enterprise demand for AI-integrated productivity tools. Our competitive analysis shows a clear gap in solutions that combine deep workspace integration with conversational AI capabilities." },
    { id: "b4", type: "heading" as const, text: "Target Audience" },
    { id: "b5", type: "paragraph" as const, text: "Primary: Product teams at mid-to-large enterprises (500+ employees) seeking to streamline cross-functional collaboration with AI assistance. Secondary: Independent knowledge workers who manage complex multi-project workflows." },
    { id: "b6", type: "heading" as const, text: "Key Milestones" },
    { id: "b7", type: "list" as const, items: ["Beta launch: February 15, 2026", "Public launch: March 22, 2026", "Enterprise tier: April 10, 2026", "Partner integrations: May 1, 2026"] },
    { id: "b8", type: "heading" as const, text: "Go-to-Market Strategy" },
    { id: "b9", type: "paragraph" as const, text: "We will deploy a product-led growth strategy anchored by a generous free tier. Growth levers include viral sharing mechanics, community-driven templates, and strategic partnerships with complementary tools in the productivity ecosystem." },
  ],
};

const initialSuggestions: AISuggestion[] = [
  {
    id: "s1", type: "improve", title: "Strengthen executive summary",
    description: "Add quantitative metrics and a clearer call-to-action to make the opening more compelling for stakeholders.",
    preview: "...representing a strategic pivot projected to capture 15% market share within 12 months through AI-first experiences...",
  },
  {
    id: "s2", type: "expand", title: "Expand target audience",
    description: "Include demographic data, persona profiles, and pain points to strengthen the audience segmentation.",
  },
  {
    id: "s3", type: "fix", title: "Add timeline detail",
    description: "The milestones section lacks resource allocation and dependency mapping. Consider adding a Gantt-style breakdown.",
  },
  {
    id: "s4", type: "insight", title: "Competitive gap detected",
    description: "Based on your competitor review, none of the top 5 competitors offer real-time co-editing with AI. This is a key differentiator worth highlighting.",
  },
];

const initialChat: ChatMsg[] = [
  { id: "c1", role: "ai", text: "I've reviewed your Launch Strategy document. I found 4 suggestions to improve clarity and impact. Would you like me to walk through them?", time: "2:34 PM" },
  { id: "c2", role: "user", text: "Yes, start with the executive summary improvements.", time: "2:35 PM" },
  { id: "c3", role: "ai", text: "The executive summary is strong but could benefit from concrete metrics. I'd suggest adding projected market share (15% in 12 months based on your market analysis), expected user growth (50K in Q1), and a direct ROI statement for enterprise buyers. Should I draft this revision?", time: "2:35 PM" },
];

/* ─── Sub-Components ─── */
function FileTree({ nodes, depth = 0, activeFileId, onSelectFile, onToggleFolder }: {
  nodes: FileNode[];
  depth?: number;
  activeFileId: string;
  onSelectFile: (id: string) => void;
  onToggleFolder: (id: string) => void;
}) {
  return (
    <div>
      {nodes.map((node) => (
        <div key={node.id}>
          <button
            onClick={() => node.type === "folder" ? onToggleFolder(node.id) : onSelectFile(node.id)}
            className="w-full flex items-center gap-1.5 py-1 px-2 rounded-md text-left hover:bg-[#F1F5F9] transition-colors cursor-pointer group"
            style={{ paddingLeft: `${8 + depth * 14}px`, background: activeFileId === node.id ? "#EFF6FF" : undefined }}
          >
            {node.type === "folder" ? (
              node.expanded ? <ChevronDown className="w-3 h-3 text-[#94A3B8] shrink-0" /> : <ChevronRight className="w-3 h-3 text-[#94A3B8] shrink-0" />
            ) : (
              <span className="w-3 shrink-0" />
            )}
            {node.type === "folder" ? (
              node.expanded ? <FolderOpen className="w-3.5 h-3.5 text-[#F59E0B] shrink-0" /> : <FolderClosed className="w-3.5 h-3.5 text-[#F59E0B] shrink-0" />
            ) : (
              <FileText className="w-3.5 h-3.5 text-[#94A3B8] shrink-0" />
            )}
            <span className="text-[11px] truncate" style={{ color: activeFileId === node.id ? "#2563EB" : "#475569", fontWeight: activeFileId === node.id ? 500 : 400 }}>
              {node.name}
            </span>
          </button>
          {node.type === "folder" && node.expanded && node.children && (
            <FileTree nodes={node.children} depth={depth + 1} activeFileId={activeFileId} onSelectFile={onSelectFile} onToggleFolder={onToggleFolder} />
          )}
        </div>
      ))}
    </div>
  );
}

function SuggestionTypeIcon({ type }: { type: AISuggestion["type"] }) {
  const map = {
    improve: { icon: <Wand2 className="w-3 h-3" />, color: "#3B82F6", bg: "#EFF6FF" },
    expand: { icon: <ArrowRight className="w-3 h-3" />, color: "#8B5CF6", bg: "#F5F3FF" },
    fix: { icon: <Zap className="w-3 h-3" />, color: "#F59E0B", bg: "#FFFBEB" },
    insight: { icon: <Lightbulb className="w-3 h-3" />, color: "#10B981", bg: "#ECFDF5" },
  };
  const s = map[type];
  return (
    <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0" style={{ background: s.bg, color: s.color }}>
      {s.icon}
    </div>
  );
}

/* ─── Main Component ─── */
export function WorkspaceExample() {
  const [files, setFiles] = useState<FileNode[]>(initialFiles);
  const [activeFileId, setActiveFileId] = useState("f1");
  const [sidebarSection, setSidebarSection] = useState<"files" | "recent">("files");
  const [suggestions, setSuggestions] = useState<AISuggestion[]>(initialSuggestions);
  const [chatMessages, setChatMessages] = useState<ChatMsg[]>(initialChat);
  const [chatInput, setChatInput] = useState("");
  const [aiPanelTab, setAiPanelTab] = useState<"suggestions" | "chat">("suggestions");
  const [showAiPanel, setShowAiPanel] = useState(true);
  const [activeBlockId, setActiveBlockId] = useState<string | null>("b2");
  const [isAiTyping, setIsAiTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, isAiTyping]);

  const toggleFolder = useCallback((id: string) => {
    const toggle = (nodes: FileNode[]): FileNode[] =>
      nodes.map((n) => {
        if (n.id === id) return { ...n, expanded: !n.expanded };
        if (n.children) return { ...n, children: toggle(n.children) };
        return n;
      });
    setFiles(toggle);
  }, []);

  const acceptSuggestion = useCallback((id: string) => {
    setSuggestions((prev) => prev.map((s) => s.id === id ? { ...s, accepted: true } : s));
  }, []);

  const dismissSuggestion = useCallback((id: string) => {
    setSuggestions((prev) => prev.map((s) => s.id === id ? { ...s, dismissed: true } : s));
  }, []);

  const sendChat = useCallback(() => {
    if (!chatInput.trim()) return;
    const userMsg: ChatMsg = { id: `u-${Date.now()}`, role: "user", text: chatInput.trim(), time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) };
    setChatMessages((prev) => [...prev, userMsg]);
    setChatInput("");
    setIsAiTyping(true);

    setTimeout(() => {
      const responses = [
        "I've analyzed that section. Here's what I'd suggest: restructure the paragraph to lead with the key metric, then follow with supporting context. This follows the inverted pyramid principle for maximum impact.",
        "Good question! Based on the document context, I'd recommend adding a comparison table in the go-to-market section. I can draft one using data from your competitor review.",
        "I've cross-referenced this with your market analysis document. The 340% demand increase figure could be strengthened by citing the source and adding a year-over-year trend line.",
        "That's a strong approach. I'd also recommend adding a risk mitigation section before the milestones. Enterprise stakeholders typically want to see contingency plans alongside timelines.",
      ];
      const aiMsg: ChatMsg = {
        id: `a-${Date.now()}`,
        role: "ai",
        text: responses[Math.floor(Math.random() * responses.length)],
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setChatMessages((prev) => [...prev, aiMsg]);
      setIsAiTyping(false);
    }, 1800);
  }, [chatInput]);

  const activeSuggestions = suggestions.filter((s) => !s.dismissed);

  return (
    <div
      className="w-full rounded-2xl border-2 border-[#333] bg-white overflow-hidden shadow-[5px_6px_0px_0px_#333]"
      style={{ fontFamily: "'Inter', sans-serif", height: 620 }}
    >
      {/* ═══ Top Bar ═══ */}
      <div className="flex items-center justify-between px-3 py-2 bg-white border-b border-[#E2E8F0]">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-[#F8FAFC]">
            <BookOpen className="w-3.5 h-3.5 text-[#3B82F6]" />
            <span className="text-[12px] text-[#0F172A]" style={{ fontWeight: 600 }}>Workspace</span>
          </div>
          <div className="h-4 w-px bg-[#E2E8F0]" />
          <div className="flex items-center gap-1">
            <span className="text-[11px] text-[#94A3B8]">Product Launch</span>
            <ChevronRight className="w-3 h-3 text-[#CBD5E1]" />
            <span className="text-[11px] text-[#475569]" style={{ fontWeight: 500 }}>Launch Strategy.md</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-[#F0FDF4] border border-[#BBF7D0]">
            <div className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
            <span className="text-[10px] text-[#16A34A]" style={{ fontWeight: 500 }}>Saved</span>
          </div>
          <div className="flex -space-x-1.5">
            {["#3B82F6", "#8B5CF6", "#F59E0B"].map((c, i) => (
              <div key={i} className="w-5 h-5 rounded-full border-2 border-white flex items-center justify-center text-[8px] text-white" style={{ background: c, fontWeight: 600, zIndex: 3 - i }}>
                {["A", "M", "S"][i]}
              </div>
            ))}
          </div>
          <button
            onClick={() => setShowAiPanel(!showAiPanel)}
            className="p-1.5 rounded-md hover:bg-[#F1F5F9] transition-colors cursor-pointer text-[#64748B]"
            title={showAiPanel ? "Hide AI panel" : "Show AI panel"}
          >
            {showAiPanel ? <PanelRightClose className="w-3.5 h-3.5" /> : <PanelRightOpen className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      <div className="flex" style={{ height: "calc(100% - 41px)" }}>
        {/* ═══ Zone A — Navigation Sidebar ═══ */}
        <div className="w-[200px] min-w-[200px] border-r border-[#E2E8F0] bg-[#FAFBFC] flex flex-col">
          {/* Nav icons */}
          <div className="px-3 pt-3 pb-2 flex items-center gap-1">
            {[
              { icon: <Home className="w-3.5 h-3.5" />, label: "Home" },
              { icon: <FileText className="w-3.5 h-3.5" />, label: "Docs" },
              { icon: <Users className="w-3.5 h-3.5" />, label: "Team" },
            ].map((nav) => (
              <button key={nav.label} className="flex items-center gap-1 px-2 py-1 rounded-md text-[10px] text-[#64748B] hover:bg-[#F1F5F9] transition-colors cursor-pointer" style={{ fontWeight: 500 }}>
                {nav.icon}
                {nav.label}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="px-3 pb-2">
            <div className="flex items-center gap-1.5 px-2 py-1.5 rounded-md bg-white border border-[#E2E8F0]">
              <Search className="w-3 h-3 text-[#CBD5E1]" />
              <span className="text-[10px] text-[#CBD5E1]">Search files...</span>
            </div>
          </div>

          {/* Section tabs */}
          <div className="px-3 pb-1 flex gap-0.5">
            {(["files", "recent"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setSidebarSection(tab)}
                className="px-2 py-1 rounded-md text-[10px] transition-colors cursor-pointer"
                style={{
                  background: sidebarSection === tab ? "#EFF6FF" : "transparent",
                  color: sidebarSection === tab ? "#2563EB" : "#94A3B8",
                  fontWeight: sidebarSection === tab ? 500 : 400,
                }}
              >
                {tab === "files" ? "Projects" : "Recent"}
              </button>
            ))}
          </div>

          {/* File tree / Recent */}
          <div className="flex-1 overflow-y-auto px-1.5 py-1">
            {sidebarSection === "files" ? (
              <FileTree nodes={files} activeFileId={activeFileId} onSelectFile={setActiveFileId} onToggleFolder={toggleFolder} />
            ) : (
              <div className="flex flex-col gap-0.5 px-1">
                {recentActivity.map((item) => (
                  <button
                    key={item.id}
                    className="w-full text-left px-2 py-2 rounded-md hover:bg-[#F1F5F9] transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3 h-3 text-[#CBD5E1] shrink-0" />
                      <span className="text-[11px] text-[#475569] truncate" style={{ fontWeight: 500 }}>{item.name}</span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-0.5 pl-[18px]">
                      <span className="text-[9px] text-[#94A3B8]">{item.action}</span>
                      <span className="text-[9px] text-[#CBD5E1]">{item.time}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* New file button */}
          <div className="p-2 border-t border-[#E2E8F0]">
            <button className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded-md text-[11px] text-[#64748B] hover:bg-[#F1F5F9] border border-dashed border-[#CBD5E1] transition-colors cursor-pointer">
              <Plus className="w-3 h-3" />
              New Document
            </button>
          </div>
        </div>

        {/* ═══ Zone B — Workspace Canvas ═══ */}
        <div className="flex-1 flex flex-col min-w-0 bg-white">
          {/* Toolbar */}
          <div className="flex items-center gap-0.5 px-4 py-1.5 border-b border-[#E2E8F0] bg-[#FAFBFC]">
            {[
              { icon: <Bold className="w-3.5 h-3.5" />, label: "Bold" },
              { icon: <Italic className="w-3.5 h-3.5" />, label: "Italic" },
              { icon: <Underline className="w-3.5 h-3.5" />, label: "Underline" },
            ].map((tool) => (
              <button key={tool.label} className="p-1.5 rounded hover:bg-[#F1F5F9] text-[#64748B] transition-colors cursor-pointer" title={tool.label}>
                {tool.icon}
              </button>
            ))}
            <div className="w-px h-4 bg-[#E2E8F0] mx-1" />
            {[
              { icon: <AlignLeft className="w-3.5 h-3.5" />, label: "Align" },
              { icon: <List className="w-3.5 h-3.5" />, label: "Bullet list" },
              { icon: <ListOrdered className="w-3.5 h-3.5" />, label: "Numbered list" },
            ].map((tool) => (
              <button key={tool.label} className="p-1.5 rounded hover:bg-[#F1F5F9] text-[#64748B] transition-colors cursor-pointer" title={tool.label}>
                {tool.icon}
              </button>
            ))}
            <div className="w-px h-4 bg-[#E2E8F0] mx-1" />
            {[
              { icon: <Link2 className="w-3.5 h-3.5" />, label: "Link" },
              { icon: <Image className="w-3.5 h-3.5" />, label: "Image" },
              { icon: <Code className="w-3.5 h-3.5" />, label: "Code" },
            ].map((tool) => (
              <button key={tool.label} className="p-1.5 rounded hover:bg-[#F1F5F9] text-[#64748B] transition-colors cursor-pointer" title={tool.label}>
                {tool.icon}
              </button>
            ))}
            <div className="flex-1" />
            <button className="flex items-center gap-1 px-2 py-1 rounded-md text-[10px] text-[#3B82F6] bg-[#EFF6FF] hover:bg-[#DBEAFE] transition-colors cursor-pointer" style={{ fontWeight: 500 }}>
              <Sparkles className="w-3 h-3" />
              AI Assist
            </button>
          </div>

          {/* Document content */}
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-[600px] mx-auto px-8 py-6">
              {/* Title */}
              <div className="mb-1">
                <h1 className="text-[24px] text-[#0F172A] leading-[1.3] outline-none" style={{ fontWeight: 700 }}>
                  {documentContent.title}
                </h1>
              </div>
              <p className="text-[12px] text-[#94A3B8] mb-6">{documentContent.subtitle}</p>

              {/* Blocks */}
              {documentContent.blocks.map((block) => {
                const isActive = activeBlockId === block.id;
                return (
                  <div
                    key={block.id}
                    className="relative group/block"
                    onClick={() => setActiveBlockId(block.id)}
                  >
                    {/* Active indicator */}
                    {isActive && (
                      <div className="absolute -left-4 top-0 bottom-0 w-0.5 bg-[#3B82F6] rounded-full" />
                    )}

                    {/* AI enhancement glow for accepted suggestions */}
                    {block.id === "b2" && suggestions.find((s) => s.id === "s1")?.accepted && (
                      <div className="absolute -left-2 -right-2 -top-1 -bottom-1 rounded-lg bg-[#EFF6FF] border border-[#BFDBFE] -z-10" />
                    )}

                    {block.type === "heading" && (
                      <h2 className="text-[16px] text-[#0F172A] mt-6 mb-2 leading-[1.4]" style={{ fontWeight: 600 }}>
                        {block.text}
                      </h2>
                    )}
                    {block.type === "paragraph" && (
                      <p className="text-[13px] text-[#475569] leading-[1.85] mb-3">
                        {block.text}
                      </p>
                    )}
                    {block.type === "list" && (
                      <ul className="mb-3 space-y-1 pl-4">
                        {block.items?.map((item, i) => (
                          <li key={i} className="text-[13px] text-[#475569] leading-[1.85] list-disc">
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Inline AI suggestion indicator */}
                    {block.id === "b2" && !suggestions.find((s) => s.id === "s1")?.accepted && !suggestions.find((s) => s.id === "s1")?.dismissed && (
                      <div className="absolute -right-3 top-0 opacity-0 group-hover/block:opacity-100 transition-opacity">
                        <div className="w-5 h-5 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] flex items-center justify-center cursor-pointer hover:bg-[#DBEAFE] transition-colors"
                          onClick={(e) => { e.stopPropagation(); setAiPanelTab("suggestions"); setShowAiPanel(true); }}>
                          <Sparkles className="w-2.5 h-2.5 text-[#3B82F6]" />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ═══ Zone C — AI Assistant Panel ═══ */}
        {showAiPanel && (
          <div className="w-[280px] min-w-[280px] border-l border-[#E2E8F0] bg-[#FAFBFC] flex flex-col">
            {/* Panel tabs */}
            <div className="flex items-center border-b border-[#E2E8F0] bg-white">
              {(["suggestions", "chat"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setAiPanelTab(tab)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-[11px] transition-colors cursor-pointer border-b-2"
                  style={{
                    borderColor: aiPanelTab === tab ? "#3B82F6" : "transparent",
                    color: aiPanelTab === tab ? "#3B82F6" : "#94A3B8",
                    fontWeight: aiPanelTab === tab ? 500 : 400,
                  }}
                >
                  {tab === "suggestions" ? (
                    <>
                      <Sparkles className="w-3 h-3" />
                      Suggestions
                      {activeSuggestions.filter((s) => !s.accepted).length > 0 && (
                        <span className="w-4 h-4 rounded-full bg-[#3B82F6] text-white text-[9px] flex items-center justify-center" style={{ fontWeight: 600 }}>
                          {activeSuggestions.filter((s) => !s.accepted).length}
                        </span>
                      )}
                    </>
                  ) : (
                    <>
                      <MessageSquare className="w-3 h-3" />
                      Chat
                    </>
                  )}
                </button>
              ))}
            </div>

            {/* Panel content */}
            <div className="flex-1 overflow-y-auto">
              {aiPanelTab === "suggestions" ? (
                <div className="p-3 space-y-2">
                  {/* Summary */}
                  <div className="px-3 py-2 rounded-lg bg-white border border-[#E2E8F0]">
                    <div className="flex items-center gap-1.5 mb-1">
                      <Sparkles className="w-3 h-3 text-[#3B82F6]" />
                      <span className="text-[11px] text-[#0F172A]" style={{ fontWeight: 500 }}>AI Analysis</span>
                    </div>
                    <p className="text-[10px] text-[#64748B] leading-[1.6]">
                      {activeSuggestions.filter((s) => s.accepted).length} of {suggestions.length} suggestions applied. Document quality score: {activeSuggestions.filter((s) => s.accepted).length > 2 ? "92" : activeSuggestions.filter((s) => s.accepted).length > 0 ? "84" : "76"}/100.
                    </p>
                  </div>

                  {/* Suggestion cards */}
                  {activeSuggestions.map((suggestion) => (
                    <div
                      key={suggestion.id}
                      className="rounded-lg border bg-white overflow-hidden transition-all duration-200"
                      style={{
                        borderColor: suggestion.accepted ? "#BBF7D0" : "#E2E8F0",
                        opacity: suggestion.accepted ? 0.7 : 1,
                      }}
                    >
                      <div className="p-3">
                        <div className="flex items-start gap-2">
                          <SuggestionTypeIcon type={suggestion.type} />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5 mb-0.5">
                              <span className="text-[11px] text-[#0F172A]" style={{ fontWeight: 500 }}>{suggestion.title}</span>
                              {suggestion.accepted && <Check className="w-3 h-3 text-[#22C55E]" />}
                            </div>
                            <p className="text-[10px] text-[#64748B] leading-[1.6]">{suggestion.description}</p>
                            {suggestion.preview && !suggestion.accepted && (
                              <div className="mt-2 px-2 py-1.5 rounded bg-[#F8FAFC] border border-[#E2E8F0]">
                                <p className="text-[10px] text-[#475569] leading-[1.5] italic">{suggestion.preview}</p>
                              </div>
                            )}
                          </div>
                        </div>
                        {!suggestion.accepted && (
                          <div className="flex items-center gap-1.5 mt-2.5 pl-8">
                            <button
                              onClick={() => acceptSuggestion(suggestion.id)}
                              className="flex items-center gap-1 px-2 py-1 rounded text-[10px] bg-[#0F172A] text-white hover:bg-[#1E293B] transition-colors cursor-pointer"
                              style={{ fontWeight: 500 }}
                            >
                              <Check className="w-2.5 h-2.5" />
                              Apply
                            </button>
                            <button
                              onClick={() => dismissSuggestion(suggestion.id)}
                              className="flex items-center gap-1 px-2 py-1 rounded text-[10px] text-[#94A3B8] hover:bg-[#F1F5F9] transition-colors cursor-pointer"
                            >
                              <X className="w-2.5 h-2.5" />
                              Dismiss
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* Chat view */
                <div className="flex flex-col h-full">
                  <div className="flex-1 overflow-y-auto p-3 space-y-3">
                    {chatMessages.map((msg) => (
                      <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                        <div
                          className="max-w-[90%] rounded-xl px-3 py-2"
                          style={{
                            background: msg.role === "user" ? "#0F172A" : "#F1F5F9",
                          }}
                        >
                          {msg.role === "ai" && (
                            <div className="flex items-center gap-1 mb-1">
                              <Sparkles className="w-2.5 h-2.5 text-[#3B82F6]" />
                              <span className="text-[9px] text-[#3B82F6]" style={{ fontWeight: 500 }}>AI Assistant</span>
                            </div>
                          )}
                          <p className="text-[11px] leading-[1.65]" style={{ color: msg.role === "user" ? "#fff" : "#334155" }}>
                            {msg.text}
                          </p>
                          <div className="text-[9px] mt-1" style={{ color: msg.role === "user" ? "#94A3B8" : "#CBD5E1", textAlign: msg.role === "user" ? "right" : "left" }}>
                            {msg.time}
                          </div>
                        </div>
                      </div>
                    ))}
                    {isAiTyping && (
                      <div className="flex justify-start">
                        <div className="rounded-xl px-3 py-2 bg-[#F1F5F9]">
                          <div className="flex items-center gap-1 mb-1">
                            <Sparkles className="w-2.5 h-2.5 text-[#3B82F6]" />
                            <span className="text-[9px] text-[#3B82F6]" style={{ fontWeight: 500 }}>AI Assistant</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#94A3B8] animate-bounce" style={{ animationDelay: "0ms" }} />
                            <div className="w-1.5 h-1.5 rounded-full bg-[#94A3B8] animate-bounce" style={{ animationDelay: "150ms" }} />
                            <div className="w-1.5 h-1.5 rounded-full bg-[#94A3B8] animate-bounce" style={{ animationDelay: "300ms" }} />
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={chatEndRef} />
                  </div>
                </div>
              )}
            </div>

            {/* Chat input (shown when chat tab active) */}
            {aiPanelTab === "chat" && (
              <div className="p-2 border-t border-[#E2E8F0] bg-white">
                <div className="flex items-center gap-1.5">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendChat()}
                    placeholder="Ask about this document..."
                    className="flex-1 px-2.5 py-1.5 rounded-lg text-[11px] bg-[#F8FAFC] border border-[#E2E8F0] outline-none focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6]/20 transition-all placeholder:text-[#CBD5E1]"
                  />
                  <button
                    onClick={sendChat}
                    disabled={!chatInput.trim()}
                    className="p-1.5 rounded-lg bg-[#0F172A] text-white hover:bg-[#1E293B] transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <Send className="w-3 h-3" />
                  </button>
                </div>
              </div>
            )}

            {/* Quick actions (shown when suggestions tab active) */}
            {aiPanelTab === "suggestions" && (
              <div className="p-2 border-t border-[#E2E8F0] bg-white">
                <div className="flex flex-wrap gap-1">
                  {["Summarize", "Proofread", "Shorten", "Expand"].map((action) => (
                    <button key={action} className="px-2 py-1 rounded-md text-[10px] text-[#64748B] bg-[#F8FAFC] border border-[#E2E8F0] hover:bg-[#F1F5F9] hover:border-[#CBD5E1] transition-all cursor-pointer" style={{ fontWeight: 500 }}>
                      {action}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
