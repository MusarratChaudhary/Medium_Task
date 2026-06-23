import { NextResponse } from "next/server";
import { getApiKey } from "../../services/tmdbServer";

export async function GET() {
  const key = getApiKey();
  return NextResponse.json({
    isConfigured: !!key
  });
}
