import { Scope } from "../../compiler-interfaces/scope";
import { getGlobalScope } from "../../symbols/symbol-helpers";
import { CompoundAsn } from "../compound-asn";

export class ElseClauseAsn extends CompoundAsn {
  //hasIf: boolean = false;

  constructor(fieldId: string, scope: Scope) {
    super(fieldId, scope);
  }

  //condition: AstNode = EmptyAsn.Instance;

  // private compileIfClause(): string {
  //   if (this.hasIf) {
  //     mustBeOfType(
  //       this.condition,
  //       BooleanType.Instance,
  //       this.compileErrors,
  //       this.fieldId,
  //       this.scope,
  //     );
  //     return `if (${this.condition.compile()}) {`;
  //   }
  //   return `{`;
  // }

  getCurrentScope(): Scope {
    return this.compileScope ?? this;
  }

  indent() {
    return this.singleIndent(); //overrides the additional indent added for most child statements
  }

  compile(): string {
    this.compileErrors = [];

    const code = `${this.indent()}} else {
${this.compileChildren()}`;

    getGlobalScope(this.scope).addCompileErrors(this.compileErrors);

    return code;
  }

  //compileChildren: AstNode[] = [];

  // setCompileScope(s: Scope) {
  //   this.compileScope = s;
  //   this.compileChildren = [];
  // }

  // addChild(f: AstNode) {
  //   this.compileChildren.push(f);
  // }

  getOuterScope() {
    // need to get scope of IfStatement
    return this.getCurrentScope().getParentScope();
  }

  // resolveSymbol(id: string, caseSensitive: boolean, _initialScope: Scope): ElanSymbol {
  //   return (
  //     //getChildSymbol(this.compileChildren, id, caseSensitive, initialScope) ??
  //     this.getOuterScope().resolveSymbol(id, caseSensitive, this.getCurrentScope())
  //   );
  // }

  // symbolMatches(_id: string, _all: boolean, _initialScope: Scope): ElanSymbol[] {
  //   // const matches = this.getOuterScope().symbolMatches(id, all, this.getCurrentScope());
  //   // return childSymbolMatches(this.compileChildren, id, all, matches, initialScope);
  //   return [];
  // }
}
