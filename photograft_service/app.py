from concurrent import futures
import io
from database import Files
from mask_predictor import MaskPredictor
import grpc
import mask_service.mask_pb2_grpc as pb2_grpc
import mask_service.mask_pb2 as pb2
import json

from mask_service.mask_pb2 import GetMaskResponse

from dotenv import load_dotenv
load_dotenv()


class MaskService(pb2_grpc.MaskServiceServicer):
    def __init__(self):
        self.predictor = MaskPredictor("cpu")
        self.files = Files()

    def GetMask(self, request, context):
        points = json.loads(request.points)
        imageId = request.image

        image = self.files.getImage(imageId)
        embeddings = self.files.getEmbeddings(imageId)

        masks = self.predictor.predict(image, embeddings, points)

        ids = []
        for mask in masks:
            resp = self.files.createMask(
                imageId, mask['score'], points, mask['mask'])
            record = resp.json()
            ids.append(record['id'])

        return GetMaskResponse(masks=ids)


def serve():
    print("Starting server...")
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    pb2_grpc.add_MaskServiceServicer_to_server(MaskService(), server)
    server.add_insecure_port('[::]:50051')
    server.start()
    print("Server started at port 50051")
    server.wait_for_termination()


if __name__ == "__main__":
    serve()
