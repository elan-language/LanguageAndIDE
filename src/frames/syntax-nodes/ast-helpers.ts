import { ElanCompilerError } from "../../elan-compiler-error";
import { CompileError } from "../compile-error";
import { mustMatchParameters } from "../compile-rules";
import { isFile, isFrame, isFunction } from "../helpers";
import { AstCollectionNode } from "../interfaces/ast-collection-node";
import { AstIdNode } from "../interfaces/ast-id-node";
import { AstIndexableNode } from "../interfaces/ast-indexable-node";
import { AstNode } from "../interfaces/ast-node";
import { AstQualifiedNode } from "../interfaces/ast-qualified-node";
import { AstQualifierNode } from "../interfaces/ast-qualifier-node";
import { Scope } from "../interfaces/scope";
import { SymbolType } from "../interfaces/symbol-type";
import { AbstractDictionaryType } from "../symbols/abstract-dictionary-type";
import { ArrayType } from "../symbols/array-list-type";
import { ClassTypeDef } from "../symbols/class-type-def";
import { DictionaryType } from "../symbols/dictionary-type";
import { FunctionType } from "../symbols/function-type";
import { GenericParameterType } from "../symbols/generic-parameter-type";
import { ImmutableDictionaryType } from "../symbols/immutable-dictionary-type";
import { IterableType } from "../symbols/iterable-type";
import { ListType } from "../symbols/list-type";
import { ProcedureType } from "../symbols/procedure-type";
import { StringType } from "../symbols/string-type";
import { isAnyDictionaryType } from "../symbols/symbol-helpers";
import { TupleType } from "../symbols/tuple-type";
import { UnknownType } from "../symbols/unknown-type";
import { transform, transformMany } from "./ast-visitor";
import { DeconstructedListAsn } from "./deconstructed-list-asn";
import { DeconstructedTupleAsn } from "./deconstructed-tuple-asn";
import { OperationSymbol } from "./operation-symbol";
import { Transforms } from "./transforms";

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
  isImmutable = false;
  name = "TypeHolder";
  initialValue = "";
  toString() {
    return this.name;
  }
}

export function flatten(p: SymbolType): SymbolType {
  if (p instanceof ArrayType || p instanceof ListType || p instanceof IterableType) {
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
    for (const t of p.parametersTypes) {
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
  if (type instanceof ArrayType || type instanceof ListType || type instanceof IterableType) {
    return containsGenericType(type.ofType);
  }
  if (isAnyDictionaryType(type)) {
    return containsGenericType(type.keyType) || containsGenericType(type.valueType);
  }
  if (type instanceof TupleType) {
    return type.ofTypes.some((t) => containsGenericType(t));
  }

  return false;
}

export function generateType(type: SymbolType, matches: Map<string, SymbolType>): SymbolType {
  if (type instanceof GenericParameterType) {
    const match = matches.get(type.id);
    if (match instanceof TypeHolder) {
      return generateType(match.symbolType, matches);
    }

    return match ?? UnknownType.Instance;
  }
  if (type instanceof ArrayType) {
    return new ArrayType(generateType(type.ofType, matches));
  }
  if (type instanceof ListType) {
    return new ListType(generateType(type.ofType, matches));
  }
  if (type instanceof IterableType) {
    return new IterableType(generateType(type.ofType, matches));
  }
  if (type instanceof DictionaryType) {
    return new DictionaryType(
      generateType(type.keyType, matches),
      generateType(type.valueType, matches),
    );
  }
  if (type instanceof ImmutableDictionaryType) {
    return new ImmutableDictionaryType(
      generateType(type.keyType, matches),
      generateType(type.valueType, matches),
    );
  }
  if (type instanceof AbstractDictionaryType) {
    return new AbstractDictionaryType(
      generateType(type.keyType, matches),
      generateType(type.valueType, matches),
    );
  }
  if (type instanceof TupleType) {
    return new TupleType(type.ofTypes.map((t) => generateType(t, matches)));
  }

  if (type instanceof FunctionType) {
    return new FunctionType(
      type.parametersTypes.map((t) => generateType(t, matches)),
      generateType(type.returnType, matches),
      type.isExtension,
      type.isPure,
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

export function matchGenericTypes(
  type: FunctionType | ProcedureType,
  parameters: AstNode[],
  cls?: ClassTypeDef,
) {
  const matches = new Map<string, SymbolType>();

  if (cls) {
    return cls.gpMap ?? matches;
  }

  const flattened = type.parametersTypes.map((n) => flatten(n));

  const pTypes = parameters.map((p) => flatten(p.symbolType()));
  match(flattened, pTypes, matches);
  return matches;
}

export function matchClassGenericTypes(type: ClassTypeDef, parameters: AstNode[]) {
  const matches = new Map<string, SymbolType>();
  const flattened = type.ofTypes.map((n) => flatten(n));
  const pTypes = parameters.map((p) => flatten(p.symbolType()));
  match(flattened, pTypes, matches);
  return matches;
}

export function matchParametersAndTypes(
  funcSymbolType: FunctionType | ProcedureType,
  parameters: AstNode[],
  scope: Scope | undefined,
  compileErrors: CompileError[],
  location: string,
) {
  let parameterTypes = funcSymbolType.parametersTypes;

  if (parameterTypes.some((pt) => containsGenericType(pt))) {
    const cls = scope instanceof ClassTypeDef ? scope : undefined;
    const matches = matchGenericTypes(funcSymbolType, parameters, cls);
    parameterTypes = parameterTypes.map((pt) => generateType(pt, matches));
  }

  mustMatchParameters(
    parameters,
    parameterTypes,
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

export function wrapDeconstruction(lhs: AstNode, code: string) {
  if (lhs instanceof DeconstructedListAsn) {
    return `system.deconstructList(${code})`;
  }

  if (lhs instanceof DeconstructedTupleAsn) {
    return code;
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
