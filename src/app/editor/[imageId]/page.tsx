import { Canvas } from "@/components/editor";


export default async function Page({
  params,
}: {
  params: { imageId: string };
}) {
  const { imageId } = params;

  return (
    <div className="w-4/12 mx-auto">
      <Canvas imageId={imageId} />
    </div>
  );
}
