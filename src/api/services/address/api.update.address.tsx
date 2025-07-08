"use server";

import { patch } from "@/api/sdk/call";
import { logger } from "@/lib/logger";
import { ENDPOINTS } from "@/api/endpoint";
import { Address } from "./types";

const identity = "[api/address/update-address]";

export interface IRq_UpdateAddress {
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

export interface IRs_UpdateAddress {
  code: number;
  message: string;
  data: Address | null;
}

export async function API_UpdateAddress(
  addressId: string,
  payload: IRq_UpdateAddress
): Promise<IRs_UpdateAddress> {
  logger(
    identity,
    "REQ",
    `Updating address with ID: ${addressId}`
  )({ payload }).info();

  try {
    const endpoint = `${ENDPOINTS.address.base}/${addressId}`;
    logger(identity, "INFO", `Using endpoint: ${endpoint}`)(null).info();

    const response = await patch(
      endpoint,
      payload as unknown as Record<string, unknown>
    );

    if (!response.OK) {
      const errorMessage = response.Kind?.message ?? "Unknown error";
      logger(
        identity,
        "RES",
        errorMessage,
        response.StatusCode
      )({ error: response.Kind }).error();
      return { code: response.StatusCode, message: errorMessage, data: null };
    }

    const result = response.Kind as IRs_UpdateAddress;
    logger(
      identity,
      "RES",
      "Address updated successfully",
      response.StatusCode
    )({ address: result }).info();
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
