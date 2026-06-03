import { Link } from "react-router-dom";
import SectionHeading from "./SectionHeading.jsx";
import TempleCard from "./TempleCard.jsx";
import { temples } from "@/data/temples.js";

const FEATURED_SLUGS = [
  "tirumala-venkateswara",
  "lepakshi",
  "konark-sun-temple",
  "kailasa-ellora",
  "padmanabhaswamy",
  "brihadeeswarar",
];

export default function FeaturedTemples() {
  const featured = FEATURED_SLUGS.map((s) => temples.find((t) => t.slug === s)).filter(Boolean);

  return (
    <section id="featured-temples" className="relative px-6 py-32 sm:py-40">
      <div className="reveal mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Featured Temples"
          title={
            <>
              Six sanctums.{" "}
              <span className="italic text-[var(--gold)]">One unbroken thread.</span>
            </>
          }
          subtitle="Step into the most mysterious and architecturally astonishing temples of ancient India — each a chapter in a story still being whispered through stone."
        />
      </div>

      <div className="mx-auto mt-20 grid max-w-7xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((t, i) => (
          <TempleCard key={t.slug} temple={t} index={i} />
        ))}
      </div>

      <div className="mt-16 text-center">
        <Link
          to="/temples"
          className="inline-flex items-center gap-3 rounded-full border border-[var(--gold)]/30 px-7 py-3 text-[11px] uppercase tracking-[0.32em] text-[var(--gold)] hover:bg-[var(--gold)]/10 transition-all duration-500"
        >
          Explore all temples
          <span>→</span>
        </Link>
      </div>
    </section>
  );
}
