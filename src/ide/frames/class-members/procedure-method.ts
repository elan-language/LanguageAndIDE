import { addPrivateToggleToContextMenu, singleIndent, togglePrivatePublic } from "../frame-helpers";
import { editorEvent } from "../frame-interfaces/editor-event";
import { Parent } from "../frame-interfaces/parent";
import { PossiblyPrivateMember } from "../frame-interfaces/possibly-private-member";
import { FrameType } from "../frame-type";
import { AbstractClass } from "../globals/abstract-class";
import { ProcedureFrame } from "../globals/procedure-frame";

export class ProcedureMethod extends ProcedureFrame implements PossiblyPrivateMember {
  frameType: FrameType = FrameType.procedureMethod;
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

  override helpDocument(): string {
    return "oopRef.html";
  }

  override helpId(): string {
    return "procedure_method";
  }

  public override indent(): string {
    return singleIndent();
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

  renderAsSource(): string {
    return `${super.renderAsSource()}\r
`;
  }
}
