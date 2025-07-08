"use client";

import React, { type FC, type PropsWithChildren, useContext } from "react";
import { UserSessionContext } from "@/modules/providers/UserSessionContext";

const HomeLayout: FC<PropsWithChildren> = ({ children }) => {
  useContext(UserSessionContext);
  return <main className="min-h-screen w-screen pb-16">{children}</main>;
};

export default HomeLayout;
