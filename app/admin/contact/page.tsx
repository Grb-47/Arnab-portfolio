"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface SocialLink {
  name: string;
  platform: string;
  url: string;
}

interface ContactData {
  sectionTitle: string;
  subtitle: string;
  email: string;
  cvPath: string;
  bookMeetingUrl: string;
  socials: SocialLink[];
  footerText: string;
}

export default function AdminContact() {
  const router = useRouter();
  const [data, setData] = useState<ContactData | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/contact")
      .then((r) => r.json())
      .then(setData);
  }, []);

  const save = async () => {
    setSaving(true);
    await fetch("/api/contact", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setSaving(false);
  };

  if (!data) return <p className="text-gray-400">Loading...</p>;

  const updateSocial = (i: number, field: string, val: string) => {
    const socials = [...data.socials];
    socials[i] = { ...socials[i], [field]: val };
    setData({ ...data, socials });
  };

  const addSocial = () => {
    setData({ ...data, socials: [...data.socials, { name: "", platform: "facebook", url: "" }] });
  };

  const removeSocial = (i: number) => {
    setData({ ...data, socials: data.socials.filter((_, idx) => idx !== i) });
  };

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Edit Contact Section</h1>

      <div className="space-y-4">
        <Field label="Section Title" val={data.sectionTitle} onChange={(v) => setData({ ...data, sectionTitle: v })} />
        <Field label="Subtitle" val={data.subtitle} onChange={(v) => setData({ ...data, subtitle: v })} />
        <Field label="Email" val={data.email} onChange={(v) => setData({ ...data, email: v })} />
        <Field label="CV Path" val={data.cvPath} onChange={(v) => setData({ ...data, cvPath: v })} />
        <Field label="Book Meeting URL" val={data.bookMeetingUrl} onChange={(v) => setData({ ...data, bookMeetingUrl: v })} />
        <Field label="Footer Text" val={data.footerText} onChange={(v) => setData({ ...data, footerText: v })} />

        <div>
          <label className="block text-sm text-gray-400 mb-1">Social Links</label>
          {data.socials.map((social, i) => (
            <div key={i} className="flex gap-2 mb-2 items-start">
              <input className="flex-1 px-2 py-1 rounded bg-gray-800 border border-gray-700 text-white text-sm" placeholder="Name" value={social.name} onChange={(e) => updateSocial(i, "name", e.target.value)} />
              <select className="px-2 py-1 rounded bg-gray-800 border border-gray-700 text-white text-sm" value={social.platform} onChange={(e) => updateSocial(i, "platform", e.target.value)}>
                {["facebook","instagram","linkedin","whatsapp","gmail","twitter","youtube"].map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
              <input className="flex-[2] px-2 py-1 rounded bg-gray-800 border border-gray-700 text-white text-sm" placeholder="URL" value={social.url} onChange={(e) => updateSocial(i, "url", e.target.value)} />
              <button onClick={() => removeSocial(i)} className="text-red-400 text-sm mt-1">✕</button>
            </div>
          ))}
          <button onClick={addSocial} className="text-blue-400 text-sm">+ Add Social</button>
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

function Field({ label, val, onChange }: { label: string; val: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="block text-sm text-gray-400 mb-1">{label}</label>
      <input className="w-full px-3 py-1.5 rounded bg-gray-800 border border-gray-700 text-white" value={val} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}
