import { NextRequest, NextResponse } from "next/server";
import { getPortfolioData, savePortfolioData, verifyAdminPassword } from "@/lib/portfolio";
import type { PortfolioData } from "@/types/portfolio";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const data = await getPortfolioData();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to read portfolio:", error);
    return NextResponse.json({ error: "Failed to read portfolio data" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const password = request.headers.get("x-admin-password");

    if (!password || !verifyAdminPassword(password)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = (await request.json()) as PortfolioData;

    if (!body.profile || !Array.isArray(body.projects)) {
      return NextResponse.json({ error: "Invalid portfolio data" }, { status: 400 });
    }

    const saved = await savePortfolioData(body);
    return NextResponse.json(saved);
  } catch (error) {
    console.error("Failed to save portfolio:", error);
    return NextResponse.json({ error: "Failed to save portfolio data" }, { status: 500 });
  }
}
