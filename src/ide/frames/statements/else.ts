import { elseKeyword, thenKeyword } from "../../../compiler/keywords";
import { CodeSourceFromString } from "../code-source-from-string";
import { ExpressionField } from "../fields/expression-field";
import { IfSelectorField } from "../fields/if-selector-field";
import { CodeSource } from "../frame-interfaces/code-source";
import { Field } from "../frame-interfaces/field";
import { Parent } from "../frame-interfaces/parent";
import { Statement } from "../frame-interfaces/statement";
import { SingleLineStatement } from "../single-line-statement";

export class Else extends SingleLineStatement implements Statement {
  isStatement: boolean = true;
  selectIfClause: IfSelectorField;
  hasIf: boolean = false;
  condition: ExpressionField;
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

  private ifClauseAsSource(): string {
    return this.hasIf ? ` if ${this.condition.renderAsElanSource()}` : ``;
  }

  indent() {
    return this.getParent()!.indent(); //overrides the additional indent added for most child statements
  }

  renderAsElanSource(): string {
    return `${this.indent()}${this.sourceAnnotations()}${elseKeyword}${this.ifClauseAsSource()}${this.hasIf ? " " + thenKeyword : ""}`;
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
}
