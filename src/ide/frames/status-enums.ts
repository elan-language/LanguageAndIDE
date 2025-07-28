export enum ParseStatus {
  invalid,
  empty,
  incomplete,
  valid,
  default,
}

export enum CompileStatus {
  error,
  unknown_symbol,
  ok,
  default,
}

export enum TestStatus {
  error,
  fail,
  ignored,
  running,
  pass,
  default,
}

export enum RunStatus {
  error,
  paused,
  running,
  default,
}

//Set of generic status values that drive the 'traffic light' rendering in code and status panel
export enum DisplayColour {
  error,
  warning,
  ok,
  none,
}

export enum BreakpointStatus {
  none,
  disabled,
  active,
  singlestep,
}

export enum BreakpointEvent {
  clear,
  activate,
  disable,
}
