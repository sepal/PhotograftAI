"use client";

import { useEffect, useRef, useState } from "react";
import { ProcessButton, ProcessingState } from "../formElements/ProcessButton";
import { useRouter } from "next/navigation";
import useMask from "@/lib/hooks/useMask";
import { uploadMask } from "@/lib/masks";
import { maskToImage } from "@/lib/imageData";
import { Point } from "@/lib/sam";

interface Props {
  imageId: string;
}

export const Canvas = ({ imageId }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasCtxRef = useRef<CanvasRenderingContext2D | null>(null);

  const [mask, setPoints] = useMask(
    `/api/image/${imageId}/embeddings`,
    512,
    512,
    1024 / 512
  );

  const [generateState, setGenerateState] = useState<ProcessingState>(
    ProcessingState.Idle
  );

  const promptInput = useRef<HTMLTextAreaElement>(null);

  const router = useRouter();

  useEffect(() => {
    const img = new Image();
    img.src = `/api/image/${imageId}`;

    if (!canvasRef.current) return;

    // Initialize
    canvasCtxRef.current = canvasRef.current.getContext("2d");

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    canvasCtxRef.current!.clearRect(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );

    img.onload = () => {
      if (canvasCtxRef.current === null) return;

      if (!mask) {
        canvasCtxRef.current.drawImage(img, 0, 0, 512, 512);
        return;
      }

      const maskImage = maskToImage(mask, [0, 114, 189, 120]);

      maskImage.onload = () => {
        if (canvasCtxRef.current === null) return;
        canvasCtxRef.current.drawImage(maskImage, 0, 0, 512, 512);
        canvasCtxRef.current.globalCompositeOperation = "destination-over";
        canvasCtxRef.current.drawImage(img, 0, 0, 512, 512);
      };
    };
  }, [mask]);

  const handleClick = async (
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current?.getBoundingClientRect();
    const widthRation = canvasRef.current.width / canvasRef.current.clientWidth;
    const heightRatio =
      canvasRef.current.height / canvasRef.current.clientHeight;
    if (!rect) return;
    const x = (e.clientX - rect.left) * widthRation;
    const y = (e.clientY - rect.top) * heightRatio;

    const point: Point = [x, y];
    setPoints([point]);
  };

  const handleGenerateImage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!promptInput.current?.value) return;
    const prompt = promptInput.current?.value;
    if (!mask) return;
    setGenerateState(ProcessingState.Processing);
    const maskResp = await uploadMask(imageId, mask);

    console.log(maskResp);

    const resp = await fetch(`/api/mask-inpaint`, {
      method: "POST",
      body: JSON.stringify({
        prompt: prompt,
        maskId: maskResp["maskId"],
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await resp.json();

    if (data.success != true || !data.imageId) {
      console.log(data);
      return;
    }

    const newImageId = data.imageId;

    const checkEmbeddings = async () => {
      console.log("Checking if embeddings were generated");
      const resp = await fetch(`/api/image/${newImageId}/embedding`);
      const data = await resp.json();
      console.log(data);
      if (data.success === true) {
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
      const resp = await fetch(`/api/image/${newImageId}/hasImage`, {
        method: "POST",
      });
      const data = await resp.json();
      console.log(data);

      if (data.hasImage == true) {
        console.log("Image generated");
        checkEmbeddings();
        return;
      } else {
        setTimeout(checkImageGenerated, 1000);
      }
    };

    checkImageGenerated();

    console.log(data);
  };

  return (
    <div className="flex flex-col justify-between items-stretch max-w-lg m-auto">
      <div className="grow w-full">
        <canvas
          ref={canvasRef}
          onClick={handleClick}
          width="512px"
          height="512px"
          className="m-auto w-full"
        />
      </div>
      <form className="flex flex-col my-4" onSubmit={handleGenerateImage}>
        <textarea
          className="border my-2 p-1 border-slate-500 rounded"
          placeholder="A golden hour sky..."
          ref={promptInput}
        />
        <ProcessButton state={generateState}>Generate</ProcessButton>
      </form>
    </div>
  );
};
