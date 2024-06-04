import { BooleanType } from "../symbols/boolean-type";
import { DictionaryType } from "../symbols/dictionary-type";
import { FloatType } from "../symbols/float-type";
import { IntType } from "../symbols/int-type";
import { IterType } from "../symbols/iter-type";
import { ImmutableListType } from "../symbols/immutable-list-type";
import { StringType } from "../symbols/string-type";
import { TupleType } from "../symbols/tuple-type";
import { Scope } from "../interfaces/scope";
import { AstNode } from "../interfaces/ast-node";
import { CompileError } from "../compile-error";
import { ArrayListType } from "../symbols/array-list-type";
import { AbstractAstNode } from "./abstract-ast-node";
import { AstTypeNode } from "../interfaces/ast-type-node";
import { FunctionType } from "../symbols/function-type";
import { transforms } from "./ast-helpers";
import { EnumType } from "../symbols/enum-type";

export class TypeAsn extends AbstractAstNode implements AstTypeNode {
  constructor(
    public readonly id: string,
    public readonly genericParameters: AstNode[],
    public readonly fieldId: string,
    private readonly scope: Scope,
  ) {
    super();
  }

  is2d: boolean = false;

  aggregateCompileErrors(): CompileError[] {
    let cc: CompileError[] = [];
    for (const i of this.genericParameters) {
      cc = cc.concat(i.aggregateCompileErrors());
    }
    return this.compileErrors.concat(cc);
  }

  compile(): string {
    this.compileErrors = [];
    if (this.id === "Dictionary" || this.id === "ImmutableDictionary") {
      return "Object";
    }

    if (this.id === "ImmutableList") {
      return "Array";
    }

    return this.id;
  }

  compileToEmptyObjectCode(): string {
    switch (this.id) {
      case "Int":
      case "Float":
        return "0";
      case "String":
        return '""';
      case "Boolean":
        return "false";
      case "ImmutableList":
        return "system.emptyImmutableList()";
      case "ArrayList":
        return "system.emptyArrayList()";
      case "Dictionary":
        return "system.emptyDictionary()";
      case "ImmutableDictionary":
        return "system.emptyImmutableDictionary()";
      case "Iter":
        return "system.emptyIter()";
    }
    const st = this.symbolType();

    if (st instanceof EnumType) {
      return `${this.id}._default`;
    }

    return `${this.id}.emptyInstance()`;
  }

  symbolType() {
    switch (this.id) {
      case "Int":
        return IntType.Instance;
      case "Float":
        return FloatType.Instance;
      case "Boolean":
        return BooleanType.Instance;
      case "String":
        return StringType.Instance;
      case "ImmutableList":
        return new ImmutableListType(this.genericParameters[0].symbolType());
      case "ArrayList":
        return new ArrayListType(this.genericParameters[0].symbolType(), this.is2d);
      case "Dictionary":
        return new DictionaryType(
          this.genericParameters[0].symbolType(),
          this.genericParameters[1].symbolType(),
          false,
        );
      case "ImmutableDictionary":
        return new DictionaryType(
          this.genericParameters[0].symbolType(),
          this.genericParameters[1].symbolType(),
          true,
        );
      case "Tuple":
        return new TupleType(this.genericParameters.map((p) => p.symbolType()));
      case "Iter":
        return new IterType(this.genericParameters[0].symbolType());
      case "Func":
        const types = this.genericParameters.map((p) => p.symbolType());
        const pTypes = types.slice(0, -1);
        const rType = types[types.length - 1];
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
