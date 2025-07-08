"use client";

import { type FC, type PropsWithChildren, useEffect, useState } from "react";

const ProviderTheme: FC<PropsWithChildren> = ({ children }) => {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return children;
  }

  return <div>{children}</div>;
};

export default ProviderTheme;
