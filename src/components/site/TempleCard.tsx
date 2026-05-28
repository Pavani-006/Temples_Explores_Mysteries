import { Link } from "@tanstack/react-router";
import type { Temple } from "@/data/temples";

export function TempleCard({ temple, index = 0 }: { temple: Temple; index?: number }) {
  return (
    <Link
      to="/temples/$slug"
      params={{ slug: temple.slug }}
      className="reveal group relative block overflow-hidden rounded-sm bg-stone-deep border border-[var(--gold)]/10 transition-all duration-700 hover:-translate-y-1 hover:border-[var(--gold)]/40 hover:glow-gold"
      style={{ transitionDelay: `${(index % 6) * 60}ms` }}
    >
      <div className="relative h-72 overflow-hidden">
        <img
          src={temple.image}
          alt={temple.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <span className="absolute top-4 left-4 rounded-full border border-[var(--gold)]/30 bg-background/40 backdrop-blur px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-[var(--gold)]">
          {temple.mysteryType}
        </span>
      </div>
      <div className="relative p-7">
        <p className="text-[10px] uppercase tracking-[0.3em] text-foreground/45">
          {temple.location} · {temple.state}
        </p>
        <h3 className="mt-3 font-serif text-2xl text-foreground leading-tight">{temple.name}</h3>
        <p className="mt-3 text-sm leading-relaxed text-foreground/60 font-light line-clamp-3">
          {temple.tagline} {temple.overview}
        </p>
        <span className="mt-6 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.32em] text-[var(--gold)]/80 group-hover:text-[var(--gold)] transition-colors">
          Explore Temple
          <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
        </span>
      </div>
    </Link>
  );
}
