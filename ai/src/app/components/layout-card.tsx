import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import type { Category } from "./layout-data";
import { wireframeMap } from "./wireframes";

interface LayoutCardProps {
  index: number;
  id: string;
  name: string;
  description: string;
  category: Category;
}

const categoryStyles: Record<Category, { accent: string; tagBg: string }> = {
  "CORE AI INTERFACES": { accent: "#2563EB", tagBg: "#EFF6FF" },
  "ADVANCED AI INTERFACES": { accent: "#7C3AED", tagBg: "#F5F3FF" },
  "FUTURE AI SYSTEMS": { accent: "#06B6D4", tagBg: "#ECFEFF" },
};

export function LayoutCard({ index, id, name, description, category }: LayoutCardProps) {
  const [hovered, setHovered] = useState(false);
  const WireframeComponent = wireframeMap[id];
  const style = categoryStyles[category];

  return (
    <Link
      to={`/pattern/${id}`}
      className="group flex flex-col rounded-2xl border-2 border-[#333] bg-white cursor-pointer overflow-hidden no-underline"
      style={{
        transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
        transform: hovered ? "translate(-2px, -2px)" : "translate(0, 0)",
        boxShadow: hovered
          ? `8px 10px 0px 0px ${style.accent}`
          : "5px 6px 0px 0px #333",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
        {/* Wireframe thumbnail */}
        <div className="relative aspect-[4/3] bg-[#F1F5F9] overflow-hidden p-5 border-b-2 border-[#333]">
          <div
            className="w-full h-full rounded-lg overflow-hidden border border-[#E2E8F0]/60"
            style={{
              transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
              transform: hovered ? "scale(1.03)" : "scale(1)",
            }}
          >
            {WireframeComponent && <WireframeComponent />}
          </div>
          {/* Index badge */}
          <div
            className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white border-2 border-[#333] shadow-[2px_2px_0px_0px_#333]"
          >
            <span className="text-[10px] tracking-[0.12em] text-[#555] tabular-nums">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col gap-3 flex-1">
          {/* Category pill tag */}
          <div>
            <span
              className="inline-block px-3 py-1 rounded-full text-[10px] tracking-[0.06em] border-2"
              style={{
                borderColor: style.accent,
                color: style.accent,
                background: style.tagBg,
              }}
            >
              {category}
            </span>
          </div>

          <h3
            className="text-[15px] text-[#333] tracking-tight leading-snug"
            style={{ fontFamily: "'Zilla Slab', serif" }}
          >
            {name}
          </h3>
          <p className="text-[13px] text-[#888] leading-[1.7] flex-1">
            {description}
          </p>

          {/* View link */}
          <div
            className="flex items-center gap-1.5 mt-1"
            style={{
              transition: "all 0.25s ease",
              opacity: hovered ? 1 : 0,
              transform: hovered ? "translateY(0)" : "translateY(4px)",
            }}
          >
            <span className="text-[12px] tracking-wide" style={{ color: style.accent }}>
              View Layout
            </span>
            <ArrowRight className="w-3 h-3" style={{ color: style.accent }} />
          </div>
        </div>
    </Link>
  );
}