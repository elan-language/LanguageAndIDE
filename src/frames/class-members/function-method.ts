import {
  addPrivateToggleToContextMenu,
  processTogglePrivate,
  singleIndent,
} from "../frame-helpers";
import { ConcreteClass } from "../globals/concrete-class";
import { FunctionFrame } from "../globals/function-frame";
import { CodeSource } from "../interfaces/code-source";
import { editorEvent } from "../interfaces/editor-event";
import { ElanSymbol } from "../interfaces/elan-symbol";
import { Parent } from "../interfaces/parent";
import { PossiblyPrivateMember } from "../interfaces/possibly-private-member";
import { Scope } from "../interfaces/scope";
import { Transforms } from "../interfaces/transforms";
import { endKeyword, functionKeyword, privateKeyword, returnsKeyword } from "../keywords";
import { SymbolScope } from "../symbols/symbol-scope";

export class FunctionMethod extends FunctionFrame implements PossiblyPrivateMember {
  isMember: boolean = true;
  private: boolean;
  isAbstract = false;
  hrefForFrameHelp: string = "LangRef.html#function_method";

  constructor(parent: Parent, priv = false) {
    super(parent);
    this.private = priv;
  }

  getClass(): ConcreteClass {
    return this.getParent() as ConcreteClass;
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
    return `<el-func class="${this.cls()}" id='${this.htmlId}' tabindex="0" ${this.toolTip()}>
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

  resolveSymbol(id: string, transforms: Transforms, initialScope: Scope): ElanSymbol {
    if (this.name.text === id) {
      return this;
    }

    return super.resolveSymbol(id, transforms, initialScope);
  }

  get symbolScope() {
    return SymbolScope.member;
  }

  processKey(e: editorEvent): boolean {
    let result = false;
    if (processTogglePrivate(this, e)) {
      result = true;
    } else {
      result = super.processKey(e);
    }
    return result;
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
