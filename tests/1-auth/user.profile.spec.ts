import { test, expect } from "@playwright/test";
import { _GetFetchAPI } from "tests/helpers/api-requests";
import { BRILINK_SSO_TOKEN } from "tests/helpers/data";
import { login } from "tests/helpers/login";

let name: string;
let phone: string;

test.beforeEach(async ({ page, context }) => {
  await login(BRILINK_SSO_TOKEN, page);
  await page.getByTestId("bottom-bar-menu-profile").click();

  const me = await _GetFetchAPI("/webview/profile", context);

  if (me) {
    expect(me.code).toBe(200);

    name = me.data.name;
    phone = me.data.phoneNumber;
  }
});

test("User Profile Data", async ({ page }) => {
  await expect(page.getByTestId("profile-user-name")).toHaveText(name);
  await expect(page.getByTestId("profile-user-phone-number")).toHaveText(phone);
});

test("Menu Terms & Condition", async ({ page }) => {
  await page.getByTestId("profile-menu-tnc").click();
  expect(page.getByTestId("tnc-html-string")).toBeDefined();
});

test("Menu Privacy & Policy", async ({ page }) => {
  await page.getByTestId("profile-menu-privacy-policy").click();
  expect(page.getByTestId("privacy-policy-html-string")).toBeDefined();
});
