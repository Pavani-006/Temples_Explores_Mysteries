import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle.jsx";

const LINKS = [
  { to: "/", label: "Home", end: true },
  { to: "/temples", label: "Temples" },
  { to: "/mysteries", label: "Mysteries" },
  { to: "/architecture", label: "Architecture" },
  { to: "/legends", label: "Legends" },
  { to: "/gallery", label: "Gallery" },
  { to: "/about", label: "About" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ${
        scrolled ? "py-3" : "py-6"
      }`}
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between px-6 transition-all duration-700 ${
          scrolled ? "glass rounded-full px-4 py-2" : ""
        }`}
        style={scrolled ? { maxWidth: "min(72rem, calc(100% - 2rem))" } : undefined}
      >
        <Link to="/" className="flex items-center gap-3 group">
          <span className="font-serif text-2xl text-[var(--gold)] text-glow">ॐ</span>
          <span className="font-serif text-lg tracking-[0.25em] text-foreground/90 uppercase">
            Sanātana
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) =>
                `text-xs uppercase tracking-[0.22em] transition-colors duration-500 ${
                  isActive
                    ? "text-[var(--gold)]"
                    : "text-foreground/60 hover:text-[var(--gold)]"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            to="/temples"
            className="hidden md:inline-flex items-center gap-2 rounded-full border border-[var(--gold)]/30 px-5 py-2 text-xs uppercase tracking-[0.22em] text-[var(--gold)] hover:bg-[var(--gold)]/10 transition-all duration-500"
          >
            Explore
          </Link>
        </div>
      </div>
    </header>
  );
}
