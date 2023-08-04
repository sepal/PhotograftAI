import { getXataClient } from "@/lib/xata";
import { NextResponse } from "next/server";

interface Params {
  params: { maskId: string };
}

export async function GET(req: Request, { params }: Params) {
  const { maskId } = params;

  if (!maskId) {
    return new NextResponse(null, { status: 400, statusText: "Bad Request" });
  }

  const xata = getXataClient();

  const record = await xata.db.Masks.read(maskId, [
    "file.name",
    "file.signedUrl",
    "file.mediaType",
  ]);


  if (!record?.file?.signedUrl) {
    return new NextResponse(null, { status: 404, statusText: "Not Found" });
  }

  const { signedUrl } = record.file.transform({
    blur: 1.5
  });

  if (!signedUrl) {
    return new NextResponse(null, { status: 404, statusText: "Not Found" });
  }

  const response = await fetch(signedUrl);

  if (!response.body) {
    return new NextResponse(null, { status: 404, statusText: "Not Found" });
  }

  return new NextResponse(response.body)
}
