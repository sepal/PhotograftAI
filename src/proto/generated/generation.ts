import type * as grpc from '@grpc/grpc-js';
import type { EnumTypeDefinition, MessageTypeDefinition } from '@grpc/proto-loader';

import type { GenerationServiceClient as _gooseai_GenerationServiceClient, GenerationServiceDefinition as _gooseai_GenerationServiceDefinition } from './gooseai/GenerationService';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  google: {
    protobuf: {
      ListValue: MessageTypeDefinition
      NullValue: EnumTypeDefinition
      Struct: MessageTypeDefinition
      Value: MessageTypeDefinition
    }
  }
  gooseai: {
    Action: EnumTypeDefinition
    Answer: MessageTypeDefinition
    AnswerBatch: MessageTypeDefinition
    AnswerMeta: MessageTypeDefinition
    Artifact: MessageTypeDefinition
    ArtifactType: EnumTypeDefinition
    AssetAction: EnumTypeDefinition
    AssetParameters: MessageTypeDefinition
    AssetUse: EnumTypeDefinition
    BorderMode: EnumTypeDefinition
    CameraParameters: MessageTypeDefinition
    CameraType: EnumTypeDefinition
    ChainRequest: MessageTypeDefinition
    ClassifierCategory: MessageTypeDefinition
    ClassifierConcept: MessageTypeDefinition
    ClassifierMode: EnumTypeDefinition
    ClassifierParameters: MessageTypeDefinition
    ColorMatchMode: EnumTypeDefinition
    ConditionerParameters: MessageTypeDefinition
    ContentCredentialsParameters: MessageTypeDefinition
    CutoutParameters: MessageTypeDefinition
    DiffusionSampler: EnumTypeDefinition
    FineTuningParameters: MessageTypeDefinition
    FinishReason: EnumTypeDefinition
    GenerationService: SubtypeConstructor<typeof grpc.Client, _gooseai_GenerationServiceClient> & { service: _gooseai_GenerationServiceDefinition }
    GuidanceInstanceParameters: MessageTypeDefinition
    GuidanceParameters: MessageTypeDefinition
    GuidancePreset: EnumTypeDefinition
    GuidanceScheduleParameters: MessageTypeDefinition
    ImageParameters: MessageTypeDefinition
    InterpolateMode: EnumTypeDefinition
    InterpolateParameters: MessageTypeDefinition
    MaskedAreaInit: EnumTypeDefinition
    Model: MessageTypeDefinition
    ModelArchitecture: EnumTypeDefinition
    OnStatus: MessageTypeDefinition
    Prompt: MessageTypeDefinition
    PromptParameters: MessageTypeDefinition
    RenderMode: EnumTypeDefinition
    Request: MessageTypeDefinition
    SamplerParameters: MessageTypeDefinition
    ScheduleParameters: MessageTypeDefinition
    Stage: MessageTypeDefinition
    StageAction: EnumTypeDefinition
    StepParameter: MessageTypeDefinition
    T2IAdapter: EnumTypeDefinition
    T2IAdapterInit: EnumTypeDefinition
    T2IAdapterParameter: MessageTypeDefinition
    Token: MessageTypeDefinition
    Tokens: MessageTypeDefinition
    TransformCameraPose: MessageTypeDefinition
    TransformColorAdjust: MessageTypeDefinition
    TransformDepthCalc: MessageTypeDefinition
    TransformMatrix: MessageTypeDefinition
    TransformParameters: MessageTypeDefinition
    TransformResample: MessageTypeDefinition
    TransformType: MessageTypeDefinition
    Upscaler: EnumTypeDefinition
    WeightMethod: EnumTypeDefinition
  }
  tensors: {
    Attribute: MessageTypeDefinition
    AttributeType: EnumTypeDefinition
    Dtype: EnumTypeDefinition
    Module: MessageTypeDefinition
    Tensor: MessageTypeDefinition
  }
}

