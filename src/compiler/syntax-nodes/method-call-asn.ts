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
import {
  getGlobalScope,
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

  // this is a temp hack until all fields migrated
  tempAntlrFlag = true;

  // precedingNode: AstNode = EmptyAsn.Instance;
  // private updatedScope: Scope = NullScope.Instance;

  // updateScopeAndChain(scope: Scope, ast: AstNode) {
  //   this.updatedScope = scope;
  //   this.precedingNode = ast;
  // }

  get showPreviousNode() {
    return !this.isExtensionMethod;
  }

  isAsync: boolean = false;

  isExtensionMethod: boolean = false;

  getCurrentScope() {
    const lhsSt = this.precedingNode.symbolType();
    if (isClassType(lhsSt)) {
      return lhsSt;
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

  compile(): string {
    this.compileErrors = [];

    let parameters = [...this.parameters];
    const [funcSymbol, funcSymbolType] = this.getSymbolAndType();

    if (!this.tempAntlrFlag) {
      mustBeKnownSymbol(
        funcSymbol,
        this.getCurrentScope(),
        getQualifierId(this.precedingNode),
        this.precedingNode.symbolType(),
        this.compileErrors,
        this.fieldId,
        this.scope,
      );
    }

    if (isMemberOnFieldsClass(funcSymbol, this.scope)) {
      mustbeValidQualifier(this.precedingNode, this.scope, this.compileErrors, this.fieldId);
    } else {
      mustBePublicMember(funcSymbol, this.compileErrors, this.fieldId);
    }

    if (funcSymbolType instanceof FunctionType) {
      mustBePureFunctionSymbol(funcSymbolType, this.scope, this.compileErrors, this.fieldId);

      if (!this.tempAntlrFlag) {
        mustCallExtensionViaQualifier(
          funcSymbolType,
          this.precedingNode,
          this.compileErrors,
          this.fieldId,
        );

        mustNotCallNonExtensionViaQualifier(
          funcSymbolType,
          funcSymbol.symbolId,
          this.precedingNode,
          this.getCurrentScope(),
          this.compileErrors,
          this.fieldId,
          this.scope,
        );

        mustCallMemberViaQualifier(
          funcSymbol.symbolId,
          funcSymbolType,
          this.getCurrentScope(),
          this.compileErrors,
          this.fieldId,
        );
      }

      if (funcSymbolType.isExtension && !isEmptyNode(this.precedingNode)) {
        this.isExtensionMethod = true;
        parameters = [this.precedingNode].concat(parameters);
      }

      matchParametersAndTypes(
        funcSymbol.symbolId,
        funcSymbolType,
        parameters,
        this.compileErrors,
        this.fieldId,
        this.scope,
      );

      // do after parameters checked
      checkForDeprecation(funcSymbolType, this.scope, this.compileErrors, this.fieldId);

      this.isAsync = funcSymbolType.isAsync;
    } else {
      mustBeCallable(
        funcSymbol.symbolId,
        funcSymbolType,
        funcSymbol.symbolScope,
        this.compileErrors,
        this.fieldId,
      );
    }

    const asyncStart = this.isAsync ? "(await " : "";
    const asyncEnd = this.isAsync ? ")" : "";

    const parms = parameters.map((p) => p.compile()).join(", ");
    const prefix = scopePrefix(
      funcSymbol,
      this.precedingNode,
      this.compileErrors,
      this.scope,
      this.fieldId,
    );

    getGlobalScope(this.scope).addCompileErrors(this.compileErrors);

    return `${asyncStart}${prefix}${this.id}(${parms})${asyncEnd}`;
  }

  symbolType() {
    const [, funcSymbolType] = this.getSymbolAndType();

    if (funcSymbolType instanceof FunctionType) {
      const returnType = funcSymbolType.returnType;

      if (containsGenericType(returnType)) {
        let callParameters = this.parameters;

        if (funcSymbolType.isExtension && !isEmptyNode(this.precedingNode)) {
          callParameters = [this.precedingNode].concat(callParameters);
        }
        const matches = matchGenericTypes(funcSymbolType, callParameters);
        return generateType(returnType, matches);
      }
      return returnType;
    }

    return funcSymbolType;
  }

  toString() {
    const pp = this.parameters.map((p) => p.toString()).join(", ");
    return `${this.id}(${pp})`;
  }
}
