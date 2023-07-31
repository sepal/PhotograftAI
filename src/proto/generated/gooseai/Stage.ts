// Original file: stabilityai/generation.proto

import type { Request as _gooseai_Request, Request__Output as _gooseai_Request__Output } from '../gooseai/Request';
import type { OnStatus as _gooseai_OnStatus, OnStatus__Output as _gooseai_OnStatus__Output } from '../gooseai/OnStatus';

export interface Stage {
  'id'?: (string);
  'request'?: (_gooseai_Request | null);
  'onStatus'?: (_gooseai_OnStatus)[];
}

export interface Stage__Output {
  'id': (string);
  'request': (_gooseai_Request__Output | null);
  'onStatus': (_gooseai_OnStatus__Output)[];
}
