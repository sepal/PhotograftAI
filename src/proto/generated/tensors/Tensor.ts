// Original file: stabilityai/tensors.proto

import type { Dtype as _tensors_Dtype, Dtype__Output as _tensors_Dtype__Output } from '../tensors/Dtype';
import type { AttributeType as _tensors_AttributeType, AttributeType__Output as _tensors_AttributeType__Output } from '../tensors/AttributeType';
import type { Long } from '@grpc/proto-loader';

export interface Tensor {
  'dtype'?: (_tensors_Dtype);
  'shape'?: (number | string | Long)[];
  'data'?: (Buffer | Uint8Array | string);
  'attrType'?: (_tensors_AttributeType);
  '_attrType'?: "attrType";
}

export interface Tensor__Output {
  'dtype': (_tensors_Dtype__Output);
  'shape': (string)[];
  'data': (Buffer);
  'attrType'?: (_tensors_AttributeType__Output);
  '_attrType': "attrType";
}
