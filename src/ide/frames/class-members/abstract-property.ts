import {
  abstractKeyword,
  abstractPropertyKeywords,
  asKeyword,
  propertyKeyword,
} from "../../../compiler/elan-keywords";
import { IdentifierField } from "../fields/identifier-field";
import { TypeField } from "../fields/type-field";
import { CodeSource } from "../frame-interfaces/code-source";
import { Field } from "../frame-interfaces/field";
import { MemberFrame } from "../frame-interfaces/member-frame";
import { Parent } from "../frame-interfaces/parent";
import { ConcreteClass } from "../globals/concrete-class";
import { SingleLineFrame } from "../single-line-frame";

export class AbstractProperty extends SingleLineFrame implements MemberFrame {
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
  isPrivate: boolean = false;

  isOnAbstractClass(): boolean {
    return true;
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

  frameSpecificAnnotation(): string {
    return "abstract property";
  }

  override outerHtmlTag: string = "el-prop";

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
