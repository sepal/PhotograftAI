// Original file: stabilityai/generation.proto

export const AssetUse = {
  ASSET_USE_UNDEFINED: 'ASSET_USE_UNDEFINED',
  ASSET_USE_INPUT: 'ASSET_USE_INPUT',
  ASSET_USE_OUTPUT: 'ASSET_USE_OUTPUT',
  ASSET_USE_INTERMEDIATE: 'ASSET_USE_INTERMEDIATE',
  ASSET_USE_PROJECT: 'ASSET_USE_PROJECT',
} as const;

export type AssetUse =
  | 'ASSET_USE_UNDEFINED'
  | 0
  | 'ASSET_USE_INPUT'
  | 1
  | 'ASSET_USE_OUTPUT'
  | 2
  | 'ASSET_USE_INTERMEDIATE'
  | 3
  | 'ASSET_USE_PROJECT'
  | 4

export type AssetUse__Output = typeof AssetUse[keyof typeof AssetUse]
