// Original file: stabilityai/generation.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { Answer as _gooseai_Answer, Answer__Output as _gooseai_Answer__Output } from '../gooseai/Answer';
import type { ChainRequest as _gooseai_ChainRequest, ChainRequest__Output as _gooseai_ChainRequest__Output } from '../gooseai/ChainRequest';
import type { Request as _gooseai_Request, Request__Output as _gooseai_Request__Output } from '../gooseai/Request';

export interface GenerationServiceClient extends grpc.Client {
  ChainGenerate(argument: _gooseai_ChainRequest, metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientReadableStream<_gooseai_Answer__Output>;
  ChainGenerate(argument: _gooseai_ChainRequest, options?: grpc.CallOptions): grpc.ClientReadableStream<_gooseai_Answer__Output>;
  chainGenerate(argument: _gooseai_ChainRequest, metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientReadableStream<_gooseai_Answer__Output>;
  chainGenerate(argument: _gooseai_ChainRequest, options?: grpc.CallOptions): grpc.ClientReadableStream<_gooseai_Answer__Output>;
  
  Generate(argument: _gooseai_Request, metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientReadableStream<_gooseai_Answer__Output>;
  Generate(argument: _gooseai_Request, options?: grpc.CallOptions): grpc.ClientReadableStream<_gooseai_Answer__Output>;
  generate(argument: _gooseai_Request, metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientReadableStream<_gooseai_Answer__Output>;
  generate(argument: _gooseai_Request, options?: grpc.CallOptions): grpc.ClientReadableStream<_gooseai_Answer__Output>;
  
}

export interface GenerationServiceHandlers extends grpc.UntypedServiceImplementation {
  ChainGenerate: grpc.handleServerStreamingCall<_gooseai_ChainRequest__Output, _gooseai_Answer>;
  
  Generate: grpc.handleServerStreamingCall<_gooseai_Request__Output, _gooseai_Answer>;
  
}

export interface GenerationServiceDefinition extends grpc.ServiceDefinition {
  ChainGenerate: MethodDefinition<_gooseai_ChainRequest, _gooseai_Answer, _gooseai_ChainRequest__Output, _gooseai_Answer__Output>
  Generate: MethodDefinition<_gooseai_Request, _gooseai_Answer, _gooseai_Request__Output, _gooseai_Answer__Output>
}
