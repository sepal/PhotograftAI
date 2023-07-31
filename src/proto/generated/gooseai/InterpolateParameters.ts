// Original file: stabilityai/generation.proto

import type { InterpolateMode as _gooseai_InterpolateMode, InterpolateMode__Output as _gooseai_InterpolateMode__Output } from '../gooseai/InterpolateMode';

export interface InterpolateParameters {
  'ratios'?: (number | string)[];
  'mode'?: (_gooseai_InterpolateMode);
  '_mode'?: "mode";
}

export interface InterpolateParameters__Output {
  'ratios': (number)[];
  'mode'?: (_gooseai_InterpolateMode__Output);
  '_mode': "mode";
}
