"use client";

export default function UploadForm() {
  const uploadPhoto = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData();
    formData.append("photo", event.target.files?.[0]!);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    event.target.value = "";
  };

  return (
    <form>
      <input type="file" onChange={uploadPhoto} />
    </form>
  );
}
