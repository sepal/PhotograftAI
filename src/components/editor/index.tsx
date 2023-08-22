"use client";

import { useEffect, useRef, useState } from "react";
import { ProcessButton, ProcessingState } from "../formElements/ProcessButton";
import { useRouter } from "next/navigation";
import HorizontalSlider from "../formElements/Slider";
import useMask from "@/lib/hooks/useMask";

interface Props {
  imageId: string;
}

interface Mask {
  id: string;
  score: number;
  imageUrl: string;
}

type Point = [number, number];

type MaskColor = [number, number, number, number];

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

  const color: MaskColor = [0, 120, 1000, 0.5];

  useEffect(() => {
    const img = new Image();
    img.src = `/api/image/${imageId}`;

    if (!canvasRef.current) return;

    // Initialize
    canvasCtxRef.current = canvasRef.current.getContext("2d");

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    const offScreenCanvas = document.createElement("canvas");
    offScreenCanvas.width = canvasWidth;
    offScreenCanvas.height = canvasHeight;
    const offScreenCtx = offScreenCanvas.getContext("2d");

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

      mask.onload = () => {
        if (canvasCtxRef.current === null) return;
        canvasCtxRef.current.drawImage(mask, 0, 0, 512, 512);
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
    const resp = await fetch(`/api/mask-inpaint`, {
      method: "POST",
      body: JSON.stringify({
        prompt: prompt,
        maskId: mask,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await resp.json();

    if (data.success != true || !data.image) {
      console.log(data);
      return;
    }

    const imageId = data.image;

    const checkEmbeddings = async () => {
      const resp = await fetch(`/api/image/${imageId}/embedding`);
      const data = await resp.json();
      console.log(data);
      if (data.success === true) {
        router.push(`/editor/${imageId}`);
        return;
      } else {
        setTimeout(checkEmbeddings, 1000);
      }
    };

    checkEmbeddings();

    console.log(data);
  };

  const handleSliderChange = (value: any) => {
    // setMask(masks[value].id);
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
