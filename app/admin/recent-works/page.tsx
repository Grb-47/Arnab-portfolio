"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ImageField } from "@/components/admin/ImageField";

interface WorkItem {
  image: string;
  thumbnail: string;
  category: string;
  title: string;
  description: string;
}

interface WorksData {
  sectionTitle: string;
  items: WorkItem[];
}

export default function AdminRecentWorks() {
  const router = useRouter();
  const [data, setData] = useState<WorksData | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/recent-works")
      .then((r) => r.json())
      .then(setData);
  }, []);

  const save = async () => {
    setSaving(true);
    await fetch("/api/recent-works", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setSaving(false);
  };

  if (!data) return <p className="text-gray-400">Loading...</p>;

  const updateItem = (i: number, field: string, val: string) => {
    const items = [...data.items];
    items[i] = { ...items[i], [field]: val };
    setData({ ...data, items });
  };

  const addItem = () => {
    setData({ ...data, items: [{ image: "", thumbnail: "", category: "", title: "", description: "" }, ...data.items] });
  };

  const removeItem = (i: number) => {
    setData({ ...data, items: data.items.filter((_, idx) => idx !== i) });
  };

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold mb-6">Edit Recent Works</h1>
      <Field label="Section Title" val={data.sectionTitle} onChange={(v) => setData({ ...data, sectionTitle: v })} />

      {data.items.map((item, i) => (
        <div key={i} className="p-3 border border-gray-700 rounded mb-2 bg-gray-900 mt-4">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-semibold">Work #{i + 1}</span>
            <button onClick={() => removeItem(i)} className="text-red-400 text-sm">✕ Remove</button>
          </div>
          <Field label="Title" val={item.title} onChange={(v) => updateItem(i, "title", v)} />
          <Field label="Category" val={item.category} onChange={(v) => updateItem(i, "category", v)} />
          <ImageField label="Image" value={item.image} onChange={(v) => updateItem(i, "image", v)} />
          <ImageField label="Thumbnail" value={item.thumbnail} onChange={(v) => updateItem(i, "thumbnail", v)} />
          <div className="mb-2">
            <label className="block text-sm text-gray-400 mb-1">Description</label>
            <textarea className="w-full px-3 py-1.5 rounded bg-gray-800 border border-gray-700 text-white h-24" value={item.description} onChange={(e) => updateItem(i, "description", e.target.value)} />
          </div>
        </div>
      ))}
      <button onClick={addItem} className="text-blue-400 text-sm mt-2">+ Add Work</button>

      <div className="mt-8 flex gap-3">
        <button onClick={save} disabled={saving} className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 disabled:opacity-50">
          {saving ? "Saving..." : "Save Changes"}
        </button>
        <button onClick={() => router.push("/admin")} className="px-5 py-2 bg-gray-700 text-white rounded hover:bg-gray-600">
          Back
        </button>
      </div>
    </div>
  );
}

function Field({ label, val, onChange }: { label: string; val: string; onChange: (v: string) => void }) {
  return (
    <div className="mb-2">
      <label className="block text-sm text-gray-400 mb-1">{label}</label>
      <input className="w-full px-3 py-1.5 rounded bg-gray-800 border border-gray-700 text-white" value={val} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}
