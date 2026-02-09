import { abstractProcedureKeywords } from "../../../compiler/keywords";
import { IdentifierField } from "../fields/identifier-field";
import { ParamListField } from "../fields/param-list-field";
import { singleIndent } from "../frame-helpers";
import { CodeSource } from "../frame-interfaces/code-source";
import { Field } from "../frame-interfaces/field";
import { Parent } from "../frame-interfaces/parent";
import { SingleLineFrame } from "../single-line-frame";

export class AbstractProcedure extends SingleLineFrame {
  isAbstract = true;
  isMember: boolean = true;
  private = false;
  public name: IdentifierField;
  public params: ParamListField;
  constructor(parent: Parent) {
    super(parent);
    this.name = new IdentifierField(this);
    this.params = new ParamListField(this);
    this.canHaveBreakPoint = false;
  }

  initialKeywords(): string {
    return abstractProcedureKeywords;
  }
  getFields(): Field[] {
    return [this.name, this.params];
  }

  getIdPrefix(): string {
    return "proc";
  }

  frameSpecificAnnotation(): string {
    return "abstract procedure";
  }

  public override indent(): string {
    return singleIndent();
  }

  override outerHtmlTag: string = "el-proc";

  public override renderAsElanSource(): string {
    return `${this.indent()}${this.sourceAnnotations()}abstract procedure ${this.name.renderAsElanSource()}(${this.params.renderAsElanSource()})\r
`;
  }

  parseFrom(source: CodeSource): void {
    source.remove("abstract procedure ");
    this.name.parseFrom(source);
    source.remove("(");
    this.params.parseFrom(source);
    source.remove(")");
  }
}
