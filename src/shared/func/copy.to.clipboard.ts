import { Toaster } from "@/lib/toaster";

export const copyToClipboard = async (text: string, message: string) => {
  if (typeof window === "undefined") return;

  if (navigator?.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      Toaster.success({
        message,
      });
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  } else {
    console.warn("Clipboard API is not available");
  }
};
