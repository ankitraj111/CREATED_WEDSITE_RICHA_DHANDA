import { NextResponse } from "next/server";
import { getOAuth2Client, storeRefreshToken } from "@/lib/google-calendar";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const error = searchParams.get("error");

  if (error) {
    return NextResponse.redirect(
      new URL("/?auth=error&message=" + encodeURIComponent(error), request.url)
    );
  }

  if (!code) {
    return NextResponse.redirect(
      new URL("/?auth=error&message=No+authorization+code+received", request.url)
    );
  }

  try {
    const oauth2Client = getOAuth2Client();
    const { tokens } = await oauth2Client.getToken(code);

    if (tokens.refresh_token) {
      await storeRefreshToken(tokens.refresh_token);
    }

    return NextResponse.redirect(
      new URL("/?auth=success&message=Google+Calendar+connected+successfully", request.url)
    );
  } catch (err) {
    console.error("OAuth callback error:", err);
    return NextResponse.redirect(
      new URL("/?auth=error&message=Failed+to+complete+authorization", request.url)
    );
  }
}
