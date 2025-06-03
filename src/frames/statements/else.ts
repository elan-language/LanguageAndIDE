import { AbstractFrame } from "../abstract-frame";
import { CodeSourceFromString } from "../code-source-from-string";
import { mustBeOfType } from "../compile-rules";
import { ExpressionField } from "../fields/expression-field";
import { IfSelectorField } from "../fields/if-selector-field";
import { CodeSource } from "../interfaces/code-source";
import { ElanSymbol } from "../interfaces/elan-symbol";
import { Field } from "../interfaces/field";
import { Frame } from "../interfaces/frame";
import { Parent } from "../interfaces/parent";
import { Scope } from "../interfaces/scope";
import { Statement } from "../interfaces/statement";
import { Transforms } from "../interfaces/transforms";
import { elseKeyword, thenKeyword } from "../keywords";
import { compileStatements } from "../parent-helpers";
import { BooleanType } from "../symbols/boolean-type";
import { getIds, handleDeconstruction, isSymbol, symbolMatches } from "../symbols/symbol-helpers";

export class Else extends AbstractFrame implements Statement {
  isStatement: boolean = true;
  selectIfClause: IfSelectorField;
  hasIf: boolean = false;
  condition: ExpressionField;
  hrefForFrameHelp: string = "LangRef.html#else";

  constructor(parent: Parent) {
    super(parent);
    this.condition = new ExpressionField(this);
    this.condition.setPlaceholder("<i>condition</i>");
    this.selectIfClause = new IfSelectorField(this);
  }

  protected setClasses() {
    super.setClasses();
    this.pushClass(true, "outdent");
  }

  initialKeywords(): string {
    return elseKeyword;
  }

  getFields(): Field[] {
    return this.hasIf ? [this.condition] : [this.selectIfClause];
  }

  setIfExtension(to: boolean) {
    this.hasIf = to;
  }

  getIdPrefix(): string {
    return "else";
  }
  private ifClauseAsHtml(): string {
    return this.hasIf
      ? `<el-kw>if </el-kw>${this.condition.renderAsHtml()}`
      : `${this.selectIfClause.renderAsHtml()}`;
  }

  private ifClauseAsSource(): string {
    return this.hasIf ? ` if ${this.condition.renderAsSource()}` : ``;
  }

  private compileIfClause(transforms: Transforms): string {
    if (this.hasIf) {
      mustBeOfType(
        this.condition.getOrTransformAstNode(transforms),
        BooleanType.Instance,
        this.compileErrors,
        this.htmlId,
      );
      return `if (${this.condition.compile(transforms)}) {`;
    }
    return `{`;
  }

  getCurrentScope(): Scope {
    return this.compileScope ?? this;
  }

  indent() {
    return this.getParent()!.indent(); //overrides the additional indent added for most child statements
  }

  renderAsHtml(): string {
    return `<el-statement class="${this.cls()}" id='${this.htmlId}' tabindex="0" ${this.toolTip()}><el-top>${this.contextMenu()}${this.bpAsHtml()}
    <el-kw>${elseKeyword} </el-kw>${this.helpAsHtml()}${this.ifClauseAsHtml()}${this.hasIf ? "<el-kw> " + thenKeyword + "</el-kw>" : ""}</el-top>${this.compileMsgAsHtml()}${this.getFrNo()}</el-statement>`;
  }

  renderAsSource(): string {
    return `${this.indent()}${elseKeyword}${this.ifClauseAsSource()}${this.hasIf ? " " + thenKeyword : ""}`;
  }

  compile(transforms: Transforms): string {
    this.compileErrors = [];
    return `${this.indent()}} else ${this.compileIfClause(transforms)}
${compileStatements(transforms, this.compileChildren)}`;
  }

  parseFrom(source: CodeSource): void {
    source.remove("else");
    if (source.isMatch(" if ")) {
      this.hasIf = true;
      source.remove(" if ");
      const condition = source.readUntil(/\sthen/);
      this.condition.parseFrom(new CodeSourceFromString(condition));
      source.remove(" then");
    }
  }

  compileChildren: Frame[] = [];

  setCompileScope(s: Scope) {
    this.compileScope = s;
    this.compileChildren = [];
  }

  addChild(f: Frame) {
    this.compileChildren.push(f);
  }

  getOuterScope() {
    // need to get scope of IfStatement
    return this.getCurrentScope().getParentScope();
  }

  getChildRange(initialScope: Scope) {
    const fst = this.compileChildren[0];
    const fi = this.compileChildren.indexOf(fst);
    const li = this.compileChildren.indexOf(initialScope as Frame);

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
