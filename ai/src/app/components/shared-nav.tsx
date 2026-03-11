import { Sparkles } from "lucide-react";
import { Link } from "react-router";

export function SharedNav() {
  return (
    <nav className="w-full border-b-2 border-[#333] sticky top-0 bg-[#FDFEFF]/95 backdrop-blur-md z-50">
      <div className="max-w-[1440px] mx-auto px-16 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center border-2 border-[#333] shadow-[3px_3px_0px_0px_#333]"
            style={{ background: "linear-gradient(135deg, #2563EB, #7C3AED)" }}
          >
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span
            className="text-[17px] tracking-[0.02em] text-[#333]"
            style={{ fontFamily: "'Zilla Slab', serif" }}
          >
            AI Layout Library
          </span>
        </Link>
        <div className="flex items-center gap-8">
          {[
            { to: "/#patterns", label: "Patterns" },
            { to: "/categories", label: "Categories" },
            { to: "/timeline", label: "Timeline" },
            { to: "/decision-guide", label: "Decision Guide" },
            { to: "/diagram-system", label: "Diagrams" },
            { to: "/about", label: "About" },
          ].map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-[13px] text-[#555] hover:text-[#202020] transition-colors"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

export function SharedFooter() {
  return (
    <footer className="w-full border-t-2 border-[#333] bg-[#FDFEFF]">
      <div className="max-w-[1440px] mx-auto px-16 py-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center border-2 border-[#333] shadow-[2px_2px_0px_0px_#333]"
            style={{ background: "linear-gradient(135deg, #2563EB, #7C3AED)" }}
          >
            <Sparkles className="w-3.5 h-3.5 text-white" />
          </div>
          <span
            className="text-[14px] text-[#555]"
            style={{ fontFamily: "'Zilla Slab', serif" }}
          >
            AI Interface Layout Library
          </span>
        </Link>
        <span className="text-[12px] text-[#999]">
          &copy; 2026 &middot; UX Pattern Library
        </span>
      </div>
    </footer>
  );
}
