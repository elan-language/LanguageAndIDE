export abstract class CompileError {
  constructor(
    public readonly priority: number,
    public readonly message: string,
    public readonly locationId: string,
    public readonly unknownType: boolean,
  ) {
    console.warn(this.toString());
  }

  public toString() {
    return `Compile Error: ${this.constructor.name} ${this.message} Priority: ${this.priority}/${this.unknownType ? "un" : ""}known  at: ${this.locationId}`;
  }

  public sameError(other: CompileError) {
    return this.toString() === other.toString();
  }
}

export class TypeCompileError extends CompileError {
  constructor(type: string, location: string, unknown: boolean) {
    super(0, `Expression must be ${type}`, location, unknown);
  }
}

export class TypesCompileError extends CompileError {
  constructor(
    type1: string,
    type2: string,
    location: string,
    unknown: boolean,
  ) {
    super(1, `Incompatible types ${type1} to ${type2}`, location, unknown);
  }
}

export class ArraySizeCompileError extends CompileError {
  constructor(location: string) {
    super(2, `Array requires 1 or 2 parameters`, location, false);
  }
}

export class MultipleElseCompileError extends CompileError {
  constructor(location: string) {
    super(3, `Cannot have multiple unconditional 'Else'`, location, false);
  }
}

export class MissingElseCompileError extends CompileError {
  constructor(location: string) {
    super(4, `Must end with unconditional 'Else'`, location, false);
  }
}

export class UndefinedSymbolCompileError extends CompileError {
  constructor(id: string, location: string) {
    super(5, `${id} is not defined`, location, true);
  }
}

export class NotCallableCompileError extends CompileError {
  constructor(id: string, location: string, imPure: boolean, unknown: boolean) {
    const impStr = imPure ? " impure" : "";
    super(6, `Cannot call${impStr} ${id}`, location, unknown);
  }
}

export class NotIndexableCompileError extends CompileError {
  constructor(type: string, location: string, unknown: boolean) {
    super(7, `Cannot index ${type}`, location, unknown);
  }
}

export class NotIterableCompileError extends CompileError {
  constructor(type: string, location: string, unknown: boolean) {
    super(8, `Cannot iterate ${type}`, location, unknown);
  }
}

export class MustBeAbstractCompileError extends CompileError {
  constructor(type: string, location: string) {
    super(9, `Superclass ${type} must be abstract`, location, false);
  }
}

export class PrivatePropertyCompileError extends CompileError {
  constructor(id: string, location: string) {
    super(10, `Cannot reference private property ${id}`, location, false);
  }
}

export class MustImplementCompileError extends CompileError {
  constructor(
    classType: string,
    superClassType: string,
    id: string,
    location: string,
  ) {
    super(
      11,
      `${classType} must implement ${superClassType}.${id}`,
      location,
      false,
    );
  }
}

export class MustBeConcreteCompileError extends CompileError {
  constructor(type: string, location: string) {
    super(12, `${type} must be concrete to new`, location, false);
  }
}

export class ExtensionCompileError extends CompileError {
  constructor(location: string) {
    super(13, `Cannot call extension method directly`, location, false);
  }
}

export class ParametersCompileError extends CompileError {
  constructor(expected: number, actual: number, location: string) {
    super(
      14,
      `Parameters expected: ${expected} got: ${actual}`,
      location,
      false,
    );
  }
}

export class MutateCompileError extends CompileError {
  constructor(thing: string, location: string) {
    super(15, `May not mutate ${thing}`, location, false);
  }
}

export class ReassignCompileError extends CompileError {
  constructor(thing: string, location: string) {
    super(16, `May not reassign ${thing}`, location, false);
  }
}

export class DuplicateKeyCompileError extends CompileError {
  constructor(location: string) {
    super(17, `Duplicate Dictionary key(s)`, location, false);
  }
}

export class ArrayCompileError extends CompileError {
  constructor(location: string) {
    super(18, `May not pass Array into function`, location, false);
  }
}
