// Original file: stabilityai/generation.proto


// Original file: stabilityai/generation.proto

export const _gooseai_ContentCredentialsParameters_ModelMetadata = {
  MODEL_METADATA_UNSPECIFIED: 'MODEL_METADATA_UNSPECIFIED',
  MODEL_METADATA_SIGN_WITH_ENGINE_ID: 'MODEL_METADATA_SIGN_WITH_ENGINE_ID',
} as const;

export type _gooseai_ContentCredentialsParameters_ModelMetadata =
  | 'MODEL_METADATA_UNSPECIFIED'
  | 0
  | 'MODEL_METADATA_SIGN_WITH_ENGINE_ID'
  | 1

export type _gooseai_ContentCredentialsParameters_ModelMetadata__Output = typeof _gooseai_ContentCredentialsParameters_ModelMetadata[keyof typeof _gooseai_ContentCredentialsParameters_ModelMetadata]

export interface ContentCredentialsParameters {
  'modelMetadata'?: (_gooseai_ContentCredentialsParameters_ModelMetadata);
  'parameters'?: "modelMetadata";
}

export interface ContentCredentialsParameters__Output {
  'modelMetadata'?: (_gooseai_ContentCredentialsParameters_ModelMetadata__Output);
  'parameters': "modelMetadata";
}
