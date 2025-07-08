'use client';

import { usePathname } from 'next/navigation';
import { createContext, useContext, useEffect, useRef, useState } from 'react';

const NavigationContext = createContext({ direction: 1 });

export const NavigationProvider = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
    const previousPath = useRef<string | null>(null);
    const [direction, setDirection] = useState(1);

    useEffect(() => {
        if (previousPath.current && previousPath.current !== pathname) {
            // Ganti ini sesuai urutan rute kamu (bisa pakai index)
            const prev = previousPath.current.length;
            const curr = pathname.length;
            setDirection(curr > prev ? 1 : -1); // 1 = forward, -1 = back
        }
        previousPath.current = pathname;
    }, [pathname]);

    return (
        <NavigationContext.Provider value={{ direction }}>
            {children}
        </NavigationContext.Provider>
    );
};

export const useNavigationDirection = () => useContext(NavigationContext);
