"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ImageField } from "@/components/admin/ImageField";

interface Org {
  name: string;
  logo: string;
  designations: { title: string; year: string }[];
  description: string;
}

interface Edu {
  institution: string;
  degree: string;
  year: string;
}

interface AboutData {
  sectionTitle: string;
  intro: string;
  photo: string;
  photoAlt: string;
  organizations: Org[];
  education: Edu[];
  bio: string;
}

export default function AdminAbout() {
  const router = useRouter();
  const [data, setData] = useState<AboutData | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/about")
      .then((r) => r.json())
      .then(setData);
  }, []);

  const save = async () => {
    setSaving(true);
    await fetch("/api/about", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setSaving(false);
  };

  if (!data) return <p className="text-gray-400">Loading...</p>;

  const updateOrg = (i: number, field: string, val: string) => {
    const orgs = [...data.organizations];
    orgs[i] = { ...orgs[i], [field]: val };
    setData({ ...data, organizations: orgs });
  };

  const updateDesignation = (orgIdx: number, desIdx: number, field: string, val: string) => {
    const orgs = [...data.organizations];
    const des = [...orgs[orgIdx].designations];
    des[desIdx] = { ...des[desIdx], [field]: val };
    orgs[orgIdx] = { ...orgs[orgIdx], designations: des };
    setData({ ...data, organizations: orgs });
  };

  const addOrg = () => {
    setData({
      ...data,
      organizations: [
        ...data.organizations,
        { name: "", logo: "", designations: [{ title: "", year: "" }], description: "" },
      ],
    });
  };

  const removeOrg = (i: number) => {
    setData({ ...data, organizations: data.organizations.filter((_, idx) => idx !== i) });
  };

  const addDes = (orgIdx: number) => {
    const orgs = [...data.organizations];
    orgs[orgIdx] = { ...orgs[orgIdx], designations: [...orgs[orgIdx].designations, { title: "", year: "" }] };
    setData({ ...data, organizations: orgs });
  };

  const updateEdu = (i: number, field: string, val: string) => {
    const edu = [...data.education];
    edu[i] = { ...edu[i], [field]: val };
    setData({ ...data, education: edu });
  };

  const addEdu = () => {
    setData({ ...data, education: [...data.education, { institution: "", degree: "", year: "" }] });
  };

  const removeEdu = (i: number) => {
    setData({ ...data, education: data.education.filter((_, idx) => idx !== i) });
  };

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Edit About Section</h1>

      <div className="space-y-4">
        <Field label="Section Title" val={data.sectionTitle} onChange={(v) => setData({ ...data, sectionTitle: v })} />
        <Field label="Intro" val={data.intro} onChange={(v) => setData({ ...data, intro: v })} />
        <ImageField label="Photo" value={data.photo} onChange={(v) => setData({ ...data, photo: v })} />
        <Field label="Photo Alt" val={data.photoAlt} onChange={(v) => setData({ ...data, photoAlt: v })} />

        <div>
          <label className="block text-sm text-gray-400 mb-1">Bio</label>
          <textarea
            className="w-full px-3 py-1.5 rounded bg-gray-800 border border-gray-700 text-white h-32"
            value={data.bio}
            onChange={(e) => setData({ ...data, bio: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-1">Organizations</label>
          {data.organizations.map((org, i) => (
            <div key={i} className="p-3 border border-gray-700 rounded mb-2 bg-gray-900">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-semibold">#{i + 1}</span>
                <button onClick={() => removeOrg(i)} className="text-red-400 text-sm">✕ Remove</button>
              </div>
              <Field label="Name" val={org.name} onChange={(v) => updateOrg(i, "name", v)} />
              <ImageField label="Logo" value={org.logo} onChange={(v) => updateOrg(i, "logo", v)} />
              <Field label="Description" val={org.description} onChange={(v) => updateOrg(i, "description", v)} />
              <div className="mt-2">
                <span className="text-sm text-gray-400">Designations</span>
                {org.designations.map((des, di) => (
                  <div key={di} className="flex gap-2 mt-1">
                    <input className="flex-1 px-2 py-1 rounded bg-gray-800 border border-gray-700 text-white text-sm" placeholder="Title" value={des.title} onChange={(e) => updateDesignation(i, di, "title", e.target.value)} />
                    <input className="w-24 px-2 py-1 rounded bg-gray-800 border border-gray-700 text-white text-sm" placeholder="Year" value={des.year} onChange={(e) => updateDesignation(i, di, "year", e.target.value)} />
                  </div>
                ))}
                <button onClick={() => addDes(i)} className="text-blue-400 text-sm mt-1">+ Add Designation</button>
              </div>
            </div>
          ))}
          <button onClick={addOrg} className="text-blue-400 text-sm">+ Add Organization</button>
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-1">Education</label>
          {data.education.map((edu, i) => (
            <div key={i} className="flex gap-2 mb-2 items-start">
              <input className="flex-1 px-2 py-1 rounded bg-gray-800 border border-gray-700 text-white text-sm" placeholder="Institution" value={edu.institution} onChange={(e) => updateEdu(i, "institution", e.target.value)} />
              <input className="flex-1 px-2 py-1 rounded bg-gray-800 border border-gray-700 text-white text-sm" placeholder="Degree" value={edu.degree} onChange={(e) => updateEdu(i, "degree", e.target.value)} />
              <input className="w-28 px-2 py-1 rounded bg-gray-800 border border-gray-700 text-white text-sm" placeholder="Year" value={edu.year} onChange={(e) => updateEdu(i, "year", e.target.value)} />
              <button onClick={() => removeEdu(i)} className="text-red-400 text-sm mt-1">✕</button>
            </div>
          ))}
          <button onClick={addEdu} className="text-blue-400 text-sm">+ Add Education</button>
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
    <div className="mb-2">
      <label className="block text-sm text-gray-400 mb-1">{label}</label>
      <input className="w-full px-3 py-1.5 rounded bg-gray-800 border border-gray-700 text-white" value={val} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}
