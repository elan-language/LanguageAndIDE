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
    public readonly isWarning: boolean,
  ) {}

  //
  public get priority() {
    return this.basePriority === Priority.illegalOperation
      ? this.isWarning
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

export class MemberTypeCompileError extends CompileError {
  constructor(name: string, type: string, location: string, unknown: boolean) {
    super(Priority.typeError, `Member '${name}' must be of type ${type}`, location, unknown);
  }
}

export class TypesCompileError extends CompileError {
  constructor(type1: string, type2: string, addInfo: string, location: string, unknown: boolean) {
    super(
      Priority.typeError,
      `Incompatible types ${type1} to ${type2}${addInfo}`,
      location,
      unknown,
    );
  }
}

export class ArraySizeCompileError extends CompileError {
  constructor(location: string) {
    super(Priority.illegalOperation, `Array requires 1 or 2 parameters`, location, false);
  }
}

export class SyntaxCompileError extends CompileError {
  constructor(message: string, location: string) {
    super(Priority.illegalOperation, message, location, false);
  }
}

export class UndefinedSymbolCompileError extends CompileError {
  constructor(id: string, type: string, location: string) {
    const postfix = type ? ` for type '${type}'` : "";
    super(Priority.unknownIdentifier, `'${id}' is not defined${postfix}`, location, true);
  }
}

export class CannotCallAFunction extends CompileError {
  constructor(location: string, unknown: boolean) {
    super(Priority.illegalOperation, `Cannot call a function as a procedure`, location, unknown);
  }
}

export class CannotUseSystemMethodInAFunction extends CompileError {
  constructor(location: string, unknown: boolean) {
    super(Priority.illegalOperation, `Cannot use a system method in a function`, location, unknown);
  }
}

export class CannotUseLikeAFunction extends CompileError {
  constructor(id: string, location: string, unknown: boolean) {
    super(
      Priority.illegalOperation,
      `Cannot call procedure '${id}' within an expression`,
      location,
      unknown,
    );
  }
}

export class CannotCallAsAMethod extends CompileError {
  constructor(id: string, symbolType: string, location: string, unknown: boolean) {
    super(
      Priority.illegalOperation,
      `Cannot invoke ${symbolType} '${id}' as a method`,
      location,
      unknown,
    );
  }
}

export class NotIndexableCompileError extends CompileError {
  constructor(type: string, location: string, unknown: boolean) {
    super(Priority.illegalOperation, `Cannot index ${type}`, location, unknown);
  }
}

export class NotRangeableCompileError extends CompileError {
  constructor(type: string, location: string, unknown: boolean) {
    super(Priority.illegalOperation, `Cannot range ${type}`, location, unknown);
  }
}

export class NotNewableCompileError extends CompileError {
  constructor(type: string, location: string, unknown: boolean) {
    super(Priority.typeError, `Cannot new ${type}`, location, unknown);
  }
}

export class NotIterableCompileError extends CompileError {
  constructor(type: string, location: string, unknown: boolean) {
    super(Priority.illegalOperation, `Cannot iterate ${type}`, location, unknown);
  }
}

export class MustBeAbstractCompileError extends CompileError {
  constructor(type: string, location: string) {
    super(
      Priority.illegalOperation,
      `Superclass '${type}' must be inheritable class`,
      location,
      false,
    );
  }
}

export class MustBeInterfaceCompileError extends CompileError {
  constructor(type: string, location: string) {
    super(Priority.illegalOperation, `Superclass '${type}' must be an interface`, location, false);
  }
}

export class MustNotBeCircularDependencyCompileError extends CompileError {
  constructor(type: string, location: string) {
    super(
      Priority.illegalOperation,
      `Class/interface '${type}' cannot inherit from itself`,
      location,
      false,
    );
  }
}

export class MustBeSingleAbstractCompileError extends CompileError {
  constructor(types: string[], location: string) {
    super(
      Priority.illegalOperation,
      `There must be only one abstract superclass, ${types.join(", ")} are abstract classes`,
      location,
      false,
    );
  }
}

export class PrivateMemberCompileError extends CompileError {
  constructor(id: string, location: string) {
    super(Priority.illegalOperation, `Cannot reference private member '${id}'`, location, false);
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

export class MustBeRecordCompileError extends CompileError {
  constructor(type: string, location: string, unknown: boolean) {
    super(Priority.typeError, `${type} must be a record to use 'with'`, location, unknown);
  }
}

export class OutParameterCompileError extends CompileError {
  constructor(name: string, location: string, unknown: boolean) {
    super(Priority.typeError, `Cannot pass '${name}' as an out parameter`, location, unknown);
  }
}

export class ExtensionCompileError extends CompileError {
  constructor(location: string) {
    super(Priority.illegalOperation, `Cannot call extension method directly`, location, false);
  }
}

export class MissingParameterCompileError extends CompileError {
  constructor(description: string, location: string) {
    const priority = Priority.unknownIdentifier;
    const unknown = true;
    super(priority, `Missing argument(s). Expected: ${description}`, location, unknown);
  }
}

export class ExtraParameterCompileError extends CompileError {
  constructor(description: string, location: string) {
    const priority = Priority.illegalOperation;
    const unknown = false;
    description = description ? description : "none";
    super(priority, `Too many argument(s). Expected: ${description}`, location, unknown);
  }
}

export class ParameterTypesCompileError extends CompileError {
  constructor(description: string, provided: string, location: string) {
    const priority = Priority.typeError;
    const unknown = false;
    super(
      priority,
      `Argument types expected: ${description} Provided: ${provided}`,
      location,
      unknown,
    );
  }
}

export class ParametersCompileError extends CompileError {
  constructor(expected: number, actual: number, location: string, generic?: boolean) {
    const priority = actual < expected ? Priority.unknownIdentifier : Priority.illegalOperation;
    const unknown = priority === Priority.unknownIdentifier;
    super(
      priority,
      `${generic ? "<of Type(s)>" : "Parameters"} expected: ${expected} got: ${actual}`,
      location,
      unknown,
    );
  }
}

export class SignatureCompileError extends CompileError {
  constructor(expected: number, actual: number, location: string) {
    super(
      Priority.illegalOperation,
      `Function Signatures do not match expected: ${expected} parameter(s) got: ${actual}`,
      location,
      false,
    );
  }
}

export class MutateCompileError extends CompileError {
  constructor(name: string, purpose: string, location: string) {
    super(Priority.illegalOperation, `May not re-assign the ${purpose} '${name}'`, location, false);
  }
}

export class NotUniqueNameCompileError extends CompileError {
  constructor(name: string, postFix: string, location: string) {
    super(
      Priority.illegalOperation,
      `Name '${name}' not unique in scope${postFix}`,
      location,
      false,
    );
  }
}

export class ReassignInFunctionCompileError extends CompileError {
  constructor(thing: string, location: string) {
    super(Priority.illegalOperation, `May not set ${thing} in a function`, location, false);
  }
}

export class RedefinedCompileError extends CompileError {
  constructor(id: string, purpose: string, location: string) {
    super(
      Priority.illegalOperation,
      `The identifier '${id}' is already used for a ${purpose} and cannot be re-defined here.`,
      location,
      false,
    );
  }
}

export class IndexCompileError extends CompileError {
  constructor(thing: string, location: string) {
    super(
      Priority.illegalOperation,
      `May not set an indexed value in a function: ${thing}`,
      location,
      false,
    );
  }
}

export class DuplicateKeyCompileError extends CompileError {
  constructor(location: string) {
    super(Priority.typeError, `Duplicate Dictionary key(s)`, location, false);
  }
}

export class DuplicateIdsCompileError extends CompileError {
  constructor(ids: string[], location: string) {
    super(Priority.typeError, `Duplicate inherited ids: ${ids.join(", ")}`, location, false);
  }
}

export class FunctionRefCompileError extends CompileError {
  constructor(id: string, location: string) {
    super(
      Priority.illegalOperation,
      `To evaluate function '${id}' add brackets. Or to create a reference to '${id}', precede it by 'ref'`,
      location,
      false,
    );
  }
}

export class UnknownCompilerDirectiveCompileError extends CompileError {
  constructor(_directive: string, location: string) {
    super(
      Priority.illegalOperation,
      `a comment may not start with [ unless it is a recognised compiler directive`,
      location,
      false,
    );
  }
}
