import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

const DEFAULT_LANG = "id";

export default getRequestConfig(async () => {
    const locales = ["id", "en"];
    let locale = (await cookies()).get("NEXT_LOCALE")?.value;

    if (!locale || !locales.includes(locale as unknown as string)) {
        locale = DEFAULT_LANG;
    }

    return {
        locale,
        messages: (await import(`./messages/${locale}.json`)).default,
    };
});
