"use server"

export async function Fetch(resource: RequestInfo, init?: RequestInit | undefined) {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), 15);
    const response = await fetch(resource, {
        ...init,
        signal: controller.signal
    });
    clearTimeout(id);
    return response;
}