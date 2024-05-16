import { FrameWithStatements } from "../frame-with-statements";
import { ParamList } from "../fields/param-list";
import { Member } from "../interfaces/member";
import { ClassFrame } from "../globals/class-frame";
import { Field } from "../interfaces/field";
import { CodeSource } from "../code-source";
import { ElanSymbol } from "../interfaces/symbol";
import { Frame } from "../interfaces/frame";
import { constructorKeyword } from "../keywords";
import { UnknownSymbol } from "../symbols/unknown-symbol";
import { Transforms } from "../syntax-nodes/transforms";

export class Constructor extends FrameWithStatements implements Member {
  isConstructor = true;
  isMember = true;
  public params: ParamList;
  private class: ClassFrame;

  constructor(parent: ClassFrame) {
    super(parent);
    this.class = parent as ClassFrame;
    this.movable = false;
    this.params = new ParamList(this);
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
<top><expand>+</expand><keyword>constructor</keyword>(${this.params.renderAsHtml()})</top>${this.compileMsgAsHtml()}
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
    return `${this.indent()}constructor(${this.params.compile(transforms)}) {\r
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

  resolveSymbol(
    id: string | undefined,
    transforms: Transforms,
    initialScope: Frame,
  ): ElanSymbol {
    const s = this.params.resolveSymbol(id, transforms, this);
    return s === UnknownSymbol.Instance
      ? this.getParent().resolveSymbol(id, transforms, this)
      : s;
  }
}
