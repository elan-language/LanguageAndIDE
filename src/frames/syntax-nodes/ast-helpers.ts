import { ElanCompilerError } from "../../elan-compiler-error";
import { CompileError } from "../compile-error";
import {
  mustBeAssignableType,
  mustBeDoubleIndexableType,
  mustBeIndexableType,
  mustMatchParameters,
} from "../compile-rules";
import { isFile, isFrame, isFunction } from "../frame-helpers";
import { AstCollectionNode } from "../interfaces/ast-collection-node";
import { AstIdNode } from "../interfaces/ast-id-node";
import { AstIndexableNode } from "../interfaces/ast-indexable-node";
import { AstNode } from "../interfaces/ast-node";
import { AstQualifiedNode } from "../interfaces/ast-qualified-node";
import { AstQualifierNode } from "../interfaces/ast-qualifier-node";
import { Class } from "../interfaces/class";
import { Scope } from "../interfaces/scope";
import { SymbolType } from "../interfaces/symbol-type";
import { Transforms } from "../interfaces/transforms";
import { noTypeOptions } from "../interfaces/type-options";
import { AbstractDictionaryType } from "../symbols/abstract-dictionary-type";
import { ClassType } from "../symbols/class-type";
import { DictionaryImmutableType } from "../symbols/dictionary-immutable-type";
import { DictionaryType } from "../symbols/dictionary-type";
import { FunctionType } from "../symbols/function-type";
import { GenericParameterType } from "../symbols/generic-parameter-type";
import { IntType } from "../symbols/int-type";
import { ProcedureType } from "../symbols/procedure-type";
import { StringType } from "../symbols/string-type";
import {
  isAnyDictionaryType,
  isClassType,
  isClassTypeDef,
  isGenericSymbolType,
  isReifyableSymbolType,
  parameterNamesWithTypes,
} from "../symbols/symbol-helpers";
import { TupleType } from "../symbols/tuple-type";
import { UnknownType } from "../symbols/unknown-type";
import { transform, transformMany } from "./ast-visitor";
import { DeconstructedListAsn } from "./deconstructed-list-asn";
import { DeconstructedTupleAsn } from "./deconstructed-tuple-asn";
import { EmptyAsn } from "./empty-asn";
import { IndexAsn } from "./index-asn";
import { OperationSymbol } from "./operation-symbol";

export function isAstQualifiedNode(n: AstNode): n is AstQualifiedNode {
  return !!n && "qualifier" in n;
}

export function isAstIndexableNode(n: AstNode): n is AstIndexableNode {
  return !!n && "rootSymbolType" in n;
}

export function isAstQualifierNode(n: AstNode): n is AstQualifierNode {
  return !!n && "value" in n;
}

export function isAstCollectionNode(n: AstNode): n is AstCollectionNode {
  return !!n && "items" in n;
}

export function isAstIdNode(n: AstNode | undefined): n is AstIdNode {
  return !!n && "id" in n;
}

export function isEmptyNode(n: AstNode): n is EmptyAsn {
  return !!n && "isEmpty" in n;
}

export function InFunctionScope(start: Scope): boolean {
  if (isFunction(start)) {
    return true;
  }

  if (isFile(start)) {
    return false;
  }

  if (isFrame(start)) {
    return InFunctionScope(start.getParent());
  }

  return false;
}

export function transforms(): Transforms {
  return {
    transform: transform,
    transformMany: transformMany,
  };
}

class TypeHolder implements SymbolType {
  constructor(
    public readonly symbolType: SymbolType,
    public readonly ofTypes: SymbolType[],
  ) {}
  isAssignableFrom(otherType: SymbolType): boolean {
    return this.symbolType.isAssignableFrom(otherType);
  }
  classOptions = noTypeOptions;

  name = "TypeHolder";
  initialValue = "";
  toString() {
    return this.name;
  }
}

export function flatten(p: SymbolType): SymbolType {
  if (p instanceof ClassType && p.classOptions.isIndexable) {
    return new TypeHolder(p, [flatten(p.ofType)]);
  }

  if (isAnyDictionaryType(p)) {
    return new TypeHolder(p, [flatten(p.keyType), flatten(p.valueType)]);
  }

  if (p instanceof TupleType) {
    let flattened = [] as SymbolType[];
    for (const t of p.ofTypes) {
      flattened = flattened.concat(flatten(t));
    }
    return new TypeHolder(p, flattened);
  }

  if (p instanceof FunctionType) {
    let flattened = [] as SymbolType[];
    for (const t of p.parameterTypes) {
      flattened = flattened.concat(flatten(t));
    }
    flattened = flattened.concat(flatten(p.returnType));

    return new TypeHolder(p, flattened);
  }

  if (p instanceof StringType) {
    return new TypeHolder(p, [p]);
  }

  return p;
}

export function containsGenericType(type: SymbolType): boolean {
  if (type instanceof GenericParameterType) {
    return true;
  }
  if (isAnyDictionaryType(type)) {
    return containsGenericType(type.keyType) || containsGenericType(type.valueType);
  }
  if (type instanceof TupleType) {
    return type.ofTypes.some((t) => containsGenericType(t));
  }
  if (type instanceof ClassType) {
    if (isClassTypeDef(type.scope)) {
      return type.scope.ofTypes.some((t) => containsGenericType(t));
    }
  }

  if (type instanceof FunctionType) {
    if (containsGenericType(type.returnType)) {
      return true;
    }
    return type.parameterTypes.some((t) => containsGenericType(t));
  }

  if (type instanceof ProcedureType) {
    return type.parameterTypes.some((t) => containsGenericType(t));
  }

  return false;
}

export function generateType(
  type: SymbolType,
  matches: Map<string, SymbolType>,
  depth = 0,
): SymbolType {
  depth++;

  // arbitary depth
  if (depth > 20) {
    return type;
  }

  if (isReifyableSymbolType(type)) {
    return type.reify([generateType(type.ofType, matches, depth)]);
  }

  if (type instanceof GenericParameterType) {
    const match = matches.get(type.id);
    if (match instanceof TypeHolder) {
      return generateType(match.symbolType, matches, depth);
    }

    return match ?? type;
  }
  if (type instanceof DictionaryType) {
    return new DictionaryType(
      generateType(type.keyType, matches, depth),
      generateType(type.valueType, matches, depth),
    );
  }
  if (type instanceof DictionaryImmutableType) {
    return new DictionaryImmutableType(
      generateType(type.keyType, matches, depth),
      generateType(type.valueType, matches, depth),
    );
  }
  if (type instanceof AbstractDictionaryType) {
    return new AbstractDictionaryType(
      generateType(type.keyType, matches, depth),
      generateType(type.valueType, matches, depth),
    );
  }
  if (type instanceof TupleType) {
    return new TupleType(type.ofTypes.map((t) => generateType(t, matches, depth)));
  }

  if (type instanceof FunctionType) {
    return new FunctionType(
      type.parameterNames,
      type.parameterTypes.map((t) => generateType(t, matches, depth)),
      generateType(type.returnType, matches),
      type.isExtension,
      type.isPure,
      type.isAsync,
    );
  }

  if (type instanceof ProcedureType) {
    return new ProcedureType(
      type.parameterNames,
      type.parameterTypes.map((t) => generateType(t, matches, depth)),
      type.isExtension,
      type.isAsync,
    );
  }

  return type;
}

export function minOf(a1: object[], a2: object[]) {
  return a1.length < a2.length ? a1.length : a2.length;
}

export function match(
  flattened: SymbolType[],
  pTypes: SymbolType[],
  matches: Map<string, SymbolType>,
) {
  const minLength = minOf(flattened, pTypes);

  for (let i = 0; i < minLength; i++) {
    const t = flattened[i];
    const st = pTypes[i];

    if (t instanceof GenericParameterType) {
      if (!matches.has(t.id)) {
        matches.set(t.id, st);
      }
    }

    if (t instanceof TypeHolder && st instanceof TypeHolder) {
      match(t.ofTypes, st.ofTypes, matches);
    }
  }
}

export function matchGenericTypes(type: FunctionType | ProcedureType, parameters: AstNode[]) {
  const matches = new Map<string, SymbolType>();

  const flattened = type.parameterTypes.map((n) => flatten(n));

  const pTypes = parameters.map((p) => flatten(p.symbolType()));
  match(flattened, pTypes, matches);
  return matches;
}

export function matchClassGenericTypes(type: Class, parameters: AstNode[]) {
  const matches = new Map<string, SymbolType>();
  const flattened = type.ofTypes.map((n) => flatten(n));
  const pTypes = parameters.map((p) => flatten(p.symbolType()));
  match(flattened, pTypes, matches);
  return matches;
}

export function matchParametersAndTypes(
  funcSymbolType: FunctionType | ProcedureType,
  parameters: AstNode[],
  compileErrors: CompileError[],
  location: string,
) {
  let parameterTypes = funcSymbolType.parameterTypes;

  if (parameterTypes.some((pt) => containsGenericType(pt))) {
    const matches = matchGenericTypes(funcSymbolType, parameters);
    parameterTypes = parameterTypes.map((pt) => generateType(pt, matches));
  }

  mustMatchParameters(
    parameters,
    parameterTypes,
    parameterNamesWithTypes(funcSymbolType, parameterTypes).join(", "),
    funcSymbolType.isExtension,
    compileErrors,
    location,
  );
}

const opMap = new Map<OperationSymbol, string>([
  [OperationSymbol.Add, "+"],
  [OperationSymbol.Minus, "-"],
  [OperationSymbol.Not, "not"],
  [OperationSymbol.Multiply, "*"],
  [OperationSymbol.And, "and"],
  [OperationSymbol.Equals, "is"],
  [OperationSymbol.LT, "<"],
  [OperationSymbol.GT, ">"],
  [OperationSymbol.GTE, ">="],
  [OperationSymbol.LTE, "<="],
  [OperationSymbol.Div, "div"],
  [OperationSymbol.Mod, "mod"],
  [OperationSymbol.Divide, "/"],
  [OperationSymbol.NotEquals, "isnt"],
  [OperationSymbol.Pow, "^"],
  [OperationSymbol.Or, "or"],
]);

export function mapOperationSymbol(os: OperationSymbol) {
  const op = opMap.get(os);
  if (op) {
    return op;
  }
  throw new ElanCompilerError(`Cannot map operation symbol ${os}`);
}

export function mapOperation(op: string): OperationSymbol {
  op = op.trim();

  for (const e of opMap.entries()) {
    if (e[1] === op) {
      return e[0];
    }
  }
  throw new ElanCompilerError(`Cannot map operation ${op}`);
}

export function wrapDeconstructionRhs(lhs: AstNode, rhs: AstNode, isAssignment: boolean) {
  const code = rhs.compile();
  const closeBracket = isAssignment ? ")" : "";

  if (lhs instanceof DeconstructedListAsn) {
    return `system.deconstructList(${code})`;
  }

  if (lhs instanceof DeconstructedTupleAsn && rhs.symbolType() instanceof ClassType) {
    return `${code}${closeBracket}`;
  }
  return code;
}

export function wrapDeconstructionLhs(lhs: AstNode, rhs: AstNode, isAssignment: boolean) {
  const code = lhs.compile();
  const openBracket = isAssignment ? "(" : "";

  if (lhs instanceof DeconstructedListAsn) {
    return `[${code}]`;
  }

  if (lhs instanceof DeconstructedTupleAsn && rhs.symbolType() instanceof ClassType) {
    return `${openBracket}{${code}}`;
  }

  if (lhs instanceof DeconstructedTupleAsn) {
    return `[${code}]`;
  }
  return code;
}

export function getIds(ast: AstNode) {
  if (isAstIdNode(ast)) {
    const id = ast.id;
    return id.includes(",") ? id.split(",") : [id];
  }
  return [];
}

export function getIndexAndOfType(rootType: SymbolType): [SymbolType, SymbolType] {
  if (isClassType(rootType) && isClassTypeDef(rootType.scope)) {
    if (rootType.scope.ofTypes.length > 0) {
      return [IntType.Instance, rootType.scope.ofTypes[0]];
    }
  }

  if (isGenericSymbolType(rootType)) {
    return [IntType.Instance, rootType.ofType];
  }

  if (isAnyDictionaryType(rootType)) {
    return [rootType.keyType, rootType.valueType];
  }

  return [UnknownType.Instance, UnknownType.Instance];
}

export function wrapSimpleSubscript(code: string): string {
  return `system.safeIndex(${code})`;
}

export function compileSimpleSubscript(
  id: string,
  rootType: SymbolType,
  index: IndexAsn,
  prefix: string,
  code: string,
  postfix: string,
  compileErrors: CompileError[],
  fieldId: string,
) {
  if (postfix.includes(",")) {
    mustBeDoubleIndexableType(id, rootType, true, compileErrors, fieldId);
  } else {
    mustBeIndexableType(id, rootType, true, compileErrors, fieldId);
  }
  const [indexType] = getIndexAndOfType(rootType);
  mustBeAssignableType(indexType, index.subscript1.symbolType(), compileErrors, fieldId);

  return wrapSimpleSubscript(`${prefix}${code}, ${postfix}`);
}
