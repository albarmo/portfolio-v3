"use server";

import { del } from "@/api/sdk/call";
import { GetErrorText } from "@/api/errors";
import { logger } from "@/lib/logger";
import { ENDPOINTS } from "@/api/endpoint";

const identity = "[api/address/delete-address]";

export interface IRs_DeleteAddress {
  code: number;
  message: string;
  data: Date | null | { id: string };
}

export async function API_DeleteAddress(
  addressId: string
): Promise<IRs_DeleteAddress> {
  logger(
    identity,
    "REQ",
    `Deleting address with id=${addressId}`
  )({ addressId }).info();

  try {
    const response = await del(`${ENDPOINTS.address.base}/${addressId}`);
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
      return { code: response.StatusCode, message: errorMessage, data: null };
    }
    const result = response.Kind as IRs_DeleteAddress;
    logger(
      identity,
      "RES",
      "Success deleting address",
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
