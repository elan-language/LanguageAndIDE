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
  ) {}

  public get isWarning() {
    return this.basePriority === Priority.unknownIdentifier;
  }

  //
  public get priority() {
    return this.basePriority;
  }

  public toString() {
    return `${this.constructor.name}: ${this.message} Priority: ${Priority[this.priority]}  at: ${this.locationId}`;
  }

  public sameError(other: CompileError) {
    return this.toString() === other.toString();
  }
}

export class TypeCompileError extends CompileError {
  constructor(type: string, location: string) {
    super(Priority.typeError, `Expression must be ${type}`, location);
  }
}

export class ThisCompileError extends CompileError {
  constructor(location: string) {
    super(Priority.illegalOperation, `Cannot use 'this' outside class context`, location);
  }
}

export class DeclaredAboveCompileError extends CompileError {
  constructor(type: string, location: string) {
    super(
      Priority.illegalOperation,
      `Abstract Class '${type}' must be declared before it is used`,
      location,
    );
  }
}

export class MemberTypeCompileError extends CompileError {
  constructor(name: string, type: string, location: string) {
    super(Priority.typeError, `Member '${name}' must be of type ${type}`, location);
  }
}

export class TypesCompileError extends CompileError {
  constructor(type1: string, type2: string, addInfo: string, location: string) {
    super(
      Priority.typeError,
      `Incompatible types. Expected: ${type2}${addInfo} Provided: ${type1}`,
      location,
    );
  }
}

export class TernaryCompileError extends CompileError {
  constructor(type1: string, type2: string, location: string) {
    super(
      Priority.typeError,
      `Cannot determine common type between ${type1} and ${type2}`,
      location,
    );
  }
}

export class ArraySizeCompileError extends CompileError {
  constructor(location: string) {
    super(Priority.illegalOperation, `Array requires 1 or 2 parameters`, location);
  }
}

export class SyntaxCompileError extends CompileError {
  constructor(message: string, location: string) {
    super(Priority.illegalOperation, message, location);
  }
}

export class UndefinedSymbolCompileError extends CompileError {
  constructor(id: string, type: string, location: string) {
    const postfix = type ? ` for type '${type}'` : "";
    super(Priority.unknownIdentifier, `'${id}' is not defined${postfix}`, location);
  }
}

export class CannotCallAFunction extends CompileError {
  constructor(location: string) {
    super(Priority.illegalOperation, `Cannot call a function as a procedure`, location);
  }
}

export class CannotUseSystemMethodInAFunction extends CompileError {
  constructor(location: string) {
    super(Priority.illegalOperation, `Cannot use a system method in a function`, location);
  }
}

export class CannotUseLikeAFunction extends CompileError {
  constructor(id: string, location: string) {
    super(
      Priority.illegalOperation,
      `Cannot call procedure '${id}' within an expression`,
      location,
    );
  }
}

export class CannotCallAsAMethod extends CompileError {
  constructor(id: string, symbolType: string, location: string) {
    super(Priority.illegalOperation, `Cannot invoke ${symbolType} '${id}' as a method`, location);
  }
}

export class NotIndexableCompileError extends CompileError {
  constructor(type: string, location: string) {
    super(Priority.illegalOperation, `Cannot index ${type}`, location);
  }
}

export class NotRangeableCompileError extends CompileError {
  constructor(type: string, location: string) {
    super(Priority.illegalOperation, `Cannot range ${type}`, location);
  }
}

export class NotNewableCompileError extends CompileError {
  constructor(type: string, location: string) {
    super(Priority.typeError, `Cannot new ${type}`, location);
  }
}

export class NotIterableCompileError extends CompileError {
  constructor(type: string, location: string) {
    super(Priority.illegalOperation, `Cannot iterate ${type}`, location);
  }
}

export class MustBeAbstractCompileError extends CompileError {
  constructor(type: string, location: string) {
    super(Priority.illegalOperation, `Superclass '${type}' must be inheritable class`, location);
  }
}

export class MustBeInterfaceCompileError extends CompileError {
  constructor(type: string, location: string) {
    super(Priority.illegalOperation, `Superclass '${type}' must be an interface`, location);
  }
}

export class MustNotBeCircularDependencyCompileError extends CompileError {
  constructor(type: string, location: string) {
    super(
      Priority.illegalOperation,
      `Class/interface '${type}' cannot inherit from itself`,
      location,
    );
  }
}

export class MustBeSingleAbstractCompileError extends CompileError {
  constructor(types: string[], location: string) {
    super(
      Priority.illegalOperation,
      `There must be only one abstract superclass, ${types.join(", ")} are abstract classes`,
      location,
    );
  }
}

export class PrivateMemberCompileError extends CompileError {
  constructor(id: string, location: string) {
    super(Priority.illegalOperation, `Cannot reference private member '${id}'`, location);
  }
}

export class MustImplementCompileError extends CompileError {
  constructor(classType: string, superClassType: string, id: string, location: string) {
    super(
      Priority.illegalOperation,
      `${classType} must implement ${superClassType}.${id}`,
      location,
    );
  }
}

export class MustBeConcreteCompileError extends CompileError {
  constructor(type: string, location: string) {
    super(Priority.illegalOperation, `${type} must be concrete to new`, location);
  }
}

export class MustBeRecordCompileError extends CompileError {
  constructor(type: string, location: string) {
    super(Priority.typeError, `${type} must be a record to use 'with'`, location);
  }
}

export class OutParameterCompileError extends CompileError {
  constructor(name: string, location: string) {
    super(Priority.typeError, `Cannot pass '${name}' as an out parameter`, location);
  }
}

export class ExtensionCompileError extends CompileError {
  constructor(location: string) {
    super(Priority.illegalOperation, `Cannot call extension method directly`, location);
  }
}

export class PropertyCompileError extends CompileError {
  constructor(location: string) {
    super(Priority.illegalOperation, `Cannot prefix function with 'property'`, location);
  }
}

export class MissingParameterCompileError extends CompileError {
  constructor(description: string, location: string) {
    const priority = Priority.unknownIdentifier;
    super(priority, `Missing argument(s). Expected: ${description}`, location);
  }
}

export class ExtraParameterCompileError extends CompileError {
  constructor(description: string, location: string) {
    const priority = Priority.illegalOperation;
    description = description ? description : "none";
    super(priority, `Too many argument(s). Expected: ${description}`, location);
  }
}

export class ParameterTypesCompileError extends CompileError {
  constructor(description: string, provided: string, location: string) {
    const priority = Priority.typeError;
    super(priority, `Argument types. Expected: ${description} Provided: ${provided}`, location);
  }
}

export class ParametersCompileError extends CompileError {
  constructor(expected: number, actual: number, location: string, generic?: boolean) {
    const priority = actual < expected ? Priority.unknownIdentifier : Priority.illegalOperation;
    super(
      priority,
      `${generic ? "<of Type(s)>" : "Parameters"} Expected: ${expected} Provided: ${actual}`,
      location,
    );
  }
}

export class SignatureCompileError extends CompileError {
  constructor(expected: number, actual: number, location: string) {
    super(
      Priority.illegalOperation,
      `Function Signatures do not match. Expected: ${expected} parameter(s) Provided: ${actual}`,
      location,
    );
  }
}

export class MutateCompileError extends CompileError {
  constructor(name: string, purpose: string, location: string) {
    super(Priority.illegalOperation, `May not re-assign the ${purpose} '${name}'`, location);
  }
}

export class NotUniqueNameCompileError extends CompileError {
  constructor(name: string, postFix: string, location: string) {
    super(Priority.illegalOperation, `Name '${name}' not unique in scope${postFix}`, location);
  }
}

export class ReassignInFunctionCompileError extends CompileError {
  constructor(thing: string, location: string) {
    super(Priority.illegalOperation, `May not set ${thing} in a function`, location);
  }
}

export class RedefinedCompileError extends CompileError {
  constructor(id: string, purpose: string, location: string) {
    super(
      Priority.illegalOperation,
      `The identifier '${id}' is already used for a ${purpose} and cannot be re-defined here.`,
      location,
    );
  }
}

export class IndexCompileError extends CompileError {
  constructor(thing: string, location: string) {
    super(
      Priority.illegalOperation,
      `May not set an indexed value in a function: ${thing}`,
      location,
    );
  }
}

export class DuplicateKeyCompileError extends CompileError {
  constructor(location: string) {
    super(Priority.typeError, `Duplicate Dictionary key(s)`, location);
  }
}

export class DuplicateIdsCompileError extends CompileError {
  constructor(ids: string[], location: string) {
    super(Priority.typeError, `Duplicate inherited ids: ${ids.join(", ")}`, location);
  }
}

export class FunctionRefCompileError extends CompileError {
  constructor(id: string, location: string) {
    super(
      Priority.illegalOperation,
      `To evaluate function '${id}' add brackets. Or to create a reference to '${id}', precede it by 'ref'`,
      location,
    );
  }
}

export class UnknownCompilerDirectiveCompileError extends CompileError {
  constructor(_directive: string, location: string) {
    super(
      Priority.illegalOperation,
      `a comment may not start with [ unless it is a recognised compiler directive`,
      location,
    );
  }
}
