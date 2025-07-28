import { AstIdNode } from "../../compiler/compiler-interfaces/ast-id-node";
import { AstNode } from "../../compiler/compiler-interfaces/ast-node";
import { ChainedAsn } from "../../compiler/compiler-interfaces/chained-asn";
import { ElanSymbol } from "../../compiler/compiler-interfaces/elan-symbol";
import { Scope } from "../../compiler/compiler-interfaces/scope";
import { SymbolType } from "../../compiler/compiler-interfaces/symbol-type";
import { FunctionType } from "../../compiler/symbols/function-type";
import { NullScope } from "../../compiler/symbols/null-scope";
import {
  displayName,
  getGlobalScope,
  isDefinitionStatement,
  isMemberOnFieldsClass,
  scopePrefix,
} from "../../compiler/symbols/symbol-helpers";
import {
  checkForDeprecation,
  mustBeCallable,
  mustBeKnownSymbol,
  mustBePublicMember,
  mustBePureFunctionSymbol,
  mustbeValidQualifier,
  mustCallExtensionViaQualifier,
  mustCallMemberViaQualifier,
} from "../compile-rules";
import { AbstractAstNode } from "./abstract-ast-node";
import {
  containsGenericType,
  generateType,
  isEmptyNode,
  matchGenericTypes,
  matchParametersAndTypes,
} from "./ast-helpers";
import { EmptyAsn } from "./empty-asn";

export class FuncCallAsn extends AbstractAstNode implements AstIdNode, ChainedAsn {
  constructor(
    public readonly id: string,
    private readonly parameters: Array<AstNode>,
    public readonly fieldId: string,
    private scope: Scope,
  ) {
    super();
  }

  private precedingNode: AstNode = EmptyAsn.Instance;
  private updatedScope: Scope = NullScope.Instance;

  updateScopeAndChain(scope: Scope, ast: AstNode) {
    this.updatedScope = scope;
    this.precedingNode = ast;
  }

  get showPreviousNode() {
    return !this.isExtensionMethod;
  }

  isAsync: boolean = false;

  private isExtensionMethod: boolean = false;

  getSymbolAndType(): [ElanSymbol, SymbolType] {
    let currentScope = this.updatedScope === NullScope.Instance ? this.scope : this.updatedScope;

    if (isDefinitionStatement(currentScope)) {
      currentScope = currentScope.getParentScope();
    }
    const funcSymbol = currentScope.resolveSymbol(this.id, this.scope);
    const funcSymbolType = funcSymbol.symbolType();
    return [funcSymbol, funcSymbolType];
  }

  compile(): string {
    this.compileErrors = [];

    let parameters = [...this.parameters];
    const [funcSymbol, funcSymbolType] = this.getSymbolAndType();

    mustBeKnownSymbol(
      funcSymbol,
      this.updatedScope,
      this.precedingNode.symbolType(),
      this.compileErrors,
      this.fieldId,
    );

    if (!isMemberOnFieldsClass(funcSymbol, this.scope)) {
      mustBePublicMember(funcSymbol, this.compileErrors, this.fieldId);
    }

    mustbeValidQualifier(this.precedingNode, this.compileErrors, this.fieldId);

    if (funcSymbolType instanceof FunctionType) {
      mustBePureFunctionSymbol(funcSymbolType, this.scope, this.compileErrors, this.fieldId);

      mustCallExtensionViaQualifier(
        funcSymbolType,
        this.precedingNode,
        this.compileErrors,
        this.fieldId,
      );

      mustCallMemberViaQualifier(
        displayName(funcSymbol, this.id),
        funcSymbolType,
        this.updatedScope,
        this.compileErrors,
        this.fieldId,
      );

      if (funcSymbolType.isExtension && !isEmptyNode(this.precedingNode)) {
        this.isExtensionMethod = true;
        parameters = [this.precedingNode].concat(parameters);
      }

      matchParametersAndTypes(
        displayName(funcSymbol, this.id),
        funcSymbolType,
        parameters,
        this.compileErrors,
        this.fieldId,
      );

      // do after parameters checked
      checkForDeprecation(funcSymbolType, this.scope, this.compileErrors, this.fieldId);

      this.isAsync = funcSymbolType.isAsync;
    } else {
      mustBeCallable(
        displayName(funcSymbol, this.id),
        funcSymbolType,
        funcSymbol.symbolScope,
        this.compileErrors,
        this.fieldId,
      );
    }

    const showPreviousNode = !isEmptyNode(this.precedingNode) && this.showPreviousNode;
    const showAwait =
      this.isAsync &&
      (!showPreviousNode ||
        (this.updatedScope === NullScope.Instance && isEmptyNode(this.precedingNode)));
    const asyncStart = showAwait ? "(await " : "";

    const asyncEnd = showAwait ? ")" : "";
    const parms = parameters.map((p) => p.compile()).join(", ");
    const prefix = showPreviousNode
      ? ""
      : scopePrefix(funcSymbol, this.compileErrors, this.scope, this.fieldId);

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
