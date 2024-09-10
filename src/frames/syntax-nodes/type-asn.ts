import { CompileError } from "../compile-error";
import { mustMatchGenericParameters } from "../compile-rules";
import { AstNode } from "../interfaces/ast-node";
import { AstTypeNode } from "../interfaces/ast-type-node";
import { Scope } from "../interfaces/scope";
import { ArrayListType } from "../symbols/array-list-type";
import { BooleanType } from "../symbols/boolean-type";
import { DictionaryType } from "../symbols/dictionary-type";
import { FloatType } from "../symbols/float-type";
import { FunctionType } from "../symbols/function-type";
import { ImmutableDictionaryType } from "../symbols/immutable-dictionary-type";
import { IntType } from "../symbols/int-type";
import { IterType } from "../symbols/iter-type";
import { ListType } from "../symbols/list-type";
import { RegexType } from "../symbols/regex-type";
import { StringType } from "../symbols/string-type";
import { TupleType } from "../symbols/tuple-type";
import { UnknownType } from "../symbols/unknown-type";
import { AbstractAstNode } from "./abstract-ast-node";
import { transforms } from "./ast-helpers";

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
      case "ArrayList":
      case "Func":
      case "Iter":
        return 1;
      case "Dictionary":
      case "ImmutableDictionary":
      case "Tuple":
        return 2;
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

    if (this.id === "Dictionary" || this.id === "ImmutableDictionary") {
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
      case "RegEx":
        return RegexType.Instance;
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
      case "ArrayList":
        return new ArrayListType(this.safeGetGenericParameterSymbolType(0));
      case "Dictionary":
        return new DictionaryType(
          this.safeGetGenericParameterSymbolType(0),
          this.safeGetGenericParameterSymbolType(1),
        );
      case "ImmutableDictionary":
        return new ImmutableDictionaryType(
          this.safeGetGenericParameterSymbolType(0),
          this.safeGetGenericParameterSymbolType(1),
        );
      case "Tuple":
        return new TupleType(this.genericParameters.map((p) => p.symbolType()));
      case "Iter":
        return new IterType(this.safeGetGenericParameterSymbolType(0));
      case "Func":
        const types = this.genericParameters.map((p) => p.symbolType());
        const pTypes = types.slice(0, -1);
        const rType = types[types.length - 1] ?? UnknownType.Instance;
        return new FunctionType(pTypes, rType, false);
      default: {
        return this.scope.resolveSymbol(this.id, transforms(), this.scope).symbolType(transforms());
      }
    }
  }

  toString() {
    const pp = this.genericParameters.map((p) => p.toString()).join(", ");
    const gp = pp ? `<${pp}>` : "";
    return `Type ${this.id}${gp}`;
  }
}
