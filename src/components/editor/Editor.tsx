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
import Spinner from "../icons/Spinner";
import ProcessingOverlay from "./ProcessingOverlay";
import { drawPoint } from "@/lib/graphics/objects";
import { is_within_radius } from "@/lib/graphics/calculations";

interface Props {
  imageId: string;
  image: HTMLImageElement;
}

export const Editor = ({ imageId, image }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasCtxRef = useRef<CanvasRenderingContext2D | null>(null);

  const client = getPhotograftClient();

  const [mask, points, setPoints] = useMask(imageId, 512, 512, 1024 / 512);

  const [generateState, setGenerateState] = useState<ProcessingState>(
    ProcessingState.Idle
  );

  const router = useRouter();

  const drawPreview = async (canvas: CanvasRenderingContext2D) => {
    if (!image) return;
    canvasCtxRef.current!.drawImage(image, 0, 0, 512, 512);

    if (!mask || points.length == 0) {
      return;
    }
    const maskImage = await maskToImage(mask, [0, 114, 189, 120]);
    canvasCtxRef.current!.drawImage(maskImage, 0, 0, 512, 512);

    points.forEach((point) => {
      drawPoint(canvasCtxRef.current!, point);
    });
  };

  useEffect(() => {
    if (!canvasRef.current) return;
    canvasCtxRef.current = canvasRef.current.getContext("2d");

    if (!canvasCtxRef.current) return;
    drawPreview(canvasCtxRef.current);
  }, [image, mask]);

  const handlePoint = async (newPoint: Point) => {
    const filteredPoints = is_within_radius(newPoint, points, 10);

    if (filteredPoints.length != points.length) {
      setPoints(filteredPoints);
    } else {
      setPoints([...points, newPoint]);
    }
  };

  const handleGenerateImage = async (prompt: string = "") => {
    if (!mask) return;
    setGenerateState(ProcessingState.Processing);
    const newImageId = await client.maskedInPainting(imageId, prompt, mask);
    if (!newImageId) {
      console.error("Could not generate image");
      return;
    }

    const checkImageGenerated = async () => {
      console.log("Checking if image was generated");
      const hasImage = await client.hasImage(newImageId);

      if (hasImage == true) {
        console.log("Image generated");
        router.push(`/editor/${newImageId}`);
        return;
      } else {
        setTimeout(checkImageGenerated, 1000);
      }
    };

    checkImageGenerated();
  };

  return (
    <>
      <div className="grow w-full relative">
        <EditorCanvas ref={canvasRef} onPointClick={handlePoint} />

        {generateState == ProcessingState.Processing && (
          <ProcessingOverlay text="Generating image..." />
        )}
      </div>
      <GenerateImageForm onSubmit={handleGenerateImage} state={generateState} />
    </>
  );
};
