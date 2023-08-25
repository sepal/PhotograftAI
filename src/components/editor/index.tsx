"use client";

import { loadImage } from "@/lib/graphics/images";
import { useEffect, useState } from "react";
import { Editor } from "./Editor";
import { getPhotograftClient } from "@/lib/photograftApi";
import Image from "next/image";
import Spinner from "../icons/Spinner";

interface Props {
  imageId: string;
}

export default function ({ imageId }: Props) {
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [hasEmbeddings, setHasEmbeddings] = useState<boolean>(false);
  const imageUrl = `/api/image/${imageId}`;

  const client = getPhotograftClient();

  useEffect(() => {
    const loadOrgImage = async () => {
      const img = await loadImage(imageUrl);
      setImage(img);
      console.log("Image set");
    };

    loadOrgImage();

    const checkEmbeddings = async () => {
      console.log("Checking if embeddings were generated");
      const check = await client.hasEmbeddings(imageId);

      if (check === true) {
        console.log(
          "Embeddings generated, redirecting to editor with new image id"
        );
        setHasEmbeddings(true);
        return;
      } else {
        setTimeout(checkEmbeddings, 1000);
      }
    };

    checkEmbeddings();
  }, []);

  let child = (
    <div>
      <Image src={imageUrl} alt="Loading image" width={512} height={512} />
      <div className="absolute flex justify-center items-center w-full h-full top-0  text-white bg-black/60">
        <div className="text-center">
          <Spinner size="2rem" color="bg-slate-300" /> Processing image...
        </div>
      </div>
    </div>
  );
  if (image && hasEmbeddings) {
    child = <Editor imageId={imageId} image={image} />;
  }

  return (
    <div className="flex flex-col justify-between items-stretch max-w-lg m-auto relative">
      {child}
    </div>
  );
}
