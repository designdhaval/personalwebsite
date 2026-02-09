import { Link } from "react-router";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import heroImage from "../../assets/payroll.png";

export function PayrollPage() {
  return (
    <div className="min-h-screen bg-[#faf8f5]">
      {/* Header spacing */}
      <div className="h-24 md:h-32" />

      {/* Hero Section */}
      <section className="py-12 md:py-16">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <Link
            to="/#work"
            className="inline-flex items-center gap-2 font-['Inter'] text-sm text-[#7a7a7a] hover:text-[#2a2a2a] transition-colors mb-8"
          >
            <span>←</span> Back to work
          </Link>

          <h1 className="font-['Cormorant_Garamond'] text-5xl md:text-7xl text-[#2a2a2a] mb-6">
            Global Payroll
          </h1>
          <p className="font-['Inter'] text-lg md:text-xl text-[#5a5a5a] max-w-3xl">
            Autonomous global payroll experience designed for scale, clarity, and compliance.
          </p>
        </div>
      </section>

      {/* Image */}
      <section className="py-8 md:py-12">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <ImageWithFallback
            src={heroImage}
            alt="Global payroll map showing India, Germany, and Africa"
            className="w-full h-[200px] md:h-[800px] object-cover"
          />
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-16 md:py-24">
        <div className="max-w-[900px] mx-auto px-6 md:px-12 space-y-20">
          {/* Context */}
          <div>
            <h2 className="font-['Cormorant_Garamond'] text-3xl md:text-4xl text-[#2a2a2a] mb-6">
              Context
            </h2>
            <div className="space-y-4 font-['Inter'] text-base leading-relaxed text-[#5a5a5a]">
              <p>
                Enterprise payroll is a high-risk, compliance-driven workflow where usability directly impacts accuracy, speed, and trust. At scale, administrators manage complex rules, integrations, and edge cases under strict timelines—often with limited guidance.
              </p>
              <p>
                The goal was to simplify end-to-end payroll processing without compromising regulatory control or operational safety.
              </p>
            </div>
          </div>

          {/* My Role */}
          <div>
            <h2 className="font-['Cormorant_Garamond'] text-3xl md:text-4xl text-[#2a2a2a] mb-6">
              My Role
            </h2>
            <div className="space-y-4 font-['Inter'] text-base leading-relaxed text-[#5a5a5a]">
              <p>
                Led UX strategy and product design for Global Payroll, working across product, engineering, compliance, and security teams.
              </p>
              <p>
                Responsible for defining the experience model, guiding design decisions for complex workflows, and mentoring a team of product designers.
              </p>
            </div>
          </div>

          {/* Focus Areas */}
          <div>
            <h2 className="font-['Cormorant_Garamond'] text-3xl md:text-4xl text-[#2a2a2a] mb-6">
              UX Focus Areas
            </h2>
            <div className="space-y-6 font-['Inter'] text-base leading-relaxed text-[#5a5a5a]">
              <p>
                • Guided payroll workflows to reduce cognitive load and clarify task progression
              </p>
              <p>
                • In-flow compliance validation to surface issues at the right moment
              </p>
              <p>
                • Actionable admin dashboards prioritising status, exceptions, and risk
              </p>
              <p>
                • Mobile-first employee self-service for faster access and issue resolution
              </p>
              <p>
                • Visible trust and security cues to reinforce confidence in sensitive flows
              </p>
            </div>
          </div>

          {/* Outcome */}
          <div>
            <h2 className="font-['Cormorant_Garamond'] text-3xl md:text-4xl text-[#2a2a2a] mb-6">
              UX Impact
            </h2>
            <div className="space-y-4 font-['Inter'] text-base leading-relaxed text-[#5a5a5a]">
              <p>
                • ↓ 40–50% reduction in payroll processing errors
              </p>
              <p>
                • ↓ ~30% faster end-to-end payroll completion time
              </p>
              <p>
                • ↓ ~25% reduction in support tickets related to payroll runs
              </p>
              <p>
                • ↑ Faster onboarding for new payroll administrators
              </p>
              <p className="text-sm text-[#a8a8a8] mt-6">
                Metrics are directional and representative; detailed figures are shared privately.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Spacing */}
      <div className="h-24" />
    </div>
  );
}