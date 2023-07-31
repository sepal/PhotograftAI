import { MaskServiceClient } from "@/lib/grpc-services";
import { getXataClient } from "@/lib/xata";
import { NextRequest, NextResponse } from "next/server";

type Params = {
  params: { id: string };
};

export async function POST(req: Request, { params }: Params) {
  const { id } = params;
  const message = await req.json();
  console.log("Requesting mask for image", id, "for points ", message);

  const clientService = new MaskServiceClient();
  const { client, error } = await clientService.getClient(id, message);
  if (error) {
    return NextResponse.json({
      status: 500,
      body: { error: error.details },
    });
  }

  console.log(client);

  return NextResponse.json({
    status: 200,
    body: {
      maskIds: client!.masks,
    },
  });
}

export async function GET(req: NextRequest, { params }: Params) {
  const { id } = params;
  const searchParams = req.nextUrl.searchParams;
  const points = searchParams.get("points");
  const score = searchParams.get("score");
  const blur = searchParams.get("blur") || 0;

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
