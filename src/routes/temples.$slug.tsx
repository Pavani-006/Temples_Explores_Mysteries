import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { SanskritDivider } from "@/components/site/SanskritDivider";
import { Particles } from "@/components/site/Particles";
import { useReveal } from "@/hooks/use-reveal";
import { getTemple, temples, type Temple } from "@/data/temples";

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

function TempleDetail() {
  useReveal();
  const t = Route.useLoaderData() as Temple;
  const idx = temples.findIndex(x => x.slug === t.slug);
  const next = temples[(idx + 1) % temples.length];

  return (
    <div className="relative bg-background text-foreground">
      <Nav />
      <main>
        {/* Hero */}
        <section className="relative h-[88vh] min-h-[560px] w-full overflow-hidden grain vignette">
          <div className="absolute inset-0 -z-10">
            <img src={t.image} alt={t.name} className="h-full w-full object-cover animate-fade" style={{ animationDuration: "2.5s" }} />
            <div className="absolute inset-0 bg-gradient-to-b from-background/55 via-background/40 to-background" />
          </div>
          <Particles count={22} />
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
        </section>

        <SanskritDivider />

        {/* Overview */}
        <Section eyebrow="Overview" title="A first glimpse">
          <p>{t.overview}</p>
        </Section>

        {/* History */}
        <Section eyebrow="History" title="The making of stone" tone="stone">
          <p>{t.history}</p>
        </Section>

        {/* Mythology */}
        <Section eyebrow="Mythology" title="The story told in whisper">
          <p>{t.mythology}</p>
        </Section>

        {/* Mysteries */}
        <section className="relative px-6 py-32 bg-stone-deep">
          <div className="mx-auto max-w-5xl reveal">
            <p className="text-[10px] uppercase tracking-[0.5em] text-[var(--gold)]/80">Mysteries & Legends</p>
            <h2 className="mt-4 font-serif text-4xl sm:text-5xl text-foreground">Things that have never been explained.</h2>
            <div className="mt-12 grid gap-5 sm:grid-cols-2">
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

        {/* Architecture */}
        <Section eyebrow="Sacred Architecture" title="Geometry of the divine">
          <p>{t.architectureNote}</p>
        </Section>

        {/* Rituals & Festivals two-col */}
        <section className="relative px-6 py-32 bg-stone-deep">
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
            <div className="reveal">
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

        {/* Timeline */}
        <section className="relative px-6 py-32">
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

        {/* Rare facts */}
        <section className="relative px-6 py-32 bg-stone-deep">
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

        {/* Next */}
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

function Section({ eyebrow, title, children, tone }: { eyebrow: string; title: string; children: React.ReactNode; tone?: "stone" }) {
  return (
    <section className={`relative px-6 py-28 ${tone === "stone" ? "bg-stone-deep" : ""}`}>
      <div className="mx-auto max-w-4xl reveal">
        <p className="text-[10px] uppercase tracking-[0.5em] text-[var(--gold)]/80">{eyebrow}</p>
        <h2 className="mt-4 font-serif text-4xl sm:text-5xl text-foreground">{title}</h2>
        <div className="mt-8 text-lg leading-relaxed text-foreground/75 font-light">{children}</div>
      </div>
    </section>
  );
}
