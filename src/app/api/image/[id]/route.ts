import { getReplicateClient } from "@/lib/replicate";
import { getAppDomain } from "@/lib/url";
import { getXataClient } from "@/lib/xata";
import { NextResponse } from "next/server";
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

  return new NextResponse(response.body)
}
