import { useState, useRef } from "react";
import { wireframeMap } from "./wireframes";
import { ChevronDown } from "lucide-react";

/* ─── Types ─── */

interface ZonePosition {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface ZoneData {
  label: string;
  name: string;
  description: string;
}

/* ─── Zone colors (consistent per zone slot) ─── */
const zoneColors = [
  { fill: "#2563EB", bg: "rgba(37,99,235,0.10)", border: "rgba(37,99,235,0.45)", text: "#2563EB", light: "#EFF6FF" },
  { fill: "#7C3AED", bg: "rgba(124,58,237,0.10)", border: "rgba(124,58,237,0.45)", text: "#7C3AED", light: "#F5F3FF" },
  { fill: "#06B6D4", bg: "rgba(6,182,212,0.10)", border: "rgba(6,182,212,0.45)", text: "#0891B2", light: "#ECFEFF" },
  { fill: "#F59E0B", bg: "rgba(245,158,11,0.10)", border: "rgba(245,158,11,0.45)", text: "#D97706", light: "#FFFBEB" },
  { fill: "#10B981", bg: "rgba(16,185,129,0.10)", border: "rgba(16,185,129,0.45)", text: "#059669", light: "#ECFDF5" },
];

/* ─── Zone position data per pattern ─── */
// Each defines the approximate bounding boxes for zones within a 200x150 SVG viewBox

const zonePositions: Record<string, ZonePosition[]> = {
  "conversational-chat": [
    { x: 0, y: 0, w: 48, h: 150 },
    { x: 56, y: 8, w: 138, h: 116 },
    { x: 56, y: 128, w: 138, h: 18 },
  ],
  "prompt-canvas": [
    { x: 8, y: 8, w: 184, h: 24 },
    { x: 8, y: 36, w: 184, h: 110 },
    { x: 166, y: 12, w: 22, h: 14 },
  ],
  "prompt-live-preview": [
    { x: 0, y: 0, w: 80, h: 150 },
    { x: 88, y: 8, w: 104, h: 134 },
    { x: 8, y: 84, w: 64, h: 60 },
  ],
  "studio-timeline": [
    { x: 8, y: 8, w: 184, h: 88 },
    { x: 8, y: 104, w: 184, h: 38 },
    { x: 70, y: 35, w: 60, h: 34 },
  ],
  "voice-studio": [
    { x: 8, y: 8, w: 184, h: 80 },
    { x: 8, y: 96, w: 184, h: 46 },
    { x: 70, y: 108, w: 60, h: 30 },
  ],
  "music-composer": [
    { x: 0, y: 0, w: 200, h: 20 },
    { x: 0, y: 20, w: 40, h: 130 },
    { x: 44, y: 22, w: 152, h: 128 },
  ],
  "node-workflow": [
    { x: 8, y: 16, w: 50, h: 110 },
    { x: 74, y: 46, w: 52, h: 42 },
    { x: 140, y: 30, w: 52, h: 90 },
  ],
  "copilot": [
    { x: 0, y: 0, w: 200, h: 150 },
    { x: 110, y: 40, w: 82, h: 80 },
    { x: 118, y: 86, w: 66, h: 28 },
  ],
  "command-palette": [
    { x: 0, y: 0, w: 200, h: 150 },
    { x: 38, y: 28, w: 124, h: 20 },
    { x: 38, y: 52, w: 124, h: 72 },
  ],
  "inspector": [
    { x: 0, y: 0, w: 130, h: 150 },
    { x: 130, y: 0, w: 70, h: 150 },
    { x: 138, y: 26, w: 54, h: 92 },
  ],
  "playground": [
    { x: 0, y: 0, w: 200, h: 20 },
    { x: 8, y: 28, w: 184, h: 80 },
    { x: 8, y: 116, w: 184, h: 28 },
  ],
  "agent-dashboard": [
    { x: 0, y: 0, w: 40, h: 150 },
    { x: 48, y: 8, w: 146, h: 40 },
    { x: 48, y: 56, w: 146, h: 86 },
  ],
  "workspace": [
    { x: 0, y: 0, w: 36, h: 150 },
    { x: 40, y: 8, w: 100, h: 134 },
    { x: 144, y: 0, w: 56, h: 150 },
  ],
  "thinking-visualization": [
    { x: 20, y: 12, w: 160, h: 28 },
    { x: 20, y: 46, w: 160, h: 62 },
    { x: 20, y: 114, w: 160, h: 28 },
  ],
  "multi-agent": [
    { x: 8, y: 8, w: 184, h: 60 },
    { x: 8, y: 76, w: 184, h: 66 },
    { x: 16, y: 84, w: 50, h: 8 },
  ],
  "generation-timeline": [
    { x: 20, y: 8, w: 16, h: 136 },
    { x: 44, y: 15, w: 148, h: 28 },
    { x: 44, y: 81, w: 148, h: 62 },
  ],
  "canvas-workspace": [
    { x: 0, y: 0, w: 200, h: 18 },
    { x: 20, y: 30, w: 170, h: 114 },
    { x: 32, y: 4, w: 20, h: 10 },
  ],
  "memory-graph": [
    { x: 84, y: 59, w: 32, h: 32 },
    { x: 20, y: 20, w: 160, h: 110 },
    { x: 10, y: 70, w: 30, h: 20 },
  ],
  "visual-prompt": [
    { x: 0, y: 0, w: 50, h: 150 },
    { x: 58, y: 20, w: 134, h: 96 },
    { x: 58, y: 118, w: 134, h: 24 },
  ],
  "insight-dashboard": [
    { x: 0, y: 0, w: 40, h: 150 },
    { x: 48, y: 8, w: 100, h: 36 },
    { x: 48, y: 52, w: 146, h: 90 },
  ],
  "co-creation": [
    { x: 0, y: 0, w: 32, h: 150 },
    { x: 36, y: 8, w: 80, h: 134 },
    { x: 120, y: 8, w: 72, h: 134 },
  ],
  "simulation": [
    { x: 0, y: 0, w: 56, h: 150 },
    { x: 64, y: 8, w: 128, h: 90 },
    { x: 64, y: 106, w: 128, h: 36 },
  ],
  "debate": [
    { x: 8, y: 8, w: 88, h: 134 },
    { x: 104, y: 8, w: 88, h: 134 },
    { x: 96, y: 60, w: 8, h: 30 },
  ],
  "guided-workflow": [
    { x: 20, y: 8, w: 160, h: 14 },
    { x: 20, y: 30, w: 160, h: 80 },
    { x: 20, y: 120, w: 160, h: 22 },
  ],
  "artifact-inspector": [
    { x: 8, y: 8, w: 120, h: 134 },
    { x: 136, y: 8, w: 56, h: 134 },
    { x: 16, y: 16, w: 104, h: 80 },
  ],
  "context-panel": [
    { x: 0, y: 0, w: 140, h: 150 },
    { x: 144, y: 0, w: 56, h: 150 },
    { x: 12, y: 84, w: 116, h: 40 },
  ],
  "control-center": [
    { x: 0, y: 0, w: 200, h: 22 },
    { x: 8, y: 28, w: 184, h: 54 },
    { x: 8, y: 88, w: 184, h: 54 },
  ],
};

/* ─── Annotated Diagram Component ─── */

interface AnnotatedDiagramProps {
  patternId: string;
  zones: ZoneData[];
  accent: string;
}

export function AnnotatedDiagram({ patternId, zones, accent }: AnnotatedDiagramProps) {
  const [activeZone, setActiveZone] = useState<number | null>(null);
  const [showScrollHint, setShowScrollHint] = useState(true);
  const cardsRef = useRef<HTMLDivElement>(null);
  const WireframeComponent = wireframeMap[patternId];
  const positions = zonePositions[patternId];

  if (!WireframeComponent || !positions) {
    return null;
  }

  // SVG viewBox for wireframes is 200x150
  const svgW = 200;
  const svgH = 150;

  // Reduced container dimensions so next section peeks below fold
  const containerW = 800;
  const containerH = 480;
  const diagramW = 600;
  const diagramH = 380;
  const diagramX = (containerW - diagramW) / 2;
  const diagramY = 32;

  const scrollToCards = () => {
    cardsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="w-full">
      {/* Diagram with overlays */}
      <div className="relative">
        <div
          className="relative rounded-2xl border-2 border-[#333] bg-[#F8FAFC] overflow-hidden shadow-[4px_5px_0px_0px_#333]"
          style={{ aspectRatio: `${containerW}/${containerH}` }}
        >
          {/* Wireframe */}
          <div
            className="absolute"
            style={{
              left: `${(diagramX / containerW) * 100}%`,
              top: `${(diagramY / containerH) * 100}%`,
              width: `${(diagramW / containerW) * 100}%`,
              height: `${(diagramH / containerH) * 100}%`,
            }}
          >
            <div className="w-full h-full rounded-xl overflow-hidden border border-[#E2E8F0]/60">
              <WireframeComponent />
            </div>

            {/* Zone highlight overlays */}
            {positions.map((pos, i) => {
              if (i >= zones.length) return null;
              const color = zoneColors[i % zoneColors.length];
              const isActive = activeZone === i;
              const isOther = activeZone !== null && activeZone !== i;

              return (
                <div
                  key={i}
                  className="absolute cursor-pointer transition-all duration-300"
                  style={{
                    left: `${(pos.x / svgW) * 100}%`,
                    top: `${(pos.y / svgH) * 100}%`,
                    width: `${(pos.w / svgW) * 100}%`,
                    height: `${(pos.h / svgH) * 100}%`,
                    background: isActive ? color.bg : `${color.fill}05`,
                    border: `2px ${isActive ? "solid" : "dashed"} ${isActive ? color.border : `${color.fill}30`}`,
                    borderRadius: 6,
                    opacity: isOther ? 0.25 : 1,
                    zIndex: isActive ? 10 : 1,
                  }}
                  onMouseEnter={() => { setActiveZone(i); setShowScrollHint(false); }}
                  onMouseLeave={() => setActiveZone(null)}
                >
                  {/* Zone label badge */}
                  <div
                    className="absolute -top-3 left-3 px-2 py-0.5 rounded-md text-[9px] tracking-[0.1em] uppercase whitespace-nowrap shadow-sm"
                    style={{
                      background: isActive ? color.fill : "white",
                      color: isActive ? "white" : color.text,
                      border: `1px solid ${isActive ? color.fill : color.border}`,
                    }}
                  >
                    {zones[i].label}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom annotation strip */}
          <div
            className="absolute left-0 right-0 bottom-0 px-6 py-4 flex items-center justify-center gap-4"
            style={{ background: "linear-gradient(to top, rgba(248,250,252,1) 60%, rgba(248,250,252,0))" }}
          >
            {zones.map((zone, i) => {
              const color = zoneColors[i % zoneColors.length];
              const isActive = activeZone === i;
              return (
                <button
                  key={zone.label}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all duration-200 cursor-pointer border"
                  style={{
                    background: isActive ? color.light : "white",
                    borderColor: isActive ? color.border : "#E2E8F0",
                    boxShadow: isActive ? `0 2px 8px ${color.fill}15` : "0 1px 2px rgba(0,0,0,0.04)",
                  }}
                  onMouseEnter={() => { setActiveZone(i); setShowScrollHint(false); }}
                  onMouseLeave={() => setActiveZone(null)}
                >
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ background: color.fill }}
                  />
                  <span className="text-[11px]" style={{ color: isActive ? color.text : "#64748B" }}>
                    {zone.label} — {zone.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Scroll affordance */}
        <div className="flex flex-col items-center mt-6 mb-2">
          <button
            onClick={scrollToCards}
            className="group flex flex-col items-center gap-1.5 cursor-pointer transition-all duration-300 hover:opacity-100 border-0 bg-transparent"
            style={{ opacity: showScrollHint ? 0.7 : 0.45 }}
          >
            <span className="text-[11px] tracking-[0.08em] text-[#94A3B8]">
              Scroll to explore zones
            </span>
            <ChevronDown
              className="w-4 h-4 text-[#94A3B8] group-hover:text-[#64748B] transition-colors"
              style={{ animation: "bounceDown 2s ease-in-out infinite" }}
            />
          </button>
        </div>

        {/* Bottom fade gradient to hint at more content */}
        <div
          className="h-12 -mb-12 relative z-10 pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, rgba(248,250,252,1), rgba(248,250,252,0))",
          }}
        />
      </div>

      {/* Zone Breakdown section header */}
      <div ref={cardsRef} className="pt-10 mb-6 scroll-mt-24">
        <h3 className="text-[22px] tracking-[0.01em] text-[#333] mb-1.5" style={{ fontFamily: "'Zilla Slab', serif" }}>
          Zone Breakdown
        </h3>
        <p className="text-[13px] text-[#888] leading-[1.6]">
          Detailed explanation of each interface region
        </p>
      </div>

      {/* Zone annotation cards — 3-column grid */}
      <div className="grid grid-cols-3 gap-5">
        {zones.map((zone, i) => {
          const color = zoneColors[i % zoneColors.length];
          const isActive = activeZone === i;
          const isDimmed = activeZone !== null && activeZone !== i;

          return (
            <div
              key={zone.label}
              className="relative rounded-xl border-2 bg-white overflow-hidden transition-all duration-300 cursor-pointer"
              style={{
                borderColor: isActive ? color.fill : "#333",
                boxShadow: isActive
                  ? `5px 6px 0px 0px ${color.fill}`
                  : "4px 5px 0px 0px #333",
                transform: isActive ? "translate(-2px, -2px)" : "translate(0, 0)",
                opacity: isDimmed ? 0.55 : 1,
              }}
              onMouseEnter={() => setActiveZone(i)}
              onMouseLeave={() => setActiveZone(null)}
            >
              {/* Color accent bar at top */}
              <div
                className="h-1.5 w-full transition-all duration-300"
                style={{
                  background: color.fill,
                }}
              />

              <div className="p-5">
                {/* Zone badge */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-[11px] tracking-[0.06em] uppercase transition-all duration-300 border-2"
                    style={{
                      background: isActive ? color.fill : "white",
                      color: isActive ? "white" : color.text,
                      borderColor: color.fill,
                    }}
                  >
                    {String.fromCharCode(65 + i)}
                  </div>
                  <div className="flex-1">
                    <div
                      className="text-[10px] tracking-[0.14em] uppercase mb-0.5 transition-colors duration-300"
                      style={{ color: color.text }}
                    >
                      {zone.label}
                    </div>
                    <div className="text-[15px] text-[#333] leading-tight" style={{ fontFamily: "'Zilla Slab', serif" }}>
                      {zone.name}
                    </div>
                  </div>
                </div>

                {/* Connecting color indicator line */}
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className="w-3 h-3 rounded-full border-2 shrink-0 transition-all duration-300"
                    style={{
                      background: isActive ? color.fill : "transparent",
                      borderColor: color.fill,
                    }}
                  />
                  <div
                    className="h-px flex-1 transition-all duration-300"
                    style={{ background: isActive ? `${color.fill}40` : `${color.fill}18` }}
                  />
                </div>

                {/* Description */}
                <p className="text-[12px] text-[#888] leading-[1.75]">
                  {zone.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bounce animation keyframes */}
      <style>{`
        @keyframes bounceDown {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(4px); }
        }
      `}</style>
    </div>
  );
}