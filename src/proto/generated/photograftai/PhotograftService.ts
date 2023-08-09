// Original file: photograft.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { MaskRequest as _photograftai_MaskRequest, MaskRequest__Output as _photograftai_MaskRequest__Output } from '../photograftai/MaskRequest';
import type { MaskResponse as _photograftai_MaskResponse, MaskResponse__Output as _photograftai_MaskResponse__Output } from '../photograftai/MaskResponse';

export interface PhotograftServiceClient extends grpc.Client {
  GetMask(argument: _photograftai_MaskRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_photograftai_MaskResponse__Output>): grpc.ClientUnaryCall;
  GetMask(argument: _photograftai_MaskRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_photograftai_MaskResponse__Output>): grpc.ClientUnaryCall;
  GetMask(argument: _photograftai_MaskRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_photograftai_MaskResponse__Output>): grpc.ClientUnaryCall;
  GetMask(argument: _photograftai_MaskRequest, callback: grpc.requestCallback<_photograftai_MaskResponse__Output>): grpc.ClientUnaryCall;
  getMask(argument: _photograftai_MaskRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_photograftai_MaskResponse__Output>): grpc.ClientUnaryCall;
  getMask(argument: _photograftai_MaskRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_photograftai_MaskResponse__Output>): grpc.ClientUnaryCall;
  getMask(argument: _photograftai_MaskRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_photograftai_MaskResponse__Output>): grpc.ClientUnaryCall;
  getMask(argument: _photograftai_MaskRequest, callback: grpc.requestCallback<_photograftai_MaskResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface PhotograftServiceHandlers extends grpc.UntypedServiceImplementation {
  GetMask: grpc.handleUnaryCall<_photograftai_MaskRequest__Output, _photograftai_MaskResponse>;
  
}

export interface PhotograftServiceDefinition extends grpc.ServiceDefinition {
  GetMask: MethodDefinition<_photograftai_MaskRequest, _photograftai_MaskResponse, _photograftai_MaskRequest__Output, _photograftai_MaskResponse__Output>
}
