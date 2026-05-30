import { NextResponse } from "next/server";
import { Blog } from "@/lib/models/Blog";
import { getDocument, upsertDocument } from "@/lib/api-helpers";
import blogsFallback from "@/content/blogs";

export async function GET() {
  const data = await getDocument(Blog, () => blogsFallback);
  return NextResponse.json(data);
}

export async function PUT(request: Request) {
  const body = await request.json();
  const data = await upsertDocument(Blog, body, () => body);
  return NextResponse.json(data);
}
