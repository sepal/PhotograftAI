import { createErrorMessage } from "@/lib/api/errors";
import { getXataClient } from "@/lib/xata";
import { NextResponse } from "next/server";

interface Params {
  params: { maskId: string };
}

export async function GET(req: Request, { params }: Params) {
  const { maskId } = params;

  if (!maskId) {
    return createErrorMessage("Bad request, mask id missing", 400);
  }

  const xata = getXataClient();

  // TODO: remove ts ignore once fixed in signedUrl bug fixed in xata.
  // @ts-ignore
  const record = await xata.db.Masks.read(maskId, [
    "file.name",
    "file.signedUrl",
    "file.mediaType",
  ]);

  if (!record?.file?.signedUrl) {
    return createErrorMessage("Image not found", 404);
  }

  const { signedUrl } = record.file.transform({
    blur: 1.5,
  });

  if (!signedUrl) {
    return createErrorMessage("File not found", 404);
  }

  const response = await fetch(signedUrl);

  if (!response.body) {
    return createErrorMessage("File not found", 404);
  }

  return new NextResponse(response.body);
}
