// Read once at server start so a missing variable fails the boot, not a request.
function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export const env = {
  mongodbUri: requireEnv("MONGODB_URI"),
  sessionSecret: requireEnv("SESSION_SECRET"),
  adminUsername: requireEnv("ADMIN_USERNAME"),
  adminPassword: requireEnv("ADMIN_PASSWORD"),
  imagekitPublicKey: requireEnv("IMAGEKIT_PUBLIC_KEY"),
  imagekitPrivateKey: requireEnv("IMAGEKIT_PRIVATE_KEY"),
  imagekitUrlEndpoint: requireEnv("IMAGEKIT_URL_ENDPOINT"),
  isProduction: process.env.NODE_ENV === "production",
} as const;
