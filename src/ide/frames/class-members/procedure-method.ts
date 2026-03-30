import { privateKeyword } from "../../../compiler/elan-keywords";
import {
  addPrivateToggleToContextMenu,
  modifierAsElanSource,
  singleIndent,
  togglePrivatePublic,
} from "../frame-helpers";
import { CodeSource } from "../frame-interfaces/code-source";
import { editorEvent } from "../frame-interfaces/editor-event";
import { Parent } from "../frame-interfaces/parent";
import { PossiblyPrivateMember } from "../frame-interfaces/possibly-private-member";
import { AbstractClass } from "../globals/abstract-class";
import { ProcedureFrame } from "../globals/procedure-frame";

export class ProcedureMethod extends ProcedureFrame implements PossiblyPrivateMember {
  isMember: boolean = true;
  isPrivate: boolean;
  isAbstract = false;
  constructor(parent: Parent, priv = false) {
    super(parent);
    this.isPrivate = priv;
  }

  isOnAbstractClass(): boolean {
    return this.getParent() instanceof AbstractClass;
  }

  override helpId(): string {
    return "procedure_method";
  }

  public override indent(): string {
    return singleIndent();
  }

  frameSpecificAnnotation(): string {
    const priv = this.isPrivate ? "private " : "";
    return `${priv}procedure`;
  }

  public override renderAsElanSource(): string {
    return `${this.indent()}${this.sourceAnnotations()}${modifierAsElanSource(this)}procedure ${this.name.renderAsElanSource()}(${this.params.renderAsElanSource()})\r
${this.renderChildrenAsElanSource()}\r
${this.indent()}end procedure\r
`;
  }

  parseTop(source: CodeSource): void {
    source.removeIndent();
    const priv = `${privateKeyword} `;
    if (source.isMatch(priv)) {
      source.remove(priv);
      this.isPrivate = true;
    }
    return super.parseTop(source);
  }

  parseBottom(source: CodeSource): boolean {
    return super.parseBottom(source);
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
