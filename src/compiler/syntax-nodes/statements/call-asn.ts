import { AstNode } from "../../../compiler/compiler-interfaces/ast-node";
import { ElanSymbol } from "../../../compiler/compiler-interfaces/elan-symbol";
import { Scope } from "../../../compiler/compiler-interfaces/scope";
import { ProcedureType } from "../../../compiler/symbols/procedure-type";
import {
  getGlobalScope,
  isMemberOnFieldsClass,
  scopePrefix,
  updateScopeAndQualifier,
} from "../../../compiler/symbols/symbol-helpers";
import {
  checkForDeprecation,
  getQualifierId,
  mustBeKnownSymbol,
  mustBeProcedure,
  mustBePublicMember,
  mustCallExtensionViaQualifier,
  mustCallMemberViaQualifier,
  mustNotCallNonExtensionViaQualifier,
} from "../../compile-rules";
import { UnknownSymbol } from "../../symbols/unknown-symbol";
import {
  isAstCollectionNode,
  isAstIdNode,
  isEmptyNode,
  matchParametersAndTypes,
} from "../ast-helpers";
import { BreakpointAsn } from "../breakpoint-asn";
import { EmptyAsn } from "../empty-asn";
import { LambdaAsn } from "../lambda-asn";
import { QualifierAsn } from "../qualifier-asn";

export class CallAsn extends BreakpointAsn {
  constructor(fieldId: string, scope: Scope) {
    super(fieldId, scope);
  }

  proc: AstNode = EmptyAsn.Instance;
  args: AstNode = EmptyAsn.Instance;

  wrapParameters(callParameters: AstNode[]): [string[], string[]] {
    const wrappedInParameters: string[] = [];
    const passedParameters: string[] = [];

    for (let i = 0; i < callParameters.length; i++) {
      const p = callParameters[i];
      const pName = p.compile();
      passedParameters.push(pName);
    }

    return [wrappedInParameters, passedParameters];
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
      procSymbol.symbolId,
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

        mustNotCallNonExtensionViaQualifier(
          procSymbolType,
          procSymbol.symbolId,
          qualifier,
          currentScope,
          this.compileErrors,
          this.fieldId,
        );

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

      const [wrappedInParameters, passedParameters] = this.wrapParameters(callParameters);

      const parms = passedParameters.join(", ");
      const prefix = !isEmptyNode(qualifier)
        ? `${qualifier.compile()}`
        : scopePrefix(procSymbol, undefined, this.compileErrors, this, this.fieldId);
      const async = isAsync ? "await " : "";
      let wrappedInParms = "";

      if (wrappedInParameters.length > 0) {
        wrappedInParms = `${this.indent()}${wrappedInParameters.join("; ")};\n`;
      }

      getGlobalScope(this.scope).addCompileErrors(this.compileErrors);

      return `${wrappedInParms}${this.indent()}${this.breakPoint(this.debugSymbols())}${async}${prefix}${id}(${parms});`;
    }
    return "";
  }

  resolveSymbol(id: string, initialScope: Scope): ElanSymbol {
    if (isAstCollectionNode(this.args)) {
      const items = this.args.items;
      const last = items.length > 0 ? items[items.length - 1] : new UnknownSymbol();

      if (last instanceof LambdaAsn) {
        const ss = last.signature.resolveSymbol(id, initialScope);

        if (!(ss instanceof UnknownSymbol)) {
          return ss;
        }
      }
    }

    return super.resolveSymbol(id, this);
  }

  symbolMatches(id: string, all: boolean, initialScope: Scope): ElanSymbol[] {
    const matches = super.symbolMatches(id, all, this);
    let localMatches: ElanSymbol[] = [];

    if (isAstCollectionNode(this.args)) {
      const items = this.args.items;
      const last = items.length > 0 ? items[items.length - 1] : new UnknownSymbol();

      if (last instanceof LambdaAsn) {
        localMatches = last.signature.symbolMatches(id, all, initialScope);
      }
    }

    return localMatches.concat(matches);
  }
}
