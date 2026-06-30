import { NextResponse } from "next/server";
import { DESTINATIONS, EXPERIENCES } from "@/lib/rwanda-data";

export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json({
    success: true,
    destinations: DESTINATIONS,
    experiences: EXPERIENCES,
  });
}
