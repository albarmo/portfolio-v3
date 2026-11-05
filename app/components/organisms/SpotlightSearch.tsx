import { useEffect, useCallback, Fragment, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSpotlight } from "@/components/providers/SpotlightProvider";
import { ChevronDownIcon, ChevronUpIcon, SearchIcon } from "lucide-react";

export function SpotlightSearch() {
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
            const part = parts[i];
            if (part) parent.insertBefore(document.createTextNode(part), textNode);
            if (i < matches.length) {
              const mark = document.createElement("mark");
              mark.className =
                "spotlight-highlight bg-yellow-400 text-black px-0.5 rounded-sm";
              mark.textContent = matches[i] ?? "";
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
            className="fixed inset-0 z-50 bg-ink/65 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.12 }}
              onClick={(e) => e.stopPropagation()}
              className="surface-card relative mx-4 mt-[15vh] max-w-xl overflow-hidden sm:mx-auto"
            >
              <div className="flex items-center border-b border-border p-4">
                <SearchIcon className="h-4 w-4 text-muted" />
                <input
                  type="text"
                  placeholder="Search this page"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="ml-4 w-full bg-transparent text-sm text-foreground placeholder:text-muted focus:outline-none"
                  // eslint-disable-next-line jsx-a11y/no-autofocus
                  autoFocus
                />
              </div>
              {query.length > 1 && (
                <div className="flex items-center justify-end border-t border-border p-2">
                  <samp className="font-mono text-xs text-muted">
                    {results.length > 0 ? `${currentIndex + 1} / ` : ""}
                    {results.length} results
                  </samp>
                  <div className="ml-3 flex items-center gap-1">
                    <button
                      onClick={goToPrevious}
                      disabled={results.length === 0}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted hover:border-accent hover:text-accent disabled:opacity-40"
                    >
                      <ChevronUpIcon className="h-3 w-3" />
                    </button>
                    <button
                      onClick={goToNext}
                      disabled={results.length === 0}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted hover:border-accent hover:text-accent disabled:opacity-40"
                    >
                      <ChevronDownIcon className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <style>{`mark.spotlight-active { background-color: var(--accent); color: var(--ink); }`}</style>
    </Fragment>
  );
}
