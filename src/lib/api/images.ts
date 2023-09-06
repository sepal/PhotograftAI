import sharp from "sharp";
import { getReplicateClient } from "../replicate";
import { getXataClient } from "../xata";
import { getAppDomain } from "../url";

const defaultImageOptions = {
  // We increase the timeout, since replicate might have to load the model.
  signedUrlTimeout: 60 * 10,
};

export async function requestEmbeddings(imageId: string) {
  const xata = getXataClient();
  const replicate = getReplicateClient();

  // TODO: wait for xataio update and remove ignore.
  // @ts-ignore
  const fileRecord = await xata.db.Images.read(imageId, [
    "file.mediaType",
    "file.signedUrl",
  ]);
  const webHookUrl = `${getAppDomain()}/api/image/${imageId}/embeddings`;
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

  // Stable diffusion can handle images up to a certain size, so we resize the image here.
  const resizedImage = await sharp(imageData).resize(512, 512).toBuffer();

  const record = await xata.db.Images.create({
    file: {
      name: filename,
      mediaType: mimeType,
      base64Content: resizedImage.toString("base64"),
      ...defaultImageOptions,
    },
  });

  await requestEmbeddings(record.id);

  return record.id;
}
export async function createEmptyImage() {
  const xata = getXataClient();

  const image = await xata.db.Images.create({});

  return image;
}

export async function addImageData(imageId: string, blob: Blob) {
  const xata = getXataClient();

  const file = await blob
    .arrayBuffer()
    .then((buffer) => Buffer.from(buffer).toString("base64"));

  await xata.db.Images.update(imageId, {
    file: {
      name: "image.png",
      base64Content: file,
      mediaType: blob.type,
      ...defaultImageOptions,
    },
  });
}
