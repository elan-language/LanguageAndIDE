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

export class TypesCompileError extends CompileError {
  constructor(type1: string, type2: string, location: string, unknown: boolean) {
    super(`Incompatible types ${type1} to ${type2}`, location, unknown);
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
    const impStr = imPure ? " impure" : "";
    super(`Cannot call${impStr} ${id}`, location, unknown);
  }

  priority = 5;
}

export class NotIndexableCompileError extends CompileError {
  constructor(type : string, location : string, unknown : boolean) {
    super(`Cannot index ${type}`, location, unknown);
  }

  priority = 6;
}

export class MustBeAbstractCompileError extends CompileError {
  constructor(type : string, location : string) {
    super(`Superclass ${type} must be abstract`, location, false);
  }

  priority = 6;
}

export class PrivatePropertyCompileError extends CompileError {
  constructor(id : string, location : string) {
    super(`Cannot reference private property ${id}`, location, false);
  }

  priority = 7;
}

export class MustImplementCompileError extends CompileError {
  constructor(classType: string, superClassType: string, id: string, location: string) {
    super(`${classType} must implement ${superClassType}.${id}`, location, false);
  }

  priority = 8;
}

export class MustBeConcreteCompileError extends CompileError {
  constructor(type : string, location: string) {
    super(`${type} must be concrete to new`, location, false);
  }

  priority = 8;
}

export class ExtensionCompileError extends CompileError {
  constructor(location: string) {
    super(`Cannot call extension method directly`, location, false);
  }

  priority = 8;
}

export class ParametersCompileError extends CompileError {
  constructor(expected: number, actual : number, location: string) {
    super(`Parameters expected: ${expected} got: ${actual}`, location, false);
  }

  priority = 8;
}

export class MutateCompileError extends CompileError {
  constructor(thing: string, location: string) {
    super(`May not mutate ${thing}`, location, false);
  }

  priority = 8;
}
