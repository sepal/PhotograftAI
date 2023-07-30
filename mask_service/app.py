from concurrent import futures
from database import Files
from mask_predictor import MaskPredictor
import grpc
import mask_service.mask_pb2_grpc as pb2_grpc
import mask_service.mask_pb2 as pb2

from dotenv import load_dotenv
load_dotenv()

# files = Files()
# image = files.getImage("rec_cj2plqls37a65hlj4440")
# embeddings = files.getEmbeddings("rec_cj2plqls37a65hlj4440")

# predictor = MaskPredictor("cpu")
# points = [[[170, 50]]]


# masks = predictor.predict(image, embeddings, points)

# print(masks[0]['score'])


class MaskService(pb2_grpc.MaskServiceServicer):
    def __init__(self):
        self.predictor = MaskPredictor("cpu")
        self.files = Files()

    def GetServerResponse(self, request, context):
        message = request.message

        points = message.points

        image = self.files.getImage(message.image_id)
        embeddings = self.files.getEmbeddings(message.image_id)

        masks = self.predictor.predict(image, embeddings, points)

        return pb2.MaskResponse(masks=masks)


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
