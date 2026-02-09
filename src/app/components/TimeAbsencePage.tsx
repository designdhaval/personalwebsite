import { Link } from "react-router";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import timeheroImage from "../../assets/time.png";

export function TimeAbsencePage() {
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
            Time & Absence
          </h1>
          <p className="font-['Inter'] text-lg md:text-xl text-[#5a5a5a] max-w-3xl">
            Enterprise time and absence experience designed to balance flexibility, control, and compliance.
          </p>
        </div>
      </section>

      {/* Image */}
      <section className="py-8 md:py-12">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <ImageWithFallback
            src={timeheroImage} 
            alt="Time management workspace"
            className="w-full h-[400px] md:h-[500px] object-cover"
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
                Time and absence management in global organizations is shaped by local labor laws, varied policies, and diverse work patterns. Employees need intuitive ways to record time and request leave, while managers and HR require visibility, accuracy, and compliance confidence.
              </p>
              <p>
                The existing experience was fragmented across modules, making it difficult for users to understand priorities, track exceptions, or manage approvals efficiently.
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
                Led UX strategy and product design for Time & Absence, working closely with product, engineering, and HR stakeholders.
              </p>
              <p>
                Focused on defining a unified experience model across roles, simplifying complex workflows, and ensuring tight integration with payroll and compliance systems.
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
                • Unified role-based dashboards for employees, managers, and HR
              </p>
              <p>
                • Simplified time and leave workflows with contextual validation
              </p>
              <p>
                • Consolidated approval experience to reduce delays and ambiguity
              </p>
              <p>
                • Clear visibility into schedules, exceptions, and balances
              </p>
              <p>
                • Seamless integration with Payroll to maintain data accuracy and trust
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
                • ↓ 35% faster approval turnaround time for managers
              </p>
              <p>
                • ↑ 40–45% increase in task completion rate across employee and manager flows
              </p>
              <p>
                • 🌍 50+ countries successfully onboarded
              </p>
              <p>
                • 🏢 100+ enterprise clients migrated to the new experience
              </p>
              <p>
                • ↑ Increased adoption driven by reduced friction and clearer workflows
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