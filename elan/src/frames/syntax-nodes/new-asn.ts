import { ClassType } from "../symbols/class-type";
import { CompileError } from "../compile-error";
import {
  mustBeConcreteClass,
  mustBeKnownSymbol,
  mustBeOneOrTwoOfTypeInt,
  mustMatchParameters,
} from "../compile-rules";
import { ClassFrame } from "../globals/class-frame";
import { Scope } from "../interfaces/scope";
import { AbstractAstNode } from "./abstract-ast-node";
import { transforms } from "./ast-helpers";
import { AstNode } from "../interfaces/ast-node";
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

  aggregateCompileErrors(): CompileError[] {
    let cc: CompileError[] = [];
    for (const i of this.parameters) {
      cc = cc.concat(i.aggregateCompileErrors());
    }
    return this.compileErrors
      .concat(this.typeNode.aggregateCompileErrors())
      .concat(cc);
  }

  compile(): string {
    this.compileErrors = [];
    let gt = this.typeNode.genericParameters
      .map((p) => `"${p.compile()}"`)
      .join(", ");
    gt = gt ? `, [${gt}]` : "";
    const pp = this.parameters.map((p) => p.compile()).join(", ");
    const t = this.typeNode.compile();
    if (this.typeNode.id === "ArrayList") {
      this.typeNode.is2d = this.parameters.length === 2;
      mustBeOneOrTwoOfTypeInt(
        this.parameters,
        this.compileErrors,
        this.fieldId,
      );
      return `system.initialise(system.array(${pp})${gt})`;
    }

    if (this.typeNode.id === "ImmutableList") {
      return `system.initialise(system.list(new ${t}(${pp}))${gt})`;
    }

    if (this.typeNode.id === "ImmutableDictionary") {
      return `system.initialise(system.immutableDictionary(new ${t}(${pp}))${gt})`;
    }

    if (this.typeNode.id === "Dictionary") {
      return `system.initialise(system.dictionary(new ${t}(${pp}))${gt})`;
    }

    const cls = this.scope.resolveSymbol(
      this.typeNode.id,
      transforms(),
      this.scope,
    );
    
    mustBeKnownSymbol(cls, this.compileErrors, this.fieldId);

    const cdt = cls.symbolType(transforms());

    if (cdt instanceof ClassType) {
      mustBeConcreteClass(cdt, this.compileErrors, this.fieldId);

      if (cdt.isAbstract === false) {
        // todo is this right - or should we resolve constructor on class scope and get constructor symbol ?
        const parameterTypes = (cls as ClassFrame)
          .getConstructor()
          .params.symbolTypes(transforms());
        mustMatchParameters(
          this.parameters,
          parameterTypes,
          this.compileErrors,
          this.fieldId,
        );
      }
    }

    return `system.initialise(new ${t}(${pp})${gt})`;
  }

  symbolType() {
    return this.typeNode.symbolType();
  }

  toString() {
    const pp = this.parameters.map((p) => p.toString()).join(", ");
    return `new ${this.typeNode}(${pp})`;
  }
}
