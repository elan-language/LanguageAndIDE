import { CompileError } from "../compile-error";
import { mustMatchGenericParameters } from "../compile-rules";
import { AstNode } from "../interfaces/ast-node";
import { AstTypeNode } from "../interfaces/ast-type-node";
import { Scope } from "../interfaces/scope";
import { ArrayType } from "../symbols/array-list-type";
import { BooleanType } from "../symbols/boolean-type";
import { ClassType } from "../symbols/class-type";
import { DictionaryImmutableType } from "../symbols/dictionary-immutable-type";
import { DictionaryType } from "../symbols/dictionary-type";
import { FloatType } from "../symbols/float-type";
import { FunctionType } from "../symbols/function-type";
import { IntType } from "../symbols/int-type";
import { IterableType } from "../symbols/iterable-type";
import { ListType } from "../symbols/list-type";
import { RegExpType } from "../symbols/regexp-type";
import { StringType } from "../symbols/string-type";
import { isClassTypeDef } from "../symbols/symbol-helpers";
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
    switch (this.id) {
      case "List":
      case "Array":
      case "Iterable":
        return 1;
      case "Dictionary":
      case "DictionaryImmutable":
      case "Tuple":
        return 2;
    }

    const st = this.symbolType();

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

    mustMatchGenericParameters(
      this.genericParameters,
      this.expectedMinimumGenericParameters(),
      this.compileErrors,
      this.fieldId,
    );

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

  symbolType() {
    switch (this.id) {
      case "RegExp":
        return RegExpType.Instance;
      case "Int":
        return IntType.Instance;
      case "Float":
        return FloatType.Instance;
      case "Boolean":
        return BooleanType.Instance;
      case "String":
        return StringType.Instance;
      case "List":
        return new ListType(this.safeGetGenericParameterSymbolType(0));
      case "Array":
        return new ArrayType(this.safeGetGenericParameterSymbolType(0));
      case "Dictionary":
        return new DictionaryType(
          this.safeGetGenericParameterSymbolType(0),
          this.safeGetGenericParameterSymbolType(1),
        );
      case "DictionaryImmutable":
        return new DictionaryImmutableType(
          this.safeGetGenericParameterSymbolType(0),
          this.safeGetGenericParameterSymbolType(1),
        );
      case "Tuple":
        return new TupleType(this.genericParameters.map((p) => p.symbolType()));
      case "Iterable":
        return new IterableType(this.safeGetGenericParameterSymbolType(0));
      case "Func":
        const names = this.genericParameters.map((_p, i) => `parameter${i}`);
        const types = this.genericParameters.map((p) => p.symbolType());
        const pNames = names.slice(0, -1);
        const pTypes = types.slice(0, -1);
        const rType = types[types.length - 1] ?? UnknownType.Instance;
        return new FunctionType(pNames, pTypes, rType, false);
      default: {
        const ct = this.scope.resolveSymbol(this.id, transforms(), this.scope);
        const cst = this.scope
          .resolveSymbol(this.id, transforms(), this.scope)
          .symbolType(transforms());

        if (isClassTypeDef(ct) && this.genericParameters.length > 0) {
          ct.genericParamMatches = matchClassGenericTypes(ct, this.genericParameters);
        }

        return cst;
      }
    }
  }

  toString() {
    const pp = this.genericParameters.map((p) => p.toString()).join(", ");
    const gp = pp ? `<${pp}>` : "";
    return `${this.id}${gp}`;
  }
}
