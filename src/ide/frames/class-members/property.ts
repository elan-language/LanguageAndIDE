import { SymbolType } from "../../../compiler/compiler-interfaces/symbol-type";
import { asKeyword, privateKeyword, propertyKeyword } from "../../../compiler/keywords";
import { ClassType } from "../../../compiler/symbols/class-type";
import { IdentifierField } from "../fields/identifier-field";
import { TypeField } from "../fields/type-field";
import {
  addPrivateToggleToContextMenu,
  modifierAsSource,
  togglePrivatePublic,
} from "../frame-helpers";
import { CodeSource } from "../frame-interfaces/code-source";
import { editorEvent } from "../frame-interfaces/editor-event";
import { Field } from "../frame-interfaces/field";
import { Parent } from "../frame-interfaces/parent";
import { PossiblyPrivateMember } from "../frame-interfaces/possibly-private-member";
import { SingleLineFrame } from "../single-line-frame";

export class Property extends SingleLineFrame implements PossiblyPrivateMember {
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

  getFieldsDefaultImpl(): Field[] {
    return [this.name, this.type];
  }

  getIdPrefix(): string {
    return "prop";
  }

  frameSpecificAnnotation(): string {
    return "property";
  }

  override outerHtmlTag: string = "el-prop";

  renderAsElanSource(): string {
    return `${this.indent()}${this.sourceAnnotations()}${modifierAsSource(this)}${propertyKeyword} ${this.name.renderAsElanSource()} ${asKeyword} ${this.type.renderAsElanSource()}\r\n`;
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
