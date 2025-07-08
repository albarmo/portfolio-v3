"use client";

import React, { useEffect } from "react";
import useDisclosure from "@/shared/hooks/useDisclosure";
import { globalEmitter } from "@/lib/emitter/global/GlobalEmitter";

export default function CE_LoadingSpinner() {
  const { isOpen, open, close } = useDisclosure(false);

  useEffect(() => {
    if (!isOpen) {
      globalEmitter.remove("displayLoadingSpinner");
    }

    globalEmitter.on("displayLoadingSpinner", (payload) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      payload.status ? open() : close();
    });
  }, [open, close, isOpen]);

  if (!isOpen) return null;

  return (
    <div
      id="authentication-modal"
      aria-hidden="true"
      className="fixed inset-x-0 top-0 left-0 z-[999] flex h-screen max-h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden bg-gray-900/30 md:inset-0"
    >
      <div
        role="status"
        className="flex flex-col items-center justify-center space-y-1.5 rounded-md bg-white p-3.5"
      >
        <svg
          className="size-10 animate-spin fill-[#1078CA] text-gray-200 dark:text-gray-600"
          width="41"
          height="40"
          viewBox="0 0 41 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M40.5 20C40.5 31.0457 31.5457 40 20.5 40C9.4543 40 0.5 31.0457 0.5 20C0.5 8.9543 9.4543 0 20.5 0C31.5457 0 40.5 8.9543 40.5 20ZM7.14637 20C7.14637 27.375 13.125 33.3536 20.5 33.3536C27.875 33.3536 33.8536 27.375 33.8536 20C33.8536 12.625 27.875 6.64637 20.5 6.64637C13.125 6.64637 7.14637 12.625 7.14637 20Z"
            fill="url(#paint0_angular_395_12661)"
          />
          <circle cx="20.5003" cy="36.6666" r="3.33333" fill="#1078CA" />
          <radialGradient
            id="paint0_angular_395_12661"
            cx="1"
            cy="1"
            r="1.5"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(20.5 20) rotate(90) scale(20)"
          >
            <stop offset={0.6} stopColor="#1078CA" />
            <stop offset={1} stopColor="#DBEBF7" />
          </radialGradient>
        </svg>
        <span className="animate-pulse text-center text-xs text-gray-600">
          Memuat...
        </span>
      </div>
    </div>
  );
}
