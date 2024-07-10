import { ExpressionField } from "../fields/expression-field";
import { IdentifierField } from "../fields/identifier-field";
import { Parent } from "../interfaces/parent";
import { File } from "../interfaces/file";
import { Field } from "../interfaces/field";
import { CodeSource } from "../code-source";
import { FrameWithStatements } from "../frame-with-statements";
import { Statement } from "../interfaces/statement";
import { eachKeyword } from "../keywords";
import { Frame } from "../interfaces/frame";
import { ElanSymbol } from "../interfaces/symbol";
import { mustBeIterable, mustNotBeReassigned } from "../compile-rules";
import { Transforms } from "../syntax-nodes/transforms";
import { SymbolScope } from "../symbols/symbol-scope";
import { GenericSymbolType } from "../interfaces/generic-symbol-type";

export class Each extends FrameWithStatements implements Statement {
  isStatement = true;
  variable: IdentifierField;
  iter: ExpressionField;

  constructor(parent: File | Parent) {
    super(parent);
    this.variable = new IdentifierField(this);
    this.variable.setPlaceholder("variableName");
    this.iter = new ExpressionField(this);
    this.iter.setPlaceholder("iterable value or expression");
  }
  initialKeywords(): string {
    return eachKeyword;
  }

  getFields(): Field[] {
    return [this.variable, this.iter];
  }

  getIdPrefix(): string {
    return "each";
  }
  renderAsHtml(): string {
    return `<statement class="${this.cls()}" id='${this.htmlId}' tabindex="0">
<top><expand>+</expand><keyword>each </keyword>${this.variable.renderAsHtml()}<keyword> in </keyword>${this.iter.renderAsHtml()}</top>${this.compileMsgAsHtml()}
${this.renderChildrenAsHtml()}
<keyword>end each</keyword>
</statement>`;
  }

  renderAsSource(): string {
    return `${this.indent()}each ${this.variable.renderAsSource()} in ${this.iter.renderAsSource()}\r
${this.renderChildrenAsSource()}\r
${this.indent()}end each`;
  }

  compile(transforms: Transforms): string {
    this.compileErrors = [];

    const id = this.variable.getOrTransformAstNode(transforms)?.compile();
    const symbol = this.getParent().resolveSymbol(id!, transforms, this);

    mustNotBeReassigned(symbol, this.compileErrors, this.htmlId);

    const iterType = this.iter.getOrTransformAstNode(transforms)?.symbolType();
    mustBeIterable(iterType!, this.compileErrors, this.htmlId);

    return `${this.indent()}for (const ${this.variable.compile(transforms)} of ${this.iter.compile(transforms)}) {\r
${this.compileChildren(transforms)}\r
${this.indent()}}`;
  }

  parseTop(source: CodeSource): void {
    source.remove("each ");
    this.variable.parseFrom(source);
    source.remove(" in ");
    this.iter.parseFrom(source);
  }
  parseBottom(source: CodeSource): boolean {
    return this.parseStandardEnding(source, "end each");
  }

  resolveSymbol(id: string | undefined, transforms: Transforms, initialScope: Frame): ElanSymbol {
    const v = this.variable.text;

    if (id === v) {
      const st = (this.iter.symbolType(transforms) as GenericSymbolType).ofType;
      return {
        symbolId: id,
        symbolType: () => st,
        symbolScope: SymbolScope.counter,
      };
    }

    const iter = this.iter.text;

    if (id === iter) {
      // intercept iter resolve in order to make counter so it's immutable
      const symbol = super.resolveSymbol(id, transforms, this);
      return {
        symbolId: id,
        symbolType: (t) => symbol.symbolType(t),
        symbolScope: SymbolScope.counter,
      };
    }

    return super.resolveSymbol(id, transforms, initialScope);
  }
}
