import { AstNode } from "../../../compiler/compiler-interfaces/ast-node";
import { ElanSymbol } from "../../../compiler/compiler-interfaces/elan-symbol";
import { Scope } from "../../../compiler/compiler-interfaces/scope";
import { BooleanType } from "../../../compiler/symbols/boolean-type";
import { getGlobalScope } from "../../../compiler/symbols/symbol-helpers";
import { mustBeOfType } from "../../compile-rules";
import { childSymbolMatches, compileNodes, getChildSymbol } from "../ast-helpers";
import { BreakpointAsn } from "../breakpoint-asn";
import { EmptyAsn } from "../empty-asn";

export class ElseAsn extends BreakpointAsn {
  hasIf: boolean = false;

  constructor(fieldId: string, scope: Scope) {
    super(fieldId, scope);
  }

  condition: AstNode = EmptyAsn.Instance;

  private compileIfClause(): string {
    if (this.hasIf) {
      mustBeOfType(this.condition, BooleanType.Instance, this.compileErrors, this.fieldId);
      return `if (${this.condition.compile()}) {`;
    }
    return `{`;
  }

  getCurrentScope(): Scope {
    return this.compileScope ?? this;
  }

  indent() {
    return this.singleIndent(); //overrides the additional indent added for most child statements
  }

  compile(): string {
    this.compileErrors = [];

    const code = `${this.indent()}} else ${this.compileIfClause()}
${compileNodes(this.compileChildren)}`;

    getGlobalScope(this.scope).addCompileErrors(this.compileErrors);

    return code;
  }

  compileChildren: AstNode[] = [];

  setCompileScope(s: Scope) {
    this.compileScope = s;
    this.compileChildren = [];
  }

  addChild(f: AstNode) {
    this.compileChildren.push(f);
  }

  getOuterScope() {
    // need to get scope of IfStatement
    return this.getCurrentScope().getParentScope();
  }

  resolveSymbol(id: string, caseSensitive: boolean, initialScope: Scope): ElanSymbol {
    return (
      getChildSymbol(this.compileChildren, id, initialScope) ??
      this.getOuterScope().resolveSymbol(id, caseSensitive, this.getCurrentScope())
    );
  }

  symbolMatches(id: string, all: boolean, initialScope: Scope): ElanSymbol[] {
    const matches = this.getOuterScope().symbolMatches(id, all, this.getCurrentScope());
    return childSymbolMatches(this.compileChildren, id, all, matches, initialScope);
  }
}
