// Original file: stabilityai/generation.proto

export const ClassifierMode = {
  CLSFR_MODE_ZEROSHOT: 'CLSFR_MODE_ZEROSHOT',
  CLSFR_MODE_MULTICLASS: 'CLSFR_MODE_MULTICLASS',
} as const;

export type ClassifierMode =
  | 'CLSFR_MODE_ZEROSHOT'
  | 0
  | 'CLSFR_MODE_MULTICLASS'
  | 1

export type ClassifierMode__Output = typeof ClassifierMode[keyof typeof ClassifierMode]
