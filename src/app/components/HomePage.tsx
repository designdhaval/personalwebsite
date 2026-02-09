import { Link } from "react-router";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";

export function HomePage() {
  return (
    <div className="bg-[#faf8f5]">
      {/* Hero Section */} 
      <section className="min-h-screen flex items-center pt-24 md:pt-0">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 w-full">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            <div className="max-w-2xl">
              <p className="font-['Inter'] text-xs uppercase tracking-[0.2em] text-[#a8a8a8] mb-6">
                Senior UX Manager — 18+ Years Experience
              </p>
              <h1 className="font-['Cormorant_Garamond'] text-5xl md:text-6xl lg:text-7xl leading-[1.1] text-[#006A4E] mb-8">
              Leading design strategy and execution for complex enterprise products.
              </h1>
              <p className="font-['Inter'] text-base md:text-lg leading-relaxed text-[#5a5a5a] mb-8">
                I'm Dhaval Shah, a Senior UX Manager with 18+ years of experience leading enterprise-scale products across HRTech, FinTech, and data-heavy platforms.
              </p>
              <div className="flex gap-4">
                <a
                  href="#contact"
                  className="inline-block px-8 py-4 bg-[#2a2a2a] text-[#faf8f5] font-['Inter'] text-sm tracking-wide hover:bg-[#006a4e] transition-colors"
                >
                  Get in Touch
                </a>
              </div>
            </div>
            
            <div className="relative h-[500px] md:h-[600px]">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1617015660203-d3a8c9b2888d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcmNoaXRlY3R1cmUlMjBtaW5pbWFsJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzcwMDI2OTk0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Modern architectural space"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 md:py-32 bg-[#f4f2ed]">
        <div className="max-w-[900px] mx-auto px-6 md:px-12">
          <h2 className="font-['Cormorant_Garamond'] text-4xl md:text-5xl leading-tight text-[#2a2a2a] mb-12">
            Leading UX through complexity, scale, and real-world constraints
          </h2>
          
          <div className="space-y-6 font-['Inter'] text-base md:text-lg leading-relaxed text-[#5a5a5a]">
            <p>
              Over the past 18+ years, I've worked on enterprise products where UX is shaped by scale, regulation, legacy systems, and organizational complexity—not just screens and interactions.
            </p>
            <p>
              My role goes beyond design execution. I focus on setting UX direction, aligning teams across design, engineering, and product, and helping organizations move from fragmented experiences to cohesive, usable systems.
            </p>
            <p>
              This work requires balancing user needs, business priorities, and technical realitieswhile ensuring teams can design, build, and ship with clarity and confidence.
            </p>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24 md:py-32 bg-[#faf8f5]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <h2 className="font-['Cormorant_Garamond'] text-4xl md:text-5xl text-[#2a2a2a] mb-16">
            Experience
          </h2>
          
          <div className="space-y-12 md:space-y-16">
            <div className="grid md:grid-cols-[200px_1fr] gap-6 md:gap-12">
              <div>
                <p className="font-['Inter'] text-sm text-[#a8a8a8] uppercase tracking-wide">
                  May 2022 — Present
                </p>
              </div>
              <div>
                <h3 className="font-['Cormorant_Garamond'] text-2xl md:text-3xl text-[#2a2a2a] mb-3">
                  Senior UX Manager
                </h3>
                <p className="font-['Inter'] text-lg text-[#5a5a5a] mb-4">
                  Neeyamo Enterprise Solutions
                </p>
                <ul className="font-['Inter'] text-base leading-relaxed text-[#7a7a7a] space-y-2">
                  <li>Leading UX strategy for global HR, Payroll, Compliance, Time & Attendance, and Employee Self Service platforms serving enterprise-scale users.</li>
                  <li>Driving design systems, UX governance, and AI-assisted design workflows to improve quality and delivery speed.</li>
                  <li>Partnering closely with product, engineering, and business leadership to align UX outcomes with business goals.</li>
                  <li>Mentoring and scaling UX teams while improving design maturity across the organization.</li>
                </ul>
              </div>
            </div>

            <div className="grid md:grid-cols-[200px_1fr] gap-6 md:gap-12">
              <div>
                <p className="font-['Inter'] text-sm text-[#a8a8a8] uppercase tracking-wide">
                  Mar 2021 — May 2022
                </p>
              </div>
              <div>
                <h3 className="font-['Cormorant_Garamond'] text-2xl md:text-3xl text-[#2a2a2a] mb-3">
                  Lead UX Designer
                </h3>
                <p className="font-['Inter'] text-lg text-[#5a5a5a] mb-4">
                  Xoriant Solutions
                </p>
                <ul className="font-['Inter'] text-base leading-relaxed text-[#7a7a7a] space-y-2">
                  <li>Directed UX strategy for complex enterprise and R&D-focused products.</li>
                  <li>Led user research, interaction design, and stakeholder collaboration across global teams.</li>
                  <li>Helped realign products through data-driven UX decisions.</li>
                </ul>
              </div>
            </div>

            <div className="grid md:grid-cols-[200px_1fr] gap-6 md:gap-12">
              <div>
                <p className="font-['Inter'] text-sm text-[#a8a8a8] uppercase tracking-wide">
                  Aug 2019 — Oct 2020
                </p>
              </div>
              <div>
                <h3 className="font-['Cormorant_Garamond'] text-2xl md:text-3xl text-[#2a2a2a] mb-3">
                  UX Lead
                </h3>
                <p className="font-['Inter'] text-lg text-[#5a5a5a] mb-4">
                  Talkd Pvt Ltd
                </p>
                <ul className="font-['Inter'] text-base leading-relaxed text-[#7a7a7a] space-y-2">
                  <li>Led end-to-end UX for enterprise and aviation-related products.</li>
                  <li>Improved information architecture and workflows to reduce user effort and training time.</li>
                </ul>
              </div>
            </div>

            <div className="grid md:grid-cols-[200px_1fr] gap-6 md:gap-12">
              <div>
                <p className="font-['Inter'] text-sm text-[#a8a8a8] uppercase tracking-wide">
                  Sept 2014 — Aug 2019
                </p>
              </div>
              <div>
                <h3 className="font-['Cormorant_Garamond'] text-2xl md:text-3xl text-[#2a2a2a] mb-3">
                  Senior UX Designer
                </h3>
                <p className="font-['Inter'] text-lg text-[#5a5a5a] mb-4">
                  Xoriant Solutions
                </p>
                <ul className="font-['Inter'] text-base leading-relaxed text-[#7a7a7a] space-y-2">
                  <li>Designed and delivered UX solutions across fintech, data science, insurance, and enterprise platforms.</li>
                  <li>Worked closely with engineering teams to ensure feasibility and high-quality execution.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="py-24 md:py-32 bg-[#f4f2ed]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <h2 className="font-['Cormorant_Garamond'] text-4xl md:text-5xl text-[#2a2a2a] mb-16">
            Expertise
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 md:gap-16">
            <div>
              <h3 className="font-['Cormorant_Garamond'] text-2xl md:text-3xl text-[#2a2a2a] mb-4">
                AI-Driven UX & Design Operations
              </h3>
              <p className="font-['Inter'] text-base leading-relaxed text-[#7a7a7a]">
                Integrating AI and LLM-powered workflows into UX practice to accelerate research, prototyping, audits, and decision-making—while maintaining human judgment, quality, and accountability.
              </p>
            </div>

            <div>
              <h3 className="font-['Cormorant_Garamond'] text-2xl md:text-3xl text-[#2a2a2a] mb-4">
                Enterprise UX
              </h3>
              <p className="font-['Inter'] text-base leading-relaxed text-[#7a7a7a]">
                Designing and leading UX for complex, business-critical systems across HR, payroll, finance, and compliance—where scale, accuracy, and operational clarity are essential.
              </p>
            </div>

            <div>
              <h3 className="font-['Cormorant_Garamond'] text-2xl md:text-3xl text-[#2a2a2a] mb-4">
                Design Systems
              </h3>
              <p className="font-['Inter'] text-base leading-relaxed text-[#7a7a7a]">
                Building scalable component libraries, design tokens, and governance models that help teams move faster while maintaining consistency, quality, and long-term maintainability.
              </p>
            </div>

            <div>
              <h3 className="font-['Cormorant_Garamond'] text-2xl md:text-3xl text-[#2a2a2a] mb-4">
                UX Leadership & Team Enablement
              </h3>
              <p className="font-['Inter'] text-base leading-relaxed text-[#7a7a7a]">
                Leading and mentoring cross-functional teams across design, product, and engineering—helping organizations improve UX maturity, collaboration, and delivery at scale.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Work Preview Section */}
      <section id="work" className="py-24 md:py-32 bg-[#faf8f5]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="flex justify-between items-end mb-16">
            <h2 className="font-['Cormorant_Garamond'] text-4xl md:text-5xl text-[#2a2a2a]">
              Selected Work
            </h2>
          </div>
          
          <div className="space-y-8">
            <Link to="https://www.behance.net/designdhaval" target="_blank" className="block py-6 border-b border-[#e5e3df] hover:bg-[#f5f3f0] transition-colors">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-['Cormorant_Garamond'] text-2xl md:text-3xl text-[#2a2a2a] mb-2">
                    Behance portfolio link
                  </h3>
                  <p className="font-['Inter'] text-sm text-[#7a7a7a]">
                    Visit my Behance portfolio for past work
                  </p>
                </div>
              </div>
            </Link>
          </div>
          <div className="space-y-8">
            <Link to="#" className="block py-6 border-b border-[#e5e3df] hover:bg-[#f5f3f0] transition-colors">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-['Cormorant_Garamond'] text-2xl md:text-3xl text-[#2a2a2a] mb-2">
                    Global Payroll
                  </h3>
                  <p className="font-['Inter'] text-sm text-[#7a7a7a]">
                    Next-generation payroll experience for enterprise clients
                  </p>
                </div>
              </div>
            </Link> 

            <Link to="#" className="block py-6 border-b border-[#e5e3df] hover:bg-[#f5f3f0] transition-colors">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-['Cormorant_Garamond'] text-2xl md:text-3xl text-[#2a2a2a] mb-2">
                    Compliance
                  </h3>
                  <p className="font-['Inter'] text-sm text-[#7a7a7a]">
                    Real-time regulatory compliance monitoring
                  </p>
                </div>
              </div>
            </Link>

            <Link to="#" className="block py-6 border-b border-[#e5e3df] hover:bg-[#f5f3f0] transition-colors">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-['Cormorant_Garamond'] text-2xl md:text-3xl text-[#2a2a2a] mb-2">
                    Employee Self Service
                  </h3>
                  <p className="font-['Inter'] text-sm text-[#7a7a7a]">
                    Mobile-first employee portal for HR tasks
                  </p>
                </div>
              </div>
            </Link>

            <Link to="#" className="block py-6 border-b border-[#e5e3df] hover:bg-[#f5f3f0] transition-colors">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-['Cormorant_Garamond'] text-2xl md:text-3xl text-[#2a2a2a] mb-2">
                    Time & Absence
                  </h3>
                  <p className="font-['Inter'] text-sm text-[#7a7a7a]">
                    Enterprise time tracking and absence management
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* How I Work Section */}
      <section className="py-24 md:py-32 bg-[#f4f2ed]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            <div>
              <h2 className="font-['Cormorant_Garamond'] text-4xl md:text-5xl leading-tight text-[#2a2a2a] mb-8">
                How I Work
              </h2>
              
              <div className="space-y-6 font-['Inter'] text-base leading-relaxed text-[#5a5a5a]">
                <p>
                  I believe great design emerges from deep collaboration. My process starts with understanding the problem space—talking to users, analyzing data, and aligning stakeholders on shared goals.
                </p>
                <p>
                  I advocate for early prototyping and continuous validation. Rather than perfect mockups in isolation, I prefer iterative design with regular feedback loops from users and engineering teams.
                </p>
                <p>
                  Documentation and systems thinking are central to my approach. Every decision should be explainable, every pattern reusable, and every experience cohesive.
                </p>
              </div>
            </div>

            <div className="relative h-[400px] md:h-[500px]">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1727949238080-8f3355c0613b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMHdvcmtzcGFjZSUyMGRlc2lnbiUyMG5ldXRyYWx8ZW58MXx8fHwxNzcwMDI2OTk0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Abstract workspace design"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Thinking / Innovation Section */}
      <section className="py-24 md:py-32 bg-[#faf8f5]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            <div className="relative h-[400px] md:h-[500px] order-2 md:order-1">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1760712491426-ef0e797b8c52?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwZGVzayUyMHNldHVwJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc3MDAyNjk5NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Professional workspace"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="order-1 md:order-2">
              <h2 className="font-['Cormorant_Garamond'] text-4xl md:text-5xl leading-tight text-[#2a2a2a] mb-8">
                Innovation Through Constraints
              </h2>
              
              <div className="space-y-6 font-['Inter'] text-base leading-relaxed text-[#5a5a5a]">
                <p>
                  Enterprise software often operates under significant constraints—legacy systems, regulatory requirements, diverse user needs. I view these not as limitations but as opportunities to innovate meaningfully.
                </p>
                <p>
                  Some of my best work has come from finding elegant solutions within tight boundaries. It's about making the complex feel simple, the necessary feel delightful.
                </p>
                <p>
                  I regularly write and speak about design systems, UX strategy, and the evolving role of design in enterprise organizations. I'm passionate about elevating design maturity across the industry.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 md:py-32 bg-[#f4f2ed]">
        <div className="max-w-[900px] mx-auto px-6 md:px-12 text-center">
          <h2 className="font-['Cormorant_Garamond'] text-4xl md:text-6xl leading-tight text-[#2a2a2a] mb-6">
            Let's talk
          </h2>
          <p className="font-['Inter'] text-base md:text-lg leading-relaxed text-[#5a5a5a] mb-12 max-w-2xl mx-auto">
            I'm always interested in new opportunities, collaborations, or conversations about design systems and enterprise UX. Drop me a line.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:design.dhaval@gmail.com"
              className="inline-block px-10 py-5 bg-[#2a2a2a] text-[#faf8f5] font-['Inter'] text-sm tracking-wide hover:bg-[#006a4e] transition-colors"
            >
              Email Me
            </a>
            <a
              href="https://www.linkedin.com/in/designdhaval/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-10 py-5 border border-[#2a2a2a] text-[#2a2a2a] font-['Inter'] text-sm tracking-wide hover:bg-[#006a4e] hover:text-[#faf8f5] hover:border-[#006a4e] transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}