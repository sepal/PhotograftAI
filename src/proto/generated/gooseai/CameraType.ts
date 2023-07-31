// Original file: stabilityai/generation.proto

export const CameraType = {
  CAMERA_PERSPECTIVE: 'CAMERA_PERSPECTIVE',
  CAMERA_ORTHOGRAPHIC: 'CAMERA_ORTHOGRAPHIC',
} as const;

export type CameraType =
  | 'CAMERA_PERSPECTIVE'
  | 0
  | 'CAMERA_ORTHOGRAPHIC'
  | 1

export type CameraType__Output = typeof CameraType[keyof typeof CameraType]
