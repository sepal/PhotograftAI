from concurrent import futures
import io
from database import Files
from mask_predictor import MaskPredictor
import grpc
import photograft_pb2_grpc as pb2_grpc
import photograft_pb2 as pb2
import json

from photograft_pb2 import MaskResponse

from dotenv import load_dotenv
load_dotenv()


class PhotograftService(pb2_grpc.PhotograftServiceServicer):
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

        return MaskResponse(masks=ids)


def serve():
    print("Starting server...")
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    pb2_grpc.add_PhotograftServiceServicer_to_server(
        PhotograftService(), server)
    server.add_insecure_port('[::]:50051')
    server.start()
    print("Server started at port 50051")
    server.wait_for_termination()


if __name__ == "__main__":
    serve()
