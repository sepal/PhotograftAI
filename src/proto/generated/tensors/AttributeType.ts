// Original file: stabilityai/tensors.proto

export const AttributeType = {
  AT_PARAMETER: 'AT_PARAMETER',
  AT_BUFFER: 'AT_BUFFER',
} as const;

export type AttributeType =
  | 'AT_PARAMETER'
  | 0
  | 'AT_BUFFER'
  | 1

export type AttributeType__Output = typeof AttributeType[keyof typeof AttributeType]
