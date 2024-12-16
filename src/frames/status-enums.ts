export enum ParseStatus {
  invalid,
  empty,
  incomplete,
  valid,
  default,
}

export enum CompileStatus {
  error,
  unknownSymbol,
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
export enum DisplayStatus {
  error,
  warning,
  ok,
  default,
}
