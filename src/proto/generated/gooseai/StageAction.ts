// Original file: stabilityai/generation.proto

export const StageAction = {
  STAGE_ACTION_PASS: 'STAGE_ACTION_PASS',
  STAGE_ACTION_DISCARD: 'STAGE_ACTION_DISCARD',
  STAGE_ACTION_RETURN: 'STAGE_ACTION_RETURN',
} as const;

export type StageAction =
  | 'STAGE_ACTION_PASS'
  | 0
  | 'STAGE_ACTION_DISCARD'
  | 1
  | 'STAGE_ACTION_RETURN'
  | 2

export type StageAction__Output = typeof StageAction[keyof typeof StageAction]
