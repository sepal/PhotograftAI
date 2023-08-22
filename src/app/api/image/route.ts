import { createImage } from "@/lib/api";
import { getReplicateClient } from "@/lib/replicate";
import { getAppDomain } from "@/lib/url";
import { getXataClient } from "@/lib/xata";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const xata = getXataClient();
  const replicate = getReplicateClient();

  const data = await req.formData();

  const images = [];
  for (const [key, value] of Array.from(data.entries())) {
    const isFile = typeof value == "object";
    if (isFile) {
      const blob = value as Blob;

      const filename = blob.name;
      const mimeType = blob.type;
      const imageData = await blob
        .arrayBuffer()
        .then((buffer) => Buffer.from(buffer));

      const imageId = await createImage(filename, mimeType, imageData);

      images.push(imageId);
    }
  }

  return NextResponse.json({
    success: true,
    images,
  });
}
