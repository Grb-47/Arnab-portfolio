"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ImageField } from "@/components/admin/ImageField";

interface Logo {
  src: string;
  alt: string;
}

interface HeroData {
  titleLine1: string;
  titleLine2: string;
  subtitle: string;
  profileImage: string;
  profileImageAlt: string;
  logosLabel: string;
  logos: Logo[];
}

export default function AdminHero() {
  const router = useRouter();
  const [data, setData] = useState<HeroData | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/hero")
      .then((r) => r.json())
      .then(setData);
  }, []);

  const save = async () => {
    setSaving(true);
    await fetch("/api/hero", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setSaving(false);
  };

  if (!data) return <p className="text-gray-400">Loading...</p>;

  const updateLogo = (i: number, field: keyof Logo, val: string) => {
    const logos = [...data.logos];
    logos[i] = { ...logos[i], [field]: val };
    setData({ ...data, logos });
  };

  const addLogo = () => {
    setData({ ...data, logos: [{ src: "", alt: "" }, ...data.logos] });
  };

  const removeLogo = (i: number) => {
    setData({ ...data, logos: data.logos.filter((_, idx) => idx !== i) });
  };

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Edit Hero Section</h1>

      <div className="space-y-4">
        <Field label="Title Line 1" val={data.titleLine1} onChange={(v) => setData({ ...data, titleLine1: v })} />
        <Field label="Title Line 2" val={data.titleLine2} onChange={(v) => setData({ ...data, titleLine2: v })} />
        <Field label="Subtitle" val={data.subtitle} onChange={(v) => setData({ ...data, subtitle: v })} />
        <ImageField label="Profile Image" value={data.profileImage} onChange={(v) => setData({ ...data, profileImage: v })} />
        <Field label="Profile Image Alt" val={data.profileImageAlt} onChange={(v) => setData({ ...data, profileImageAlt: v })} />
        <Field label="Logos Label" val={data.logosLabel} onChange={(v) => setData({ ...data, logosLabel: v })} />

        <div>
          <label className="block text-sm text-gray-400 mb-1">Logos</label>
          {data.logos.map((logo, i) => (
            <div key={i} className="mb-2 p-3 border border-gray-700 rounded bg-gray-900">
              <ImageField
                label="Image"
                value={logo.src}
                onChange={(v) => updateLogo(i, "src", v)}
              />
              <input
                className="w-full px-3 py-1.5 rounded bg-gray-800 border border-gray-700 text-white text-sm"
                placeholder="Alt text"
                value={logo.alt}
                onChange={(e) => updateLogo(i, "alt", e.target.value)}
              />
              <button onClick={() => removeLogo(i)} className="text-red-400 text-sm mt-1">✕ Remove</button>
            </div>
          ))}
          <button onClick={addLogo} className="text-blue-400 text-sm mt-1">
            + Add Logo
          </button>
        </div>
      </div>

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

function Field({
  label,
  val,
  onChange,
}: {
  label: string;
  val: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="block text-sm text-gray-400 mb-1">{label}</label>
      <input
        className="w-full px-3 py-1.5 rounded bg-gray-800 border border-gray-700 text-white"
        value={val}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
