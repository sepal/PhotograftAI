import { createEmptyImage } from "@/lib/api/images";
import { inpaint } from "@/lib/sdxl/inpaint";
import { getAppDomain } from "@/lib/url";
import { getXataClient } from "@/lib/xata";
import { NextRequest, NextResponse } from "next/server";

interface MaskInpaintBody {
  prompt: string;
  maskId: string;
}

export async function POST(req: NextRequest) {
  const { prompt, maskId } = (await req.json()) as MaskInpaintBody;

  const image = await createEmptyImage();

  const webHookUrl = `${getAppDomain()}/api/image/${image.id}`;
  await inpaint(prompt, maskId, webHookUrl);

  return NextResponse.json({
    success: true,
    imageId: image.id,
  });
}
