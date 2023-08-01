// Original file: stabilityai/generation.proto


export interface TransformDepthCalc {
  'blendWeight'?: (number | string);
  'blurRadius'?: (number);
  'reverse'?: (boolean);
  '_blendWeight'?: "blendWeight";
  '_blurRadius'?: "blurRadius";
  '_reverse'?: "reverse";
}

export interface TransformDepthCalc__Output {
  'blendWeight'?: (number);
  'blurRadius'?: (number);
  'reverse'?: (boolean);
  '_blendWeight': "blendWeight";
  '_blurRadius': "blurRadius";
  '_reverse': "reverse";
}
