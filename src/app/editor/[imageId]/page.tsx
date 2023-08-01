import { Canvas } from "@/components/editor";

export default async function Page({
  params,
}: {
  params: { imageId: string };
}) {
  const { imageId } = params;

  return (
    <div className="p-4 mx-auto">
      <Canvas imageId={imageId} />
    </div>
  );
}
