// Original file: stabilityai/generation.proto

import type { SamplerParameters as _gooseai_SamplerParameters, SamplerParameters__Output as _gooseai_SamplerParameters__Output } from '../gooseai/SamplerParameters';
import type { ScheduleParameters as _gooseai_ScheduleParameters, ScheduleParameters__Output as _gooseai_ScheduleParameters__Output } from '../gooseai/ScheduleParameters';
import type { GuidanceParameters as _gooseai_GuidanceParameters, GuidanceParameters__Output as _gooseai_GuidanceParameters__Output } from '../gooseai/GuidanceParameters';

export interface StepParameter {
  'scaledStep'?: (number | string);
  'sampler'?: (_gooseai_SamplerParameters | null);
  'schedule'?: (_gooseai_ScheduleParameters | null);
  'guidance'?: (_gooseai_GuidanceParameters | null);
  '_sampler'?: "sampler";
  '_schedule'?: "schedule";
  '_guidance'?: "guidance";
}

export interface StepParameter__Output {
  'scaledStep': (number);
  'sampler'?: (_gooseai_SamplerParameters__Output | null);
  'schedule'?: (_gooseai_ScheduleParameters__Output | null);
  'guidance'?: (_gooseai_GuidanceParameters__Output | null);
  '_sampler': "sampler";
  '_schedule': "schedule";
  '_guidance': "guidance";
}
