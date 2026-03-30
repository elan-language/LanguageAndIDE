import { SymbolType } from "../../../compiler/compiler-interfaces/symbol-type";
import { asKeyword, privateKeyword, propertyKeyword } from "../../../compiler/elan-keywords";
import { ClassType } from "../../../compiler/symbols/class-type";
import { IdentifierField } from "../fields/identifier-field";
import { TypeField } from "../fields/type-field";
import {
  addPrivateToggleToContextMenu,
  modifierAsElanSource,
  togglePrivatePublic,
} from "../frame-helpers";
import { CodeSource } from "../frame-interfaces/code-source";
import { editorEvent } from "../frame-interfaces/editor-event";
import { Field } from "../frame-interfaces/field";
import { Parent } from "../frame-interfaces/parent";
import { PossiblyPrivateMember } from "../frame-interfaces/possibly-private-member";
import { AbstractClass } from "../globals/abstract-class";
import { SingleLineFrame } from "../single-line-frame";

export class Property extends SingleLineFrame implements PossiblyPrivateMember {
  isMember = true;
  isProperty = true;
  isAbstract = false;
  name: IdentifierField;
  type: TypeField;
  public isPrivate: boolean = false;
  constructor(parent: Parent, priv = false) {
    super(parent);
    this.name = new IdentifierField(this);
    this.type = new TypeField(this);
    this.isPrivate = priv;
    this.canHaveBreakPoint = false;
  }

  isOnAbstractClass(): boolean {
    return this.getParent() instanceof AbstractClass;
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

  frameSpecificAnnotation(): string {
    const priv = this.isPrivate ? "private " : "";
    return `${priv}property`;
  }

  override outerHtmlTag: string = "el-prop";

  renderAsElanSource(): string {
    return `${this.indent()}${this.sourceAnnotations()}${modifierAsElanSource(this)}${propertyKeyword} ${this.name.renderAsElanSource()} ${asKeyword} ${this.type.renderAsElanSource()}\r\n`;
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
      this.isPrivate = true;
    }
    source.remove(`${propertyKeyword} `);
    this.name.parseFrom(source);
    source.remove(` ${asKeyword} `);
    this.type.parseFrom(source);
  }

  makePublic = () => {
    this.isPrivate = false;
    return true;
  };
  makePrivate = () => {
    this.isPrivate = true;
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
