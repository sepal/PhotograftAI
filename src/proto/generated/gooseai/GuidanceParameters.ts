// Original file: stabilityai/generation.proto

import type { GuidancePreset as _gooseai_GuidancePreset, GuidancePreset__Output as _gooseai_GuidancePreset__Output } from '../gooseai/GuidancePreset';
import type { GuidanceInstanceParameters as _gooseai_GuidanceInstanceParameters, GuidanceInstanceParameters__Output as _gooseai_GuidanceInstanceParameters__Output } from '../gooseai/GuidanceInstanceParameters';

export interface GuidanceParameters {
  'guidancePreset'?: (_gooseai_GuidancePreset);
  'instances'?: (_gooseai_GuidanceInstanceParameters)[];
}

export interface GuidanceParameters__Output {
  'guidancePreset': (_gooseai_GuidancePreset__Output);
  'instances': (_gooseai_GuidanceInstanceParameters__Output)[];
}
