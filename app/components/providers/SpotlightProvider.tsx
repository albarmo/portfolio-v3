import { createContext, useState, useContext, ReactNode, Dispatch, SetStateAction } from 'react';

interface SpotlightContextType {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const SpotlightContext = createContext<SpotlightContextType | undefined>(undefined);

export function SpotlightProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <SpotlightContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </SpotlightContext.Provider>
  );
}

export function useSpotlight() {
  const context = useContext(SpotlightContext);
  if (context === undefined) {
    throw new Error('useSpotlight must be used within a SpotlightProvider');
  }
  return context;
}

