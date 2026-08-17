import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Allowed origins for CORS
const ALLOWED_ORIGINS = [
  "https://advocate-richa-dhanda.vercel.app",
  "https://advocaterichadhanda.com",
  "https://www.advocaterichadhanda.com",
  "http://localhost:3000",
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const origin = request.headers.get("origin") || "";

  // CORS Protection for API routes
  if (pathname.startsWith("/api/")) {
    // Block requests from unauthorized origins
    if (origin && !ALLOWED_ORIGINS.includes(origin)) {
      return NextResponse.json(
        { error: "Forbidden: Origin not allowed" },
        { status: 403 }
      );
    }

    // Handle preflight OPTIONS requests
    if (request.method === "OPTIONS") {
      const response = new NextResponse(null, { status: 204 });
      response.headers.set("Access-Control-Allow-Origin", origin || ALLOWED_ORIGINS[0]);
      response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
      response.headers.set("Access-Control-Allow-Headers", "Content-Type");
      response.headers.set("Access-Control-Max-Age", "86400");
      return response;
    }

    // Add CORS headers to API responses
    const response = NextResponse.next();
    if (ALLOWED_ORIGINS.includes(origin)) {
      response.headers.set("Access-Control-Allow-Origin", origin);
    }
    response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type");

    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*"],
};
