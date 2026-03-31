import {
  endKeyword,
  functionKeyword,
  privateKeyword,
  returnsKeyword,
} from "../../../compiler/elan-keywords";
import { getClassType, isImplementingAbstract } from "../../../compiler/symbols/symbol-helpers";
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
import { ClassFrame } from "../globals/class-frame";
import { FunctionFrame } from "../globals/function-frame";

export class FunctionMethod extends FunctionFrame implements PossiblyPrivateMember {
  isMember: boolean = true;
  isPrivate: boolean;
  isAbstract = false;
  file: File;
  constructor(parent: Parent, priv = false) {
    super(parent);
    this.file = parent.getFile();
    this.isPrivate = priv;
  }
  isOnAbstractClass(): boolean {
    return this.getParent() instanceof AbstractClass;
  }

  helpId(): string {
    return "function_method";
  }

  public override indent(): string {
    return singleIndent();
  }

  frameSpecificAnnotation(): string {
    const priv = this.isPrivate ? "private " : "";
    return `${priv}function`;
  }

  public implementsAbstractMethodOnClassOrInterface(): [string, boolean] {
    const name = this.name.renderAsElanSource();
    const cls = (this.getParent() as ClassFrame).name.renderAsElanSource();
    const root = this.file.getAst(true)!;
    const superCls = isImplementingAbstract(name, cls, root);
    const abstractClass = getClassType(name, root);
    return [superCls, abstractClass ? true : false];
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
}
