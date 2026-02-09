export function Footer() {
  return (
    <footer className="bg-[#faf8f5] border-t border-[#e5e3df]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
            <p className="font-['Cormorant_Garamond'] text-2xl text-[#2a2a2a] mb-2">
              Dhaval Shah
            </p>
            <p className="font-['Inter'] text-sm text-[#7a7a7a]">
              Senior UX Manager
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6 md:gap-10">
            <a 
              href="https://www.linkedin.com/in/designdhaval/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-['Inter'] text-sm text-[#7a7a7a] hover:text-[#006a4e] transition-colors"
            >
              LinkedIn
            </a>
            <a 
              href="mailto:design.dhaval@gmail.com"
              className="font-['Inter'] text-sm text-[#7a7a7a] hover:text-[#006a4e] transition-colors"
            >
              Email
            </a>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-[#e5e3df]">
          <p className="font-['Inter'] text-xs text-[#a8a8a8]">
            © {new Date().getFullYear()} Dhaval Shah. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}