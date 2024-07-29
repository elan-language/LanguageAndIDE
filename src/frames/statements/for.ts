import { IdentifierField } from "../fields/identifier-field";
import { Parent } from "../interfaces/parent";
import { Field } from "../interfaces/field";
import { CodeSource } from "../code-source";
import { FrameWithStatements } from "../frame-with-statements";
import { Statement } from "../interfaces/statement";
import { forKeyword } from "../keywords";
import { Frame } from "../interfaces/frame";
import { ElanSymbol } from "../interfaces/symbol";
import { mustBeOfSymbolType } from "../compile-rules";
import { IntType } from "../symbols/int-type";
import { Transforms } from "../syntax-nodes/transforms";
import { SymbolScope } from "../symbols/symbol-scope";
import { ExpressionField } from "../fields/expression-field";
import { getParentScope } from "../symbols/symbol-helpers";
import { UnknownSymbol } from "../symbols/unknown-symbol";

export class For extends FrameWithStatements implements Statement {
  isStatement: boolean = true;
  variable: IdentifierField;
  from: ExpressionField;
  to: ExpressionField;
  step: ExpressionField;

  constructor(parent: Parent) {
    super(parent);
    this.variable = new IdentifierField(this);
    this.variable.setPlaceholder("variableName");
    this.from = new ExpressionField(this, / to /);
    this.to = new ExpressionField(this, / step /);
    this.step = new ExpressionField(this);
    this.step.setFieldToKnownValidText("1");
  }

  initialKeywords(): string {
    return forKeyword;
  }

  getFields(): Field[] {
    return [this.variable, this.from, this.to, this.step];
  }

  getIdPrefix(): string {
    return "for";
  }
  renderAsHtml(): string {
    return `<statement class="${this.cls()}" id='${this.htmlId}' tabindex="0">
<top><expand>+</expand><keyword>for </keyword>${this.variable.renderAsHtml()}<keyword> from </keyword>${this.from.renderAsHtml()}<keyword> to </keyword>${this.to.renderAsHtml()}<keyword> step </keyword>${this.step.renderAsHtml()}${this.compileMsgAsHtml()}${this.getFrNo()}</top>
${this.renderChildrenAsHtml()}
<keyword>end for</keyword>
</statement>`;
  }

  renderAsSource(): string {
    return `${this.indent()}for ${this.variable.renderAsSource()} from ${this.from.renderAsSource()} to ${this.to.renderAsSource()} step ${this.step.renderAsSource()}\r
${this.renderChildrenAsSource()}\r
${this.indent()}end for`;
  }

  compile(transforms: Transforms): string {
    this.compileErrors = [];
    const v = this.variable.compile(transforms);
    const f = this.from.compile(transforms);
    const t = this.to.compile(transforms);
    let s = this.step.compile(transforms);

    const id = getParentScope(this).resolveSymbol(v, transforms, this);
    let declare = "";

    if (id instanceof UnknownSymbol) {
      declare = "var ";
    } else {
      mustBeOfSymbolType(
        id.symbolType(transforms),
        IntType.Instance,
        this.compileErrors,
        this.htmlId,
      );
    }

    mustBeOfSymbolType(
      this.from.symbolType(transforms),
      IntType.Instance,
      this.compileErrors,
      this.htmlId,
    );
    mustBeOfSymbolType(
      this.to.symbolType(transforms),
      IntType.Instance,
      this.compileErrors,
      this.htmlId,
    );
    mustBeOfSymbolType(
      this.step.symbolType(transforms),
      IntType.Instance,
      this.compileErrors,
      this.htmlId,
    );

    let compare = "<=";
    let incDec = "+";

    if (s.startsWith("-")) {
      compare = ">=";
      incDec = "-";
      s = s.slice(1);
    }

    return `${this.indent()}for (${declare}${v} = ${f}; ${v} ${compare} ${t}; ${v} = ${v} ${incDec} ${s}) {\r
${this.compileStatements(transforms)}\r
${this.indent()}}`;
  }

  parseTop(source: CodeSource): void {
    source.remove("for ");
    this.variable.parseFrom(source);
    source.remove(" from ");
    this.from.parseFrom(source);
    source.remove(" to ");
    this.to.parseFrom(source);
    source.remove(" step ");
    this.step.parseFrom(source);
  }
  parseBottom(source: CodeSource): boolean {
    return this.parseStandardEnding(source, "end for");
  }

  resolveSymbol(id: string | undefined, transforms: Transforms, initialScope: Frame): ElanSymbol {
    const v = this.variable.text;

    if (id === v) {
      const st = this.from.symbolType(transforms);
      return {
        symbolId: id,
        symbolType: () => st,
        symbolScope: SymbolScope.counter,
      };
    }

    return super.resolveSymbol(id, transforms, initialScope);
  }
}
