// Original file: stabilityai/generation.proto

export const T2IAdapter = {
  T2IADAPTER_NONE: 'T2IADAPTER_NONE',
  T2IADAPTER_SKETCH: 'T2IADAPTER_SKETCH',
  T2IADAPTER_DEPTH: 'T2IADAPTER_DEPTH',
  T2IADAPTER_CANNY: 'T2IADAPTER_CANNY',
} as const;

export type T2IAdapter =
  | 'T2IADAPTER_NONE'
  | 0
  | 'T2IADAPTER_SKETCH'
  | 1
  | 'T2IADAPTER_DEPTH'
  | 2
  | 'T2IADAPTER_CANNY'
  | 3

export type T2IAdapter__Output = typeof T2IAdapter[keyof typeof T2IAdapter]
