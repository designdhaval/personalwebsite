import { useState, useRef, useEffect, useCallback } from "react";
import {
  Search,
  Command,
  ArrowRight,
  CornerDownLeft,
  Sparkles,
  FileText,
  Globe,
  Code2,
  Pencil,
  Calendar,
  BarChart3,
  Zap,
  ArrowUp,
  ArrowDown,
  Loader2,
  Copy,
  Check,
  Hash,
  Clock,
  Star,
  Image as ImageIcon,
  MessageSquare,
  X,
  ChevronRight,
} from "lucide-react";

/* ─── Types ─── */
interface CommandItem {
  id: string;
  label: string;
  description?: string;
  icon: React.ReactNode;
  category: "AI" | "Actions" | "Navigation" | "Recent";
  shortcut?: string;
  badge?: string;
}

interface AIResult {
  type: "text" | "code" | "list" | "loading";
  title: string;
  content: string;
  items?: string[];
  language?: string;
}

/* ─── Command Data ─── */
const allCommands: CommandItem[] = [
  { id: "summarize", label: "Summarize this page", description: "Create a concise summary of the current content", icon: <Sparkles className="w-3.5 h-3.5" />, category: "AI", badge: "AI" },
  { id: "explain", label: "Explain selection", description: "Break down the highlighted text in simple terms", icon: <MessageSquare className="w-3.5 h-3.5" />, category: "AI", badge: "AI" },
  { id: "rewrite", label: "Rewrite for clarity", description: "Improve readability of selected content", icon: <Pencil className="w-3.5 h-3.5" />, category: "AI", badge: "AI" },
  { id: "translate", label: "Translate to Spanish", description: "Convert selected text to Spanish", icon: <Globe className="w-3.5 h-3.5" />, category: "AI", badge: "AI" },
  { id: "generate-code", label: "Generate code snippet", description: "Create code from a natural language description", icon: <Code2 className="w-3.5 h-3.5" />, category: "AI", badge: "AI" },
  { id: "generate-image", label: "Generate image prompt", description: "Create a detailed image generation prompt", icon: <ImageIcon className="w-3.5 h-3.5" />, category: "AI", badge: "AI" },
  { id: "new-doc", label: "New document", description: "Create a blank document", icon: <FileText className="w-3.5 h-3.5" />, category: "Actions", shortcut: "⌘N" },
  { id: "search", label: "Search files", description: "Find files across the workspace", icon: <Search className="w-3.5 h-3.5" />, category: "Actions", shortcut: "⌘F" },
  { id: "schedule", label: "Schedule meeting", description: "Add an event to your calendar", icon: <Calendar className="w-3.5 h-3.5" />, category: "Actions", shortcut: "⌘E" },
  { id: "analytics", label: "View analytics", description: "Open the analytics dashboard", icon: <BarChart3 className="w-3.5 h-3.5" />, category: "Navigation" },
  { id: "settings", label: "Open settings", description: "Configure application preferences", icon: <Zap className="w-3.5 h-3.5" />, category: "Navigation", shortcut: "⌘," },
  { id: "recent-report", label: "Q4 Performance Report", description: "Opened 2 hours ago", icon: <Clock className="w-3.5 h-3.5" />, category: "Recent" },
  { id: "recent-deck", label: "Product Strategy Deck", description: "Opened yesterday", icon: <Clock className="w-3.5 h-3.5" />, category: "Recent" },
];

const aiResponses: Record<string, AIResult> = {
  summarize: {
    type: "text",
    title: "Page Summary",
    content: "This document outlines the Q4 product roadmap with 3 key initiatives: AI-powered search improvements (targeting 40% faster results), a new collaboration workspace (launching in November), and mobile app redesign (beta in December). Budget allocation is $2.4M with a team of 18 engineers.",
  },
  explain: {
    type: "list",
    title: "Explanation",
    content: "Here's a breakdown of the selected text:",
    items: [
      "The system uses a transformer architecture for natural language processing",
      "Input tokens are converted to embeddings (numerical representations)",
      "Attention mechanisms help the model focus on relevant context",
      "The output is generated token-by-token using beam search",
    ],
  },
  rewrite: {
    type: "text",
    title: "Rewritten Text",
    content: "Our team has developed a streamlined approach to AI-assisted workflows. By combining real-time data processing with intuitive visual interfaces, users can build complex automation pipelines without writing code. The system handles error recovery automatically and provides clear status updates throughout execution.",
  },
  translate: {
    type: "text",
    title: "Spanish Translation",
    content: "Nuestro equipo ha desarrollado un enfoque optimizado para los flujos de trabajo asistidos por IA. Al combinar el procesamiento de datos en tiempo real con interfaces visuales intuitivas, los usuarios pueden construir pipelines de automatización complejos sin escribir código.",
  },
  "generate-code": {
    type: "code",
    title: "Generated Code",
    content: `async function fetchAIResponse(prompt: string) {
  const response = await fetch('/api/ai', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt, model: 'gpt-4' }),
  });
  const data = await response.json();
  return data.result;
}`,
    language: "typescript",
  },
  "generate-image": {
    type: "text",
    title: "Image Prompt",
    content: "A serene Japanese zen garden at golden hour, featuring raked sand patterns, moss-covered stones, a small bamboo water fountain, cherry blossom petals floating in the air, soft diffused lighting, photorealistic, 8K resolution, shallow depth of field —ar 16:9 —v 6",
  },
};

/* ─── Category ordering ─── */
const categoryOrder: CommandItem["category"][] = ["AI", "Actions", "Navigation", "Recent"];
const categoryLabels: Record<string, string> = {
  AI: "AI Commands",
  Actions: "Quick Actions",
  Navigation: "Navigation",
  Recent: "Recent",
};

/* ═══════════════════════════════════════════════
   Main Component
   ═══════════════════════════════════════════════ */
export function CommandPaletteExample() {
  const [isOpen, setIsOpen] = useState(true);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [activeResult, setActiveResult] = useState<AIResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  /* ─── Filter commands ─── */
  const filteredCommands = query.trim()
    ? allCommands.filter(
        (cmd) =>
          cmd.label.toLowerCase().includes(query.toLowerCase()) ||
          (cmd.description || "").toLowerCase().includes(query.toLowerCase()) ||
          cmd.category.toLowerCase().includes(query.toLowerCase())
      )
    : allCommands;

  /* ─── Group by category ─── */
  const grouped = categoryOrder
    .map((cat) => ({
      category: cat,
      items: filteredCommands.filter((cmd) => cmd.category === cat),
    }))
    .filter((g) => g.items.length > 0);

  /* ─── Flat list for keyboard nav ─── */
  const flatList = grouped.flatMap((g) => g.items);

  /* ─── Keyboard navigation ─── */
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => Math.min(prev + 1, flatList.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === "Enter" && flatList[selectedIndex]) {
        e.preventDefault();
        executeCommand(flatList[selectedIndex]);
      } else if (e.key === "Escape") {
        if (activeResult) {
          setActiveResult(null);
        } else {
          setIsOpen(false);
          setTimeout(() => setIsOpen(true), 800);
        }
      }
    },
    [flatList, selectedIndex, activeResult]
  );

  /* ─── Execute command ─── */
  const executeCommand = useCallback((cmd: CommandItem) => {
    if (cmd.category === "AI") {
      setIsLoading(true);
      setActiveResult({ type: "loading", title: "Thinking...", content: "" });
      setTimeout(() => {
        setIsLoading(false);
        const result = aiResponses[cmd.id];
        if (result) {
          setActiveResult(result);
        } else {
          setActiveResult({
            type: "text",
            title: cmd.label,
            content: "This is a simulated AI response for the command palette demo. In a real implementation, this would connect to an AI service.",
          });
        }
      }, 1200 + Math.random() * 600);
    } else {
      // Non-AI commands: brief flash
      setActiveResult({
        type: "text",
        title: `${cmd.label}`,
        content: `Action "${cmd.label}" executed successfully.`,
      });
      setTimeout(() => setActiveResult(null), 2000);
    }
  }, []);

  /* ─── Reset selected index on filter change ─── */
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  /* ─── Auto-focus input ─── */
  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  /* ─── Scroll selected into view ─── */
  useEffect(() => {
    const el = listRef.current?.querySelector(`[data-idx="${selectedIndex}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [selectedIndex]);

  const handleCopy = useCallback((text: string) => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, []);

  /* ─── Render ─── */
  return (
    <div
      className="w-full rounded-2xl border-2 border-[#333] bg-[#F0F2F5] overflow-hidden shadow-[5px_6px_0px_0px_#333] relative"
      style={{ fontFamily: "'Inter', sans-serif", height: 620 }}
    >
      {/* Simulated app background */}
      <div className="absolute inset-0">
        {/* Fake app toolbar */}
        <div className="flex items-center gap-3 px-5 py-3 bg-white border-b border-[#E5E7EB]">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
          </div>
          <div className="flex-1 flex items-center justify-center">
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-[#F3F4F6] border border-[#E5E7EB] text-[11px] text-[#9CA3AF] cursor-pointer hover:bg-[#E5E7EB] transition-colors"
              onClick={() => { setIsOpen(true); setActiveResult(null); setQuery(""); }}
            >
              <Search className="w-3 h-3" />
              <span>Search or ask AI...</span>
              <span className="ml-4 flex items-center gap-0.5 text-[10px] text-[#B0B7C3] px-1.5 py-0.5 rounded bg-white border border-[#E5E7EB]">
                <Command className="w-2.5 h-2.5" />K
              </span>
            </div>
          </div>
        </div>

        {/* Fake document content */}
        <div className="px-16 py-10 max-w-[700px] mx-auto">
          <div className="h-5 w-48 bg-[#D1D5DB] rounded mb-4" />
          <div className="h-3 w-full bg-[#E5E7EB] rounded mb-2.5" />
          <div className="h-3 w-[92%] bg-[#E5E7EB] rounded mb-2.5" />
          <div className="h-3 w-[88%] bg-[#E5E7EB] rounded mb-6" />
          <div className="h-3 w-full bg-[#E5E7EB] rounded mb-2.5" />
          <div className="h-3 w-[95%] bg-[#E5E7EB] rounded mb-2.5" />
          <div className="h-3 w-[80%] bg-[#E5E7EB] rounded mb-6" />
          <div className="h-32 w-full bg-[#E5E7EB] rounded-lg mb-6" />
          <div className="h-3 w-[90%] bg-[#E5E7EB] rounded mb-2.5" />
          <div className="h-3 w-full bg-[#E5E7EB] rounded mb-2.5" />
          <div className="h-3 w-[75%] bg-[#E5E7EB] rounded" />
        </div>
      </div>

      {/* ═══ Command Palette Overlay ═══ */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/20 backdrop-blur-[2px] z-10"
            onClick={() => { setIsOpen(false); setTimeout(() => setIsOpen(true), 800); }}
            style={{ animation: "fadeIn 0.15s ease-out" }}
          />

          {/* Palette Modal */}
          <div
            className="absolute left-1/2 top-[15%] -translate-x-1/2 z-20 w-[520px]"
            style={{ animation: "slideDown 0.2s cubic-bezier(0.16, 1, 0.3, 1)" }}
          >
            <div
              className="rounded-xl bg-white border border-[#E2E5EA] overflow-hidden"
              style={{ boxShadow: "0 24px 80px -12px rgba(0,0,0,0.2), 0 0 0 1px rgba(0,0,0,0.05)" }}
            >
              {/* ═══ Zone A — Prompt Field ═══ */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-[#F1F3F5]">
                {activeResult && !isLoading ? (
                  <button
                    onClick={() => setActiveResult(null)}
                    className="p-1 rounded-md hover:bg-[#F3F4F6] cursor-pointer transition-colors"
                  >
                    <ChevronRight className="w-4 h-4 text-[#9CA3AF] rotate-180" />
                  </button>
                ) : (
                  <Search className="w-4 h-4 text-[#9CA3AF] shrink-0" />
                )}
                <input
                  ref={inputRef}
                  type="text"
                  placeholder={activeResult ? "Ask a follow-up..." : "Type a command or ask AI..."}
                  value={query}
                  onChange={(e) => { setQuery(e.target.value); setActiveResult(null); }}
                  onKeyDown={handleKeyDown}
                  className="flex-1 text-[14px] text-[#111827] placeholder:text-[#B0B7C3] outline-none bg-transparent"
                />
                {query && (
                  <button
                    onClick={() => { setQuery(""); setActiveResult(null); }}
                    className="p-1 rounded-md hover:bg-[#F3F4F6] cursor-pointer transition-colors"
                  >
                    <X className="w-3.5 h-3.5 text-[#9CA3AF]" />
                  </button>
                )}
                <div className="flex items-center gap-1 text-[10px] text-[#CBD5E1] px-1.5 py-0.5 rounded bg-[#F8FAFC] border border-[#E5E7EB] shrink-0">
                  <CornerDownLeft className="w-2.5 h-2.5" />
                </div>
              </div>

              {/* ═══ Zone C — Result Panel (when active) ═══ */}
              {activeResult && (
                <div className="border-b border-[#F1F3F5]">
                  {isLoading ? (
                    <div className="flex items-center gap-3 px-5 py-8 justify-center">
                      <Loader2 className="w-4 h-4 text-[#8B5CF6] animate-spin" />
                      <span className="text-[13px] text-[#6B7280]">Generating response...</span>
                    </div>
                  ) : (
                    <div className="px-5 py-4 max-h-[260px] overflow-y-auto">
                      {/* Title */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-3.5 h-3.5 text-[#8B5CF6]" />
                          <span className="text-[12px] text-[#6B7280]" style={{ fontWeight: 600 }}>
                            {activeResult.title}
                          </span>
                        </div>
                        <button
                          onClick={() => handleCopy(activeResult.content)}
                          className="flex items-center gap-1 px-2 py-1 rounded-md text-[10px] text-[#9CA3AF] hover:bg-[#F3F4F6] hover:text-[#6B7280] transition-colors cursor-pointer"
                          style={{ fontWeight: 500 }}
                        >
                          {copied ? <Check className="w-3 h-3 text-[#22C55E]" /> : <Copy className="w-3 h-3" />}
                          {copied ? "Copied" : "Copy"}
                        </button>
                      </div>

                      {/* Content */}
                      {activeResult.type === "text" && (
                        <p className="text-[13px] text-[#374151] leading-[1.7]">{activeResult.content}</p>
                      )}

                      {activeResult.type === "code" && (
                        <div className="rounded-lg overflow-hidden border border-[#E5E7EB]">
                          <div className="flex items-center justify-between px-3 py-1.5 bg-[#F8FAFC] border-b border-[#E5E7EB]">
                            <span className="text-[10px] text-[#9CA3AF]" style={{ fontWeight: 500 }}>
                              {activeResult.language || "code"}
                            </span>
                          </div>
                          <pre className="px-3 py-3 text-[11px] text-[#1F2937] bg-[#FAFBFC] overflow-x-auto font-mono leading-[1.6] whitespace-pre-wrap">
                            {activeResult.content}
                          </pre>
                        </div>
                      )}

                      {activeResult.type === "list" && (
                        <div>
                          <p className="text-[13px] text-[#374151] leading-[1.7] mb-2.5">{activeResult.content}</p>
                          <ul className="space-y-1.5">
                            {activeResult.items?.map((item, i) => (
                              <li key={i} className="flex items-start gap-2 text-[12px] text-[#4B5563] leading-[1.6]">
                                <span className="w-4 h-4 rounded-full bg-[#F3F0FF] text-[#8B5CF6] flex items-center justify-center text-[9px] shrink-0 mt-0.5" style={{ fontWeight: 600 }}>
                                  {i + 1}
                                </span>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* ═══ Zone B — Suggested Commands ═══ */}
              {!activeResult && (
                <div ref={listRef} className="max-h-[340px] overflow-y-auto py-1.5">
                  {grouped.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-10 text-[13px] text-[#9CA3AF]">
                      <Search className="w-5 h-5 mb-2 text-[#D1D5DB]" />
                      No commands found
                    </div>
                  )}
                  {grouped.map((group) => {
                    const catIdx = flatList.indexOf(group.items[0]);
                    return (
                      <div key={group.category}>
                        {/* Category header */}
                        <div className="px-4 pt-3 pb-1.5">
                          <span className="text-[10px] tracking-[0.06em] uppercase text-[#B0B7C3]" style={{ fontWeight: 600 }}>
                            {categoryLabels[group.category]}
                          </span>
                        </div>
                        {/* Items */}
                        {group.items.map((cmd) => {
                          const idx = flatList.indexOf(cmd);
                          const isSelected = idx === selectedIndex;
                          return (
                            <div
                              key={cmd.id}
                              data-idx={idx}
                              onClick={() => executeCommand(cmd)}
                              onMouseEnter={() => setSelectedIndex(idx)}
                              className="flex items-center gap-3 px-4 py-2 mx-1.5 rounded-lg cursor-pointer transition-colors"
                              style={{
                                background: isSelected ? "#F5F3FF" : "transparent",
                              }}
                            >
                              <div
                                className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                                style={{
                                  background: isSelected ? "#EDE9FE" : "#F3F4F6",
                                  color: isSelected ? "#7C3AED" : "#6B7280",
                                }}
                              >
                                {cmd.icon}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <span
                                    className="text-[13px] truncate"
                                    style={{
                                      color: isSelected ? "#1F2937" : "#374151",
                                      fontWeight: isSelected ? 500 : 400,
                                    }}
                                  >
                                    {cmd.label}
                                  </span>
                                  {cmd.badge && (
                                    <span className="px-1.5 py-0.5 rounded text-[9px] text-[#7C3AED] bg-[#F3F0FF]" style={{ fontWeight: 600 }}>
                                      {cmd.badge}
                                    </span>
                                  )}
                                </div>
                                {cmd.description && (
                                  <span className="text-[11px] text-[#9CA3AF] truncate block">
                                    {cmd.description}
                                  </span>
                                )}
                              </div>
                              {cmd.shortcut && (
                                <span className="text-[10px] text-[#CBD5E1] px-1.5 py-0.5 rounded bg-[#F8FAFC] border border-[#E5E7EB] shrink-0" style={{ fontWeight: 500 }}>
                                  {cmd.shortcut}
                                </span>
                              )}
                              {isSelected && (
                                <ArrowRight className="w-3 h-3 text-[#8B5CF6] shrink-0" />
                              )}
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Footer hints */}
              <div className="flex items-center justify-between px-4 py-2 border-t border-[#F1F3F5] bg-[#FAFBFC]">
                <div className="flex items-center gap-3 text-[10px] text-[#B0B7C3]">
                  <span className="flex items-center gap-1">
                    <ArrowUp className="w-2.5 h-2.5" />
                    <ArrowDown className="w-2.5 h-2.5" />
                    navigate
                  </span>
                  <span className="flex items-center gap-1">
                    <CornerDownLeft className="w-2.5 h-2.5" />
                    select
                  </span>
                  <span className="flex items-center gap-1">
                    esc close
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-[#B0B7C3]">
                  <Sparkles className="w-2.5 h-2.5 text-[#8B5CF6]" />
                  <span>{filteredCommands.filter((c) => c.category === "AI").length} AI commands available</span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* CSS animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translate(-50%, -8px); }
          to { opacity: 1; transform: translate(-50%, 0); }
        }
      `}</style>
    </div>
  );
}
