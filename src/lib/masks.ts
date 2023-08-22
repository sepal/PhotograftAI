import { Tensor } from "onnxruntime-web";
import { imageToBlob, maskToImage } from "./imageData";

export async function uploadMask(imageId: string, mask: Tensor) {
  // For the mask, for replicate, we need to generate an image with white being the masked portion.
  const image = maskToImage(mask, [255, 255, 255, 255], [0, 0, 0, 255]);

  return new Promise((resolve, reject) => {
    image.onload = async () => {
      const blob = await imageToBlob(image);

      const formData = new FormData();
      formData.append("image", blob, "mask.png");
      console.log(formData);
      const response = await fetch(`/api/image/${imageId}/mask`, {
        method: "POST",
        body: formData,
      });

      const resp = await response.json();
      console.log(resp);
      resolve(resp);
    };
  });
}