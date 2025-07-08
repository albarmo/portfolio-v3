import { Page } from "@playwright/test";
import { DOMAIN_URL } from "./data";

export async function login(token: string, page: Page) {
  await page.goto(DOMAIN_URL + `/${token}`, { waitUntil: "load" });
}
