import { privateKeyword } from "../../../compiler/keywords";
import {
  addPrivateToggleToContextMenu,
  modifierAsSource,
  singleIndent,
  togglePrivatePublic,
} from "../frame-helpers";
import { CodeSource } from "../frame-interfaces/code-source";
import { editorEvent } from "../frame-interfaces/editor-event";
import { Parent } from "../frame-interfaces/parent";
import { PossiblyPrivateMember } from "../frame-interfaces/possibly-private-member";
import { ProcedureFrame } from "../globals/procedure-frame";

export class ProcedureMethod extends ProcedureFrame implements PossiblyPrivateMember {
  isMember: boolean = true;
  private: boolean;
  isAbstract = false;
  constructor(parent: Parent, priv = false) {
    super(parent);
    this.private = priv;
  }

  override helpId(): string {
    return "procedure_method";
  }

  public override indent(): string {
    return singleIndent();
  }

  public override renderAsSource(): string {
    return `${this.indent()}${this.sourceAnnotations()}${modifierAsSource(this)}procedure ${this.name.renderAsSource()}(${this.params.renderAsSource()})\r
${this.renderChildrenAsSource()}\r
${this.indent()}end procedure\r
`;
  }

  parseTop(source: CodeSource): void {
    source.removeIndent();
    const priv = `${privateKeyword} `;
    if (source.isMatch(priv)) {
      source.remove(priv);
      this.private = true;
    }
    return super.parseTop(source);
  }

  parseBottom(source: CodeSource): boolean {
    return super.parseBottom(source);
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
