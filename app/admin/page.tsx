"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const sections = [
  { name: "Hero", href: "/admin/hero", desc: "Headline, subtitle, profile image, logos" },
  { name: "About", href: "/admin/about", desc: "Bio, organizations, education timeline" },
  { name: "Services", href: "/admin/services", desc: "Graphics, video, photography, research" },
  { name: "Recent Works", href: "/admin/recent-works", desc: "Portfolio showcase items" },
  { name: "Projects", href: "/admin/projects", desc: "Featured projects with tags" },
  { name: "Research", href: "/admin/research", desc: "Ongoing, published, and proposals" },
  { name: "Blogs", href: "/admin/blogs", desc: "Blog posts" },
  { name: "Contact", href: "/admin/contact", desc: "Email, social links, footer" },
];

export default function AdminDashboard() {
  const [seedStatus, setSeedStatus] = useState<string | null>(null);

  const runSeed = async () => {
    setSeedStatus("Seeding...");
    try {
      const res = await fetch("/api/seed", { method: "POST" });
      const data = await res.json();
      setSeedStatus(
        res.ok
          ? `✅ Seed completed: ${JSON.stringify(data.results)}`
          : `❌ ${data.error}`
      );
    } catch {
      setSeedStatus("❌ Seed failed");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {sections.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="block p-4 bg-gray-900 border border-gray-800 rounded-lg hover:border-blue-500 transition-colors"
          >
            <h2 className="font-semibold text-lg">{s.name}</h2>
            <p className="text-sm text-gray-400 mt-1">{s.desc}</p>
          </Link>
        ))}
      </div>

      <div className="p-4 bg-gray-900 border border-gray-800 rounded-lg">
        <h2 className="font-semibold mb-2">Database Tools</h2>
        <p className="text-sm text-gray-400 mb-3">
          Populate MongoDB with your current static content. Requires
          MONGODB_URI to be set.
        </p>
        <button
          onClick={runSeed}
          className="px-4 py-2 bg-green-700 text-white rounded hover:bg-green-600"
        >
          Seed Database from Static Content
        </button>
        {seedStatus && (
          <p className="text-sm mt-2 text-gray-300">{seedStatus}</p>
        )}
      </div>
    </div>
  );
}
