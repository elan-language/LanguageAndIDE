import { getId } from "../../compile-rules";
import { singleIndent } from "../../frame-helpers";
import { AstNode } from "../../interfaces/ast-node";
import { ElanSymbol } from "../../interfaces/elan-symbol";
import { Parent } from "../../interfaces/parent";
import { Scope } from "../../interfaces/scope";
import { SymbolType } from "../../interfaces/symbol-type";
import { Transforms } from "../../interfaces/transforms";
import { catchKeyword, exceptionKeyword, inKeyword } from "../../keywords";
import { StringType } from "../../symbols/string-type";
import { SymbolScope } from "../../symbols/symbol-scope";
import { EmptyAsn } from "../empty-asn";
import { FrameWithStatementsAsn } from "../frame-with-statements-asn";

export class CatchAsn extends FrameWithStatementsAsn implements ElanSymbol {
  isStatement = true;
  isCatch = true;

  constructor(fieldId: string, scope: Scope) {
    super(fieldId, scope);
  }

  variable: AstNode = EmptyAsn.Instance;

  get symbolId() {
    return getId(this.variable);
  }

  symbolType(_transforms?: Transforms): SymbolType {
    return StringType.Instance;
  }

  get symbolScope() {
    return SymbolScope.parameter;
  }

  // indent() {
  //   return this.scope!.indent(); //overrides the additional indent added for most child statements
  // }

  parentIndent(): string {
    return (this.scope as Parent).indent();
  }

  keywords = `${catchKeyword} ${exceptionKeyword} ${inKeyword} `;

  compile(): string {
    this.compileErrors = [];
    const vid = this.variable.compile();
    return `${this.parentIndent()}} catch (_${vid}) {\r
${this.indent()}${singleIndent()}let ${vid} = _${vid}.message;
${this.compileChildren()}\r`;
  }

  override getParentScope(): Scope {
    return this.scope.getParentScope();
  }

  override getCurrentScope(): Scope {
    return this.scope;
  }

  resolveSymbol(id: string, transforms: Transforms, initialScope: Scope): ElanSymbol {
    if (getId(this.variable) === id) {
      return this;
    }

    return super.resolveSymbol(id, transforms, initialScope);
  }

  symbolMatches(id: string, all: boolean, _initialScope: Scope): ElanSymbol[] {
    const matches = super.symbolMatches(id, all, _initialScope);
    const localMatches: ElanSymbol[] = [];

    const v = getId(this.variable);

    if (id === v || all) {
      const counter = {
        symbolId: v,
        symbolType: () => StringType.Instance,
        symbolScope: SymbolScope.parameter,
      };
      localMatches.push(counter);
    }

    return localMatches.concat(matches);
  }
}
