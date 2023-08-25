"use client";

import { FormEvent, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ImageDrop } from "../formElements/ImageDrop";
import { ProcessButton, ProcessingState } from "../formElements/ProcessButton";
import { getPhotograftClient } from "@/lib/photograftApi";

export const UploadImage = () => {
  const router = useRouter();
  const [state, setState] = useState<ProcessingState>(ProcessingState.Idle);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleDrop = (file: File) => {
    setSelectedFile(file);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedFile) return;
    const formData = new FormData();
    formData.append("file", selectedFile);

    setState(ProcessingState.Processing);

    const resp = await fetch("/api/image", {
      method: "POST",
      body: formData,
    });

    if (resp.status !== 200) {
      console.error("Error uploading image", resp.status, resp.statusText);
      return;
    }
    const data = await resp.json();

    const id = data.images[0];

    console.log(data);
    setState(ProcessingState.Done);

    const checkEmbeddings = async () => {
      const photograft = getPhotograftClient();
      const hasImage = await photograft.hasEmbeddings(id);
      if (hasImage === true) {
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
        <ImageDrop
          onDrop={handleDrop}
          disabled={state != ProcessingState.Idle}
        />

        <ProcessButton state={state}>Upload</ProcessButton>
      </form>
    </>
  );
};
