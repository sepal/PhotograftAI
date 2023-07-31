// Original file: stabilityai/tensors.proto

export const Dtype = {
  DT_INVALID: 'DT_INVALID',
  DT_FLOAT32: 'DT_FLOAT32',
  DT_FLOAT64: 'DT_FLOAT64',
  DT_FLOAT16: 'DT_FLOAT16',
  DT_BFLOAT16: 'DT_BFLOAT16',
  DT_COMPLEX32: 'DT_COMPLEX32',
  DT_COMPLEX64: 'DT_COMPLEX64',
  DT_COMPLEX128: 'DT_COMPLEX128',
  DT_UINT8: 'DT_UINT8',
  DT_INT8: 'DT_INT8',
  DT_INT16: 'DT_INT16',
  DT_INT32: 'DT_INT32',
  DT_INT64: 'DT_INT64',
  DT_BOOL: 'DT_BOOL',
  DT_QUINT8: 'DT_QUINT8',
  DT_QINT8: 'DT_QINT8',
  DT_QINT32: 'DT_QINT32',
  DT_QUINT4_2: 'DT_QUINT4_2',
} as const;

export type Dtype =
  | 'DT_INVALID'
  | 0
  | 'DT_FLOAT32'
  | 1
  | 'DT_FLOAT64'
  | 2
  | 'DT_FLOAT16'
  | 3
  | 'DT_BFLOAT16'
  | 4
  | 'DT_COMPLEX32'
  | 5
  | 'DT_COMPLEX64'
  | 6
  | 'DT_COMPLEX128'
  | 7
  | 'DT_UINT8'
  | 8
  | 'DT_INT8'
  | 9
  | 'DT_INT16'
  | 10
  | 'DT_INT32'
  | 11
  | 'DT_INT64'
  | 12
  | 'DT_BOOL'
  | 13
  | 'DT_QUINT8'
  | 14
  | 'DT_QINT8'
  | 15
  | 'DT_QINT32'
  | 16
  | 'DT_QUINT4_2'
  | 17

export type Dtype__Output = typeof Dtype[keyof typeof Dtype]
