import { Link } from "react-router";
import {
  ArrowRight,
  Layers,
  Compass,
  Lightbulb,
  RefreshCw,
  Mail,
  User,
  BookOpen,
} from "lucide-react";
import { SharedNav, SharedFooter } from "./shared-nav";
import { FadeUp, FadeIn, TextReveal, CountUp, ScaleIn, LineReveal } from "./animations";

const sections = [
  {
    id: "why",
    icon: <Compass className="w-5 h-5" />,
    label: "Purpose",
    title: "Why this was created",
    content: [
      "AI interfaces are evolving at an extraordinary pace. Every few months, new interaction paradigms emerge \u2014 from conversational chat to node-based workflows, from copilot overlays to multi-agent orchestration dashboards. Yet there has been no unified reference documenting the layout patterns that define how humans interact with AI systems.",
      "This project was created to fill that gap. By studying dozens of AI-powered products across consumer and enterprise categories, we identified 27 distinct layout patterns that represent the current state of human-AI interaction design. Each pattern captures not just the visual structure, but the underlying interaction model, component anatomy, and design rationale.",
      "The goal is to give designers and product teams a shared vocabulary for discussing AI interfaces \u2014 moving beyond vague descriptions like \u201cchatbot UI\u201d or \u201cdashboard\u201d toward precise, reusable layout definitions that can inform better design decisions.",
    ],
  },
  {
    id: "what",
    icon: <Layers className="w-5 h-5" />,
    label: "Contents",
    title: "What this library contains",
    content: [
      "The library documents 27 AI interface layout patterns, organized into three categories: Core AI Interfaces (the foundational patterns powering most AI products today), Advanced AI Interfaces (specialized patterns for complex workflows), and Future AI Systems (emerging patterns at the frontier of AI interaction design).",
      "Each pattern page includes a detailed wireframe diagram with annotated zones, a breakdown of key components, step-by-step interaction flows, real-world use cases with product examples, and links to related patterns. The annotated diagrams use color-coded zone overlays that connect directly to explanation cards, making it easy to understand how each region of the interface functions.",
      "Beyond individual patterns, the library includes a category explorer, an adoption timeline showing when each pattern emerged, a decision guide for choosing the right layout, and a diagram system overview explaining the visual language used throughout.",
    ],
  },
  {
    id: "how",
    icon: <Lightbulb className="w-5 h-5" />,
    label: "For designers",
    title: "How this can help designers",
    content: [
      "When designing an AI-powered product, one of the first and most consequential decisions is choosing the right interface layout. The wrong pattern can create friction, hide capabilities, or confuse users. The right pattern makes AI feel intuitive and powerful.",
      "This library serves as a reference catalog. Designers can browse patterns by category, compare interaction models side by side, and study the component anatomy of each layout before committing to a direction. The decision guide helps narrow down options based on the type of AI interaction, user expertise level, and product complexity.",
      "Whether you\u2019re building a simple chatbot, a complex multi-agent system, or something in between, this library provides a starting point grounded in real-world patterns that have been validated across successful AI products.",
    ],
  },
  {
    id: "ongoing",
    icon: <RefreshCw className="w-5 h-5" />,
    label: "Evolution",
    title: "Ongoing work",
    content: [
      "AI interaction patterns are not static. As language models become more capable, as multimodal AI expands into vision, audio, and video, and as agent-based systems grow more autonomous, entirely new interface paradigms will emerge. Patterns that seem experimental today may become foundational tomorrow.",
      "This library is designed to evolve. New patterns may be added as they crystallize in the industry, existing patterns may be refined as best practices develop, and the relationships between patterns may shift as the ecosystem matures. The current collection of 27 patterns represents a snapshot of the field as it stands \u2014 a foundation to build upon rather than a final catalog.",
    ],
  },
];

export function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FDFEFF]" style={{ fontFamily: "'Inter', sans-serif" }}>
      <SharedNav />

      {/* Hero */}
      <section className="max-w-[1440px] mx-auto px-16 pt-20 pb-16">
        <div className="max-w-[720px]">
          <FadeUp delay={0.1} y={20}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 border-[#333] shadow-[3px_4px_0px_0px_#333] bg-white mb-10">
              <div className="w-2 h-2 rounded-full bg-[#2563EB]" />
              <span className="text-[12px] tracking-[0.08em] uppercase text-[#555]">
                Documentation
              </span>
            </div>
          </FadeUp>

          <div style={{ fontFamily: "'Zilla Slab', serif" }}>
            <TextReveal
              text="About AI Interface"
              delay={0.3}
              element="h1"
              className="text-[52px] tracking-[0.01em] text-[#333] leading-[1.1] mb-2"
            />
            <TextReveal
              text="Layout Library"
              delay={0.6}
              element="h1"
              className="text-[52px] tracking-[0.01em] text-[#333] leading-[1.1] mb-8"
            />
          </div>

          <FadeUp delay={0.9} y={20}>
            <p className="text-[18px] text-[#888] leading-[1.7] mb-6">
              A curated collection of 27 interface layout patterns that define how humans interact
              with AI systems — documented with wireframes, component anatomy, interaction flows,
              and real-world use cases.
            </p>
          </FadeUp>

          <FadeUp delay={1.1} y={20}>
            <div className="flex items-center gap-4 mt-10">
              <Link
                to="/"
                className="flex items-center gap-2 px-8 py-4 rounded-full bg-[#202020] text-white text-[15px] no-underline border-2 border-[#202020] shadow-[4px_5px_0px_0px_#333] hover:shadow-[2px_3px_0px_0px_#333] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200"
              >
                Explore the library
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/categories"
                className="flex items-center gap-2 px-8 py-4 rounded-full border-2 border-[#333] text-[#333] text-[15px] bg-white no-underline shadow-[4px_5px_0px_0px_#333] hover:shadow-[2px_3px_0px_0px_#333] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200"
              >
                View categories
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Stats bar */}
      <div className="max-w-[1440px] mx-auto px-16 pb-16">
        <ScaleIn delay={0.3}>
          <div className="flex items-center gap-0 border-2 border-[#333] rounded-2xl overflow-hidden shadow-[5px_6px_0px_0px_#333]">
            {[
              { value: 27, label: "Layout patterns", color: "#2563EB" },
              { value: 3, label: "Categories", color: "#7C3AED" },
              { value: 80, label: "Components mapped", color: "#06B6D4", suffix: "+" },
              { value: 100, label: "Use cases documented", color: "#D7A94F", suffix: "+" },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className="flex-1 py-6 px-8 flex flex-col items-center text-center bg-white"
                style={{ borderLeft: i > 0 ? "2px solid #333" : "none" }}
              >
                <span
                  className="text-[30px] tracking-[-0.02em] mb-1"
                  style={{ color: stat.color, fontFamily: "'Zilla Slab', serif" }}
                >
                  <CountUp value={stat.value} suffix={stat.suffix || ""} duration={2} />
                </span>
                <span className="text-[12px] text-[#888]">{stat.label}</span>
              </div>
            ))}
          </div>
        </ScaleIn>
      </div>

      {/* Content sections */}
      {sections.map((section, sIdx) => (
        <section
          key={section.id}
          className="w-full border-t-2 border-[#333]"
          style={{ background: sIdx % 2 === 0 ? "#F8FAFC" : "#FDFEFF" }}
        >
          <div className="max-w-[1440px] mx-auto px-16 py-20">
            <div className="max-w-[720px]">
              <FadeUp delay={0} y={20}>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border-2 border-[#333] shadow-[3px_3px_0px_0px_#333] bg-white mb-6">
                  <div className="text-[#555]">{section.icon}</div>
                  <span className="text-[10px] tracking-[0.12em] uppercase text-[#555]">
                    {section.label}
                  </span>
                </div>
              </FadeUp>

              <FadeUp delay={0.1}>
                <h2
                  className="text-[34px] tracking-[0.01em] text-[#333] leading-[1.2] mb-8"
                  style={{ fontFamily: "'Zilla Slab', serif" }}
                >
                  {section.title}
                </h2>
              </FadeUp>

              <div className="flex flex-col gap-5">
                {section.content.map((paragraph, pIdx) => (
                  <FadeUp key={pIdx} delay={0.15 + pIdx * 0.1}>
                    <p className="text-[15px] text-[#777] leading-[1.85]">
                      {paragraph}
                    </p>
                  </FadeUp>
                ))}
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Feedback section */}
      <section className="w-full border-t-2 border-[#333] bg-[#F8FAFC]">
        <div className="max-w-[1440px] mx-auto px-16 py-20">
          <div className="max-w-[720px]">
            <FadeUp delay={0} y={20}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border-2 border-[#333] shadow-[3px_3px_0px_0px_#333] bg-white mb-6">
                <Mail className="w-4 h-4 text-[#555]" />
                <span className="text-[10px] tracking-[0.12em] uppercase text-[#555]">Feedback</span>
              </div>
            </FadeUp>

            <FadeUp delay={0.1}>
              <h2
                className="text-[34px] tracking-[0.01em] text-[#333] leading-[1.2] mb-6"
                style={{ fontFamily: "'Zilla Slab', serif" }}
              >
                Feedback
              </h2>
            </FadeUp>

            <FadeUp delay={0.2}>
              <p className="text-[15px] text-[#777] leading-[1.85] mb-8">
                Have suggestions for new patterns, corrections to existing ones, or ideas for how
                this library could be more useful? Feedback is always welcome.
              </p>
            </FadeUp>

            <ScaleIn delay={0.3}>
              <a
                href="mailto:design.dhaval@gmail.com"
                className="inline-flex items-center gap-4 px-6 py-5 rounded-xl border-2 border-[#333] bg-white shadow-[4px_5px_0px_0px_#333] hover:shadow-[2px_3px_0px_0px_#333] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200 no-underline group"
              >
                <div className="w-11 h-11 rounded-full bg-[#2563EB]/8 flex items-center justify-center border-2 border-[#2563EB]">
                  <Mail className="w-4 h-4 text-[#2563EB]" />
                </div>
                <div>
                  <div className="text-[15px] text-[#333] mb-0.5" style={{ fontFamily: "'Zilla Slab', serif" }}>
                    design.dhaval@gmail.com
                  </div>
                  <div className="text-[12px] text-[#999]">
                    Send suggestions, ideas, or corrections
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-[#ccc] group-hover:text-[#2563EB] transition-colors ml-4" />
              </a>
            </ScaleIn>
          </div>
        </div>
      </section>

      {/* Author section */}
      <section className="w-full border-t-2 border-[#333]">
        <div className="max-w-[1440px] mx-auto px-16 py-20">
          <div className="max-w-[720px]">
            <FadeUp delay={0} y={20}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border-2 border-[#333] shadow-[3px_3px_0px_0px_#333] bg-white mb-6">
                <User className="w-4 h-4 text-[#555]" />
                <span className="text-[10px] tracking-[0.12em] uppercase text-[#555]">Author</span>
              </div>
            </FadeUp>

            <FadeUp delay={0.1}>
              <h2
                className="text-[34px] tracking-[0.01em] text-[#333] leading-[1.2] mb-6"
                style={{ fontFamily: "'Zilla Slab', serif" }}
              >
                Author
              </h2>
            </FadeUp>

            <FadeUp delay={0.2}>
              <p className="text-[15px] text-[#777] leading-[1.85] mb-6">
                This project was created as a design exploration by <span className="text-[#333]" style={{ fontFamily: "'Zilla Slab', serif" }}>Dhaval</span> —
                an effort to understand, document, and share the interface patterns shaping how people
                interact with AI. It began as a personal study of the rapidly evolving AI product landscape
                and grew into a structured reference that others might find useful.
              </p>
            </FadeUp>

            <FadeUp delay={0.3}>
              <p className="text-[15px] text-[#777] leading-[1.85]">
                The patterns, wireframes, annotations, and documentation were designed and assembled
                as part of an ongoing interest in the intersection of interface design and artificial
                intelligence.
              </p>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* References section */}
      <section className="w-full border-t-2 border-[#333] bg-[#F8FAFC]">
        <div className="max-w-[1440px] mx-auto px-16 py-20">
          <div className="max-w-[720px]">
            <FadeUp delay={0} y={20}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border-2 border-[#333] shadow-[3px_3px_0px_0px_#333] bg-white mb-6">
                <BookOpen className="w-4 h-4 text-[#555]" />
                <span className="text-[10px] tracking-[0.12em] uppercase text-[#555]">Sources</span>
              </div>
            </FadeUp>

            <FadeUp delay={0.1}>
              <h2
                className="text-[34px] tracking-[0.01em] text-[#333] leading-[1.2] mb-4"
                style={{ fontFamily: "'Zilla Slab', serif" }}
              >
                References
              </h2>
            </FadeUp>

            <FadeUp delay={0.15}>
              <p className="text-[15px] text-[#777] leading-[1.85] mb-10">
                The patterns documented in this library are informed by the study of real-world AI
                products, established design systems, and emerging research on human-AI interaction.
              </p>
            </FadeUp>

            {/* AI Products */}
            <FadeUp delay={0.2}>
              <div className="mb-10">
                <h3
                  className="text-[18px] text-[#333] mb-3"
                  style={{ fontFamily: "'Zilla Slab', serif" }}
                >
                  AI Products
                </h3>
                <div className="w-full h-px bg-[#E2E8F0] mb-4" />
                <p className="text-[14px] text-[#777] leading-[1.8] mb-4">
                  The layout patterns in this library were observed across a range of widely adopted
                  AI-powered tools and platforms, including:
                </p>
                <ul className="flex flex-col gap-2">
                  {[
                    { name: "ChatGPT", desc: "Conversational AI assistant by OpenAI" },
                    { name: "Claude", desc: "AI assistant by Anthropic" },
                    { name: "Midjourney", desc: "AI image generation platform" },
                    { name: "Runway", desc: "AI-powered creative and video tools" },
                    { name: "Notion AI", desc: "AI-augmented workspace and knowledge management" },
                    { name: "GitHub Copilot", desc: "AI pair programming assistant" },
                    { name: "Cursor", desc: "AI-native code editor" },
                    { name: "Perplexity", desc: "AI-powered search and research tool" },
                  ].map((item) => (
                    <li key={item.name} className="flex items-baseline gap-3 text-[14px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] shrink-0 mt-[7px]" />
                      <span>
                        <span className="text-[#333]" style={{ fontFamily: "'Zilla Slab', serif" }}>
                          {item.name}
                        </span>
                        <span className="text-[#999] ml-1.5">&mdash; {item.desc}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeUp>

            {/* Design Systems & Documentation */}
            <FadeUp delay={0.25}>
              <div className="mb-10">
                <h3
                  className="text-[18px] text-[#333] mb-3"
                  style={{ fontFamily: "'Zilla Slab', serif" }}
                >
                  Design Systems & Documentation
                </h3>
                <div className="w-full h-px bg-[#E2E8F0] mb-4" />
                <p className="text-[14px] text-[#777] leading-[1.8] mb-4">
                  The component anatomy and interaction documentation draws on principles
                  and conventions established by leading design systems:
                </p>
                <ul className="flex flex-col gap-2">
                  {[
                    { name: "Material Design", desc: "Google's open-source design system" },
                    { name: "Apple Human Interface Guidelines", desc: "Apple's design principles for all platforms" },
                    { name: "IBM Design Language", desc: "IBM's unified design framework" },
                    { name: "Fluent Design System", desc: "Microsoft's cross-platform design system" },
                    { name: "Carbon Design System", desc: "IBM's open-source design system for products" },
                  ].map((item) => (
                    <li key={item.name} className="flex items-baseline gap-3 text-[14px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED] shrink-0 mt-[7px]" />
                      <span>
                        <span className="text-[#333]" style={{ fontFamily: "'Zilla Slab', serif" }}>
                          {item.name}
                        </span>
                        <span className="text-[#999] ml-1.5">&mdash; {item.desc}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeUp>

            {/* AI Interface Research */}
            <FadeUp delay={0.3}>
              <div>
                <h3
                  className="text-[18px] text-[#333] mb-3"
                  style={{ fontFamily: "'Zilla Slab', serif" }}
                >
                  AI Interface Research
                </h3>
                <div className="w-full h-px bg-[#E2E8F0] mb-4" />
                <p className="text-[14px] text-[#777] leading-[1.8] mb-4">
                  The patterns catalogued here are also informed by the broader, rapidly evolving
                  conversation around AI user experience. Key areas of influence include:
                </p>
                <ul className="flex flex-col gap-2">
                  {[
                    { name: "AI UX & Copilot Design", desc: "Emerging best practices for embedding AI assistance into existing workflows" },
                    { name: "Generative Interface Patterns", desc: "How tools for text, image, video, and code generation shape new layout paradigms" },
                    { name: "Agent-Based Systems", desc: "Multi-agent architectures and the interfaces that enable human oversight of autonomous AI" },
                    { name: "Conversational AI Research", desc: "Turn-based dialogue design, prompt engineering UX, and context management" },
                    { name: "Human-AI Collaboration", desc: "Shared canvas, co-editing, and approval-based interaction models" },
                  ].map((item) => (
                    <li key={item.name} className="flex items-baseline gap-3 text-[14px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#06B6D4] shrink-0 mt-[7px]" />
                      <span>
                        <span className="text-[#333]" style={{ fontFamily: "'Zilla Slab', serif" }}>
                          {item.name}
                        </span>
                        <span className="text-[#999] ml-1.5">&mdash; {item.desc}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full border-t-2 border-[#333] bg-[#F8FAFC]">
        <FadeUp>
          <div className="max-w-[1440px] mx-auto px-16 py-16 flex items-center justify-between">
            <div>
              <h3 className="text-[20px] text-[#333] mb-1.5" style={{ fontFamily: "'Zilla Slab', serif" }}>
                Explore all 27 patterns
              </h3>
              <p className="text-[13px] text-[#888]">
                Browse the full AI Interface Layout Library collection.
              </p>
            </div>
            <Link
              to="/"
              className="flex items-center gap-2 px-8 py-4 rounded-full bg-[#202020] text-white text-[14px] no-underline border-2 border-[#202020] shadow-[4px_5px_0px_0px_#333] hover:shadow-[2px_3px_0px_0px_#333] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200"
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