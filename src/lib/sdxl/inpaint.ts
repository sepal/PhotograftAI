import { getReplicateClient } from "../replicate";
import { getXataClient } from "../xata";

const positive = (prompt: string) =>
  `"cinematic photo ${prompt} . 35mm photograph, film, bokeh, professional, 4k, highly detailed"`;

const negative =
  "drawing, painting, crayon, sketch, graphite, impressionist, noisy, blurry, soft, deformed, ugly";

export async function inpaint(prompt: string, maskId: string, webhook: string) {
  const xata = getXataClient();
  const replicate = getReplicateClient();

  // @ts-ignore.
  const mask = await xata.db.Masks.readOrThrow(maskId, [
    "file.signedUrl",
    "image.file.signedUrl",
  ]);

  if (!mask.image?.file?.signedUrl) {
    throw new Error("Could not get image signed URL");
  }

  if (!mask.file?.signedUrl) {
    throw new Error("Could not get mask signed URL");
  }

  const prediction = await replicate.predictions.create({
    version: "d830ba5dabf8090ec0db6c10fc862c6eb1c929e1a194a5411852d25fd954ac82",
    input: {
      prompt: positive(prompt),
      negative_prompt: negative,
      image: mask.image?.file?.signedUrl,
      mask: mask.file.signedUrl,
      width: 512,
      height: 512,
      schedular: "KarrasDPM",
      refiner: "expert_ensemble_refiner",
    },
    webhook: webhook,
    webhook_events_filter: ["completed"],
  });

  return prediction;
}
