import { requestEmbeddings } from "@/lib/api/images";
import { getXataClient } from "@/lib/xata";
import { NextRequest, NextResponse } from "next/server";
import Replicate from "replicate";

type Params = {
  params: { id: string };
};

export async function GET(req: Request, { params }: Params) {
  const { id } = params;

  if (!id) {
    return new NextResponse(null, { status: 400, statusText: "Bad Request" });
  }

  const xata = getXataClient();

  const record = await xata.db.Images.read(id, [
    "file.name",
    "file.signedUrl",
    "file.mediaType",
  ]);

  if (!record?.file?.signedUrl) {
    return new NextResponse(null, { status: 404, statusText: "Not Found" });
  }

  const response = await fetch(record.file.signedUrl);

  if (!response.body) {
    return new NextResponse(null, { status: 404, statusText: "Not Found" });
  }

  return new NextResponse(response.body);
}

/**
 * Replicate webhook to add image data to a image record.
 */
export async function POST(req: NextRequest, { params }: Params) {
  const { id } = params;
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
  const record = await xata.db.Images.read(id);

  if (!record) {
    console.error(
      "Could not find image record " + id + " for masked inpainting."
    );
    return NextResponse.json(
      {
        success: false,
      },
      { status: 500 }
    );
  }

  const fileResp = await fetch(output);

  const blob = await fileResp.blob();

  const file = await blob
    .arrayBuffer()
    .then((buffer) => Buffer.from(buffer).toString("base64"));

  await xata.db.Images.update(id, {
    file: {
      name: "image.png",
      base64Content: file,
      mediaType: blob.type,
    },
  });

  await requestEmbeddings(id);

  return NextResponse.json({
    success: true,
  });
}
