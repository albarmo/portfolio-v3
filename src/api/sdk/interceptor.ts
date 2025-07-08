import axios from "axios";
import { ENV } from "@/configs/environment";
import { Rq_Headers } from "./common.headers";

const baseURL = ENV.URI.BASE_URL;
const isServer = typeof window === "undefined";

const api = axios.create({
  baseURL,
  headers: {
    ...Rq_Headers,
    "Content-Type": "application/json",
    "X-Localoka-Device-Type": "web",
    "X-Localoka-Platform": "webview",
  },
});

api.interceptors.request.use(async (config) => {
  if (isServer) {
    const { cookies } = await import("next/headers");
    const token = (await cookies()).get(ENV.SESSION_COOKIE_NAME)?.value;
    const deviceId = (await cookies()).get("device-id")?.value;

    config.headers["X-Localoka-Device-ID"] = deviceId;

    if (token) config.headers.Authorization = "Bearer " + token;
  } else {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)d_sid\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    if (token) {
      config.headers.Authorization = token;
    }
  }

  return config;
});

export default api;
