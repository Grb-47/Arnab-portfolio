import { NextResponse } from "next/server";
import { About } from "@/lib/models/About";
import { getDocument, upsertDocument } from "@/lib/api-helpers";
import aboutFallback from "@/content/about";

export async function GET() {
  const data = await getDocument(About, () => aboutFallback);
  return NextResponse.json(data);
}

export async function PUT(request: Request) {
  const body = await request.json();
  const data = await upsertDocument(About, body, () => body);
  return NextResponse.json(data);
}
