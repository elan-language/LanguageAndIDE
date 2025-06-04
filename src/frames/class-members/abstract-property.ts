import { AbstractFrame } from "../abstract-frame";
import { IdentifierField } from "../fields/identifier-field";
import { TypeField } from "../fields/type-field";
import { ConcreteClass } from "../globals/concrete-class";
import { CodeSource } from "../interfaces/code-source";
import { Field } from "../interfaces/field";
import { Parent } from "../interfaces/parent";
import { abstractKeyword, abstractPropertyKeywords, asKeyword, propertyKeyword } from "../keywords";

export class AbstractProperty extends AbstractFrame {
  isAbstract = true;
  isMember = true;
  name: IdentifierField;
  type: TypeField;
  public private: boolean = false;
  constructor(parent: Parent) {
    super(parent);
    this.name = new IdentifierField(this);
    this.type = new TypeField(this);
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

  renderAsHtml(): string {
    return `<el-prop class="${this.cls()}" id='${this.htmlId}' tabindex="0" ${this.toolTip()}><el-top>${this.bpAsHtml()}<el-kw>${abstractKeyword} ${propertyKeyword} </el-kw>${this.name.renderAsHtml()}<el-kw> ${asKeyword} </el-kw>${this.type.renderAsHtml()}${this.helpAsHtml()}</el-top>${this.compileMsgAsHtml()}${this.getFrNo()}</el-prop>`;
  }

  renderAsSource(): string {
    return `${this.indent()}${abstractKeyword} ${propertyKeyword} ${this.name.renderAsSource()} ${asKeyword} ${this.type.renderAsSource()}\r\n`;
  }

  parseFrom(source: CodeSource): void {
    source.remove("abstract property ");
    this.name.parseFrom(source);
    source.remove(" as ");
    this.type.parseFrom(source);
  }
}
