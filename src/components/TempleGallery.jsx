export default function TempleGallery({ images, name }) {
  return (
    <div className="mt-12 grid auto-rows-[220px] grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {images.map((src, i) => (
        <div
          key={i}
          className={`reveal group relative overflow-hidden rounded-sm ${
            i === 0 ? "col-span-2 row-span-2" : i === 3 ? "row-span-2" : ""
          }`}
          style={{ transitionDelay: `${i * 60}ms` }}
        >
          <img
            src={src}
            alt={`${name} ${i + 1}`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </div>
      ))}
    </div>
  );
}
