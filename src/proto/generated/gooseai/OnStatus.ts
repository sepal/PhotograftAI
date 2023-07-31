// Original file: stabilityai/generation.proto

import type { FinishReason as _gooseai_FinishReason, FinishReason__Output as _gooseai_FinishReason__Output } from '../gooseai/FinishReason';
import type { StageAction as _gooseai_StageAction, StageAction__Output as _gooseai_StageAction__Output } from '../gooseai/StageAction';

export interface OnStatus {
  'reason'?: (_gooseai_FinishReason)[];
  'target'?: (string);
  'action'?: (_gooseai_StageAction)[];
  '_target'?: "target";
}

export interface OnStatus__Output {
  'reason': (_gooseai_FinishReason__Output)[];
  'target'?: (string);
  'action': (_gooseai_StageAction__Output)[];
  '_target': "target";
}
