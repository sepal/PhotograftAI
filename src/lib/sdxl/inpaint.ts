import { getReplicateClient } from "../replicate";
import { getXataClient } from "../xata";

const positive = (prompt: string) =>
  `"cinematic photo ${prompt} . 35mm photograph, film, bokeh, professional, 4k, highly detailed"`;

const negative =
  "drawing, painting, crayon, sketch, graphite, impressionist, noisy, blurry, soft, deformed, ugly";

const defaultSettings = {
  num_inference_steps: 30,
  guidance_scale: 20,
  prompt_strength: 0.9,
};

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
    version: "aca001c8b137114d5e594c68f7084ae6d82f364758aab8d997b233e8ef3c4d93",
    input: {
      prompt: positive(prompt),
      negative_prompt: negative,
      image: mask.image?.file?.signedUrl,
      mask: mask.file.signedUrl,
      ...defaultSettings,
    },
    webhook: webhook,
    webhook_events_filter: ["completed"],
  });

  return prediction;
}
