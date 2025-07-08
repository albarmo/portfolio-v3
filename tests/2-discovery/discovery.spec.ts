import { test, expect } from "@playwright/test";
import { _GetFetchAPI } from "tests/helpers/api-requests";
import { BRILINK_SSO_TOKEN } from "tests/helpers/data";
import { login } from "tests/helpers/login";

test.beforeEach(async ({ page }) => {
  await login(BRILINK_SSO_TOKEN, page);
});

test("Homepage", async ({ page }) => {
  expect(page.getByTestId("homepage")).toBeDefined();
});
