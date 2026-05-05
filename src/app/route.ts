import { NextResponse } from "next/server";

export const dynamic = "force-static";

export async function GET() {
  return NextResponse.redirect(
    "https://cassette-accent-charming-buses.trycloudflare.com",
    307
  );
}
