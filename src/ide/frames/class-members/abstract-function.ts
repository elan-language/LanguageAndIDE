import {
  abstractFunctionKeywords,
  abstractKeyword,
  functionKeyword,
  returnsKeyword,
} from "../../../compiler/keywords";
import { IdentifierField } from "../fields/identifier-field";
import { ParamListField } from "../fields/param-list-field";
import { TypeField } from "../fields/type-field";
import { singleIndent } from "../frame-helpers";
import { CodeSource } from "../frame-interfaces/code-source";
import { Field } from "../frame-interfaces/field";
import { Parent } from "../frame-interfaces/parent";
import { SingleLineFrame } from "../single-line-frame";

export class AbstractFunction extends SingleLineFrame {
  isAbstract = true;
  isMember: boolean = true;
  private = false;
  public name: IdentifierField;
  public params: ParamListField;
  public returnType: TypeField;
  hrefForFrameHelp: string = "LangRef.html#Abstract_function";

  constructor(parent: Parent) {
    super(parent);
    this.name = new IdentifierField(this);
    this.params = new ParamListField(this, false);
    this.returnType = new TypeField(this);
    this.canHaveBreakPoint = false;
  }

  initialKeywords(): string {
    return abstractFunctionKeywords;
  }
  getFields(): Field[] {
    return [this.name, this.params, this.returnType];
  }

  getIdPrefix(): string {
    return "func";
  }

  frameSpecificAnnotation(): string {
    return "abstract function";
  }

  public override indent(): string {
    return singleIndent();
  }

  override outerHtmlTag: string = "el-func";

  public override renderAsElanSource(): string {
    return `${this.indent()}${this.sourceAnnotations()}${abstractKeyword} ${functionKeyword} ${this.name.renderAsElanSource()}(${this.params.renderAsElanSource()}) ${returnsKeyword} ${this.returnType.renderAsElanSource()}\r
`;
  }

  parseFrom(source: CodeSource): void {
    source.remove(`${abstractKeyword} ${functionKeyword} `);
    this.name.parseFrom(source);
    source.remove("(");
    this.params.parseFrom(source);
    source.remove(`) ${returnsKeyword} `);
    this.returnType.parseFrom(source);
  }
}
