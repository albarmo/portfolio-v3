import { ToasterStatus } from "../../toaster";
import { EventEmitter } from "../EventEmitter";

export type Emit_DisplayLoadingSpinner = {
  status: boolean;
  message?: string;
};

export type Emit_OpenSnackbar = {
  status: ToasterStatus;
  title?: string;
  message: string;
  duration?: number; //in millisecond
};

export type Emit_CloseSnackbar = {
  onClose?: () => void;
};

type EventMap = {
  openSnackbar: [data: Emit_OpenSnackbar];
  closeSnackbar: [data: Emit_CloseSnackbar];
  openDrawer: [data: null];
  displayLoadingSpinner: [data: Emit_DisplayLoadingSpinner];
};

export const globalEmitter = new EventEmitter<EventMap>();
