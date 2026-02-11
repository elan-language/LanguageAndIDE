import { AstCollectionNode } from "../../compiler/compiler-interfaces/ast-collection-node";
import { AstIdNode } from "../../compiler/compiler-interfaces/ast-id-node";
import { AstIndexableNode } from "../../compiler/compiler-interfaces/ast-indexable-node";
import { AstNode } from "../../compiler/compiler-interfaces/ast-node";
import { AstQualifiedNode } from "../../compiler/compiler-interfaces/ast-qualified-node";
import { AstTypeNode } from "../../compiler/compiler-interfaces/ast-type-node";
import { Scope } from "../../compiler/compiler-interfaces/scope";
import { SymbolType } from "../../compiler/compiler-interfaces/symbol-type";
import { noTypeOptions } from "../../compiler/compiler-interfaces/type-options";
import { ClassType } from "../../compiler/symbols/class-type";
import { FunctionType } from "../../compiler/symbols/function-type";
import { GenericParameterType } from "../../compiler/symbols/generic-parameter-type";
import { IntType } from "../../compiler/symbols/int-type";
import { ProcedureType } from "../../compiler/symbols/procedure-type";
import { StringType } from "../../compiler/symbols/string-type";
import {
  getIdsFromString,
  handleDeconstruction,
  isClass,
  isClassType,
  isGenericSymbolType,
  isReifyableSymbolType,
  isSymbol,
  parameterNamesWithTypes,
  symbolMatches,
} from "../../compiler/symbols/symbol-helpers";
import { TupleType } from "../../compiler/symbols/tuple-type";
import { UnknownType } from "../../compiler/symbols/unknown-type";
import { CompileError } from "../compile-error";
import {
  mustBeAssignableType,
  mustBeDoubleIndexableType,
  mustBeIndexableType,
  mustMatchParameters,
} from "../compile-rules";
import { AstQualifierNode } from "../compiler-interfaces/ast-qualifier-node";
import { ElanSymbol } from "../compiler-interfaces/elan-symbol";
import { RootAstNode } from "../compiler-interfaces/root-ast-node";
import { ConstructorAsn } from "./class-members/constructor-asn";
import { EmptyAsn } from "./empty-asn";
import { EnumValuesAsn } from "./fields/enum-values-asn";
import { FileAsn } from "./file-asn";
import { FunctionAsn } from "./globals/function-asn";
import { GlobalConstantAsn } from "./globals/global-constant-asn";
import { IndexAsn } from "./index-asn";
import { IndexDoubleAsn } from "./index-double-asn";
import { OperationSymbol } from "./operation-symbol";
import { QualifierAsn } from "./qualifier-asn";

// interface type guards

export function isAstNode(n: AstNode | Scope): n is AstNode {
  return !!n && "compile" in n && "fieldId" in n && "indent" in n;
}

export function isAstQualifiedNode(n: AstNode): n is AstQualifiedNode {
  return !!n && "qualifier" in n;
}

export function isAstQualifierNode(n: AstNode): n is AstQualifierNode {
  return n instanceof QualifierAsn;
}

export function isAstIndexableNode(n: AstNode): n is AstIndexableNode {
  return !!n && "rootSymbolType" in n;
}

export function isAstCollectionNode(n: AstNode): n is AstCollectionNode {
  return !!n && "items" in n;
}

export function isAstIdNode(n: AstNode | undefined): n is AstIdNode {
  return !!n && "id" in n;
}

export function isRootNode(n?: Scope | AstNode): n is RootAstNode {
  return !!n && "isRoot" in n;
}

export function isAstTypeNode(n?: AstNode): n is AstTypeNode {
  return !!n && "compileToEmptyObjectCode" in n;
}

// type type-guards

export function isConstructor(n?: AstNode | Scope | ElanSymbol): n is ConstructorAsn {
  return n instanceof ConstructorAsn;
}

export function isEmptyNode(n: AstNode): n is EmptyAsn {
  return n instanceof EmptyAsn;
}

export function isFunctionScope(scope?: Scope): scope is FunctionAsn {
  return scope instanceof FunctionAsn;
}

export function isFileScope(scope?: Scope): scope is FileAsn {
  return scope instanceof FileAsn;
}

export function isEnumValuesAsn(n: AstNode): n is EnumValuesAsn {
  return n instanceof EnumValuesAsn;
}

export function inFunctionScope(start: Scope): boolean {
  if (isFunctionScope(start)) {
    return true;
  }

  if (isFileScope(start)) {
    return false;
  }

  return inFunctionScope(start.getParentScope());
}

class TypeHolder implements SymbolType {
  constructor(
    public readonly symbolType: SymbolType,
    public readonly ofTypes: SymbolType[],
  ) {}
  isAssignableFrom(otherType: SymbolType): boolean {
    return this.symbolType.isAssignableFrom(otherType);
  }
  typeOptions = noTypeOptions;

  name = "TypeHolder";
  initialValue = "";
  toString() {
    return this.name;
  }
}

export function flatten(p: SymbolType): SymbolType {
  if (p instanceof ClassType && p.typeOptions.isIndexable && p.ofTypes.length === 1) {
    return new TypeHolder(p, [flatten(p.ofTypes[0])]);
  }

  if (p instanceof ClassType && p.typeOptions.isIndexable && p.ofTypes.length === 2) {
    return new TypeHolder(p, [flatten(p.ofTypes[0]), flatten(p.ofTypes[1])]);
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

  if (type instanceof TupleType) {
    return type.ofTypes.some((t) => containsGenericType(t));
  }
  if (type instanceof ClassType) {
    if (isClass(type.scope)) {
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
    return type.reify(type.ofTypes.map((t) => generateType(t, matches, depth)));
  }

  if (type instanceof GenericParameterType) {
    let match = matches.get(type.id);
    if (match instanceof TypeHolder) {
      match = generateType(match.symbolType, matches, depth);
    }

    match = match ?? type;

    if (match instanceof GenericParameterType) {
      let newConstraint: SymbolType | undefined = undefined;

      if (match.constraint) {
        newConstraint = generateType(match.constraint, matches, depth);
      }

      if (newConstraint) {
        match = new GenericParameterType(match.id, newConstraint) as GenericParameterType;
      }
    }

    return match;
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
      type.deprecated,
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
        if (!t.constraint || t.constraint.isAssignableFrom(st)) {
          matches.set(t.id, st);
        }
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

export function matchParametersAndTypes(
  id: string,
  methodSymbolType: FunctionType | ProcedureType,
  parameters: AstNode[],
  compileErrors: CompileError[],
  location: string,
) {
  let parameterTypes = methodSymbolType.parameterTypes;

  if (parameterTypes.some((pt) => containsGenericType(pt))) {
    const matches = matchGenericTypes(methodSymbolType, parameters);
    parameterTypes = parameterTypes.map((pt) => generateType(pt, matches));
  }

  mustMatchParameters(
    id,
    parameters,
    parameterTypes,
    parameterNamesWithTypes(methodSymbolType, parameterTypes).join(", "),
    methodSymbolType.isExtension,
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
  [OperationSymbol.Or, "or"],
]);

export function mapOperation(op: string): OperationSymbol {
  op = op.trim();

  for (const e of opMap.entries()) {
    if (e[1] === op) {
      return e[0];
    }
  }
  return OperationSymbol.Unknown;
}

export function getIndexAndOfType(rootType: SymbolType): [SymbolType, SymbolType] {
  if (isClassType(rootType) && isClass(rootType.scope)) {
    if (rootType.scope.ofTypes.length === 1) {
      return [IntType.Instance, rootType.scope.ofTypes[0]];
    }

    if (rootType.scope.ofTypes.length === 2) {
      return [rootType.scope.ofTypes[0], rootType.scope.ofTypes[1]];
    }
  }

  if (isGenericSymbolType(rootType)) {
    return [IntType.Instance, rootType.ofTypes[0]];
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
  const [indexType] = getIndexAndOfType(rootType);
  if (index.index instanceof IndexDoubleAsn) {
    mustBeDoubleIndexableType(id, rootType, true, compileErrors, fieldId);
    mustBeAssignableType(indexType, index.index.index1.symbolType(), compileErrors, fieldId);
    mustBeAssignableType(indexType, index.index.index2.symbolType(), compileErrors, fieldId);
  } else {
    mustBeIndexableType(id, rootType, true, compileErrors, fieldId);
    mustBeAssignableType(indexType, index.index.symbolType(), compileErrors, fieldId);
  }
  return wrapSimpleSubscript(`${prefix}${code}, ${postfix}`);
}

export function compileNodes(nodes: AstNode[]): string {
  let result = "";
  if (nodes.length > 0) {
    const ss: Array<string> = [];
    for (const node of nodes) {
      ss.push(node.compile());
    }
    result = ss.join("\r\n");
  }
  return result;
}

export function isInsideFunction(scope: Scope): boolean {
  if (scope instanceof FunctionAsn) {
    return true;
  }
  if (scope instanceof FileAsn) {
    return false;
  }
  return isInsideFunction(scope.getParentScope());
}

export function isInsideFunctionOrConstructor(scope: Scope): boolean {
  if (scope instanceof FunctionAsn) {
    return true;
  }
  if (scope instanceof ConstructorAsn) {
    return true;
  }
  if (scope instanceof FileAsn) {
    return false;
  }
  return isInsideFunctionOrConstructor(scope.getParentScope());
}

export function isInsideConstant(scope: Scope): boolean {
  if (scope instanceof GlobalConstantAsn) {
    return true;
  }
  if (scope instanceof FileAsn) {
    return false;
  }
  return isInsideConstant(scope.getParentScope());
}

export function getChildRange(compileChildren: AstNode[], initialScope: Scope) {
  const fst = compileChildren[0];
  const fi = compileChildren.indexOf(fst);
  const li = isAstNode(initialScope) ? compileChildren.indexOf(initialScope) : -1;

  return fi < li ? compileChildren.slice(fi, li + 1) : compileChildren.slice(li, fi + 1);
}

export function childSymbolMatches(
  compileChildren: AstNode[],
  id: string,
  all: boolean,
  matches: ElanSymbol[],
  initialScope: Scope,
): ElanSymbol[] {
  let localMatches: ElanSymbol[] = [];

  if (compileChildren.length > 0) {
    let range = getChildRange(compileChildren, initialScope);

    if (range.length > 1) {
      range = range.slice(0, range.length - 1);
      const symbols = handleDeconstruction(range.filter((r) => isSymbol(r)));
      localMatches = localMatches.concat(symbolMatches(id, all, symbols));
    }
  }
  return localMatches.concat(matches);
}

export function getChildSymbol(compileChildren: AstNode[], id: string, initialScope: Scope) {
  if (compileChildren.length > 0) {
    let range = getChildRange(compileChildren, initialScope);

    if (range.length > 1) {
      range = range.slice(0, range.length - 1);

      for (const f of range) {
        if (isSymbol(f) && id) {
          const sids = getIdsFromString(f.symbolId);
          if (sids.includes(id)) {
            return f;
          }
        }
      }
    }
  }

  return undefined;
}
