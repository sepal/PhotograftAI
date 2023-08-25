import { inpaint } from "@/lib/inpaint";
import { getAppDomain } from "@/lib/url";
import { getXataClient } from "@/lib/xata";
import { NextRequest, NextResponse } from "next/server";

interface MaskInpaintBody {
  prompt: string;
  maskId: string;
}

export async function POST(req: NextRequest) {
  const { prompt, maskId } = (await req.json()) as MaskInpaintBody;

  const xata = getXataClient();

  // const filename = prompt.replace(/\s/g, "-").toLowerCase() + ".png";
  const record = await xata.db.Images.create({});

  const webHookUrl = `${getAppDomain()}/api/image/${record.id}`;
  const resp = await inpaint(prompt, maskId, webHookUrl);

  return NextResponse.json({
    success: true,
    imageId: record.id,
  });
}
