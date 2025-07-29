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

export enum RunStatus {
  error,
  paused,
  running,
  input,
  default,
}

//Set of generic status values that drive the 'traffic light' rendering in code and status panel
export enum DisplayColour {
  error,
  warning,
  ok,
  none,
}
