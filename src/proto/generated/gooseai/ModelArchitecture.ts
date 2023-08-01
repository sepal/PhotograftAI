// Original file: stabilityai/generation.proto

export const ModelArchitecture = {
  MODEL_ARCHITECTURE_NONE: 'MODEL_ARCHITECTURE_NONE',
  MODEL_ARCHITECTURE_CLIP_VIT: 'MODEL_ARCHITECTURE_CLIP_VIT',
  MODEL_ARCHITECTURE_CLIP_RESNET: 'MODEL_ARCHITECTURE_CLIP_RESNET',
  MODEL_ARCHITECTURE_LDM: 'MODEL_ARCHITECTURE_LDM',
} as const;

export type ModelArchitecture =
  | 'MODEL_ARCHITECTURE_NONE'
  | 0
  | 'MODEL_ARCHITECTURE_CLIP_VIT'
  | 1
  | 'MODEL_ARCHITECTURE_CLIP_RESNET'
  | 2
  | 'MODEL_ARCHITECTURE_LDM'
  | 3

export type ModelArchitecture__Output = typeof ModelArchitecture[keyof typeof ModelArchitecture]
