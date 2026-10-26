import { mustBeException } from "../../compile-rules";
import { AstNode } from "../../compiler-interfaces/ast-node";
import { Scope } from "../../compiler-interfaces/scope";
import { getGlobalScope } from "../../symbols/symbol-helpers";
import { SymbolScope } from "../../symbols/symbol-scope";
import { CompoundAsn } from "../compound-asn";

export class CatchClauseAsn extends CompoundAsn {
  hasIf: boolean = false;

  constructor(
    private readonly idNode: AstNode,
    private readonly type: AstNode,
    fieldId: string,
    scope: Scope,
  ) {
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

    const type = this.scope.resolveSymbol(this.type.compile(), false, this);
    const scope = type.symbolScope === SymbolScope.stdlib ? "_stdlib." : "";

    mustBeException(type, this.compileErrors, this.fieldId);

    const code = `${this.indent()}} catch (${this.idNode.compile()}) {
${this.indent()}${this.indent()}if (e instanceof ${scope}${type.symbolId}) {
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

// import { mustBeException } from "../../compile-rules";
// import { AstNode } from "../../compiler-interfaces/ast-node";
// import { ElanSymbol } from "../../compiler-interfaces/elan-symbol";
// import { Scope } from "../../compiler-interfaces/scope";
// import { getGlobalScope } from "../../symbols/symbol-helpers";
// import { SymbolScope } from "../../symbols/symbol-scope";
// import { childSymbolMatches, compileNodes, getChildSymbol } from "../ast-helpers";
// import { BreakpointAsn } from "../breakpoint-asn";
// import { EmptyAsn } from "../empty-asn";

// export class CatchStatementAsn extends BreakpointAsn {
//   constructor(
//     private readonly type: string,
//     fieldId: string,
//     scope: Scope,
//   ) {
//     super(fieldId, scope);
//   }

//   identifierDef: AstNode = EmptyAsn.Instance;

//   getCurrentScope(): Scope {
//     return this.compileScope ?? this;
//   }

//   compile(): string {
//     this.compileErrors = [];

//     const type = this.scope.resolveSymbol(this.type, false, this);
//     const scope = type.symbolScope === SymbolScope.stdlib ? "_stdlib." : "";

//     mustBeException(type, this.compileErrors, this.fieldId);

//     getGlobalScope(this.scope).addCompileErrors(this.compileErrors);

//     return `${this.indent()}if (${this.identifierDef.compile()} instanceof ${scope}${type.symbolId}) {
// ${compileNodes(this.compileChildren)}
// ${this.indent()}}`;
//   }

//   compileChildren: AstNode[] = [];

//   setCompileScope(s: Scope) {
//     this.compileScope = s;
//     this.compileChildren = [];
//   }

//   addChild(f: AstNode) {
//     this.compileChildren.push(f);
//   }

//   getOuterScope() {
//     // need to get scope of TryStatement
//     return this.getCurrentScope();
//   }

//   resolveSymbol(id: string, caseSensitive: boolean, initialScope: Scope): ElanSymbol {
//     return (
//       getChildSymbol(this.compileChildren, id, caseSensitive, initialScope) ??
//       this.getOuterScope().resolveSymbol(id, caseSensitive, this.getCurrentScope())
//     );
//   }

//   symbolMatches(id: string, all: boolean, initialScope: Scope): ElanSymbol[] {
//     const matches = this.getOuterScope().symbolMatches(id, all, this.getCurrentScope());

//     return childSymbolMatches(this.compileChildren, id, all, matches, initialScope);
//   }
// }
