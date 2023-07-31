// Original file: stabilityai/generation.proto

import type { Model as _gooseai_Model, Model__Output as _gooseai_Model__Output } from '../gooseai/Model';
import type { GuidanceScheduleParameters as _gooseai_GuidanceScheduleParameters, GuidanceScheduleParameters__Output as _gooseai_GuidanceScheduleParameters__Output } from '../gooseai/GuidanceScheduleParameters';
import type { CutoutParameters as _gooseai_CutoutParameters, CutoutParameters__Output as _gooseai_CutoutParameters__Output } from '../gooseai/CutoutParameters';
import type { Prompt as _gooseai_Prompt, Prompt__Output as _gooseai_Prompt__Output } from '../gooseai/Prompt';

export interface GuidanceInstanceParameters {
  'models'?: (_gooseai_Model)[];
  'guidanceStrength'?: (number | string);
  'schedule'?: (_gooseai_GuidanceScheduleParameters)[];
  'cutouts'?: (_gooseai_CutoutParameters | null);
  'prompt'?: (_gooseai_Prompt | null);
  '_guidanceStrength'?: "guidanceStrength";
  '_cutouts'?: "cutouts";
  '_prompt'?: "prompt";
}

export interface GuidanceInstanceParameters__Output {
  'models': (_gooseai_Model__Output)[];
  'guidanceStrength'?: (number);
  'schedule': (_gooseai_GuidanceScheduleParameters__Output)[];
  'cutouts'?: (_gooseai_CutoutParameters__Output | null);
  'prompt'?: (_gooseai_Prompt__Output | null);
  '_guidanceStrength': "guidanceStrength";
  '_cutouts': "cutouts";
  '_prompt': "prompt";
}
