import { AbstractFrame } from "../abstract-frame";
import { Constructor } from "../class-members/constructor";
import { CodeSource } from "../code-source";
import {
  mustBeKnownSymbol,
  mustBeProcedure,
  mustCallExtensionViaQualifier,
  mustMatchParameters,
} from "../compile-rules";
import { ArgListField } from "../fields/arg-list-field";
import { ProcRefField } from "../fields/proc-ref-field";
import { AstNode } from "../interfaces/ast-node";
import { Field } from "../interfaces/field";
import { Parent } from "../interfaces/parent";
import { Statement } from "../interfaces/statement";
import { callKeyword } from "../keywords";
import { ProcedureType } from "../symbols/procedure-type";
import { scopePrefix, updateScopeAndQualifier } from "../symbols/symbol-helpers";
import {
  containsGenericType,
  generateType,
  isAstCollectionNode,
  isAstIdNode,
  matchGenericTypes,
} from "../syntax-nodes/ast-helpers";
import { QualifierAsn } from "../syntax-nodes/qualifier-asn";
import { Transforms } from "../syntax-nodes/transforms";

export class CallStatement extends AbstractFrame implements Statement {
  isStatement = true;
  proc: ProcRefField;
  args: ArgListField;

  constructor(parent: Parent) {
    super(parent);
    this.proc = new ProcRefField(this);
    this.proc.setPlaceholder("procedureName");
    this.args = new ArgListField(this);
  }

  initialKeywords(): string {
    return callKeyword;
  }

  parseFrom(source: CodeSource): void {
    source.removeIndent();
    source.remove("call ");
    this.proc.parseFrom(source);
    source.remove("(");
    this.args.parseFrom(source);
    source.remove(")");
    source.removeNewLine();
  }
  getFields(): Field[] {
    return [this.proc, this.args];
  }

  getIdPrefix(): string {
    return "call";
  }

  renderAsHtml(): string {
    return `<statement class="${this.cls()}" id='${this.htmlId}' tabindex="0"><top><keyword>call </keyword>${this.proc.renderAsHtml()}(${this.args.renderAsHtml()})${this.compileMsgAsHtml()}${this.getFrNo()}</statement>`;
  }

  renderAsSource(): string {
    return `${this.indent()}call ${this.proc.renderAsSource()}(${this.args.renderAsSource()})`;
  }

  compile(transforms: Transforms): string {
    this.compileErrors = [];

    const astNode = this.proc.getOrTransformAstNode(transforms);
    const id = isAstIdNode(astNode) ? astNode.id : "";

    const [updatedQualifier, currentScope] = updateScopeAndQualifier(astNode, transforms, this);

    let qualifier = updatedQualifier;

    const procSymbol = currentScope.resolveSymbol(id, transforms, this);

    mustBeKnownSymbol(procSymbol, this.compileErrors, this.htmlId);
    mustBeProcedure(procSymbol.symbolType(transforms), this.compileErrors, this.htmlId);

    const ps = procSymbol.symbolType(transforms);
    const argList = this.args.getOrTransformAstNode(transforms);

    if (isAstCollectionNode(argList)) {
      let parameters = argList.items;
      let isAsync: boolean = false;

      if (ps instanceof ProcedureType) {
        mustCallExtensionViaQualifier(ps, qualifier, this.compileErrors, this.htmlId);

        if (ps.isExtension && qualifier instanceof QualifierAsn) {
          parameters = [qualifier.value as AstNode].concat(parameters);
          qualifier = undefined;
        }

        let parameterTypes = ps.parametersTypes;

        if (parameterTypes.some((pt) => containsGenericType(pt))) {
          // this.parameters is correct - function adds qualifier if extension
          const matches = matchGenericTypes(ps, argList.items, updatedQualifier);
          parameterTypes = parameterTypes.map((pt) => generateType(pt, matches));
        }

        mustMatchParameters(
          parameters,
          parameterTypes,
          ps.isExtension,
          this.compileErrors,
          this.htmlId,
        );
        isAsync = ps.isAsync;
      }

      // todo temp fix pending constructor
      if (this.getParent() instanceof Constructor) {
        isAsync = false;
      }

      const pp = parameters.map((p) => p.compile()).join(", ");
      const q = qualifier ? `${qualifier.compile()}` : scopePrefix(procSymbol.symbolScope);
      const a = isAsync ? "await " : "";

      return `${this.indent()}${a}${q}${id}(${pp});`;
    }
    return "";
  }
}
