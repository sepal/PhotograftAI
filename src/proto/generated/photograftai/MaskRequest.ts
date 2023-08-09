// Original file: photograft.proto


export interface MaskRequest {
  'image'?: (string);
  'points'?: (Buffer | Uint8Array | string);
}

export interface MaskRequest__Output {
  'image': (string);
  'points': (Buffer);
}
