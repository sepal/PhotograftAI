// Original file: stabilityai/generation.proto

export const AssetAction = {
  ASSET_PUT: 'ASSET_PUT',
  ASSET_GET: 'ASSET_GET',
  ASSET_DELETE: 'ASSET_DELETE',
} as const;

export type AssetAction =
  | 'ASSET_PUT'
  | 0
  | 'ASSET_GET'
  | 1
  | 'ASSET_DELETE'
  | 2

export type AssetAction__Output = typeof AssetAction[keyof typeof AssetAction]
