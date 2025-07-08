import { test, expect } from "@playwright/test";
import { BRILINK_SSO_TOKEN, DOMAIN_URL } from "tests/helpers/data";

test("Un-Authenticated User", async ({ page, context }) => {
  await page.goto(DOMAIN_URL, { waitUntil: "load" });
  await page.waitForTimeout(3000);

  const cookies = await context.cookies(DOMAIN_URL);
  const sessionCookie = cookies.find((c) => c.name === "d_sid");

  if (!sessionCookie?.value) {
    await expect(page.getByTestId("unauthorized-error-title")).toHaveText(
      "Akses ditolak, Pastikan Anda sudah login dengan akun yang benar."
    );
  }
});

test("Login via SSO", async ({ page, context }) => {
  await page.goto(DOMAIN_URL + `/${BRILINK_SSO_TOKEN}`, { waitUntil: "load" });

  // ✅ access browser cookies
  const cookies = await context.cookies(DOMAIN_URL);

  const sessionCookie = cookies.find((c) => c.name === "d_sid");
  const deviceId = cookies.find((c) => c.name === "device-id");

  expect(sessionCookie, "Missing d_sid cookie").toBeDefined();
  expect(deviceId, "Missing device-id cookie").toBeDefined();
});
