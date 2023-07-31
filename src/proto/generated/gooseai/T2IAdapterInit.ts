// Original file: stabilityai/generation.proto

export const T2IAdapterInit = {
  T2IADAPTERINIT_IMAGE: 'T2IADAPTERINIT_IMAGE',
  T2IADAPTERINIT_ADAPTER_IMAGE: 'T2IADAPTERINIT_ADAPTER_IMAGE',
} as const;

export type T2IAdapterInit =
  | 'T2IADAPTERINIT_IMAGE'
  | 0
  | 'T2IADAPTERINIT_ADAPTER_IMAGE'
  | 1

export type T2IAdapterInit__Output = typeof T2IAdapterInit[keyof typeof T2IAdapterInit]
