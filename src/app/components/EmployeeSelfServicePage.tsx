import { Link } from "react-router";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";

export function EmployeeSelfServicePage() {
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
            Employee Self Service
          </h1>
          <p className="font-['Inter'] text-lg md:text-xl text-[#5a5a5a] max-w-3xl">
            Mobile-first employee portal enabling HR task completion anytime, anywhere.
          </p>
        </div>
      </section>

      {/* Image */}
      <section className="py-8 md:py-12">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1609921133942-9e485ac26bc8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBpbnRlcmZhY2UlMjBoYW5kc3xlbnwxfHx8fDE3NzAwNDUxNjN8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Mobile app interface"
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
                Modern employees expect to manage HR tasks on their own time, using their own devices. Yet traditional enterprise HR systems were built for desktop-only access during business hours, creating friction for both employees and HR teams who field routine requests that could be self-service.
              </p>
              <p>
                The challenge was to transform a desktop-first portal into a mobile-native experience without sacrificing functionality or security. This meant rethinking workflows designed for large screens and mouse interactions, while ensuring data privacy and compliance across personal devices.
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
                As Senior UX Manager, I led the mobile-first redesign of the employee self-service platform, working across product, engineering, and security teams. I established the mobile design strategy, prioritized features for the initial mobile release, and ensured the experience felt native rather than like a responsive adaptation.
              </p>
              <p>
                I managed a distributed design team across time zones and facilitated alignment between stakeholders with competing priorities—security teams focused on data protection, product managers focused on feature parity, and employees focused on simplicity and speed.
              </p>
            </div>
          </div>

          {/* Focus Areas */}
          <div>
            <h2 className="font-['Cormorant_Garamond'] text-3xl md:text-4xl text-[#2a2a2a] mb-6">
              Focus Areas
            </h2>
            <div className="space-y-6 font-['Inter'] text-base leading-relaxed text-[#5a5a5a]">
              <div>
                <h3 className="font-['Inter'] font-semibold text-[#2a2a2a] mb-2">
                  Mobile-First Workflows
                </h3>
                <p>
                  Redesigned core tasks like time-off requests, pay stub access, and benefit enrollment for thumb-friendly interactions and minimal cognitive load. Each workflow was optimized for completion in under 3 taps.
                </p>
              </div>
              <div>
                <h3 className="font-['Inter'] font-semibold text-[#2a2a2a] mb-2">
                  Personalized Dashboard
                </h3>
                <p>
                  Created an intelligent home screen that surfaces relevant actions based on employee context—upcoming reviews, pending approvals, or important deadlines—reducing the need to navigate through menus.
                </p>
              </div>
              <div>
                <h3 className="font-['Inter'] font-semibold text-[#2a2a2a] mb-2">
                  Progressive Feature Access
                </h3>
                <p>
                  Established a clear prioritization framework for determining which features belonged on mobile versus desktop. Not everything needed to be mobile; we focused on high-frequency, time-sensitive tasks first.
                </p>
              </div>
              <div>
                <h3 className="font-['Inter'] font-semibold text-[#2a2a2a] mb-2">
                  Secure Authentication UX
                </h3>
                <p>
                  Balanced security requirements with usability by implementing biometric authentication and smart session management, reducing login friction while maintaining enterprise-grade security standards.
                </p>
              </div>
            </div>
          </div>

          {/* Outcome */}
          <div>
            <h2 className="font-['Cormorant_Garamond'] text-3xl md:text-4xl text-[#2a2a2a] mb-6">
              Outcome
            </h2>
            <div className="space-y-4 font-['Inter'] text-base leading-relaxed text-[#5a5a5a]">
              <p>
                The mobile-first redesign dramatically increased employee self-service adoption and reduced HR support tickets for routine requests. Employees gained the flexibility to manage HR tasks during off-hours, improving overall satisfaction and work-life balance.
              </p>
              <p>
                The design system and patterns developed for mobile became the foundation for the organization's broader mobile strategy, influencing how other enterprise products approach mobile experiences. The work demonstrated that enterprise software could deliver consumer-grade usability without compromising on functionality or security.
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
