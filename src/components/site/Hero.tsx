import { useEffect, useState } from "react";
import heroImg from "@/assets/hero-tirumala.jpg";
import { Particles } from "./Particles";

export function Hero() {
  const [y, setY] = useState(0);

  useEffect(() => {
    const onScroll = () => setY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      id="top"
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden grain vignette"
    >
      {/* Parallax background */}
      <div
        className="absolute inset-0 -z-10 will-change-transform"
        style={{
          transform: `translate3d(0, ${y * 0.35}px, 0) scale(${1 + y * 0.0004})`,
        }}
      >
        <img
          src={heroImg}
          alt="Ancient Tirumala temple hills at sunrise wrapped in golden mist"
          width={1920}
          height={1080}
          className="h-full w-full object-cover animate-fade"
          style={{ animationDuration: "3s" }}
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.1_0.01_60/0.55)] via-[oklch(0.1_0.01_60/0.4)] to-[oklch(0.1_0.01_60/0.95)]" />
      </div>

      <Particles count={32} />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <p
          className="mb-8 text-[10px] sm:text-xs uppercase tracking-[0.55em] text-[var(--gold)]/80 animate-rise"
          style={{ animationDelay: "0.3s" }}
        >
          Ancient India · Sacred Geography
        </p>

        <h1
          className="max-w-5xl font-serif text-5xl sm:text-7xl md:text-8xl leading-[1.02] text-foreground text-glow animate-rise"
          style={{ animationDelay: "0.6s" }}
        >
          Where the mountains
          <br />
          <span className="italic text-[var(--gold)]">remember the gods.</span>
        </h1>

        <p
          className="mt-10 max-w-xl text-base sm:text-lg leading-relaxed text-foreground/70 font-light animate-rise"
          style={{ animationDelay: "1s" }}
        >
          A cinematic pilgrimage through the temples, mysteries and unbroken
          rituals of ancient Bhārata — told in stone, fire and silence.
        </p>

        <div
          className="mt-12 flex items-center gap-6 animate-rise"
          style={{ animationDelay: "1.3s" }}
        >
          <a
            href="#history"
            className="group relative inline-flex items-center gap-3 rounded-full bg-[var(--gold)] px-8 py-3.5 text-sm uppercase tracking-[0.22em] text-[var(--primary-foreground)] glow-gold transition-transform duration-500 hover:scale-[1.03]"
          >
            Enter the Temple
            <span className="transition-transform duration-500 group-hover:translate-x-1">
              →
            </span>
          </a>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 animate-rise"
        style={{ animationDelay: "1.8s" }}
      >
        <div className="flex flex-col items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-foreground/45">
          Scroll
          <span className="relative block h-12 w-px bg-gradient-to-b from-[var(--gold)]/60 to-transparent">
            <span className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 rounded-full bg-[var(--gold)] animate-flicker shadow-[0_0_14px_var(--saffron)]" />
          </span>
        </div>
      </div>
    </section>
  );
}
