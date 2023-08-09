import { getXataClient } from "@/lib/xata";
import { NextResponse } from "next/server";

type Params = {
  params: { id: string };
};

export async function GET(req: Request, { params }: Params) {
  const { id } = params;
  console.log("Receiving embeddings for", id);

  const xata = getXataClient();

  const file = await xata.files.download({
    table: "Images",
    column: "embeddings",
    record: id,
  });

  const headers = new Headers();
  headers.set("Content-Type", file.type);

  console.log(file);

  return new NextResponse(file, {
    status: 200,
    statusText: "OK",
    headers,
  });
}
