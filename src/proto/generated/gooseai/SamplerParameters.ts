// Original file: stabilityai/generation.proto

import type { Long } from '@grpc/proto-loader';

export interface SamplerParameters {
  'eta'?: (number | string);
  'samplingSteps'?: (number | string | Long);
  'latentChannels'?: (number | string | Long);
  'downsamplingFactor'?: (number | string | Long);
  'cfgScale'?: (number | string);
  'initNoiseScale'?: (number | string);
  'stepNoiseScale'?: (number | string);
  '_eta'?: "eta";
  '_samplingSteps'?: "samplingSteps";
  '_latentChannels'?: "latentChannels";
  '_downsamplingFactor'?: "downsamplingFactor";
  '_cfgScale'?: "cfgScale";
  '_initNoiseScale'?: "initNoiseScale";
  '_stepNoiseScale'?: "stepNoiseScale";
}

export interface SamplerParameters__Output {
  'eta'?: (number);
  'samplingSteps'?: (string);
  'latentChannels'?: (string);
  'downsamplingFactor'?: (string);
  'cfgScale'?: (number);
  'initNoiseScale'?: (number);
  'stepNoiseScale'?: (number);
  '_eta': "eta";
  '_samplingSteps': "samplingSteps";
  '_latentChannels': "latentChannels";
  '_downsamplingFactor': "downsamplingFactor";
  '_cfgScale': "cfgScale";
  '_initNoiseScale': "initNoiseScale";
  '_stepNoiseScale': "stepNoiseScale";
}
