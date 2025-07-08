import { SVG_Close } from "@/registry/svg/svg.close";
import React, { PropsWithChildren } from "react";

export function DrawerHeader({
  children,
  onCloseAction,
}: {
  children: React.ReactNode;
  onCloseAction: () => void;
}) {
  return (
    <section className="flex items-center justify-between p-3.5 border-b">
      {children}
      <button
        onClick={() => onCloseAction()}
        className="size-10 flex justify-center items-center"
      >
        <SVG_Close color="dark-gray" className="size-6" />
      </button>
    </section>
  );
}

export function DrawerContent({ children }: PropsWithChildren) {
  return <section className="p-3.5 py-1.5">{children}</section>;
}

export function DrawerFooter({ children }: PropsWithChildren) {
  return <section className="p-3.5 border-t">{children}</section>;
}

interface I_PropsBottomDrawer {
  children: React.ReactNode;
  isOpen: boolean;
}
export default function ModalBottomDrawer({
  children,
  isOpen,
}: I_PropsBottomDrawer) {
  if (!isOpen) return <></>;

  return (
    <div className="fixed top-0 left-0 z-10 flex justify-end items-end h-screen w-screen bg-black/40">
      <div className="w-full h-max bg-white">{children}</div>
    </div>
  );
}
