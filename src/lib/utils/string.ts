// Convert string to Base64
export function stringToBase64(str: string): string {
  if (!str) return "";
  return Buffer.from(str, "utf-8").toString("base64");
}

// Convert Base64 back to string
export function base64ToString(base64: string): string {
  if (!base64) return "";
  return Buffer.from(base64, "base64").toString("utf-8");
}
