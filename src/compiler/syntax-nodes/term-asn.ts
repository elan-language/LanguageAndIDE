import { mustBeIndexableType } from "../compile-rules";
import { AstNode } from "../compiler-interfaces/ast-node";
import { ElanSymbol } from "../compiler-interfaces/elan-symbol";
import { Scope } from "../compiler-interfaces/scope";
import { SymbolType } from "../compiler-interfaces/symbol-type";
import { FunctionType } from "../symbols/function-type";
import {
  getGlobalScope,
  //isClass,
  isClassType,
  isFunction,
  isScope,
} from "../symbols/symbol-helpers";
import { TupleType } from "../symbols/tuple-type";
import { UnknownSymbol } from "../symbols/unknown-symbol";
import { AbstractAstNode } from "./abstract-ast-node";
import { getIndexAndOfType, isAstIdNode } from "./ast-helpers";
import { FuncCallAsn } from "./func-call-asn";
import { TupleAsn } from "./globals/tuple-asn";
import { IdAsn } from "./id-asn";

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

  // kludge todo fix
  topLevel = false;
  dot = ".";
  isExtension = false;

  asyncCount(astNode: AstNode | undefined): number {
    if (astNode instanceof TermAsn) {
      return this.asyncCount(astNode.lhs) + this.asyncCount(astNode.rhs);
    }
    if (astNode instanceof FuncCallAsn) {
      astNode.compile();
      return astNode.isAsync ? 1 : 0;
    }
    return 0;
  }

  wrap(ast: AstNode) {
    let code = ast.compile();
    const asyncCount = this.asyncCount(this);

    if (this.topLevel) {
      for (let i = 0; i < asyncCount; i++) {
        code = `(await ${code}`;
      }
    }
    return code;
  }

  setup() {
    // todo kludges
    if (this.rhs instanceof FuncCallAsn) {
      const lhsSt = this.lhs.symbolType();
      let scope = this.scope;
      if (isClassType(lhsSt)) {
        //const id = isAstIdNode(this.rhs) ? this.rhs.id : "";
        scope = lhsSt;
      }

      this.rhs.updateScopeAndChain(scope, this.lhs);
      this.rhs.compile();
      this.isExtension = this.rhs.isExtensionMethod;
    }

    if (this.rhs instanceof IdAsn) {
      const lhsSt = this.lhs.symbolType();
      let scope = this.scope;
      if (lhsSt instanceof TupleType) {
        //const id = isAstIdNode(this.rhs) ? this.rhs.id : "";
        scope = new TupleAsn(lhsSt, this.scope);
        this.dot = "";
      }

      this.rhs.updateScopeAndChain(scope, this.lhs);
    }
  }

  compile(): string {
    this.compileErrors = [];

    this.setup();

    const lhsCode = this.isExtension ? "" : `${this.wrap(this.lhs)}${this.dot}`;

    let code = this.rhs ? `${lhsCode}${this.rhs.compile()}` : this.wrap(this.lhs);

    if (this.index) {
      mustBeIndexableType(
        code,
        this.lhs.symbolType(),
        true,
        this.compileErrors,
        this.fieldId,
        this.scope,
      );
      code = `system.safeIndex(${this.lhs.compile()}, ${this.index.compile()})`;
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
    this.setup();
    return this.getBaseSymbolType(this);
  }

  toString() {
    return this.index
      ? `${this.lhs}[${this.index}]`
      : this.rhs
        ? `${this.lhs}.${this.rhs}`
        : this.lhs;
  }

  resolveSymbol(id: string, caseSensitive: boolean, initialScope: Scope): ElanSymbol {
    if (isScope(this.rhs as unknown as Scope)) {
      return (this.rhs as unknown as Scope).resolveSymbol(id, caseSensitive, initialScope);
    }
    if (isScope(this.lhs as unknown as ElanSymbol)) {
      return (this.lhs as unknown as Scope).resolveSymbol(id, caseSensitive, initialScope);
    }

    return new UnknownSymbol(id);
  }
}
