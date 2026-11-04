import { useNavigation } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";

export default function PageProgressBar() {
  const navigation = useNavigation();
  const isLoading = navigation.state !== "idle";

  const [width, setWidth] = useState(0);
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const incrementRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isLoading) {
      setVisible(true);
      setWidth(0);

      // Quickly jump to 20%, then slowly crawl to 85%
      timerRef.current = setTimeout(() => setWidth(20), 20);
      incrementRef.current = setInterval(() => {
        setWidth((w) => {
          if (w >= 85) {
            clearInterval(incrementRef.current!);
            return w;
          }
          // Slow down as it approaches 85%
          return w + (85 - w) * 0.06;
        });
      }, 200);
    } else {
      // Navigation done — snap to 100%, then fade out
      if (incrementRef.current) clearInterval(incrementRef.current);
      if (timerRef.current) clearTimeout(timerRef.current);

      setWidth(100);
      timerRef.current = setTimeout(() => {
        setVisible(false);
        setWidth(0);
      }, 300);
    }

    return () => {
      if (incrementRef.current) clearInterval(incrementRef.current);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isLoading]);

  if (!visible) return null;

  return (
    <div
      className="pointer-events-none fixed left-0 top-0 z-[9999] h-[3px]"
      style={{
        width: `${width}%`,
        background: "var(--accent)",
        transition: isLoading
          ? "width 0.4s ease-out"
          : "width 0.2s ease-in",
        opacity: visible ? 1 : 0,
      }}
    />
  );
}
