"use client";

import React, { useEffect, useState } from "react";
import useDisclosure from "@/shared/hooks/useDisclosure";
import {
  Emit_OpenSnackbar,
  globalEmitter,
} from "@/lib/emitter/global/GlobalEmitter";
import { motion } from "framer-motion";
import { ToasterStatus } from "@/lib/toaster";

export default function CE_Snackbar() {
  const { isOpen, open, close } = useDisclosure();
  const [data, setData] = useState<Emit_OpenSnackbar | null>();

  useEffect(() => {
    if (!isOpen) {
      globalEmitter.remove("openSnackbar");
      globalEmitter.remove("closeSnackbar");
    }

    globalEmitter.on("openSnackbar", (payload) => {
      setData(payload);
      open();
    });

    globalEmitter.on("closeSnackbar", ({ onClose }) => {
      if (onClose) {
        onClose();
      }
      close();

      setData(null);
    });
  }, [open, close, isOpen]);

  if (!isOpen) return null;

  const statusStyle: Record<ToasterStatus, string> = {
    success: "bg-green-50 border-green-500",
    error: "bg-red-50 border-red-500",
    info: "bg-blue-50 border-blue-500",
    warning: "bg-yellow-50 border-yellow-500",
  };

  return (
    <motion.div
      key="snackbar"
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 30, opacity: 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className="fixed top-16 left-2.5 right-2.5 flex justify-center items-start z-50"
    >
      <div
        data-testid="snackbar-toast"
        data-toast-status={data?.status}
        className={`${
          statusStyle[(data?.status as ToasterStatus) ?? "info"]
        } border-l-8 py-3 px-4 flex justify-between items-center rounded-lg space-x-2 w-full shadow-lg`}
      >
        <div className="w-full space-y-1">
          <section className="flex justify-start items-start space-x-2.5 w-11/12">
            <h5
              data-testid="snackbar-title"
              className="font-semibold text-[#27272A] line-clamp-3 capitalize"
            >
              {data?.title || data?.status}
            </h5>
          </section>
          <p data-testid="snackbar-message" className="text-sm text-[#52525B]">
            {data?.message}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
