// Original file: mask_service/mask.proto


export interface GetMaskRequest {
  'image'?: (string);
  'points'?: (Buffer | Uint8Array | string);
}

export interface GetMaskRequest__Output {
  'image': (string);
  'points': (Buffer);
}
