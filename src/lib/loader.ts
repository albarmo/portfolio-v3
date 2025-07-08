import { globalEmitter } from "./emitter/global/GlobalEmitter";

export class Spinner {
  static start(): void {
    globalEmitter.emit("displayLoadingSpinner", { status: true });
  }

  static stop(): void {
    globalEmitter.emit("displayLoadingSpinner", { status: false });
  }
}
