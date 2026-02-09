import { Link } from "react-router";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import complianceheroImage from "../../assets/compliance.png";

export function CompliancePage() {
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
            Compliance
          </h1>
          <p className="font-['Inter'] text-lg md:text-xl text-[#5a5a5a] max-w-3xl">
            Enterprise compliance platform transforming regulation into actionable intelligence.
          </p>
        </div>
      </section>

      {/* Image */}
      <section className="py-8 md:py-12">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <ImageWithFallback
            src={complianceheroImage} 
            alt="Business compliance documentation"
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
                Global compliance management is one of the most complex and risk-sensitive domains in enterprise HR. Organizations must track evolving regulations across countries, clients, and enforcement bodies—often relying on fragmented tools and manual processes.
              </p>
              <p>
                The existing experience lacked visibility and prioritization, and made it difficult for teams to understand compliance health, identify risks early, or act decisively across roles.
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
                Led UX strategy and product design for the Compliance platform, working closely with HR, Legal, Product, and Engineering teams.
              </p>
              <p>
                Focused on designing a role-based experience that centralizes compliance data, embeds intelligence into workflows, and enables faster, more confident decision-making at scale.
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
                • Centralized compliance visibility across countries and clients
              </p>
              <p>
                • Role-based workflows for Admins, Managers, Processors, and Auditors
              </p>
              <p>
                • AI-assisted compliance intelligence to reduce manual effort and surface risk
              </p>
              <p>
                • Actionable dashboards prioritizing status, delays, and high-risk areas
              </p>
              <p>
                • Configurable global experience that adapts to local regulations without fragmentation
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
                • ↓ 40% reduction in manual compliance and act entry effort
              </p>
              <p>
                • ↓ 30% faster audit cycles through clearer prioritization and predictive alerts
              </p>
              <p>
                • 🌍 100+ countries supported within a unified experience
              </p>
              <p>
                • ↑ Higher adoption across HR and Legal teams driven by improved visibility and trust
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