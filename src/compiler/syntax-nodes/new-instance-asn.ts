import {
  mustBeConcreteClass,
  mustBeKnownSymbolType,
  mustBeNewable,
  mustMatchParameters,
} from "../compile-rules";
import { AstNode } from "../compiler-interfaces/ast-node";
import { Scope } from "../compiler-interfaces/scope";
import { constructorKeyword } from "../elan-keywords";
import { ClassSubType, ClassType } from "../symbols/class-type";
import { ProcedureType } from "../symbols/procedure-type";
import { getGlobalScope, parameterNamesWithTypes } from "../symbols/symbol-helpers";
import { SymbolScope } from "../symbols/symbol-scope";
import { AbstractAstNode } from "./abstract-ast-node";
import { TypeAsn } from "./type-asn";

export class NewInstanceAsn extends AbstractAstNode implements AstNode {
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
      mustBeConcreteClass(type, this.compileErrors, this.fieldId, this.scope);

      if (type.subType === ClassSubType.concrete) {
        libScope = type.scope.symbolScope === SymbolScope.stdlib;

        const constructorType = type
          .resolveSymbol(`__${constructorKeyword}`, true, this.scope)
          .symbolType();

        const parameterTypes =
          constructorType instanceof ProcedureType ? constructorType.parameterTypes : [];

        mustMatchParameters(
          typeAsString,
          this.parameters,
          parameterTypes,
          parameterNamesWithTypes(constructorType, this.scope).join(", "),
          false,
          this.compileErrors,
          this.fieldId,
          this.scope,
        );
      }

      const scope = libScope ? "_stdlib." : "";

      code = `system.initialise(await new ${scope}${type.className}()._initialise(${parametersAsString}))`;
    } else {
      mustBeNewable(typeAsString, this.compileErrors, this.fieldId);
      code = `system.initialise(await new ${typeAsString}()._initialise(${parametersAsString}))`;
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
