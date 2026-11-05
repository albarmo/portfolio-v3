import { Link } from "react-router";
import { AnimatePresence, motion } from "framer-motion";
import { NAV_LINKS } from "@/constants/navigation";

export const MOBILE_MENU_ID = "mobile-menu";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-x-0 top-[4.5rem] z-40 border-b border-cloud/15 bg-ink/95 p-5 text-cloud shadow-[0_20px_50px_rgba(17,24,39,0.18)] backdrop-blur-md xl:hidden"
          id={MOBILE_MENU_ID}
        >
          <div className="section-shell grid gap-1">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={onClose}
                className="rounded-xl px-3 py-3 text-sm font-bold uppercase tracking-[0.08em] text-cloud hover:bg-cloud/10"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
