import Replicate from "replicate";

let instance: Replicate | undefined = undefined;

export function getReplicateClient() {
  if (instance) return instance;

  if (!process.env.REPLICATE_API_TOKEN) {
    throw new Error("REPLICATE_API_TOKEN is not defined");
  }

  instance = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
  });

  return instance;
}
