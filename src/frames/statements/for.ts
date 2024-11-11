import { CodeSource } from "../code-source";
import { mustBeOfSymbolType } from "../compile-rules";
import { ExpressionField } from "../fields/expression-field";
import { IdentifierField } from "../fields/identifier-field";
import { FrameWithStatements } from "../frame-with-statements";
import { ElanSymbol } from "../interfaces/elan-symbol";
import { Field } from "../interfaces/field";
import { Frame } from "../interfaces/frame";
import { Parent } from "../interfaces/parent";
import { Statement } from "../interfaces/statement";
import { forKeyword } from "../keywords";
import { IntType } from "../symbols/int-type";
import { SymbolScope } from "../symbols/symbol-scope";
import { UnknownSymbol } from "../symbols/unknown-symbol";
import { Transforms } from "../syntax-nodes/transforms";

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
<top><expand>+</expand><el-kw>for </el-kw>${this.variable.renderAsHtml()}<el-kw> from </el-kw>${this.from.renderAsHtml()}<el-kw> to </el-kw>${this.to.renderAsHtml()}<el-kw> step </el-kw>${this.step.renderAsHtml()}${this.compileMsgAsHtml()}${this.getFrNo()}</top>
${this.renderChildrenAsHtml()}
<el-kw>end for</el-kw>
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

    const id = this.getParentScope().resolveSymbol(v, transforms, this);
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
