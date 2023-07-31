// Original file: stabilityai/generation.proto

import type { Stage as _gooseai_Stage, Stage__Output as _gooseai_Stage__Output } from '../gooseai/Stage';

export interface ChainRequest {
  'requestId'?: (string);
  'stage'?: (_gooseai_Stage)[];
}

export interface ChainRequest__Output {
  'requestId': (string);
  'stage': (_gooseai_Stage__Output)[];
}
