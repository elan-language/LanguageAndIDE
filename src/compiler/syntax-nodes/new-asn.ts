import { AstNode } from "../../compiler/compiler-interfaces/ast-node";
import { Scope } from "../../compiler/compiler-interfaces/scope";
import { ClassSubType, ClassType } from "../../compiler/symbols/class-type";
import { ProcedureType } from "../../compiler/symbols/procedure-type";
import { getGlobalScope, parameterNamesWithTypes } from "../../compiler/symbols/symbol-helpers";
import { SymbolScope } from "../../compiler/symbols/symbol-scope";
import { constructorKeyword } from "../../frames/keywords";
import {
  mustBeConcreteClass,
  mustBeKnownSymbolType,
  mustBeNewable,
  mustMatchParameters,
} from "../compile-rules";
import { AbstractAstNode } from "./abstract-ast-node";
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

    let code: string;

    if (type instanceof ClassType) {
      mustBeConcreteClass(type, this.compileErrors, this.fieldId);

      if (type.subType === ClassSubType.concrete) {
        const classSymbol = this.scope.resolveSymbol(type.className, this.scope);

        libScope = classSymbol.symbolScope === SymbolScope.stdlib;

        const constructorType = type
          .resolveSymbol(`__${constructorKeyword}`, this.scope)
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

      code = `system.initialise(await new ${scope}${type.className}()._initialise(${parametersAsString}))`;
    } else {
      mustBeNewable(typeAsString, this.compileErrors, this.fieldId);
      code = "";
    }

    getGlobalScope(this.scope).addCompileErrors(this.compileErrors);
    return code;
  }

  symbolType() {
    return this.typeNode.symbolType();
  }

  toString() {
    const pp = this.parameters.map((p) => p.toString()).join(", ");
    return `new ${this.typeNode}(${pp})`;
  }
}
