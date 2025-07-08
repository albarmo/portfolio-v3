import { useCallback, useEffect, useState } from "react";

const useDisclosure = (
  initialState = false
): {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
} => {
  const [isOpen, setIsOpen] = useState(initialState);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const open = useCallback(() => {
    setIsOpen(true);
  }, []);

  const toggle = useCallback(() => {
    setIsOpen((prevState) => !prevState);
  }, []);

  // Memasukkan event listener untuk menangani penutupan ketika tombol escape ditekan
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, close]);

  return {
    isOpen,
    open,
    close,
    toggle,
  };
};

export default useDisclosure;
