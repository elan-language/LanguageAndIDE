import { CodeSource } from "../code-source";
import { cannotHaveDuplicatePrivateIds } from "../compile-rules";
import { ParamList } from "../fields/param-list";
import { FrameWithStatements } from "../frame-with-statements";
import { ClassFrame } from "../globals/class-frame";
import { ElanSymbol } from "../interfaces/elan-symbol";
import { Field } from "../interfaces/field";
import { Frame } from "../interfaces/frame";
import { Member } from "../interfaces/member";
import { Parent } from "../interfaces/parent";
import { constructorKeyword } from "../keywords";
import { ProcedureType } from "../symbols/procedure-type";
import { getAllPrivateIds, getMixins } from "../symbols/symbol-helpers";
import { SymbolScope } from "../symbols/symbol-scope";
import { UnknownSymbol } from "../symbols/unknown-symbol";
import { Transforms } from "../syntax-nodes/transforms";

export class Constructor extends FrameWithStatements implements ElanSymbol, Member {
  isConstructor = true;
  isMember = true;
  isAbstract = false;
  private = false;
  public params: ParamList;

  constructor(parent: Parent) {
    super(parent);
    this.movable = false;
    this.params = new ParamList(this);
  }

  getClass(): ClassFrame {
    return this.getParent() as ClassFrame;
  }

  initialKeywords(): string {
    return constructorKeyword;
  }

  delete(): void {} //Does nothing as constructor cannot be deleted

  getFields(): Field[] {
    return [this.params];
  }

  getIdPrefix(): string {
    return "constructor";
  }

  public renderAsHtml(): string {
    return `<constructor class="${this.cls()}" id='${this.htmlId}' tabindex="0">
<top><expand>+</expand><keyword>constructor</keyword>(${this.params.renderAsHtml()})${this.compileMsgAsHtml()}${this.getFrNo()}</top>
${this.renderChildrenAsHtml()}
<keyword>end constructor</keyword>
</constructor>`;
  }

  public renderAsSource(): string {
    return `${this.indent()}constructor(${this.params.renderAsSource()})\r
${this.renderChildrenAsSource()}\r
${this.indent()}end constructor\r
`;
  }

  public compile(transforms: Transforms): string {
    this.compileErrors = [];
    const parentClass = this.getParent() as ClassFrame;

    const allPrivateIds = getAllPrivateIds(parentClass, transforms);
    const duplicates = allPrivateIds.filter((n, i, a) => a.indexOf(n) !== i);

    if (duplicates.length > 0) {
      cannotHaveDuplicatePrivateIds(duplicates, this.compileErrors, this.htmlId);
    }

    const mixins: string[] = getMixins(parentClass, transforms);
    const mixinVars = mixins.length === 0 ? "" : `${this.indent()}${mixins.join("; ")};\n`;

    return `${mixinVars}${this.indent()}constructor(${this.params.compile(transforms)}) {\r
${this.compileStatements(transforms)}\r
${this.indent()}}\r
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
  canInsertBefore(): boolean {
    return false;
  }

  resolveSymbol(id: string | undefined, transforms: Transforms, initialScope: Frame): ElanSymbol {
    const s = this.params.resolveSymbol(id, transforms, this);
    return s instanceof UnknownSymbol ? super.resolveSymbol(id, transforms, initialScope) : s;
  }

  public override symbolMatches(id: string, all: boolean, initialScope?: Frame): ElanSymbol[] {
    const matches = super.symbolMatches(id, all, initialScope);
    const localMatches = this.params.symbolMatches(id, all, initialScope);
    return localMatches.concat(matches);
  }

  get symbolId() {
    return constructorKeyword;
  }

  symbolType(transforms?: Transforms) {
    const pt = this.params.symbolTypes(transforms);
    return new ProcedureType(pt, false, false);
  }

  get symbolScope() {
    return SymbolScope.property;
  }
}
