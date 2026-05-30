import { NextResponse } from "next/server";
import { RecentWork } from "@/lib/models/RecentWork";
import { getDocument, upsertDocument } from "@/lib/api-helpers";
import recentWorksFallback from "@/content/recent-works";

export async function GET() {
  const data = await getDocument(RecentWork, () => recentWorksFallback);
  return NextResponse.json(data);
}

export async function PUT(request: Request) {
  const body = await request.json();
  const data = await upsertDocument(RecentWork, body, () => body);
  return NextResponse.json(data);
}
