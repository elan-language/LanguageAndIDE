import { CodeSource } from "../code-source";
import {
  mustBeCompatibleType,
  mustBeKnownSymbolType,
  mustBeUniqueNameInScope,
} from "../compile-rules";
import { privateHelp, singleIndent } from "../frame-helpers";
import { ClassFrame } from "../globals/class-frame";
import { FunctionFrame } from "../globals/function-frame";
import { editorEvent } from "../interfaces/editor-event";
import { ElanSymbol } from "../interfaces/elan-symbol";
import { Frame } from "../interfaces/frame";
import { Member } from "../interfaces/member";
import { Parent } from "../interfaces/parent";
import { endKeyword, functionKeyword, privateKeyword, returnKeyword } from "../keywords";
import { getClassScope } from "../symbols/symbol-helpers";
import { SymbolScope } from "../symbols/symbol-scope";
import { Transforms } from "../syntax-nodes/transforms";

export class FunctionMethod extends FunctionFrame implements Member {
  isMember: boolean = true;
  private: boolean;
  isAbstract = false;

  constructor(parent: Parent, priv = false) {
    super(parent);
    this.private = priv;
  }

  getClass(): ClassFrame {
    return this.getParent() as ClassFrame;
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
    return `${this.indent()}${this.modifierAsSource()}${functionKeyword} ${this.name.renderAsSource()}(${this.params.renderAsSource()}) ${returnKeyword} ${this.returnType.renderAsSource()}\r
${this.renderChildrenAsSource()}\r
${this.indent()}${endKeyword} ${functionKeyword}\r
`;
  }
  public renderAsHtml(): string {
    return `<el-func class="${this.cls()}" id='${this.htmlId}' tabindex="0" ${this.privateHelp()}>
<el-top><el-expand>+</el-expand>${this.modifierAsHtml()}<el-kw>${functionKeyword} </el-kw><el-method>${this.name.renderAsHtml()}</el-method>(${this.params.renderAsHtml()})<el-kw> ${returnKeyword} </el-kw>${this.returnType.renderAsHtml()}${this.compileMsgAsHtml()}${this.getFrNo()}</el-top>
${this.renderChildrenAsHtml()}
<el-kw>${endKeyword} ${functionKeyword}</el-kw>
</el-func>`;
  }
  public override compile(transforms: Transforms): string {
    this.compileErrors = [];

    const name = this.name.compile(transforms);
    mustBeUniqueNameInScope(name, getClassScope(this), transforms, this.compileErrors, this.htmlId);

    const rt = this.symbolType(transforms).returnType;

    mustBeKnownSymbolType(rt, this.returnType.renderAsSource(), this.compileErrors, this.htmlId);

    const returnStatement = this.getReturnStatement().expr.getOrTransformAstNode(transforms);
    const rst = returnStatement.symbolType();

    mustBeCompatibleType(rt, rst, this.compileErrors, returnStatement!.fieldId);
    return `${this.indent()}${super.compile(transforms)}\r
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
    super.parseTop(source);
  }
  parseBottom(source: CodeSource): boolean {
    return super.parseBottom(source);
  }

  resolveSymbol(id: string | undefined, transforms: Transforms, initialScope: Frame): ElanSymbol {
    if (this.name.text === id) {
      return this;
    }

    return super.resolveSymbol(id, transforms, initialScope);
  }

  get symbolScope() {
    return SymbolScope.member;
  }

  processKey(e: editorEvent): boolean {
    if (!this.getClass().abstract && e.key === "p" && e.modKey.control) {
      this.private = !this.private;
      return true;
    } else {
      return super.processKey(e);
    }
  }
  privateHelp(): string {
    return privateHelp(this, functionKeyword);
  }
}
