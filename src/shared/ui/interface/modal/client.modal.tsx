"use client";

import React, { useEffect } from "react";
import { lockScroll, unlockScroll } from "@/shared/func/lock.scroll";

interface IProps_Modal {
  isOpen: boolean;
  closeAction: () => void;
  title: string;
  children: React.ReactNode;
  variant: "form" | "status" | "dialog" | "confirmation";
  status?: "success" | "failed";
  buttonTitle?: string;
  buttonCloseTitle?: string;
  onConfirmAction?: () => void;
  closeable: boolean;
  cancelButtonText?: string;
  confirmButtonText?: string;
  isSaving?: boolean;
}

const ButtonCloseModal = ({
  isCloseable,
  close,
}: {
  isCloseable: boolean;
  close: () => void;
}) => {
  if (!isCloseable) return null;
  return (
    <button
      type="button"
      onClick={close}
      className="end-2.5 ms-auto inline-flex size-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
      data-modal-hide="authentication-modal"
    >
      <svg
        className="size-3"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 14 14"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
        />
      </svg>
      <span className="sr-only">Close modal</span>
    </button>
  );
};

export default function CE_Modal({
  isOpen,
  closeAction,
  title,
  children,
  variant,
  buttonTitle = "",
  buttonCloseTitle = "Tutup",
  onConfirmAction,
  closeable = true,
  cancelButtonText = "Batal",
  confirmButtonText = "Ya, Simpan",
  isSaving = false,
}: IProps_Modal) {
  useEffect(() => {
    if (isOpen) {
      lockScroll();
    } else {
      unlockScroll();
    }

    return () => unlockScroll();
  }, [isOpen]);

  if (!isOpen) return null;

  switch (variant) {
    case "form":
      return (
        <div
          id="authentication-modal"
          aria-hidden="true"
          className="fixed inset-0 z-50 flex h-screen w-full items-center justify-center overflow-y-auto overflow-x-hidden bg-black/40 md:inset-0"
        >
          <div className="relative max-h-full w-full max-w-lg p-4">
            <div className="relative rounded-lg bg-white shadow dark:bg-gray-700">
              {title ? (
                <div className="flex items-center justify-between rounded-t border-b p-4 dark:border-gray-600 md:p-2.5">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                    {title}
                  </h3>
                  <ButtonCloseModal
                    isCloseable={closeable}
                    close={closeAction}
                  />
                </div>
              ) : (
                <ButtonCloseModal isCloseable={closeable} close={closeAction} />
              )}
              <div className="p-4 md:p-5">{children}</div>
            </div>
          </div>
        </div>
      );
    case "status": {
      const onCloseAction = () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        onConfirmAction && onConfirmAction();
        closeAction();
      };

      return (
        <div
          id="authentication-modal"
          aria-hidden="true"
          className="fixed inset-0 z-50 flex h-screen w-full items-center justify-center overflow-y-auto overflow-x-hidden bg-black/40 md:inset-0"
        >
          <div className="relative max-h-full w-full max-w-sm p-5">
            <div className="relative overflow-hidden rounded-lg bg-white shadow dark:bg-gray-700">
              <ButtonCloseModal isCloseable={closeable} close={closeAction} />
              <div className="flex flex-col items-center justify-center p-4 text-center md:p-5">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {title}
                </h3>
                <p className="font-light text-gray-500">{children}</p>
                <button
                  type="button"
                  data-testid="modal-button-confirm"
                  className="mt-5 w-full rounded-lg bg-primary px-5 py-2.5 text-center text-sm font-semibold text-white focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={onCloseAction}
                >
                  {buttonTitle}
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
    case "dialog": {
      const onConfirm = () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        onConfirmAction ? onConfirmAction() : closeAction();
      };

      return (
        <div
          id="authentication-modal"
          aria-hidden="true"
          className="fixed top-0 left-0 inset-0 z-50 flex h-screen w-full items-center justify-center overflow-y-auto overflow-x-hidden bg-black/40"
        >
          <div className="relative max-h-full w-full max-w-md p-4">
            <div className="relative overflow-hidden rounded-lg bg-white shadow dark:bg-gray-700">
              {/* <!-- Modal body --> */}
              <div className="p-4 md:p-5">
                <h2 className="text-lg text-center py-1.5 font-bold text-gray-800 dark:text-white">
                  {title}
                </h2>
                {children}
              </div>
              {/* <!-- Modal footer --> */}
              <div className="flex items-center justify-between border-gray-200 bg-gray-50 p-4 dark:border-gray-600 md:p-2.5">
                <button
                  data-testid="modal-button-cancel"
                  onClick={() => closeAction()}
                  data-modal-hide="default-modal"
                  type="button"
                  className="w-full h-11 rounded-lg border border-primary bg-white px-5 py-1.5 font-bold text-primary hover:bg-gray-100 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100"
                >
                  {buttonCloseTitle}
                </button>
                <button
                  data-testid="modal-button-confirm"
                  onClick={() => onConfirm()}
                  data-modal-hide="default-modal"
                  type="button"
                  className="w-full h-11 ms-2.5 rounded-lg bg-primary px-5 py-1.5 text-center font-bold text-white hover:bg-primary focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-primary dark:hover:bg-primary dark:focus:ring-primary"
                >
                  {buttonTitle}
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
    case "confirmation": {
      const onConfirm = () => {
        if (onConfirmAction) onConfirmAction();
        closeAction();
      };
      return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="relative w-full max-w-lg p-4">
            <div className="relative rounded-lg bg-white shadow">
              <div className="flex flex-col items-center justify-center p-6">
                <h3 className="text-lg font-bold text-gray-800">{title}</h3>
                <div className="mb-6 text-center text-base">{children}</div>
                <div className="flex w-full justify-between">
                  <button
                    type="button"
                    data-testid="modal-button-cancel"
                    className="mr-2 w-full rounded-md border border-blue-500 bg-white px-4 py-1.5 text-sm text-primary font-medium"
                    onClick={closeAction}
                  >
                    {cancelButtonText}
                  </button>
                  <button
                    type="button"
                    data-testid="modal-button-confirm"
                    className={`ml-2 w-full rounded-md bg-primary px-4 py-1.5 text-sm text-white font-medium ${
                      isSaving ? "cursor-not-allowed opacity-50" : ""
                    }`}
                    onClick={onConfirm}
                    disabled={isSaving}
                  >
                    {buttonTitle || confirmButtonText}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}
