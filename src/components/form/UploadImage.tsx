"use client";

import { FormEvent, useRef, useState } from "react";
import Image from "next/image";

export const UploadImage = () => {
  const ref = useRef<HTMLInputElement>(null);

  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!ref.current?.files?.[0]) return;

    const file = ref.current.files[0];

    const formData = new FormData();
    formData.append("file", file);

    const resp = await fetch("/api/image", {
      method: "POST",
      body: formData,
    });

    if (resp.status !== 200) return;

    const data = await resp.json();

    const id = data.images[0];

    setImageUrl(`/api/image/${id}`);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col max-w-md mx-auto">
        <input
          className="my-2"
          type="file"
          name="file"
          ref={ref}
          accept="image/*"
        />
        <button
          className="px-2 py-1 my-2 rounded-md border bg-slate-100"
          type="submit"
        >
          Upload
        </button>

        {imageUrl && (
          <div className="relative aspect-video max-h-[400px]">
            <Image
              src={imageUrl}
              alt={imageUrl}
              fill={true}
              className="object-contain"
            />
          </div>
        )}
      </form>
    </>
  );
};
