import { OperationType, createImage, createOperation } from "@/lib/api";
import { generateInpaintingMask } from "@/lib/stabilityAI";
import { getXataClient } from "@/lib/xata";
import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";

interface MaskInpaintBody {
  prompt: string;
  maskId: string;
}

export async function POST(req: NextRequest) {
  const { prompt, maskId } = (await req.json()) as MaskInpaintBody;

  const xata = await getXataClient();
  const record = await xata.db.Masks.read(maskId, [
    "image.id",
    "image.file.base64Content",
    "file.base64Content",
  ]);

  const imageContent = record?.image?.file?.base64Content;
  const maskContent = record?.file?.base64Content;

  if (!imageContent || !maskContent) {
    return NextResponse.json(
      {
        success: false,
        message: "Image or mask not found",
      },
      { status: 404 }
    );
  }

  const imageBuffer = Buffer.from(imageContent, "base64");
  const mask = Buffer.from(maskContent, "base64");

  const generated = await generateInpaintingMask(prompt, imageBuffer, mask);

  // We take the prompt and turn it into a filename.
  const filename = prompt.replace(/\s/g, "-").toLowerCase() + ".png";

  const imageId = await createImage(
    filename,
    generated.mimeType,
    generated.imageBuffer
  );
  await createOperation(prompt, imageId, [maskId], OperationType.MaskInpaint);

  return NextResponse.json({
    success: true,
    image: imageId,
  });
}
