// Original file: stabilityai/generation.proto

export const ColorMatchMode = {
  COLOR_MATCH_HSV: 'COLOR_MATCH_HSV',
  COLOR_MATCH_LAB: 'COLOR_MATCH_LAB',
  COLOR_MATCH_RGB: 'COLOR_MATCH_RGB',
} as const;

export type ColorMatchMode =
  | 'COLOR_MATCH_HSV'
  | 0
  | 'COLOR_MATCH_LAB'
  | 1
  | 'COLOR_MATCH_RGB'
  | 2

export type ColorMatchMode__Output = typeof ColorMatchMode[keyof typeof ColorMatchMode]
