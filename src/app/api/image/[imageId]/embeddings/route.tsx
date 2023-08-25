import { getXataClient } from "@/lib/xata";
import { NextResponse } from "next/server";
import JSZip from "jszip";
import { createErrorMessage } from "@/lib/api/errors";
import * as path from "path";

type Params = {
  params: { imageId: string };
};

/**
 * Webhook for replicate to push the embeddings.
 */
export async function POST(req: Request, { params }: Params) {
  const { imageId: id } = params;
  console.log("Receiving embeddings for", id);

  const resp = await req.json();

  if (resp.status != "succeeded") {
    console.error("Failed to receive embeddings for " + id);
    return createErrorMessage("Bad request", 400);
  }

  const { output } = resp;
  const fileResp = await fetch(output);

  const file = await fileResp
    .arrayBuffer()
    .then((buffer) => Buffer.from(buffer).toString("base64"));

  const xata = getXataClient();
  const record = await xata.db.Images.read(id, ["file.name"]);

  let parsedPath = path.parse(record!.file!.name!);
  let newFileName = `${parsedPath.name}.zip`;

  await xata.db.Images.update(id, {
    embeddings: {
      base64Content: file,
      name: newFileName,
      mediaType: "application/zip",
    },
  });

  return new Response(null);
}

/**
 * Endpoint to receive an image's embeddings.
 */
export async function GET(req: Request, { params }: Params) {
  const { imageId: id } = params;
  console.log("Retreiving embeddings for", id);

  const xata = getXataClient();

  const zipBlob = await xata.files.download({
    table: "Images",
    column: "embeddings",
    record: id,
  });

  console.log("getting buffer");
  const buffer = await zipBlob.arrayBuffer();
  console.log("loading zip");
  const zip = await JSZip.loadAsync(buffer);
  console.log("Loading tensorfile");
  const file = await zip.file("tensor.npy")!.async("nodebuffer");

  const headers = new Headers();
  headers.set("Content-Type", "application/octet-stream ");

  return new NextResponse(file, {
    status: 200,
    statusText: "OK",
    headers,
  });
}
