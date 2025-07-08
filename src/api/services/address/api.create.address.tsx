"use server";
import { post } from "@/api/sdk/call";
import { logger } from "@/lib/logger";
import { ENDPOINTS } from "@/api/endpoint";
import { Address } from "./types";

const identity = "[api/address/create-address]";

export interface IRq_CreateAddress {
  label: string;
  address: string;
  description: string;
  villageName: string;
  postalCode: string;
  latitude?: string;
  longitude?: string;
  default: string;
  recipientName: string;
  recipientPhoneNumber: string;
}

export interface IRs_CreateAddress {
  code: number;
  message: string;
  data: Address | null;
}

export async function API_CreateAddress(
  payload: IRq_CreateAddress
): Promise<IRs_CreateAddress> {
  logger(identity, "REQ", "Creating new address")(payload).info();

  try {
    const endpoint = ENDPOINTS.address.base;
    const response = await post(
      endpoint,
      payload as unknown as Record<string, unknown>
    );

    if (!response.OK) {
      const errorMessage =
        response.Kind?.message ?? response.Kind?.Message ?? "Unknown error";

      logger(
        identity,
        "RES",
        errorMessage,
        response.StatusCode
      )(response.Kind).error();

      return { code: response.StatusCode, message: errorMessage, data: null };
    }

    const result = response.Kind as IRs_CreateAddress;

    logger(
      identity,
      "RES",
      "Success creating address",
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
