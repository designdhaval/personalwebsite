import { useState, useRef, useEffect } from "react";
import {
  Send,
  Paperclip,
  Sparkles,
  User,
  Bot,
  Plus,
  MessageSquare,
  Search,
  Copy,
  Check,
  RefreshCw,
  Mic,
  ChevronDown,
  MoreHorizontal,
  PenLine,
} from "lucide-react";

/* ─── Types ─── */
interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  time: string;
  isCode?: boolean;
  codeLanguage?: string;
}

interface Conversation {
  id: string;
  title: string;
  preview: string;
  time: string;
  messages: Message[];
}

/* ─── Mock Data ─── */
const allConversations: Conversation[] = [
  {
    id: "1",
    title: "Brand strategy analysis",
    preview: "Looking at engagement breakdown by content type...",
    time: "10:36 AM",
    messages: [
      {
        id: "m1",
        role: "user",
        content:
          "Can you help me analyze the key trends in our latest brand strategy report? I want to understand which channels are performing best.",
        time: "10:32 AM",
      },
      {
        id: "m2",
        role: "assistant",
        content:
          "I'd be happy to help analyze your brand strategy report. Based on the data you've shared, here are the key trends I've identified:\n\n**1. Social media engagement is up 34%** quarter-over-quarter, with Instagram and TikTok leading growth.\n\n**2. Email marketing conversion rates improved by 12%**, likely due to the new segmentation strategy.\n\n**3. Organic search traffic has plateaued** — this may require a content refresh to maintain momentum.\n\nWould you like me to dive deeper into any of these areas?",
        time: "10:33 AM",
      },
      {
        id: "m3",
        role: "user",
        content:
          "Yes, let's explore the social media engagement data more closely. What specific content types are driving the most interaction?",
        time: "10:35 AM",
      },
      {
        id: "m4",
        role: "assistant",
        content:
          "Looking at the engagement breakdown by content type:\n\n• **Short-form video** (Reels/TikTok): 52% of total engagement — these consistently outperform other formats with 3.2x higher share rates.\n\n• **Carousel posts**: 24% of engagement — particularly effective for educational content and product comparisons.\n\n• **User-generated content**: 15% — reposts and collaborations are building strong community trust.\n\n• **Static images and text posts**: 9% — declining performance, but still useful for announcements.\n\nThe data strongly suggests doubling down on short-form video production while maintaining carousel content for your educational pillars.",
        time: "10:36 AM",
      },
    ],
  },
  {
    id: "2",
    title: "React component architecture",
    preview: "Here's a clean component structure...",
    time: "Yesterday",
    messages: [
      {
        id: "m5",
        role: "user",
        content: "How should I structure a React component that fetches data and handles loading/error states?",
        time: "3:22 PM",
      },
      {
        id: "m6",
        role: "assistant",
        content:
          'Here\'s a clean pattern using a custom hook to separate data fetching from presentation:\n\n```typescript\nfunction useDataFetch<T>(url: string) {\n  const [data, setData] = useState<T | null>(null);\n  const [loading, setLoading] = useState(true);\n  const [error, setError] = useState<Error | null>(null);\n\n  useEffect(() => {\n    fetch(url)\n      .then(res => res.json())\n      .then(setData)\n      .catch(setError)\n      .finally(() => setLoading(false));\n  }, [url]);\n\n  return { data, loading, error };\n}\n```\n\nThen use it in your component:\n\n```tsx\nfunction UserProfile({ userId }: { userId: string }) {\n  const { data, loading, error } = useDataFetch<User>(\n    `/api/users/${userId}`\n  );\n\n  if (loading) return <Skeleton />;\n  if (error) return <ErrorCard message={error.message} />;\n  return <ProfileCard user={data!} />;\n}\n```\n\nThis pattern gives you **separation of concerns**, **reusability**, and **type safety** all in one clean abstraction.',
        time: "3:23 PM",
        isCode: true,
      },
    ],
  },
  {
    id: "3",
    title: "Q3 report summary",
    preview: "Revenue grew 18% year-over-year...",
    time: "Yesterday",
    messages: [
      {
        id: "m7",
        role: "user",
        content: "Summarize the key takeaways from our Q3 financial report.",
        time: "9:15 AM",
      },
      {
        id: "m8",
        role: "assistant",
        content:
          "Here are the key takeaways from your Q3 financial report:\n\n**Revenue**: Grew 18% year-over-year to $4.2M, driven primarily by enterprise contract expansions.\n\n**Gross Margin**: Improved from 62% to 68%, reflecting operational efficiencies and better vendor negotiations.\n\n**Customer Acquisition**: 142 new customers added, with CAC decreasing 11% due to improved inbound marketing.\n\n**Churn**: Net revenue retention at 112%, indicating strong expansion within existing accounts despite a slight increase in logo churn (3.1% → 3.4%).\n\n**Cash Position**: $12.8M in cash with 22 months of runway at current burn rate.\n\nOverall, a strong quarter with healthy unit economics. The main area of concern is the slight uptick in logo churn worth monitoring.",
        time: "9:16 AM",
      },
    ],
  },
  {
    id: "4",
    title: "Email draft review",
    preview: "The email looks good overall...",
    time: "2 days ago",
    messages: [],
  },
  {
    id: "5",
    title: "Meeting notes cleanup",
    preview: "Here are the organized notes...",
    time: "3 days ago",
    messages: [],
  },
  {
    id: "6",
    title: "Product roadmap brainstorm",
    preview: "For Q1 2026, I'd suggest focusing on...",
    time: "Last week",
    messages: [],
  },
];

/* ─── Markdown-lite renderer ─── */
function renderFormattedText(text: string) {
  const lines = text.split("\n");
  const elements: React.ReactNode[] = [];
  let inCodeBlock = false;
  let codeLines: string[] = [];
  let codeLang = "";

  lines.forEach((line, lineIdx) => {
    if (line.startsWith("```")) {
      if (!inCodeBlock) {
        inCodeBlock = true;
        codeLang = line.slice(3).trim();
        codeLines = [];
      } else {
        inCodeBlock = false;
        elements.push(
          <CodeBlock key={`code-${lineIdx}`} language={codeLang} code={codeLines.join("\n")} />
        );
        codeLines = [];
        codeLang = "";
      }
      return;
    }

    if (inCodeBlock) {
      codeLines.push(line);
      return;
    }

    if (line.trim() === "") {
      elements.push(<div key={`br-${lineIdx}`} className="h-3" />);
      return;
    }

    // Process bold markers
    const parts = line.split(/(\*\*[^*]+\*\*)/g);
    const formattedParts = parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <span key={i} className="text-[#0F172A]" style={{ fontWeight: 600 }}>
            {part.slice(2, -2)}
          </span>
        );
      }
      return part;
    });

    elements.push(
      <div key={`line-${lineIdx}`} className="leading-[1.75]">
        {formattedParts}
      </div>
    );
  });

  return elements;
}

/* ─── Code Block ─── */
function CodeBlock({ language, code }: { language: string; code: string }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(code).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="rounded-xl border border-[#E2E8F0] overflow-hidden my-2 bg-[#1E293B]">
      <div className="flex items-center justify-between px-4 py-2 bg-[#0F172A] border-b border-[#334155]">
        <span className="text-[11px] text-[#94A3B8] tracking-wide">{language || "code"}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-[11px] text-[#94A3B8] hover:text-white transition-colors cursor-pointer"
        >
          {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="px-4 py-3 overflow-x-auto text-[12.5px] leading-[1.7] text-[#E2E8F0]">
        <code>{code}</code>
      </pre>
    </div>
  );
}

/* ─── Main Chat Example ─── */
export function ChatExample() {
  const [activeConvId, setActiveConvId] = useState("1");
  const [conversations, setConversations] = useState(allConversations);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [copiedMsgId, setCopiedMsgId] = useState<string | null>(null);
  const [searchValue, setSearchValue] = useState("");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [hoveredMsgId, setHoveredMsgId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const activeConv = conversations.find((c) => c.id === activeConvId)!;
  const currentMessages = activeConv?.messages || [];

  const filteredConversations = searchValue
    ? conversations.filter((c) => c.title.toLowerCase().includes(searchValue.toLowerCase()))
    : conversations;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentMessages.length, isTyping]);

  function handleCopyMessage(id: string, content: string) {
    navigator.clipboard.writeText(content.replace(/\*\*/g, "")).catch(() => {});
    setCopiedMsgId(id);
    setTimeout(() => setCopiedMsgId(null), 2000);
  }

  function handleSend() {
    if (!inputValue.trim() || isTyping) return;

    const userMsg: Message = {
      id: `msg-${Date.now()}`,
      role: "user",
      content: inputValue.trim(),
      time: new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
    };

    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeConvId ? { ...c, messages: [...c.messages, userMsg] } : c
      )
    );
    setInputValue("");
    setIsTyping(true);

    // Auto-resize textarea back
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    // Simulate AI response
    setTimeout(() => {
      const aiMsg: Message = {
        id: `msg-${Date.now() + 1}`,
        role: "assistant",
        content:
          "That's a great question! Let me think about this carefully.\n\nBased on my analysis, here are a few key points to consider:\n\n**1. Context matters** — The approach should be tailored to your specific use case and requirements.\n\n**2. Start simple** — Begin with a minimal implementation and iterate based on feedback.\n\n**3. Measure outcomes** — Set clear metrics to evaluate the effectiveness of your solution.\n\nWould you like me to elaborate on any of these points or explore a different angle?",
        time: new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
      };

      setConversations((prev) =>
        prev.map((c) =>
          c.id === activeConvId ? { ...c, messages: [...c.messages, aiMsg] } : c
        )
      );
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  }

  function handleRegenerate(msgId: string) {
    if (isTyping) return;
    setIsTyping(true);

    setTimeout(() => {
      const newContent =
        "Here's an alternative perspective on this topic:\n\n**Revised analysis**: After reconsidering the data, I've identified some additional nuances worth exploring.\n\n• The trend line shows a more gradual shift than initially presented, suggesting a longer adoption curve.\n\n• External market factors may be contributing to the observed patterns more than internal strategy changes.\n\n• A/B testing would help validate these hypotheses before committing to a new direction.\n\nWould you like me to outline a testing framework for this?";

      setConversations((prev) =>
        prev.map((c) =>
          c.id === activeConvId
            ? {
                ...c,
                messages: c.messages.map((m) =>
                  m.id === msgId
                    ? {
                        ...m,
                        content: newContent,
                        time: new Date().toLocaleTimeString([], {
                          hour: "numeric",
                          minute: "2-digit",
                        }),
                      }
                    : m
                ),
              }
            : c
        )
      );
      setIsTyping(false);
    }, 1200);
  }

  function handleNewChat() {
    const newId = `new-${Date.now()}`;
    const newConv: Conversation = {
      id: newId,
      title: "New conversation",
      preview: "",
      time: "Just now",
      messages: [],
    };
    setConversations((prev) => [newConv, ...prev]);
    setActiveConvId(newId);
  }

  function handleTextareaInput(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setInputValue(e.target.value);
    // Auto-resize
    e.target.style.height = "auto";
    e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px";
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div
      className="w-full rounded-2xl border-2 border-[#333] bg-white overflow-hidden shadow-[5px_6px_0px_0px_#333]"
      style={{ height: 640 }}
    >
      <div className="flex h-full">
        {/* ═══ Sidebar ═══ */}
        <div
          className="border-r border-[#E2E8F0] bg-[#F8FAFC] flex flex-col transition-all duration-300"
          style={{ width: sidebarCollapsed ? 0 : 280, minWidth: sidebarCollapsed ? 0 : 280 }}
        >
          {!sidebarCollapsed && (
            <>
              {/* Sidebar header */}
              <div className="p-4 border-b border-[#E2E8F0]">
                <button
                  onClick={handleNewChat}
                  className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0F172A] text-white text-[13px] justify-center hover:bg-[#1E293B] transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  New conversation
                </button>
              </div>

              {/* Search */}
              <div className="px-4 py-3">
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white border border-[#E2E8F0]">
                  <Search className="w-3.5 h-3.5 text-[#94A3B8]" />
                  <input
                    type="text"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder="Search conversations..."
                    className="flex-1 bg-transparent border-none outline-none text-[12px] text-[#0F172A] placeholder:text-[#94A3B8]"
                  />
                </div>
              </div>

              {/* Conversation list */}
              <div className="flex-1 overflow-y-auto px-2">
                <div className="px-2 py-2">
                  <span className="text-[10px] tracking-[0.1em] uppercase text-[#94A3B8]">
                    Recent
                  </span>
                </div>
                {filteredConversations.map((conv) => {
                  const isActive = conv.id === activeConvId;
                  return (
                    <button
                      key={conv.id}
                      onClick={() => setActiveConvId(conv.id)}
                      className={`w-full flex items-start gap-2.5 px-3 py-2.5 rounded-xl mb-0.5 cursor-pointer transition-all text-left ${
                        isActive
                          ? "bg-white border border-[#E2E8F0] shadow-sm"
                          : "hover:bg-white/60 border border-transparent"
                      }`}
                    >
                      <MessageSquare
                        className="w-3.5 h-3.5 shrink-0 mt-0.5"
                        style={{ color: isActive ? "#2563EB" : "#94A3B8" }}
                      />
                      <div className="flex-1 min-w-0">
                        <div
                          className={`text-[13px] truncate ${
                            isActive ? "text-[#0F172A]" : "text-[#64748B]"
                          }`}
                        >
                          {conv.title}
                        </div>
                        <div className="text-[11px] text-[#94A3B8] truncate mt-0.5">
                          {conv.time}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* User profile section */}
              <div className="p-3 border-t border-[#E2E8F0]">
                <div className="flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-white/60 transition-colors cursor-pointer">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#2563EB] to-[#7C3AED] flex items-center justify-center shrink-0">
                    <span className="text-[11px] text-white" style={{ fontWeight: 600 }}>
                      JD
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] text-[#0F172A] truncate">Jane Doe</div>
                    <div className="text-[11px] text-[#94A3B8] truncate">Free plan</div>
                  </div>
                  <MoreHorizontal className="w-4 h-4 text-[#94A3B8]" />
                </div>
              </div>
            </>
          )}
        </div>

        {/* ═══ Main Chat Area ═══ */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Chat header */}
          <div className="h-[52px] px-5 border-b border-[#E2E8F0] flex items-center justify-between shrink-0 bg-white">
            <div className="flex items-center gap-3">
              {sidebarCollapsed && (
                <button
                  onClick={() => setSidebarCollapsed(false)}
                  className="p-1.5 rounded-lg hover:bg-[#F1F5F9] transition-colors cursor-pointer mr-1"
                >
                  <MessageSquare className="w-4 h-4 text-[#64748B]" />
                </button>
              )}
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#2563EB]/10 to-[#7C3AED]/10 flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />
              </div>
              <div>
                <span className="text-[14px] text-[#0F172A]">{activeConv.title}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC]">
                <div className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
                <span className="text-[11px] text-[#64748B]">GPT-4o</span>
                <ChevronDown className="w-3 h-3 text-[#94A3B8]" />
              </div>
              {!sidebarCollapsed && (
                <button
                  onClick={() => setSidebarCollapsed(true)}
                  className="p-1.5 rounded-lg hover:bg-[#F1F5F9] transition-colors cursor-pointer"
                >
                  <PenLine className="w-4 h-4 text-[#64748B]" />
                </button>
              )}
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto">
            {currentMessages.length === 0 ? (
              /* Empty state */
              <div className="flex flex-col items-center justify-center h-full px-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#2563EB]/10 to-[#7C3AED]/10 flex items-center justify-center mb-5">
                  <Sparkles className="w-6 h-6 text-[#2563EB]" />
                </div>
                <h3
                  className="text-[20px] text-[#0F172A] mb-2"
                  style={{ fontFamily: "'Zilla Slab', serif" }}
                >
                  How can I help you today?
                </h3>
                <p className="text-[13px] text-[#94A3B8] text-center max-w-[360px] leading-[1.6] mb-8">
                  Ask me anything — from analyzing data and writing content to brainstorming ideas
                  and debugging code.
                </p>
                <div className="grid grid-cols-2 gap-2.5 max-w-[480px] w-full">
                  {[
                    { icon: "📊", text: "Analyze my Q3 data" },
                    { icon: "✍️", text: "Draft a blog post" },
                    { icon: "💡", text: "Brainstorm product ideas" },
                    { icon: "🐛", text: "Debug my code" },
                  ].map((suggestion) => (
                    <button
                      key={suggestion.text}
                      onClick={() => setInputValue(suggestion.text)}
                      className="flex items-center gap-2.5 px-4 py-3 rounded-xl border border-[#E2E8F0] bg-white text-left hover:border-[#CBD5E1] hover:shadow-sm transition-all cursor-pointer"
                    >
                      <span className="text-[16px]">{suggestion.icon}</span>
                      <span className="text-[13px] text-[#334155]">{suggestion.text}</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="px-6 py-6">
                <div className="max-w-[720px] mx-auto flex flex-col gap-1">
                  {currentMessages.map((msg) => {
                    const isUser = msg.role === "user";
                    const isHovered = hoveredMsgId === msg.id;
                    const isCopied = copiedMsgId === msg.id;

                    return (
                      <div
                        key={msg.id}
                        className={`group flex gap-3 py-4 rounded-xl transition-colors relative ${
                          isUser ? "flex-row-reverse" : ""
                        }`}
                        onMouseEnter={() => setHoveredMsgId(msg.id)}
                        onMouseLeave={() => setHoveredMsgId(null)}
                      >
                        {/* Avatar */}
                        <div
                          className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center mt-0.5 ${
                            isUser
                              ? "bg-gradient-to-br from-[#2563EB] to-[#7C3AED]"
                              : "bg-[#0F172A]"
                          }`}
                        >
                          {isUser ? (
                            <User className="w-3.5 h-3.5 text-white" />
                          ) : (
                            <Bot className="w-3.5 h-3.5 text-white" />
                          )}
                        </div>

                        {/* Message content */}
                        <div
                          className={`flex-1 min-w-0 ${isUser ? "flex flex-col items-end" : ""}`}
                        >
                          <div className="flex items-center gap-2 mb-1.5">
                            <span
                              className="text-[13px] text-[#0F172A]"
                              style={{ fontWeight: 500 }}
                            >
                              {isUser ? "You" : "Assistant"}
                            </span>
                            <span className="text-[11px] text-[#CBD5E1]">{msg.time}</span>
                          </div>

                          <div
                            className={`rounded-2xl px-4 py-3 max-w-full ${
                              isUser
                                ? "bg-[#2563EB] text-white rounded-tr-md"
                                : "bg-[#F8FAFC] border border-[#E2E8F0] text-[#334155] rounded-tl-md"
                            }`}
                          >
                            <div className="text-[13.5px] leading-[1.75]">
                              {isUser ? (
                                msg.content
                              ) : (
                                <div className={isUser ? "" : "text-[#334155]"}>
                                  {renderFormattedText(msg.content)}
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Message actions */}
                          {!isUser && (
                            <div
                              className="flex items-center gap-1 mt-2 transition-all duration-200"
                              style={{
                                opacity: isHovered ? 1 : 0,
                                transform: isHovered ? "translateY(0)" : "translateY(-4px)",
                              }}
                            >
                              <button
                                onClick={() => handleCopyMessage(msg.id, msg.content)}
                                className="flex items-center gap-1 px-2 py-1 rounded-md text-[11px] text-[#94A3B8] hover:text-[#64748B] hover:bg-[#F1F5F9] transition-colors cursor-pointer"
                              >
                                {isCopied ? (
                                  <Check className="w-3 h-3" />
                                ) : (
                                  <Copy className="w-3 h-3" />
                                )}
                                {isCopied ? "Copied" : "Copy"}
                              </button>
                              <button
                                onClick={() => handleRegenerate(msg.id)}
                                className="flex items-center gap-1 px-2 py-1 rounded-md text-[11px] text-[#94A3B8] hover:text-[#64748B] hover:bg-[#F1F5F9] transition-colors cursor-pointer"
                              >
                                <RefreshCw className="w-3 h-3" />
                                Regenerate
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}

                  {/* Typing indicator */}
                  {isTyping && (
                    <div className="flex gap-3 py-4">
                      <div className="w-8 h-8 rounded-full bg-[#0F172A] shrink-0 flex items-center justify-center mt-0.5">
                        <Bot className="w-3.5 h-3.5 text-white" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1.5">
                          <span
                            className="text-[13px] text-[#0F172A]"
                            style={{ fontWeight: 500 }}
                          >
                            Assistant
                          </span>
                        </div>
                        <div className="rounded-2xl rounded-tl-md bg-[#F8FAFC] border border-[#E2E8F0] px-4 py-3.5">
                          <div className="flex items-center gap-1.5">
                            <div className="flex gap-1">
                              <div
                                className="w-2 h-2 rounded-full bg-[#94A3B8]"
                                style={{
                                  animation: "pulse 1.4s ease-in-out infinite",
                                  animationDelay: "0ms",
                                }}
                              />
                              <div
                                className="w-2 h-2 rounded-full bg-[#94A3B8]"
                                style={{
                                  animation: "pulse 1.4s ease-in-out infinite",
                                  animationDelay: "200ms",
                                }}
                              />
                              <div
                                className="w-2 h-2 rounded-full bg-[#94A3B8]"
                                style={{
                                  animation: "pulse 1.4s ease-in-out infinite",
                                  animationDelay: "400ms",
                                }}
                              />
                            </div>
                            <span className="text-[12px] text-[#94A3B8] ml-1">Thinking...</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </div>
            )}
          </div>

          {/* ═══ Input Bar ═══ */}
          <div className="px-6 py-4 border-t border-[#E2E8F0] bg-white">
            <div className="max-w-[720px] mx-auto">
              <div className="flex items-end gap-2 px-4 py-2.5 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] shadow-sm focus-within:border-[#2563EB] focus-within:shadow-[0_0_0_3px_rgba(37,99,235,0.08)] transition-all">
                <button className="p-1.5 rounded-lg hover:bg-[#E2E8F0] transition-colors shrink-0 mb-0.5 cursor-pointer">
                  <Paperclip className="w-4 h-4 text-[#94A3B8]" />
                </button>
                <textarea
                  ref={textareaRef}
                  value={inputValue}
                  onChange={handleTextareaInput}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask anything..."
                  rows={1}
                  className="flex-1 bg-transparent border-none outline-none text-[13.5px] text-[#0F172A] placeholder:text-[#94A3B8] py-1 resize-none"
                  style={{ maxHeight: 120 }}
                />
                <button className="p-1.5 rounded-lg hover:bg-[#E2E8F0] transition-colors shrink-0 mb-0.5 cursor-pointer">
                  <Mic className="w-4 h-4 text-[#94A3B8]" />
                </button>
                <button
                  onClick={handleSend}
                  disabled={!inputValue.trim() || isTyping}
                  className="p-2 rounded-xl text-white transition-all shrink-0 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{
                    background:
                      inputValue.trim() && !isTyping
                        ? "linear-gradient(135deg, #2563EB, #4F46E5)"
                        : "#94A3B8",
                  }}
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-[10px] text-[#CBD5E1] text-center mt-2.5">
                AI may produce inaccurate information. Verify important details before acting on
                them.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Typing animation keyframes */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(0.85); }
          50% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}