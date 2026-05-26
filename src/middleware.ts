import { type NextRequest, NextResponse } from "next/server";

async function verifySession(token: string, secret: string): Promise<boolean> {
  const dot = token.lastIndexOf(".");
  if (dot === -1) return false;
  const payload = token.slice(0, dot);
  const sig = token.slice(dot + 1);

  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["verify"]
  );

  const sigBytes = new Uint8Array(
    sig.match(/.{2}/g)?.map((b) => parseInt(b, 16)) ?? []
  );
  if (sigBytes.length !== 32) return false;

  return crypto.subtle.verify("HMAC", key, sigBytes, enc.encode(payload));
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/admin")) return NextResponse.next();
  if (pathname === "/admin/login") return NextResponse.next();

  const token = request.cookies.get("admin_session")?.value;
  const secret = process.env.ADMIN_SECRET ?? "dev-secret-please-change-me";

  if (!token || !(await verifySession(token, secret))) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
