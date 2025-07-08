import { Rq_Headers } from "@/api/sdk/common.headers";
import { BrowserContext, request } from "@playwright/test";
import { DEVICE_ID, DOMAIN_URL, SESSION_COOKIE_NAME } from "./data";

const apiUrl = process.env.BASE_URL;

export async function _GetFetchAPI(endpoint: string, context: BrowserContext) {
  const createRequestContext = await request.newContext();

  const cookies = await context.cookies(DOMAIN_URL);
  const tokenCookie = cookies.find((c) => c.name === SESSION_COOKIE_NAME);
  const token = tokenCookie?.value;

  const response = await createRequestContext.get(apiUrl + endpoint, {
    headers: {
      ...Rq_Headers,
      "Content-Type": "application/json",
      "X-Localoka-Device-ID": DEVICE_ID,
      "X-Localoka-Device-Type": "web",
      "X-Localoka-Platform": "webview",
      Authorization: "Bearer " + token,
    },
  });

  return response.json();
}
