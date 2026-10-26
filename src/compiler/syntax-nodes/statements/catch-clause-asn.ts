import { Scope } from "../../compiler-interfaces/scope";
import { getGlobalScope } from "../../symbols/symbol-helpers";
import { CompoundAsn } from "../compound-asn";

export class CatchClauseAsn extends CompoundAsn {
  hasIf: boolean = false;

  constructor(fieldId: string, scope: Scope) {
    super(fieldId, scope);
  }

  // condition: AstNode = EmptyAsn.Instance;

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

  // getCurrentScope(): Scope {
  //   return this.compileScope ?? this;
  // }

  indent() {
    return this.singleIndent(); //overrides the additional indent added for most child statements
  }

  compile(): string {
    this.compileErrors = [];

    const code = `${this.indent()}} catch (e) {
${this.indent()}${this.indent()}if (e instanceof _stdlib.ElanRuntimeError) {
${this.compileChildren()}
${this.indent()}${this.indent()}}
${this.indent()}${this.indent()}else {
${this.indent()}${this.indent()}${this.indent()}throw e;
${this.indent()}${this.indent()}}`;

    getGlobalScope(this.scope).addCompileErrors(this.compileErrors);

    return code;
  }

  // compileChildren: AstNode[] = [];

  // setCompileScope(s: Scope) {
  //   this.compileScope = s;
  //   this.compileChildren = [];
  // }

  // addChild(f: AstNode) {
  //   this.compileChildren.push(f);
  // }

  // getOuterScope() {
  //   // need to get scope of IfStatement
  //   return this.getCurrentScope().getParentScope();
  // }

  // resolveSymbol(id: string, caseSensitive: boolean, initialScope: Scope): ElanSymbol {
  //   return (
  //     getChildSymbol(this.compileChildren, id, caseSensitive, initialScope) ??
  //     this.getOuterScope().resolveSymbol(id, caseSensitive, this.getCurrentScope())
  //   );
  // }

  // symbolMatches(id: string, all: boolean, initialScope: Scope): ElanSymbol[] {
  //   const matches = this.getOuterScope().symbolMatches(id, all, this.getCurrentScope());
  //   return childSymbolMatches(this.compileChildren, id, all, matches, initialScope);
  // }
}
