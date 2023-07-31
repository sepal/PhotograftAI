"use client";

import { useEffect, useRef, useState } from "react";
import { ProcessButton, ProcessingState } from "../forms/ProcessButton";
import { useRouter } from "next/navigation";

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
  const [point, setPoint] = useState<Point>([75, 75]);
  const [masks, setMasks] = useState<Mask[]>([]);
  const [mask, setMask] = useState<string | null>(null);
  const [generateState, setGenerateState] = useState<ProcessingState>(ProcessingState.Idle);
  const promptInput = useRef<HTMLInputElement>(null);

  const router = useRouter();

  const color: MaskColor = [0, 120, 1000, 0.5];

  useEffect(() => {
    const fetchMasks = async () => {
      const points = JSON.stringify([[point]]);
      const resp = await fetch(`/api/image/${imageId}/mask?point=${points}`);
      const data = await resp.json();

      const newMasks = data["body"] as Mask[];

      if (newMasks.length === 0) return;
      setMask(newMasks[0].id);
      setMasks(newMasks);
    };
    fetchMasks();
  }, [point]);

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

    const maskUrl = masks?.find((m) => m.id === mask)?.imageUrl;

    canvasCtxRef.current!.clearRect(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );

    img.onload = () => {
      if (canvasCtxRef.current === null) return;

      if (!maskUrl) {
        canvasCtxRef.current.drawImage(img, 0, 0, 400, 400);
        return;
      }

      const maskImage = new Image();
      maskImage.src = maskUrl;
      console.log(maskUrl);

      maskImage.onload = () => {
        if (canvasCtxRef.current === null) return;
        if (!offScreenCtx) return;
        offScreenCtx.drawImage(maskImage, 0, 0, 400, 400);
        const maskData = offScreenCtx.getImageData(0, 0, 400, 400);

        let d = maskData.data;

        for (let i = 0; i < d.length; i += 4) {
          // Calculate the brightness of the pixel
          let brightness = (d[i] + d[i + 1] + d[i + 2]) / 3 / 255;

          d[i] = color[0]; // Red channel
          d[i + 1] = color[1]; // Green channel
          d[i + 2] = color[2]; // Blue channel
          d[i + 3] = color[3] * brightness * 255; // Alpha channel
        }

        canvasCtxRef.current.putImageData(maskData, 0, 0);
        canvasCtxRef.current.globalCompositeOperation = "destination-over";
        canvasCtxRef.current.drawImage(img, 0, 0, 400, 400);
      };
    };
  }, [masks, mask]);

  const handleClick = async (
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const point: Point = [x, y];
    console.log([[point]]);
    const resp = await fetch(`/api/image/${imageId}/mask`, {
      method: "POST",
      body: JSON.stringify([[point]]),
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(await resp.json());

    setPoint(point);
  };

  const handleSelectMask = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const maskId = e.target.value;
    setMask(maskId);
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
  }

  return (
    <div className="flex flex-col justify-between items-stretch">
      <div className="grow w-full">
        <canvas
          ref={canvasRef}
          onClick={handleClick}
          width="400px"
          height="400px"
          className="m-auto"
        />
      </div>
      <form className="flex flex-col my-4" onSubmit={handleGenerateImage} >
        <select onChange={handleSelectMask}>
          {masks.map((mask) => (
            <option key={mask.id} value={mask.id}>
              {mask.score}
            </option>
          ))}
        </select>
        <input className="border my-2" type="text" placeholder="A golden hour sky..." ref={promptInput} />
        <ProcessButton state={generateState}>
          Generate
        </ProcessButton>
      </form>
    </div>
  );
};
