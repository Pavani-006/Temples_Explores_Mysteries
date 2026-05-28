import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { PageHero } from "@/components/site/PageHero";
import { useReveal } from "@/hooks/use-reveal";
import { temples } from "@/data/temples";
import pilgrimImg from "@/assets/pilgrim.jpg";

export const Route = createFileRoute("/legends")({
  head: () => ({
    meta: [
      { title: "Legends & Mythology · Sanātana" },
      { name: "description", content: "The mythologies hidden within India's temples — Krishna's drowned city, Sati's scattered body, the descent of the Ganga." },
      { property: "og:title", content: "Legends & Mythology · Sanātana" },
      { property: "og:description", content: "The mythologies hidden within India's temples." },
    ],
  }),
  component: LegendsPage,
});

function LegendsPage() {
  useReveal();
  const legends = temples.filter(t => t.mythology).slice(0, 14);

  return (
    <div className="relative bg-background text-foreground">
      <Nav />
      <main>
        <PageHero
          eyebrow="Legends & Mythology"
          title={<>Stories the stones <span className="italic text-[var(--gold)]">still keep.</span></>}
          subtitle="Behind every sanctum lies a story — passed mouth to mouth through unbroken lineage, older than the temple itself."
          image={pilgrimImg}
        />

        <section className="relative px-6 py-24">
          <div className="mx-auto max-w-5xl space-y-20">
            {legends.map((t, i) => (
              <article key={t.slug} className="reveal grid gap-10 md:grid-cols-[1fr_2fr] md:items-start" style={{ transitionDelay: `${(i % 4) * 60}ms` }}>
                <div className="md:sticky md:top-32 md:self-start">
                  <p className="text-[10px] uppercase tracking-[0.4em] text-[var(--gold)]/80">Legend No. {String(i + 1).padStart(2, "0")}</p>
                  <h2 className="mt-4 font-serif text-3xl text-foreground leading-tight">{t.name}</h2>
                  <p className="mt-2 text-xs uppercase tracking-[0.3em] text-foreground/45">{t.state}</p>
                  <Link
                    to="/temples/$slug"
                    params={{ slug: t.slug }}
                    className="mt-6 inline-block text-[10px] uppercase tracking-[0.32em] text-[var(--gold)]/80 hover:text-[var(--gold)]"
                  >
                    Visit Temple →
                  </Link>
                </div>
                <div className="border-l border-[var(--gold)]/20 pl-8">
                  <p className="font-serif italic text-2xl text-[var(--gold)]/90 leading-snug">{t.tagline}</p>
                  <p className="mt-6 text-base leading-relaxed text-foreground/75 font-light">{t.mythology}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="px-6 py-20 text-center">
          <Link to="/gallery" className="text-xs uppercase tracking-[0.4em] text-[var(--gold)]">
            Continue → Gallery
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
}
