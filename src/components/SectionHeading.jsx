export default function SectionHeading({ eyebrow, title, subtitle, align = "center" }) {
  const alignCls = align === "center" ? "text-center items-center" : "text-left items-start";
  return (
    <div className={`flex flex-col gap-6 ${alignCls}`}>
      <p className="text-[10px] uppercase tracking-[0.5em] text-[var(--gold)]/80">{eyebrow}</p>
      <h2 className="max-w-3xl font-serif text-4xl sm:text-5xl md:text-6xl leading-[1.05] text-foreground">
        {title}
      </h2>
      {subtitle && (
        <p className="max-w-2xl text-base sm:text-lg leading-relaxed text-foreground/65 font-light">
          {subtitle}
        </p>
      )}
    </div>
  );
}
