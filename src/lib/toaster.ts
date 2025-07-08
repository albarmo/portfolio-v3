import { Emit_OpenSnackbar, globalEmitter } from "./emitter/global/GlobalEmitter";

export type ToasterStatus = "success" | "error" | "info" | "warning";
export type ToasterProps = {
  title?: string;
  message: string;
  duration?: number; //in millisecond
};

export class Toaster {
  static show({
    status,
    title,
    message,
    duration = 3000,
  }: Emit_OpenSnackbar): void {
    globalEmitter.emit("openSnackbar", {
      title: title,
      status: status,
      message: message,
    });

    setTimeout(() => {
      globalEmitter.emit("closeSnackbar", {});
    }, duration);
  }

  static info({ title, message, duration }: ToasterProps): void {
    this.show({ status: "info", title, message, duration });
  }

  static success({ title, message, duration }: ToasterProps): void {
    this.show({ status: "success", title, message, duration });
  }

  static warning({ title, message, duration }: ToasterProps): void {
    this.show({ status: "warning", title, message, duration });
  }

  static error({ title, message, duration }: ToasterProps): void {
    this.show({ status: "error", title, message, duration });
  }
}
