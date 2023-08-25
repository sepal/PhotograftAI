import { createErrorMessage } from "@/lib/api/errors";
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
    return createErrorMessage("Bad request, id missing", 400);
  }

  const xata = getXataClient();
  const image = await xata.db.Images.read(id, ["file.name"]);

  if (!image) {
    return createErrorMessage("Image not found", 404);
  }

  const imageName = image.file?.name;
  if (!imageName) {
    return NextResponse.json({ has: false });
  }
  return NextResponse.json({ has: true });
}
