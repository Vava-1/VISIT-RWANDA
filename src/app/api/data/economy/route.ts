import { NextResponse } from "next/server";
import {
  ECONOMY_STATS,
  ECONOMY_CHART,
  INVESTMENT_SECTORS,
  QUICK_FACTS,
} from "@/lib/rwanda-data";

export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json({
    success: true,
    stats: ECONOMY_STATS,
    chart: ECONOMY_CHART,
    sectors: INVESTMENT_SECTORS,
    facts: QUICK_FACTS,
  });
}
