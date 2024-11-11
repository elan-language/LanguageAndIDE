import { CodeSource } from "../code-source";
import { mustBeUniqueNameInScope } from "../compile-rules";
import { ClassFrame } from "../globals/class-frame";
import { ProcedureFrame } from "../globals/procedure-frame";
import { singleIndent } from "../helpers";
import { ElanSymbol } from "../interfaces/elan-symbol";
import { Frame } from "../interfaces/frame";
import { Member } from "../interfaces/member";
import { Parent } from "../interfaces/parent";
import { privateKeyword } from "../keywords";
import { getClassScope } from "../symbols/symbol-helpers";
import { SymbolScope } from "../symbols/symbol-scope";
import { Transforms } from "../syntax-nodes/transforms";

export class ProcedureMethod extends ProcedureFrame implements Member {
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
    return `${this.indent()}${this.modifierAsSource()}procedure ${this.name.renderAsSource()}(${this.params.renderAsSource()})\r
${this.renderChildrenAsSource()}\r
${this.indent()}end procedure\r
`;
  }

  public renderAsHtml(): string {
    return `<procedure class="${this.cls()}" id='${this.htmlId}' tabindex="0">
<top><expand>+</expand>${this.modifierAsHtml()}<el-kw>procedure </el-kw><el-method>${this.name.renderAsHtml()}</el-method>(${this.params.renderAsHtml()})${this.compileMsgAsHtml()}${this.getFrNo()}</top>
${this.renderChildrenAsHtml()}
<el-kw>end procedure</el-kw>
</procedure>`;
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

  resolveSymbol(id: string | undefined, transforms: Transforms, initialScope: Frame): ElanSymbol {
    if (this.name.text === id) {
      return this;
    }

    return super.resolveSymbol(id, transforms, initialScope);
  }

  get symbolId() {
    return this.name.renderAsSource();
  }

  symbolScope = SymbolScope.member;
}
