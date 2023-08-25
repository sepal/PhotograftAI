"use client";

import { useEffect, useRef, useState } from "react";
import { ProcessButton, ProcessingState } from "../formElements/ProcessButton";
import { useRouter } from "next/navigation";
import useMask from "@/lib/hooks/useMask";
import { maskToImage } from "@/lib/imageData";
import { Point } from "@/lib/sam";
import EditorCanvas from "./EditorCanvas";
import GenerateImageForm from "../form/GenerateImageFrom";
import { getPhotograftClient } from "@/lib/photograftApi";
import { loadImage } from "@/lib/graphics/images";

interface Props {
  imageId: string;
}

export const Editor = ({ imageId }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasCtxRef = useRef<CanvasRenderingContext2D | null>(null);

  const client = getPhotograftClient();

  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [mask, setPoints] = useMask(imageId, 512, 512, 1024 / 512);

  const [generateState, setGenerateState] = useState<ProcessingState>(
    ProcessingState.Idle
  );

  const router = useRouter();

  const drawPreview = async (canvas: CanvasRenderingContext2D) => {
    if (!image) return;
    canvasCtxRef.current!.drawImage(image, 0, 0, 512, 512);

    if (!mask) {
      return;
    }
    const maskImage = await maskToImage(mask, [0, 114, 189, 120]);
    canvasCtxRef.current!.drawImage(maskImage, 0, 0, 512, 512);
  };

  useEffect(() => {
    const loadOrgImage = async () => {
      const img = await loadImage(`/api/image/${imageId}`);
      setImage(img);
    };

    loadOrgImage();
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;
    canvasCtxRef.current = canvasRef.current.getContext("2d");

    if (!canvasCtxRef.current) return;
    drawPreview(canvasCtxRef.current);
  }, [image, mask]);

  const handlePoint = async (point: Point) => {
    setPoints([point]);
  };

  const handleGenerateImage = async (prompt: string) => {
    if (!mask) return;
    setGenerateState(ProcessingState.Processing);
    const newImageId = await client.maskedInPainting(imageId, prompt, mask);
    if (!newImageId) {
      console.error("Could not generate image");
      return;
    }

    const checkEmbeddings = async () => {
      console.log("Checking if embeddings were generated");
      const hasEmbeddings = await client.hasEmbeddings(newImageId);

      if (hasEmbeddings === true) {
        console.log(
          "Embeddings generated, redirecting to editor with new image id"
        );
        router.push(`/editor/${newImageId}`);
        return;
      } else {
        setTimeout(checkEmbeddings, 1000);
      }
    };

    const checkImageGenerated = async () => {
      console.log("Checking if image was generated");
      const hasImage = await client.hasImage(newImageId);

      if (hasImage == true) {
        console.log("Image generated");
        checkEmbeddings();
        return;
      } else {
        setTimeout(checkImageGenerated, 1000);
      }
    };

    checkImageGenerated();
  };

  return (
    <div className="flex flex-col justify-between items-stretch max-w-lg m-auto">
      <div className="grow w-full">
        <EditorCanvas ref={canvasRef} onPointClick={handlePoint} />
      </div>
      <GenerateImageForm onSubmit={handleGenerateImage} state={generateState} />
    </div>
  );
};
