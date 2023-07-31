import { Canvas } from "@/components/editor/Canvas";
import { UploadImage } from "@/components/form/UploadImage";
import Image from "next/image";

export default async function Page({
  params,
}: {
  params: { imageId: string };
}) {
  const { imageId } = params;
  // const resp = await fetch(`/api/image/${imageId}/mask?point=[[[75,75]]]`);

  return (
    <div className="w-4/12 mx-auto">
      <Canvas imageId={imageId} />
    </div>
  );
}
