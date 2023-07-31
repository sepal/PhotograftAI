// Original file: stabilityai/generation.proto

export const RenderMode = {
  RENDER_MESH: 'RENDER_MESH',
  RENDER_POINTCLOUD: 'RENDER_POINTCLOUD',
} as const;

export type RenderMode =
  | 'RENDER_MESH'
  | 0
  | 'RENDER_POINTCLOUD'
  | 1

export type RenderMode__Output = typeof RenderMode[keyof typeof RenderMode]
