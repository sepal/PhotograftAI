// Original file: stabilityai/generation.proto

import type { CutoutParameters as _gooseai_CutoutParameters, CutoutParameters__Output as _gooseai_CutoutParameters__Output } from '../gooseai/CutoutParameters';

export interface CutoutParameters {
  'cutouts'?: (_gooseai_CutoutParameters)[];
  'count'?: (number);
  'gray'?: (number | string);
  'blur'?: (number | string);
  'sizePower'?: (number | string);
  '_count'?: "count";
  '_gray'?: "gray";
  '_blur'?: "blur";
  '_sizePower'?: "sizePower";
}

export interface CutoutParameters__Output {
  'cutouts': (_gooseai_CutoutParameters__Output)[];
  'count'?: (number);
  'gray'?: (number);
  'blur'?: (number);
  'sizePower'?: (number);
  '_count': "count";
  '_gray': "gray";
  '_blur': "blur";
  '_sizePower': "sizePower";
}
