import { useReveal } from "@/hooks/use-reveal.js";
import Navbar from "@/components/Navbar.jsx";
import HeroSection from "@/components/HeroSection.jsx";
import Footer from "@/components/Footer.jsx";
import SanskritDivider from "@/components/SanskritDivider.jsx";
import SectionHeading from "@/components/SectionHeading.jsx";
import Particles from "@/components/Particles.jsx";
import FeaturedTemples from "@/components/FeaturedTemples.jsx";

import historyImg from "@/assets/history-stone.jpg";
import mysteriesImg from "@/assets/mysteries.jpg";
import architectureImg from "@/assets/architecture.jpg";
import ritualsImg from "@/assets/rituals.jpg";
import festivalsImg from "@/assets/festivals.jpg";
import pilgrimImg from "@/assets/pilgrim.jpg";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";

export default function Home() {
  useReveal();
  return (
    <div className="relative bg-background text-foreground">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturedTemples />
        <SanskritDivider />
        <History />
        <Mysteries />
        <Architecture />
        <Rituals />
        <Festivals />
        <HomeTimeline />
        <Gallery />
        <Pilgrim />
      </main>
      <Footer />
    </div>
  );
}

function History() {
  return (
    <section id="history" className="relative px-6 py-32 sm:py-40">
      <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
        <div className="reveal relative">
          <div className="relative overflow-hidden rounded-sm">
            <div className="absolute -inset-8 ember-glow opacity-40" />
            <img
              src={historyImg}
              alt="Ancient carved stone wall of South Indian temple"
              loading="lazy"
              className="relative h-[60vh] w-full object-cover grayscale-[15%] contrast-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
          </div>
          <div className="absolute -bottom-6 -right-6 hidden lg:block glass rounded-sm px-6 py-4 glow-gold">
            <p className="font-serif text-3xl text-[var(--gold)]">300 BCE</p>
            <p className="text-[10px] uppercase tracking-[0.3em] text-foreground/60">First inscription</p>
          </div>
        </div>

        <div className="reveal">
          <SectionHeading
            eyebrow="The History"
            align="left"
            title={<>A mountain older than memory.</>}
            subtitle="The Tirumala hills have been worshipped for over two thousand years — long before Cholas and Pallavas carved their names into stone."
          />
          <div className="mt-12 grid grid-cols-3 gap-6 border-t border-[var(--gold)]/15 pt-8">
            {[["2200+", "years of worship"], ["7", "sacred hills"], ["108", "Divya Desams"]].map(([n, l]) => (
              <div key={l}>
                <p className="font-serif text-3xl text-[var(--gold)]">{n}</p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.22em] text-foreground/55">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Mysteries() {
  const items = [
    { title: "The Unseen Hair", body: "The deity's hair is said to remain forever smooth, never tangling. No human hand has explained why." },
    { title: "The Burning Camphor", body: "A drop of camphor placed on the idol's chin dissolves without trace — yet leaves the stone untouched." },
    { title: "The Inner Ocean", body: "Place an ear close to the sanctum and a faint roar of waves is heard, though no sea lies within reach." },
    { title: "The Eternal Lamp", body: "A flame in the inner shrine has burned, by record, for more than a thousand years without extinction." },
  ];

  return (
    <section id="mysteries" className="relative overflow-hidden px-6 py-32 sm:py-44">
      <div
        className="absolute inset-0 -z-10 opacity-40"
        style={{
          backgroundImage: `url(${mysteriesImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-background/85 to-background" />
      <Particles count={18} />

      <div className="relative mx-auto max-w-7xl">
        <div className="reveal">
          <SectionHeading
            eyebrow="Ancient Mysteries & Legends"
            title={<>Some things in the sanctum<br /><span className="italic text-[var(--gold)]">cannot be explained.</span></>}
            subtitle="Four mysteries the priests have never resolved — passed mouth to mouth through unbroken lineage."
          />
        </div>

        <div className="mt-20 grid gap-6 sm:grid-cols-2">
          {items.map((m, i) => (
            <article
              key={m.title}
              className="reveal glass group relative overflow-hidden rounded-sm p-10 transition-all duration-700 hover:-translate-y-1 hover:glow-gold"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <span className="absolute right-8 top-8 font-serif text-5xl text-[var(--gold)]/20 transition-all duration-700 group-hover:text-[var(--gold)]/40">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-serif text-2xl text-foreground">{m.title}</h3>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-foreground/65 font-light">{m.body}</p>
              <span className="mt-8 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.32em] text-[var(--gold)]/80">
                Read the legend <span>→</span>
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Architecture() {
  const pillars = [
    { name: "Gopuram", line: "The towering gateway that touches the sky." },
    { name: "Garbhagriha", line: "The womb chamber — where the deity sleeps." },
    { name: "Mandapa", line: "Pillared hall of stone resonating with chant." },
    { name: "Shikhara", line: "The crown of the temple, a mountain in miniature." },
  ];

  return (
    <section id="architecture" className="relative px-6 py-32 sm:py-44">
      <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <div className="reveal relative order-2 lg:order-1">
          <img
            src={architectureImg}
            alt="Towering ancient South Indian gopuram in warm light"
            loading="lazy"
            className="h-[78vh] w-full rounded-sm object-cover"
          />
          <div className="pointer-events-none absolute inset-0 rounded-sm bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>

        <div className="reveal order-1 lg:order-2">
          <SectionHeading
            eyebrow="Sacred Architecture"
            align="left"
            title={<>Geometry of the divine.</>}
            subtitle="Every temple is a cosmos in stone. The gopuram rises like a mountain, the sanctum opens like a cave, the pillars hum like the breath of the deity."
          />
          <ul className="mt-12 divide-y divide-[var(--gold)]/15 border-y border-[var(--gold)]/15">
            {pillars.map((p) => (
              <li key={p.name} className="flex items-baseline gap-6 py-5">
                <span className="font-serif text-xl text-[var(--gold)] min-w-32">{p.name}</span>
                <span className="text-sm text-foreground/65 font-light">{p.line}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Rituals() {
  return (
    <section id="rituals" className="relative overflow-hidden px-6 py-32 sm:py-44 bg-stone-deep">
      <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
        <div className="reveal">
          <SectionHeading
            eyebrow="Rituals & Traditions"
            align="left"
            title={<>Fire, water, flower,<br /><span className="italic text-[var(--gold)]">and silence.</span></>}
            subtitle="Before dawn breaks, the deity is awakened with mantra. Honey, milk, sandal and saffron flow across stone. The same gestures, in the same order, for a thousand years."
          />
          <div className="mt-12 space-y-5">
            {[
              ["04:00", "Suprabhātam — the awakening hymn"],
              ["06:30", "Tomāla Sevā — garlanding the deity"],
              ["09:00", "Abhishekam — ritual bathing in sacred waters"],
              ["20:30", "Ekānta Sevā — the lullaby of rest"],
            ].map(([t, d]) => (
              <div key={t} className="flex items-center gap-6 border-l border-[var(--gold)]/30 pl-6">
                <span className="font-serif text-2xl text-[var(--gold)] min-w-20">{t}</span>
                <span className="text-sm text-foreground/70">{d}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="reveal relative">
          <div className="absolute -inset-10 ember-glow opacity-60 animate-pulse-glow" />
          <img
            src={ritualsImg}
            alt="Brass diyas with flickering flames during temple ritual"
            loading="lazy"
            className="relative h-[70vh] w-full rounded-sm object-cover"
          />
        </div>
      </div>
    </section>
  );
}

function Festivals() {
  const fests = [
    { name: "Brahmotsavam", month: "Sep–Oct", note: "Nine nights of celestial processions." },
    { name: "Vaikuntha Ekādaśī", month: "Dec–Jan", note: "The northern gate to liberation opens." },
    { name: "Ratha Sapṭamī", month: "Feb", note: "The chariot of the sun rolls through dawn." },
    { name: "Kārtika Deepam", month: "Nov–Dec", note: "A million lamps climb the temple hill." },
  ];

  return (
    <section id="festivals" className="relative overflow-hidden">
      <div className="relative h-[60vh] w-full">
        <img
          src={festivalsImg}
          alt="Thousands of oil lamps illuminating ancient temple steps at night"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/70" />
        <div className="relative z-10 flex h-full items-center justify-center px-6 reveal">
          <h2 className="max-w-4xl text-center font-serif text-5xl sm:text-7xl text-foreground text-glow">
            A million lamps,<br /><span className="italic text-[var(--gold)]">one silence.</span>
          </h2>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-px overflow-hidden rounded-sm border border-[var(--gold)]/15 bg-[var(--gold)]/15 sm:grid-cols-2 lg:grid-cols-4">
          {fests.map((f, i) => (
            <article
              key={f.name}
              className="reveal group relative bg-background p-8 transition-colors duration-700 hover:bg-[var(--stone)]"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <p className="text-[10px] uppercase tracking-[0.32em] text-[var(--gold)]/80">{f.month}</p>
              <h3 className="mt-4 font-serif text-2xl text-foreground">{f.name}</h3>
              <p className="mt-3 text-sm text-foreground/60 font-light">{f.note}</p>
              <span className="mt-8 block h-px w-8 bg-[var(--gold)]/40 transition-all duration-700 group-hover:w-20" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function HomeTimeline() {
  const moments = [
    { year: "300 BCE", title: "First inscription", body: "The earliest stone record names the deity of the hill." },
    { year: "850 CE", title: "Chola patronage", body: "Vast endowments expand the temple complex." },
    { year: "1130 CE", title: "Rāmānujācārya arrives", body: "Reforms the rituals still followed today." },
    { year: "1517 CE", title: "Krishnadevarāya's pilgrimage", body: "Seven visits; gold-plated dome of the sanctum." },
    { year: "1843 CE", title: "Mahants of Hathiramji", body: "Caretakers steward the shrine for generations." },
    { year: "Today", title: "Unbroken footfall", body: "Over 60 million pilgrims walk these stones each year." },
  ];

  return (
    <section id="timeline" className="relative px-6 py-32 sm:py-44 bg-stone-deep">
      <div className="reveal mx-auto max-w-3xl">
        <SectionHeading
          eyebrow="Interactive Timeline"
          title={<>Two millennia, one mountain.</>}
          subtitle="Scroll through the moments that shaped the sacred geography of Tirumala."
        />
      </div>

      <div className="relative mx-auto mt-20 max-w-3xl">
        <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-transparent via-[var(--gold)]/40 to-transparent md:left-1/2" />

        <div className="space-y-16">
          {moments.map((m, i) => (
            <div
              key={m.year}
              className={`reveal relative grid gap-4 pl-12 md:grid-cols-2 md:pl-0 ${
                i % 2 ? "md:[&>*:first-child]:order-2" : ""
              }`}
            >
              <span className="absolute left-4 top-2 -translate-x-1/2 md:left-1/2">
                <span className="absolute inset-0 -m-3 rounded-full ember-glow opacity-70 animate-pulse-glow" />
                <span className="relative block h-3 w-3 rounded-full bg-[var(--gold)] shadow-[0_0_12px_var(--saffron)]" />
              </span>

              <div className={i % 2 ? "md:pl-16 md:text-left" : "md:pr-16 md:text-right"}>
                <p className="font-serif text-3xl text-[var(--gold)]">{m.year}</p>
              </div>
              <div className={i % 2 ? "md:pr-16 md:text-right" : "md:pl-16 md:text-left"}>
                <h3 className="font-serif text-2xl text-foreground">{m.title}</h3>
                <p className="mt-2 text-sm text-foreground/60 font-light">{m.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  const imgs = [
    { src: gallery1, alt: "Aerial view of temple complex in misty hills", h: "lg:row-span-2" },
    { src: gallery2, alt: "Single brass oil lamp in darkness", h: "" },
    { src: gallery3, alt: "Ancient sculpted face in shadow and light", h: "" },
  ];
  return (
    <section id="gallery" className="relative px-6 py-32 sm:py-44">
      <div className="reveal mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Gallery"
          title={<>Fragments of the sacred.</>}
          subtitle="A quiet visual archive — stone, flame and silence, framed."
        />
      </div>

      <div className="mx-auto mt-20 grid max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2 auto-rows-[28vh]">
        {imgs.map((g, i) => (
          <figure
            key={i}
            className={`reveal group relative overflow-hidden rounded-sm bg-[var(--stone)] ${g.h}`}
            style={{ transitionDelay: `${i * 100}ms` }}
          >
            <img
              src={g.src}
              alt={g.alt}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-[2200ms] ease-out group-hover:scale-105"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent opacity-80 transition-opacity duration-700 group-hover:opacity-40" />
          </figure>
        ))}
      </div>
    </section>
  );
}

function Pilgrim() {
  return (
    <section id="pilgrim" className="relative overflow-hidden">
      <div className="relative h-[100svh] min-h-[640px] w-full grain vignette">
        <img
          src={pilgrimImg}
          alt="Lone pilgrim silhouette ascending temple steps at dawn"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/55 to-background" />
        <Particles count={22} />

        <div className="relative z-10 mx-auto flex h-full max-w-3xl flex-col items-center justify-center px-6 text-center">
          <p className="reveal text-[10px] uppercase tracking-[0.5em] text-[var(--gold)]/80">
            The Pilgrim's Experience
          </p>
          <h2 className="reveal mt-8 font-serif text-5xl sm:text-7xl text-foreground text-glow">
            Walk the stones<br /><span className="italic text-[var(--gold)]">that walked before you.</span>
          </h2>
          <p className="reveal mt-8 max-w-xl text-base sm:text-lg text-foreground/70 font-light">
            Every step on the seven hills is said to be a verse of the oldest
            poem ever written. Begin your own quiet pilgrimage.
          </p>
          <a
            href="#top"
            className="reveal mt-12 inline-flex items-center gap-3 rounded-full border border-[var(--gold)]/40 bg-background/40 px-9 py-4 text-xs uppercase tracking-[0.32em] text-[var(--gold)] backdrop-blur-md transition-all duration-500 hover:bg-[var(--gold)]/10"
          >
            Begin your journey →
          </a>
        </div>
      </div>
    </section>
  );
}
