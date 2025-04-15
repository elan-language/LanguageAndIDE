import { Deprecation } from "../elan-type-interfaces";

export enum DisplayPriority {
  first,
  second,
  third,
  fourth,
}

export enum Severity {
  error,
  warning,
}

export abstract class CompileError {
  constructor(
    public readonly priority: DisplayPriority,
    public readonly severity: Severity,
    public readonly message: string,
    public readonly locationId: string,
    public readonly link: string,
  ) {}

  public toString() {
    return `${this.constructor.name}: ${this.message} Priority: ${DisplayPriority[this.priority]} Severity: ${Severity[this.severity]} at: ${this.locationId}`;
  }

  public sameError(other: CompileError) {
    return this.toString() === other.toString();
  }
}

export class TypeCompileError extends CompileError {
  constructor(type: string, location: string) {
    super(
      DisplayPriority.fourth,
      Severity.error,
      `Expression must be ${type}. <u>More Info</u>`,
      location,
      "LangRef.html#compile_error",
    );
  }
}

export class ThisCompileError extends CompileError {
  constructor(location: string) {
    super(
      DisplayPriority.second,
      Severity.error,
      `Cannot use 'this' outside class context. <u>More Info</u>`,
      location,
      "LangRef.html#compile_error",
    );
  }
}

export class DeclaredAboveCompileError extends CompileError {
  constructor(type: string, location: string) {
    super(
      DisplayPriority.second,
      Severity.error,
      `Abstract Class '${type}' must be declared before it is used. <u>More Info</u>`,
      location,
      "LangRef.html#compile_error",
    );
  }
}

export class MemberTypeCompileError extends CompileError {
  constructor(name: string, type: string, location: string) {
    super(
      DisplayPriority.fourth,
      Severity.error,
      `Member '${name}' must be of type ${type}. <u>More Info</u>`,
      location,
      "LangRef.html#compile_error",
    );
  }
}

export class TypesCompileError extends CompileError {
  constructor(type1: string, type2: string, addInfo: string, location: string) {
    super(
      DisplayPriority.fourth,
      Severity.error,
      `Incompatible types. Expected: ${type2}${addInfo} Provided: ${type1}. <u>More Info</u>`,
      location,
      "LangRef.html#compile_error",
    );
  }
}

export class TernaryCompileError extends CompileError {
  constructor(type1: string, type2: string, location: string) {
    super(
      DisplayPriority.fourth,
      Severity.error,
      `Cannot determine common type between ${type1} and ${type2}. <u>More Info</u>`,
      location,
      "LangRef.html#compile_error",
    );
  }
}

export class SyntaxCompileError extends CompileError {
  constructor(message: string, location: string) {
    super(DisplayPriority.second, Severity.error, message, location, "LangRef.html#compile_error");
  }
}

export class UndefinedSymbolCompileError extends CompileError {
  constructor(id: string, type: string, location: string) {
    const postfix = type ? ` for type '${type}'` : "";
    super(
      DisplayPriority.third,
      Severity.warning,
      `'${id}' is not defined${postfix}. <u>More Info</u>`,
      location,
      "LangRef.html#compile_error",
    );
  }
}

export class CannotCallAFunction extends CompileError {
  constructor(location: string) {
    super(
      DisplayPriority.second,
      Severity.error,
      `Cannot call a function as a procedure. <u>More Info</u>`,
      location,
      "LangRef.html#compile_error",
    );
  }
}

export class CannotUseSystemMethodInAFunction extends CompileError {
  constructor(location: string) {
    super(
      DisplayPriority.second,
      Severity.error,
      `Cannot use a system method in a function. <u>More Info</u>`,
      location,
      "LangRef.html#compile_error",
    );
  }
}

function reasonString(reason: Deprecation) {
  switch (reason) {
    case Deprecation.classRemoved:
      return "Class was removed";
    case Deprecation.classRenamed:
      return "Class was renamed";
    case Deprecation.methodRemoved:
      return "Method was removed";
    case Deprecation.methodRenamed:
      return "Method was renamed";
    case Deprecation.classParametersChanged:
      return "Parameters for class were changed";
    case Deprecation.methodParametersChanged:
      return "Parameters for method were changed";
  }
}

export class IsDeprecated extends CompileError {
  constructor(
    reason: Deprecation,
    fromMajor: number,
    fromMinor: number,
    help: string,
    location: string,
  ) {
    super(
      DisplayPriority.first,
      Severity.error,
      `Code change required. ${reasonString(reason)} in v${fromMajor}.${fromMinor}. <u>More Info</u>`,
      location,
      help,
    );
  }
}

export class CannotUseLikeAFunction extends CompileError {
  constructor(id: string, location: string) {
    super(
      DisplayPriority.second,
      Severity.error,
      `Cannot call procedure '${id}' within an expression. <u>More Info</u>`,
      location,
      "LangRef.html#compile_error",
    );
  }
}

export class CannotCallAsAMethod extends CompileError {
  constructor(id: string, symbolType: string, location: string) {
    super(
      DisplayPriority.second,
      Severity.error,
      `Cannot invoke ${symbolType} '${id}' as a method. <u>More Info</u>`,
      location,
      "LangRef.html#compile_error",
    );
  }
}

export class NotIndexableCompileError extends CompileError {
  constructor(type: string, location: string, double: boolean) {
    const dbl = double ? "double " : "";
    super(
      DisplayPriority.second,
      Severity.error,
      `Cannot ${dbl}index ${type}. <u>More Info</u>`,
      location,
      "LangRef.html#compile_error",
    );
  }
}

export class NotRangeableCompileError extends CompileError {
  constructor(type: string, location: string) {
    super(
      DisplayPriority.second,
      Severity.error,
      `Cannot range ${type}. <u>More Info</u>`,
      location,
      "LangRef.html#compile_error",
    );
  }
}

export class NotNewableCompileError extends CompileError {
  constructor(type: string, location: string) {
    super(
      DisplayPriority.fourth,
      Severity.error,
      `Cannot new ${type}. <u>More Info</u>`,
      location,
      "LangRef.html#compile_error",
    );
  }
}

export class NotIterableCompileError extends CompileError {
  constructor(type: string, location: string) {
    super(
      DisplayPriority.second,
      Severity.error,
      `Cannot iterate ${type}. <u>More Info</u>`,
      location,
      "LangRef.html#compile_error",
    );
  }
}

export class MustBeAbstractCompileError extends CompileError {
  constructor(type: string, location: string) {
    super(
      DisplayPriority.second,
      Severity.error,
      `Superclass '${type}' must be inheritable class. <u>More Info</u>`,
      location,
      "LangRef.html#compile_error",
    );
  }
}

export class MustBeInterfaceCompileError extends CompileError {
  constructor(type: string, location: string) {
    super(
      DisplayPriority.second,
      Severity.error,
      `Superclass '${type}' must be an interface. <u>More Info</u>`,
      location,
      "LangRef.html#compile_error",
    );
  }
}

export class MustNotBeCircularDependencyCompileError extends CompileError {
  constructor(type: string, location: string) {
    super(
      DisplayPriority.second,
      Severity.error,
      `Class/interface '${type}' cannot inherit from itself. <u>More Info</u>`,
      location,
      "LangRef.html#compile_error",
    );
  }
}

export class MustBeSingleAbstractCompileError extends CompileError {
  constructor(types: string[], location: string) {
    super(
      DisplayPriority.second,
      Severity.error,
      `There must be only one abstract superclass, ${types.join(", ")} are abstract classes. <u>More Info</u>`,
      location,
      "LangRef.html#compile_error",
    );
  }
}

export class PrivateMemberCompileError extends CompileError {
  constructor(id: string, location: string) {
    super(
      DisplayPriority.second,
      Severity.error,
      `Cannot reference private member '${id}'. <u>More Info</u>`,
      location,
      "LangRef.html#compile_error",
    );
  }
}

export class MustImplementCompileError extends CompileError {
  constructor(classType: string, superClassType: string, id: string, location: string) {
    super(
      DisplayPriority.second,
      Severity.error,
      `${classType} must implement ${superClassType}.${id}. <u>More Info</u>`,
      location,
      "LangRef.html#compile_error",
    );
  }
}

export class MustBeConcreteCompileError extends CompileError {
  constructor(type: string, location: string) {
    super(
      DisplayPriority.second,
      Severity.error,
      `${type} must be concrete to new. <u>More Info</u>`,
      location,
      "LangRef.html#compile_error",
    );
  }
}

export class OutParameterCompileError extends CompileError {
  constructor(name: string, location: string) {
    super(
      DisplayPriority.fourth,
      Severity.error,
      `Cannot pass '${name}' as an out parameter. <u>More Info</u>`,
      location,
      "LangRef.html#compile_error",
    );
  }
}

export class ExtensionCompileError extends CompileError {
  constructor(location: string) {
    super(
      DisplayPriority.second,
      Severity.error,
      `Cannot call extension method directly. <u>More Info</u>`,
      location,
      "LangRef.html#compile_error",
    );
  }
}

export class PropertyCompileError extends CompileError {
  constructor(location: string) {
    super(
      DisplayPriority.second,
      Severity.error,
      `Cannot prefix function with 'property'. <u>More Info</u>`,
      location,
      "LangRef.html#compile_error",
    );
  }
}

export class MissingParameterCompileError extends CompileError {
  constructor(description: string, location: string) {
    super(
      DisplayPriority.third,
      Severity.warning,
      `Missing argument(s). Expected: ${description}. <u>More Info</u>`,
      location,
      "LangRef.html#compile_error",
    );
  }
}

export class ExtraParameterCompileError extends CompileError {
  constructor(description: string, location: string) {
    description = description ? description : "none";
    super(
      DisplayPriority.second,
      Severity.warning,
      `Too many argument(s). Expected: ${description}. <u>More Info</u>`,
      location,
      "LangRef.html#compile_error",
    );
  }
}

export class ParameterTypesCompileError extends CompileError {
  constructor(description: string, provided: string, location: string) {
    super(
      DisplayPriority.fourth,
      Severity.error,
      `Argument types. Expected: ${description} Provided: ${provided}. <u>More Info</u>`,
      location,
      "LangRef.html#compile_error",
    );
  }
}

export class ParametersCompileError extends CompileError {
  constructor(expected: number, actual: number, location: string, generic?: boolean) {
    const priority = actual < expected ? DisplayPriority.third : DisplayPriority.second;
    const severity = actual < expected ? Severity.warning : Severity.error;
    super(
      priority,
      severity,
      `${generic ? "<of Type(s)>" : "Parameters"} Expected: ${expected} Provided: ${actual}. <u>More Info</u>`,
      location,
      "LangRef.html#compile_error",
    );
  }
}

export class MutateCompileError extends CompileError {
  constructor(name: string, purpose: string, location: string) {
    super(
      DisplayPriority.second,
      Severity.error,
      `May not re-assign the ${purpose} '${name}'. <u>More Info</u>`,
      location,
      "LangRef.html#compile_error",
    );
  }
}

export class NotUniqueNameCompileError extends CompileError {
  constructor(name: string, postFix: string, location: string) {
    super(
      DisplayPriority.second,
      Severity.error,
      `Name '${name}' not unique in scope${postFix}. <u>More Info</u>`,
      location,
      "LangRef.html#compile_error",
    );
  }
}

export class ReassignInFunctionCompileError extends CompileError {
  constructor(thing: string, location: string) {
    super(
      DisplayPriority.second,
      Severity.error,
      `May not set ${thing} in a function. <u>More Info</u>`,
      location,
      "LangRef.html#compile_error",
    );
  }
}

export class RedefinedCompileError extends CompileError {
  constructor(id: string, purpose: string, location: string) {
    super(
      DisplayPriority.second,
      Severity.error,
      `The identifier '${id}' is already used for a ${purpose} and cannot be re-defined here. <u>More Info</u>`,
      location,
      "LangRef.html#compile_error",
    );
  }
}

export class DuplicateKeyCompileError extends CompileError {
  constructor(location: string) {
    super(
      DisplayPriority.fourth,
      Severity.error,
      `Duplicate Dictionary key(s). <u>More Info</u>`,
      location,
      "LangRef.html#compile_error",
    );
  }
}

export class FunctionRefCompileError extends CompileError {
  constructor(id: string, isGlobal: boolean, location: string) {
    const postfix = isGlobal ? ` Or to create a reference to '${id}', precede it by 'ref'.` : "";
    super(
      DisplayPriority.second,
      Severity.error,
      `To evaluate function '${id}' add brackets.${postfix} <u>More Info</u>`,
      location,
      "LangRef.html#compile_error",
    );
  }
}

export class NotGlobalFunctionRefCompileError extends CompileError {
  constructor(id: string, location: string) {
    super(
      DisplayPriority.second,
      Severity.error,
      `Library or class function '${id}' cannot be preceded by by 'ref'. <u>More Info</u>`,
      location,
      "LangRef.html#compile_error",
    );
  }
}

export class UnknownCompilerDirectiveCompileError extends CompileError {
  constructor(_directive: string, location: string) {
    super(
      DisplayPriority.second,
      Severity.error,
      `a comment may not start with [ unless it is a recognised compiler directive. <u>More Info</u>`,
      location,
      "LangRef.html#compile_error",
    );
  }
}
