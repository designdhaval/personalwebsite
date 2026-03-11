import { useState, useEffect, useRef } from "react";
import {
  Sparkles,
  Type,
  Sliders,
  Palette,
  RectangleHorizontal,
  Gauge,
  ChevronDown,
  History,
  Download,
  Share2,
  Save,
  RotateCcw,
  Clock,
  Check,
  Copy,
  Eye,
  Code,
  Monitor,
  Smartphone,
  Tablet,
  Loader2,
  Wand2,
  Zap,
  Sun,
  Moon,
} from "lucide-react";

/* ─── Types ─── */
interface PromptHistoryItem {
  id: string;
  prompt: string;
  time: string;
  model: string;
}

/* ─── Preview Templates ─── */
function generatePreview(
  prompt: string,
  style: string,
  model: string,
  quality: number,
  theme: string
) {
  const lp = prompt.toLowerCase();

  // Default preview content based on detected keywords
  const isCard = lp.includes("card") || lp.includes("profile") || lp.includes("user");
  const isPricing = lp.includes("pricing") || lp.includes("plan") || lp.includes("subscription");
  const isDashboard = lp.includes("dashboard") || lp.includes("analytics") || lp.includes("chart");
  const isLanding = lp.includes("landing") || lp.includes("hero") || lp.includes("page");
  const isLogin = lp.includes("login") || lp.includes("sign") || lp.includes("auth");
  const isNav = lp.includes("nav") || lp.includes("header") || lp.includes("menu");

  if (isPricing) return "pricing";
  if (isDashboard) return "dashboard";
  if (isLanding) return "landing";
  if (isLogin) return "login";
  if (isNav) return "navbar";
  if (isCard) return "card";
  return "card"; // default
}

/* ─── Sub-components for preview rendering ─── */
function PreviewCard({ style, theme }: { style: string; theme: string }) {
  const isDark = theme === "dark";
  const bg = isDark ? "#1E293B" : "#FFFFFF";
  const fg = isDark ? "#F1F5F9" : "#0F172A";
  const muted = isDark ? "#94A3B8" : "#64748B";
  const border = isDark ? "#334155" : "#E2E8F0";
  const accent = style === "Minimal" ? "#0F172A" : style === "Vibrant" ? "#8B5CF6" : style === "Corporate" ? "#2563EB" : "#0F172A";

  return (
    <div className="flex items-center justify-center h-full p-8" style={{ background: isDark ? "#0F172A" : "#F8FAFC" }}>
      <div className="w-full max-w-[320px] rounded-2xl overflow-hidden" style={{ background: bg, border: `1px solid ${border}`, boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
        <div className="h-24 relative" style={{ background: `linear-gradient(135deg, ${accent}, ${accent}88)` }}>
          <div className="absolute -bottom-8 left-6 w-16 h-16 rounded-full border-4 flex items-center justify-center" style={{ background: bg, borderColor: bg }}>
            <span className="text-[20px]" style={{ color: accent, fontWeight: 700 }}>JD</span>
          </div>
        </div>
        <div className="px-6 pt-12 pb-6">
          <h3 className="text-[17px] mb-1" style={{ color: fg, fontWeight: 600 }}>Jane Doe</h3>
          <p className="text-[13px] mb-4" style={{ color: muted }}>Senior Product Designer</p>
          <div className="flex gap-3 mb-5">
            {[
              { label: "Projects", value: "47" },
              { label: "Following", value: "1.2k" },
              { label: "Followers", value: "3.8k" },
            ].map((s) => (
              <div key={s.label} className="flex-1 text-center py-2.5 rounded-xl" style={{ background: isDark ? "#0F172A" : "#F8FAFC" }}>
                <div className="text-[15px]" style={{ color: fg, fontWeight: 600 }}>{s.value}</div>
                <div className="text-[10px] mt-0.5" style={{ color: muted }}>{s.label}</div>
              </div>
            ))}
          </div>
          <button className="w-full py-2.5 rounded-xl text-[13px] text-white transition-colors" style={{ background: accent, fontWeight: 500 }}>
            Follow
          </button>
        </div>
      </div>
    </div>
  );
}

function PreviewPricing({ style, theme }: { style: string; theme: string }) {
  const isDark = theme === "dark";
  const bg = isDark ? "#1E293B" : "#FFFFFF";
  const fg = isDark ? "#F1F5F9" : "#0F172A";
  const muted = isDark ? "#94A3B8" : "#64748B";
  const border = isDark ? "#334155" : "#E2E8F0";
  const accent = style === "Vibrant" ? "#8B5CF6" : style === "Corporate" ? "#2563EB" : "#0F172A";

  const plans = [
    { name: "Starter", price: "$9", features: ["5 projects", "1GB storage", "Email support"], highlighted: false },
    { name: "Pro", price: "$29", features: ["Unlimited projects", "10GB storage", "Priority support", "API access"], highlighted: true },
    { name: "Team", price: "$79", features: ["Everything in Pro", "50GB storage", "SSO", "Custom roles"], highlighted: false },
  ];

  return (
    <div className="flex items-center justify-center h-full p-6" style={{ background: isDark ? "#0F172A" : "#F8FAFC" }}>
      <div className="flex gap-3 w-full max-w-[580px]">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className="flex-1 rounded-xl p-4 flex flex-col"
            style={{
              background: plan.highlighted ? accent : bg,
              border: `1px solid ${plan.highlighted ? accent : border}`,
              transform: plan.highlighted ? "scale(1.04)" : "scale(1)",
            }}
          >
            <div className="text-[11px] mb-1" style={{ color: plan.highlighted ? "rgba(255,255,255,0.7)" : muted }}>{plan.name}</div>
            <div className="text-[26px] mb-3" style={{ color: plan.highlighted ? "#fff" : fg, fontWeight: 700 }}>
              {plan.price}<span className="text-[12px]" style={{ fontWeight: 400 }}>/mo</span>
            </div>
            <div className="flex flex-col gap-1.5 mb-4 flex-1">
              {plan.features.map((f) => (
                <div key={f} className="flex items-center gap-1.5">
                  <Check className="w-3 h-3 shrink-0" style={{ color: plan.highlighted ? "rgba(255,255,255,0.8)" : accent }} />
                  <span className="text-[11px]" style={{ color: plan.highlighted ? "rgba(255,255,255,0.85)" : muted }}>{f}</span>
                </div>
              ))}
            </div>
            <button
              className="w-full py-2 rounded-lg text-[11px] transition-colors"
              style={{
                background: plan.highlighted ? "#fff" : "transparent",
                color: plan.highlighted ? accent : fg,
                border: plan.highlighted ? "none" : `1px solid ${border}`,
                fontWeight: 500,
              }}
            >
              Get started
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function PreviewDashboard({ style, theme }: { style: string; theme: string }) {
  const isDark = theme === "dark";
  const fg = isDark ? "#F1F5F9" : "#0F172A";
  const muted = isDark ? "#94A3B8" : "#64748B";
  const border = isDark ? "#334155" : "#E2E8F0";
  const cardBg = isDark ? "#1E293B" : "#FFFFFF";
  const accent = style === "Vibrant" ? "#8B5CF6" : style === "Corporate" ? "#2563EB" : "#0F172A";

  const stats = [
    { label: "Revenue", value: "$48.2k", change: "+12.5%" },
    { label: "Users", value: "2,847", change: "+8.3%" },
    { label: "Orders", value: "1,234", change: "+23.1%" },
  ];

  const barHeights = [40, 65, 50, 80, 60, 90, 75, 55, 85, 70, 95, 60];

  return (
    <div className="flex flex-col h-full p-5 gap-3" style={{ background: isDark ? "#0F172A" : "#F8FAFC" }}>
      <div className="grid grid-cols-3 gap-3">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl p-3.5" style={{ background: cardBg, border: `1px solid ${border}` }}>
            <div className="text-[10px] mb-1" style={{ color: muted }}>{s.label}</div>
            <div className="flex items-end gap-2">
              <span className="text-[20px]" style={{ color: fg, fontWeight: 700 }}>{s.value}</span>
              <span className="text-[10px] pb-0.5" style={{ color: "#22C55E", fontWeight: 500 }}>{s.change}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="flex-1 rounded-xl p-4" style={{ background: cardBg, border: `1px solid ${border}` }}>
        <div className="text-[12px] mb-3" style={{ color: fg, fontWeight: 600 }}>Monthly Revenue</div>
        <div className="flex items-end gap-1.5 h-[calc(100%-28px)]">
          {barHeights.map((h, i) => (
            <div key={i} className="flex-1 rounded-t-md transition-all" style={{ height: `${h}%`, background: i === barHeights.length - 3 ? accent : `${accent}25` }} />
          ))}
        </div>
      </div>
    </div>
  );
}

function PreviewLanding({ style, theme }: { style: string; theme: string }) {
  const isDark = theme === "dark";
  const fg = isDark ? "#F1F5F9" : "#0F172A";
  const muted = isDark ? "#94A3B8" : "#64748B";
  const accent = style === "Vibrant" ? "#8B5CF6" : style === "Corporate" ? "#2563EB" : "#0F172A";

  return (
    <div className="flex flex-col h-full" style={{ background: isDark ? "#0F172A" : "#FFFFFF" }}>
      {/* Nav */}
      <div className="flex items-center justify-between px-6 py-3" style={{ borderBottom: `1px solid ${isDark ? "#334155" : "#E2E8F0"}` }}>
        <div className="flex items-center gap-1.5">
          <Zap className="w-4 h-4" style={{ color: accent }} />
          <span className="text-[13px]" style={{ color: fg, fontWeight: 600 }}>Acme</span>
        </div>
        <div className="flex items-center gap-4">
          {["Features", "Pricing", "Docs"].map((l) => (
            <span key={l} className="text-[11px]" style={{ color: muted }}>{l}</span>
          ))}
          <div className="px-3 py-1 rounded-lg text-[11px] text-white" style={{ background: accent }}>Sign up</div>
        </div>
      </div>
      {/* Hero */}
      <div className="flex-1 flex flex-col items-center justify-center text-center px-8">
        <div className="px-2.5 py-1 rounded-full mb-4 text-[10px]" style={{ background: `${accent}15`, color: accent }}>
          ✨ Now with AI
        </div>
        <h1 className="text-[28px] mb-3 max-w-[380px] leading-[1.15]" style={{ color: fg, fontWeight: 700 }}>
          Build faster with intelligent tools
        </h1>
        <p className="text-[12px] max-w-[320px] mb-6 leading-[1.6]" style={{ color: muted }}>
          The all-in-one platform for modern teams. Ship products 10x faster with AI-powered workflows.
        </p>
        <div className="flex gap-2">
          <button className="px-5 py-2 rounded-lg text-[12px] text-white" style={{ background: accent }}>Get started free</button>
          <button className="px-5 py-2 rounded-lg text-[12px]" style={{ color: fg, border: `1px solid ${isDark ? "#334155" : "#E2E8F0"}` }}>Watch demo</button>
        </div>
      </div>
    </div>
  );
}

function PreviewLogin({ style, theme }: { style: string; theme: string }) {
  const isDark = theme === "dark";
  const bg = isDark ? "#1E293B" : "#FFFFFF";
  const fg = isDark ? "#F1F5F9" : "#0F172A";
  const muted = isDark ? "#94A3B8" : "#64748B";
  const border = isDark ? "#334155" : "#E2E8F0";
  const accent = style === "Vibrant" ? "#8B5CF6" : style === "Corporate" ? "#2563EB" : "#0F172A";

  return (
    <div className="flex items-center justify-center h-full" style={{ background: isDark ? "#0F172A" : "#F8FAFC" }}>
      <div className="w-full max-w-[340px] rounded-2xl p-7" style={{ background: bg, border: `1px solid ${border}`, boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
        <div className="flex items-center justify-center gap-2 mb-6">
          <Zap className="w-5 h-5" style={{ color: accent }} />
          <span className="text-[16px]" style={{ color: fg, fontWeight: 700 }}>Acme</span>
        </div>
        <h2 className="text-[18px] text-center mb-1" style={{ color: fg, fontWeight: 600 }}>Welcome back</h2>
        <p className="text-[12px] text-center mb-6" style={{ color: muted }}>Sign in to your account</p>
        <div className="flex flex-col gap-3 mb-4">
          <div>
            <label className="text-[11px] mb-1 block" style={{ color: muted }}>Email</label>
            <div className="px-3 py-2 rounded-lg text-[12px]" style={{ border: `1px solid ${border}`, color: muted, background: isDark ? "#0F172A" : "#F8FAFC" }}>jane@example.com</div>
          </div>
          <div>
            <label className="text-[11px] mb-1 block" style={{ color: muted }}>Password</label>
            <div className="px-3 py-2 rounded-lg text-[12px]" style={{ border: `1px solid ${border}`, color: muted, background: isDark ? "#0F172A" : "#F8FAFC" }}>••••••••</div>
          </div>
        </div>
        <button className="w-full py-2.5 rounded-xl text-[13px] text-white mb-3" style={{ background: accent, fontWeight: 500 }}>Sign in</button>
        <p className="text-[11px] text-center" style={{ color: muted }}>Don't have an account? <span style={{ color: accent }}>Sign up</span></p>
      </div>
    </div>
  );
}

function PreviewNavbar({ style, theme }: { style: string; theme: string }) {
  const isDark = theme === "dark";
  const fg = isDark ? "#F1F5F9" : "#0F172A";
  const muted = isDark ? "#94A3B8" : "#64748B";
  const border = isDark ? "#334155" : "#E2E8F0";
  const accent = style === "Vibrant" ? "#8B5CF6" : style === "Corporate" ? "#2563EB" : "#0F172A";

  return (
    <div className="flex flex-col h-full" style={{ background: isDark ? "#0F172A" : "#F8FAFC" }}>
      <div className="flex items-center justify-between px-6 py-3.5" style={{ background: isDark ? "#1E293B" : "#FFFFFF", borderBottom: `1px solid ${border}` }}>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1.5">
            <Zap className="w-4 h-4" style={{ color: accent }} />
            <span className="text-[14px]" style={{ color: fg, fontWeight: 700 }}>Acme</span>
          </div>
          <div className="flex items-center gap-4">
            {["Dashboard", "Projects", "Analytics", "Settings"].map((l, i) => (
              <span key={l} className="text-[12px]" style={{ color: i === 0 ? fg : muted, fontWeight: i === 0 ? 500 : 400 }}>{l}</span>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 rounded-lg text-[11px]" style={{ border: `1px solid ${border}`, color: muted }}>Search...</div>
          <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: accent }}>
            <span className="text-[10px] text-white" style={{ fontWeight: 600 }}>JD</span>
          </div>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <p className="text-[13px]" style={{ color: muted }}>Page content area</p>
      </div>
    </div>
  );
}

/* ─── Main Live Preview Example ─── */
export function LivePreviewExample() {
  const [prompt, setPrompt] = useState("A modern user profile card with stats and follow button");
  const [model, setModel] = useState("GPT-4o");
  const [style, setStyle] = useState("Minimal");
  const [aspectRatio, setAspectRatio] = useState("16:9");
  const [quality, setQuality] = useState(80);
  const [theme, setTheme] = useState("light");
  const [isGenerating, setIsGenerating] = useState(false);
  const [previewType, setPreviewType] = useState("card");
  const [viewport, setViewport] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState<PromptHistoryItem[]>([
    { id: "h1", prompt: "A modern user profile card with stats and follow button", time: "2 min ago", model: "GPT-4o" },
    { id: "h2", prompt: "Pricing table with three tiers", time: "15 min ago", model: "GPT-4o" },
    { id: "h3", prompt: "Dashboard with analytics charts", time: "1 hour ago", model: "Claude 3.5" },
  ]);
  const [showHistory, setShowHistory] = useState(false);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Live preview update on prompt change
  useEffect(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      setIsGenerating(true);
      const type = generatePreview(prompt, style, model, quality, theme);
      setTimeout(() => {
        setPreviewType(type);
        setIsGenerating(false);
      }, 400 + Math.random() * 300);
    }, 500);

    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, [prompt, style, model, quality, theme]);

  function handleGenerate() {
    setIsGenerating(true);
    const type = generatePreview(prompt, style, model, quality, theme);
    const newEntry: PromptHistoryItem = {
      id: `h-${Date.now()}`,
      prompt: prompt.trim(),
      time: "Just now",
      model,
    };
    setHistory((prev) => [newEntry, ...prev.slice(0, 9)]);

    setTimeout(() => {
      setPreviewType(type);
      setIsGenerating(false);
    }, 800 + Math.random() * 500);
  }

  function handleCopy() {
    navigator.clipboard.writeText(`// Generated component\n// Prompt: "${prompt}"\n// Model: ${model} | Style: ${style}\n// Quality: ${quality}%`).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleHistorySelect(item: PromptHistoryItem) {
    setPrompt(item.prompt);
    setModel(item.model);
    setShowHistory(false);
  }

  const viewportWidth = viewport === "desktop" ? "100%" : viewport === "tablet" ? "768px" : "375px";

  /* ─── Preview Render ─── */
  function renderPreview() {
    const props = { style, theme };
    switch (previewType) {
      case "pricing": return <PreviewPricing {...props} />;
      case "dashboard": return <PreviewDashboard {...props} />;
      case "landing": return <PreviewLanding {...props} />;
      case "login": return <PreviewLogin {...props} />;
      case "navbar": return <PreviewNavbar {...props} />;
      default: return <PreviewCard {...props} />;
    }
  }

  return (
    <div
      className="w-full rounded-2xl border-2 border-[#333] bg-white overflow-hidden shadow-[5px_6px_0px_0px_#333]"
      style={{ height: 640 }}
    >
      <div className="flex h-full">
        {/* ═══ Left Panel: Prompt + Controls ═══ */}
        <div className="w-[380px] min-w-[380px] border-r border-[#E2E8F0] flex flex-col bg-white">
          {/* Panel Header */}
          <div className="px-5 py-3.5 border-b border-[#E2E8F0] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-[#2563EB]/10 to-[#7C3AED]/10 flex items-center justify-center">
                <Wand2 className="w-3.5 h-3.5 text-[#2563EB]" />
              </div>
              <span className="text-[14px] text-[#0F172A]" style={{ fontWeight: 500 }}>Configure</span>
            </div>
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] text-[#64748B] hover:bg-[#F1F5F9] transition-colors cursor-pointer"
            >
              <History className="w-3.5 h-3.5" />
              History
            </button>
          </div>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto">
            {showHistory ? (
              /* ─── History Panel ─── */
              <div className="p-4">
                <div className="text-[11px] text-[#94A3B8] tracking-[0.08em] uppercase mb-3">Prompt History</div>
                <div className="flex flex-col gap-1.5">
                  {history.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleHistorySelect(item)}
                      className="w-full text-left p-3 rounded-xl border border-[#E2E8F0] hover:border-[#CBD5E1] hover:shadow-sm transition-all cursor-pointer bg-white"
                    >
                      <div className="text-[13px] text-[#0F172A] line-clamp-2 leading-[1.5] mb-1.5">{item.prompt}</div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-3 h-3 text-[#CBD5E1]" />
                        <span className="text-[10px] text-[#94A3B8]">{item.time}</span>
                        <span className="text-[10px] text-[#CBD5E1]">·</span>
                        <span className="text-[10px] text-[#94A3B8]">{item.model}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              /* ─── Main Config ─── */
              <div className="p-5 flex flex-col gap-5">
                {/* Prompt Input */}
                <div>
                  <label className="flex items-center gap-1.5 text-[12px] text-[#64748B] mb-2">
                    <Type className="w-3.5 h-3.5" />
                    Prompt
                  </label>
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe the UI component you want to generate..."
                    rows={4}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-[13px] text-[#0F172A] placeholder:text-[#94A3B8] outline-none resize-none focus:border-[#2563EB] focus:shadow-[0_0_0_3px_rgba(37,99,235,0.08)] transition-all leading-[1.65]"
                  />
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-[10px] text-[#CBD5E1]">{prompt.length} characters</span>
                    <div className="flex items-center gap-1">
                      {isGenerating && (
                        <span className="flex items-center gap-1 text-[10px] text-[#2563EB]">
                          <Loader2 className="w-3 h-3 animate-spin" />
                          Updating preview...
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Generate Button */}
                <button
                  onClick={handleGenerate}
                  disabled={!prompt.trim() || isGenerating}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-white text-[13px] transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    background: "linear-gradient(135deg, #2563EB, #4F46E5)",
                    fontWeight: 500,
                  }}
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5" />
                      Generate
                    </>
                  )}
                </button>

                {/* Divider */}
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-px bg-[#E2E8F0]" />
                  <span className="text-[10px] text-[#CBD5E1] tracking-[0.1em] uppercase">Parameters</span>
                  <div className="flex-1 h-px bg-[#E2E8F0]" />
                </div>

                {/* Model Selection */}
                <div>
                  <label className="flex items-center gap-1.5 text-[12px] text-[#64748B] mb-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    Model
                  </label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {["GPT-4o", "Claude 3.5", "Gemini"].map((m) => (
                      <button
                        key={m}
                        onClick={() => setModel(m)}
                        className="py-2 rounded-lg text-[12px] transition-all cursor-pointer"
                        style={{
                          background: model === m ? "#0F172A" : "#F8FAFC",
                          color: model === m ? "#fff" : "#64748B",
                          border: `1px solid ${model === m ? "#0F172A" : "#E2E8F0"}`,
                          fontWeight: model === m ? 500 : 400,
                        }}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Style Dropdown */}
                <div>
                  <label className="flex items-center gap-1.5 text-[12px] text-[#64748B] mb-2">
                    <Palette className="w-3.5 h-3.5" />
                    Style
                  </label>
                  <div className="relative">
                    <select
                      value={style}
                      onChange={(e) => setStyle(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-[13px] text-[#0F172A] outline-none appearance-none cursor-pointer focus:border-[#2563EB] transition-colors"
                    >
                      <option>Minimal</option>
                      <option>Vibrant</option>
                      <option>Corporate</option>
                      <option>Playful</option>
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 text-[#94A3B8] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* Aspect Ratio */}
                <div>
                  <label className="flex items-center gap-1.5 text-[12px] text-[#64748B] mb-2">
                    <RectangleHorizontal className="w-3.5 h-3.5" />
                    Aspect Ratio
                  </label>
                  <div className="grid grid-cols-4 gap-1.5">
                    {["16:9", "4:3", "1:1", "9:16"].map((r) => (
                      <button
                        key={r}
                        onClick={() => setAspectRatio(r)}
                        className="py-2 rounded-lg text-[12px] transition-all cursor-pointer"
                        style={{
                          background: aspectRatio === r ? "#0F172A" : "#F8FAFC",
                          color: aspectRatio === r ? "#fff" : "#64748B",
                          border: `1px solid ${aspectRatio === r ? "#0F172A" : "#E2E8F0"}`,
                          fontWeight: aspectRatio === r ? 500 : 400,
                        }}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quality Slider */}
                <div>
                  <label className="flex items-center justify-between text-[12px] text-[#64748B] mb-2">
                    <span className="flex items-center gap-1.5">
                      <Gauge className="w-3.5 h-3.5" />
                      Quality
                    </span>
                    <span className="text-[#0F172A] tabular-nums" style={{ fontWeight: 500 }}>{quality}%</span>
                  </label>
                  <input
                    type="range"
                    min={10}
                    max={100}
                    value={quality}
                    onChange={(e) => setQuality(Number(e.target.value))}
                    className="w-full accent-[#2563EB] cursor-pointer"
                    style={{ height: 4 }}
                  />
                  <div className="flex justify-between text-[10px] text-[#CBD5E1] mt-1">
                    <span>Draft</span>
                    <span>Production</span>
                  </div>
                </div>

                {/* Theme Toggle */}
                <div>
                  <label className="flex items-center gap-1.5 text-[12px] text-[#64748B] mb-2">
                    {theme === "light" ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
                    Theme
                  </label>
                  <div className="grid grid-cols-2 gap-1.5">
                    {(["light", "dark"] as const).map((t) => (
                      <button
                        key={t}
                        onClick={() => setTheme(t)}
                        className="flex items-center justify-center gap-1.5 py-2 rounded-lg text-[12px] transition-all cursor-pointer capitalize"
                        style={{
                          background: theme === t ? "#0F172A" : "#F8FAFC",
                          color: theme === t ? "#fff" : "#64748B",
                          border: `1px solid ${theme === t ? "#0F172A" : "#E2E8F0"}`,
                          fontWeight: theme === t ? 500 : 400,
                        }}
                      >
                        {t === "light" ? <Sun className="w-3 h-3" /> : <Moon className="w-3 h-3" />}
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ═══ Right Panel: Live Preview ═══ */}
        <div className="flex-1 flex flex-col min-w-0 bg-[#F8FAFC]">
          {/* Preview Header */}
          <div className="px-5 py-3 border-b border-[#E2E8F0] flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              {/* Viewport controls */}
              <div className="flex items-center gap-0.5 p-0.5 rounded-lg bg-[#F1F5F9]">
                {([
                  { key: "desktop" as const, icon: <Monitor className="w-3.5 h-3.5" /> },
                  { key: "tablet" as const, icon: <Tablet className="w-3.5 h-3.5" /> },
                  { key: "mobile" as const, icon: <Smartphone className="w-3.5 h-3.5" /> },
                ]).map((v) => (
                  <button
                    key={v.key}
                    onClick={() => setViewport(v.key)}
                    className="p-1.5 rounded-md transition-all cursor-pointer"
                    style={{
                      background: viewport === v.key ? "#fff" : "transparent",
                      color: viewport === v.key ? "#0F172A" : "#94A3B8",
                      boxShadow: viewport === v.key ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
                    }}
                  >
                    {v.icon}
                  </button>
                ))}
              </div>

              {/* View toggle */}
              <div className="flex items-center gap-0.5 p-0.5 rounded-lg bg-[#F1F5F9] ml-2">
                <button
                  onClick={() => setShowCode(false)}
                  className="flex items-center gap-1 px-2 py-1.5 rounded-md text-[11px] transition-all cursor-pointer"
                  style={{
                    background: !showCode ? "#fff" : "transparent",
                    color: !showCode ? "#0F172A" : "#94A3B8",
                    boxShadow: !showCode ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
                    fontWeight: !showCode ? 500 : 400,
                  }}
                >
                  <Eye className="w-3 h-3" />
                  Preview
                </button>
                <button
                  onClick={() => setShowCode(true)}
                  className="flex items-center gap-1 px-2 py-1.5 rounded-md text-[11px] transition-all cursor-pointer"
                  style={{
                    background: showCode ? "#fff" : "transparent",
                    color: showCode ? "#0F172A" : "#94A3B8",
                    boxShadow: showCode ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
                    fontWeight: showCode ? 500 : 400,
                  }}
                >
                  <Code className="w-3 h-3" />
                  Code
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1">
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] text-[#64748B] hover:bg-[#F1F5F9] transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3 h-3 text-[#22C55E]" /> : <Copy className="w-3 h-3" />}
                {copied ? "Copied" : "Copy"}
              </button>
              <button className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] text-[#64748B] hover:bg-[#F1F5F9] transition-colors cursor-pointer">
                <Download className="w-3 h-3" />
                Export
              </button>
              <button className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] text-[#64748B] hover:bg-[#F1F5F9] transition-colors cursor-pointer">
                <Share2 className="w-3 h-3" />
                Share
              </button>
            </div>
          </div>

          {/* Preview Area */}
          <div className="flex-1 flex items-center justify-center p-6 overflow-hidden">
            <div
              className="h-full rounded-xl border border-[#E2E8F0] overflow-hidden transition-all duration-300 relative"
              style={{
                width: viewportWidth,
                maxWidth: "100%",
                boxShadow: "0 4px 24px rgba(0,0,0,0.04)",
                background: theme === "dark" ? "#0F172A" : "#FFFFFF",
              }}
            >
              {/* Loading overlay */}
              {isGenerating && (
                <div className="absolute inset-0 z-10 flex items-center justify-center" style={{ background: "rgba(255,255,255,0.7)", backdropFilter: "blur(4px)" }}>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#E2E8F0] shadow-sm">
                    <Loader2 className="w-3.5 h-3.5 text-[#2563EB] animate-spin" />
                    <span className="text-[12px] text-[#64748B]">Generating preview...</span>
                  </div>
                </div>
              )}

              {showCode ? (
                /* Code View */
                <div className="h-full bg-[#0F172A] p-5 overflow-auto">
                  <pre className="text-[12px] leading-[1.8] text-[#E2E8F0]">
                    <code>{`// Generated Component
// Model: ${model} | Style: ${style}
// Quality: ${quality}% | Theme: ${theme}

import React from "react";

export function GeneratedComponent() {
  return (
    <div className="component-wrapper">
      {/* Prompt: "${prompt.slice(0, 60)}${prompt.length > 60 ? "..." : ""}" */}
      <div className="container">
        <h2>Generated UI</h2>
        <p>
          This component was generated based
          on your prompt configuration.
        </p>
        {/* Component markup here */}
      </div>
    </div>
  );
}`}</code>
                  </pre>
                </div>
              ) : (
                /* Visual Preview */
                renderPreview()
              )}
            </div>
          </div>

          {/* Preview Footer / Action Bar */}
          <div className="px-5 py-3 border-t border-[#E2E8F0] flex items-center justify-between bg-white">
            <div className="flex items-center gap-3">
              <span className="text-[11px] text-[#CBD5E1]">
                Preview: <span className="text-[#64748B]">{previewType.charAt(0).toUpperCase() + previewType.slice(1)}</span>
              </span>
              <span className="text-[11px] text-[#CBD5E1]">·</span>
              <span className="text-[11px] text-[#CBD5E1]">
                {model} <span className="text-[#CBD5E1]">·</span> {style} <span className="text-[#CBD5E1]">·</span> {quality}%
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] text-[#64748B] border border-[#E2E8F0] hover:bg-[#F1F5F9] transition-colors cursor-pointer">
                <RotateCcw className="w-3 h-3" />
                Reset
              </button>
              <button
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-[11px] text-white transition-colors cursor-pointer"
                style={{ background: "#0F172A", fontWeight: 500 }}
              >
                <Save className="w-3 h-3" />
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
