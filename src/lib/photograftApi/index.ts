import { Tensor } from "onnxruntime-web";
import { imageToBlob, maskToImage } from "../imageData";
import { BaseClient } from "./BaseClient";

interface UploadMaskResp {
  maskId: string;
}

type MaskedInPaintingResp = {
  success: boolean;
  imageId: string;
};

type hasX = {
  has: boolean;
};

export class PhotograftClient extends BaseClient {
  constructor(host: string | undefined = undefined) {
    super(host);
  }

  async uploadMask(imageId: string, mask: Tensor) {
    // For the mask, for replicate, we need to generate an image with white being the masked portion.
    const image = await maskToImage(mask, [255, 255, 255, 255], [0, 0, 0, 255]);

    const blob = await imageToBlob(image);

    const formData = new FormData();
    formData.append("image", blob, "mask.png");
    console.log(formData);
    const resp = await this.post<UploadMaskResp>(
      `/api/image/${imageId}/mask`,
      formData
    );

    return resp.maskId;
  }

  async maskedInPainting(
    imageId: string,
    prompt: string,
    mask: Tensor,
    style: string
  ) {
    const maskId = await this.uploadMask(imageId, mask);

    const resp = await this.post<MaskedInPaintingResp>(`/api/mask-inpaint`, {
      prompt,
      maskId,
      style,
    });

    return resp.imageId;
  }

  async hasEmbeddings(imageId: string) {
    const resp = await this.post<hasX>(`/api/image/${imageId}/hasEmbeddings`);
    return resp.has;
  }

  async hasImage(imageId: string) {
    const resp = await this.post<hasX>(`/api/image/${imageId}/hasImage`);
    return resp.has;
  }
}

let client: PhotograftClient | null = null;

export function getPhotograftClient() {
  if (client) return client;

  client = new PhotograftClient();
  return client;
}
