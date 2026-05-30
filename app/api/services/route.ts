import { NextResponse } from "next/server";
import { Service } from "@/lib/models/Service";
import { getDocument, upsertDocument } from "@/lib/api-helpers";
import servicesFallback from "@/content/services";

export async function GET() {
  const data = await getDocument(Service, () => servicesFallback);
  return NextResponse.json(data);
}

export async function PUT(request: Request) {
  const body = await request.json();
  const data = await upsertDocument(Service, body, () => body);
  return NextResponse.json(data);
}
