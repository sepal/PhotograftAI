from PIL import Image
import torch
from transformers import SamModel, SamProcessor
import numpy as np
import io


class MaskPredictor:
    __model = None
    __device = None
    __processor = None

    def __init__(self, device=None):
        if device is None:
            self.__device = torch.device(
                'cuda' if torch.cuda.is_available() else 'cpu')
        else:
            self.__device = device
        self.__processor = SamProcessor.from_pretrained(
            "facebook/sam-vit-huge")
        self.__model = SamModel.from_pretrained(
            "facebook/sam-vit-huge").to(self.__device)

    def predict(self, image, embeddings, points):
        inputs = self.__processor(
            images=image, input_points=points, return_tensors="pt").to(self.__device)
        inputs.pop("pixel_values", None)
        inputs.update({"image_embeddings": embeddings.to(self.__device)})
        with torch.no_grad():
            outputs = self.__model(**inputs)
        masks = self.__processor.image_processor.post_process_masks(outputs.pred_masks.cpu(
        ), inputs["original_sizes"].cpu(), inputs["reshaped_input_sizes"].cpu())
        scores = outputs.iou_scores

        return MaskPredictor.__prep_masks_response(masks[0], scores)

    @staticmethod
    def __prep_masks_response(masks, scores):
        if len(masks.shape) == 4:
            masks = masks.squeeze()
        if scores.shape[0] == 1:
            scores = scores.squeeze()
        resp = []
        for i, (mask, score) in enumerate(zip(masks, scores)):
            h, w = mask.shape[-2:]
            mask = mask.cpu().numpy()
            mask_array = (mask * 255).astype(np.uint8)

            raw_image = Image.fromarray(mask_array)

            buffer = io.BytesIO()
            raw_image.save(buffer, format="PNG")
            raw_image.save(f"mask_{i}.png", format="PNG")

            resp.append({
                "mask": buffer,
                "score": score.tolist(),
            })
        return resp
