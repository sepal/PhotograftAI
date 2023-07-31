import * as protoLoader from "@grpc/proto-loader";
import * as grpc from "@grpc/grpc-js";
import * as path from "path";
import { ProtoGrpcType } from "@/proto/generated/generation";
import { DIFFUSION, ENGINE_ID, GRPC_ADDRESS, MAX_RANDOM_SEED } from "./constants";
import {randomUUID} from 'crypto';
import { ArtifactType } from "@/proto/generated/gooseai/ArtifactType";
import { Artifact } from "@/proto/generated/gooseai/Artifact";
import { Prompt } from "@/proto/generated/gooseai/Prompt";
import { Answer__Output } from "@/proto/generated/gooseai/Answer";

const PROTO_PATH = path.join(process.cwd(), "./stabilityai/generation.proto");

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: false,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

interface GenerateImageReturn {
	imageBuffer: Buffer;
	mimeType: string;
	prompt: string;
}

const pkg = grpc.loadPackageDefinition(
  packageDefinition
) as unknown as ProtoGrpcType;

function getServiceClient() {
  const callCredentials = grpc.credentials.createFromMetadataGenerator(
    (_, callback) => {
      const metadata = new grpc.Metadata();
      metadata.add(
        "authorization",
        `Bearer ${process.env.STABILITYAI_API_KEY}`
      );
      callback(null, metadata);
    }
  );

  const channelCredentials = grpc.credentials.combineChannelCredentials(
    grpc.credentials.createSsl(),
    callCredentials
  );

  return new pkg.gooseai.GenerationService(GRPC_ADDRESS, channelCredentials);
}


export function createInitImage(image: Uint8Array) {
  const artifact: Artifact = {
    type: ArtifactType.ARTIFACT_IMAGE,
    binary: image
  }

  const prompt: Prompt = {
    artifact: artifact
  }

  return prompt;
}


export function createImageMask(mask: Uint8Array) {
  const artifact: Artifact = {
    type: ArtifactType.ARTIFACT_MASK,
    binary: mask
  }

  const prompt: Prompt = {
    artifact: artifact
  }

  return prompt;
}


export function generateInpaintingMask(prompt: string, image: Uint8Array, mask: Uint8Array) {
  const serviceClient = getServiceClient();

  const imagePrompt = createInitImage(image);
  const maskPrompt = createImageMask(mask);

  const stream = serviceClient.generate({
    engineId: ENGINE_ID,
    requestId: randomUUID(),
    prompt: [{text: prompt}, imagePrompt, maskPrompt],
    image: {
      width: 1024,
      height: 1024,
      steps: 30,
      seed: [Math.floor(Math.random() * MAX_RANDOM_SEED)],
      transform: {diffusion: DIFFUSION},
      samples: 1,
    }
  })

  return new Promise<GenerateImageReturn>((resolve, reject) => {
    stream.on('data', (response: Answer__Output) => {
			for (const artifact of response.artifacts) {
				if (artifact.type === 'ARTIFACT_IMAGE' && artifact.data === 'binary') {
					return resolve({
						prompt,
						imageBuffer: artifact.binary!,
						mimeType: artifact.mime,
					});
				}

				if (artifact.text) {
					return reject(`${artifact.finishReason}: ${artifact.text}`);
				}
			}
		});

		stream.on('error', (err) => reject(err));
  });

}