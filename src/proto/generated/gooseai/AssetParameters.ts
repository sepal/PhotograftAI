// Original file: stabilityai/generation.proto

import type { AssetAction as _gooseai_AssetAction, AssetAction__Output as _gooseai_AssetAction__Output } from '../gooseai/AssetAction';
import type { AssetUse as _gooseai_AssetUse, AssetUse__Output as _gooseai_AssetUse__Output } from '../gooseai/AssetUse';

export interface AssetParameters {
  'action'?: (_gooseai_AssetAction);
  'projectId'?: (string);
  'use'?: (_gooseai_AssetUse);
}

export interface AssetParameters__Output {
  'action': (_gooseai_AssetAction__Output);
  'projectId': (string);
  'use': (_gooseai_AssetUse__Output);
}
