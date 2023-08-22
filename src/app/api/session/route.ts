import { SessionState, createSession, setSessionState } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";

export interface CreateSessionBody {
  imageId: string;
}

export async function POST(req: NextRequest) {
  const { imageId } = (await req.json()) as CreateSessionBody;

  if (!imageId) {
    return NextResponse.json(
      {
        error: "No image id passed",
      },
      {
        status: 400,
      }
    );
  }

  const session = createSession(imageId);

  return NextResponse.json(session);
}
