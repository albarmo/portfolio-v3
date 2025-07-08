import crypto from "crypto";

// Ensure the key is padded or truncated to exactly 32 bytes (AES-256)
function padKey(secretKey: string): Buffer {
  const keyBuffer = Buffer.from(secretKey, "utf-8");

  // AES requires keys of 16, 24, or 32 bytes, so pad to the next valid size
  if (keyBuffer.length < 32) {
    return Buffer.concat([keyBuffer, Buffer.alloc(32 - keyBuffer.length)]); // Pad to 32 bytes
  }
  return keyBuffer.slice(0, 32); // Truncate to 32 bytes
}

const encrypt = (plainText: string, secretKey: string): string => {
  const key: Buffer = padKey(secretKey);

  // Validate key length
  if (key.length !== 32) {
    throw new Error(`Invalid key length: ${key.length}. Expected 32 bytes.`);
  }

  const nonce = crypto.randomBytes(12); // 12-byte nonce
  const cipher = crypto.createCipheriv("aes-256-gcm", key, nonce);

  const encrypted = Buffer.concat([
    cipher.update(plainText, "utf8"),
    cipher.final(),
  ]);
  const authTag = cipher.getAuthTag();

  // Combine nonce, ciphertext, and authentication tag
  const combinedBuffer = Buffer.concat([nonce, encrypted, authTag]);

  // Convert to Base64 and make it URL-safe
  return combinedBuffer
    .toString("base64") // Regular Base64 encoding
    .replace(/\+/g, "-") // Replace '+' with '-'
    .replace(/\//g, "_"); // Replace '/' with '_'
};

export { encrypt };
