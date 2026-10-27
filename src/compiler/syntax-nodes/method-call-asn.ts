import {
  checkForDeprecation,
  getQualifierId,
  mustBeCallable,
  mustBeKnownSymbol,
  mustBePublicMember,
  mustBePureFunctionSymbol,
  mustbeValidQualifier,
  mustCallExtensionViaQualifier,
  mustCallMemberViaQualifier,
  mustNotCallNonExtensionViaQualifier,
} from "../compile-rules";
import { AstIdNode } from "../compiler-interfaces/ast-id-node";
import { AstNode } from "../compiler-interfaces/ast-node";
import { ElanSymbol } from "../compiler-interfaces/elan-symbol";
import { Scope } from "../compiler-interfaces/scope";
import { SymbolType } from "../compiler-interfaces/symbol-type";
import { FunctionType } from "../symbols/function-type";
import { ProcedureType } from "../symbols/procedure-type";
import {
  getGlobalScope,
  isCall,
  isClassType,
  isDefinitionScope,
  isMemberOnFieldsClass,
  scopePrefix,
} from "../symbols/symbol-helpers";
import { AbstractAstNode } from "./abstract-ast-node";
import {
  containsGenericType,
  generateType,
  isAstIdNode,
  isEmptyNode,
  matchGenericTypes,
  matchParametersAndTypes,
} from "./ast-helpers";

export class MethodCallAsn extends AbstractAstNode implements AstIdNode {
  constructor(
    public readonly idNode: AstNode,
    public readonly parameters: Array<AstNode>,
    public readonly precedingNode: AstNode,
    public readonly fieldId: string,
    public scope: Scope,
  ) {
    super();
  }

  get id() {
    return isAstIdNode(this.idNode) ? this.idNode.id : "";
  }

  isAsync: boolean = false;

  isExtensionMethod: boolean = false;

  getCurrentScope() {
    const lhsSt = this.precedingNode.symbolType();
    if (isClassType(lhsSt)) {
      return lhsSt.scope;
    }

    return this.scope;
  }

  getSymbolAndType(): [ElanSymbol, SymbolType] {
    let currentScope = this.getCurrentScope();

    if (isDefinitionScope(currentScope)) {
      currentScope = currentScope.getParentScope();
    }
    const funcSymbol = currentScope.resolveSymbol(this.id, true, this.scope);
    const funcSymbolType = funcSymbol.symbolType();
    return [funcSymbol, funcSymbolType];
  }

  commonCompile(
    methodSymbol: ElanSymbol,
    methodSymbolType: FunctionType | ProcedureType,
    parameters: AstNode[],
  ) {
    mustCallExtensionViaQualifier(
      methodSymbolType,
      this.precedingNode,
      this.compileErrors,
      this.fieldId,
    );

    mustNotCallNonExtensionViaQualifier(
      methodSymbolType,
      methodSymbol.symbolId,
      this.precedingNode,
      this.getCurrentScope(),
      this.compileErrors,
      this.fieldId,
      this.scope,
    );

    mustCallMemberViaQualifier(
      methodSymbol.symbolId,
      methodSymbolType,
      this.getCurrentScope(),
      this.compileErrors,
      this.fieldId,
    );

    if (methodSymbolType.isExtension && !isEmptyNode(this.precedingNode)) {
      this.isExtensionMethod = true;
      parameters = [this.precedingNode].concat(parameters);
    }

    matchParametersAndTypes(
      methodSymbol.symbolId,
      methodSymbolType,
      parameters,
      this.compileErrors,
      this.fieldId,
      this.scope,
    );

    // do after parameters checked
    checkForDeprecation(methodSymbolType, this.scope, this.compileErrors, this.fieldId);

    this.isAsync = methodSymbolType.isAsync;

    return parameters;
  }

  compile(): string {
    this.compileErrors = [];

    let parameters = [...this.parameters];
    const [methodSymbol, methodSymbolType] = this.getSymbolAndType();

    mustBeKnownSymbol(
      methodSymbol,
      this.getCurrentScope(),
      getQualifierId(this.precedingNode),
      this.precedingNode.symbolType(),
      this.compileErrors,
      this.fieldId,
      this.scope,
    );

    if (isMemberOnFieldsClass(methodSymbol, this.scope)) {
      mustbeValidQualifier(this.precedingNode, this.scope, this.compileErrors, this.fieldId);
    } else {
      mustBePublicMember(methodSymbol, this.compileErrors, this.fieldId);
    }

    let asyncStart = "";
    let asyncEnd = "";

    if (methodSymbolType instanceof FunctionType) {
      mustBePureFunctionSymbol(methodSymbolType, this.scope, this.compileErrors, this.fieldId);
      parameters = this.commonCompile(methodSymbol, methodSymbolType, parameters);
      asyncStart = this.isAsync ? "(await " : "";
      asyncEnd = this.isAsync ? ")" : "";
    } else if (methodSymbolType instanceof ProcedureType) {
      parameters = this.commonCompile(methodSymbol, methodSymbolType, parameters);
      asyncStart = this.isAsync ? "await " : "";
      asyncEnd = "";

      if (!isCall(this.scope)) {
        mustBeCallable(
          methodSymbol.symbolId,
          methodSymbolType,
          methodSymbol.symbolScope,
          this.compileErrors,
          this.fieldId,
        );
      }
    } else {
      mustBeCallable(
        methodSymbol.symbolId,
        methodSymbolType,
        methodSymbol.symbolScope,
        this.compileErrors,
        this.fieldId,
      );
    }

    const parms = parameters.map((p) => p.compile()).join(", ");
    const prefix = scopePrefix(
      methodSymbol,
      this.precedingNode,
      this.compileErrors,
      this.scope,
      this.fieldId,
    );

    getGlobalScope(this.scope).addCompileErrors(this.compileErrors);

    return `${asyncStart}${prefix}${this.id}(${parms})${asyncEnd}`;
  }

  symbolType() {
    const [, methodSymbolType] = this.getSymbolAndType();

    if (methodSymbolType instanceof FunctionType) {
      const returnType = methodSymbolType.returnType;

      if (containsGenericType(returnType)) {
        let callParameters = this.parameters;

        if (methodSymbolType.isExtension && !isEmptyNode(this.precedingNode)) {
          callParameters = [this.precedingNode].concat(callParameters);
        }
        const matches = matchGenericTypes(methodSymbolType, callParameters);
        return generateType(returnType, matches);
      }
      return returnType;
    }

    return methodSymbolType;
  }

  toString() {
    const pp = this.parameters.map((p) => p.toString()).join(", ");
    return `${this.id}(${pp})`;
  }
}
