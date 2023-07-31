"use client";

import { useEffect, useRef, useState } from "react";

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

function drawMask(
  ctx: CanvasRenderingContext2D,
  img1: HTMLImageElement,
  maskSrc: string,
  maskColor: MaskColor
): void {
  let imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.drawImage(img1, 0, 0);
  let maskData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
  //ctx.putImageData(imageData, 0, 0); // Reset to original image

  let d = maskData.data;
  for (let i = 0; i < d.length; i += 4) {
    // Calculate the brightness of the pixel
    let brightness = (d[i] + d[i + 1] + d[i + 2]) / 3 / 255;

    // Overwrite this pixel with your mask color, modifying the alpha channel based on the brightness
    d[i] = maskColor[0]; // Red channel
    d[i + 1] = maskColor[1]; // Green channel
    d[i + 2] = maskColor[2]; // Blue channel
    d[i + 3] = maskColor[3] * brightness * 255; // Alpha channel
  }

  ctx.putImageData(maskData, 0, 0);
}

export const Canvas = ({ imageId }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasCtxRef = useRef<CanvasRenderingContext2D | null>(null);
  const [point, setPoint] = useState<Point>([75, 75]);
  const [masks, setMasks] = useState<Mask[]>([]);
  const [mask, setMask] = useState<string | null>(null);

  const color: MaskColor = [0, 120, 1000, 0.5];

  useEffect(() => {
    const fetchMasks = async () => {
      const points = JSON.stringify([[point]]);
      const resp = await fetch(`/api/image/${imageId}/mask?point=${points}`);
      const data = await resp.json();

      const newMasks = data["body"] as Mask[];

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

    if (!mask) return;

    const maskUrl = masks.find((m) => m.id === mask)?.imageUrl;

    canvasCtxRef.current!.clearRect(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );

    img.onload = () => {
      if (canvasCtxRef.current === null) return;

      if (!maskUrl) return;

      const mask = new Image();
      mask.src = maskUrl;
      console.log(maskUrl);

      mask.onload = () => {
        if (canvasCtxRef.current === null) return;
        if (!offScreenCtx) return;
        offScreenCtx.drawImage(mask, 0, 0, 400, 400);
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

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
  };

  const handleSelectMask = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const maskId = e.target.value;
    setMask(maskId);
  };

  return (
    <div className="flex flex-column">
      <div>
        <canvas
          ref={canvasRef}
          onClick={handleClick}
          width="400px"
          height="400px"
          className="m-auto"
        />
      </div>
      <div className="">
        <select onChange={handleSelectMask}>
          {masks.map((mask) => (
            <option key={mask.id} value={mask.id}>
              {mask.score}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
