import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";

export function WorkPage() {
  return (
    <div className="bg-[#faf8f5] pt-32 md:pt-40">
      {/* Work Intro */}
      <section className="pb-24 md:pb-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="max-w-[900px]">
            <h1 className="font-['Cormorant_Garamond'] text-5xl md:text-6xl lg:text-7xl leading-[1.1] text-[#2a2a2a] mb-8">
              Selected Work
            </h1>
            <p className="font-['Inter'] text-base md:text-lg leading-relaxed text-[#5a5a5a]">
              A collection of recent projects spanning enterprise software, design systems, and product innovation. Each represents a unique challenge in simplifying complexity for end users.
            </p>
          </div>
        </div>
      </section>

      {/* Project 1: Global Payroll */}
      <section className="pb-24 md:pb-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <h2 className="font-['Cormorant_Garamond'] text-3xl md:text-4xl lg:text-5xl text-[#2a2a2a]">
                Global Payroll
              </h2>
              <span className="font-['Inter'] text-sm text-[#a8a8a8]">2024</span>
            </div>
            <p className="font-['Inter'] text-base md:text-lg text-[#7a7a7a] max-w-3xl">
              Redesigning the core payroll experience for enterprise clients processing millions of paychecks monthly
            </p>
          </div>

          <div className="relative w-full aspect-[16/10] mb-8">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1761593280919-766a4acbcfca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBkYXNoYm9hcmQlMjBpbnRlcmZhY2UlMjBkZXNpZ258ZW58MXx8fHwxNzcwMDE4MTI3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Payroll dashboard interface"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-12 md:gap-16">
            <div>
              <h3 className="font-['Cormorant_Garamond'] text-xl md:text-2xl text-[#2a2a2a] mb-4">
                Challenge
              </h3>
              <p className="font-['Inter'] text-base leading-relaxed text-[#5a5a5a]">
                The legacy payroll system had grown organically over 15 years, resulting in a fragmented experience with inconsistent patterns and steep learning curves. Users needed extensive training to perform routine tasks.
              </p>
            </div>
            <div>
              <h3 className="font-['Cormorant_Garamond'] text-xl md:text-2xl text-[#2a2a2a] mb-4">
                Outcome
              </h3>
              <p className="font-['Inter'] text-base leading-relaxed text-[#5a5a5a]">
                Launched a unified platform that reduced average task completion time by 60%. Established a comprehensive design system with 120+ components, now used across the entire product suite. User satisfaction scores increased from 6.2 to 8.7.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Project 2: Compliance Dashboard */}
      <section className="pb-24 md:pb-32 bg-[#f4f2ed]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16">
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <h2 className="font-['Cormorant_Garamond'] text-3xl md:text-4xl lg:text-5xl text-[#2a2a2a]">
                Compliance Dashboard
              </h2>
              <span className="font-['Inter'] text-sm text-[#a8a8a8]">2023</span>
            </div>
            <p className="font-['Inter'] text-base md:text-lg text-[#7a7a7a] max-w-3xl">
              Real-time monitoring system for regulatory compliance across 50+ jurisdictions
            </p>
          </div>

          <div className="relative w-full aspect-[16/10] mb-8">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1759661966728-4a02e3c6ed91?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGFuYWx5dGljcyUyMGRhdGElMjB2aXN1YWxpemF0aW9ufGVufDF8fHx8MTc3MDAyNzA3MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Compliance analytics dashboard"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-12 md:gap-16">
            <div>
              <h3 className="font-['Cormorant_Garamond'] text-xl md:text-2xl text-[#2a2a2a] mb-4">
                Challenge
              </h3>
              <p className="font-['Inter'] text-base leading-relaxed text-[#5a5a5a]">
                Compliance officers needed to monitor hundreds of changing regulations across multiple regions. The existing tools required switching between disparate systems and manual cross-referencing of data.
              </p>
            </div>
            <div>
              <h3 className="font-['Cormorant_Garamond'] text-xl md:text-2xl text-[#2a2a2a] mb-4">
                Outcome
              </h3>
              <p className="font-['Inter'] text-base leading-relaxed text-[#5a5a5a]">
                Created a unified dashboard with intelligent alerts, trend visualization, and contextual guidance. The system now processes 10,000+ compliance checks daily, helping clients avoid $50M+ in potential penalties during the first year.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Project 3: Employee Self Service */}
      <section className="pb-24 md:pb-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <h2 className="font-['Cormorant_Garamond'] text-3xl md:text-4xl lg:text-5xl text-[#2a2a2a]">
                Employee Self Service
              </h2>
              <span className="font-['Inter'] text-sm text-[#a8a8a8]">2023</span>
            </div>
            <p className="font-['Inter'] text-base md:text-lg text-[#7a7a7a] max-w-3xl">
              Mobile-first portal empowering employees to manage HR tasks independently
            </p>
          </div>

          <div className="relative w-full aspect-[16/10] mb-8">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1713857297379-6fc26e70f581?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBpbnRlcmZhY2UlMjBtb2Rlcm58ZW58MXx8fHwxNzY5OTY1MjE2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Mobile employee self-service app"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-12 md:gap-16">
            <div>
              <h3 className="font-['Cormorant_Garamond'] text-xl md:text-2xl text-[#2a2a2a] mb-4">
                Challenge
              </h3>
              <p className="font-['Inter'] text-base leading-relaxed text-[#5a5a5a]">
                Frontline workers without desk access struggled to complete basic HR tasks like time-off requests, benefit changes, and pay stub access. HR departments were overwhelmed with routine requests.
              </p>
            </div>
            <div>
              <h3 className="font-['Cormorant_Garamond'] text-xl md:text-2xl text-[#2a2a2a] mb-4">
                Outcome
              </h3>
              <p className="font-['Inter'] text-base leading-relaxed text-[#5a5a5a]">
                Launched a mobile app with offline capabilities and biometric authentication. HR ticket volume decreased by 70%, and employee engagement scores improved significantly. The app maintains a 4.7-star rating across app stores.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Project 4: Time & Absence */}
      <section className="pb-24 md:pb-32 bg-[#f4f2ed]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16">
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <h2 className="font-['Cormorant_Garamond'] text-3xl md:text-4xl lg:text-5xl text-[#2a2a2a]">
                Time & Absence
              </h2>
              <span className="font-['Inter'] text-sm text-[#a8a8a8]">2022</span>
            </div>
            <p className="font-['Inter'] text-base md:text-lg text-[#7a7a7a] max-w-3xl">
              Intelligent time tracking and absence management for distributed teams
            </p>
          </div>

          <div className="relative w-full aspect-[16/10] mb-8">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1764123108291-0f48d2c7e563?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbnRlcnByaXNlJTIwc29mdHdhcmUlMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzcwMDI3MDcxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Time tracking workspace interface"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-12 md:gap-16">
            <div>
              <h3 className="font-['Cormorant_Garamond'] text-xl md:text-2xl text-[#2a2a2a] mb-4">
                Challenge
              </h3>
              <p className="font-['Inter'] text-base leading-relaxed text-[#5a5a5a]">
                Organizations with complex scheduling needs across multiple time zones and labor laws struggled with fragmented time tracking systems. Manual processes led to payroll errors and compliance risks.
              </p>
            </div>
            <div>
              <h3 className="font-['Cormorant_Garamond'] text-xl md:text-2xl text-[#2a2a2a] mb-4">
                Outcome
              </h3>
              <p className="font-['Inter'] text-base leading-relaxed text-[#5a5a5a]">
                Designed an adaptive scheduling system with intelligent conflict detection and automated compliance checks. Payroll accuracy improved by 95%, and managers reported 8 hours saved per week on scheduling tasks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* NDA Note */}
      <section className="pb-24 md:pb-32">
        <div className="max-w-[900px] mx-auto px-6 md:px-12">
          <div className="py-12 px-8 md:px-12 bg-[#f4f2ed] border-l-2 border-[#c9c7c1]">
            <p className="font-['Inter'] text-sm leading-relaxed text-[#7a7a7a] italic">
              Due to confidentiality agreements, certain project details, metrics, and visual materials have been generalized or modified. I'm happy to discuss methodologies, processes, and outcomes in more detail during a conversation.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="pb-32 md:pb-40">
        <div className="max-w-[900px] mx-auto px-6 md:px-12 text-center">
          <h2 className="font-['Cormorant_Garamond'] text-4xl md:text-5xl lg:text-6xl leading-tight text-[#2a2a2a] mb-6">
            Interested in working together?
          </h2>
          <p className="font-['Inter'] text-base md:text-lg leading-relaxed text-[#5a5a5a] mb-10">
            Let's discuss how thoughtful design can drive your product forward.
          </p>
          <a
            href="mailto:dhaval@example.com"
            className="inline-block px-10 py-5 bg-[#2a2a2a] text-[#faf8f5] font-['Inter'] text-sm tracking-wide hover:bg-[#3a3a3a] transition-colors"
          >
            Let's Talk
          </a>
        </div>
      </section>
    </div>
  );
}