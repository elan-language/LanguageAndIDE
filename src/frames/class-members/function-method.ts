import { addPrivateToggleToContextMenu, singleIndent } from "../frame-helpers";
import { CodeSource } from "../frame-interfaces/code-source";
import { Parent } from "../frame-interfaces/parent";
import { PossiblyPrivateMember } from "../frame-interfaces/possibly-private-member";
import { FunctionFrame } from "../globals/function-frame";
import { endKeyword, functionKeyword, privateKeyword, returnsKeyword } from "../keywords";

export class FunctionMethod extends FunctionFrame implements PossiblyPrivateMember {
  isMember: boolean = true;
  private: boolean;
  isAbstract = false;
  constructor(parent: Parent, priv = false) {
    super(parent);
    this.private = priv;
  }

  helpId(): string {
    return "function_method";
  }

  private modifierAsHtml(): string {
    return this.private ? `<el-kw>private </el-kw>` : "";
  }

  private modifierAsSource(): string {
    return this.private ? `private ` : "";
  }

  public override indent(): string {
    return singleIndent();
  }

  public override renderAsSource(): string {
    return `${this.indent()}${this.modifierAsSource()}${functionKeyword} ${this.name.renderAsSource()}(${this.params.renderAsSource()}) ${returnsKeyword} ${this.returnType.renderAsSource()}\r
${this.renderChildrenAsSource()}\r
${this.indent()}${endKeyword} ${functionKeyword}\r
`;
  }
  public renderAsHtml(): string {
    return `<el-func class="${this.cls()}" id='${this.htmlId}' tabindex="-1" ${this.toolTip()}>
<el-top>${this.contextMenu()}${this.bpAsHtml()}<el-expand>+</el-expand>${this.modifierAsHtml()}<el-kw>${functionKeyword} </el-kw><el-method>${this.name.renderAsHtml()}</el-method>(${this.params.renderAsHtml()})<el-kw> ${returnsKeyword} </el-kw>${this.returnType.renderAsHtml()}${this.helpAsHtml()}${this.compileMsgAsHtml()}${this.getFrNo()}</el-top>
${this.renderChildrenAsHtml()}
<el-kw>${endKeyword} ${functionKeyword}</el-kw>
</el-func>`;
  }

  parseTop(source: CodeSource): void {
    source.removeIndent();
    const priv = `${privateKeyword} `;
    if (source.isMatch(priv)) {
      source.remove(priv);
      this.private = true;
    }
    super.parseTop(source);
  }
  parseBottom(source: CodeSource): boolean {
    return super.parseBottom(source);
  }

  makePublic = () => {
    this.private = false;
  };
  makePrivate = () => {
    this.private = true;
  };

  getContextMenuItems() {
    const map = super.getContextMenuItems();
    addPrivateToggleToContextMenu(this, map);
    return map;
  }
}
