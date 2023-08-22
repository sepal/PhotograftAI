import sharp from "sharp";
import { getReplicateClient } from "./replicate";
import { getAppDomain } from "./url";
import { ImagesRecord, getXataClient } from "./xata";

export enum OperationType {
  MaskInpaint = "mask-inpaint",
}

export async function createOperation(
  prompt: string,
  imageId: string,
  maskIds: string[],
  operationType: OperationType
) {
  const xata = getXataClient();

  await xata.db.Operations.create({
    original: imageId,
    masks: JSON.stringify(maskIds),
    prompt,
    type: operationType.toString(),
  });
}

export async function requestEmbeddings(imageId: string) {
  const xata = getXataClient();
  const replicate = getReplicateClient();

  const fileRecord = await xata.db.Images.read(imageId, [
    "file.mediaType",
    "file.signedUrl",
  ]);
  const webHookUrl = `${getAppDomain()}/api/image/${imageId}/embedding`;
  const imageUrl = fileRecord!.file!.signedUrl;

  console.log("Creating embeddings");
  await replicate.predictions.create({
    version: "6a12283e7c189130111be096aa06f08ea95c3df2df71fb83c5fd80ba69d1649e",
    input: {
      image: imageUrl,
      as_npy: true,
    },
    webhook: webHookUrl,
    webhook_events_filter: ["completed"],
  });
}

export async function createImage(
  filename: string,
  mimeType: string,
  imageData: Buffer
) {
  console.log("Creating image");
  const xata = getXataClient();
  const replicate = getReplicateClient();

  // Stable diffusion can handle images up to a certain size, so we resize the image here.
  const resizedImage = await sharp(imageData).resize(512, 512).toBuffer();

  const record = await xata.db.Images.create({
    file: {
      name: filename,
      // We increase the timeout, since replicate might have to load the model.
      signedUrlTimeout: 60 * 10,
      mediaType: mimeType,
      base64Content: resizedImage.toString("base64"),
    },
  });

  await requestEmbeddings(record.id);

  return record.id;
}
