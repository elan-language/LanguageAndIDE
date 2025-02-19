import { CompileError } from "../compile-error";
import {
  mustBeCallable,
  mustBeKnownSymbol,
  mustBePublicMember,
  mustBePureFunctionSymbol,
  mustbeValidQualifier,
  mustCallExtensionViaQualifier,
  mustCallMemberViaQualifier,
} from "../compile-rules";
import { AstIdNode } from "../interfaces/ast-id-node";
import { AstNode } from "../interfaces/ast-node";
import { ElanSymbol } from "../interfaces/elan-symbol";
import { Scope } from "../interfaces/scope";
import { SymbolType } from "../interfaces/symbol-type";
import { ClassType } from "../symbols/class-type";
import { FunctionType } from "../symbols/function-type";
import { NullScope } from "../symbols/null-scope";
import { isMemberOnFieldsClass, scopePrefix } from "../symbols/symbol-helpers";
import { AbstractAstNode } from "./abstract-ast-node";
import {
  containsGenericType,
  generateType,
  isEmptyNode,
  matchGenericTypes,
  matchParametersAndTypes,
  transforms,
} from "./ast-helpers";
import { ChainedAsn } from "./chained-asn";
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

  aggregateCompileErrors(): CompileError[] {
    const cc = this.precedingNode.aggregateCompileErrors();
    let pc: CompileError[] = [];

    for (const i of this.parameters) {
      pc = pc.concat(i.aggregateCompileErrors());
    }

    return cc.concat(this.compileErrors).concat(pc);
  }

  getSymbolAndType(): [ElanSymbol, SymbolType] {
    const currentScope =
      this.updatedScope === NullScope.Instance ? this.scope.getParentScope() : this.updatedScope;
    const funcSymbol = currentScope.resolveSymbol(this.id, transforms(), this.scope);
    const funcSymbolType = funcSymbol.symbolType(transforms());
    return [funcSymbol, funcSymbolType];
  }

  compile(): string {
    this.compileErrors = [];

    let parameters = [...this.parameters];
    const [funcSymbol, funcSymbolType] = this.getSymbolAndType();

    mustBeKnownSymbol(funcSymbol, this.updatedScope, this.compileErrors, this.fieldId);

    if (!isMemberOnFieldsClass(funcSymbol, transforms(), this.scope)) {
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
        funcSymbol.symbolId,
        funcSymbolType,
        this.updatedScope,
        this.compileErrors,
        this.fieldId,
      );

      if (funcSymbolType.isExtension && !isEmptyNode(this.precedingNode)) {
        this.isExtensionMethod = true;
        parameters = [this.precedingNode].concat(parameters);
      }

      const st = this.precedingNode.symbolType();
      const cls = st instanceof ClassType ? st.scope : NullScope.Instance;

      matchParametersAndTypes(funcSymbolType, parameters, cls, this.compileErrors, this.fieldId);

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

        const st = this.precedingNode.symbolType();
        const cls = st instanceof ClassType ? st.scope : NullScope.Instance;

        const matches = matchGenericTypes(funcSymbolType, callParameters, cls);
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
