// Original file: stabilityai/tensors.proto

import type { Module as _tensors_Module, Module__Output as _tensors_Module__Output } from '../tensors/Module';
import type { Tensor as _tensors_Tensor, Tensor__Output as _tensors_Tensor__Output } from '../tensors/Tensor';
import type { Long } from '@grpc/proto-loader';

export interface Attribute {
  'name'?: (string);
  'module'?: (_tensors_Module | null);
  'tensor'?: (_tensors_Tensor | null);
  'string'?: (string);
  'int64'?: (number | string | Long);
  'float'?: (number | string);
  'bool'?: (boolean);
  'value'?: "module"|"tensor"|"string"|"int64"|"float"|"bool";
}

export interface Attribute__Output {
  'name': (string);
  'module'?: (_tensors_Module__Output | null);
  'tensor'?: (_tensors_Tensor__Output | null);
  'string'?: (string);
  'int64'?: (string);
  'float'?: (number);
  'bool'?: (boolean);
  'value': "module"|"tensor"|"string"|"int64"|"float"|"bool";
}
