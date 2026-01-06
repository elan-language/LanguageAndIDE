import {
  abstractKeyword,
  abstractPropertyKeywords,
  asKeyword,
  propertyKeyword,
} from "../../../compiler/keywords";
import { IdentifierField } from "../fields/identifier-field";
import { TypeField } from "../fields/type-field";
import { CodeSource } from "../frame-interfaces/code-source";
import { Field } from "../frame-interfaces/field";
import { Parent } from "../frame-interfaces/parent";
import { ConcreteClass } from "../globals/concrete-class";
import { SingleLineFrame } from "../single-line-frame";

export class AbstractProperty extends SingleLineFrame {
  isAbstract = true;
  isMember = true;
  name: IdentifierField;
  type: TypeField;
  public private: boolean = false;
  constructor(parent: Parent) {
    super(parent);
    this.name = new IdentifierField(this);
    this.type = new TypeField(this);
    this.canHaveBreakPoint = false;
  }

  getClass(): ConcreteClass {
    return this.getParent() as ConcreteClass;
  }

  initialKeywords(): string {
    return abstractPropertyKeywords;
  }

  getFields(): Field[] {
    return [this.name, this.type];
  }

  getIdPrefix(): string {
    return "prop";
  }

  override outerHtmlTag: string = "el-prop";

  renderAsHtml(): string {
    return `<el-prop class="${this.cls()}" id='${this.htmlId}' tabindex="-1" ${this.toolTip()}><el-top>${this.contextMenu()}${this.bpAsHtml()}<el-kw>${abstractKeyword} ${propertyKeyword} </el-kw>${this.name.renderAsHtml()}<el-kw> ${asKeyword} </el-kw>${this.type.renderAsHtml()}${this.helpAsHtml()}</el-top>${this.compileMsgAsHtml()}${this.getFrNo()}</el-prop>`;
  }

  renderAsElanSource(): string {
    return `${this.indent()}${this.sourceAnnotations()}${abstractKeyword} ${propertyKeyword} ${this.name.renderAsElanSource()} ${asKeyword} ${this.type.renderAsElanSource()}\r\n`;
  }

  parseFrom(source: CodeSource): void {
    source.remove("abstract property ");
    this.name.parseFrom(source);
    source.remove(" as ");
    this.type.parseFrom(source);
  }
}
