import { ENV } from "@/configs/environment";

type Currency = keyof typeof CURRENCY_CONFIG;
const currencySetting: Currency = ENV.CURRENCY as Currency;

const CURRENCY_CONFIG = {
  IDR: {
    localeId: "id-ID",
    currency: "IDR",
  },
  USD: {
    localeId: "en-US",
    currency: "USD",
  },
};

export function currency(num: string | number | undefined): string {
  if (!num) return "-";
  const localeConfig = CURRENCY_CONFIG[currencySetting];

  return new Intl.NumberFormat(localeConfig.localeId, {
    style: "currency",
    currency: localeConfig.currency,
    maximumFractionDigits: 0,
  }).format(+num || 0);
}
