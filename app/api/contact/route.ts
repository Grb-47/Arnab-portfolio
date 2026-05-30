import { NextResponse } from "next/server";
import { Contact } from "@/lib/models/Contact";
import { getDocument, upsertDocument } from "@/lib/api-helpers";
import contactFallback from "@/content/contact";

export async function GET() {
  const data = await getDocument(Contact, () => contactFallback);
  return NextResponse.json(data);
}

export async function PUT(request: Request) {
  const body = await request.json();
  const data = await upsertDocument(Contact, body, () => body);
  return NextResponse.json(data);
}
