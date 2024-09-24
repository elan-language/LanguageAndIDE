import { CodeSource } from "../code-source";
import { ParamList } from "../fields/param-list";
import { FrameWithStatements } from "../frame-with-statements";
import { ClassFrame } from "../globals/class-frame";
import { isMember } from "../helpers";
import { Field } from "../interfaces/field";
import { Frame } from "../interfaces/frame";
import { Member } from "../interfaces/member";
import { ElanSymbol } from "../interfaces/symbol";
import { constructorKeyword } from "../keywords";
import { ClassType } from "../symbols/class-type";
import { UnknownSymbol } from "../symbols/unknown-symbol";
import { Transforms } from "../syntax-nodes/transforms";

export class Constructor extends FrameWithStatements implements Member {
  isConstructor = true;
  isMember = true;
  isAbstract = false;
  private = false;
  public params: ParamList;

  constructor(parent: ClassFrame) {
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

    const mixins: string[] = [];

    const superClasses = (this.getParent() as ClassFrame).getSuperClassesTypeAndName(transforms);

    for (const tn of superClasses.filter((t) => t[0] instanceof ClassType)) {
      const children = (tn[0] as ClassType)
        .childSymbols()
        .filter((s) => isMember(s) && s.private) as unknown as Member[];

      if (children.length > 0) {
        const name = tn[1];
        mixins.push(`_${name} = new ${name}()`);
      }
    }

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
}
