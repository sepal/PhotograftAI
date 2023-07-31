import base64
import io
import json
from xata import XataClient
from PIL import Image
import zipfile
import torch
import os

from mask_predictor import MaskPredictor


class Files:
    def __init__(self):
        database = "PhotograftAI"
        branchName = os.getenv("XATA_BRANCH")
        region = "eu-central-1"
        xataURL = f"https://Sebastian-s-workspace-u593rk.{region}.xata.sh/db/{database}:{branchName}"
        self.__xata = XataClient(db_url=xataURL)

    def getImage(self, recordId):
        resp = self.__xata.files().get("Images", recordId, "file")
        return Image.open(io.BytesIO(resp.content)).convert("RGB")

    def getEmbeddings(self, recordId):
        resp = self.__xata.files().get("Images", recordId, "embeddings")
        zip_buffer = io.BytesIO(resp.content)

        with zipfile.ZipFile(zip_buffer, 'r') as zip_file:
            with zip_file.open('tensor.pth') as tensor_file:
                return torch.load(tensor_file)

    def createMask(self, imageId, score, points, mask):
        content = base64.b64encode(mask.getvalue()).decode()
        record = self.__xata.records().insertRecord("Masks", {
            "points": json.dumps(points),
            "score": score,
            "image": imageId,
            "file": {
                "name": "mask.png",
                "mediaType": "image/png",
                "base64Content": content,
            },
        })
        return record
