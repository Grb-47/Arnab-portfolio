import { NextResponse } from "next/server";
import { Research } from "@/lib/models/Research";
import { getDocument, upsertDocument } from "@/lib/api-helpers";
import researchFallback from "@/content/research";

export async function GET() {
  const data = await getDocument(Research, () => researchFallback);
  return NextResponse.json(data);
}

export async function PUT(request: Request) {
  const body = await request.json();
  const data = await upsertDocument(Research, body, () => body);
  return NextResponse.json(data);
}
