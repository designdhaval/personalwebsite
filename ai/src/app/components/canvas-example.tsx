import { useState, useEffect, useRef } from "react";
import {
  Sparkles,
  Upload,
  Download,
  ZoomIn,
  Copy,
  Check,
  Image as ImageIcon,
  Sliders,
  Clock,
  ChevronDown,
  Grid3X3,
  Maximize2,
  Heart,
  RotateCcw,
  X,
  Loader2,
  Plus,
} from "lucide-react";

/* ─── Generation data ─── */
interface Generation {
  id: string;
  prompt: string;
  images: { id: string; url: string; selected: boolean }[];
  timestamp: string;
  model: string;
  style: string;
}

const generationImages = [
  {
    id: "img-1",
    url: "https://images.unsplash.com/photo-1575335458385-85e6846f4382?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnB1bmslMjBjaXR5c2NhcGUlMjBuZW9uJTIwc3Vuc2V0fGVufDF8fHx8MTc3MzIyMDI2OXww&ixlib=rb-4.1.0&q=80&w=1080",
    selected: true,
  },
  {
    id: "img-2",
    url: "https://images.unsplash.com/photo-1715614176939-f5c46ae99d04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXR1cmlzdGljJTIwbmVvbiUyMGNpdHklMjBuaWdodHxlbnwxfHx8fDE3NzMxMzg0ODN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    selected: false,
  },
  {
    id: "img-3",
    url: "https://images.unsplash.com/photo-1706370888177-d1c4df0a8348?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZW9uJTIwbGlnaHRzJTIwdXJiYW4lMjBzdHJlZXQlMjByYWlufGVufDF8fHx8MTc3MzIyMDI3NHww&ixlib=rb-4.1.0&q=80&w=1080",
    selected: false,
  },
  {
    id: "img-4",
    url: "https://images.unsplash.com/photo-1692798200988-9894ae011ec4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2ktZmklMjBkaWdpdGFsJTIwYXJ0JTIwbGFuZHNjYXBlfGVufDF8fHx8MTc3MzIyMDI3NHww&ixlib=rb-4.1.0&q=80&w=1080",
    selected: false,
  },
];

const historyImages = [
  {
    id: "hist-1",
    url: "https://images.unsplash.com/photo-1713188090500-a4fb0d2cf309?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGRpZ2l0YWwlMjBhcnQlMjBjb2xvcmZ1bHxlbnwxfHx8fDE3NzMyMDc2NjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    selected: false,
  },
  {
    id: "hist-2",
    url: "https://images.unsplash.com/photo-1750688649553-f7919e59eeeb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW50YXN5JTIwbGFuZHNjYXBlJTIwbW91bnRhaW5zJTIwYXVyb3JhfGVufDF8fHx8MTc3MzIyMDI3NXww&ixlib=rb-4.1.0&q=80&w=1080",
    selected: false,
  },
  {
    id: "hist-3",
    url: "https://images.unsplash.com/photo-1705435443661-927632c3c9cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXR1cmlzdGljJTIwYXJjaGl0ZWN0dXJlJTIwbW9kZXJuJTIwYnVpbGRpbmd8ZW58MXx8fHwxNzczMTY5NTA3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    selected: false,
  },
  {
    id: "hist-4",
    url: "https://images.unsplash.com/photo-1767107114829-c3e92bf81b13?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxldGhlcmVhbCUyMGZvcmVzdCUyMG1pc3R5JTIwbWFnaWNhbHxlbnwxfHx8fDE3NzMyMjAyNzV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    selected: false,
  },
];

const pastGenerations: Generation[] = [
  {
    id: "gen-2",
    prompt: "Abstract fluid art, iridescent colors, flowing metallic shapes",
    images: historyImages.slice(0, 2),
    timestamp: "2 hours ago",
    model: "SDXL",
    style: "Abstract",
  },
  {
    id: "gen-3",
    prompt: "Enchanted forest at dawn, misty atmosphere, ethereal light",
    images: historyImages.slice(2, 4),
    timestamp: "Yesterday",
    model: "DALL-E 3",
    style: "Fantasy",
  },
];

/* ─── Dropdown component ─── */
function Dropdown({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <div className="text-[11px] text-[#64748B] mb-1.5 tracking-wide uppercase">{label}</div>
      <button
        onClick={() => setOpen(!open)}
        className="w-full h-9 rounded-lg bg-white border border-[#E2E8F0] px-3 flex items-center justify-between text-[13px] text-[#0F172A] hover:border-[#CBD5E1] transition-colors cursor-pointer"
      >
        <span>{value}</span>
        <ChevronDown className="w-3.5 h-3.5 text-[#94A3B8]" />
      </button>
      {open && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#E2E8F0] rounded-lg shadow-lg z-20 py-1">
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              className={`w-full px-3 py-2 text-left text-[13px] hover:bg-[#F1F5F9] transition-colors cursor-pointer ${
                opt === value ? "text-[#2563EB] bg-[#EFF6FF]" : "text-[#334155]"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Slider component ─── */
function SliderControl({
  label,
  value,
  min,
  max,
  onChange,
  suffix = "",
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
  suffix?: string;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[11px] text-[#64748B] tracking-wide uppercase">{label}</span>
        <span className="text-[12px] text-[#334155] tabular-nums">
          {value}
          {suffix}
        </span>
      </div>
      <div className="relative h-2 bg-[#E2E8F0] rounded-full overflow-hidden cursor-pointer group">
        <div
          className="absolute inset-y-0 left-0 bg-[#2563EB] rounded-full transition-all duration-150"
          style={{ width: `${pct}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border-2 border-[#2563EB] shadow-sm transition-all duration-150 group-hover:scale-110"
          style={{ left: `calc(${pct}% - 8px)` }}
        />
      </div>
    </div>
  );
}

/* ─── Main Canvas Example ─── */
export function CanvasExample() {
  const [prompt, setPrompt] = useState(
    "A futuristic cityscape at sunset, cyberpunk style, neon lights reflecting on wet streets, towering holographic billboards"
  );
  const [model, setModel] = useState("Stable Diffusion XL");
  const [style, setStyle] = useState("Cyberpunk");
  const [ratio, setRatio] = useState("1:1");
  const [quality, setQuality] = useState(85);
  const [variations, setVariations] = useState(4);
  const [selectedImage, setSelectedImage] = useState("img-1");
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeTab, setActiveTab] = useState<"controls" | "history">("controls");
  const [showUpload, setShowUpload] = useState(false);
  const [gridCols, setGridCols] = useState(2);
  const [liked, setLiked] = useState<Set<string>>(new Set());

  /* Simulate generation */
  function handleGenerate() {
    if (generating) return;
    setGenerating(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setGenerating(false);
          return 100;
        }
        return p + Math.random() * 12 + 3;
      });
    }, 200);
  }

  function toggleLike(id: string) {
    setLiked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <div
      className="w-full rounded-2xl border-2 border-[#333] bg-white overflow-hidden shadow-[5px_6px_0px_0px_#333]"
      style={{ height: 680 }}
    >
      {/* ── Top Bar: Prompt ── */}
      <div className="h-[60px] border-b border-[#E2E8F0] bg-[#FAFBFC] flex items-center px-5 gap-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#2563EB] to-[#7C3AED] flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-[13px] text-[#0F172A] hidden xl:block" style={{ fontFamily: "'Zilla Slab', serif" }}>
            AI Canvas
          </span>
        </div>

        <div className="flex-1 mx-3 relative">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe what you want to generate..."
            rows={1}
            className="w-full h-10 rounded-xl bg-white border border-[#E2E8F0] px-4 py-2.5 text-[13px] text-[#0F172A] placeholder:text-[#94A3B8] resize-none focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10 transition-all"
          />
        </div>

        <button
          onClick={handleGenerate}
          disabled={generating}
          className="h-10 px-5 rounded-xl text-[13px] text-white flex items-center gap-2 shrink-0 transition-all duration-200 hover:shadow-md disabled:opacity-70 cursor-pointer"
          style={{ background: generating ? "#64748B" : "linear-gradient(135deg, #2563EB, #4F46E5)" }}
        >
          {generating ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Generating...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-3.5 h-3.5" />
              <span>Generate</span>
            </>
          )}
        </button>
      </div>

      {/* ── Main Content ── */}
      <div className="flex" style={{ height: "calc(100% - 60px)" }}>
        {/* ── Left: Canvas Grid ── */}
        <div className="flex-1 flex flex-col bg-[#F8FAFC] overflow-hidden">
          {/* Canvas toolbar */}
          <div className="h-10 border-b border-[#E2E8F0] bg-white flex items-center justify-between px-4">
            <div className="flex items-center gap-1">
              <span className="text-[11px] text-[#94A3B8] mr-2">View</span>
              {[2, 3, 4].map((cols) => (
                <button
                  key={cols}
                  onClick={() => setGridCols(cols)}
                  className={`w-7 h-7 rounded-md flex items-center justify-center transition-all cursor-pointer ${
                    gridCols === cols
                      ? "bg-[#2563EB] text-white"
                      : "text-[#94A3B8] hover:bg-[#F1F5F9]"
                  }`}
                >
                  <span className="text-[11px]">{cols}x</span>
                </button>
              ))}
            </div>
            <div className="flex items-center gap-1.5">
              {selectedImage && (
                <>
                  <button className="h-7 px-2.5 rounded-md text-[11px] text-[#64748B] hover:bg-[#F1F5F9] flex items-center gap-1.5 transition-colors cursor-pointer">
                    <ZoomIn className="w-3.5 h-3.5" /> Upscale
                  </button>
                  <button className="h-7 px-2.5 rounded-md text-[11px] text-[#64748B] hover:bg-[#F1F5F9] flex items-center gap-1.5 transition-colors cursor-pointer">
                    <Copy className="w-3.5 h-3.5" /> Variations
                  </button>
                  <button className="h-7 px-2.5 rounded-md text-[11px] text-[#64748B] hover:bg-[#F1F5F9] flex items-center gap-1.5 transition-colors cursor-pointer">
                    <Download className="w-3.5 h-3.5" /> Download
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Generation progress */}
          {generating && (
            <div className="px-4 py-2 bg-[#EFF6FF] border-b border-[#BFDBFE]">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] text-[#2563EB]">Generating {variations} images...</span>
                <span className="text-[11px] text-[#2563EB] tabular-nums">{Math.min(Math.round(progress), 100)}%</span>
              </div>
              <div className="h-1.5 bg-[#BFDBFE] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#2563EB] rounded-full transition-all duration-200"
                  style={{ width: `${Math.min(progress, 100)}%` }}
                />
              </div>
            </div>
          )}

          {/* Image Grid */}
          <div className="flex-1 p-4 overflow-y-auto">
            <div
              className="grid gap-3"
              style={{ gridTemplateColumns: `repeat(${gridCols}, 1fr)` }}
            >
              {generationImages.map((img) => {
                const isSelected = selectedImage === img.id;
                const isHovered = hoveredImage === img.id;
                const isLiked = liked.has(img.id);

                return (
                  <div
                    key={img.id}
                    className="relative group rounded-xl overflow-hidden cursor-pointer transition-all duration-200"
                    style={{
                      border: isSelected ? "2px solid #2563EB" : "2px solid transparent",
                      boxShadow: isSelected
                        ? "0 0 0 3px rgba(37,99,235,0.15)"
                        : isHovered
                          ? "0 4px 16px rgba(0,0,0,0.1)"
                          : "none",
                    }}
                    onClick={() => setSelectedImage(img.id)}
                    onMouseEnter={() => setHoveredImage(img.id)}
                    onMouseLeave={() => setHoveredImage(null)}
                  >
                    <div className="aspect-square bg-[#E2E8F0]">
                      <img
                        src={img.url}
                        alt="AI generated"
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>

                    {/* Hover overlay with actions */}
                    <div
                      className="absolute inset-0 flex flex-col justify-between p-2.5 transition-opacity duration-200"
                      style={{
                        opacity: isHovered ? 1 : 0,
                        background: "linear-gradient(180deg, rgba(0,0,0,0.4) 0%, transparent 40%, transparent 60%, rgba(0,0,0,0.5) 100%)",
                      }}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex gap-1">
                          {isSelected && (
                            <div className="w-6 h-6 rounded-full bg-[#2563EB] flex items-center justify-center">
                              <Check className="w-3 h-3 text-white" />
                            </div>
                          )}
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleLike(img.id);
                          }}
                          className="w-7 h-7 rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition-colors cursor-pointer"
                        >
                          <Heart
                            className="w-3.5 h-3.5 transition-colors"
                            style={{
                              color: isLiked ? "#EF4444" : "#64748B",
                              fill: isLiked ? "#EF4444" : "none",
                            }}
                          />
                        </button>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={(e) => e.stopPropagation()}
                          className="flex-1 h-7 rounded-lg bg-white/90 backdrop-blur-sm flex items-center justify-center gap-1 text-[10px] text-[#334155] hover:bg-white transition-colors cursor-pointer"
                        >
                          <ZoomIn className="w-3 h-3" /> Upscale
                        </button>
                        <button
                          onClick={(e) => e.stopPropagation()}
                          className="flex-1 h-7 rounded-lg bg-white/90 backdrop-blur-sm flex items-center justify-center gap-1 text-[10px] text-[#334155] hover:bg-white transition-colors cursor-pointer"
                        >
                          <Copy className="w-3 h-3" /> Vary
                        </button>
                        <button
                          onClick={(e) => e.stopPropagation()}
                          className="w-7 h-7 rounded-lg bg-white/90 backdrop-blur-sm flex items-center justify-center text-[#334155] hover:bg-white transition-colors cursor-pointer"
                        >
                          <Download className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Right: Controls / History Panel ── */}
        <div className="w-[280px] border-l border-[#E2E8F0] bg-white flex flex-col overflow-hidden">
          {/* Panel tabs */}
          <div className="h-10 border-b border-[#E2E8F0] flex">
            <button
              onClick={() => setActiveTab("controls")}
              className={`flex-1 flex items-center justify-center gap-1.5 text-[11px] tracking-wide uppercase transition-colors cursor-pointer ${
                activeTab === "controls"
                  ? "text-[#2563EB] border-b-2 border-[#2563EB] bg-[#EFF6FF]/40"
                  : "text-[#94A3B8] hover:text-[#64748B]"
              }`}
            >
              <Sliders className="w-3.5 h-3.5" /> Controls
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`flex-1 flex items-center justify-center gap-1.5 text-[11px] tracking-wide uppercase transition-colors cursor-pointer ${
                activeTab === "history"
                  ? "text-[#2563EB] border-b-2 border-[#2563EB] bg-[#EFF6FF]/40"
                  : "text-[#94A3B8] hover:text-[#64748B]"
              }`}
            >
              <Clock className="w-3.5 h-3.5" /> History
            </button>
          </div>

          {/* Panel content */}
          <div className="flex-1 overflow-y-auto">
            {activeTab === "controls" ? (
              <div className="p-4 flex flex-col gap-5">
                {/* Model */}
                <Dropdown
                  label="Model"
                  value={model}
                  options={["Stable Diffusion XL", "DALL-E 3", "Midjourney v6", "Flux Pro"]}
                  onChange={setModel}
                />

                {/* Style */}
                <Dropdown
                  label="Style Preset"
                  value={style}
                  options={[
                    "Cyberpunk",
                    "Photorealistic",
                    "Anime",
                    "Oil Painting",
                    "Watercolor",
                    "3D Render",
                    "Pixel Art",
                    "Minimalist",
                  ]}
                  onChange={setStyle}
                />

                {/* Aspect Ratio */}
                <div>
                  <div className="text-[11px] text-[#64748B] mb-1.5 tracking-wide uppercase">
                    Aspect Ratio
                  </div>
                  <div className="grid grid-cols-4 gap-1.5">
                    {["1:1", "16:9", "9:16", "4:3"].map((r) => (
                      <button
                        key={r}
                        onClick={() => setRatio(r)}
                        className={`h-8 rounded-lg text-[12px] transition-all cursor-pointer ${
                          ratio === r
                            ? "bg-[#2563EB] text-white shadow-sm"
                            : "bg-[#F1F5F9] text-[#64748B] hover:bg-[#E2E8F0]"
                        }`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quality */}
                <SliderControl
                  label="Quality"
                  value={quality}
                  min={10}
                  max={100}
                  onChange={setQuality}
                  suffix="%"
                />

                {/* Variations */}
                <SliderControl
                  label="Variations"
                  value={variations}
                  min={1}
                  max={8}
                  onChange={setVariations}
                />

                {/* Divider */}
                <div className="h-px bg-[#E2E8F0]" />

                {/* Reference Upload */}
                <div>
                  <div className="text-[11px] text-[#64748B] mb-1.5 tracking-wide uppercase">
                    Reference Image
                  </div>
                  {showUpload ? (
                    <div className="relative rounded-xl border-2 border-dashed border-[#CBD5E1] bg-[#F8FAFC] p-4">
                      <button
                        onClick={() => setShowUpload(false)}
                        className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#E2E8F0] flex items-center justify-center hover:bg-[#CBD5E1] transition-colors cursor-pointer"
                      >
                        <X className="w-3 h-3 text-[#64748B]" />
                      </button>
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-[#EFF6FF] flex items-center justify-center">
                          <Upload className="w-4 h-4 text-[#2563EB]" />
                        </div>
                        <span className="text-[12px] text-[#64748B] text-center">
                          Drop an image here or click to browse
                        </span>
                        <span className="text-[10px] text-[#94A3B8]">PNG, JPG up to 10MB</span>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => setShowUpload(true)}
                      className="w-full h-10 rounded-xl border border-dashed border-[#CBD5E1] flex items-center justify-center gap-2 text-[12px] text-[#64748B] hover:border-[#2563EB] hover:text-[#2563EB] hover:bg-[#EFF6FF] transition-all cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Reference
                    </button>
                  )}
                </div>

                {/* Negative prompt */}
                <div>
                  <div className="text-[11px] text-[#64748B] mb-1.5 tracking-wide uppercase">
                    Negative Prompt
                  </div>
                  <textarea
                    rows={2}
                    placeholder="blurry, low quality, distorted..."
                    className="w-full rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] px-3 py-2 text-[12px] text-[#334155] placeholder:text-[#94A3B8] resize-none focus:outline-none focus:border-[#2563EB] transition-colors"
                    defaultValue="blurry, low quality, text, watermark, distorted faces"
                  />
                </div>
              </div>
            ) : (
              /* History tab */
              <div className="p-4 flex flex-col gap-4">
                {/* Current generation */}
                <div className="rounded-xl border border-[#2563EB] bg-[#EFF6FF] p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#2563EB] animate-pulse" />
                    <span className="text-[11px] text-[#2563EB] uppercase tracking-wide">
                      Current
                    </span>
                    <span className="text-[10px] text-[#64748B] ml-auto">Just now</span>
                  </div>
                  <p className="text-[12px] text-[#334155] leading-[1.5] mb-2.5 line-clamp-2">
                    {prompt}
                  </p>
                  <div className="grid grid-cols-4 gap-1.5">
                    {generationImages.map((img) => (
                      <div
                        key={img.id}
                        className="aspect-square rounded-md overflow-hidden border border-[#CBD5E1]"
                      >
                        <img src={img.url} alt="" className="w-full h-full object-cover" loading="lazy" />
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 mt-2.5">
                    <span className="text-[10px] text-[#64748B] px-1.5 py-0.5 rounded bg-white border border-[#E2E8F0]">
                      {model.split(" ").pop()}
                    </span>
                    <span className="text-[10px] text-[#64748B] px-1.5 py-0.5 rounded bg-white border border-[#E2E8F0]">
                      {style}
                    </span>
                  </div>
                </div>

                {/* Past generations */}
                {pastGenerations.map((gen) => (
                  <div
                    key={gen.id}
                    className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-3 hover:border-[#CBD5E1] transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-3 h-3 text-[#94A3B8]" />
                      <span className="text-[10px] text-[#94A3B8]">{gen.timestamp}</span>
                    </div>
                    <p className="text-[12px] text-[#334155] leading-[1.5] mb-2.5 line-clamp-2">
                      {gen.prompt}
                    </p>
                    <div className="grid grid-cols-4 gap-1.5">
                      {gen.images.map((img) => (
                        <div
                          key={img.id}
                          className="aspect-square rounded-md overflow-hidden border border-[#E2E8F0]"
                        >
                          <img src={img.url} alt="" className="w-full h-full object-cover" loading="lazy" />
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 mt-2.5">
                      <span className="text-[10px] text-[#94A3B8] px-1.5 py-0.5 rounded bg-white border border-[#E2E8F0]">
                        {gen.model}
                      </span>
                      <span className="text-[10px] text-[#94A3B8] px-1.5 py-0.5 rounded bg-white border border-[#E2E8F0]">
                        {gen.style}
                      </span>
                      <button className="ml-auto text-[10px] text-[#2563EB] hover:underline cursor-pointer">
                        Remix
                      </button>
                    </div>
                  </div>
                ))}

                <button className="w-full h-9 rounded-lg border border-[#E2E8F0] flex items-center justify-center gap-1.5 text-[12px] text-[#64748B] hover:bg-[#F1F5F9] transition-colors cursor-pointer">
                  <RotateCcw className="w-3 h-3" /> Load More
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}