# Generated by the gRPC Python protocol compiler plugin. DO NOT EDIT!
"""Client and server classes corresponding to protobuf-defined services."""
import grpc

from mask_service import mask_pb2 as mask__service_dot_mask__pb2


class MaskServiceStub(object):
    """Missing associated documentation comment in .proto file."""

    def __init__(self, channel):
        """Constructor.

        Args:
            channel: A grpc.Channel.
        """
        self.GetMask = channel.unary_unary(
                '/photograftai.MaskService/GetMask',
                request_serializer=mask__service_dot_mask__pb2.GetMaskRequest.SerializeToString,
                response_deserializer=mask__service_dot_mask__pb2.GetMaskResponse.FromString,
                )


class MaskServiceServicer(object):
    """Missing associated documentation comment in .proto file."""

    def GetMask(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')


def add_MaskServiceServicer_to_server(servicer, server):
    rpc_method_handlers = {
            'GetMask': grpc.unary_unary_rpc_method_handler(
                    servicer.GetMask,
                    request_deserializer=mask__service_dot_mask__pb2.GetMaskRequest.FromString,
                    response_serializer=mask__service_dot_mask__pb2.GetMaskResponse.SerializeToString,
            ),
    }
    generic_handler = grpc.method_handlers_generic_handler(
            'photograftai.MaskService', rpc_method_handlers)
    server.add_generic_rpc_handlers((generic_handler,))


 # This class is part of an EXPERIMENTAL API.
class MaskService(object):
    """Missing associated documentation comment in .proto file."""

    @staticmethod
    def GetMask(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/photograftai.MaskService/GetMask',
            mask__service_dot_mask__pb2.GetMaskRequest.SerializeToString,
            mask__service_dot_mask__pb2.GetMaskResponse.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)