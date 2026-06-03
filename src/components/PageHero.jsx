import Particles from "./Particles.jsx";

export default function PageHero({ eyebrow, title, subtitle, image, height = "h-[72vh]" }) {
  return (
    <section className={`relative ${height} min-h-[480px] w-full overflow-hidden grain vignette`}>
      <div className="absolute inset-0 -z-10">
        <img src={image} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/55 to-background" />
      </div>
      <Particles count={18} />
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center pt-24">
        <p className="mb-6 text-[10px] sm:text-xs uppercase tracking-[0.55em] text-[var(--gold)]/80 animate-rise">
          {eyebrow}
        </p>
        <h1
          className="max-w-5xl font-serif text-4xl sm:text-6xl md:text-7xl leading-[1.05] text-foreground text-glow animate-rise"
          style={{ animationDelay: "0.2s" }}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            className="mt-8 max-w-2xl text-base sm:text-lg leading-relaxed text-foreground/70 font-light animate-rise"
            style={{ animationDelay: "0.5s" }}
          >
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
