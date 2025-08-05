import { useEffect, useCallback, Fragment, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSpotlight } from "~/context/SpotlightContext";
import { ChevronDownIcon, ChevronUpIcon, SearchIcon } from "lucide-react";

export default function SpotlightSearch() {
  const { isOpen, setIsOpen } = useSpotlight();

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<HTMLElement[]>([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const clearHighlights = useCallback(() => {
    const marks = document.querySelectorAll("mark.spotlight-highlight");
    marks.forEach((mark) => {
      const parent = mark.parentNode;
      if (parent) {
        parent.replaceChild(
          document.createTextNode(mark.textContent || ""),
          mark
        );
        parent.normalize();
      }
    });
    setResults([]);
    setCurrentIndex(-1);
  }, []);

  const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  const searchAndHighlight = useCallback((searchTerm: string, searchNode: Node) => {
      if (!searchTerm.trim()) return [];
      const newResults: HTMLElement[] = [];
      const escapedTerm = escapeRegExp(searchTerm);
      const regex = new RegExp(escapedTerm, "gi");

      const walker = document.createTreeWalker(
        searchNode,
        NodeFilter.SHOW_TEXT,
        null
      );
      let node;
      const nodesToProcess: Text[] = [];
      while ((node = walker.nextNode())) {
        if (node instanceof Text) nodesToProcess.push(node);
      }
      nodesToProcess.forEach((textNode) => {
        if (textNode.textContent && regex.test(textNode.textContent)) {
          const parent = textNode.parentNode;
          if (!parent || parent.nodeName === "MARK") return;
          const matches = textNode.textContent.match(regex);
          if (!matches) return;
          const parts = textNode.textContent.split(regex);
          for (let i = 0; i < parts.length; i++) {
            if (parts[i])
              parent.insertBefore(document.createTextNode(parts[i]), textNode);
            if (i < matches.length) {
              const mark = document.createElement("mark");
              mark.className =
                "spotlight-highlight bg-yellow-400 text-black px-0.5 rounded-sm";
              mark.textContent = matches[i];
              parent.insertBefore(mark, textNode);
              newResults.push(mark);
            }
          }
          parent.removeChild(textNode);
        }
      });
      return newResults;
    },
    []
  );

  useEffect(() => {
    if (!isMounted) return;
    clearHighlights();
    if (query.length > 1) {
        const mainContent = document.querySelector("main");
      if (mainContent) {
        const foundResults = searchAndHighlight(query, mainContent);
        setResults(foundResults);
        if (foundResults.length > 0) setCurrentIndex(0);
      }
    }
  }, [query, clearHighlights, searchAndHighlight, isMounted]);

  useEffect(() => {
    results.forEach((result, index) => {
      result.classList.toggle("spotlight-active", index === currentIndex);
      if (index === currentIndex)
        result.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }, [currentIndex, results]);

  useEffect(() => {
    if (!isMounted) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (event.key === "Escape" && isOpen) setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isMounted, setIsOpen]);

  const goToNext = () => {
    if (results.length > 0)
      setCurrentIndex((prev) => (prev + 1) % results.length);
  };
  const goToPrevious = () => {
    if (results.length > 0)
      setCurrentIndex((prev) => (prev - 1 + results.length) % results.length);
  };

  return (
    <Fragment>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, y: -20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: -20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative mx-auto mt-[15vh] w-full max-w-xl rounded-3xl bg-neutral-800/80 border border-neutral-700 shadow-2xl"
            >
              <div className="flex items-center p-4">
                <SearchIcon />
                <input
                  type="text"
                  placeholder="Cari di halaman ini..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full bg-transparent text-white placeholder-neutral-500 text-lg ml-4 focus:outline-none"
                  // eslint-disable-next-line jsx-a11y/no-autofocus
                  autoFocus
                />
              </div>
              {query.length > 1 && (
                <div className="border-t border-neutral-700 p-2 flex items-center justify-end text-sm text-neutral-400">
                  <span>
                    {results.length > 0 ? `${currentIndex + 1} dari ` : ""}
                    {results.length} hasil
                  </span>
                  <div className="flex items-center ml-4">
                    <button
                      onClick={goToPrevious}
                      disabled={results.length === 0}
                      className="p-1 rounded-md hover:bg-neutral-700 disabled:opacity-50"
                    >
                      <ChevronUpIcon />
                    </button>
                    <button
                      onClick={goToNext}
                      disabled={results.length === 0}
                      className="p-1 rounded-md hover:bg-neutral-700 disabled:opacity-50"
                    >
                      <ChevronDownIcon />
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <style>{`mark.spotlight-active { background-color: #f59e0b; transition: background-color 0.2s ease-in-out; }`}</style>
    </Fragment>
  );
}
