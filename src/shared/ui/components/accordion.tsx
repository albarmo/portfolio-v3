"use client";

import React, { Fragment, useRef, useState, useEffect } from "react";
import useDisclosure from "@/shared/hooks/useDisclosure";

interface I_PropsAccordionItem {
  title: string;
  children: React.ReactNode;
}

export default function AccordionItem({
  title,
  children,
}: I_PropsAccordionItem) {
  const { isOpen, open, close } = useDisclosure(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | undefined>(
    isOpen ? undefined : 0
  );

  const toggle = () => {
    if (isOpen) {
      close();
    } else {
      open();
    }
  };

  useEffect(() => {
    if (!contentRef.current) return;

    if (isOpen) {
      const contentHeight = contentRef.current.scrollHeight;
      setHeight(contentHeight);
    } else {
      setHeight(0);
    }
  }, [isOpen]);

  return (
    <Fragment>
      <h2 id={`accordion-heading`} onClick={() => toggle()}>
        <button
          type="button"
          className="flex items-center justify-between w-full p-2.5 font-medium rtl:text-right text-gray-500 border border-x-0 border-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3"
          aria-expanded={isOpen}
          aria-controls={`accordion-body-$`}
        >
          <span className="flex text-foreground font-semibold items-center">
            {title}
          </span>
          <svg
            className={`w-3 h-3 shrink-0 transition-transform duration-300 ${
              isOpen ? "rotate-0" : "rotate-180"
            }`}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5 5 1 1 5"
            />
          </svg>
        </button>
      </h2>
      <div
        id={`accordion-body`}
        ref={contentRef}
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{
          height: height ? `${height}px` : "0px",
          opacity: isOpen ? 1 : 0,
        }}
        aria-labelledby={`accordion-heading`}
      >
        <div className="p-2.5"> {children} </div>
      </div>
    </Fragment>
  );
}
