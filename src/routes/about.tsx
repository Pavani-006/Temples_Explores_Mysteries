import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { PageHero } from "@/components/site/PageHero";
import { SanskritDivider } from "@/components/site/SanskritDivider";
import { useReveal } from "@/hooks/use-reveal";
import pilgrimImg from "@/assets/pilgrim.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About · Sanātana" },
      { name: "description", content: "Sanātana is a cinematic archive of ancient India's sacred temples — built as a quiet pilgrimage through stone, fire and silence." },
      { property: "og:title", content: "About · Sanātana" },
      { property: "og:description", content: "A cinematic archive of ancient India's sacred temples." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  useReveal();
  return (
    <div className="relative bg-background text-foreground">
      <Nav />
      <main>
        <PageHero
          eyebrow="About Sanātana"
          title={<>A quiet pilgrimage <span className="italic text-[var(--gold)]">through stone.</span></>}
          subtitle="Sanātana is a cinematic archive of ancient India's most sacred and mysterious temples — built not as an information site but as an experience."
          image={pilgrimImg}
          height="h-[60vh]"
        />

        <section className="relative px-6 py-24">
          <div className="mx-auto max-w-3xl reveal space-y-8 text-lg leading-relaxed text-foreground/75 font-light">
            <p>
              Every temple in this archive has stood for centuries — often millennia. Each has watched dynasties rise and fall, faiths reform, oceans recede and rivers change course. And yet, dawn after dawn, the lamp is lit, the mantra spoken, the sanctum opened.
            </p>
            <p>
              The aim of Sanātana is to honour that continuity. Not to catalogue. Not to explain. But to show — through cinematic visuals, slow storytelling and quiet design — what these temples actually feel like: ancient, sacred, mysterious, peaceful, alive.
            </p>
            <p>
              The histories drawn here come from inscriptions, Puranic literature, temple records, oral tradition and modern scholarship. Where mystery is recorded, we record it. Where it is explained, we leave the explanation to the reader.
            </p>
          </div>
        </section>

        <SanskritDivider />

        <section className="relative px-6 py-24">
          <div className="mx-auto max-w-4xl reveal text-center">
            <p className="font-serif italic text-3xl sm:text-4xl text-[var(--gold)] leading-snug text-glow">
              "Asato mā sad gamaya · Tamaso mā jyotir gamaya · Mṛityor mā amṛitam gamaya."
            </p>
            <p className="mt-8 text-sm uppercase tracking-[0.32em] text-foreground/55">
              From the unreal, lead me to the real.<br />
              From darkness, lead me to light.<br />
              From death, lead me to immortality.
            </p>
            <p className="mt-4 text-xs uppercase tracking-[0.3em] text-foreground/40">— Bṛihadāraṇyaka Upaniṣad</p>
          </div>
        </section>

        <section className="px-6 py-24 text-center">
          <Link to="/temples" className="inline-flex items-center gap-3 rounded-full bg-[var(--gold)] px-8 py-3.5 text-sm uppercase tracking-[0.22em] text-[var(--primary-foreground)] glow-gold hover:scale-[1.03] transition-transform">
            Begin the Pilgrimage →
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
}
