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
    "file.base64Content",
    "file.mediaType",
  ]);

  if (!record) {
    return new NextResponse(null, { status: 404, statusText: "Not Found" });
  }

  if (!record.file?.base64Content) {
    return new NextResponse(null, { status: 404, statusText: "Not Found" });
  }

  const buffer = Buffer.from(record.file.base64Content, "base64");

  return new NextResponse(buffer, {
    headers: {
      "Content-Type": record.file.mediaType,
      "Content-Disposition": `inline; filename="${record.file.name}"`,
    },
  });
}
