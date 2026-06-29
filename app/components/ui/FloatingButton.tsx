import { useState } from "react";
import { Link } from "@remix-run/react";
import { AnimatePresence, motion } from "framer-motion";
import { XIcon } from "lucide-react";

export default function FloatingButton() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 16, transition: { duration: 0.15 } }}
        transition={{ type: "spring", stiffness: 130, damping: 22 }}
        className="fixed inset-x-4 bottom-4 z-40 sm:left-auto sm:right-6 sm:max-w-sm"
      >
        <div className="surface-card flex items-center gap-3 p-3">
          <img
            src="/images/project/localoka-cover.png"
            alt="Localoka project preview"
            className="h-10 w-10 object-cover"
            loading="lazy"
          />
          <div className="min-w-0 flex-1">
            <samp className="block font-mono text-[0.6rem] font-bold uppercase tracking-widest text-[var(--muted)]">
              RECENTLY ADDED
            </samp>
            <Link
              to="/projects/e3dfd84f-75ec-4fbf-9d84-930a1e96855f"
              className="mt-0.5 inline-flex items-center gap-1 font-mono text-xs font-bold uppercase text-[var(--text)] transition-colors hover:text-[var(--accent)]"
            >
              {">>> Localoka case study"}
            </Link>
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="flex h-8 w-8 shrink-0 items-center justify-center border border-[var(--line)] text-[var(--muted)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
            aria-label="Close project notification"
          >
            <XIcon className="h-3 w-3" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
