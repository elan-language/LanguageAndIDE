export enum Priority {
  illegalOperation,
  unknownIdentifier,
  typeError,
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
    return this.basePriority === Priority.illegalOperation
      ? this.unknownType
        ? Priority.typeError
        : Priority.illegalOperation
      : this.basePriority;
  }

  public toString() {
    return `${this.constructor.name}: ${this.message} Priority: ${Priority[this.priority]}  at: ${this.locationId}`;
  }

  public sameError(other: CompileError) {
    return this.toString() === other.toString();
  }
}

export class TypeCompileError extends CompileError {
  constructor(type: string, location: string, unknown: boolean) {
    super(Priority.typeError, `Expression must be ${type}`, location, unknown);
  }
}

export class TypesCompileError extends CompileError {
  constructor(type1: string, type2: string, location: string, unknown: boolean) {
    super(Priority.typeError, `Incompatible types ${type1} to ${type2}`, location, unknown);
  }
}

export class ArraySizeCompileError extends CompileError {
  constructor(location: string) {
    super(Priority.illegalOperation, `ArrayList requires 1 or 2 parameters`, location, false);
  }
}

export class SyntaxCompileError extends CompileError {
  constructor(message: string, location: string) {
    super(Priority.illegalOperation, message, location, false);
  }
}

export class UndefinedSymbolCompileError extends CompileError {
  constructor(id: string, location: string) {
    super(Priority.unknownIdentifier, `${id} is not defined`, location, true);
  }
}

export class NotCallableCompileError extends CompileError {
  constructor(id: string, location: string, imPure: boolean, unknown: boolean) {
    const impStr = imPure ? " impure" : "";
    super(Priority.illegalOperation, `Cannot call${impStr} ${id}`, location, unknown);
  }
}

export class NotIndexableCompileError extends CompileError {
  constructor(type: string, location: string, unknown: boolean) {
    super(Priority.illegalOperation, `Cannot index ${type}`, location, unknown);
  }
}

export class NotNewableCompileError extends CompileError {
  constructor(type: string, location: string, unknown: boolean) {
    super(Priority.illegalOperation, `Cannot new ${type}`, location, unknown);
  }
}

export class NotIterableCompileError extends CompileError {
  constructor(type: string, location: string, unknown: boolean) {
    super(Priority.illegalOperation, `Cannot iterate ${type}`, location, unknown);
  }
}

export class MustBeAbstractCompileError extends CompileError {
  constructor(type: string, location: string) {
    super(Priority.illegalOperation, `Superclass ${type} must be abstract`, location, false);
  }
}

export class PrivatePropertyCompileError extends CompileError {
  constructor(id: string, location: string) {
    super(Priority.illegalOperation, `Cannot reference private property ${id}`, location, false);
  }
}

export class MustImplementCompileError extends CompileError {
  constructor(classType: string, superClassType: string, id: string, location: string) {
    super(
      Priority.illegalOperation,
      `${classType} must implement ${superClassType}.${id}`,
      location,
      false,
    );
  }
}

export class MustBeConcreteCompileError extends CompileError {
  constructor(type: string, location: string) {
    super(Priority.illegalOperation, `${type} must be concrete to new`, location, false);
  }
}

export class MustBeImmutableCompileError extends CompileError {
  constructor(type: string, location: string, unknown: boolean) {
    super(Priority.typeError, `${type} must be immutable`, location, unknown);
  }
}

export class ExtensionCompileError extends CompileError {
  constructor(location: string) {
    super(Priority.illegalOperation, `Cannot call extension method directly`, location, false);
  }
}

export class ParametersCompileError extends CompileError {
  constructor(expected: number, actual: number, location: string) {
    super(
      Priority.illegalOperation,
      `Parameters expected: ${expected} got: ${actual}`,
      location,
      false,
    );
  }
}

export class MutateCompileError extends CompileError {
  constructor(thing: string, location: string) {
    super(Priority.illegalOperation, `May not mutate ${thing}`, location, false);
  }
}

export class NotUniqueNameCompileError extends CompileError {
  constructor(name: string, location: string) {
    super(Priority.illegalOperation, `Name ${name} not unique in scope`, location, false);
  }
}

export class ReassignCompileError extends CompileError {
  constructor(thing: string, location: string) {
    super(Priority.illegalOperation, `May not reassign ${thing}`, location, false);
  }
}

export class DuplicateKeyCompileError extends CompileError {
  constructor(location: string) {
    super(Priority.typeError, `Duplicate Dictionary key(s)`, location, false);
  }
}

export class PrintFunctionCompileError extends CompileError {
  constructor(location: string) {
    super(
      Priority.typeError,
      `Cannot print a function. To print the result of evaluating a function, add brackets after function name.`,
      location,
      false,
    );
  }
}
