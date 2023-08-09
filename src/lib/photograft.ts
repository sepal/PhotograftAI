import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import { ProtoGrpcType } from "@/proto/generated/photograft";
import path from "path";
import { promisify } from "util";

const PROTO_PATH = path.join(process.cwd(), "photograft.proto");

// suggested options for similarity to loading grpc.load behavior
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  defaults: true,
  oneofs: true,
});

const pkg = grpc.loadPackageDefinition(
  packageDefinition
) as unknown as ProtoGrpcType;

function getServiceClient() {
  const address = "localhost:50051";
  return new pkg.photograftai.PhotograftService(
    address,
    grpc.credentials.createInsecure()
  );
}

const target = "localhost:50051";

export const getMask = async (image: string, pointArray: number[][]) => {
  const points = Buffer.from(JSON.stringify(pointArray));
  const getMask = promisify(getServiceClient().getMask).bind(this);

  return await getMask({ image, points })
    .then((client) => ({ client, error: null }))
    .catch((error) => ({ error, client: null }));
};
