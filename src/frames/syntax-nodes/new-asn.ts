import {
  mustBeConcreteClass,
  mustBeKnownSymbolType,
  mustBeNewable,
  mustMatchParameters,
} from "../compile-rules";
import { AstNode } from "../interfaces/ast-node";
import { Scope } from "../interfaces/scope";
import { constructorKeyword } from "../keywords";
import { ClassSubType, ClassType } from "../symbols/class-type";
import { ProcedureType } from "../symbols/procedure-type";
import { getGlobalScope, parameterNamesWithTypes } from "../symbols/symbol-helpers";
import { SymbolScope } from "../symbols/symbol-scope";
import { AbstractAstNode } from "./abstract-ast-node";
import { transforms } from "./ast-helpers";
import { TypeAsn } from "./type-asn";

export class NewAsn extends AbstractAstNode implements AstNode {
  constructor(
    private readonly typeNode: TypeAsn,
    private readonly parameters: AstNode[],
    public readonly fieldId: string,
    private readonly scope: Scope,
  ) {
    super();
  }

  compile(): string {
    this.compileErrors = [];

    const parametersAsString = this.parameters.map((p) => p.compile()).join(", ");
    const typeAsString = this.typeNode.compile();
    const type = this.typeNode.symbolType();
    let libScope = false;

    mustBeKnownSymbolType(type, typeAsString, this.compileErrors, this.fieldId);

    if (type instanceof ClassType) {
      mustBeConcreteClass(type, this.compileErrors, this.fieldId);

      if (type.subType === ClassSubType.concrete) {
        const tf = transforms();
        const classSymbol = this.scope.resolveSymbol(type.className, tf, this.scope);

        libScope = classSymbol.symbolScope === SymbolScope.stdlib;

        const constructorType = type
          .resolveSymbol(`__${constructorKeyword}`, tf, this.scope)
          .symbolType();

        const parameterTypes =
          constructorType instanceof ProcedureType ? constructorType.parameterTypes : [];

        mustMatchParameters(
          typeAsString,
          this.parameters,
          parameterTypes,
          parameterNamesWithTypes(constructorType).join(", "),
          false,
          this.compileErrors,
          this.fieldId,
        );
      }

      const scope = libScope ? "_stdlib." : "";

      getGlobalScope(this.scope).addCompileErrors(this.compileErrors);

      return `system.initialise(await new ${scope}${type.className}()._initialise(${parametersAsString}))`;
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
