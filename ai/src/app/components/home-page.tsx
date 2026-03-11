import { LayoutCard } from "./layout-card";
import { layouts } from "./layout-data";
import { ArrowDown } from "lucide-react";
import { SharedNav, SharedFooter } from "./shared-nav";
import {
  FadeUp,
  FadeIn,
  TextReveal,
  CountUp,
  StaggerContainer,
  StaggerItem,
  LineReveal,
  ParallaxFloat,
  PulseGlow,
  ScaleIn,
} from "./animations";

export function HomePage() {
  return (
    <div className="min-h-screen bg-[#FDFEFF]" style={{ fontFamily: "'Inter', sans-serif" }}>
      <SharedNav />

      {/* Hero Section */}
      <section className="w-full relative overflow-hidden">
        {/* Decorative elements with parallax + pulse */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <ParallaxFloat speed={-0.08}>
            <PulseGlow>
              <div
                className="absolute w-[180px] h-[180px] rounded-full"
                style={{ background: "#D7A94F", opacity: 0.12, top: "60px", right: "220px" }}
              />
            </PulseGlow>
          </ParallaxFloat>
          <ParallaxFloat speed={0.12}>
            <PulseGlow>
              <div
                className="absolute w-[140px] h-[140px] rounded-full"
                style={{ background: "#EFBDD9", opacity: 0.10, top: "280px", right: "80px" }}
              />
            </PulseGlow>
          </ParallaxFloat>
          <ParallaxFloat speed={-0.06}>
            <PulseGlow>
              <div
                className="absolute w-[120px] h-[120px] rounded-full"
                style={{ background: "#79BBE3", opacity: 0.10, bottom: "80px", right: "300px" }}
              />
            </PulseGlow>
          </ParallaxFloat>
          <ParallaxFloat speed={0.1}>
            <PulseGlow>
              <div
                className="absolute w-[100px] h-[100px] rounded-full"
                style={{ background: "#685FD4", opacity: 0.10, top: "160px", right: "420px" }}
              />
            </PulseGlow>
          </ParallaxFloat>
        </div>

        <div className="max-w-[1440px] mx-auto px-16 pt-28 pb-24 relative z-10">
          <div className="max-w-[800px]">
            {/* Pill tag */}
            <FadeUp delay={0.1} y={20}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 border-[#333] shadow-[3px_4px_0px_0px_#333] bg-white mb-10">
                <div className="w-2 h-2 rounded-full bg-[#2563EB]" />
                <span className="text-[12px] tracking-[0.08em] uppercase text-[#555]">
                  UX Pattern Library
                </span>
              </div>
            </FadeUp>

            {/* Headline with word reveal */}
            <div style={{ fontFamily: "'Zilla Slab', serif" }}>
              <TextReveal
                text="AI Interface Layout"
                delay={0.3}
                element="h1"
                className="text-[60px] tracking-[0.01em] leading-[1.08] mb-2 text-[#333]"
              />
              <TextReveal
                text="Library"
                delay={0.6}
                element="h1"
                className="text-[60px] tracking-[0.01em] leading-[1.08] mb-8 text-[#333]"
              />
            </div>

            <FadeUp delay={0.8} y={20}>
              <p className="text-[22px] text-[#555] leading-[1.5] mb-8 max-w-[640px]">
                27 interaction patterns shaping the future of AI products
              </p>
            </FadeUp>

            <FadeUp delay={1.0} y={20}>
              <p className="text-[15px] text-[#888] leading-[1.85] max-w-[580px] mb-10">
                A curated collection of interface layouts used in modern and emerging AI
                systems — from conversational assistants and generative media tools to
                multi-agent workspaces and autonomous AI control dashboards.
              </p>
            </FadeUp>

            {/* CTA button */}
            <FadeUp delay={1.2} y={20}>
              <a
                href="#patterns"
                className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-[#202020] text-white text-[18px] border-2 border-[#202020] shadow-[5px_6px_0px_0px_#333] hover:shadow-[2px_3px_0px_0px_#333] hover:translate-x-[3px] hover:translate-y-[3px] transition-all duration-200 no-underline"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Explore patterns
              </a>
            </FadeUp>
          </div>

          {/* Stats Row with animated border + count-up */}
          <LineReveal
            className="h-[2px] bg-[#333] mt-20"
            delay={1.0}
            duration={0.8}
          />
          <div className="flex items-center gap-6 pt-10">
            {[
              { value: 27, label: "Layout Patterns", color: "#2563EB", suffix: "" },
              { value: 3, label: "Categories", color: "#7C3AED", suffix: "" },
              { value: 2026, label: "Edition", color: "#06B6D4", suffix: "" },
            ].map((stat, i) => (
              <FadeUp key={stat.label} delay={1.2 + i * 0.15} y={25}>
                <div className="flex items-center gap-4 px-6 py-4 rounded-2xl border-2 border-[#333] bg-white shadow-[4px_5px_0px_0px_#333]">
                  <span
                    className="text-[32px] tracking-[-0.02em]"
                    style={{ color: stat.color, fontFamily: "'Zilla Slab', serif" }}
                  >
                    <CountUp value={stat.value} suffix={stat.suffix} duration={2} />
                  </span>
                  <span className="text-[12px] tracking-[0.04em] text-[#888]">{stat.label}</span>
                </div>
              </FadeUp>
            ))}
            <FadeUp delay={1.65} y={25}>
              <div className="flex items-center gap-4 px-6 py-4 rounded-2xl border-2 border-[#333] bg-white shadow-[4px_5px_0px_0px_#333]">
                <span
                  className="text-[32px] tracking-[-0.02em]"
                  style={{ color: "#D7A94F", fontFamily: "'Zilla Slab', serif" }}
                >
                  ∞
                </span>
                <span className="text-[12px] tracking-[0.04em] text-[#888]">Possibilities</span>
              </div>
            </FadeUp>
          </div>

          {/* Scroll indicator */}
          <FadeIn delay={2.0}>
            <div className="flex items-center gap-2 mt-16">
              <ArrowDown className="w-3.5 h-3.5 text-[#888] animate-bounce" />
              <span className="text-[11px] tracking-[0.15em] uppercase text-[#999]">
                Explore patterns
              </span>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Layout Grid Section */}
      <section id="patterns" className="w-full border-t-2 border-[#333] bg-[#F8FAFC]">
        <div className="max-w-[1440px] mx-auto px-16 pt-20 pb-24">
          {/* Section header */}
          <div className="max-w-[560px] mb-16">
            <FadeUp delay={0} y={20}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border-2 border-[#333] shadow-[3px_4px_0px_0px_#333] bg-white mb-6">
                <div className="w-1.5 h-1.5 rounded-full bg-[#06B6D4]" />
                <span className="text-[10px] tracking-[0.12em] uppercase text-[#555]">
                  Collection
                </span>
              </div>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h2
                className="text-[36px] tracking-[0.01em] text-[#333] leading-[1.2] mb-4"
                style={{ fontFamily: "'Zilla Slab', serif" }}
              >
                AI Interface Patterns
              </h2>
            </FadeUp>
            <FadeUp delay={0.2}>
              <p className="text-[15px] text-[#888] leading-[1.8]">
                Explore the core layouts used in AI products today along with emerging
                interaction models for the next generation of intelligent systems.
              </p>
            </FadeUp>
          </div>

          {/* Grid with stagger */}
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {layouts.map((layout, index) => (
              <StaggerItem key={layout.id}>
                <LayoutCard
                  index={index}
                  id={layout.id}
                  name={layout.name}
                  description={layout.description}
                  category={layout.category}
                />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <SharedFooter />
    </div>
  );
}