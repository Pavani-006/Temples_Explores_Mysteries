import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar.jsx";
import Footer from "@/components/Footer.jsx";
import PageHero from "@/components/PageHero.jsx";
import { useReveal } from "@/hooks/use-reveal.js";
import architectureImg from "@/assets/architecture.jpg";
import historyImg from "@/assets/history-stone.jpg";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";

const STYLES = [
  { name: "Dravidian", line: "Tiered vimanas, multi-storey gopurams, sprawling concentric prakaras — South India's signature.", example: "Brihadeeswarar · Srirangam · Meenakshi" },
  { name: "Nagara", line: "Beehive shikharas curving inward, single sanctum, dense band sculpture — the northern voice.", example: "Khajuraho · Kashi Vishwanath" },
  { name: "Kalinga", line: "Deul, jagamohana, nata mandira, bhoga mandapa — Odisha's four-part liturgy in stone.", example: "Jagannath · Konark · Lingaraja" },
  { name: "Hoysala", line: "Star-shaped (stellate) platforms, chlorite sculpture so fine the medium itself is the marvel.", example: "Belur · Halebidu" },
  { name: "Vesara / Vijayanagara", line: "A hybrid temperament — gopurams of the south, sculpture programmes of the north.", example: "Hampi · Lepakshi" },
  { name: "Rock-cut", line: "Temples not built but excavated — the negative space of a mountain.", example: "Ellora Kailasa · Elephanta · Ajanta" },
];

const ELEMENTS = [
  { name: "Gopuram", line: "The towering gateway that touches the sky." },
  { name: "Vimana / Shikhara", line: "The crown of the sanctum — a mountain in miniature." },
  { name: "Garbhagriha", line: "The womb chamber — where the deity sleeps." },
  { name: "Mandapa", line: "Pillared hall of stone resonating with chant." },
  { name: "Prakara", line: "Concentric outer walls forming a sacred mandala." },
  { name: "Pradakshina patha", line: "The circumambulatory passage — walking the cosmos." },
];

export default function Architecture() {
  useReveal();
  return (
    <div className="relative bg-background text-foreground">
      <Navbar />
      <main>
        <PageHero
          eyebrow="Sacred Architecture"
          title={<>Geometry of <span className="italic text-[var(--gold)]">the divine.</span></>}
          subtitle="Every temple is a cosmos in stone — its gopuram rises like a mountain, its sanctum opens like a cave, its pillars hum like the breath of the deity."
          image={architectureImg}
        />

        <section className="relative px-6 py-28">
          <div className="mx-auto max-w-7xl">
            <p className="reveal text-[10px] uppercase tracking-[0.5em] text-[var(--gold)]/80">The six idioms</p>
            <h2 className="reveal mt-4 font-serif text-4xl sm:text-5xl max-w-3xl">A continent that built in stone, six different ways.</h2>
            <div className="mt-16 grid gap-px overflow-hidden rounded-sm border border-[var(--gold)]/15 bg-[var(--gold)]/15 sm:grid-cols-2 lg:grid-cols-3">
              {STYLES.map((s, i) => (
                <article key={s.name} className="reveal bg-background p-8 transition-colors duration-500 hover:bg-stone-deep" style={{ transitionDelay: `${i * 60}ms` }}>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--gold)]/70">{s.example}</p>
                  <h3 className="mt-4 font-serif text-2xl">{s.name}</h3>
                  <p className="mt-3 text-sm text-foreground/65 font-light leading-relaxed">{s.line}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="relative px-6 py-28 bg-stone-deep">
          <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div className="reveal relative">
              <img src={historyImg} alt="Carved temple wall" loading="lazy" className="h-[70vh] w-full rounded-sm object-cover" />
              <div className="absolute inset-0 rounded-sm bg-gradient-to-t from-background/60 to-transparent" />
            </div>
            <div className="reveal">
              <p className="text-[10px] uppercase tracking-[0.5em] text-[var(--gold)]/80">Anatomy of a temple</p>
              <h2 className="mt-4 font-serif text-4xl sm:text-5xl">Every name holds a meaning.</h2>
              <ul className="mt-10 divide-y divide-[var(--gold)]/15 border-y border-[var(--gold)]/15">
                {ELEMENTS.map((e) => (
                  <li key={e.name} className="flex items-baseline gap-6 py-5">
                    <span className="font-serif text-xl text-[var(--gold)] min-w-44">{e.name}</span>
                    <span className="text-sm text-foreground/65 font-light">{e.line}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="relative grid sm:grid-cols-2">
          {[g1, g2].map((img, i) => (
            <div key={i} className="relative aspect-[4/3] overflow-hidden">
              <img src={img} alt="Temple stonework" loading="lazy" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
            </div>
          ))}
        </section>

        <section className="px-6 py-20 text-center">
          <Link to="/legends" className="text-xs uppercase tracking-[0.4em] text-[var(--gold)]">
            Continue → Legends & Mythology
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
}
