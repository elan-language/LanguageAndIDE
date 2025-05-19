import { mustBeOfType } from "../../compile-rules";
import { singleIndent } from "../../frame-helpers";
import { AstNode } from "../../interfaces/ast-node";
import { ElanSymbol } from "../../interfaces/elan-symbol";
import { Frame } from "../../interfaces/frame";
import { Scope } from "../../interfaces/scope";
import { Transforms } from "../../interfaces/transforms";
import { BooleanType } from "../../symbols/boolean-type";
import {
  getIds,
  handleDeconstruction,
  isSymbol,
  symbolMatches,
} from "../../symbols/symbol-helpers";
import { compileNodes } from "../ast-helpers";
import { FrameAsn } from "../frame-asn";

export class ElseAsn extends FrameAsn {
  isStatement: boolean = true;

  hasIf: boolean = false;

  hrefForFrameHelp: string = "LangRef.html#else";

  constructor(
    private readonly condition: AstNode,
    fieldId: string,
    scope: Scope,
  ) {
    super(fieldId, scope);
  }

  setIfExtension(to: boolean) {
    this.hasIf = to;
  }

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
    return singleIndent(); //overrides the additional indent added for most child statements
  }

  compile(): string {
    this.compileErrors = [];
    return `${this.indent()}} else ${this.compileIfClause()}
${compileNodes(this.compileChildren)}`;
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

  getChildRange(initialScope: Scope) {
    const fst = this.compileChildren[0];
    const fi = this.compileChildren.indexOf(fst);
    const li = this.compileChildren.indexOf(initialScope as unknown as AstNode);

    return fi < li
      ? this.compileChildren.slice(fi, li + 1)
      : this.compileChildren.slice(li, fi + 1);
  }

  resolveSymbol(id: string, transforms: Transforms, initialScope: Scope): ElanSymbol {
    if (this.compileChildren.length > 0) {
      let range = this.getChildRange(initialScope);

      if (range.length > 1) {
        range = range.slice(0, range.length - 1);

        for (const f of range) {
          if (isSymbol(f) && id) {
            const sids = getIds(f.symbolId);
            if (sids.includes(id)) {
              return f;
            }
          }
        }
      }
    }

    return this.getOuterScope().resolveSymbol(id, transforms, this.getCurrentScope());
  }

  symbolMatches(id: string, all: boolean, initialScope: Scope): ElanSymbol[] {
    const matches = this.getOuterScope().symbolMatches(id, all, this.getCurrentScope());

    let localMatches: ElanSymbol[] = [];

    if (this.compileChildren.length > 0) {
      let range = this.getChildRange(initialScope as Frame);

      if (range.length > 1) {
        range = range.slice(0, range.length - 1);
        const symbols = handleDeconstruction(range.filter((r) => isSymbol(r)));
        localMatches = symbolMatches(id, all, symbols);
      }
    }
    return localMatches.concat(matches);
  }
}
