import { ClassType } from "../symbols/class-type";
import { CompileError } from "../compile-error";
import {
  mustBeConcreteClass,
  mustBeKnownSymbolType,
  mustBeNewable,
  mustMatchParameters,
} from "../compile-rules";
import { ClassFrame } from "../globals/class-frame";
import { Scope } from "../interfaces/scope";
import { AbstractAstNode } from "./abstract-ast-node";
import { transforms } from "./ast-helpers";
import { AstNode } from "../interfaces/ast-node";
import { TypeAsn } from "./type-asn";
import { ImmutableListType } from "../symbols/immutable-list-type";
import { ArrayListType } from "../symbols/array-list-type";
import { ImmutableDictionaryType } from "../symbols/immutable-dictionary-type";
import { DictionaryType } from "../symbols/dictionary-type";
import { IntType } from "../symbols/int-type";

export class NewAsn extends AbstractAstNode implements AstNode {
  constructor(
    private readonly typeNode: TypeAsn,
    private readonly parameters: AstNode[],
    public readonly fieldId: string,
    private readonly scope: Scope,
  ) {
    super();
  }

  aggregateCompileErrors(): CompileError[] {
    let cc: CompileError[] = [];
    for (const i of this.parameters) {
      cc = cc.concat(i.aggregateCompileErrors());
    }
    return this.compileErrors.concat(this.typeNode.aggregateCompileErrors()).concat(cc);
  }

  compile(): string {
    this.compileErrors = [];

    const parametersAsString = this.parameters.map((p) => p.compile()).join(", ");
    const typeAsString = this.typeNode.compile();
    const type = this.typeNode.symbolType();

    mustBeKnownSymbolType(type, typeAsString, this.compileErrors, this.fieldId);

    if (type instanceof ArrayListType) {
      mustMatchParameters(this.parameters, [], false, this.compileErrors, this.fieldId);
      return `system.initialise(system.array(new Array()))`;
    }

    if (type instanceof ImmutableListType) {
      mustMatchParameters(this.parameters, [], false, this.compileErrors, this.fieldId);
      return `system.initialise(system.immutableList(new Array()))`;
    }

    if (type instanceof ImmutableDictionaryType) {
      mustMatchParameters(this.parameters, [], false, this.compileErrors, this.fieldId);
      return `system.initialise(system.immutableDictionary(new Object()))`;
    }

    if (type instanceof DictionaryType) {
      mustMatchParameters(this.parameters, [], false, this.compileErrors, this.fieldId);
      return `system.initialise(system.dictionary(new Object()))`;
    }

    if (type instanceof ClassType) {
      mustBeConcreteClass(type, this.compileErrors, this.fieldId);

      if (type.isAbstract === false) {
        const classSymbol = this.scope.resolveSymbol(type.className, transforms(), this.scope);

        // todo is this right - or should we resolve constructor on class scope and get constructor symbol ?
        const parameterTypes = (classSymbol as ClassFrame)
          .getConstructor()
          .params.symbolTypes(transforms());
        mustMatchParameters(
          this.parameters,
          parameterTypes,
          false,
          this.compileErrors,
          this.fieldId,
        );
      }

      return `system.initialise(new ${type.className}(${parametersAsString}))`;
    }

    mustBeNewable(typeAsString, this.compileErrors, this.fieldId);
    return "";
  }

  symbolType() {
    return this.typeNode.symbolType();
  }

  toString() {
    const pp = this.parameters.map((p) => p.toString()).join(", ");
    return `new ${this.typeNode}(${pp})`;
  }
}
