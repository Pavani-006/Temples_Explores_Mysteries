import Navbar from "@/components/Navbar.jsx";
import Footer from "@/components/Footer.jsx";
import PageHero from "@/components/PageHero.jsx";
import { useReveal } from "@/hooks/use-reveal.js";
import festivals from "@/assets/festivals.jpg";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import history from "@/assets/history-stone.jpg";
import architecture from "@/assets/architecture.jpg";
import rituals from "@/assets/rituals.jpg";
import mysteries from "@/assets/mysteries.jpg";
import pilgrim from "@/assets/pilgrim.jpg";
import tirumala from "@/assets/hero-tirumala.jpg";

const IMAGES = [
  { src: tirumala, alt: "Tirumala hills in golden mist", caption: "Tirumala · Andhra Pradesh", span: "row-span-2" },
  { src: rituals, alt: "Brass diyas glowing in temple darkness", caption: "Diya — flame of awakening", span: "" },
  { src: history, alt: "Carved stone wall in low light", caption: "Stone · the oldest scripture", span: "" },
  { src: architecture, alt: "Gopuram in warm light", caption: "Gopuram · Madurai", span: "row-span-2" },
  { src: mysteries, alt: "Sculpted face in shadow", caption: "The unseen sanctum", span: "" },
  { src: festivals, alt: "Million lamps on temple steps", caption: "Karthika Deepam", span: "" },
  { src: g1, alt: "Aerial of misty temple complex", caption: "Aerial · sacred geography", span: "row-span-2" },
  { src: pilgrim, alt: "Pilgrim ascending temple steps", caption: "The pilgrim's first step", span: "" },
  { src: g2, alt: "Single brass lamp in darkness", caption: "One lamp, one silence", span: "" },
  { src: g3, alt: "Sculpted face emerging from stone", caption: "Carving · the breath of the deity", span: "" },
];

export default function Gallery() {
  useReveal();
  return (
    <div className="relative bg-background text-foreground">
      <Navbar />
      <main>
        <PageHero
          eyebrow="Gallery"
          title={<>Fragments of <span className="italic text-[var(--gold)]">the sacred.</span></>}
          subtitle="A quiet visual archive — stone, flame, carving and shadow, framed."
          image={g1}
          height="h-[60vh]"
        />

        <section className="relative px-6 py-20">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[260px] gap-4">
              {IMAGES.map((img, i) => (
                <figure
                  key={i}
                  className={`reveal group relative overflow-hidden rounded-sm bg-stone-deep ${img.span}`}
                  style={{ transitionDelay: `${(i % 6) * 60}ms` }}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/20 to-transparent opacity-90" />
                  <figcaption className="absolute bottom-4 left-5 right-5 text-[10px] uppercase tracking-[0.3em] text-[var(--gold)]/85">
                    {img.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
