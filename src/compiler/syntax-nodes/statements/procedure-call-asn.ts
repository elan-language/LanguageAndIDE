import {
  checkForDeprecation,
  getQualifierId,
  mustBeKnownSymbol,
  mustBeProcedure,
  mustBePublicMember,
  mustbeValidQualifier,
  mustCallExtensionViaQualifier,
  mustCallMemberViaQualifier,
  mustNotCallNonExtensionViaQualifier,
} from "../../compile-rules";
import { AstNode } from "../../compiler-interfaces/ast-node";
import { ElanSymbol } from "../../compiler-interfaces/elan-symbol";
import { Scope } from "../../compiler-interfaces/scope";
import { ProcedureType } from "../../symbols/procedure-type";
import {
  getGlobalScope,
  isMemberOnFieldsClass,
  scopePrefix,
  updateScopeAndQualifier,
} from "../../symbols/symbol-helpers";
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

export class ProcedureCallAsn extends BreakpointAsn {
  constructor(fieldId: string, scope: Scope) {
    super(fieldId, scope);
  }

  procRef: AstNode = EmptyAsn.Instance;
  argList: AstNode = EmptyAsn.Instance;

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

    const astNode = this.procRef;
    const id = isAstIdNode(astNode) ? astNode.id : "";

    const [updatedQualifier, currentScope] = updateScopeAndQualifier(astNode, this);

    let qualifier = updatedQualifier;

    const methodSymbol = currentScope.resolveSymbol(id, true, this);

    mustBeKnownSymbol(
      methodSymbol,
      currentScope,
      getQualifierId(qualifier),
      qualifier.symbolType(),
      this.compileErrors,
      this.fieldId,
      this.scope,
    );
    mustBeProcedure(
      methodSymbol.symbolId,
      methodSymbol.symbolType(),
      methodSymbol.symbolScope,
      this.compileErrors,
      this.fieldId,
    );

    if (isMemberOnFieldsClass(methodSymbol, this)) {
      mustbeValidQualifier(qualifier, this.scope, this.compileErrors, this.fieldId);
    } else {
      mustBePublicMember(methodSymbol, this.compileErrors, this.fieldId);
    }

    const methodSymbolType = methodSymbol.symbolType();
    const parameterList = this.argList;

    if (isAstCollectionNode(parameterList)) {
      let callParameters = parameterList.items;
      let isAsync: boolean = false;

      if (methodSymbolType instanceof ProcedureType) {
        mustCallExtensionViaQualifier(
          methodSymbolType,
          qualifier,
          this.compileErrors,
          this.fieldId,
        );

        mustNotCallNonExtensionViaQualifier(
          methodSymbolType,
          methodSymbol.symbolId,
          qualifier,
          currentScope,
          this.compileErrors,
          this.fieldId,
          this.scope,
        );

        mustCallMemberViaQualifier(
          id,
          methodSymbolType,
          currentScope,
          this.compileErrors,
          this.fieldId,
        );

        if (methodSymbolType.isExtension && qualifier !== EmptyAsn.Instance) {
          callParameters = [qualifier as AstNode].concat(callParameters);
          qualifier = EmptyAsn.Instance;
        }

        matchParametersAndTypes(
          id,
          methodSymbolType,
          callParameters,
          this.compileErrors,
          this.fieldId,
          this.scope,
        );

        // do after parameters checked
        checkForDeprecation(methodSymbolType, this, this.compileErrors, this.fieldId);
        isAsync = methodSymbolType.isAsync;
      }

      const [wrappedInParameters, passedParameters] = this.wrapParameters(callParameters);

      const parms = passedParameters.join(", ");
      const prefix = !isEmptyNode(qualifier)
        ? `${qualifier.compile()}`
        : scopePrefix(methodSymbol, undefined, this.compileErrors, this, this.fieldId);
      const async = isAsync ? "await " : "";
      let wrappedInParms = "";

      if (wrappedInParameters.length > 0) {
        wrappedInParms = `${this.indent()}${wrappedInParameters.join("; ")};\n`;
      }

      const dot = prefix.endsWith(".") || prefix === "" ? "" : ".";

      getGlobalScope(this.scope).addCompileErrors(this.compileErrors);

      return `${wrappedInParms}${this.indent()}${this.breakPoint(this.debugSymbols())}${async}${prefix}${dot}${id}(${parms});`;
    }
    return "";
  }

  resolveSymbol(id: string, caseSensitive: boolean, initialScope: Scope): ElanSymbol {
    if (isAstCollectionNode(this.argList)) {
      const items = this.argList.items;
      const last = items.length > 0 ? items[items.length - 1] : new UnknownSymbol();

      if (last instanceof LambdaAsn) {
        const ss = last.signature.resolveSymbol(id, caseSensitive, initialScope);

        if (!(ss instanceof UnknownSymbol)) {
          return ss;
        }
      }
    }

    return super.resolveSymbol(id, caseSensitive, this);
  }

  symbolMatches(id: string, all: boolean, initialScope: Scope): ElanSymbol[] {
    const matches = super.symbolMatches(id, all, this);
    let localMatches: ElanSymbol[] = [];

    if (isAstCollectionNode(this.argList)) {
      const items = this.argList.items;
      const last = items.length > 0 ? items[items.length - 1] : new UnknownSymbol();

      if (last instanceof LambdaAsn) {
        localMatches = last.signature.symbolMatches(id, all, initialScope);
      }
    }

    return localMatches.concat(matches);
  }
}
