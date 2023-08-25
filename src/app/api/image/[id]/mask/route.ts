import { getXataClient } from "@/lib/xata";
import { NextRequest, NextResponse } from "next/server";

type Params = {
  params: { id: string };
};

export async function POST(req: Request, { params }: Params) {
  const { id } = params;

  const data = await req.formData();

  const blob = data.get("image") as Blob;

  const xata = getXataClient();
  const imageData = await blob
    .arrayBuffer()
    .then((buffer) => Buffer.from(buffer));

  const record = await xata.db.Masks.create({
    image: id,
    file: {
      name: "mask.png",
      base64Content: imageData.toString("base64"),
      mediaType: "image/png",
    },
  });

  return NextResponse.json({
    maskId: record.id,
  });
}
