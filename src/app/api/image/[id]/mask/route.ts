import { MaskServiceClient } from "@/lib/grpc-services";
import { NextResponse } from "next/server";

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
