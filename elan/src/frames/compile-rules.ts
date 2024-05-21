import { ArrayType } from "./symbols/array-type";
import { BooleanType } from "./symbols/boolean-type";
import { ClassDefinitionType } from "./symbols/class-definition-type";
import { ClassType } from "./symbols/class-type";
import { DictionaryType } from "./symbols/dictionary-type";
import { FunctionType } from "./symbols/function-type";
import { GenericParameterType } from "./symbols/generic-parameter-type";
import { IntType } from "./symbols/int-type";
import { IterType } from "./symbols/iter-type";
import { ListType } from "./symbols/list-type";
import { FloatType } from "./symbols/number-type";
import { ProcedureType } from "./symbols/procedure-type";
import { StringType } from "./symbols/string-type";
import { ElanSymbol } from "./interfaces/symbol";
import { SymbolType } from "./interfaces/symbol-type";
import { TupleType } from "./symbols/tuple-type";
import { UnknownSymbol } from "./symbols/unknown-symbol";
import { UnknownType } from "./symbols/unknown-type";
import { CompileError } from "./compile-error";
import { Parent } from "./interfaces/parent";
import { Scope } from "./interfaces/scope";
import { InFunctionScope } from "./syntax-nodes/ast-helpers";
import { AstNode } from "./interfaces/ast-node";
import { Transforms } from "./syntax-nodes/transforms";
import { SymbolScope } from "./symbols/symbol-scope";
import { Property } from "./class-members/property";
import { FunctionMethod } from "./class-members/function-method";
import { ProcedureFrame } from "./globals/procedure-frame";
import { AstQualifiedNode } from "./interfaces/ast-qualified-node";
import { LetStatement } from "./statements/let-statement";

export function mustBeOfSymbolType(
  exprType: SymbolType | undefined,
  ofType: SymbolType,
  compileErrors: CompileError[],
  location: string,
) {
  const unknown = exprType?.name === undefined || ofType.name === undefined;
  if (exprType?.name !== ofType.name) {
    compileErrors.push(
      new CompileError(`Expression must be ${ofType.name}`, location, unknown),
    );
  }
}

export function mustBeOfType(
  expr: AstNode | undefined,
  ofType: SymbolType,
  compileErrors: CompileError[],
  location: string,
) {
  mustBeOfSymbolType(expr?.symbolType(), ofType, compileErrors, location);
}

export function mustBeOneOrTwoOfTypeInt(
  params: AstNode[],
  compileErrors: CompileError[],
  location: string,
) {
  if (params.length === 0 || params.length > 2) {
    compileErrors.push(
      new CompileError(`Array requires 1 or 2 parameters`, location, false),
    );
  }
  if (params.length > 0) {
    mustBeOfSymbolType(
      params[0].symbolType(),
      IntType.Instance,
      compileErrors,
      location,
    );
  }
  if (params.length > 1) {
    mustBeOfSymbolType(
      params[1].symbolType(),
      IntType.Instance,
      compileErrors,
      location,
    );
  }
}

export function mustHaveLastSingleElse(
  elses: { hasIf: boolean }[],
  compileErrors: CompileError[],
  location: string,
) {
  if (elses.filter((s) => !s.hasIf).length > 1) {
    compileErrors.push(
      new CompileError(
        `Cannot have multiple unconditional 'Else'`,
        location,
        false,
      ),
    );
  }

  if (elses[elses.length - 1].hasIf) {
    compileErrors.push(
      new CompileError(`Must end with unconditional 'Else'`, location, false),
    );
  }
}

export function mustBeKnownSymbol(
  symbol: ElanSymbol,
  compileErrors: CompileError[],
  location: string,
) {
  if (symbol instanceof UnknownSymbol) {
    compileErrors.push(
      new CompileError(`${symbol.symbolId} is not defined`, location, true),
    );
  }
}

export function mustBeProcedure(
  symbolType: SymbolType,
  compileErrors: CompileError[],
  location: string,
) {
  if (!(symbolType instanceof ProcedureType)) {
    compileErrors.push(
      new CompileError(`Cannot call ${symbolType.name}`, location, true),
    );
  }
}

export function mustBePureFunctionSymbol(
  symbolType: SymbolType,
  scope: Scope,
  compileErrors: CompileError[],
  location: string,
) {
  if (InFunctionScope(scope)) {
    if (!(symbolType instanceof FunctionType) || !symbolType.isPure) {
      const imPure =
        symbolType instanceof FunctionType && !symbolType.isPure
          ? " impure "
          : " ";
      compileErrors.push(
        new CompileError(
          `Cannot call${imPure}${symbolType.name}`,
          location,
          true,
        ),
      );
    }
  } else {
    if (!(symbolType instanceof FunctionType)) {
      compileErrors.push(
        new CompileError(`Cannot call ${symbolType.name}`, location, true),
      );
    }
  }
}

export function mustBeIndexableSymbol(
  symbolType: SymbolType,
  isDouble: boolean,
  compileErrors: CompileError[],
  location: string,
) {
  if (
    !(
      symbolType instanceof ListType ||
      symbolType instanceof ArrayType ||
      symbolType instanceof StringType ||
      symbolType instanceof DictionaryType
    )
  ) {
    compileErrors.push(
      new CompileError(`Cannot index ${symbolType.name}`, location, true),
    );
  }
  if (
    isDouble &&
    ((symbolType instanceof ArrayType && !symbolType.is2d) ||
      symbolType instanceof ListType ||
      symbolType instanceof StringType ||
      symbolType instanceof DictionaryType)
  ) {
    compileErrors.push(
      new CompileError(
        `Cannot double index ${symbolType.name}`,
        location,
        true,
      ),
    );
  }
  if (!isDouble && symbolType instanceof ArrayType && symbolType.is2d) {
    compileErrors.push(
      new CompileError(
        `Cannot single index 2D ${symbolType.name}`,
        location,
        true,
      ),
    );
  }
}

export function mustBeAbstractClass(
  classType: ClassDefinitionType,
  compileErrors: CompileError[],
  location: string,
) {
  if (!classType.isAbstract) {
    compileErrors.push(
      new CompileError(
        `Superclass ${classType.name} must be abstract`,
        location,
        false,
      ),
    );
  }
}

export function mustBePublicProperty(
  property: ElanSymbol,
  compileErrors: CompileError[],
  location: string,
) {
  if (property instanceof Property && property.private === true) {
    compileErrors.push(
      new CompileError(`Cannot reference private property`, location, false),
    );
  }
}

export function mustImplementSuperClasses(
  transforms: Transforms,
  classType: ClassDefinitionType,
  superClassTypes: ClassDefinitionType[],
  compileErrors: CompileError[],
  location: string,
) {
  for (const superClassType of superClassTypes) {
    const superSymbols = superClassType.childSymbols();

    for (const superSymbol of superSymbols) {
      const subSymbol = classType.resolveSymbol(
        superSymbol.symbolId,
        transforms,
        classType,
      );

      if (subSymbol instanceof UnknownSymbol) {
        compileErrors.push(
          new CompileError(
            `${classType.name} must implement ${superClassType.name}.${superSymbol.symbolId}`,
            location,
            false,
          ),
        );
      } else {
        mustBeOfSymbolType(
          subSymbol.symbolType(transforms),
          superSymbol.symbolType(transforms),
          compileErrors,
          location,
        );
      }
    }
  }
}

export function mustBeConcreteClass(
  classType: ClassDefinitionType,
  compileErrors: CompileError[],
  location: string,
) {
  if (classType.isAbstract) {
    compileErrors.push(
      new CompileError(
        `${classType.name} must be concrete to new`,
        location,
        false,
      ),
    );
  }
}

export function mustCallExtensionViaQualifier(
  ft: FunctionType,
  qualifier: AstNode | undefined,
  compileErrors: CompileError[],
  location: string,
) {
  if (ft.isExtension && qualifier === undefined) {
    compileErrors.push(
      new CompileError(
        `Cannot call extension method directly`,
        location,
        false,
      ),
    );
  }
}

export function mustMatchParameters(
  parms: AstNode[],
  ofType: SymbolType[],
  compileErrors: CompileError[],
  location: string,
) {
  const maxLen = parms.length > ofType.length ? parms.length : ofType.length;

  for (let i = 0; i < maxLen; i++) {
    const p = parms[i];
    const t = ofType[i];

    if (p === undefined) {
      compileErrors.push(
        new CompileError(`Missing parameter ${i}`, location, false),
      );
    } else if (t === undefined) {
      compileErrors.push(
        new CompileError(`Too many parameters ${i}`, location, false),
      );
    } else {
      mustBeCompatibleType(t, p.symbolType(), compileErrors, location);
    }
  }
}

function FailIncompatible(
  lhs: SymbolType,
  rhs: SymbolType,
  compileErrors: CompileError[],
  location: string,
) {
  const unknown = lhs === UnknownType.Instance || rhs === UnknownType.Instance;
  compileErrors.push(
    new CompileError(
      `Incompatible types ${rhs.name} to ${lhs.name}`,
      location,
      unknown,
    ),
  );
}

function FailUnknown(
  lhs: AstNode,
  compileErrors: CompileError[],
  location: string,
) {
  compileErrors.push(
    new CompileError(`Undeclared variable ${lhs}`, location, true),
  );
}

export function mustBeCoercibleType(
  lhs: SymbolType,
  rhs: SymbolType,
  compileErrors: CompileError[],
  location: string,
) {
  // for compare allow int and floats
  if (
    (lhs instanceof IntType || lhs instanceof FloatType) &&
    (rhs instanceof IntType || rhs instanceof FloatType)
  ) {
    return;
  }

  mustBeCompatibleType(lhs, rhs, compileErrors, location);
}

export function mustBeNumberType(
  lhs: SymbolType,
  rhs: SymbolType,
  compileErrors: CompileError[],
  location: string,
) {
  // for compare allow int and floats
  if (
    (lhs instanceof IntType || lhs instanceof FloatType) &&
    (rhs instanceof IntType || rhs instanceof FloatType)
  ) {
    return;
  }

  compileErrors.push(
    new CompileError(
      `Cannot compare ${lhs.name} and ${rhs.name}`,
      location,
      true,
    ),
  );
}

export function mustBeBooleanType(
  lhs: SymbolType,
  rhs: SymbolType,
  compileErrors: CompileError[],
  location: string,
) {
  // for compare allow int and floats
  if (lhs instanceof BooleanType && rhs instanceof BooleanType) {
    return;
  }

  compileErrors.push(
    new CompileError(
      `Cannot logically compare ${lhs.name} and ${rhs.name}`,
      location,
      true,
    ),
  );
}

function mustBeCompatibleTypes(
  lhss: SymbolType[],
  rhss: SymbolType[],
  compileErrors: CompileError[],
  location: string,
) {
  const maxLen = lhss.length > rhss.length ? lhss.length : rhss.length;
  for (let i = 0; i < maxLen; i++) {
    mustBeCompatibleType(lhss[i], rhss[i], compileErrors, location);
  }
  return;
}

export function mustBeCompatibleType(
  lhs: SymbolType,
  rhs: SymbolType,
  compileErrors: CompileError[],
  location: string,
) {
  if (lhs instanceof BooleanType && !(rhs instanceof BooleanType)) {
    FailIncompatible(lhs, rhs, compileErrors, location);
    return;
  }
  if (lhs instanceof StringType && !(rhs instanceof StringType)) {
    FailIncompatible(lhs, rhs, compileErrors, location);
    return;
  }
  if (lhs instanceof IntType && !(rhs instanceof IntType)) {
    FailIncompatible(lhs, rhs, compileErrors, location);
    return;
  }
  if (
    lhs instanceof FloatType &&
    !(rhs instanceof IntType || rhs instanceof FloatType)
  ) {
    FailIncompatible(lhs, rhs, compileErrors, location);
    return;
  }
  if (
    lhs instanceof ListType &&
    !(
      lhs.name === rhs.name ||
      lhs.name === new IterType((lhs as ListType).ofType).name
    )
  ) {
    FailIncompatible(lhs, rhs, compileErrors, location);
    return;
  }
  if (
    lhs instanceof ArrayType &&
    !(
      lhs.name === rhs.name ||
      lhs.name === new IterType((lhs as ArrayType).ofType).name
    )
  ) {
    FailIncompatible(lhs, rhs, compileErrors, location);
    return;
  }

  if (lhs instanceof DictionaryType && rhs instanceof DictionaryType) {
    mustBeCompatibleType(lhs.keyType, rhs.keyType, compileErrors, location);
    mustBeCompatibleType(lhs.valueType, rhs.valueType, compileErrors, location);
    return;
  }

  if (lhs instanceof DictionaryType && !(rhs instanceof DictionaryType)) {
    FailIncompatible(lhs, rhs, compileErrors, location);
    return;
  }

  if (lhs instanceof TupleType && rhs instanceof TupleType) {
    mustBeCompatibleTypes(lhs.ofTypes, rhs.ofTypes, compileErrors, location);
    return;
  }

  if (lhs instanceof TupleType && !(rhs instanceof TupleType)) {
    FailIncompatible(lhs, rhs, compileErrors, location);
    return;
  }

  if (
    lhs instanceof IterType &&
    !(
      rhs instanceof ListType ||
      rhs instanceof ArrayType ||
      rhs instanceof StringType ||
      rhs instanceof IterType
    )
  ) {
    FailIncompatible(lhs, rhs, compileErrors, location);
    return;
  }

  if (
    lhs instanceof IterType &&
    (rhs instanceof ListType ||
      rhs instanceof ArrayType ||
      rhs instanceof IterType)
  ) {
    mustBeCompatibleType(lhs.ofType, rhs.ofType, compileErrors, location);
  }

  if (lhs instanceof IterType && rhs instanceof StringType) {
    if (
      !(
        lhs.ofType instanceof GenericParameterType ||
        lhs.ofType instanceof StringType
      )
    ) {
      FailIncompatible(lhs, rhs, compileErrors, location);
      return;
    }
  }

  if (
    lhs instanceof ClassType &&
    !(rhs instanceof ClassType || rhs instanceof ClassDefinitionType)
  ) {
    FailIncompatible(lhs, rhs, compileErrors, location);
    return;
  }

  if (
    lhs instanceof ClassType &&
    (rhs instanceof ClassType || rhs instanceof ClassDefinitionType)
  ) {
    if (lhs.className !== rhs.className) {
      // TODO inheritance
      FailIncompatible(lhs, rhs, compileErrors, location);
      return;
    }
  }

  if (
    (lhs instanceof FunctionType && !(rhs instanceof FunctionType)) ||
    (rhs instanceof FunctionType && !(lhs instanceof FunctionType))
  ) {
    FailIncompatible(lhs, rhs, compileErrors, location);
    return;
  }

  if (lhs instanceof FunctionType && rhs instanceof FunctionType) {
    mustBeCompatibleTypes(
      lhs.parametersTypes,
      rhs.parametersTypes,
      compileErrors,
      location,
    );
    mustBeCompatibleType(
      lhs.returnType,
      rhs.returnType,
      compileErrors,
      location,
    );
    return;
  }
}

export function mustBeCompatibleNode(
  lhs: AstNode,
  rhs: AstNode,
  compileErrors: CompileError[],
  location: string,
) {
  const lst = lhs.symbolType();
  const rst = rhs.symbolType();

  if (lst instanceof UnknownType || rst === undefined) {
    FailUnknown(lhs, compileErrors, location);
    return;
  }

  if (rst instanceof UnknownType || rst === undefined) {
    FailUnknown(rhs, compileErrors, location);
    return;
  }

  mustBeCompatibleType(lst, rst, compileErrors, location);
}

export function mustNotBePropertyOnFunctionMethod(
  assignable: AstNode,
  parent: Parent,
  compileErrors: CompileError[],
  location: string,
) {
  if (parent instanceof FunctionMethod) {
    const s = assignable.symbolScope;

    if (s !== SymbolScope.local) {
      compileErrors.push(
        new CompileError(
          `May not mutate non local data in function`,
          location,
          false,
        ),
      );
    }
  }
}

export function mustNotBeParameter(
  assignable: AstQualifiedNode,
  parent: Parent,
  compileErrors: CompileError[],
  location: string,
) {
  const s = assignable.symbolScope;

  if (parent instanceof ProcedureFrame) {
    if (
      s === SymbolScope.parameter &&
      !(assignable.rootSymbolType() instanceof ArrayType)
    ) {
      compileErrors.push(
        new CompileError(`May not mutate parameter`, location, false),
      );
    }
  } else {
    if (s === SymbolScope.parameter) {
      compileErrors.push(
        new CompileError(`May not mutate parameter`, location, false),
      );
    }
  }
}

export function mustNotBeCounter(
  assignable: AstNode,
  compileErrors: CompileError[],
  location: string,
) {
  const s = assignable.symbolScope;

  if (s === SymbolScope.counter) {
    compileErrors.push(
      new CompileError(`May not mutate counter`, location, false),
    );
  }
}

export function mustNotBeConstant(
  assignable: AstNode,
  compileErrors: CompileError[],
  location: string,
) {
  const s = assignable.symbolScope;

  if (s === SymbolScope.program) {
    compileErrors.push(
      new CompileError(`May not mutate constant`, location, false),
    );
  }
}

export function mustNotBeLet(
  symbol: ElanSymbol,
  compileErrors: CompileError[],
  location: string,
) {
  if (symbol instanceof LetStatement) {
    compileErrors.push(new CompileError(`May not set let`, location, false));
  }
}

export function mustNotBeArray(
  parameterType: SymbolType,
  compileErrors: CompileError[],
  location: string,
) {
  if (parameterType instanceof ArrayType) {
    compileErrors.push(
      new CompileError(`May not pass Array into function`, location, false),
    );
  }
}

export function mustNotBeReassigned(
  variable: ElanSymbol,
  compileErrors: CompileError[],
  location: string,
) {
  if (
    !(variable instanceof UnknownSymbol) &&
    variable.symbolScope === SymbolScope.local
  ) {
    compileErrors.push(
      new CompileError(`May not reassign variable`, location, false),
    );
  }
}

export function mustBeIterable(
  symbolType: SymbolType,
  compileErrors: CompileError[],
  location: string,
) {
  if (
    !(
      symbolType instanceof ListType ||
      symbolType instanceof ArrayType ||
      symbolType instanceof StringType ||
      symbolType instanceof IterType
    )
  ) {
    compileErrors.push(
      new CompileError(`Cannot iterate ${symbolType.name}`, location, true),
    );
  }
}

export function mustHaveUniqueKeys(
  keys: string[],
  compileErrors: CompileError[],
  location: string,
) {
  const set = new Set(keys);
  if (set.size !== keys.length) {
    compileErrors.push(
      new CompileError(`Duplicate Dictionary key(s)`, location, true),
    );
  }
}
