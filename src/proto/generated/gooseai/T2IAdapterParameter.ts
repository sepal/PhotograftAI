// Original file: stabilityai/generation.proto

import type { T2IAdapter as _gooseai_T2IAdapter, T2IAdapter__Output as _gooseai_T2IAdapter__Output } from '../gooseai/T2IAdapter';
import type { T2IAdapterInit as _gooseai_T2IAdapterInit, T2IAdapterInit__Output as _gooseai_T2IAdapterInit__Output } from '../gooseai/T2IAdapterInit';

export interface T2IAdapterParameter {
  'adapterType'?: (_gooseai_T2IAdapter);
  'adapterStrength'?: (number | string);
  'adapterInitType'?: (_gooseai_T2IAdapterInit);
}

export interface T2IAdapterParameter__Output {
  'adapterType': (_gooseai_T2IAdapter__Output);
  'adapterStrength': (number);
  'adapterInitType': (_gooseai_T2IAdapterInit__Output);
}
