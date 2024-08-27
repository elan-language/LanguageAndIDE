import { CompileError } from "../compile-error";
import { AstCollectionNode } from "../interfaces/ast-collection-node";
import { AstNode } from "../interfaces/ast-node";
import { Scope } from "../interfaces/scope";
import { CSV } from "../parse-nodes/csv";
import { AbstractAstNode } from "./abstract-ast-node";
import { ExprAsn } from "./expr-asn";

export class WithAsn extends AbstractAstNode implements AstNode {
  constructor(
    private readonly obj: ExprAsn,
    private readonly withClause: AstCollectionNode,
    public readonly fieldId: string,
    scope: Scope,
  ) {
    super();
  }

  aggregateCompileErrors(): CompileError[] {
    return this.compileErrors.concat(this.obj.aggregateCompileErrors());
  }

  compile(): string {
    const from = this.obj.compile();
    const tempTo = `_${from}`;
    const withClause : string[] = [];
    let withClauseStr = "";

    for(const ast of this.withClause.items){
      withClause.push(`${tempTo}.${ast.compile()}`);
    }

    if (withClause.length > 0){
      withClauseStr = ` ${withClause.join(';')};`;
    }


    return `(() => {const ${tempTo} = {...${from}};${withClauseStr} return ${tempTo};})()`;
  }

  symbolType() {
    return this.obj.symbolType();
  }

  toString() {
    return `With (${this.obj}) (${this.withClause})`;
  }
}
