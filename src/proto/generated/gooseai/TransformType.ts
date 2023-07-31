// Original file: stabilityai/generation.proto

import type { DiffusionSampler as _gooseai_DiffusionSampler, DiffusionSampler__Output as _gooseai_DiffusionSampler__Output } from '../gooseai/DiffusionSampler';
import type { Upscaler as _gooseai_Upscaler, Upscaler__Output as _gooseai_Upscaler__Output } from '../gooseai/Upscaler';

export interface TransformType {
  'diffusion'?: (_gooseai_DiffusionSampler);
  'upscaler'?: (_gooseai_Upscaler);
  'type'?: "diffusion"|"upscaler";
}

export interface TransformType__Output {
  'diffusion'?: (_gooseai_DiffusionSampler__Output);
  'upscaler'?: (_gooseai_Upscaler__Output);
  'type': "diffusion"|"upscaler";
}
