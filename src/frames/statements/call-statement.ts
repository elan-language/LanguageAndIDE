import { AbstractFrame } from "../abstract-frame";
import { Constructor } from "../class-members/constructor";
import { CodeSource } from "../code-source";
import {
  cannotCallOnParameter,
  cannotPassAsOutParameter,
  mustBeKnownSymbol,
  mustBeProcedure,
  mustBePublicMember,
  mustCallExtensionViaQualifier,
} from "../compile-rules";
import { ArgListField } from "../fields/arg-list-field";
import { ProcRefField } from "../fields/proc-ref-field";
import { ProcedureFrame } from "../globals/procedure-frame";
import { AstNode } from "../interfaces/ast-node";
import { ElanSymbol } from "../interfaces/elan-symbol";
import { Field } from "../interfaces/field";
import { Parent } from "../interfaces/parent";
import { Statement } from "../interfaces/statement";
import { callKeyword } from "../keywords";
import { ProcedureType } from "../symbols/procedure-type";
import {
  isMemberOnFieldsClass,
  scopePrefix,
  updateScopeAndQualifier,
} from "../symbols/symbol-helpers";
import { SymbolScope } from "../symbols/symbol-scope";
import {
  isAstCollectionNode,
  isAstIdNode,
  matchParametersAndTypes,
} from "../syntax-nodes/ast-helpers";
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

  wrapParameters(
    procSymbol: ElanSymbol,
    callParameters: AstNode[],
    transforms: Transforms,
  ): [string[], string[], string[]] {
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

    return [wrappedInParameters, wrappedOutParameters, passedParameters];
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

    const procSymbolType = procSymbol.symbolType(transforms);
    const parameterList = this.args.getOrTransformAstNode(transforms);

    if (isAstCollectionNode(parameterList)) {
      let callParameters = parameterList.items;
      let isAsync: boolean = false;

      if (procSymbolType instanceof ProcedureType) {
        mustCallExtensionViaQualifier(procSymbolType, qualifier, this.compileErrors, this.htmlId);

        if (procSymbolType.isExtension && qualifier instanceof QualifierAsn) {
          callParameters = [qualifier.value as AstNode].concat(callParameters);
          qualifier = undefined;
        }

        matchParametersAndTypes(
          procSymbolType,
          callParameters,
          currentScope,
          this.compileErrors,
          this.htmlId,
        );

        isAsync = procSymbolType.isAsync;
      }

      const [wrappedInParameters, wrappedOutParameters, passedParameters] = this.wrapParameters(
        procSymbol,
        callParameters,
        transforms,
      );

      const parms = passedParameters.join(", ");
      const prefix = qualifier
        ? `${qualifier.compile()}`
        : scopePrefix(procSymbol, this.compileErrors, this, this.htmlId);
      const async = isAsync ? "await " : "";
      let wrappedInParms = "";
      let wrappedOutParms = "";

      if (wrappedInParameters.length > 0) {
        wrappedInParms = `${this.indent()}${wrappedInParameters.join("; ")};\n`;
      }

      if (wrappedOutParameters.length > 0) {
        wrappedOutParms = `\n${this.indent()}${wrappedOutParameters.join("; ")};`;
      }

      return `${wrappedInParms}${this.indent()}${async}${prefix}${id}(${parms});${wrappedOutParms}`;
    }
    return "";
  }
}
