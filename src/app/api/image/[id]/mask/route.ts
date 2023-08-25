import { getXataClient } from "@/lib/xata";
import { NextRequest, NextResponse } from "next/server";

type Params = {
  params: { id: string };
};

export async function POST(req: Request, { params }: Params) {
  const { id } = params;

  const data = await req.formData();

  const blob = data.get("image") as Blob;

  const xata = getXataClient();
  const imageData = await blob
    .arrayBuffer()
    .then((buffer) => Buffer.from(buffer));

  const record = await xata.db.Masks.create({
    image: id,
    file: {
      name: "mask.png",
      base64Content: imageData.toString("base64"),
      mediaType: "image/png",
    },
  });

  return NextResponse.json({
    maskId: record.id,
  });
}

export async function GET(req: NextRequest, { params }: Params) {
  console.log("mask");
  const { id } = params;
  const searchParams = req.nextUrl.searchParams;
  const points = searchParams.get("points");

  const xata = getXataClient();

  let filters: any = {
    image: id,
  };

  if (points) {
    filters["points"] = points;
  }

  const records = await xata.db.Masks.filter(filters)
    .sort("xata.createdAt", "desc")
    .select(["id", "score"])
    .getAll();

  const result = records.map((record) => {
    const imageUrl = `/api/mask/${record.id}`;

    return {
      id: record.id,
      score: record.score,
      imageUrl: imageUrl,
    };
  });

  return NextResponse.json({
    status: 200,
    body: result,
  });
}
