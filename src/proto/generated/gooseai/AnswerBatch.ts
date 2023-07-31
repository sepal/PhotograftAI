// Original file: stabilityai/generation.proto

import type { Answer as _gooseai_Answer, Answer__Output as _gooseai_Answer__Output } from '../gooseai/Answer';

export interface AnswerBatch {
  'batchId'?: (string);
  'answers'?: (_gooseai_Answer)[];
}

export interface AnswerBatch__Output {
  'batchId': (string);
  'answers': (_gooseai_Answer__Output)[];
}
