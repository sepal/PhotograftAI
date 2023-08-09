import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { PhotograftServiceClient as _photograftai_PhotograftServiceClient, PhotograftServiceDefinition as _photograftai_PhotograftServiceDefinition } from './photograftai/PhotograftService';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  photograftai: {
    MaskRequest: MessageTypeDefinition
    MaskResponse: MessageTypeDefinition
    PhotograftService: SubtypeConstructor<typeof grpc.Client, _photograftai_PhotograftServiceClient> & { service: _photograftai_PhotograftServiceDefinition }
  }
}

