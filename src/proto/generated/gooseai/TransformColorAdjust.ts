// Original file: stabilityai/generation.proto

import type { Artifact as _gooseai_Artifact, Artifact__Output as _gooseai_Artifact__Output } from '../gooseai/Artifact';
import type { ColorMatchMode as _gooseai_ColorMatchMode, ColorMatchMode__Output as _gooseai_ColorMatchMode__Output } from '../gooseai/ColorMatchMode';

export interface TransformColorAdjust {
  'brightness'?: (number | string);
  'contrast'?: (number | string);
  'hue'?: (number | string);
  'saturation'?: (number | string);
  'lightness'?: (number | string);
  'matchImage'?: (_gooseai_Artifact | null);
  'matchMode'?: (_gooseai_ColorMatchMode);
  'noiseAmount'?: (number | string);
  'noiseSeed'?: (number);
  '_brightness'?: "brightness";
  '_contrast'?: "contrast";
  '_hue'?: "hue";
  '_saturation'?: "saturation";
  '_lightness'?: "lightness";
  '_matchImage'?: "matchImage";
  '_matchMode'?: "matchMode";
  '_noiseAmount'?: "noiseAmount";
  '_noiseSeed'?: "noiseSeed";
}

export interface TransformColorAdjust__Output {
  'brightness'?: (number);
  'contrast'?: (number);
  'hue'?: (number);
  'saturation'?: (number);
  'lightness'?: (number);
  'matchImage'?: (_gooseai_Artifact__Output | null);
  'matchMode'?: (_gooseai_ColorMatchMode__Output);
  'noiseAmount'?: (number);
  'noiseSeed'?: (number);
  '_brightness': "brightness";
  '_contrast': "contrast";
  '_hue': "hue";
  '_saturation': "saturation";
  '_lightness': "lightness";
  '_matchImage': "matchImage";
  '_matchMode': "matchMode";
  '_noiseAmount': "noiseAmount";
  '_noiseSeed': "noiseSeed";
}
