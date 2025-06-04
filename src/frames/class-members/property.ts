import { AbstractFrame } from "../abstract-frame";
import { IdentifierField } from "../fields/identifier-field";
import { TypeField } from "../fields/type-field";
import { addPrivateToggleToContextMenu, processTogglePrivate } from "../frame-helpers";
import { ClassFrame } from "../globals/class-frame";
import { CodeSource } from "../interfaces/code-source";
import { editorEvent } from "../interfaces/editor-event";
import { Field } from "../interfaces/field";
import { Parent } from "../interfaces/parent";
import { PossiblyPrivateMember } from "../interfaces/possibly-private-member";
import { SymbolType } from "../interfaces/symbol-type";
import { asKeyword, privateKeyword, propertyKeyword } from "../keywords";
import { ClassType } from "../symbols/class-type";

export class Property extends AbstractFrame implements PossiblyPrivateMember {
  isMember = true;
  isProperty = true;
  isAbstract = false;
  name: IdentifierField;
  type: TypeField;
  public private: boolean = false;
  hrefForFrameHelp: string = "LangRef.html#property";

  constructor(parent: Parent, priv = false) {
    super(parent);
    this.name = new IdentifierField(this);
    this.type = new TypeField(this);
    this.private = priv;
  }

  initialKeywords(): string {
    return propertyKeyword;
  }

  getFields(): Field[] {
    return [this.name, this.type];
  }

  getIdPrefix(): string {
    return "prop";
  }
  private modifierAsHtml(): string {
    return this.private ? `<el-kw>private </el-kw>` : "";
  }
  private modifierAsSource(): string {
    return this.private ? `private ` : "";
  }

  renderAsHtml(): string {
    return `<el-prop class="${this.cls()}" id='${this.htmlId}' tabindex="0" ${this.toolTip()}>${this.modifierAsHtml()}<el-kw>${propertyKeyword} </el-kw>${this.name.renderAsHtml()}<el-kw> ${asKeyword} </el-kw>${this.type.renderAsHtml()}${this.helpAsHtml()}${this.compileMsgAsHtml()}${this.getFrNo()}</el-prop>`;
  }

  renderAsSource(): string {
    return `${this.indent()}${this.modifierAsSource()}${propertyKeyword} ${this.name.renderAsSource()} ${asKeyword} ${this.type.renderAsSource()}\r\n`;
  }

  isGlobalClass(st: SymbolType) {
    // todo rework when tests working
    return st instanceof ClassType && !st.typeOptions.isIndexable;
  }

  parseFrom(source: CodeSource): void {
    source.removeIndent();
    const priv = `${privateKeyword} `;
    if (source.isMatch(priv)) {
      source.remove(priv);
      this.private = true;
    }
    source.remove(`${propertyKeyword} `);
    this.name.parseFrom(source);
    source.remove(` ${asKeyword} `);
    this.type.parseFrom(source);
  }

  processKey(e: editorEvent): boolean {
    let result = false;
    if (this.canBePrivate() && processTogglePrivate(this, e)) {
      result = true;
    } else {
      result = super.processKey(e);
    }
    return result;
  }

  private canBePrivate(): boolean {
    const parent = this.getParent() as unknown as ClassFrame;
    return !parent.isRecord;
  }

  makePublic = () => {
    this.private = false;
  };
  makePrivate = () => {
    this.private = true;
  };
  getContextMenuItems() {
    const map = super.getContextMenuItems();
    addPrivateToggleToContextMenu(this, map);
    return map;
  }
}
