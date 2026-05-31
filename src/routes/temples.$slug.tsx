import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { SanskritDivider } from "@/components/site/SanskritDivider";
import { Particles } from "@/components/site/Particles";
import { useReveal } from "@/hooks/use-reveal";
import { getTemple, getGallery, getReferences, temples, type Temple } from "@/data/temples";

export const Route = createFileRoute("/temples/$slug")({
  head: ({ params }) => {
    const t = getTemple(params.slug);
    if (!t) return { meta: [{ title: "Temple · Sanātana" }] };
    return {
      meta: [
        { title: `${t.name} · ${t.location} · Sanātana` },
        { name: "description", content: t.tagline + " " + t.overview.slice(0, 140) },
        { property: "og:title", content: `${t.name} · Sanātana` },
        { property: "og:description", content: t.tagline },
        { property: "og:image", content: t.image },
      ],
    };
  },
  loader: ({ params }) => {
    const t = getTemple(params.slug);
    if (!t) throw notFound();
    return t;
  },
  errorComponent: ({ error, reset }) => (
    <div className="flex min-h-screen items-center justify-center bg-background px-6 text-center">
      <div>
        <p className="font-serif text-5xl text-[var(--gold)]">ॐ</p>
        <p className="mt-6 text-foreground/70">{error.message}</p>
        <button onClick={reset} className="mt-6 text-xs uppercase tracking-[0.3em] text-[var(--gold)]">Try again</button>
      </div>
    </div>
  ),
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center bg-background px-6 text-center">
      <div>
        <p className="font-serif text-6xl text-[var(--gold)]">ॐ</p>
        <h1 className="mt-6 font-serif text-3xl text-foreground">Temple not found</h1>
        <Link to="/temples" className="mt-8 inline-block text-xs uppercase tracking-[0.3em] text-[var(--gold)]">← Back to all temples</Link>
      </div>
    </div>
  ),
  component: TempleDetail,
});

const SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "history", label: "History" },
  { id: "mythology", label: "Mythology" },
  { id: "mysteries", label: "Mysteries" },
  { id: "architecture", label: "Architecture" },
  { id: "rituals", label: "Rituals" },
  { id: "festivals", label: "Festivals" },
  { id: "gallery", label: "Gallery" },
  { id: "timeline", label: "Timeline" },
  { id: "references", label: "References" },
];

function TempleDetail() {
  useReveal();
  const t = Route.useLoaderData() as Temple;
  const idx = temples.findIndex(x => x.slug === t.slug);
  const next = temples[(idx + 1) % temples.length];
  const gallery = getGallery(t.slug, t.image);
  const references = getReferences(t);

  // Sticky nav active section tracking
  const [active, setActive] = useState("overview");
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [t.slug]);

  return (
    <div className="relative bg-background text-foreground">
      <Nav />
      <main>
        {/* ── HERO ────────────────────────────────────────── */}
        <section className="relative h-[92vh] min-h-[600px] w-full overflow-hidden grain vignette">
          <div className="absolute inset-0 -z-10">
            <img
              src={t.image}
              alt={t.name}
              className="h-full w-full object-cover animate-fade"
              style={{ animationDuration: "2.5s", transform: "scale(1.08)", transformOrigin: "center" }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/55 via-background/30 to-background" />
          </div>
          <Particles count={26} />

          <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
            <p className="mb-6 text-[10px] uppercase tracking-[0.5em] text-[var(--gold)]/80">
              {t.location} · {t.state}
            </p>
            <h1 className="max-w-5xl font-serif text-5xl sm:text-7xl text-foreground text-glow leading-[1.05]">
              {t.name}
            </h1>
            <p className="mt-6 max-w-2xl font-serif italic text-xl text-[var(--gold)]/90">
              {t.tagline}
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3 text-[10px] uppercase tracking-[0.3em] text-foreground/55">
              <Badge>{t.deity}</Badge>
              <Badge>{t.architecture}</Badge>
              <Badge>{t.period}</Badge>
              <Badge>{t.mysteryType}</Badge>
            </div>
          </div>

          {/* Hero info strip */}
          <div className="absolute inset-x-0 bottom-0 z-10 border-t border-[var(--gold)]/15 bg-background/55 backdrop-blur">
            <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px sm:grid-cols-4">
              {[
                ["Where", `${t.location}, ${t.state}`],
                ["Deity", t.deity],
                ["Style", t.architecture],
                ["Era", t.period],
              ].map(([k, v]) => (
                <div key={k} className="px-6 py-5">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--gold)]/70">{k}</p>
                  <p className="mt-2 text-sm text-foreground/85 font-light">{v}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── STICKY IN-PAGE NAV ─────────────────────────── */}
        <div className="sticky top-0 z-30 border-b border-[var(--gold)]/15 bg-background/80 backdrop-blur-xl">
          <div className="mx-auto max-w-7xl px-6">
            <nav className="flex gap-1 overflow-x-auto py-3 scrollbar-none">
              {SECTIONS.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className={`whitespace-nowrap rounded-full px-4 py-2 text-[10px] uppercase tracking-[0.28em] transition-all ${
                    active === s.id
                      ? "bg-[var(--gold)]/15 text-[var(--gold)]"
                      : "text-foreground/55 hover:text-[var(--gold)]"
                  }`}
                >
                  {s.label}
                </a>
              ))}
            </nav>
          </div>
        </div>

        <SanskritDivider />

        {/* ── OVERVIEW ───────────────────────────────────── */}
        <Section id="overview" eyebrow="Overview" title="A first glimpse">
          <Prose text={t.overview} />
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              ["Why it matters", t.tagline],
              ["The mystery", t.mysteryType],
              ["Tradition", t.deity],
            ].map(([k, v]) => (
              <div key={k} className="rounded-sm border border-[var(--gold)]/15 bg-stone-deep/60 p-6">
                <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--gold)]/70">{k}</p>
                <p className="mt-3 text-sm text-foreground/80 font-light">{v}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* ── HISTORY ────────────────────────────────────── */}
        <section id="history" className="relative px-6 py-28 bg-stone-deep scroll-mt-20">
          <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[1fr_1.1fr] lg:items-start">
            <div className="reveal relative overflow-hidden rounded-sm lg:sticky lg:top-24 self-start">
              <img src={gallery[1]} alt={`${t.name} stonework`} loading="lazy" className="h-[60vh] w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
            </div>
            <div className="reveal">
              <p className="text-[10px] uppercase tracking-[0.5em] text-[var(--gold)]/80">History</p>
              <h2 className="mt-4 font-serif text-4xl sm:text-5xl">The making of stone.</h2>
              <div className="mt-8 text-lg leading-relaxed text-foreground/75 font-light">
                <Prose text={t.history} />
              </div>
            </div>
          </div>
        </section>

        {/* Cinematic architecture image between sections */}
        <div className="reveal mx-auto max-w-7xl px-6 pt-16">
          <div className="overflow-hidden rounded-sm">
            <img src={gallery[4]} alt={`${t.name} grand view`} loading="lazy" className="h-[55vh] w-full object-cover" />
          </div>
        </div>

        {/* ── MYTHOLOGY ──────────────────────────────────── */}
        <section id="mythology" className="relative px-6 py-28 scroll-mt-20">
          <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[1.1fr_1fr] lg:items-start">
            <div className="reveal">
              <p className="text-[10px] uppercase tracking-[0.5em] text-[var(--gold)]/80">Mythology</p>
              <h2 className="mt-4 font-serif text-4xl sm:text-5xl">The story told in whisper.</h2>
              <div className="mt-8 text-lg leading-relaxed text-foreground/75 font-light">
                <Prose text={t.mythology} />
              </div>
            </div>
            <div className="reveal relative overflow-hidden rounded-sm lg:sticky lg:top-24 self-start">
              <div className="absolute -inset-8 ember-glow opacity-50" />
              <img src={gallery[2]} alt={`${t.name} myth`} loading="lazy" className="relative h-[60vh] w-full object-cover" />
            </div>
          </div>
        </section>

        {/* ── MYSTERIES ──────────────────────────────────── */}
        <section id="mysteries" className="relative px-6 py-28 bg-stone-deep scroll-mt-20">
          <div className="mx-auto max-w-6xl reveal">
            <p className="text-[10px] uppercase tracking-[0.5em] text-[var(--gold)]/80">Mysteries & Legends</p>
            <h2 className="mt-4 font-serif text-4xl sm:text-5xl">Things that have never been explained.</h2>
            <div className="mt-14 grid gap-5 sm:grid-cols-2">
              {t.mysteries.map((m, i) => (
                <article key={i} className="reveal glass relative overflow-hidden rounded-sm p-8" style={{ transitionDelay: `${i * 80}ms` }}>
                  <span className="absolute right-6 top-6 font-serif text-4xl text-[var(--gold)]/25">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-sm leading-relaxed text-foreground/75 font-light pr-12">{m}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── ARCHITECTURE ───────────────────────────────── */}
        <section id="architecture" className="relative px-6 py-28 scroll-mt-20">
          <div className="mx-auto max-w-4xl reveal">
            <p className="text-[10px] uppercase tracking-[0.5em] text-[var(--gold)]/80">Sacred Architecture</p>
            <h2 className="mt-4 font-serif text-4xl sm:text-5xl text-center">Geometry of the divine.</h2>
            <div className="mt-8 text-lg leading-relaxed text-foreground/75 font-light">
              <Prose text={t.architectureNote} />
            </div>
          </div>
          <div className="reveal mx-auto mt-16 max-w-6xl overflow-hidden rounded-sm">
            <img src={gallery[3]} alt={`${t.name} architecture`} loading="lazy" className="h-[72vh] w-full object-cover" />
          </div>
          <div className="reveal mx-auto mt-6 grid max-w-6xl gap-6 sm:grid-cols-2">
            <div className="overflow-hidden rounded-sm">
              <img src={gallery[5]} alt={`${t.name} detail`} loading="lazy" className="h-[44vh] w-full object-cover" />
            </div>
            <div className="overflow-hidden rounded-sm">
              <img src={gallery[6] ?? gallery[0]} alt={`${t.name} interior`} loading="lazy" className="h-[44vh] w-full object-cover" />
            </div>
          </div>
        </section>

        {/* ── RITUALS & FESTIVALS ────────────────────────── */}
        <section id="rituals" className="relative px-6 py-28 bg-stone-deep">
          <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-2">
            <div className="reveal">
              <p className="text-[10px] uppercase tracking-[0.5em] text-[var(--gold)]/80">Rituals</p>
              <h3 className="mt-4 font-serif text-3xl">Fire, flower, silence.</h3>
              <ul className="mt-8 space-y-4 border-l border-[var(--gold)]/30 pl-6">
                {t.rituals.map((r, i) => (
                  <li key={i} className="text-foreground/70 text-sm">{r}</li>
                ))}
              </ul>
            </div>
            <div id="festivals" className="reveal scroll-mt-24">
              <p className="text-[10px] uppercase tracking-[0.5em] text-[var(--gold)]/80">Festivals</p>
              <h3 className="mt-4 font-serif text-3xl">The year of the deity.</h3>
              <ul className="mt-8 space-y-4 border-l border-[var(--gold)]/30 pl-6">
                {t.festivals.map((f, i) => (
                  <li key={i} className="text-foreground/70 text-sm">{f}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── GALLERY ────────────────────────────────────── */}
        <section id="gallery" className="relative px-6 py-28">
          <div className="mx-auto max-w-7xl">
            <div className="reveal">
              <p className="text-[10px] uppercase tracking-[0.5em] text-[var(--gold)]/80">Gallery</p>
              <h2 className="mt-4 font-serif text-4xl sm:text-5xl">Fragments of the sacred.</h2>
            </div>
            <div className="mt-12 grid auto-rows-[220px] grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {gallery.map((src, i) => (
                <div
                  key={i}
                  className={`reveal group relative overflow-hidden rounded-sm ${
                    i === 0 ? "col-span-2 row-span-2" : i === 3 ? "row-span-2" : ""
                  }`}
                  style={{ transitionDelay: `${i * 60}ms` }}
                >
                  <img src={src} alt={`${t.name} ${i + 1}`} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TIMELINE ───────────────────────────────────── */}
        <section id="timeline" className="relative px-6 py-28 bg-stone-deep">
          <div className="mx-auto max-w-4xl reveal">
            <p className="text-[10px] uppercase tracking-[0.5em] text-[var(--gold)]/80">Timeline</p>
            <h2 className="mt-4 font-serif text-4xl sm:text-5xl">Moments in stone.</h2>
            <div className="relative mt-16 pl-8 border-l border-[var(--gold)]/30">
              {t.timeline.map((m, i) => (
                <div key={i} className="reveal relative pb-12" style={{ transitionDelay: `${i * 80}ms` }}>
                  <span className="absolute -left-[2.45rem] top-1.5 block h-3 w-3 rounded-full bg-[var(--gold)] shadow-[0_0_14px_var(--saffron)]" />
                  <p className="font-serif text-2xl text-[var(--gold)]">{m.year}</p>
                  <p className="mt-2 text-foreground/65 text-sm">{m.event}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── RARE FACTS ─────────────────────────────────── */}
        <section className="relative px-6 py-28">
          <div className="mx-auto max-w-5xl reveal">
            <p className="text-[10px] uppercase tracking-[0.5em] text-[var(--gold)]/80">Rare Facts</p>
            <h2 className="mt-4 font-serif text-4xl sm:text-5xl">Less spoken of.</h2>
            <ul className="mt-12 grid gap-4 sm:grid-cols-2">
              {t.rareFacts.map((f, i) => (
                <li key={i} className="reveal flex gap-4 border-t border-[var(--gold)]/15 pt-5" style={{ transitionDelay: `${i * 60}ms` }}>
                  <span className="font-serif text-[var(--gold)] text-xl">·</span>
                  <span className="text-sm text-foreground/70 leading-relaxed">{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── REFERENCES ─────────────────────────────────── */}
        <section id="references" className="relative px-6 py-28 bg-stone-deep">
          <div className="mx-auto max-w-5xl reveal">
            <p className="text-[10px] uppercase tracking-[0.5em] text-[var(--gold)]/80">References & Further Reading</p>
            <h2 className="mt-4 font-serif text-4xl sm:text-5xl">Follow the thread.</h2>
            <ul className="mt-12 divide-y divide-[var(--gold)]/15 border-y border-[var(--gold)]/15">
              {references.map((r) => (
                <li key={r.label}>
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group flex items-center justify-between gap-6 py-5 transition-colors hover:text-[var(--gold)]"
                  >
                    <span className="text-sm text-foreground/75 group-hover:text-[var(--gold)]">{r.label}</span>
                    <span className="text-xs uppercase tracking-[0.3em] text-[var(--gold)]/70 transition-transform group-hover:translate-x-1">↗</span>
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-xs uppercase tracking-[0.28em] text-foreground/40">
              Sources open in a new tab. Verify with primary epigraphy and ASI records.
            </p>
          </div>
        </section>

        {/* ── NEXT ───────────────────────────────────────── */}
        <section className="relative px-6 py-24 text-center">
          <p className="text-[10px] uppercase tracking-[0.4em] text-foreground/40">Continue the pilgrimage</p>
          <Link
            to="/temples/$slug"
            params={{ slug: next.slug }}
            className="mt-6 inline-block font-serif text-3xl sm:text-4xl text-[var(--gold)] hover:text-glow transition"
          >
            {next.name} →
          </Link>
          <div className="mt-10">
            <Link to="/temples" className="text-xs uppercase tracking-[0.3em] text-foreground/55 hover:text-[var(--gold)]">
              ← All Temples
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return <span className="rounded-full border border-[var(--gold)]/25 px-3 py-1.5">{children}</span>;
}

function Section({ id, eyebrow, title, children }: { id: string; eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="relative px-6 py-28 scroll-mt-20">
      <div className="mx-auto max-w-4xl reveal">
        <p className="text-[10px] uppercase tracking-[0.5em] text-[var(--gold)]/80">{eyebrow}</p>
        <h2 className="mt-4 font-serif text-4xl sm:text-5xl text-foreground">{title}</h2>
        <div className="mt-8 text-lg leading-relaxed text-foreground/75 font-light">{children}</div>
      </div>
    </section>
  );
}

function Prose({ text }: { text: string }) {
  const paragraphs = text.split(/\n\n+/).map((p) => p.trim()).filter(Boolean);
  return (
    <div className="space-y-5">
      {paragraphs.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </div>
  );
}
