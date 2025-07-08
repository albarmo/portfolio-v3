import { logger } from "@/lib/logger";
import { ENDPOINTS } from "../../endpoint";
import { get } from "../../sdk/call";
import { Rq_Headers } from "../../sdk/common.headers";

const identity = "[api/auth.login]";

export interface IRq_Login {
  personalNumber: string;
  password: string;
  deviceId: string;
  captcha: string;
}

export interface IRs_Login {
  code: number;
  responseCode: string;
  responseDesc: string;
  responseData: {
    token: string;
    expiredAt: Date | string;
  };
}

export async function API_PostLogin(data: IRq_Login) {
  const payload = {
    baseUrl: ENDPOINTS.auth.login,
    request: data,
  };

  logger(identity, "REQ")(payload).info();
  try {
    const response = await get(ENDPOINTS.auth.login, {
      method: "POST",
      headers: Rq_Headers,
      body: JSON.stringify(data),
    });

    const responseData = response?.Kind;
    logger(identity, "RES", "response.Kind", 200)(responseData).info();

    return responseData;
  } catch (error: unknown) {
    const err = error as { message?: string; response?: { status?: number } };

    logger(
      identity,
      "ERR",
      err?.message,
      err?.response?.status ?? 500
    )(err).error();

    return {
      code: err?.response?.status ?? 500,
      message: err?.message || "Internal server error",
      data: null,
    };
  }
}
