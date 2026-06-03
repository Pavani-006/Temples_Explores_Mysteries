/** Sacred ornamental divider inspired by Indian temple inscriptions. */
export default function SanskritDivider({ symbol = "ॐ" }) {
  return (
    <div className="flex items-center justify-center gap-6 py-10" aria-hidden>
      <span className="h-px w-24 bg-gradient-to-r from-transparent via-[var(--gold)]/50 to-[var(--gold)]/70" />
      <span className="relative flex h-12 w-12 items-center justify-center">
        <span className="absolute inset-0 rounded-full ember-glow animate-pulse-glow" />
        <span className="relative font-serif text-3xl text-[var(--gold)] text-glow">{symbol}</span>
      </span>
      <span className="h-px w-24 bg-gradient-to-l from-transparent via-[var(--gold)]/50 to-[var(--gold)]/70" />
    </div>
  );
}
