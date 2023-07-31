"use client";

import { FormEvent, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Spinner } from "../icons/spinner";

enum ProcessingState {
  Idle,
  Uploading,
  WaitForEmbeddings,
  Done,
}

export const UploadImage = () => {
  const router = useRouter();
  const [state, setState] = useState<ProcessingState>(ProcessingState.Idle);
  const ref = useRef<HTMLInputElement>(null);

  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!ref.current?.files?.[0]) return;

    const file = ref.current.files[0];

    const formData = new FormData();
    formData.append("file", file);

    setState(ProcessingState.Uploading);

    const resp = await fetch("/api/image", {
      method: "POST",
      body: formData,
    });

    if (resp.status !== 200) {
      console.error("Error uploading image", resp.status, resp.statusText);
      return;
    }
    setState(ProcessingState.WaitForEmbeddings);
    const data = await resp.json();

    const id = data.images[0];

    console.log(data);
    setState(ProcessingState.Done);

    const checkEmbeddings = async () => {
      const resp = await fetch(`/api/image/${id}/embedding`);
      const data = await resp.json();
      console.log(data);
      if (data.success === true) {
        setState(ProcessingState.Done);
        router.push(`/editor/${id}`);
        return;
      } else {
        setTimeout(checkEmbeddings, 1000);
      }
    };

    await checkEmbeddings();
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col max-w-md mx-auto">
        {state === ProcessingState.Idle && (
          <>
            <input
              className="my-2"
              type="file"
              name="file"
              ref={ref}
              accept="image/*"
            />
          </>
        )}

        <button
          className={`px-2 py-1 my-2 rounded-md border bg-indigo-500 text-white ${
            state !== ProcessingState.Idle &&
            "transition ease-in-out duration-150 cursor-not-allowed"
          }`}
          disabled={state !== ProcessingState.Idle}
          type="submit"
        >
          {state !== ProcessingState.Idle && <Spinner />}{" "}
          {state === ProcessingState.Idle ? "Upload" : "Processing..."}
        </button>
      </form>
    </>
  );
};
