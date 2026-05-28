import { useEffect, useState } from "react";

const LINKS = [
  { href: "#history", label: "History" },
  { href: "#mysteries", label: "Mysteries" },
  { href: "#architecture", label: "Architecture" },
  { href: "#rituals", label: "Rituals" },
  { href: "#timeline", label: "Timeline" },
  { href: "#gallery", label: "Gallery" },
];

export function Nav() {
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
          scrolled
            ? "glass rounded-full px-4 py-2"
            : ""
        }`}
        style={scrolled ? { maxWidth: "min(72rem, calc(100% - 2rem))" } : undefined}
      >
        <a href="#top" className="flex items-center gap-3 group">
          <span className="font-serif text-2xl text-[var(--gold)] text-glow">ॐ</span>
          <span className="font-serif text-lg tracking-[0.25em] text-foreground/90 uppercase">
            Sanātana
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-9">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-xs uppercase tracking-[0.22em] text-foreground/60 hover:text-[var(--gold)] transition-colors duration-500"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <a
          href="#pilgrim"
          className="hidden md:inline-flex items-center gap-2 rounded-full border border-[var(--gold)]/30 px-5 py-2 text-xs uppercase tracking-[0.22em] text-[var(--gold)] hover:bg-[var(--gold)]/10 transition-all duration-500"
        >
          Begin Journey
        </a>
      </div>
    </header>
  );
}
