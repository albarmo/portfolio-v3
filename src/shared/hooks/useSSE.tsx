"use client";

import { UserSessionContext } from "@/modules/providers/UserSessionContext";
import { useContext, useEffect, useState } from "react";

export function useSSE<T = unknown>(url: string) {
  const user = useContext(UserSessionContext);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const fullUrl = `${url}&X-Localoka-Device-Type=web&X-Localoka-Platform=webview&X-Localoka-Device-ID=${user?.deviceId}&user=Bearer%20${user?.token}`;
    const source = new EventSource(fullUrl);

    source.onopen = () => {
      console.info("Connecting to SSE Notification");
      setIsConnected(true);
    };

    source.onmessage = (event) => {
      try {
        setData(JSON.parse(event.data));
        setIsLoading(false);
      } catch {
        setData(event.data as T);
        setIsLoading(false);
      }
    };

    source.onerror = (err) => {
      console.error("SSE error:", err);
      setError("SSE connection error");
      source.close();
      setIsConnected(false);
      setIsLoading(false);
    };

    return () => {
      source.close();
      setIsConnected(false);
      setIsLoading(false);
    };
  }, [url]);

  return { data, error, isLoading, isConnected };
}
