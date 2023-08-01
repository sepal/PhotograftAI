// Original file: stabilityai/generation.proto

import type { ArtifactType as _gooseai_ArtifactType, ArtifactType__Output as _gooseai_ArtifactType__Output } from '../gooseai/ArtifactType';
import type { Prompt as _gooseai_Prompt, Prompt__Output as _gooseai_Prompt__Output } from '../gooseai/Prompt';
import type { ImageParameters as _gooseai_ImageParameters, ImageParameters__Output as _gooseai_ImageParameters__Output } from '../gooseai/ImageParameters';
import type { ConditionerParameters as _gooseai_ConditionerParameters, ConditionerParameters__Output as _gooseai_ConditionerParameters__Output } from '../gooseai/ConditionerParameters';
import type { ClassifierParameters as _gooseai_ClassifierParameters, ClassifierParameters__Output as _gooseai_ClassifierParameters__Output } from '../gooseai/ClassifierParameters';
import type { AssetParameters as _gooseai_AssetParameters, AssetParameters__Output as _gooseai_AssetParameters__Output } from '../gooseai/AssetParameters';
import type { InterpolateParameters as _gooseai_InterpolateParameters, InterpolateParameters__Output as _gooseai_InterpolateParameters__Output } from '../gooseai/InterpolateParameters';
import type { TransformParameters as _gooseai_TransformParameters, TransformParameters__Output as _gooseai_TransformParameters__Output } from '../gooseai/TransformParameters';
import type { Struct as _google_protobuf_Struct, Struct__Output as _google_protobuf_Struct__Output } from '../google/protobuf/Struct';

export interface Request {
  'engineId'?: (string);
  'requestId'?: (string);
  'requestedType'?: (_gooseai_ArtifactType);
  'prompt'?: (_gooseai_Prompt)[];
  'image'?: (_gooseai_ImageParameters | null);
  'conditioner'?: (_gooseai_ConditionerParameters | null);
  'classifier'?: (_gooseai_ClassifierParameters | null);
  'asset'?: (_gooseai_AssetParameters | null);
  'interpolate'?: (_gooseai_InterpolateParameters | null);
  'transform'?: (_gooseai_TransformParameters | null);
  'extras'?: (_google_protobuf_Struct | null);
  'params'?: "image"|"classifier"|"asset"|"interpolate"|"transform";
  '_conditioner'?: "conditioner";
  '_extras'?: "extras";
}

export interface Request__Output {
  'engineId': (string);
  'requestId': (string);
  'requestedType': (_gooseai_ArtifactType__Output);
  'prompt': (_gooseai_Prompt__Output)[];
  'image'?: (_gooseai_ImageParameters__Output | null);
  'conditioner'?: (_gooseai_ConditionerParameters__Output | null);
  'classifier'?: (_gooseai_ClassifierParameters__Output | null);
  'asset'?: (_gooseai_AssetParameters__Output | null);
  'interpolate'?: (_gooseai_InterpolateParameters__Output | null);
  'transform'?: (_gooseai_TransformParameters__Output | null);
  'extras'?: (_google_protobuf_Struct__Output | null);
  'params': "image"|"classifier"|"asset"|"interpolate"|"transform";
  '_conditioner': "conditioner";
  '_extras': "extras";
}
