import { ImagesRecord, getXataClient } from "../xata";

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

