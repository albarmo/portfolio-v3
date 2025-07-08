"use client";

import { useContext, useEffect, useRef, useState } from "react";
import { ENV } from "@/configs/environment";
import { UserSessionContext } from "@/modules/providers/UserSessionContext";

const useWebSocketConnectionHook = (
  cb: (arg: unknown) => void,
  event?: unknown,
  role?: string
) => {
  const ws = useRef<WebSocket | null>(null);
  const { token } = useContext(UserSessionContext);

  const [isLoading, setIsLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);

  const socketUrl = `${ENV.URI.WS_CHAT_URL}?token=${token}&role=${role || "buyer"}`;

  function socketClient() {
    console.info("Trying Connect to the WebSocket server");
    ws.current = new WebSocket(socketUrl);

    ws.current.onopen = () => {
      setIsConnected(true);
      !!event ? ws.current?.send(JSON.stringify(event)) : setIsLoading(false);
    };

    ws.current.onmessage = (event) => {
      try {
        const messages = JSON.parse(event.data);
        cb(messages);
        setIsLoading(false);
      } catch (error) {
        console.error("Message error:", error);
        cb(error);
        setIsLoading(false);
      }
    };

    ws.current.onclose = () => {
      console.info("WebSocket connection closed!");
      setIsConnected(false);
    };
  }

  useEffect(() => {
    socketClient();

    return () => {
      ws.current?.close(1000, "Client closed ws connection");
      setIsConnected(false);
    };
  }, [role]);

  return {
    ws,
    isConnected,
    isLoading,
  };
};

export default useWebSocketConnectionHook;
