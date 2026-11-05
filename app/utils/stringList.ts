// Lists are stored as JSON array strings; older rows may hold malformed values,
// so fall back to stripping brackets/quotes and splitting on commas.
export function parseStringList(raw: string | undefined): string[] {
  if (!raw) return [];
  try {
    const parsed: unknown = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed.map(String).map((item) => item.trim()).filter(Boolean);
    }
  } catch {
    // not JSON; handled below
  }
  return raw
    .replace(/[[\]"]/g, "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}
