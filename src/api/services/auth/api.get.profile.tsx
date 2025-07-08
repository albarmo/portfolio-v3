"use server";

import { logger } from "@/lib/logger";
import { ENDPOINTS } from "../../endpoint";
import { get } from "../../sdk/call";
import { GetErrorText } from "@/api/errors";

const identity = "[api/get.profile.me]";

export type T_UserMe = {
  id: string;
  name: string;
  phoneNumber: string;
};
export interface IRs_GetProfile {
  code: number;
  message: string;
  data: T_UserMe | null;
}

export async function API_GetProfile() {
  logger(identity, "REQ", "Get Profile")({}).info();

  try {
    const response = await get(ENDPOINTS.auth.me);

    if (!response.OK) {
      const errorMessage: string = GetErrorText(
        response.Kind?.message ?? response.Kind?.Message
      );
      logger(
        identity,
        "RES",
        errorMessage,
        response.StatusCode
      )(response.Kind).error();

      return {
        code: response.Kind.code,
        message: errorMessage,
        data: response.Kind.data,
      };
    }

    const result = response?.Kind;
    logger(
      identity,
      "RES",
      "Success get user profile",
      response.StatusCode
    )(response?.Kind).info();

    return result;
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
