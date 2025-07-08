"use client";

import React, { type FC, type PropsWithChildren } from "react";

const PageLayout: FC<PropsWithChildren<{ className?: string }>> = ({
  children,
  className,
}) => {
  return (
    <div
      className={`min-h-lvh w-lvw overflow-hidden bg-[#F8F9F9] pt-14 ${className}`}
    >
      {children}
    </div>
  );
};

export default PageLayout;
