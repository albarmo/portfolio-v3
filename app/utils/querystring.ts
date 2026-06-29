export default function qs(
  params?: Record<string, string | number | boolean | null | undefined>
): string {
  if (!params) return "";

  const queryString = new URLSearchParams();

  Object.keys(params).forEach((key) => {
    const value = params[key];
    if (value !== undefined && value !== null && value !== "") {
      queryString.append(key, String(value));
    }
  });

  return `?${queryString.toString()}`;
}
