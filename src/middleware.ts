import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const fullUrl = request.nextUrl.href;
  console.info(`\n\x1b[36m[browser.url]\x1b[0m : ${fullUrl}`);

  const searchParams = request.nextUrl.searchParams;
  const token = searchParams.get("token");

  if (token) {
    return NextResponse.redirect(new URL(`/${token}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/",
};
