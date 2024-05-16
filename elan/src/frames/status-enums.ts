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
  fail,
  pending,
  pass,
  default,
}

export enum RunStatus {
  error,
  paused,
  running,
  default,
}

export enum OverallStatus {
  error,
  warning,
  ok,
  default,
}
