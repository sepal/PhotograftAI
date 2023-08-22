import { imageToBlob } from "./imageData";

export async function uploadMask(imageId: string, imageMask: HTMLImageElement) {
  const blob = await imageToBlob(imageMask);

  const formData = new FormData();
  formData.append("image", blob, "mask.png");
  const response = await fetch(`/api/image/${imageId}/mask`, {
    method: "POST",
    body: formData,
  });

  const resp = await response.json();

  console.log(resp);
  return resp;
}
