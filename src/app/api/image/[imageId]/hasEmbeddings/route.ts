import { createErrorMessage } from "@/lib/api/errors";
import { getXataClient } from "@/lib/xata";
import { NextResponse } from "next/server";

type Params = {
  params: { imageId: string };
};

export async function POST(req: Request, { params }: Params) {
  const { imageId: id } = params;
  console.log("Checking embeddings for", id);

  const xata = getXataClient();
  const record = await xata.db.Images.read(id, ["embeddings"]);
  if (!record) {
    return createErrorMessage("Image not found", 404);
  }

  if (!record.embeddings) {
    return NextResponse.json({
      has: false,
    });
  }

  return NextResponse.json({
    has: true,
  });
}
