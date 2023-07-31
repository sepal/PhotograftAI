// Original file: mask_service/mask.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { GetMaskRequest as _photograftai_GetMaskRequest, GetMaskRequest__Output as _photograftai_GetMaskRequest__Output } from '../photograftai/GetMaskRequest';
import type { GetMaskResponse as _photograftai_GetMaskResponse, GetMaskResponse__Output as _photograftai_GetMaskResponse__Output } from '../photograftai/GetMaskResponse';

export interface MaskServiceClient extends grpc.Client {
  GetMask(argument: _photograftai_GetMaskRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_photograftai_GetMaskResponse__Output>): grpc.ClientUnaryCall;
  GetMask(argument: _photograftai_GetMaskRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_photograftai_GetMaskResponse__Output>): grpc.ClientUnaryCall;
  GetMask(argument: _photograftai_GetMaskRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_photograftai_GetMaskResponse__Output>): grpc.ClientUnaryCall;
  GetMask(argument: _photograftai_GetMaskRequest, callback: grpc.requestCallback<_photograftai_GetMaskResponse__Output>): grpc.ClientUnaryCall;
  getMask(argument: _photograftai_GetMaskRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_photograftai_GetMaskResponse__Output>): grpc.ClientUnaryCall;
  getMask(argument: _photograftai_GetMaskRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_photograftai_GetMaskResponse__Output>): grpc.ClientUnaryCall;
  getMask(argument: _photograftai_GetMaskRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_photograftai_GetMaskResponse__Output>): grpc.ClientUnaryCall;
  getMask(argument: _photograftai_GetMaskRequest, callback: grpc.requestCallback<_photograftai_GetMaskResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface MaskServiceHandlers extends grpc.UntypedServiceImplementation {
  GetMask: grpc.handleUnaryCall<_photograftai_GetMaskRequest__Output, _photograftai_GetMaskResponse>;
  
}

export interface MaskServiceDefinition extends grpc.ServiceDefinition {
  GetMask: MethodDefinition<_photograftai_GetMaskRequest, _photograftai_GetMaskResponse, _photograftai_GetMaskRequest__Output, _photograftai_GetMaskResponse__Output>
}
