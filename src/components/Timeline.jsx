export default function Timeline({ items }) {
  return (
    <div className="relative mt-16 pl-8 border-l border-[var(--gold)]/30">
      {items.map((m, i) => (
        <div key={i} className="reveal relative pb-12" style={{ transitionDelay: `${i * 80}ms` }}>
          <span className="absolute -left-[2.45rem] top-1.5 block h-3 w-3 rounded-full bg-[var(--gold)] shadow-[0_0_14px_var(--saffron)]" />
          <p className="font-serif text-2xl text-[var(--gold)]">{m.year}</p>
          <p className="mt-2 text-foreground/65 text-sm">{m.event}</p>
        </div>
      ))}
    </div>
  );
}
