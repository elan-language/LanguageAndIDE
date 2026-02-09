import { elseKeyword } from "../../../compiler/keywords";
import { CodeSource } from "../frame-interfaces/code-source";
import { Field } from "../frame-interfaces/field";
import { Statement } from "../frame-interfaces/statement";
import { SingleLineFrame } from "../single-line-frame";

export class Else extends SingleLineFrame implements Statement {
  isStatement: boolean = true;

  protected setClasses() {
    super.setClasses();
    this.pushClass(true, "outdent");
  }

  initialKeywords(): string {
    return elseKeyword;
  }

  getFieldsDefaultImpl(): Field[] {
    return [];
  }

  getIdPrefix(): string {
    return "else";
  }

  frameSpecificAnnotation(): string {
    return "";
  }

  indent() {
    return this.getParent()!.indent(); //overrides the additional indent added for most child statements
  }

  renderAsElanSource(): string {
    return `${this.indent()}${this.sourceAnnotations()}${elseKeyword}`;
  }

  parseFrom(source: CodeSource): void {
    source.remove("else");
  }
}
