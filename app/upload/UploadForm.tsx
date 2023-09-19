"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function UploadForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const uploadPhoto = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("photo", event.target.files?.[0]!);

    await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    event.target.value = "";
    router.push("/");
  };

  return (
    <form>
      <label className="w-full h-32 border-2 border-dashed border-blue-500 rounded-xl grid items-center justify-center cursor-pointer bg-blue-50 hover:bg-blue-100 transition-colors">
        <input type="file" onChange={uploadPhoto} hidden disabled={loading} />
        <p className="font-semibold text-lg text-blue-600">
          {loading ? "Uploading your masterpiece..." : "Tap to upload photo"}
        </p>
      </label>
    </form>
  );
}
