// Original file: stabilityai/generation.proto

import type { ClassifierConcept as _gooseai_ClassifierConcept, ClassifierConcept__Output as _gooseai_ClassifierConcept__Output } from '../gooseai/ClassifierConcept';
import type { Action as _gooseai_Action, Action__Output as _gooseai_Action__Output } from '../gooseai/Action';
import type { ClassifierMode as _gooseai_ClassifierMode, ClassifierMode__Output as _gooseai_ClassifierMode__Output } from '../gooseai/ClassifierMode';

export interface ClassifierCategory {
  'name'?: (string);
  'concepts'?: (_gooseai_ClassifierConcept)[];
  'adjustment'?: (number | string);
  'action'?: (_gooseai_Action);
  'classifierMode'?: (_gooseai_ClassifierMode);
  '_adjustment'?: "adjustment";
  '_action'?: "action";
  '_classifierMode'?: "classifierMode";
}

export interface ClassifierCategory__Output {
  'name': (string);
  'concepts': (_gooseai_ClassifierConcept__Output)[];
  'adjustment'?: (number);
  'action'?: (_gooseai_Action__Output);
  'classifierMode'?: (_gooseai_ClassifierMode__Output);
  '_adjustment': "adjustment";
  '_action': "action";
  '_classifierMode': "classifierMode";
}
