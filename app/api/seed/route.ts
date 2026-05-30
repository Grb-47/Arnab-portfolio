import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Hero } from "@/lib/models/Hero";
import { About } from "@/lib/models/About";
import { Service } from "@/lib/models/Service";
import { RecentWork } from "@/lib/models/RecentWork";
import { Project } from "@/lib/models/Project";
import { Research } from "@/lib/models/Research";
import { Blog } from "@/lib/models/Blog";
import { Contact } from "@/lib/models/Contact";
import heroData from "@/content/hero";
import aboutData from "@/content/about";
import servicesData from "@/content/services";
import recentWorksData from "@/content/recent-works";
import projectsData from "@/content/projects";
import researchData from "@/content/research";
import blogsData from "@/content/blogs";
import contactData from "@/content/contact";
import { isAuthenticated } from "@/lib/admin-auth";

export async function POST() {
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const db = await connectToDatabase();
  if (!db) {
    return NextResponse.json(
      { error: "MongoDB not connected. Set MONGODB_URI in .env.local" },
      { status: 500 }
    );
  }

  const results: Record<string, string> = {};

  try {
    await Hero.findOneAndUpdate({}, heroData, { upsert: true, new: true });
    results.hero = "seeded";
  } catch (e) {
    results.hero = `failed: ${e}`;
  }

  try {
    await About.findOneAndUpdate({}, aboutData, { upsert: true, new: true });
    results.about = "seeded";
  } catch (e) {
    results.about = `failed: ${e}`;
  }

  try {
    await Service.findOneAndUpdate({}, servicesData, { upsert: true, new: true });
    results.services = "seeded";
  } catch (e) {
    results.services = `failed: ${e}`;
  }

  try {
    await RecentWork.findOneAndUpdate({}, recentWorksData, {
      upsert: true,
      new: true,
    });
    results["recent-works"] = "seeded";
  } catch (e) {
    results["recent-works"] = `failed: ${e}`;
  }

  try {
    await Project.findOneAndUpdate({}, projectsData, { upsert: true, new: true });
    results.projects = "seeded";
  } catch (e) {
    results.projects = `failed: ${e}`;
  }

  try {
    await Research.findOneAndUpdate({}, researchData, { upsert: true, new: true });
    results.research = "seeded";
  } catch (e) {
    results.research = `failed: ${e}`;
  }

  try {
    await Blog.findOneAndUpdate({}, blogsData, { upsert: true, new: true });
    results.blogs = "seeded";
  } catch (e) {
    results.blogs = `failed: ${e}`;
  }

  try {
    await Contact.findOneAndUpdate({}, contactData, { upsert: true, new: true });
    results.contact = "seeded";
  } catch (e) {
    results.contact = `failed: ${e}`;
  }

  return NextResponse.json({ message: "Seed completed", results });
}
