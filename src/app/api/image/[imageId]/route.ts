import { createErrorMessage } from "@/lib/api/errors";
import { addImageData, requestEmbeddings } from "@/lib/api/images";
import { getXataClient } from "@/lib/xata";
import { NextRequest, NextResponse } from "next/server";
import Replicate from "replicate";

type Params = {
  params: { imageId: string };
};

export async function GET(req: Request, { params }: Params) {
  const { imageId } = params;

  if (!imageId) {
    return createErrorMessage("Bad request, id missing", 400);
  }

  const xata = getXataClient();

  // @ts-ignore
  const record = await xata.db.Images.read(imageId, [
    "file.name",
    "file.signedUrl",
    "file.mediaType",
  ]);

  if (!record?.file?.signedUrl) {
    return createErrorMessage("Image not found", 404);
  }

  const response = await fetch(record.file.signedUrl);

  if (!response.body) {
    return createErrorMessage("Image file not found", 404);
  }

  return new NextResponse(response.body);
}

/**
 * Replicate webhook to add image data to a image record.
 */
export async function POST(req: NextRequest, { params }: Params) {
  const { imageId } = params;
  const resp = await req.json();

  if (resp.status != "succeeded") {
    console.error("Failed to generate masked inpaint image.");
    return NextResponse.json(
      {
        success: false,
        error: resp.error,
      },
      {
        status: 500,
      }
    );
  }
  const { output } = resp;

  const xata = await getXataClient();
  const record = await xata.db.Images.read(imageId);

  if (!record) {
    console.error(
      "Could not find image record " + imageId + " for masked inpainting."
    );
    return createErrorMessage("Image not found", 404);
  }

  const fileResp = await fetch(output);

  const blob = await fileResp.blob();

  await addImageData(imageId, blob);

  await requestEmbeddings(imageId);

  return NextResponse.json({
    success: true,
  });
}
