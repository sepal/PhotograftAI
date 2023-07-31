// Original file: stabilityai/generation.proto

export const BorderMode = {
  BORDER_REFLECT: 'BORDER_REFLECT',
  BORDER_REPLICATE: 'BORDER_REPLICATE',
  BORDER_WRAP: 'BORDER_WRAP',
  BORDER_ZERO: 'BORDER_ZERO',
  BORDER_PREFILL: 'BORDER_PREFILL',
} as const;

export type BorderMode =
  | 'BORDER_REFLECT'
  | 0
  | 'BORDER_REPLICATE'
  | 1
  | 'BORDER_WRAP'
  | 2
  | 'BORDER_ZERO'
  | 3
  | 'BORDER_PREFILL'
  | 4

export type BorderMode__Output = typeof BorderMode[keyof typeof BorderMode]
