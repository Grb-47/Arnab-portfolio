"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ImageField } from "@/components/admin/ImageField";

interface BlogPost {
  image: string;
  thumbnail: string;
  category: string;
  title: string;
  shortDescription: string;
  description: string;
}

interface BlogsData {
  sectionTitle: string;
  posts: BlogPost[];
}

export default function AdminBlogs() {
  const router = useRouter();
  const [data, setData] = useState<BlogsData | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/blogs")
      .then((r) => r.json())
      .then(setData);
  }, []);

  const save = async () => {
    setSaving(true);
    await fetch("/api/blogs", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setSaving(false);
  };

  if (!data) return <p className="text-gray-400">Loading...</p>;

  const updatePost = (i: number, field: string, val: string) => {
    const posts = [...data.posts];
    posts[i] = { ...posts[i], [field]: val };
    setData({ ...data, posts });
  };

  const addPost = () => {
    setData({ ...data, posts: [...data.posts, { image: "", thumbnail: "", category: "", title: "", shortDescription: "", description: "" }] });
  };

  const removePost = (i: number) => {
    setData({ ...data, posts: data.posts.filter((_, idx) => idx !== i) });
  };

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold mb-6">Edit Blogs</h1>
      <Field label="Section Title" val={data.sectionTitle} onChange={(v) => setData({ ...data, sectionTitle: v })} />

      {data.posts.map((post, i) => (
        <div key={i} className="p-3 border border-gray-700 rounded mb-2 bg-gray-900 mt-4">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-semibold">Post #{i + 1}</span>
            <button onClick={() => removePost(i)} className="text-red-400 text-sm">✕ Remove</button>
          </div>
          <Field label="Title" val={post.title} onChange={(v) => updatePost(i, "title", v)} />
          <Field label="Category" val={post.category} onChange={(v) => updatePost(i, "category", v)} />
          <ImageField label="Image" value={post.image} onChange={(v) => updatePost(i, "image", v)} />
          <ImageField label="Thumbnail" value={post.thumbnail} onChange={(v) => updatePost(i, "thumbnail", v)} />
          <Field label="Short Description" val={post.shortDescription} onChange={(v) => updatePost(i, "shortDescription", v)} />
          <div className="mb-2">
            <label className="block text-sm text-gray-400 mb-1">Content</label>
            <textarea className="w-full px-3 py-1.5 rounded bg-gray-800 border border-gray-700 text-white h-32" value={post.description} onChange={(e) => updatePost(i, "description", e.target.value)} />
          </div>
        </div>
      ))}
      <button onClick={addPost} className="text-blue-400 text-sm mt-2">+ Add Post</button>

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
