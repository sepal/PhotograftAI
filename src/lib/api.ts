import sharp from "sharp";
import { getReplicateClient } from "./replicate";
import { getAppDomain } from "./url";
import { getXataClient } from "./xata";

export async function createImage(
  filename: string,
  mimeType: string,
  imageData: Buffer,
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

  const fileRecord = await xata.db.Images.read(record.id, [
    "file.mediaType",
    "file.signedUrl",
  ]);

  const webHookUrl = `${getAppDomain()}/api/image/${record.id}/embedding`;
  const imageUrl = fileRecord!.file!.signedUrl;

  console.log("Creating embeddings");
  await replicate.predictions.create({
    version: "6169e3d14e9d16d2efd9caf122c94cc4aa916ccef7ae2f85afc930a874beffd9",
    input: {
      image: imageUrl,
    },
    webhook: webHookUrl,
    webhook_events_filter: ["completed"],
  });

  return record.id;
}
