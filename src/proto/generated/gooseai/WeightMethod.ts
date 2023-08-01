// Original file: stabilityai/generation.proto

export const WeightMethod = {
  TEXT_ENCODER: 'TEXT_ENCODER',
  CROSS_ATTENTION: 'CROSS_ATTENTION',
} as const;

export type WeightMethod =
  | 'TEXT_ENCODER'
  | 0
  | 'CROSS_ATTENTION'
  | 1

export type WeightMethod__Output = typeof WeightMethod[keyof typeof WeightMethod]
