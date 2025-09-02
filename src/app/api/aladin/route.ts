import { NextRequest, NextResponse } from "next/server";
import { aladinFetch } from "@/lib/aladin";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q") ?? "";

  try {
    const data = await aladinFetch(query);
    return NextResponse.json(data);

  } catch (error) {

    return NextResponse.json({ error: "알라딘 API 요청 실패" }, { status: 500 });
    
  }
}
