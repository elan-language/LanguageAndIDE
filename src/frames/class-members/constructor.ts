import { ParamListField } from "../fields/param-list-field";
import { FrameWithStatements } from "../frame-with-statements";
import { ConcreteClass } from "../globals/concrete-class";
import { CodeSource } from "../interfaces/code-source";
import { ElanSymbol } from "../interfaces/elan-symbol";
import { Field } from "../interfaces/field";
import { Member } from "../interfaces/member";
import { Parent } from "../interfaces/parent";
import { Scope } from "../interfaces/scope";
import { Transforms } from "../interfaces/transforms";
import { constructorKeyword } from "../keywords";
import { ProcedureType } from "../symbols/procedure-type";
import { SymbolScope } from "../symbols/symbol-scope";
import { UnknownSymbol } from "../symbols/unknown-symbol";

export class Constructor extends FrameWithStatements implements ElanSymbol, Member {
  isConstructor = true;
  isMember = true;
  isAbstract = false;
  private = false;
  public params: ParamListField;
  hrefForFrameHelp: string = "LangRef.html#constructor";

  constructor(parent: Parent) {
    super(parent);
    this.params = new ParamListField(this);
  }

  getClass(): ConcreteClass {
    return this.getParent() as ConcreteClass;
  }

  initialKeywords(): string {
    return constructorKeyword;
  }

  getFields(): Field[] {
    return [this.params];
  }

  getIdPrefix(): string {
    return "constructor";
  }

  public renderAsHtml(): string {
    return `<el-constructor class="${this.cls()}" id='${this.htmlId}' tabindex="0" ${this.toolTip()}>
<el-top>${this.contextMenu()}${this.bpAsHtml()}<el-expand>+</el-expand><el-kw>constructor</el-kw>(${this.params.renderAsHtml()})${this.helpAsHtml()}${this.compileMsgAsHtml()}${this.getFrNo()}</el-top>
${this.renderChildrenAsHtml()}
<el-kw>end constructor</el-kw>
</el-constructor>`;
  }

  public renderAsSource(): string {
    return `${this.indent()}constructor(${this.params.renderAsSource()})\r
${this.renderChildrenAsSource()}\r
${this.indent()}end constructor\r
`;
  }

  parseTop(source: CodeSource): void {
    source.removeIndent();
    source.remove("constructor(");
    this.params.parseFrom(source);
    source.remove(")");
  }
  parseBottom(source: CodeSource): boolean {
    return this.parseStandardEnding(source, "end constructor");
  }

  resolveSymbol(id: string, transforms: Transforms, initialScope: Scope): ElanSymbol {
    const s = this.params.resolveSymbol(id, transforms, this);
    return s instanceof UnknownSymbol ? super.resolveSymbol(id, transforms, initialScope) : s;
  }

  public override symbolMatches(id: string, all: boolean, initialScope: Scope): ElanSymbol[] {
    const matches = super.symbolMatches(id, all, initialScope);
    const localMatches = this.params.symbolMatches(id, all, initialScope);
    return localMatches.concat(matches);
  }

  get symbolId() {
    return `__${constructorKeyword}`;
  }

  symbolType() {
    const [pn, pt] = this.params.symbolNamesAndTypes();
    return new ProcedureType(pn, pt, false, false);
  }

  get symbolScope() {
    return SymbolScope.member;
  }
}
