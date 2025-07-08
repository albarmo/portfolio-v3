"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useNavigationDirection } from "./NavigationContext";

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { direction } = useNavigationDirection();

  const variants = {
    initial: (dir: number) => ({
      x: dir > 0 ? 0 : "-100%",
      opacity: 0,
    }),
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 30,
      },
    },
  };

  const handleComplete = () => {
    window?.scrollTo({ top: 0, behavior: "instant" });
  };

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        custom={direction}
        variants={variants}
        initial="initial"
        animate="animate"
        onAnimationComplete={handleComplete}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
