import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar.jsx";
import Footer from "@/components/Footer.jsx";
import PageHero from "@/components/PageHero.jsx";
import { useReveal } from "@/hooks/use-reveal.js";
import { temples } from "@/data/temples.js";
import mysteriesImg from "@/assets/mysteries.jpg";

const TOPICS = [
  { title: "Hanging Pillars", body: "At Lepakshi, one of seventy stone pillars hangs without touching the floor. Cloth slides freely beneath it.", temple: "lepakshi" },
  { title: "Hidden Chambers", body: "Padmanabhaswamy's Vault B is sealed without latch or bolt. Six other vaults contained the greatest treasure ever catalogued.", temple: "padmanabhaswamy" },
  { title: "Magnetic Legends", body: "Konark's central lodestone is said to have suspended Surya's idol mid-air — until sailors' compasses failed near the coast.", temple: "konark-sun-temple" },
  { title: "Sacred Geometry", body: "Khajuraho's spires align with sunrise on specific astronomical dates. The temple is a mountain range in sandstone.", temple: "khajuraho" },
  { title: "Ancient Engineering", body: "Ellora's Kailasa was excavated downward through 200,000 tons of basalt — and no quarry record exists for the displaced stone.", temple: "kailasa-ellora" },
  { title: "Underground Tunnels", body: "Tunnels under Srirangam, Padmanabhaswamy and other shrines have been recorded for centuries — few have been mapped.", temple: "srirangam" },
  { title: "Cosmic Alignments", body: "Konark's twelve wheels function as precise sundials. Modhera's sanctum catches the equinox dawn on the deity's heart.", temple: "modhera-sun" },
  { title: "Self-Manifested Idols", body: "Tirumala, Amarnath, Mookambika — deities that arrived before any priest carved the first stone.", temple: "tirumala-venkateswara" },
];

export default function Mysteries() {
  useReveal();
  return (
    <div className="relative bg-background text-foreground">
      <Navbar />
      <main>
        <PageHero
          eyebrow="Ancient Mysteries & Legends"
          title={<>Some things cannot <span className="italic text-[var(--gold)]">be explained.</span></>}
          subtitle="Eight thresholds where stone, fire and silence resist every modern measurement."
          image={mysteriesImg}
        />

        <section className="relative px-6 py-24">
          <div className="mx-auto max-w-7xl grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
            {TOPICS.map((m, i) => {
              const t = temples.find((x) => x.slug === m.temple);
              return (
                <Link
                  to={`/temple/${m.temple}`}
                  key={m.title}
                  className="reveal glass group relative overflow-hidden rounded-sm p-10 transition-all duration-700 hover:-translate-y-1 hover:glow-gold"
                  style={{ transitionDelay: `${i * 60}ms` }}
                >
                  <span className="absolute right-8 top-8 font-serif text-5xl text-[var(--gold)]/20 transition-all group-hover:text-[var(--gold)]/40">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-serif text-3xl text-foreground">{m.title}</h3>
                  <p className="mt-5 max-w-md text-sm leading-relaxed text-foreground/70 font-light">{m.body}</p>
                  {t && (
                    <p className="mt-8 text-[10px] uppercase tracking-[0.3em] text-[var(--gold)]/80">
                      See it at {t.name} →
                    </p>
                  )}
                </Link>
              );
            })}
          </div>
        </section>

        <section className="px-6 py-20 text-center">
          <Link to="/architecture" className="text-xs uppercase tracking-[0.4em] text-[var(--gold)]">
            Continue → Sacred Architecture
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
}
