// Original file: stabilityai/generation.proto

import type { Model as _gooseai_Model, Model__Output as _gooseai_Model__Output } from '../gooseai/Model';

export interface ConditionerParameters {
  'vectorAdjustPrior'?: (string);
  'conditioner'?: (_gooseai_Model | null);
  '_vectorAdjustPrior'?: "vectorAdjustPrior";
  '_conditioner'?: "conditioner";
}

export interface ConditionerParameters__Output {
  'vectorAdjustPrior'?: (string);
  'conditioner'?: (_gooseai_Model__Output | null);
  '_vectorAdjustPrior': "vectorAdjustPrior";
  '_conditioner': "conditioner";
}
