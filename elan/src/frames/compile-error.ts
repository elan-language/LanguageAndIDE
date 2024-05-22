export class CompileError {
  constructor(
    public readonly message: string,
    public readonly locationId: string,
    public readonly unknownType: boolean,
  ) {
    console.warn(`Compile Error:  ${message} ${locationId}`);
  }
}

export class TypeCompileError extends CompileError {
  constructor(type: string, location: string, unknown: boolean) {
    super(`Expression must be ${type}`, location, unknown);
  }

  priority = 0;
}

export class ArraySizeCompileError extends CompileError {
  constructor(location: string) {
    super(`Array requires 1 or 2 parameters`, location, false);
  }

  priority = 1;
}

export class MultipleElseCompileError extends CompileError {
  constructor(location: string) {
    super(`Cannot have multiple unconditional 'Else'`, location, false);
  }

  priority = 2;
}

export class MissingElseCompileError extends CompileError {
  constructor(location: string) {
    super(`Must end with unconditional 'Else'`, location, false);
  }

  priority = 3;
}

export class UndefinedSymbolCompileError extends CompileError {
  constructor(id : string, location: string) {
    super(`${id} is not defined`, location, true);
  }

  priority = 4;
}

export class NotCallableCompileError extends CompileError {
  constructor(id : string, location: string, imPure : boolean, unknown : boolean) {
    const impStr = imPure ? " imPure" : "";
    super(`Cannot call${impStr} ${id}`, location, unknown);
  }

  priority = 4;
}
