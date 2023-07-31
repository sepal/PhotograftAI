// Original file: stabilityai/generation.proto

import type { BorderMode as _gooseai_BorderMode, BorderMode__Output as _gooseai_BorderMode__Output } from '../gooseai/BorderMode';
import type { TransformMatrix as _gooseai_TransformMatrix, TransformMatrix__Output as _gooseai_TransformMatrix__Output } from '../gooseai/TransformMatrix';

export interface TransformResample {
  'borderMode'?: (_gooseai_BorderMode);
  'transform'?: (_gooseai_TransformMatrix | null);
  'prevTransform'?: (_gooseai_TransformMatrix | null);
  'depthWarp'?: (number | string);
  'exportMask'?: (boolean);
  '_prevTransform'?: "prevTransform";
  '_depthWarp'?: "depthWarp";
  '_exportMask'?: "exportMask";
}

export interface TransformResample__Output {
  'borderMode': (_gooseai_BorderMode__Output);
  'transform': (_gooseai_TransformMatrix__Output | null);
  'prevTransform'?: (_gooseai_TransformMatrix__Output | null);
  'depthWarp'?: (number);
  'exportMask'?: (boolean);
  '_prevTransform': "prevTransform";
  '_depthWarp': "depthWarp";
  '_exportMask': "exportMask";
}
