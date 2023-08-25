import { getXataClient } from "@/lib/xata";
import { NextResponse } from "next/server";

type Params = {
  params: { id: string };
};

export async function POST(req: Request, { params }: Params) {
  const { id } = params;
  console.log(id);
  console.log("Checking embeddings for", id);

  const xata = getXataClient();
  const record = await xata.db.Images.read(id, ["embeddings"]);
  console.log(record);
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
    return NextResponse.json({
      has: false,
    });
  }

  return NextResponse.json({
    has: true,
  });
}
