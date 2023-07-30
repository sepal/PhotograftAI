import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { MaskServiceClient as _photograftai_MaskServiceClient, MaskServiceDefinition as _photograftai_MaskServiceDefinition } from './photograftai/MaskService';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  photograftai: {
    GetMaskRequest: MessageTypeDefinition
    GetMaskResponse: MessageTypeDefinition
    MaskService: SubtypeConstructor<typeof grpc.Client, _photograftai_MaskServiceClient> & { service: _photograftai_MaskServiceDefinition }
  }
}

