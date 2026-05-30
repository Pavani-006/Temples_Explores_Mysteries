import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { PageHero } from "@/components/site/PageHero";
import { TempleCard } from "@/components/site/TempleCard";
import { useReveal } from "@/hooks/use-reveal";
import { temples, STATES, DEITIES, STYLES, MYSTERY_TYPES } from "@/data/temples";
import architecture from "@/assets/architecture.jpg";

export const Route = createFileRoute("/temples/")({
  head: () => ({
    meta: [
      { title: "Temple Explorer · 50 Sacred Temples of India · Sanātana" },
      { name: "description", content: "Search and explore the most mysterious and architecturally stunning temples of India — by state, deity, architecture and mystery." },
      { property: "og:title", content: "Temple Explorer · Sanātana" },
      { property: "og:description", content: "An immersive directory of India's most sacred temples." },
    ],
  }),
  component: TemplesPage,
});

function TemplesPage() {
  useReveal();
  const [q, setQ] = useState("");
  const [state, setState] = useState("");
  const [deity, setDeity] = useState("");
  const [style, setStyle] = useState("");
  const [mystery, setMystery] = useState("");

  const filtered = useMemo(() => {
    const qq = q.trim().toLowerCase();
    return temples.filter((t) => {
      if (state && t.state !== state) return false;
      if (style && t.architecture !== style) return false;
      if (mystery && t.mysteryType !== mystery) return false;
      if (deity && !t.deity.toLowerCase().includes(deity.toLowerCase())) return false;
      if (qq) {
        const blob = `${t.name} ${t.location} ${t.state} ${t.deity} ${t.tagline} ${t.overview}`.toLowerCase();
        if (!blob.includes(qq)) return false;
      }
      return true;
    });
  }, [q, state, deity, style, mystery]);

  const reset = () => { setQ(""); setState(""); setDeity(""); setStyle(""); setMystery(""); };

  return (
    <div className="relative bg-background text-foreground">
      <Nav />
      <main>
        <PageHero
          eyebrow="The Temple Explorer"
          title={<>Fifty temples. <span className="italic text-[var(--gold)]">One unbroken thread.</span></>}
          subtitle="From the seven hills of Tirumala to the ice lingam of Amarnath — search, filter and step into India's most extraordinary sacred sites."
          image={architecture}
        />

        <section className="relative px-6 pt-16">
          <div className="mx-auto max-w-7xl">
            <div className="glass rounded-sm p-6 sm:p-8">
              <div className="grid gap-4 lg:grid-cols-[2fr_1fr_1fr_1fr_1fr_auto]">
                <Field>
                  <input
                    type="search"
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Search by temple, deity, location…"
                    className="w-full bg-transparent text-sm placeholder:text-foreground/40 focus:outline-none"
                  />
                </Field>
                <Select value={state} onChange={setState} options={STATES} label="State" />
                <Select value={deity} onChange={setDeity} options={DEITIES} label="Deity" />
                <Select value={style} onChange={setStyle} options={STYLES} label="Architecture" />
                <Select value={mystery} onChange={setMystery} options={MYSTERY_TYPES} label="Mystery" />
                <button
                  onClick={reset}
                  className="rounded-sm border border-[var(--gold)]/30 px-4 py-3 text-[10px] uppercase tracking-[0.3em] text-[var(--gold)] hover:bg-[var(--gold)]/10 transition"
                >
                  Reset
                </button>
              </div>
              <p className="mt-5 text-[11px] uppercase tracking-[0.3em] text-foreground/45">
                {filtered.length} of {temples.length} temples
              </p>
            </div>
          </div>
        </section>

        <section className="relative px-6 py-20">
          <div className="mx-auto max-w-7xl">
            {filtered.length === 0 ? (
              <div className="py-32 text-center">
                <p className="font-serif text-3xl text-[var(--gold)]">ॐ</p>
                <p className="mt-4 text-foreground/60">No temples match these filters.</p>
                <button onClick={reset} className="mt-6 text-xs uppercase tracking-[0.3em] text-[var(--gold)]">Clear filters</button>
              </div>
            ) : (
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((t, i) => (
                  <TempleCard key={t.slug} temple={t} index={i} />
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="relative px-6 py-20 text-center">
          <Link to="/mysteries" className="text-xs uppercase tracking-[0.4em] text-[var(--gold)] hover:underline underline-offset-8">
            Continue → Ancient Mysteries
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function Field({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-sm border border-[var(--gold)]/20 bg-background/40 px-4 py-3">
      {children}
    </div>
  );
}

function Select({ value, onChange, options, label }: { value: string; onChange: (v: string) => void; options: string[]; label: string }) {
  return (
    <div className="rounded-sm border border-[var(--gold)]/20 bg-background/40 px-4 py-3">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent text-sm text-foreground/80 focus:outline-none"
      >
        <option value="" className="bg-background">All {label}s</option>
        {options.map((o) => (
          <option key={o} value={o} className="bg-background">{o}</option>
        ))}
      </select>
    </div>
  );
}
