// Original file: stabilityai/generation.proto

import type { TransformColorAdjust as _gooseai_TransformColorAdjust, TransformColorAdjust__Output as _gooseai_TransformColorAdjust__Output } from '../gooseai/TransformColorAdjust';
import type { TransformDepthCalc as _gooseai_TransformDepthCalc, TransformDepthCalc__Output as _gooseai_TransformDepthCalc__Output } from '../gooseai/TransformDepthCalc';
import type { TransformResample as _gooseai_TransformResample, TransformResample__Output as _gooseai_TransformResample__Output } from '../gooseai/TransformResample';
import type { TransformCameraPose as _gooseai_TransformCameraPose, TransformCameraPose__Output as _gooseai_TransformCameraPose__Output } from '../gooseai/TransformCameraPose';

export interface TransformParameters {
  'colorAdjust'?: (_gooseai_TransformColorAdjust | null);
  'depthCalc'?: (_gooseai_TransformDepthCalc | null);
  'resample'?: (_gooseai_TransformResample | null);
  'cameraPose'?: (_gooseai_TransformCameraPose | null);
  'transform'?: "colorAdjust"|"depthCalc"|"resample"|"cameraPose";
}

export interface TransformParameters__Output {
  'colorAdjust'?: (_gooseai_TransformColorAdjust__Output | null);
  'depthCalc'?: (_gooseai_TransformDepthCalc__Output | null);
  'resample'?: (_gooseai_TransformResample__Output | null);
  'cameraPose'?: (_gooseai_TransformCameraPose__Output | null);
  'transform': "colorAdjust"|"depthCalc"|"resample"|"cameraPose";
}
