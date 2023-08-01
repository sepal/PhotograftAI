// Original file: stabilityai/generation.proto

export const FinishReason = {
  NULL: 'NULL',
  LENGTH: 'LENGTH',
  STOP: 'STOP',
  ERROR: 'ERROR',
  FILTER: 'FILTER',
} as const;

export type FinishReason =
  | 'NULL'
  | 0
  | 'LENGTH'
  | 1
  | 'STOP'
  | 2
  | 'ERROR'
  | 3
  | 'FILTER'
  | 4

export type FinishReason__Output = typeof FinishReason[keyof typeof FinishReason]
