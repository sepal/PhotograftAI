// Original file: stabilityai/tensors.proto

import type { Attribute as _tensors_Attribute, Attribute__Output as _tensors_Attribute__Output } from '../tensors/Attribute';

export interface Module {
  'name'?: (string);
  'names'?: (string)[];
  'attributes'?: (_tensors_Attribute)[];
}

export interface Module__Output {
  'name': (string);
  'names': (string)[];
  'attributes': (_tensors_Attribute__Output)[];
}
