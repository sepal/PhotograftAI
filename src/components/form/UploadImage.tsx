"use client";

import { FormEvent, useRef } from "react";

export const UploadImage = () => {
  const ref = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!ref.current?.files?.[0]) return;

    const file = ref.current.files[0];

    const formData = new FormData();
    formData.append("file", file);

    fetch("/api/upload", {
      method: "POST",
      body: formData,
    });
    console.log("Uploaded");
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
      </form>
    </>
  );
};
