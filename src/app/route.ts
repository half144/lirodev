import { NextResponse } from "next/server";

export const dynamic = "force-static";

export async function GET() {
  return NextResponse.redirect(
    "https://messaging-pack-medline-wallet.trycloudflare.com",
    307
  );
}
