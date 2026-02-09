import { Link, useLocation } from "react-router";
import { useState, useEffect } from "react";

export function Header() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== "/") {
      window.location.href = `/#${sectionId}`;
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#faf8f5]/95 backdrop-blur-sm shadow-[0_1px_0_rgba(0,0,0,0.05)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <nav className="flex items-center justify-between py-6 md:py-8">
          <Link
            to="/"
            className="font-['Cormorant_Garamond'] text-2xl md:text-3xl tracking-tight text-[#333333] hover:opacity-70 transition-opacity"
          >
            Dhaval Shah
          </Link>

          <ul className="hidden md:flex items-center gap-8 lg:gap-12">
            <li>
              <Link
                to="/"
                className={`font-['Inter'] text-sm tracking-wide transition-colors ${
                  isActive("/")
                    ? "text-[#2a2a2a]"
                    : "text-[#7a7a7a] hover:text-[#2a2a2a]"
                }`}
              >
                Home
              </Link>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("about")}
                className="font-['Inter'] text-sm tracking-wide text-[#7a7a7a] hover:text-[#2a2a2a] transition-colors"
              >
                About
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("experience")}
                className="font-['Inter'] text-sm tracking-wide text-[#7a7a7a] hover:text-[#2a2a2a] transition-colors"
              >
                Experience
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("work")}
                className="font-['Inter'] text-sm tracking-wide text-[#7a7a7a] hover:text-[#2a2a2a] transition-colors"
              >
                Work
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("contact")}
                className="font-['Inter'] text-sm tracking-wide text-[#7a7a7a] hover:text-[#2a2a2a] transition-colors"
              >
                Contact
              </button>
            </li>
          </ul>

          {/* Mobile menu */}
          <div className="md:hidden">
            <button className="font-['Inter'] text-sm text-[#7a7a7a] hover:text-[#2a2a2a] transition-colors">
              Menu
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}