import { ArrayListType } from "../symbols/array-list-type";
import { ClassType } from "../symbols/class-type";
import { FunctionType } from "../symbols/function-type";
import { ImmutableListType } from "../symbols/immutable-list-type";
import { SymbolType } from "../interfaces/symbol-type";
import { CompileError } from "../compile-error";
import { mustBeIndexableSymbol, mustBeKnownSymbol, mustBePublicProperty } from "../compile-rules";
import { Frame } from "../interfaces/frame";
import { Scope } from "../interfaces/scope";
import { AbstractAstNode } from "./abstract-ast-node";
import { transforms } from "./ast-helpers";
import { AstNode } from "../interfaces/ast-node";
import { AstIdNode } from "../interfaces/ast-id-node";
import { IndexAsn } from "./index-asn";
import { QualifierAsn } from "./qualifier-asn";
import { RangeAsn } from "./range-asn";
import { ThisAsn } from "./this-asn";
import { getClassScope, getParentScope } from "../symbols/symbol-helpers";
import { SymbolScope } from "../symbols/symbol-scope";
import { isScope } from "../helpers";
import { AstQualifiedNode } from "../interfaces/ast-qualified-node";
import { AstQualifierNode } from "../interfaces/ast-qualifier-node";
import { LetStatement } from "../statements/let-statement";
import { ElanSymbol } from "../interfaces/symbol";
import { UnknownSymbol } from "../symbols/unknown-symbol";
import { AbstractDictionaryType } from "../symbols/abstract-dictionary-type";
import { SetStatement } from "../statements/set-statement";

export class VarAsn extends AbstractAstNode implements AstIdNode, AstQualifiedNode {
  constructor(
    public readonly id: string,
    public readonly qualifier: AstQualifierNode | undefined,
    private readonly index: AstNode | undefined,
    public readonly fieldId: string,
    private scope: Scope,
  ) {
    super();
  }

  aggregateCompileErrors(): CompileError[] {
    const q = this.qualifier ? this.qualifier.aggregateCompileErrors() : [];
    const i = this.index ? this.index.aggregateCompileErrors() : [];

    return this.compileErrors.concat(q).concat(i);
  }

  private isRange() {
    return this.index instanceof IndexAsn && this.index.index1 instanceof RangeAsn;
  }

  isIndex() {
    return this.index instanceof IndexAsn && !(this.index.index1 instanceof RangeAsn);
  }

  isDoubleIndex() {
    return this.index instanceof IndexAsn && this.index.isDoubleIndex();
  }

  private getQualifier() {
    if (this.qualifier) {
      return `${this.qualifier.compile()}`;
    }
    const s = this.scope.resolveSymbol(this.id, transforms(), this.scope);

    if (s && s.symbolScope === SymbolScope.property) {
      return "this.";
    }

    return "";
  }

  wrapListOrArray(rootType: SymbolType, code: string): string {
    if (rootType instanceof ImmutableListType) {
      return `system.immutableList(${code})`;
    }
    if (rootType instanceof ArrayListType) {
      return `system.wrapArray(${code})`;
    }
    if (rootType instanceof FunctionType) {
      return this.wrapListOrArray(rootType.returnType, code);
    }
    return code;
  }

  wrapIndex(code: string): string {
    if (this.isDoubleIndex()) {
      return `system.safeDoubleIndex(${code})`;
    }
    return `system.safeIndex(${code})`;
  }

  compile(): string {
    this.compileErrors = [];
    const q = this.getQualifier();
    let symbol: ElanSymbol = new UnknownSymbol(this.id);

    const classScope = this.qualifier ? this.qualifier.symbolType() : undefined;
    if (classScope instanceof ClassType) {
      const classSymbol = this.scope.resolveSymbol(classScope.className, transforms(), this.scope);
      if (isScope(classSymbol)) {
        symbol = classSymbol.resolveSymbol(this.id, transforms(), classSymbol);
        mustBePublicProperty(symbol, this.compileErrors, this.fieldId);
      }
    } else {
      symbol = getParentScope(this.scope).resolveSymbol(this.id, transforms(), this.scope);
    }

    mustBeKnownSymbol(symbol, this.compileErrors, this.fieldId);

    const call = symbol instanceof LetStatement ? "()" : "";
    const idx = this.index ? this.index.compile() : "";
    let code = `${q}${this.id}${call}${idx}`;

    if (this.isRange() || this.index) {
      const rootType = this.scope
        .resolveSymbol(this.id, transforms(), this.scope)
        .symbolType(transforms());
      if (this.index) {
        mustBeIndexableSymbol(rootType, this.compileErrors, this.fieldId);
      }
      if (this.isIndex()) {
        code = `${q}${this.id}${call}, ${idx}`;
        if (!(this.scope instanceof SetStatement)) {
          code = this.wrapIndex(code);
        }
      }
      if (this.isRange()) {
        code = this.wrapListOrArray(rootType, code);
      }
    }

    return code;
  }

  updateScope(currentScope: Scope) {
    const classScope = this.qualifier ? this.qualifier.symbolType() : undefined;
    if (classScope instanceof ClassType) {
      const s = this.scope.resolveSymbol(classScope.className, transforms(), this.scope);
      // replace scope with class scope
      currentScope = isScope(s) ? s : currentScope;
    } else if (classScope instanceof ClassType) {
      currentScope = classScope as Scope;
    } else if (this.qualifier instanceof QualifierAsn && this.qualifier?.value instanceof ThisAsn) {
      currentScope = getClassScope(currentScope as Frame);
    } else {
      currentScope = getParentScope(currentScope);
    }

    return currentScope;
  }

  rootSymbolType() {
    const currentScope = this.updateScope(this.scope);
    const rootType = currentScope
      .resolveSymbol(this.id, transforms(), this.scope)
      .symbolType(transforms());
    return rootType;
  }

  symbolType() {
    const rootType = this.rootSymbolType();
    if (this.isIndex()) {
      if (rootType instanceof ImmutableListType || rootType instanceof ArrayListType) {
        return rootType.ofType;
      }

      if (rootType instanceof AbstractDictionaryType) {
        return rootType.valueType;
      }
    }
    return rootType;
  }

  get symbolScope() {
    const currentScope = this.updateScope(this.scope);
    const symbol = currentScope.resolveSymbol(this.id, transforms(), this.scope);
    return symbol.symbolScope;
  }

  toString() {
    const q = this.qualifier ? `${this.qualifier}` : "";
    const idx = this.index ? `${this.index}` : "";
    return `${q}${this.id}${idx}`;
  }
}
