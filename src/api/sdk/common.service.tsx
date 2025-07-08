const locking = process.env.ENVIRONMENT_LEVEL === 'LOCK';
const endpoint = process.env.BASE_URL;

export const BASE_URL = locking ? 'lock_url' : endpoint;
export const BASE_URL_CHAT = process.env.BASE_URL_CHAT
export const SSE_BASE_URL = process.env.SSE_URL

