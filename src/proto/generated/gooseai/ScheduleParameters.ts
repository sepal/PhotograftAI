// Original file: stabilityai/generation.proto


export interface ScheduleParameters {
  'start'?: (number | string);
  'end'?: (number | string);
  'value'?: (number | string);
  '_start'?: "start";
  '_end'?: "end";
  '_value'?: "value";
}

export interface ScheduleParameters__Output {
  'start'?: (number);
  'end'?: (number);
  'value'?: (number);
  '_start': "start";
  '_end': "end";
  '_value': "value";
}
