import { ElanSymbol } from "../interfaces/symbol";
import { SymbolScope } from "../symbols/symbol-scope";
import { CodeSource } from "../code-source";
import { ClassFrame } from "../globals/class-frame";
import { FunctionFrame } from "../globals/function-frame";
import { singleIndent } from "../helpers";
import { Frame } from "../interfaces/frame";
import { Member } from "../interfaces/member";
import { endKeyword, functionKeyword, returnKeyword } from "../keywords";
import { Transforms } from "../syntax-nodes/transforms";

export class FunctionMethod extends FunctionFrame implements Member {
  isMember: boolean = true;
  private class: ClassFrame;

  constructor(parent: ClassFrame) {
    super(parent);
    this.class = parent as ClassFrame;
  }
  public override indent(): string {
    return singleIndent();
  }
  public override renderAsSource(): string {
    return `${this.indent()}${functionKeyword} ${this.name.renderAsSource()}(${this.params.renderAsSource()}) ${returnKeyword} ${this.returnType.renderAsSource()}\r
${this.renderChildrenAsSource()}\r
${this.indent()}${endKeyword} ${functionKeyword}\r
`;
  }
  public override compile(transforms: Transforms): string {
    super.compile(transforms);
    return `${this.indent()}${super.compile(transforms)}\r
${this.indent()}}\r
`;
  }
  parseTop(source: CodeSource): void {
    source.removeIndent();
    super.parseTop(source);
  }
  parseBottom(source: CodeSource): boolean {
    return super.parseBottom(source);
  }

  resolveSymbol(
    id: string | undefined,
    transforms: Transforms,
    initialScope: Frame,
  ): ElanSymbol {
    if (this.name.text === id) {
      return this as ElanSymbol;
    }

    return super.resolveSymbol(id, transforms, initialScope);
  }

  symbolScope = SymbolScope.property;
}
