"use client";

import { useState } from "react";
import { UploadButton } from "@/utils/uploadthing";

export default function UploadImage({
  onUploadComplete,
}: {
  onUploadComplete: (url: string) => void;
}) {
  const [preview, setPreview] = useState("");

  return (
    <div className="mb-4">
      {!preview ? (
        <UploadButton
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            if (res && res[0]?.url) {
              setPreview(res[0].url);
              onUploadComplete(res[0].url);
            }
          }}
          onUploadError={(err: Error) => alert("Yükleme hatası: " + err.message)}
        />
      ) : (
        <div className="relative w-48 h-48">
          <img
            src={preview}
            alt="Yüklenen Görsel"
            className="w-full h-full object-cover rounded border"
          />
          <button
            type="button"
            onClick={() => {
              setPreview("");
              onUploadComplete("");
            }}
            className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-700"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}
