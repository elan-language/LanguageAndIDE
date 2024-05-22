export enum Priority {
  illegal,
  unknown,
  type,
}

export abstract class CompileError {
  constructor(
    private readonly basePriority: Priority,
    public readonly message: string,
    public readonly locationId: string,
    public readonly unknownType: boolean,
  ) {
    console.warn(this.toString());
  }

  public get priority() {
    return this.basePriority === Priority.illegal
      ? this.basePriority
      : this.unknownType
        ? Priority.unknown
        : Priority.type;
  }

  public toString() {
    return `Compile Error: ${this.constructor.name} ${this.message} Priority: ${Priority[this.priority]}  at: ${this.locationId}`;
  }

  public sameError(other: CompileError) {
    return this.toString() === other.toString();
  }
}

export class TypeCompileError extends CompileError {
  constructor(type: string, location: string, unknown: boolean) {
    super(Priority.type, `Expression must be ${type}`, location, unknown);
  }
}

export class TypesCompileError extends CompileError {
  constructor(
    type1: string,
    type2: string,
    location: string,
    unknown: boolean,
  ) {
    super(
      Priority.type,
      `Incompatible types ${type1} to ${type2}`,
      location,
      unknown,
    );
  }
}

export class ArraySizeCompileError extends CompileError {
  constructor(location: string) {
    super(
      Priority.illegal,
      `Array requires 1 or 2 parameters`,
      location,
      false,
    );
  }
}

export class SyntaxCompileError extends CompileError {
  constructor(message: string, location: string) {
    super(Priority.illegal, message, location, false);
  }
}

export class UndefinedSymbolCompileError extends CompileError {
  constructor(id: string, location: string) {
    super(Priority.type, `${id} is not defined`, location, true);
  }
}

export class NotCallableCompileError extends CompileError {
  constructor(id: string, location: string, imPure: boolean, unknown: boolean) {
    const impStr = imPure ? " impure" : "";
    super(Priority.illegal, `Cannot call${impStr} ${id}`, location, unknown);
  }
}

export class NotIndexableCompileError extends CompileError {
  constructor(type: string, location: string, unknown: boolean) {
    super(Priority.illegal, `Cannot index ${type}`, location, unknown);
  }
}

export class NotIterableCompileError extends CompileError {
  constructor(type: string, location: string, unknown: boolean) {
    super(Priority.illegal, `Cannot iterate ${type}`, location, unknown);
  }
}

export class MustBeAbstractCompileError extends CompileError {
  constructor(type: string, location: string) {
    super(
      Priority.illegal,
      `Superclass ${type} must be abstract`,
      location,
      false,
    );
  }
}

export class PrivatePropertyCompileError extends CompileError {
  constructor(id: string, location: string) {
    super(
      Priority.illegal,
      `Cannot reference private property ${id}`,
      location,
      false,
    );
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
      Priority.illegal,
      `${classType} must implement ${superClassType}.${id}`,
      location,
      false,
    );
  }
}

export class MustBeConcreteCompileError extends CompileError {
  constructor(type: string, location: string) {
    super(Priority.illegal, `${type} must be concrete to new`, location, false);
  }
}

export class ExtensionCompileError extends CompileError {
  constructor(location: string) {
    super(
      Priority.illegal,
      `Cannot call extension method directly`,
      location,
      false,
    );
  }
}

export class ParametersCompileError extends CompileError {
  constructor(expected: number, actual: number, location: string) {
    super(
      Priority.illegal,
      `Parameters expected: ${expected} got: ${actual}`,
      location,
      false,
    );
  }
}

export class MutateCompileError extends CompileError {
  constructor(thing: string, location: string) {
    super(Priority.illegal, `May not mutate ${thing}`, location, false);
  }
}

export class ReassignCompileError extends CompileError {
  constructor(thing: string, location: string) {
    super(Priority.illegal, `May not reassign ${thing}`, location, false);
  }
}

export class DuplicateKeyCompileError extends CompileError {
  constructor(location: string) {
    super(Priority.type, `Duplicate Dictionary key(s)`, location, false);
  }
}

export class ArrayCompileError extends CompileError {
  constructor(location: string) {
    super(
      Priority.illegal,
      `May not pass Array into function`,
      location,
      false,
    );
  }
}
