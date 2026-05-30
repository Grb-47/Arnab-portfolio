"use client";

import { useState, useRef } from "react";

interface ImageFieldProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
}

export function ImageField({ label, value, onChange }: ImageFieldProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [previewError, setPreviewError] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);

    try {
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (data.url) {
        onChange(data.url);
        setPreviewError(false);
      }
    } catch {
      // ignore
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mb-2">
      <label className="block text-sm text-gray-400 mb-1">{label}</label>

      <div className="flex gap-2 mb-2">
        <input
          type="text"
          className="flex-1 px-3 py-1.5 rounded bg-gray-800 border border-gray-700 text-white"
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setPreviewError(false);
          }}
          placeholder="Image URL or path"
        />
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleUpload}
        />
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className="px-3 py-1.5 rounded bg-blue-600 text-white text-sm hover:bg-blue-500 disabled:opacity-50 shrink-0"
        >
          {uploading ? "..." : "Upload"}
        </button>
      </div>

      {value && (
        <div className="relative h-32 w-full rounded overflow-hidden bg-gray-900 border border-gray-700">
          {previewError ? (
            <div className="flex items-center justify-center h-full text-gray-500 text-sm">
              Preview unavailable
            </div>
          ) : (
            <img
              src={value}
              alt="Preview"
              className="w-full h-full object-contain"
              onError={() => setPreviewError(true)}
            />
          )}
        </div>
      )}
    </div>
  );
}
