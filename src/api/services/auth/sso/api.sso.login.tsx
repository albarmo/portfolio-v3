"use server";

import { ENDPOINTS } from "@/api/endpoint";
import { post } from "@/api/sdk/call";
import { logger } from "@/lib/logger";

const identity = "[api/sso..login]";
export interface IRq_SSO_Login {
  token: string;
}
export interface IRs_SSO_Login {
  code: number;
  message: string;
  data: {
    token: string;
    shouldCreatePIN: boolean;
  };
}

export async function API_SSO_Login(data: IRq_SSO_Login) {
  logger(identity, "REQ", " Attempt to Login with Token")(data).info();

  try {
    const response = await post(ENDPOINTS.sso.login, {
      token: data.token,
    });

    if (!response.OK) {
      const errorMessage: string =
        response.Kind?.message ?? response.Kind?.Message;
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
      "response.Kind",
      response.StatusCode
    )(result).info();

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
