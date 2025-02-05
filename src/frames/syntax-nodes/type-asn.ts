import { CompileError } from "../compile-error";
import { mustBeKnownSymbolType, mustMatchGenericParameters } from "../compile-rules";
import { AstNode } from "../interfaces/ast-node";
import { AstTypeNode } from "../interfaces/ast-type-node";
import { Scope } from "../interfaces/scope";
import { ClassType } from "../symbols/class-type";
import { DictionaryImmutableType } from "../symbols/dictionary-immutable-type";
import { DictionaryType } from "../symbols/dictionary-type";
import { FunctionType } from "../symbols/function-type";
import { StringType } from "../symbols/string-type";
import {
  getGlobalScope,
  isAnyDictionaryType,
  isClassTypeDef,
  isIterableType,
  isListType,
  isReifyableSymbolType,
} from "../symbols/symbol-helpers";
import { TupleType } from "../symbols/tuple-type";
import { UnknownType } from "../symbols/unknown-type";
import { AbstractAstNode } from "./abstract-ast-node";
import { matchClassGenericTypes, transforms } from "./ast-helpers";

export class TypeAsn extends AbstractAstNode implements AstTypeNode {
  constructor(
    public readonly id: string,
    public readonly genericParameters: AstNode[],
    public readonly fieldId: string,
    private readonly scope: Scope,
  ) {
    super();
  }

  aggregateCompileErrors(): CompileError[] {
    let cc: CompileError[] = [];
    for (const i of this.genericParameters) {
      cc = cc.concat(i.aggregateCompileErrors());
    }
    return this.compileErrors.concat(cc);
  }

  expectedMinimumGenericParameters() {
    const st = this.symbolType();

    if (st instanceof StringType) {
      return 0;
    }

    if (isListType(st) || isIterableType(st)) {
      return 1;
    }

    if (isAnyDictionaryType(st)) {
      return 2;
    }

    if (st instanceof TupleType) {
      return st.ofTypes.length;
    }

    if (st instanceof ClassType) {
      return st.scope?.ofTypes.length ?? 0;
    }

    if (st instanceof FunctionType) {
      return st.parameterTypes.length + 1;
    }

    return 0;
  }

  compile(): string {
    this.compileErrors = [];

    mustBeKnownSymbolType(
      this.rootSymbol().symbolType(transforms()),
      this.id,
      this.compileErrors,
      this.fieldId,
    );

    mustMatchGenericParameters(
      this.genericParameters,
      this.expectedMinimumGenericParameters(),
      this.compileErrors,
      this.fieldId,
    );

    for (const gp of this.genericParameters) {
      gp.compile();
    }

    if (this.id === "Dictionary" || this.id === "DictionaryImmutable") {
      return "Object";
    }

    if (this.id === "List") {
      return "Array";
    }

    return this.id;
  }

  compileToEmptyObjectCode(): string {
    const st = this.symbolType();
    return st.initialValue;
  }

  safeGetGenericParameterSymbolType(index: number) {
    return this.genericParameters[index]?.symbolType() ?? UnknownType.Instance;
  }

  rootSymbol() {
    const globalScope = getGlobalScope(this.scope);
    return globalScope.resolveSymbol(this.id, transforms(), this.scope);
  }

  symbolType() {
    const symbol = this.rootSymbol();
    const st = symbol.symbolType(transforms());

    if (isReifyableSymbolType(st)) {
      return st.reify([this.safeGetGenericParameterSymbolType(0)]);
    }

    if (st instanceof DictionaryType) {
      return new DictionaryType(
        this.safeGetGenericParameterSymbolType(0),
        this.safeGetGenericParameterSymbolType(1),
      );
    }

    if (st instanceof DictionaryImmutableType) {
      return new DictionaryImmutableType(
        this.safeGetGenericParameterSymbolType(0),
        this.safeGetGenericParameterSymbolType(1),
      );
    }

    if (st instanceof TupleType) {
      return new TupleType(this.genericParameters.map((p) => p.symbolType()));
    }

    if (st instanceof FunctionType) {
      const names = this.genericParameters.map((_p, i) => `parameter${i}`);
      const types = this.genericParameters.map((p) => p.symbolType());
      const pNames = names.slice(0, -1);
      const pTypes = types.slice(0, -1);
      const rType = types[types.length - 1] ?? UnknownType.Instance;
      return new FunctionType(pNames, pTypes, rType, false, true, true);
    }

    if (st instanceof ClassType) {
      if (isClassTypeDef(symbol) && this.genericParameters.length > 0) {
        symbol.genericParamMatches = matchClassGenericTypes(symbol, this.genericParameters);
      }

      return st;
    }

    return st;
  }

  toString() {
    const pp = this.genericParameters.map((p) => p.toString()).join(", ");
    const gp = pp ? `<${pp}>` : "";
    return `${this.id}${gp}`;
  }
}
