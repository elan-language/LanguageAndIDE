import { ElanSymbol } from "../interfaces/symbol";
import { SymbolScope } from "../symbols/symbol-scope";
import { CodeSource } from "../code-source";
import { ProcedureFrame } from "../globals/procedure-frame";
import { singleIndent } from "../helpers";
import { Frame } from "../interfaces/frame";
import { Member } from "../interfaces/member";
import { Transforms } from "../syntax-nodes/transforms";
import { Parent } from "../interfaces/parent";

export class ProcedureMethod extends ProcedureFrame implements Member {
  isMember: boolean = true;

  constructor(parent: Parent) {
    super(parent);
  }

  public override indent(): string {
    return singleIndent();
  }
  public override renderAsSource(): string {
    return `${this.indent()}procedure ${this.name.renderAsSource()}(${this.params.renderAsSource()})\r
${this.renderChildrenAsSource()}\r
${this.indent()}end procedure\r
`;
  }

  public override compile(transforms: Transforms): string {
    super.compile(transforms);
    return `${this.indent()}async ${super.compile(transforms)}\r
${this.indent()}}\r
`;
  }

  parseTop(source: CodeSource): void {
    source.removeIndent();
    return super.parseTop(source);
  }
  parseBottom(source: CodeSource): boolean {
    return super.parseBottom(source);
  }

  resolveSymbol(id: string | undefined, transforms: Transforms, initialScope: Frame): ElanSymbol {
    if (this.name.text === id) {
      return this as ElanSymbol;
    }

    return super.resolveSymbol(id, transforms, initialScope);
  }

  get symbolId() {
    return this.name.renderAsSource();
  }

  symbolScope = SymbolScope.property;
}
