// Drop the screenshots into public/images/meet/ with these names (16:9 works best).
const meetShots = [
  "/images/meet/meet-1.webp",
  "/images/meet/meet-2.webp",
  "/images/meet/meet-3.webp",
  "/images/meet/meet-4.webp",
  "/images/meet/meet-5.webp",
  "/images/meet/meet-6.webp",
];

const half = Math.ceil(meetShots.length / 2);
const rows = [meetShots.slice(0, half), meetShots.slice(half)];

function MarqueeRow({ shots, reverse }: { shots: string[]; reverse?: boolean }) {
  return (
    <div className="group flex overflow-hidden motion-reduce:overflow-x-auto">
      <div
        className={`flex w-max shrink-0 animate-[marquee_45s_linear_infinite] group-hover:[animation-play-state:paused] motion-reduce:animate-none ${
          reverse ? "[animation-direction:reverse]" : ""
        }`}
      >
        {/* 4 copies: each half (2 copies) stays wider than wide screens, so translateX(-50%) loops seamlessly */}
        {[...shots, ...shots, ...shots, ...shots].map((src, index) => (
          <figure
            key={`${src}-${index}`}
            aria-hidden={index >= shots.length}
            className="mr-4 aspect-video w-[18rem] shrink-0 overflow-hidden rounded-2xl bg-surface-muted ring-1 ring-border sm:mr-5 sm:w-[26rem] lg:w-[30rem]"
          >
            <img
              src={src}
              alt={index < shots.length ? "Google Meet session with a client team" : ""}
              className="h-full w-full object-cover"
              loading="lazy"
              width={960}
              height={540}
            />
          </figure>
        ))}
      </div>
    </div>
  );
}

export function CollaborationGallery() {
  return (
    <section className="section-pad overflow-hidden">
      <div className="section-shell">
        <h2 className="max-w-[12ch] font-display text-6xl font-black uppercase leading-[0.84] tracking-[-0.035em] sm:text-7xl lg:text-8xl">
          Good work is built together.
        </h2>
      </div>

      <div className="mt-14 flex flex-col gap-4 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)] sm:gap-5">
        {rows.map((shots, index) => (
          <MarqueeRow key={index} shots={shots} reverse={index % 2 === 1} />
        ))}
      </div>
    </section>
  );
}
