import { Link } from "react-router";
import { motion, useReducedMotion, useSpring } from "framer-motion";
import { ArrowUpRight, MousePointer2 } from "lucide-react";
import type { PointerEvent } from "react";
import { FrameOverlay } from "@/components/molecules/FrameOverlay";
import { RainbowArc } from "@/components/organisms/RainbowArc";

const CAREER_START = 2021;
const CURSOR_SPRING = { stiffness: 150, damping: 18 };
// how far the name cursor wanders toward the pointer, as a share of the distance from the photo center
const CURSOR_FOLLOW = 0.35;

export function AboutMe() {
  const years = new Date().getFullYear() - CAREER_START;
  const reduceMotion = useReducedMotion();
  const cursorX = useSpring(0, CURSOR_SPRING);
  const cursorY = useSpring(0, CURSOR_SPRING);

  const followPointer = (e: PointerEvent<HTMLDivElement>) => {
    if (reduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    cursorX.set((e.clientX - rect.left - rect.width / 2) * CURSOR_FOLLOW);
    cursorY.set((e.clientY - rect.top - rect.height / 2) * CURSOR_FOLLOW);
  };
  const restCursor = () => {
    cursorX.set(0);
    cursorY.set(0);
  };

  return (
    <section id="about" className="section-pad paper-section relative isolate scroll-mt-20 overflow-hidden">
      <RainbowArc side="right" />
      <div className="section-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-20">
        <div className="relative m-3" onPointerMove={followPointer} onPointerLeave={restCursor}>
          <figure className="relative overflow-hidden rounded-[2rem] bg-primary lg:rounded-[2.5rem]">
            <img
              src="/images/character-2.png"
              alt="Albar Moerhamsa"
              className="aspect-[4/5] h-full w-full object-cover object-top"
              width={840}
              height={1050}
              loading="lazy"
            />
          </figure>
          <FrameOverlay label="albar.png" selected className="-inset-3" />
          <motion.div
            aria-hidden="true"
            style={{ x: cursorX, y: cursorY }}
            className="pointer-events-none absolute left-[38%] top-[64%] z-20 flex items-start"
          >
            <MousePointer2 className="h-6 w-6 -rotate-6 fill-accent text-ink" strokeWidth={1.5} />
            <span className="mt-5 rounded-full border-[1.5px] border-ink bg-accent px-3 py-1 text-xs font-bold text-ink">
              Albar
            </span>
          </motion.div>
        </div>

        <div>
          <h2 className="max-w-[11ch] font-display text-6xl font-black uppercase leading-[0.86] tracking-[-0.035em] text-foreground sm:text-7xl lg:text-8xl">
            Design sense. Engineering depth. Product thinking.
          </h2>
          <p className="mt-7 max-w-[60ch] text-base leading-8 text-muted">
            I&apos;m a Software Engineer who turns complex requirements into
            intuitive, scalable, and reliable digital products. My work sits
            between frontend engineering, product thinking, and careful visual
            execution.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-border pt-8 sm:grid-cols-3">
            <div>
              <strong className="font-display text-5xl font-black uppercase leading-none text-primary">
                {years}+
              </strong>
              <span className="mt-2 block text-xs font-bold uppercase tracking-[0.08em] text-muted">
                Years of experience
              </span>
            </div>
            <div>
              <strong className="font-display text-5xl font-black uppercase leading-none text-foreground">
                Product
              </strong>
              <span className="mt-2 block text-xs font-bold uppercase tracking-[0.08em] text-muted">
                Focused engineering
              </span>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <strong className="font-display text-5xl font-black uppercase leading-none text-accent">
                Fintech
              </strong>
              <span className="mt-2 block text-xs font-bold uppercase tracking-[0.08em] text-muted">
                Government and digital products
              </span>
            </div>
          </div>

          <Link to="/about" className="premium-link premium-link-secondary mt-10">
            More about me <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
