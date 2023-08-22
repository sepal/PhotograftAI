import { SessionState, getSession, setSessionState } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";

type Params = {
  params: { sessionId: string };
};

export interface UpdateSessionBody {
  state: SessionState;
  maskId?: string;
}

export async function PUT(req: NextRequest, { params }: Params) {
  const { sessionId } = params;
  const { state, maskId } = (await req.json()) as UpdateSessionBody;

  try {
    const session = await setSessionState(sessionId, state, { maskId });

    if (!session) {
      return NextResponse.json(
        {
          error: "Session not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(session);
  } catch (error) {
    return NextResponse.json(
      {
        error: "Couldn't update session due to " + error,
      },
      {
        status: 404,
      }
    );
  }
}

export async function GET(req: Request, { params }: Params) {
  const { sessionId } = params;

  const session = getSession(sessionId);

  if (!session) {
    return NextResponse.json(
      {
        error: "Session not found",
      },
      {
        status: 404,
      }
    );
  }

  return NextResponse.json(session);
}
