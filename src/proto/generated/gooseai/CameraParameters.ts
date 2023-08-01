// Original file: stabilityai/generation.proto

import type { CameraType as _gooseai_CameraType, CameraType__Output as _gooseai_CameraType__Output } from '../gooseai/CameraType';

export interface CameraParameters {
  'cameraType'?: (_gooseai_CameraType);
  'nearPlane'?: (number | string);
  'farPlane'?: (number | string);
  'fov'?: (number | string);
  '_fov'?: "fov";
}

export interface CameraParameters__Output {
  'cameraType': (_gooseai_CameraType__Output);
  'nearPlane': (number);
  'farPlane': (number);
  'fov'?: (number);
  '_fov': "fov";
}
