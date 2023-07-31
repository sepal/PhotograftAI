// Original file: stabilityai/generation.proto

import type { TransformMatrix as _gooseai_TransformMatrix, TransformMatrix__Output as _gooseai_TransformMatrix__Output } from '../gooseai/TransformMatrix';
import type { CameraParameters as _gooseai_CameraParameters, CameraParameters__Output as _gooseai_CameraParameters__Output } from '../gooseai/CameraParameters';
import type { RenderMode as _gooseai_RenderMode, RenderMode__Output as _gooseai_RenderMode__Output } from '../gooseai/RenderMode';

export interface TransformCameraPose {
  'worldToViewMatrix'?: (_gooseai_TransformMatrix | null);
  'cameraParameters'?: (_gooseai_CameraParameters | null);
  'doPrefill'?: (boolean);
  'renderMode'?: (_gooseai_RenderMode);
}

export interface TransformCameraPose__Output {
  'worldToViewMatrix': (_gooseai_TransformMatrix__Output | null);
  'cameraParameters': (_gooseai_CameraParameters__Output | null);
  'doPrefill': (boolean);
  'renderMode': (_gooseai_RenderMode__Output);
}
