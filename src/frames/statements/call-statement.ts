import { AbstractFrame } from "../abstract-frame";
import { Constructor } from "../class-members/constructor";
import { ProcedureMethod } from "../class-members/procedure-method";
import { CodeSource } from "../code-source";
import {
  cannotCallOnParameter,
  cannotPassAsOutParameter,
  mustBeKnownSymbol,
  mustBeProcedure,
  mustBePublicMember,
  mustCallExtensionViaQualifier,
  mustMatchParameters,
} from "../compile-rules";
import { ArgListField } from "../fields/arg-list-field";
import { ProcRefField } from "../fields/proc-ref-field";
import { ClassFrame } from "../globals/class-frame";
import { ProcedureFrame } from "../globals/procedure-frame";
import { AstNode } from "../interfaces/ast-node";
import { Field } from "../interfaces/field";
import { Parent } from "../interfaces/parent";
import { Statement } from "../interfaces/statement";
import { callKeyword } from "../keywords";
import { ProcedureType } from "../symbols/procedure-type";
import {
  getClassScope,
  isMemberOnFieldsClass,
  scopePrefix,
  updateScopeAndQualifier,
} from "../symbols/symbol-helpers";
import { SymbolScope } from "../symbols/symbol-scope";
import {
  containsGenericType,
  generateType,
  isAstCollectionNode,
  isAstIdNode,
  matchGenericTypes,
} from "../syntax-nodes/ast-helpers";
import { IdAsn } from "../syntax-nodes/id-asn";
import { QualifierAsn } from "../syntax-nodes/qualifier-asn";
import { Transforms } from "../syntax-nodes/transforms";
import { LetStatement } from "./let-statement";
import { VarStatement } from "./var-statement";

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

    if (!isMemberOnFieldsClass(procSymbol, transforms, this)) {
      mustBePublicMember(procSymbol, this.compileErrors, this.htmlId);
    }

    const ps = procSymbol.symbolType(transforms);
    const argList = this.args.getOrTransformAstNode(transforms);

    if (qualifier instanceof QualifierAsn && isAstIdNode(qualifier.value)) {
      const qSymbol = this.getParentScope().resolveSymbol(qualifier.value.id, transforms, this);
      if (qSymbol.symbolScope === SymbolScope.parameter) {
        cannotCallOnParameter(qualifier.value, this.compileErrors, this.htmlId);
      }
    }

    if (isAstCollectionNode(argList)) {
      let callParameters = argList.items;
      let isAsync: boolean = false;

      if (ps instanceof ProcedureType) {
        mustCallExtensionViaQualifier(ps, qualifier, this.compileErrors, this.htmlId);

        if (ps.isExtension && qualifier instanceof QualifierAsn) {
          callParameters = [qualifier.value as AstNode].concat(callParameters);
          qualifier = undefined;
        }

        let parameterTypes = ps.parametersTypes;

        if (parameterTypes.some((pt) => containsGenericType(pt))) {
          // this.parameters is correct - function adds qualifier if extension
          const matches = matchGenericTypes(
            ps,
            argList.items,
            (updatedQualifier as QualifierAsn | undefined)?.value,
          );
          parameterTypes = parameterTypes.map((pt) => generateType(pt, matches));
        }

        mustMatchParameters(
          callParameters,
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

      const wrappedInParameters: string[] = [];
      const wrappedOutParameters: string[] = [];
      const passedParameters: string[] = [];

      const parameterDefScopes =
        procSymbol instanceof ProcedureFrame
          ? procSymbol.params.symbolMatches("", true, this).map((s) => s.symbolScope)
          : [];

      for (let i = 0; i < callParameters.length; i++) {
        const p = callParameters[i];
        let pName = p.compile();

        const parameterDefScope =
          i < parameterDefScopes.length ? parameterDefScopes[i] : SymbolScope.parameter;
        if (parameterDefScope === SymbolScope.outParameter) {
          if (isAstIdNode(p)) {
            const callParamSymbol = this.getParentScope().resolveSymbol(p.id, transforms, this);
            if (
              callParamSymbol instanceof VarStatement ||
              callParamSymbol.symbolScope === SymbolScope.parameter ||
              callParamSymbol.symbolScope === SymbolScope.outParameter
            ) {
              const tpName = `_${p.id}`;
              wrappedInParameters.push(`var ${tpName} = [${pName}]`);
              wrappedOutParameters.push(`${pName} = ${tpName}[0]`);
              pName = tpName;
            } else {
              const msg = callParamSymbol instanceof LetStatement ? `let ${p.id}` : p;
              cannotPassAsOutParameter(msg, this.compileErrors, this.htmlId);
            }
          } else {
            cannotPassAsOutParameter(p, this.compileErrors, this.htmlId);
          }
        }
        passedParameters.push(pName);
      }

      const pp = passedParameters.join(", ");
      const q = qualifier
        ? `${qualifier.compile()}`
        : scopePrefix(procSymbol, this.compileErrors, this, this.htmlId);
      const a = isAsync ? "await " : "";
      let prefix = "";
      let postfix = "";

      if (wrappedInParameters.length > 0) {
        prefix = `${this.indent()}${wrappedInParameters.join("; ")};\n`;
      }

      if (wrappedOutParameters.length > 0) {
        postfix = `\n${this.indent()}${wrappedOutParameters.join("; ")};`;
      }

      return `${prefix}${this.indent()}${a}${q}${id}(${pp});${postfix}`;
    }
    return "";
  }
}
