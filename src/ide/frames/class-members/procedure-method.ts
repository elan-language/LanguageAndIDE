import { privateKeyword } from "../../../compiler/keywords";
import { addPrivateToggleToContextMenu, singleIndent, togglePrivatePublic } from "../frame-helpers";
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

  private modifierAsHtml(): string {
    return this.private
      ? `<el-comment># [private]</el-comment>
    `
      : "";
  }

  private modifierAsSource(): string {
    return this.private ? `private ` : "";
  }

  public override indent(): string {
    return singleIndent();
  }

  public override renderAsSource(): string {
    return `${this.indent()}${this.sourceAnnotations()}${this.modifierAsSource()}procedure ${this.name.renderAsSource()}(${this.params.renderAsSource()})\r
${this.renderChildrenAsSource()}\r
${this.indent()}end procedure\r
`;
  }

  public renderAsHtml(): string {
    return `<el-proc class="${this.cls()}" id='${this.htmlId}' tabindex="-1" ${this.toolTip()}>
<el-top>${this.contextMenu()}${this.bpAsHtml()}<el-expand>+</el-expand>${this.modifierAsHtml()}<el-kw>procedure </el-kw>${this.name.renderAsHtml()}<el-punc>(</el-punc><el-kw>self</el-kw>: TODO, ${this.params.renderAsHtml()}<el-punc>)</el-punc>${this.helpAsHtml()}${this.compileMsgAsHtml()}${this.getFrNo()}</el-top>
${this.renderChildrenAsHtml()}
</el-proc>`;
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
