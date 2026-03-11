import { useState } from "react";
import { Link, useParams } from "react-router";
import { ChevronRight, ArrowRight } from "lucide-react";
import { SharedNav, SharedFooter } from "./shared-nav";
import { wireframeMap } from "./wireframes";
import { patternDetails } from "./pattern-details-data";
import { layouts } from "./layout-data";
import type { Category } from "./layout-data";
import { AnnotatedDiagram } from "./annotated-diagram";
import { FadeUp, FadeIn, ScaleIn, StaggerContainer, StaggerItem, LineReveal, TextReveal } from "./animations";

/* ─── Category accent colors ─── */
const catAccent: Record<Category, string> = {
  "CORE AI INTERFACES": "#2563EB",
  "ADVANCED AI INTERFACES": "#7C3AED",
  "FUTURE AI SYSTEMS": "#06B6D4",
};

/* ─── Example Interface Component ─── */
function ExampleInterface({ patternId, accent }: { patternId: string; accent: string }) {
  const examples: Record<string, () => JSX.Element> = {
    "prompt-canvas": () => (
      <div className="flex h-full">
        <div className="flex-1 flex flex-col">
          <div className="px-5 py-4 border-b border-[#E2E8F0] flex items-center gap-3">
            <div className="flex-1 h-10 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] flex items-center px-4">
              <span className="text-[13px] text-[#94A3B8]">A futuristic cityscape at sunset, cyberpunk style, neon lights...</span>
            </div>
            <button className="px-4 py-2 rounded-lg text-[13px] text-white" style={{ background: accent }}>Generate</button>
          </div>
          <div className="flex-1 p-4 grid grid-cols-2 gap-3">
            {[1,2,3,4].map(i => (
              <div key={i} className={`rounded-lg ${i === 1 ? 'ring-2' : ''} overflow-hidden`} style={i === 1 ? { ringColor: accent } : {}}>
                <div className="aspect-square bg-gradient-to-br from-[#F1F5F9] to-[#F8FAFC] flex items-center justify-center">
                  <div className="w-16 h-16 rounded-lg opacity-40" style={{ background: `linear-gradient(135deg, ${accent}30, ${accent}08)` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-[200px] border-l border-[#E2E8F0] bg-[#F8FAFC] p-4 flex flex-col gap-3">
          <span className="text-[11px] tracking-[0.1em] uppercase text-[#94A3B8]">Parameters</span>
          {["Model", "Style", "Ratio", "Quality"].map(p => (
            <div key={p}>
              <div className="text-[12px] text-[#64748B] mb-1">{p}</div>
              <div className="h-7 rounded bg-white border border-[#E2E8F0]" />
            </div>
          ))}
        </div>
      </div>
    ),
    "prompt-live-preview": () => (
      <div className="flex h-full">
        <div className="w-[280px] border-r border-[#E2E8F0] bg-[#F8FAFC] p-5 flex flex-col gap-4">
          <div className="text-[12px] text-[#64748B] mb-1">Prompt</div>
          <div className="h-24 rounded-lg bg-white border border-[#E2E8F0] p-3">
            <span className="text-[13px] text-[#94A3B8]">Create a modern landing page hero with gradient background...</span>
          </div>
          {["Temperature", "Max Tokens", "Style"].map(p => (
            <div key={p}>
              <div className="text-[12px] text-[#64748B] mb-1">{p}</div>
              <div className="h-2 rounded-full bg-[#E2E8F0] overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${40 + Math.random() * 40}%`, background: accent }} />
              </div>
            </div>
          ))}
          <button className="mt-auto px-4 py-2 rounded-lg text-[13px] text-white" style={{ background: accent }}>Apply Changes</button>
        </div>
        <div className="flex-1 p-6 flex items-center justify-center">
          <div className="w-full max-w-[400px] rounded-xl border border-[#E2E8F0] bg-white p-8">
            <div className="h-4 w-32 rounded bg-[#E2E8F0] mb-3" />
            <div className="h-3 w-full rounded bg-[#F1F5F9] mb-2" />
            <div className="h-3 w-3/4 rounded bg-[#F1F5F9] mb-4" />
            <div className="h-8 w-24 rounded" style={{ background: `${accent}20` }} />
          </div>
        </div>
      </div>
    ),
  };

  const ExampleFn = examples[patternId];
  if (ExampleFn) {
    return (
      <div className="w-full rounded-xl border border-[#E2E8F0] bg-white overflow-hidden" style={{ height: 440 }}>
        <ExampleFn />
      </div>
    );
  }

  /* ─── Default generic example ─── */
  const WireframeComponent = wireframeMap[patternId];
  return (
    <div className="w-full rounded-xl border border-[#E2E8F0] bg-white overflow-hidden" style={{ height: 440 }}>
      <div className="flex h-full">
        <div className="flex-1 flex flex-col">
          <div className="px-5 py-3 border-b border-[#E2E8F0] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ background: accent }} />
              <span className="text-[13px] text-[#0F172A]">{patternDetails[patternId]?.name || "Interface"}</span>
            </div>
            <div className="flex gap-1.5">
              {[1,2,3].map(i => <div key={i} className="w-2.5 h-2.5 rounded-full bg-[#E2E8F0]" />)}
            </div>
          </div>
          <div className="flex-1 p-6 flex items-center justify-center">
            {WireframeComponent && (
              <div className="w-full max-w-[360px] aspect-[4/3] rounded-lg border border-[#E2E8F0]/50 overflow-hidden">
                <WireframeComponent />
              </div>
            )}
          </div>
          <div className="px-5 py-3 border-t border-[#E2E8F0] flex items-center gap-3">
            <div className="flex-1 h-9 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] flex items-center px-3">
              <span className="text-[12px] text-[#94A3B8]">Type a command or ask a question...</span>
            </div>
            <button className="px-4 py-1.5 rounded-lg text-[12px] text-white" style={{ background: accent }}>Run</button>
          </div>
        </div>
        <div className="w-[180px] border-l border-[#E2E8F0] bg-[#F8FAFC] p-4 flex flex-col gap-3">
          <span className="text-[10px] tracking-[0.1em] uppercase text-[#94A3B8]">Details</span>
          {[1,2,3,4,5].map(i => (
            <div key={i} className="flex flex-col gap-1">
              <div className="h-2 rounded bg-[#E2E8F0]" style={{ width: `${50 + i * 8}%` }} />
              <div className="h-2 rounded bg-[#F1F5F9]" style={{ width: `${70 - i * 5}%` }} />
            </div>
          ))}
          <div className="mt-auto h-8 rounded-lg border border-[#E2E8F0] flex items-center justify-center">
            <span className="text-[11px] text-[#94A3B8]">View Details</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Related Card ─── */
function RelatedCard({ id, name, description, wireframe }: {
  id: string; name: string; description: string; wireframe: React.ReactNode;
}) {
  const [hovered, setHovered] = useState(false);
  const layout = layouts.find(l => l.id === id);
  const accent = layout ? catAccent[layout.category] : "#2563EB";

  return (
    <Link
      to={`/pattern/${id}`}
      className="group flex flex-col rounded-2xl border-2 border-[#333] bg-white overflow-hidden no-underline"
      style={{
        transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
        transform: hovered ? "translate(-2px, -2px)" : "translate(0, 0)",
        boxShadow: hovered
          ? `6px 8px 0px 0px ${accent}`
          : "4px 5px 0px 0px #333",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="aspect-[4/3] bg-[#F1F5F9] p-4 overflow-hidden border-b-2 border-[#333]">
        <div
          className="w-full h-full rounded-md overflow-hidden border border-[#E2E8F0]/60"
          style={{ transition: "transform 0.4s ease", transform: hovered ? "scale(1.03)" : "scale(1)" }}
        >
          {wireframe}
        </div>
      </div>
      <div className="p-4 flex flex-col gap-1.5">
        <h4 className="text-[14px] text-[#333] tracking-tight" style={{ fontFamily: "'Zilla Slab', serif" }}>{name}</h4>
        <p className="text-[12px] text-[#888] leading-[1.6]">{description}</p>
        <div
          className="flex items-center gap-1 mt-1"
          style={{ transition: "all 0.25s ease", opacity: hovered ? 1 : 0, transform: hovered ? "translateX(0)" : "translateX(-4px)" }}
        >
          <span className="text-[11px]" style={{ color: accent }}>View pattern</span>
          <ArrowRight className="w-3 h-3" style={{ color: accent }} />
        </div>
      </div>
    </Link>
  );
}

/* ─── Main Page ─── */
export function GenericPatternPage() {
  const { id } = useParams();
  const pattern = id ? patternDetails[id] : null;

  if (!pattern) {
    return (
      <div className="min-h-screen bg-[#FDFEFF] flex items-center justify-center" style={{ fontFamily: "'Inter', sans-serif" }}>
        <SharedNav />
        <div className="text-center">
          <h1 className="text-[32px] text-[#333] mb-4" style={{ fontFamily: "'Zilla Slab', serif" }}>Pattern Not Found</h1>
          <Link to="/" className="text-[#2563EB] text-[14px]">Return to Library</Link>
        </div>
      </div>
    );
  }

  const layout = layouts.find(l => l.id === pattern.id);
  const accent = layout ? catAccent[layout.category] : "#2563EB";

  return (
    <div className="min-h-screen bg-[#FDFEFF]" style={{ fontFamily: "'Inter', sans-serif" }}>
      <SharedNav />

      {/* Breadcrumb */}
      <FadeIn delay={0.1}>
        <div className="max-w-[1440px] mx-auto px-16 pt-8">
          <div className="flex items-center gap-1.5 text-[12px]">
            <Link to="/" className="text-[#888] hover:text-[#333] transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 text-[#ccc]" />
            <Link to="/" className="text-[#888] hover:text-[#333] transition-colors">AI Interface Layout Library</Link>
            <ChevronRight className="w-3 h-3 text-[#ccc]" />
            <span className="text-[#333]">{pattern.name}</span>
          </div>
        </div>
      </FadeIn>

      {/* Title Section */}
      <section className="max-w-[1440px] mx-auto px-16 pt-12 pb-16">
        <div className="max-w-[720px]">
          <FadeUp delay={0.15} y={20}>
            <div className="flex items-center gap-2.5 mb-6">
              <span
                className="inline-block px-4 py-1.5 rounded-full text-[10px] tracking-[0.1em] uppercase border-2"
                style={{ background: "white", color: accent, borderColor: accent, boxShadow: `3px 3px 0px 0px ${accent}` }}
              >
                {pattern.categoryLabel}
              </span>
              <span className="text-[11px] text-[#999]">
                Pattern {String(pattern.patternNumber).padStart(2, "0")} of 27
              </span>
            </div>
          </FadeUp>

          <FadeUp delay={0.25} y={30}>
            <h1 className="text-[48px] tracking-[0.01em] text-[#333] leading-[1.1] mb-6" style={{ fontFamily: "'Zilla Slab', serif" }}>
              {pattern.name}
            </h1>
          </FadeUp>

          <FadeUp delay={0.4} y={20}>
            <p className="text-[18px] text-[#888] leading-[1.6] mb-6">
              {pattern.shortDescription}
            </p>
          </FadeUp>

          <FadeUp delay={0.5} y={20}>
            <p className="text-[14px] text-[#777] leading-[1.85]">
              {pattern.longDescription}
            </p>
          </FadeUp>
        </div>

        {/* Meta info */}
        <LineReveal className="h-[2px] bg-[#333] mt-12" delay={0.5} duration={0.8} />
        <div className="flex items-center gap-6 pt-8">
          {[
            { label: "Category", value: pattern.categoryLabel.replace("AI ", "") + "s" },
            { label: "Complexity", value: pattern.complexity },
            { label: "Interaction", value: pattern.interaction },
            { label: "Adoption", value: pattern.adoption },
          ].map((meta, i) => (
            <FadeUp key={meta.label} delay={0.6 + i * 0.1} y={20}>
              <div className="px-5 py-4 rounded-xl border-2 border-[#333] bg-white shadow-[3px_4px_0px_0px_#333]">
                <div className="text-[10px] tracking-[0.1em] uppercase text-[#999] mb-1.5">{meta.label}</div>
                <div className="text-[14px] text-[#333]" style={{ fontFamily: "'Zilla Slab', serif" }}>{meta.value}</div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* Layout Structure Section */}
      <section className="w-full border-t-2 border-[#333] bg-[#F8FAFC]">
        <div className="max-w-[1440px] mx-auto px-16 py-14">
          <div className="mb-10">
            <FadeUp delay={0} y={20}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border-2 border-[#333] shadow-[3px_3px_0px_0px_#333] bg-white mb-5">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: accent }} />
                <span className="text-[10px] tracking-[0.12em] uppercase text-[#555]">Layout Anatomy</span>
              </div>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h2 className="text-[30px] tracking-[0.01em] text-[#333] leading-[1.2] mb-3" style={{ fontFamily: "'Zilla Slab', serif" }}>
                {pattern.structureTitle}
              </h2>
            </FadeUp>
            <FadeUp delay={0.2}>
              <p className="text-[14px] text-[#777] leading-[1.7] max-w-[540px]">
                {pattern.structureDescription}
              </p>
            </FadeUp>
          </div>

          <ScaleIn delay={0.2}>
            <AnnotatedDiagram patternId={pattern.id} zones={pattern.zones} accent={accent} />
          </ScaleIn>
        </div>
      </section>

      {/* Example Interface Section */}
      <section className="w-full border-t-2 border-[#333]">
        <div className="max-w-[1440px] mx-auto px-16 py-20">
          <div className="mb-10">
            <FadeUp delay={0} y={20}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border-2 border-[#333] shadow-[3px_3px_0px_0px_#333] bg-white mb-5">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: accent }} />
                <span className="text-[10px] tracking-[0.12em] uppercase text-[#555]">Live Example</span>
              </div>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h2 className="text-[30px] tracking-[0.01em] text-[#333] leading-[1.2] mb-3" style={{ fontFamily: "'Zilla Slab', serif" }}>
                Example Interface
              </h2>
            </FadeUp>
            <FadeUp delay={0.15}>
              <p className="text-[14px] text-[#777] leading-[1.7] max-w-[540px]">
                A realistic implementation of the {pattern.name.toLowerCase()} showing the key interaction patterns and component arrangement.
              </p>
            </FadeUp>
          </div>

          <ScaleIn delay={0.1}>
            <ExampleInterface patternId={pattern.id} accent={accent} />
          </ScaleIn>
        </div>
      </section>

      {/* Key Components Section */}
      <section className="w-full border-t-2 border-[#333] bg-[#F8FAFC]">
        <div className="max-w-[1440px] mx-auto px-16 py-20">
          <div className="mb-12">
            <FadeUp delay={0} y={20}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border-2 border-[#333] shadow-[3px_3px_0px_0px_#333] bg-white mb-5">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: accent }} />
                <span className="text-[10px] tracking-[0.12em] uppercase text-[#555]">Components</span>
              </div>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h2 className="text-[30px] tracking-[0.01em] text-[#333] leading-[1.2] mb-3" style={{ fontFamily: "'Zilla Slab', serif" }}>
                Key Components
              </h2>
            </FadeUp>
            <FadeUp delay={0.15}>
              <p className="text-[14px] text-[#777] leading-[1.7] max-w-[540px]">
                The building blocks that make up this interface pattern, each serving a specific function in the user experience.
              </p>
            </FadeUp>
          </div>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {pattern.components.map((comp, i) => (
              <StaggerItem key={comp.name}>
                <div className="rounded-xl border-2 border-[#333] bg-white p-6 shadow-[4px_5px_0px_0px_#333] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_7px_0px_0px_#333] transition-all duration-200">
                  <div className="flex items-start gap-4">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-[14px] border-2"
                      style={{ background: "white", color: accent, borderColor: accent }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div>
                      <h3 className="text-[14px] text-[#333] mb-2" style={{ fontFamily: "'Zilla Slab', serif" }}>{comp.name}</h3>
                      <p className="text-[13px] text-[#888] leading-[1.7]">{comp.description}</p>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Interaction Pattern Section */}
      <section className="w-full border-t-2 border-[#333]">
        <div className="max-w-[1440px] mx-auto px-16 py-20">
          <div className="mb-12">
            <FadeUp delay={0} y={20}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border-2 border-[#333] shadow-[3px_3px_0px_0px_#333] bg-white mb-5">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: accent }} />
                <span className="text-[10px] tracking-[0.12em] uppercase text-[#555]">Interaction Flow</span>
              </div>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h2 className="text-[30px] tracking-[0.01em] text-[#333] leading-[1.2] mb-3" style={{ fontFamily: "'Zilla Slab', serif" }}>
                Interaction Pattern
              </h2>
            </FadeUp>
            <FadeUp delay={0.15}>
              <p className="text-[14px] text-[#777] leading-[1.7] max-w-[540px]">
                How users navigate the {pattern.name.toLowerCase()} experience, from initial input to final output.
              </p>
            </FadeUp>
          </div>

          <div className="flex flex-col gap-0">
            {pattern.steps.map((step, idx) => (
              <FadeUp key={step.step} delay={idx * 0.1} y={20}>
                <div className="flex gap-8 items-stretch">
                  <div className="flex flex-col items-center w-12 shrink-0">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-2 border-[#333]"
                      style={{ background: accent }}
                    >
                      <span className="text-[12px] text-white tracking-wider">{step.step}</span>
                    </div>
                    {idx < pattern.steps.length - 1 && (
                      <div className="w-0.5 flex-1 my-1 bg-[#333]" />
                    )}
                  </div>
                  <div className="pb-10 flex-1">
                    <h3 className="text-[16px] text-[#333] mb-2" style={{ fontFamily: "'Zilla Slab', serif" }}>{step.title}</h3>
                    <p className="text-[13px] text-[#888] leading-[1.8] max-w-[520px]">{step.description}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="w-full border-t-2 border-[#333] bg-[#F8FAFC]">
        <div className="max-w-[1440px] mx-auto px-16 py-20">
          <div className="mb-12">
            <FadeUp delay={0} y={20}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border-2 border-[#333] shadow-[3px_3px_0px_0px_#333] bg-white mb-5">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: accent }} />
                <span className="text-[10px] tracking-[0.12em] uppercase text-[#555]">Applications</span>
              </div>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h2 className="text-[30px] tracking-[0.01em] text-[#333] leading-[1.2] mb-3" style={{ fontFamily: "'Zilla Slab', serif" }}>
                Use Cases
              </h2>
            </FadeUp>
            <FadeUp delay={0.15}>
              <p className="text-[14px] text-[#777] leading-[1.7] max-w-[540px]">
                Product categories where this layout pattern is the primary interface model.
              </p>
            </FadeUp>
          </div>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {pattern.useCases.map(uc => (
              <StaggerItem key={uc.product}>
                <div className="rounded-xl border-2 border-[#333] bg-white p-7 shadow-[4px_5px_0px_0px_#333] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_7px_0px_0px_#333] transition-all duration-200">
                  <div className="flex items-start gap-5">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 text-[16px] border-2"
                      style={{ background: "white", color: accent, borderColor: accent }}
                    >
                      ◆
                    </div>
                    <div className="flex-1">
                      <h3 className="text-[15px] text-[#333] mb-1" style={{ fontFamily: "'Zilla Slab', serif" }}>{uc.product}</h3>
                      <p className="text-[12px] text-[#999] mb-3">{uc.examples}</p>
                      <p className="text-[13px] text-[#888] leading-[1.7]">{uc.description}</p>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Related Layouts Section */}
      <section className="w-full border-t-2 border-[#333]">
        <div className="max-w-[1440px] mx-auto px-16 py-20">
          <div className="mb-12">
            <FadeUp delay={0} y={20}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border-2 border-[#333] shadow-[3px_3px_0px_0px_#333] bg-white mb-5">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: accent }} />
                <span className="text-[10px] tracking-[0.12em] uppercase text-[#555]">Related</span>
              </div>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h2 className="text-[30px] tracking-[0.01em] text-[#333] leading-[1.2] mb-3" style={{ fontFamily: "'Zilla Slab', serif" }}>
                Related Layouts
              </h2>
            </FadeUp>
            <FadeUp delay={0.15}>
              <p className="text-[14px] text-[#777] leading-[1.7] max-w-[540px]">
                Patterns that complement or extend this layout with additional interaction capabilities.
              </p>
            </FadeUp>
          </div>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
            {pattern.relatedIds.map(relId => {
              const relLayout = layouts.find(l => l.id === relId);
              const Wf = wireframeMap[relId];
              if (!relLayout) return null;
              return (
                <StaggerItem key={relId}>
                  <RelatedCard
                    id={relId}
                    name={relLayout.name}
                    description={relLayout.description}
                    wireframe={Wf ? <Wf /> : null}
                  />
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Back to library CTA */}
      <section className="w-full border-t-2 border-[#333] bg-[#F8FAFC]">
        <FadeUp>
          <div className="max-w-[1440px] mx-auto px-16 py-16 flex items-center justify-between">
            <div>
              <h3 className="text-[20px] text-[#333] mb-1.5" style={{ fontFamily: "'Zilla Slab', serif" }}>Explore all 27 patterns</h3>
              <p className="text-[13px] text-[#888]">
                Return to the full AI Interface Layout Library collection.
              </p>
            </div>
            <Link
              to="/"
              className="flex items-center gap-2 px-8 py-4 rounded-full text-white text-[14px] no-underline border-2 border-[#202020] shadow-[4px_5px_0px_0px_#333] hover:shadow-[2px_3px_0px_0px_#333] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200"
              style={{ background: "#202020" }}
            >
              View Library
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </FadeUp>
      </section>

      <SharedFooter />
    </div>
  );
}