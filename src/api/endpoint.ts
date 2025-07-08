import { BASE_URL } from "./sdk/common.service";

export const ENDPOINTS = {
  auth: {
    login: `${BASE_URL}/login`,
    me:`${BASE_URL}/me`,
  },
  sso: {
      login: `${BASE_URL}/webview/login/token`,
  },
  address: {
    base: `${BASE_URL}/webview/address/user`,
    dynamicPage: `${BASE_URL}/dashboard/page`,
    region: `${BASE_URL}/webview/region`,
  },
};
