import { MaskServiceClient } from "@/lib/grpc-services";
import { getXataClient } from "@/lib/xata";
import { NextRequest, NextResponse } from "next/server";

type Params = {
  params: { id: string };
};

export async function POST(req: Request, { params }: Params) {
  const { id } = params;
  const message = await req.json();

  const clientService = new MaskServiceClient();
  const { client, error } = await clientService.getClient(id, message);
  if (error) {
    return NextResponse.json({
      status: 500,
      body: { error: error.details },
    });
  }

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

  console.log(filters);

  const records = await xata.db.Masks.filter(filters)
    .sort("xata.createdAt", "desc")
    .select(["id", "score", "file", "file.signedUrl"])
    .getAll();

  console.log(
    records[0].file!.transform({
      blur: blur,
    })
  );

  const result = records.map((record) => {
    return {
      id: record.id,
      score: record.score,
      file: record.file!.transform({
        blur: blur,
      }),
    };
  });

  return NextResponse.json({
    status: 200,
    body: result,
  });
}
