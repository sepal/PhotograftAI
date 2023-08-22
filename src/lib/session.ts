import { getXataClient } from "./xata";

export enum SessionState {
  EDITING = "editing",
  GENERATE_IMAGE = "generate_image",
  GENERATE_EMBEDDINGS = "generate_embeddings",
  IDLE = "idle",
}

export async function createSession(imageId: string) {
  const xata = getXataClient();

  const session = await xata.db.Sessions.create({
    originalImage: imageId,
    state: SessionState.EDITING,
  });

  return session;
}

export async function setSessionState(
  sessionId: string,
  state: SessionState,
  {
    maskId,
  }: {
    maskId?: string;
  }
) {
  const xata = getXataClient();

  let body: any = {
    state,
  };

  if (state == SessionState.GENERATE_IMAGE) {
    if (!maskId) {
      throw new Error("Cant set session to GENERATE_IMAGE without a mask id");
    }

    body = {
      ...body,
      mask: maskId,
    };
  }

  const session = await xata.db.Sessions.update(sessionId, body);

  return session;
}

export async function getSession(sessionId: string) {
  const xata = getXataClient();

  const session = await xata.db.Sessions.read(sessionId);

  return session;
}
