import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
  useReducedMotion,
  wrap,
} from "framer-motion";
import { useRef } from "react";
import "./ParallaxScrollVelocity.css";

interface ParallaxProps {
  children: string;
  baseVelocity: number;
}

function ParallaxText({ children, baseVelocity = 100 }: ParallaxProps) {
  const reduceMotion = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  /**
   * This is a magic wrapping for the length of the text - you
   * have to replace for wrapping that works for you or dynamically
   * calculate
   */
  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef<number>(1);
  useAnimationFrame((t, delta) => {
    if (reduceMotion) return;
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    /**
     * This is what changes the direction of the scroll once we
     * switch scrolling directions.
     */
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="parallax">
      <motion.div className="scroller" style={{ x }}>
        <span>{children} </span>
        <span>{children} </span>
        <span>{children} </span>
        <span>{children} </span>
      </motion.div>
    </div>
  );
}

export default function ParallaxScrollVelocity() {
  const skills = [
    "Website",
    "Mobile",
    "UI/UX",
    "Go",
    "TypeScript",
  ];

  const techStack = [
    "React",
    "Next",
    "Remix",
    "Nestjs",
    "Tailwind",
    "Express",
  ];

  const text = skills.join(" / ");
  const textTechStack = techStack.join(" / ");

  return (
    <section className="py-8 text-4xl font-black text-neutral-950/10 dark:text-white/10 md:text-6xl">
      <ParallaxText baseVelocity={-1}>{text}</ParallaxText>
      <ParallaxText baseVelocity={1}>{textTechStack}</ParallaxText>
    </section>
  );
}
