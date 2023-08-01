// Original file: stabilityai/generation.proto

export const MaskedAreaInit = {
  MASKED_AREA_INIT_ZERO: 'MASKED_AREA_INIT_ZERO',
  MASKED_AREA_INIT_RANDOM: 'MASKED_AREA_INIT_RANDOM',
  MASKED_AREA_INIT_ORIGINAL: 'MASKED_AREA_INIT_ORIGINAL',
} as const;

export type MaskedAreaInit =
  | 'MASKED_AREA_INIT_ZERO'
  | 0
  | 'MASKED_AREA_INIT_RANDOM'
  | 1
  | 'MASKED_AREA_INIT_ORIGINAL'
  | 2

export type MaskedAreaInit__Output = typeof MaskedAreaInit[keyof typeof MaskedAreaInit]
