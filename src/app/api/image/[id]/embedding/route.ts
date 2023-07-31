import { getReplicateClient } from "@/lib/replicate";
import { getXataClient } from "@/lib/xata";
import { NextResponse } from "next/server";
import * as path from "path";

type Params = {
  params: { id: string };
};

export async function POST(req: Request, { params }: Params) {
  const { id } = params;
  console.log("Receiving embeddings for", id);

  const resp = await req.json();

  if (resp.status != "succeeded") {
    console.log("Failed prediction");
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

  const body = req.body;

  const fileResp = await fetch(output);

  const file = await fileResp
    .arrayBuffer()
    .then((buffer) => Buffer.from(buffer).toString("base64"));

  const xata = getXataClient();
  const record = await xata.db.Images.read(id, ["file.name"]);

  let parsedPath = path.parse(record!.file!.name!);
  let newFileName = `${parsedPath.name}.zip`;

  console.log(`"${id}"`);
  await xata.db.Images.update(id, {
    embeddings: {
      base64Content: file,
      name: newFileName,
      mediaType: "application/zip",
    },
  });

  return NextResponse.json({
    success: true,
  });
}

export async function GET(req: Request, { params }: Params) {
  const { id } = params;
  console.log("Checking embeddings for", id);

  const xata = getXataClient();
  const record = await xata.db.Images.read(id, ["embeddings"]);
  if (!record) {
    return NextResponse.json(
      {
        error: "Image not found",
      },
      {
        status: 404,
      }
    );
  }

  if (!record.embeddings) {
    return NextResponse.json(
      {
        error: "No embeddings found",
      },
      {
        status: 404,
      }
    );
  }

  return NextResponse.json({
    success: true,
  });
}
