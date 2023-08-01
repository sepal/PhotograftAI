// Original file: stabilityai/generation.proto

export const Upscaler = {
  UPSCALER_RGB: 'UPSCALER_RGB',
  UPSCALER_GFPGAN: 'UPSCALER_GFPGAN',
  UPSCALER_ESRGAN: 'UPSCALER_ESRGAN',
} as const;

export type Upscaler =
  | 'UPSCALER_RGB'
  | 0
  | 'UPSCALER_GFPGAN'
  | 1
  | 'UPSCALER_ESRGAN'
  | 2

export type Upscaler__Output = typeof Upscaler[keyof typeof Upscaler]
