import { AstNode } from "../../../compiler/compiler-interfaces/ast-node";
import { ElanSymbol } from "../../../compiler/compiler-interfaces/elan-symbol";
import { Scope } from "../../../compiler/compiler-interfaces/scope";
import { ProcedureType } from "../../../compiler/symbols/procedure-type";
import {
  displayName,
  getGlobalScope,
  isMemberOnFieldsClass,
  scopePrefix,
  updateScopeAndQualifier,
} from "../../../compiler/symbols/symbol-helpers";
import { SymbolScope } from "../../../compiler/symbols/symbol-scope";
import {
  cannotPassAsOutParameter,
  checkForDeprecation,
  getQualifierId,
  mustBeKnownSymbol,
  mustBeProcedure,
  mustBePublicMember,
  mustCallExtensionViaQualifier,
  mustCallMemberViaQualifier,
} from "../../compile-rules";
import {
  isAstCollectionNode,
  isAstIdNode,
  isEmptyNode,
  matchParametersAndTypes,
} from "../ast-helpers";
import { BreakpointAsn } from "../breakpoint-asn";
import { EmptyAsn } from "../empty-asn";
import { ParamListAsn } from "../fields/param-list-asn";
import { ProcedureAsn } from "../globals/procedure-asn";
import { QualifierAsn } from "../qualifier-asn";
import { LetAsn } from "./let-asn";
import { VariableAsn } from "./variable-asn";

export class CallAsn extends BreakpointAsn {
  constructor(fieldId: string, scope: Scope) {
    super(fieldId, scope);
  }

  proc: AstNode = EmptyAsn.Instance;
  args: AstNode = EmptyAsn.Instance;

  wrapParameters(
    procSymbol: ElanSymbol,
    callParameters: AstNode[],
  ): [string[], string[], string[]] {
    const postFix = getGlobalScope(this.scope).getNextId();
    const wrappedInParameters: string[] = [];
    const wrappedOutParameters: string[] = [];
    const passedParameters: string[] = [];

    const parameterDefScopes =
      procSymbol instanceof ProcedureAsn
        ? procSymbol.params instanceof ParamListAsn
          ? procSymbol.params.symbolMatches("", true, this).map((s) => s.symbolScope)
          : []
        : [];

    for (let i = 0; i < callParameters.length; i++) {
      const p = callParameters[i];
      let pName = p.compile();

      const parameterDefScope =
        i < parameterDefScopes.length ? parameterDefScopes[i] : SymbolScope.parameter;
      if (parameterDefScope === SymbolScope.outParameter) {
        if (isAstIdNode(p)) {
          const callParamSymbol = this.getParentScope().resolveSymbol(p.id, this);
          if (
            callParamSymbol instanceof VariableAsn ||
            callParamSymbol.symbolScope === SymbolScope.parameter ||
            callParamSymbol.symbolScope === SymbolScope.outParameter
          ) {
            const tpName = `_${p.id}${postFix}`;
            wrappedInParameters.push(`let ${tpName} = [${pName}]`);
            wrappedOutParameters.push(`${pName} = ${tpName}[0]`);
            pName = tpName;
          } else {
            const msg = callParamSymbol instanceof LetAsn ? `let ${p.id}` : p;
            cannotPassAsOutParameter(msg, this.compileErrors, this.fieldId);
          }
        } else {
          cannotPassAsOutParameter(p, this.compileErrors, this.fieldId);
        }
      }
      passedParameters.push(pName);
    }

    return [wrappedInParameters, wrappedOutParameters, passedParameters];
  }

  compile(): string {
    this.compileErrors = [];

    const astNode = this.proc;
    const id = isAstIdNode(astNode) ? astNode.id : "";

    const [updatedQualifier, currentScope] = updateScopeAndQualifier(astNode, this);

    let qualifier = updatedQualifier;

    const procSymbol = currentScope.resolveSymbol(id, this);

    mustBeKnownSymbol(
      procSymbol,
      currentScope,
      getQualifierId(qualifier),
      qualifier.symbolType(),
      this.compileErrors,
      this.fieldId,
    );
    mustBeProcedure(
      displayName(procSymbol, id),
      procSymbol.symbolType(),
      procSymbol.symbolScope,
      this.compileErrors,
      this.fieldId,
    );

    if (!isMemberOnFieldsClass(procSymbol, this)) {
      mustBePublicMember(procSymbol, this.compileErrors, this.fieldId);
    }

    const procSymbolType = procSymbol.symbolType();
    const parameterList = this.args;

    if (isAstCollectionNode(parameterList)) {
      let callParameters = parameterList.items;
      let isAsync: boolean = false;

      if (procSymbolType instanceof ProcedureType) {
        mustCallExtensionViaQualifier(procSymbolType, qualifier, this.compileErrors, this.fieldId);
        mustCallMemberViaQualifier(
          id,
          procSymbolType,
          currentScope,
          this.compileErrors,
          this.fieldId,
        );

        if (procSymbolType.isExtension && qualifier instanceof QualifierAsn) {
          callParameters = [qualifier.value as AstNode].concat(callParameters);
          qualifier = EmptyAsn.Instance;
        }

        matchParametersAndTypes(
          id,
          procSymbolType,
          callParameters,
          this.compileErrors,
          this.fieldId,
        );

        // do after parameters checked
        checkForDeprecation(procSymbolType, currentScope, this.compileErrors, this.fieldId);
        isAsync = procSymbolType.isAsync;
      }

      const [wrappedInParameters, wrappedOutParameters, passedParameters] = this.wrapParameters(
        procSymbol,
        callParameters,
      );

      const parms = passedParameters.join(", ");
      const prefix = !isEmptyNode(qualifier)
        ? `${qualifier.compile()}`
        : scopePrefix(procSymbol, this.compileErrors, this, this.fieldId);
      const async = isAsync ? "await " : "";
      let wrappedInParms = "";
      let wrappedOutParms = "";

      if (wrappedInParameters.length > 0) {
        wrappedInParms = `${this.indent()}${wrappedInParameters.join("; ")};\n`;
      }

      if (wrappedOutParameters.length > 0) {
        wrappedOutParms = `\n${this.indent()}${wrappedOutParameters.join("; ")};`;
      }

      getGlobalScope(this.scope).addCompileErrors(this.compileErrors);

      return `${wrappedInParms}${this.indent()}${this.breakPoint(this.debugSymbols())}${async}${prefix}${id}(${parms});${wrappedOutParms}`;
    }
    return "";
  }
}
