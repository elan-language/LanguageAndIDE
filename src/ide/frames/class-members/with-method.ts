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
import { ClassFrame } from "../globals/class-frame";
import { FunctionFrame } from "../globals/function-frame";
import { LetStatement } from "../statements/let-statement";
import { WithPropertyUpdate } from "../statements/with-property-update";

export class WithMethod extends FunctionFrame implements PossiblyPrivateMember {
  isMember: boolean = true;
  isPrivate: boolean = false;
  isAbstract: boolean = false;
  file: File;

  constructor(parent: Parent) {
    super(parent);
    this.file = parent.getFile();
    this.name.setPlaceholder("<i>withPropertyName</i>");
    const className: string = (this.getParent() as ClassFrame).name.text;
    this.returnType.setFieldToKnownValidText(className);
    this.removeChild(this.getChildren()[0]); // remove new code selector

    const letCopyOfThis = new LetStatement(this);
    letCopyOfThis.name.setFieldToKnownValidText("copyOfThis");
    letCopyOfThis.expr.setFieldToKnownValidText("copy(this)");
        const ret = this.getReturnStatement();
    this.addChildBefore(letCopyOfThis, ret);
    const withProp = new WithPropertyUpdate(this);
    this.addChildBefore(withProp, ret);
    ret.expr.setFieldToKnownValidText("copyOfThis");
  }

  isOnAbstractClass(): boolean {
    return this.getParent() instanceof AbstractClass;
  }

  getIdPrefix(): string {
    return "with";
  }

  helpId(): string {
    return "with_method";
  }

  public override indent(): string {
    return singleIndent();
  }

  frameSpecificAnnotation(): string {
    const priv = this.isPrivate ? "private " : "";
    return `${priv}function`;
  }

  public override renderAsElanSource(): string {
    return `${this.indent()}${this.sourceAnnotations()}${modifierAsElanSource(this)}${functionKeyword} {this.name.renderAsElanSource()}(${this.params.renderAsElanSource()}) ${returnsKeyword} ${this.returnType.renderAsElanSource()}\r
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
