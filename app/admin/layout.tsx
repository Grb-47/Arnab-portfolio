"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [authed, setAuthed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/check")
      .then((r) => r.json())
      .then((d) => {
        if (d.authenticated) setAuthed(true);
        else if (pathname !== "/admin/login") router.push("/admin/login");
      })
      .finally(() => setLoading(false));
  }, [pathname, router]);

  if (pathname === "/admin/login") return <>{children}</>;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  if (!authed) return null;

  const navItems = [
    { href: "/admin", label: "Dashboard" },
    { href: "/admin/hero", label: "Hero" },
    { href: "/admin/about", label: "About" },
    { href: "/admin/services", label: "Services" },
    { href: "/admin/recent-works", label: "Recent Works" },
    { href: "/admin/projects", label: "Projects" },
    { href: "/admin/research", label: "Research" },
    { href: "/admin/blogs", label: "Blogs" },
    { href: "/admin/contact", label: "Contact" },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <nav className="border-b border-gray-800 bg-gray-900/80 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-14">
          <Link href="/admin" className="font-bold text-lg">
            Admin Panel
          </Link>
          <div className="flex gap-4 text-sm">
            <Link href="/" className="text-gray-400 hover:text-white">
              View Site
            </Link>
            <button
              onClick={async () => {
                await fetch("/api/admin/logout", { method: "POST" });
                router.push("/admin/login");
              }}
              className="text-red-400 hover:text-red-300"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
      <div className="flex">
        <aside className="w-56 min-h-[calc(100vh-56px)] border-r border-gray-800 p-4 hidden md:block">
          <div className="flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 rounded text-sm transition-colors ${
                  pathname === item.href
                    ? "bg-blue-600 text-white"
                    : "text-gray-400 hover:text-white hover:bg-gray-800"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </aside>
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
