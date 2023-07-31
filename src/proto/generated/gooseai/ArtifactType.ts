// Original file: stabilityai/generation.proto

export const ArtifactType = {
  ARTIFACT_NONE: 'ARTIFACT_NONE',
  ARTIFACT_IMAGE: 'ARTIFACT_IMAGE',
  ARTIFACT_VIDEO: 'ARTIFACT_VIDEO',
  ARTIFACT_TEXT: 'ARTIFACT_TEXT',
  ARTIFACT_TOKENS: 'ARTIFACT_TOKENS',
  ARTIFACT_EMBEDDING: 'ARTIFACT_EMBEDDING',
  ARTIFACT_CLASSIFICATIONS: 'ARTIFACT_CLASSIFICATIONS',
  ARTIFACT_MASK: 'ARTIFACT_MASK',
  ARTIFACT_LATENT: 'ARTIFACT_LATENT',
  ARTIFACT_TENSOR: 'ARTIFACT_TENSOR',
  ARTIFACT_DEPTH: 'ARTIFACT_DEPTH',
} as const;

export type ArtifactType =
  | 'ARTIFACT_NONE'
  | 0
  | 'ARTIFACT_IMAGE'
  | 1
  | 'ARTIFACT_VIDEO'
  | 2
  | 'ARTIFACT_TEXT'
  | 3
  | 'ARTIFACT_TOKENS'
  | 4
  | 'ARTIFACT_EMBEDDING'
  | 5
  | 'ARTIFACT_CLASSIFICATIONS'
  | 6
  | 'ARTIFACT_MASK'
  | 7
  | 'ARTIFACT_LATENT'
  | 8
  | 'ARTIFACT_TENSOR'
  | 9
  | 'ARTIFACT_DEPTH'
  | 10

export type ArtifactType__Output = typeof ArtifactType[keyof typeof ArtifactType]
