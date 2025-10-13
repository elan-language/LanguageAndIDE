import { SymbolType } from "../../../compiler/compiler-interfaces/symbol-type";
import { asKeyword, privateKeyword, propertyKeyword } from "../../../compiler/keywords";
import { ClassType } from "../../../compiler/symbols/class-type";
import { AbstractFrame } from "../abstract-frame";
import { IdentifierField } from "../fields/identifier-field";
import { TypeField } from "../fields/type-field";
import { addPrivateToggleToContextMenu, togglePrivatePublic } from "../frame-helpers";
import { CodeSource } from "../frame-interfaces/code-source";
import { editorEvent } from "../frame-interfaces/editor-event";
import { Field } from "../frame-interfaces/field";
import { Parent } from "../frame-interfaces/parent";
import { PossiblyPrivateMember } from "../frame-interfaces/possibly-private-member";

export class Property extends AbstractFrame implements PossiblyPrivateMember {
  isMember = true;
  isProperty = true;
  isAbstract = false;
  name: IdentifierField;
  type: TypeField;
  public private: boolean = false;
  constructor(parent: Parent, priv = false) {
    super(parent);
    this.name = new IdentifierField(this);
    this.type = new TypeField(this);
    this.private = priv;
    this.canHaveBreakPoint = false;
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
    return `<el-prop class="${this.cls()}" id='${this.htmlId}' tabindex="-1" ${this.toolTip()}>${this.contextMenu()}${this.modifierAsHtml()}<el-kw>${propertyKeyword} </el-kw>${this.name.renderAsHtml()}<el-kw> ${asKeyword} </el-kw>${this.type.renderAsHtml()}${this.helpAsHtml()}${this.compileMsgAsHtml()}${this.getFrNo()}</el-prop>`;
  }

  renderAsSource(): string {
    return `${this.indent()}${this.sourceAnnotations()}${this.modifierAsSource()}${propertyKeyword} ${this.name.renderAsSource()} ${asKeyword} ${this.type.renderAsSource()}\r\n`;
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

  makePublic = () => {
    this.private = false;
    return true;
  };
  makePrivate = () => {
    this.private = true;
    return true;
  };
  getContextMenuItems() {
    const map = super.getContextMenuItems();
    addPrivateToggleToContextMenu(this, map);
    return map;
  }

  processKey(e: editorEvent): boolean {
    if (e.modKey.control && e.key === "p") {
      return togglePrivatePublic(this);
    }

    return super.processKey(e);
  }
}
