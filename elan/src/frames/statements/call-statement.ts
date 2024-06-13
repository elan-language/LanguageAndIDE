import { ArgListField } from "../fields/arg-list-field";
import { Parent } from "../interfaces/parent";
import { Field } from "../interfaces/field";
import { CodeSource } from "../code-source";
import { ProcRefField } from "../fields/proc-ref-field";
import { AbstractFrame } from "../abstract-frame";
import { Statement } from "../interfaces/statement";
import { ProcedureType } from "../symbols/procedure-type";
import {
  mustBeProcedure,
  mustBeKnownSymbol,
  mustMatchParameters,
  mustCallExtensionViaQualifier,
} from "../compile-rules";
import { callKeyword } from "../keywords";
import { AstCollectionNode } from "../interfaces/ast-collection-node";
import { Transforms } from "../syntax-nodes/transforms";
import { scopePrefix, updateScopeAndQualifier } from "../symbols/symbol-helpers";
import { AstQualifiedNode } from "../interfaces/ast-qualified-node";
import { AstNode } from "../interfaces/ast-node";
import { QualifierAsn } from "../syntax-nodes/qualifier-asn";
import { Constructor } from "../class-members/constructor";
import { TestFrame } from "../globals/test-frame";

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
    return `<statement class="${this.cls()}" id='${this.htmlId}' tabindex="0"><top><keyword>call </keyword>${this.proc.renderAsHtml()}(${this.args.renderAsHtml()})</top>${this.compileMsgAsHtml()}</statement>`;
  }

  renderAsSource(): string {
    return `${this.indent()}call ${this.proc.renderAsSource()}(${this.args.renderAsSource()})`;
  }

  compile(transforms: Transforms): string {
    this.compileErrors = [];

    const astNode = this.proc.getOrTransformAstNode(transforms) as AstQualifiedNode;
    const id = astNode.id;

    const [updatedQualifier, currentScope] = updateScopeAndQualifier(
      astNode.qualifier,
      transforms,
      this,
    );
    let qualifier = updatedQualifier;

    const procSymbol = currentScope.resolveSymbol(id, transforms, this);

    mustBeKnownSymbol(procSymbol, this.compileErrors, this.htmlId);
    mustBeProcedure(procSymbol.symbolType(transforms), this.compileErrors, this.htmlId);

    const ps = procSymbol.symbolType(transforms);
    const argList = this.args.getOrTransformAstNode(transforms) as AstCollectionNode;
    let parameters = argList.items;
    let isAsync: boolean = false;

    if (ps instanceof ProcedureType) {
      mustCallExtensionViaQualifier(ps, qualifier, this.compileErrors, this.htmlId);

      if (ps.isExtension && qualifier instanceof QualifierAsn) {
        parameters = [qualifier.value as AstNode].concat(parameters);
        qualifier = undefined;
      }

      mustMatchParameters(
        parameters,
        ps.parametersTypes,
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
}
