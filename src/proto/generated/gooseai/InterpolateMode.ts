// Original file: stabilityai/generation.proto

export const InterpolateMode = {
  INTERPOLATE_LINEAR: 'INTERPOLATE_LINEAR',
  INTERPOLATE_RIFE: 'INTERPOLATE_RIFE',
  INTERPOLATE_VAE_LINEAR: 'INTERPOLATE_VAE_LINEAR',
  INTERPOLATE_VAE_SLERP: 'INTERPOLATE_VAE_SLERP',
  INTERPOLATE_FILM: 'INTERPOLATE_FILM',
} as const;

export type InterpolateMode =
  | 'INTERPOLATE_LINEAR'
  | 0
  | 'INTERPOLATE_RIFE'
  | 1
  | 'INTERPOLATE_VAE_LINEAR'
  | 2
  | 'INTERPOLATE_VAE_SLERP'
  | 3
  | 'INTERPOLATE_FILM'
  | 4

export type InterpolateMode__Output = typeof InterpolateMode[keyof typeof InterpolateMode]
