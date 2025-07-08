"use server";

import { get } from "@/api/sdk/call";
import { GetErrorText } from "@/api/errors";
import { logger } from "@/lib/logger";
import { ENDPOINTS } from "@/api/endpoint";
import { Address } from "./types";

const identity = "[api/address/get-address]";

export interface IRq_GetAddress {
  page: number;
  limit: number;
}

export interface IRs_GetAddress {
  code: number;
  message: string;
  data: {
    items: Address[];
    limit: number;
    page: number;
    totalItems: number;
    totalPages: number;
  } | null;
}

export async function API_GetAddress({
  page,
  limit,
}: IRq_GetAddress): Promise<IRs_GetAddress> {
  logger(
    identity,
    "REQ",
    `Fetching addresses with page=${page} and limit=${limit}`
  )({ page, limit }).info();

  try {
    const response = await get(
      `${ENDPOINTS.address.base}?page=${page}&limit=${limit}`
    );
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
    const result = response.Kind as IRs_GetAddress;
    logger(
      identity,
      "RES",
      "Success fetching addresses",
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
