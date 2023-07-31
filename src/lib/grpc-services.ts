import { promisify } from "util";
import { MaskService } from "./grpc-client";
import * as grpc from "@grpc/grpc-js";

const target = "localhost:50051";

export class MaskServiceClient extends MaskService {
  constructor() {
    super(target, grpc.credentials.createInsecure());
  }

  public async getClient(image: string, pointArray: number[][]) {
    const points = Buffer.from(JSON.stringify(pointArray));
    const clientInfo = promisify(this.GetMask).bind(this);
    return await clientInfo({ image, points })
      .then((client) => ({ client, error: null }))
      .catch((error) => ({ error, client: null }));
  }
}
