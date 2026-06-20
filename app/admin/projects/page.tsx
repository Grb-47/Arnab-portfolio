"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ImageField } from "@/components/admin/ImageField";

interface ProjectItem {
  image: string;
  shortDescription: string;
  title: string;
  description: string;
  tags: string[];
}

interface ProjectsData {
  sectionTitle: string;
  items: ProjectItem[];
}

export default function AdminProjects() {
  const router = useRouter();
  const [data, setData] = useState<ProjectsData | null>(null);
  const [saving, setSaving] = useState(false);
  const [rawTagInputs, setRawTagInputs] = useState<string[]>([]);

  useEffect(() => {
    fetch("/api/projects")
      .then((r) => r.json())
      .then((d) => {
        setData(d);
        setRawTagInputs(d.items.map((item: ProjectItem) => item.tags.join(", ")));
      });
  }, []);

  const save = async () => {
    setSaving(true);
    await fetch("/api/projects", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setSaving(false);
  };

  if (!data) return <p className="text-gray-400">Loading...</p>;

  const updateItem = (i: number, field: string, val: string | string[]) => {
    const items = [...data.items];
    items[i] = { ...items[i], [field]: val };
    setData({ ...data, items });
  };

  const addItem = () => {
    setData({ ...data, items: [...data.items, { image: "", shortDescription: "", title: "", description: "", tags: [] }] });
  };

  const removeItem = (i: number) => {
    setData({ ...data, items: data.items.filter((_, idx) => idx !== i) });
  };

  const updateTags = (i: number, raw: string) => {
    updateItem(i, "tags", raw.split(",").map((t) => t.trim()).filter(Boolean));
  };

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold mb-6">Edit Projects</h1>
      <Field label="Section Title" val={data.sectionTitle} onChange={(v) => setData({ ...data, sectionTitle: v })} />

      {data.items.map((item, i) => (
        <div key={i} className="p-3 border border-gray-700 rounded mb-2 bg-gray-900 mt-4">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-semibold">Project #{i + 1}</span>
            <button onClick={() => removeItem(i)} className="text-red-400 text-sm">✕ Remove</button>
          </div>
          <Field label="Title" val={item.title} onChange={(v) => updateItem(i, "title", v)} />
          <ImageField label="Image" value={item.image} onChange={(v) => updateItem(i, "image", v)} />
          <Field label="Short Description" val={item.shortDescription} onChange={(v) => updateItem(i, "shortDescription", v)} />
          <div className="mb-2">
            <label className="block text-sm text-gray-400 mb-1">Full Description</label>
            <textarea className="w-full px-3 py-1.5 rounded bg-gray-800 border border-gray-700 text-white h-24" value={item.description} onChange={(e) => updateItem(i, "description", e.target.value)} />
          </div>
          <div className="mb-2">
            <label className="block text-sm text-gray-400 mb-1">Tags (comma-separated)</label>
            <input
              className="w-full px-3 py-1.5 rounded bg-gray-800 border border-gray-700 text-white"
              value={rawTagInputs[i] || ""}
              onChange={(e) => {
                const next = [...rawTagInputs];
                next[i] = e.target.value;
                setRawTagInputs(next);
              }}
              onBlur={() => updateTags(i, rawTagInputs[i])}
            />
          </div>
        </div>
      ))}
      <button onClick={addItem} className="text-blue-400 text-sm mt-2">+ Add Project</button>

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
