import { getXataClient } from "@/lib/xata";
import { NextResponse } from "next/server";

type Params = {
  params: { id: string };
};

/**
 * Endpoint to check if an image has a image data.
 * Mainly used for generated images.
 */
export async function POST(req: Request, { params }: Params) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  const xata = getXataClient();
  const image = await xata.db.Images.read(id, ["file.name"]);

  if (!image) {
    return NextResponse.json({ error: "Image not found" }, { status: 404 });
  }

  const imageName = image.file?.name;
  if (!imageName) {
    return NextResponse.json({ has: false });
  }
  return NextResponse.json({ has: true });
}
