import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import { ProtoGrpcType } from "@/proto/generated/mask";
import path from "path";

const PROTO_PATH = path.join(process.cwd(), "./mask_service/mask.proto");

// suggested options for similarity to loading grpc.load behavior
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  defaults: true,
  oneofs: true,
});

const clientService = (
  grpc.loadPackageDefinition(packageDefinition) as unknown as ProtoGrpcType
).photograftai;

export const { MaskService } = clientService;
