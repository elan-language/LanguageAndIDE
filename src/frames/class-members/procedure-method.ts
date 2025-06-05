import { mustBeUniqueNameInScope } from "../compile-rules";
import {
  addPrivateToggleToContextMenu,
  processTogglePrivate,
  singleIndent,
} from "../frame-helpers";
import { ConcreteClass } from "../globals/concrete-class";
import { ProcedureFrame } from "../globals/procedure-frame";
import { CodeSource } from "../interfaces/code-source";
import { editorEvent } from "../interfaces/editor-event";
import { ElanSymbol } from "../interfaces/elan-symbol";
import { Parent } from "../interfaces/parent";
import { PossiblyPrivateMember } from "../interfaces/possibly-private-member";
import { Scope } from "../interfaces/scope";
import { Transforms } from "../interfaces/transforms";
import { privateKeyword } from "../keywords";
import { getClassScope } from "../symbols/symbol-helpers";
import { SymbolScope } from "../symbols/symbol-scope";

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
    return `${this.indent()}${this.modifierAsSource()}procedure ${this.name.renderAsSource()}(${this.params.renderAsSource()})\r
${this.renderChildrenAsSource()}\r
${this.indent()}end procedure\r
`;
  }

  public renderAsHtml(): string {
    return `<el-proc class="${this.cls()}" id='${this.htmlId}' tabindex="0" ${this.toolTip()}>
<el-top>${this.contextMenu()}${this.bpAsHtml()}<el-expand>+</el-expand>${this.modifierAsHtml()}<el-kw>procedure </el-kw><el-method>${this.name.renderAsHtml()}</el-method>(${this.params.renderAsHtml()})${this.helpAsHtml()}${this.compileMsgAsHtml()}${this.getFrNo()}</el-top>
${this.renderChildrenAsHtml()}
<el-kw>end procedure</el-kw>
</el-proc>`;
  }

  public override compile(transforms: Transforms): string {
    this.compileErrors = [];

    const name = this.name.compile(transforms);
    mustBeUniqueNameInScope(name, getClassScope(this), transforms, this.compileErrors, this.htmlId);

    return `${this.indent()}async ${super.compile(transforms)}\r
${this.indent()}}\r
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

  resolveSymbol(id: string, transforms: Transforms, initialScope: Scope): ElanSymbol {
    if (this.name.text === id) {
      return this;
    }

    return super.resolveSymbol(id, transforms, initialScope);
  }

  get symbolId() {
    return this.name.renderAsSource();
  }

  symbolScope = SymbolScope.member;

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
