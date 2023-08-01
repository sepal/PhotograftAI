// Original file: stabilityai/generation.proto

import type { TransformType as _gooseai_TransformType, TransformType__Output as _gooseai_TransformType__Output } from '../gooseai/TransformType';
import type { StepParameter as _gooseai_StepParameter, StepParameter__Output as _gooseai_StepParameter__Output } from '../gooseai/StepParameter';
import type { MaskedAreaInit as _gooseai_MaskedAreaInit, MaskedAreaInit__Output as _gooseai_MaskedAreaInit__Output } from '../gooseai/MaskedAreaInit';
import type { WeightMethod as _gooseai_WeightMethod, WeightMethod__Output as _gooseai_WeightMethod__Output } from '../gooseai/WeightMethod';
import type { T2IAdapterParameter as _gooseai_T2IAdapterParameter, T2IAdapterParameter__Output as _gooseai_T2IAdapterParameter__Output } from '../gooseai/T2IAdapterParameter';
import type { FineTuningParameters as _gooseai_FineTuningParameters, FineTuningParameters__Output as _gooseai_FineTuningParameters__Output } from '../gooseai/FineTuningParameters';
import type { ContentCredentialsParameters as _gooseai_ContentCredentialsParameters, ContentCredentialsParameters__Output as _gooseai_ContentCredentialsParameters__Output } from '../gooseai/ContentCredentialsParameters';
import type { Long } from '@grpc/proto-loader';

export interface ImageParameters {
  'height'?: (number | string | Long);
  'width'?: (number | string | Long);
  'seed'?: (number)[];
  'samples'?: (number | string | Long);
  'steps'?: (number | string | Long);
  'transform'?: (_gooseai_TransformType | null);
  'parameters'?: (_gooseai_StepParameter)[];
  'maskedAreaInit'?: (_gooseai_MaskedAreaInit);
  'weightMethod'?: (_gooseai_WeightMethod);
  'quantize'?: (boolean);
  'adapter'?: (_gooseai_T2IAdapterParameter | null);
  'fineTuningParameters'?: (_gooseai_FineTuningParameters)[];
  'contentCredentialsParameters'?: (_gooseai_ContentCredentialsParameters | null);
  '_height'?: "height";
  '_width'?: "width";
  '_samples'?: "samples";
  '_steps'?: "steps";
  '_transform'?: "transform";
  '_maskedAreaInit'?: "maskedAreaInit";
  '_weightMethod'?: "weightMethod";
  '_quantize'?: "quantize";
  '_adapter'?: "adapter";
  '_contentCredentialsParameters'?: "contentCredentialsParameters";
}

export interface ImageParameters__Output {
  'height'?: (string);
  'width'?: (string);
  'seed': (number)[];
  'samples'?: (string);
  'steps'?: (string);
  'transform'?: (_gooseai_TransformType__Output | null);
  'parameters': (_gooseai_StepParameter__Output)[];
  'maskedAreaInit'?: (_gooseai_MaskedAreaInit__Output);
  'weightMethod'?: (_gooseai_WeightMethod__Output);
  'quantize'?: (boolean);
  'adapter'?: (_gooseai_T2IAdapterParameter__Output | null);
  'fineTuningParameters': (_gooseai_FineTuningParameters__Output)[];
  'contentCredentialsParameters'?: (_gooseai_ContentCredentialsParameters__Output | null);
  '_height': "height";
  '_width': "width";
  '_samples': "samples";
  '_steps': "steps";
  '_transform': "transform";
  '_maskedAreaInit': "maskedAreaInit";
  '_weightMethod': "weightMethod";
  '_quantize': "quantize";
  '_adapter': "adapter";
  '_contentCredentialsParameters': "contentCredentialsParameters";
}
