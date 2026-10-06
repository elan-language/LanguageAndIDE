import { mustBeIndexableType } from "../compile-rules";
import { AstNode } from "../compiler-interfaces/ast-node";
import { Scope } from "../compiler-interfaces/scope";
import { SymbolType } from "../compiler-interfaces/symbol-type";
import { FunctionType } from "../symbols/function-type";
import { getGlobalScope, isClassType, isFunction } from "../symbols/symbol-helpers";
import { AbstractAstNode } from "./abstract-ast-node";
import { getIndexAndOfType, isAstIdNode } from "./ast-helpers";
import { FuncCallAsn } from "./func-call-asn";

export class TermAsn extends AbstractAstNode {
  constructor(
    public readonly lhs: AstNode,
    public readonly rhs: AstNode | undefined,
    public readonly index: AstNode | undefined,
    public readonly fieldId: string,
    public readonly scope: Scope,
  ) {
    super();
  }

  asyncCount(astNode: AstNode | undefined): number {
    if (astNode instanceof TermAsn) {
      return this.asyncCount(astNode.lhs) + this.asyncCount(astNode.rhs);
    }
    if (astNode instanceof FuncCallAsn) {
      return 1;
    }
    return 0;
  }

  wrap(ast: AstNode) {
    let code = ast.compile();
    const asyncCount = this.asyncCount(ast);

    for (let i = 0; i < asyncCount; i++) {
      code = `(await ${code})`;
    }
    return code;
  }

  compile(): string {
    this.compileErrors = [];

    let code = this.rhs ? `${this.wrap(this.lhs)}.${this.wrap(this.rhs)}` : this.wrap(this.lhs);

    if (this.index) {
      mustBeIndexableType(
        code,
        this.lhs.symbolType(),
        true,
        this.compileErrors,
        this.fieldId,
        this.scope,
      );
      code = `system.safeIndex(${code}, ${this.index.compile()})`;
    }

    getGlobalScope(this.scope).addCompileErrors(this.compileErrors);

    return code;
  }

  getBaseSymbolType(asn: AstNode): SymbolType {
    if (asn instanceof TermAsn) {
      if (asn.index) {
        const [_indexType, ofType] = getIndexAndOfType(asn.lhs.symbolType(), 0);
        return ofType;
      }

      if (this.rhs) {
        const lhsSt = this.lhs.symbolType();

        if (isClassType(lhsSt)) {
          const id = isAstIdNode(this.rhs) ? this.rhs.id : "";
          const ss = lhsSt.resolveSymbol(id, true, this.scope);
          return isFunction(ss) ? (ss.symbolType() as FunctionType).returnType : ss.symbolType();
        }
      }

      return asn.rhs ? asn.rhs.symbolType() : asn.lhs.symbolType();
    }
    return asn.symbolType();
  }

  symbolType() {
    return this.getBaseSymbolType(this);
  }

  toString() {
    return this.index
      ? `${this.lhs}[${this.index}]`
      : this.rhs
        ? `${this.lhs}.${this.rhs}`
        : this.lhs;
  }
}
