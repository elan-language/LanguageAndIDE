import { addPrivateToggleToContextMenu, singleIndent, togglePrivatePublic } from "../frame-helpers";
import { editorEvent } from "../frame-interfaces/editor-event";
import { File } from "../frame-interfaces/file";
import { Parent } from "../frame-interfaces/parent";
import { PossiblyPrivateMember } from "../frame-interfaces/possibly-private-member";
import { FrameType } from "../frame-type";
import { AbstractClass } from "../globals/abstract-class";
import { FunctionFrame } from "../globals/function-frame";

export class FunctionMethod extends FunctionFrame implements PossiblyPrivateMember {
  frameType: FrameType = FrameType.functionMethod;
  isMember: boolean = true;
  isPrivate: boolean;
  isAbstract = false;
  file: File;
  help: string = "functionMethod";
  document: string = "oopRef.html";

  constructor(parent: Parent, priv = false) {
    super(parent);
    this.file = parent.getFile();
    this.isPrivate = priv;
  }

  isOnAbstractClass(): boolean {
    return this.getParent() instanceof AbstractClass;
  }

  setDocument(id: string) {
    this.document = id;
  }

  override helpDocument(): string {
    return this.document;
  }

  setHelpId(id: string) {
    this.help = id;
  }

  helpId(): string {
    return this.help;
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
