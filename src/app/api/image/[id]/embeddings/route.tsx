import { getXataClient } from "@/lib/xata";
import { NextResponse } from "next/server";
import JSZip from "jszip";

type Params = {
  params: { id: string };
};

export async function GET(req: Request, { params }: Params) {
  const { id } = params;
  console.log("Receiving embeddings for", id);

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
