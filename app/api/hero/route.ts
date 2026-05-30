import { NextResponse } from "next/server";
import { Hero } from "@/lib/models/Hero";
import { getDocument, upsertDocument } from "@/lib/api-helpers";
import heroFallback from "@/content/hero";

export async function GET() {
  const data = await getDocument(Hero, () => heroFallback);
  return NextResponse.json(data);
}

export async function PUT(request: Request) {
  const body = await request.json();
  const data = await upsertDocument(Hero, body, () => body);
  return NextResponse.json(data);
}
