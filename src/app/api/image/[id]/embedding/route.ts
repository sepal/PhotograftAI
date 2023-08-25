import { createErrorMessage } from "@/lib/api/errors";
import { getReplicateClient } from "@/lib/replicate";
import { getXataClient } from "@/lib/xata";
import { NextResponse } from "next/server";
import * as path from "path";

type Params = {
  params: { id: string };
};

/**
 * Webhook for replicate to push the embeddings.
 */
export async function POST(req: Request, { params }: Params) {
  const { id } = params;
  console.log("Receiving embeddings for", id);

  const resp = await req.json();

  if (resp.status != "succeeded") {
    console.error("Failed prediction");
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
