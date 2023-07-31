// Original file: stabilityai/generation.proto

import type { ModelArchitecture as _gooseai_ModelArchitecture, ModelArchitecture__Output as _gooseai_ModelArchitecture__Output } from '../gooseai/ModelArchitecture';

export interface Model {
  'architecture'?: (_gooseai_ModelArchitecture);
  'publisher'?: (string);
  'dataset'?: (string);
  'version'?: (number | string);
  'semanticVersion'?: (string);
  'alias'?: (string);
}

export interface Model__Output {
  'architecture': (_gooseai_ModelArchitecture__Output);
  'publisher': (string);
  'dataset': (string);
  'version': (number);
  'semanticVersion': (string);
  'alias': (string);
}
