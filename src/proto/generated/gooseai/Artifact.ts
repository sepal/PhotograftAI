// Original file: stabilityai/generation.proto

import type { ArtifactType as _gooseai_ArtifactType, ArtifactType__Output as _gooseai_ArtifactType__Output } from '../gooseai/ArtifactType';
import type { Tokens as _gooseai_Tokens, Tokens__Output as _gooseai_Tokens__Output } from '../gooseai/Tokens';
import type { FinishReason as _gooseai_FinishReason, FinishReason__Output as _gooseai_FinishReason__Output } from '../gooseai/FinishReason';
import type { ClassifierParameters as _gooseai_ClassifierParameters, ClassifierParameters__Output as _gooseai_ClassifierParameters__Output } from '../gooseai/ClassifierParameters';
import type { Tensor as _tensors_Tensor, Tensor__Output as _tensors_Tensor__Output } from '../tensors/Tensor';
import type { Long } from '@grpc/proto-loader';

export interface Artifact {
  'id'?: (number | string | Long);
  'type'?: (_gooseai_ArtifactType);
  'mime'?: (string);
  'magic'?: (string);
  'binary'?: (Buffer | Uint8Array | string);
  'text'?: (string);
  'tokens'?: (_gooseai_Tokens | null);
  'index'?: (number);
  'finishReason'?: (_gooseai_FinishReason);
  'seed'?: (number);
  'classifier'?: (_gooseai_ClassifierParameters | null);
  'uuid'?: (string);
  'size'?: (number | string | Long);
  'tensor'?: (_tensors_Tensor | null);
  '_magic'?: "magic";
  'data'?: "binary"|"text"|"tokens"|"classifier"|"tensor";
}

export interface Artifact__Output {
  'id': (string);
  'type': (_gooseai_ArtifactType__Output);
  'mime': (string);
  'magic'?: (string);
  'binary'?: (Buffer);
  'text'?: (string);
  'tokens'?: (_gooseai_Tokens__Output | null);
  'index': (number);
  'finishReason': (_gooseai_FinishReason__Output);
  'seed': (number);
  'classifier'?: (_gooseai_ClassifierParameters__Output | null);
  'uuid': (string);
  'size': (string);
  'tensor'?: (_tensors_Tensor__Output | null);
  '_magic': "magic";
  'data': "binary"|"text"|"tokens"|"classifier"|"tensor";
}
