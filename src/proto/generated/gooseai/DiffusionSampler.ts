// Original file: stabilityai/generation.proto

export const DiffusionSampler = {
  SAMPLER_DDIM: 'SAMPLER_DDIM',
  SAMPLER_DDPM: 'SAMPLER_DDPM',
  SAMPLER_K_EULER: 'SAMPLER_K_EULER',
  SAMPLER_K_EULER_ANCESTRAL: 'SAMPLER_K_EULER_ANCESTRAL',
  SAMPLER_K_HEUN: 'SAMPLER_K_HEUN',
  SAMPLER_K_DPM_2: 'SAMPLER_K_DPM_2',
  SAMPLER_K_DPM_2_ANCESTRAL: 'SAMPLER_K_DPM_2_ANCESTRAL',
  SAMPLER_K_LMS: 'SAMPLER_K_LMS',
  SAMPLER_K_DPMPP_2S_ANCESTRAL: 'SAMPLER_K_DPMPP_2S_ANCESTRAL',
  SAMPLER_K_DPMPP_2M: 'SAMPLER_K_DPMPP_2M',
  SAMPLER_K_DPMPP_SDE: 'SAMPLER_K_DPMPP_SDE',
} as const;

export type DiffusionSampler =
  | 'SAMPLER_DDIM'
  | 0
  | 'SAMPLER_DDPM'
  | 1
  | 'SAMPLER_K_EULER'
  | 2
  | 'SAMPLER_K_EULER_ANCESTRAL'
  | 3
  | 'SAMPLER_K_HEUN'
  | 4
  | 'SAMPLER_K_DPM_2'
  | 5
  | 'SAMPLER_K_DPM_2_ANCESTRAL'
  | 6
  | 'SAMPLER_K_LMS'
  | 7
  | 'SAMPLER_K_DPMPP_2S_ANCESTRAL'
  | 8
  | 'SAMPLER_K_DPMPP_2M'
  | 9
  | 'SAMPLER_K_DPMPP_SDE'
  | 10

export type DiffusionSampler__Output = typeof DiffusionSampler[keyof typeof DiffusionSampler]