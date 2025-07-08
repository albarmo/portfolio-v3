export function formatToIndonesianTime(dateString: string) {
    if (!dateString) return 'waktu tidak tersedia';
    const date = new Date(dateString);

    const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Jakarta", // WIB (UTC+7)
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false // 24-hour format
    };

    const formatter = new Intl.DateTimeFormat("id-ID", options);
    let formatted = formatter.format(date);

    formatted = formatted.replace(",", " ").replace(/\//g, "-").replace(":", ".");

    return formatted;
}