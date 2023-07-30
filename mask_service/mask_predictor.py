from tkinter import Image
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
        inputs.update({"image_embeddings": embeddings})
        with torch.no_grad():
            outputs = self.__model(**inputs)
        masks = self.__processor.image_processor.post_process_masks(outputs.pred_masks.cpu(
        ), inputs["original_sizes"].cpu(), inputs["reshaped_input_sizes"].cpu())
        scores = outputs.iou_scores

        resp = []
        # for i, (mask, score) in enumerate(zip(masks[0], scores)):
        #     mask = mask.cpu().detach()
        #     h, w = mask.shape[-2:]
        #     resp.append({
        #         "mask": mask.reshape(h, w, 1),
        #         "score": score
        #     })

        return MaskPredictor.__prep_masks_response(masks[0], scores)

    @staticmethod
    def __prep_masks_response(masks, scores):
        if len(masks.shape) == 4:
            masks = masks.squeeze()
        if scores.shape[0] == 1:
            scores = scores.squeeze()
        color = np.array([1.0, 1.0, 1.0, 1])
        resp = []
        for i, (mask, score) in enumerate(zip(masks, scores)):
            mask = mask.cpu().detach()
            h, w = mask.shape[-2:]
            mask_image = mask.reshape(h, w, 1) * color.reshape(1, 1, -1)

            resp.append({
                "mask": mask_image.tolist(),
                "score": score
            })
        return resp
