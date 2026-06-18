import {
  endKeyword,
  functionKeyword,
  privateKeyword,
  returnsKeyword,
} from "../../../compiler/elan-keywords";
import {
  addPrivateToggleToContextMenu,
  modifierAsElanSource,
  singleIndent,
  togglePrivatePublic,
} from "../frame-helpers";
import { CodeSource } from "../frame-interfaces/code-source";
import { editorEvent } from "../frame-interfaces/editor-event";
import { File } from "../frame-interfaces/file";
import { Parent } from "../frame-interfaces/parent";
import { PossiblyPrivateMember } from "../frame-interfaces/possibly-private-member";
import { AbstractClass } from "../globals/abstract-class";
import { FunctionFrame } from "../globals/function-frame";

export class FunctionMethod extends FunctionFrame implements PossiblyPrivateMember {
  isMember: boolean = true;
  isPrivate: boolean;
  isAbstract = false;
  file: File;
  help: string =  "functionMethod";
  document: string =  "oopRef.html";

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

  frameSpecificAnnotation(): string {
    const priv = this.isPrivate ? "private " : "";
    return `${priv}function method`;
  }

  public override renderAsElanSource(): string {
    return `${this.indent()}${this.sourceAnnotations()}${modifierAsElanSource(this)}${functionKeyword} ${this.name.renderAsElanSource()}(${this.params.renderAsElanSource()}) ${returnsKeyword} ${this.returnType.renderAsElanSource()}\r
${this.renderChildrenAsElanSource()}\r
${this.indent()}${endKeyword} ${functionKeyword}\r
`;
  }

  parseTop(source: CodeSource): void {
    source.removeIndent();
    const priv = `${privateKeyword} `;
    if (source.isMatch(priv)) {
      source.remove(priv);
      this.isPrivate = true;
    }
    super.parseTop(source);
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

  renderAsExport(): string {
    return `${super.renderAsExport()}\r
`;
  }
}
