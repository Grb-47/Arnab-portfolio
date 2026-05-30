import { NextResponse } from "next/server";
import { Project } from "@/lib/models/Project";
import { getDocument, upsertDocument } from "@/lib/api-helpers";
import projectsFallback from "@/content/projects";

export async function GET() {
  const data = await getDocument(Project, () => projectsFallback);
  return NextResponse.json(data);
}

export async function PUT(request: Request) {
  const body = await request.json();
  const data = await upsertDocument(Project, body, () => body);
  return NextResponse.json(data);
}
