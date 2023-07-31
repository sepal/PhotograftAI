import { generateInpaintingMask } from "@/lib/stabilityAI";
import { getAppDomain } from "@/lib/url";
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
    "image.file.base64Content",
    "file.base64Content"
  ]);

  const imageContent = record?.image?.file?.base64Content;
  const maskContent = record?.file?.base64Content;

  if (!imageContent || !maskContent) {
    return NextResponse.json({
      success: false,
      message: "Image or mask not found"
    }, { status: 404 });
  }

  const imageBuffer = Buffer.from(imageContent, "base64");
  const mask = Buffer.from(maskContent, "base64");

  const invertedMask = await sharp(mask).negate().toBuffer();

  const generated = await generateInpaintingMask(prompt, imageBuffer, invertedMask);

  const filename = prompt.replace(/\s/g, "-").toLowerCase() + ".png"
  
  const generatedRecord = await xata.db.Images.create({
    file: {
      base64Content: generated.imageBuffer.toString("base64"),
      mediaType: generated.mimeType,
      name: filename,
    },
  });

  return NextResponse.json({
    success: true,
    image: generatedRecord.id
  });

}