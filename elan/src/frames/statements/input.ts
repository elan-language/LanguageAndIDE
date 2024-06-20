import { Parent } from "../interfaces/parent";
import { AbstractFrame } from "../abstract-frame";
import { Field } from "../interfaces/field";
import { CodeSource } from "../code-source";
import { Statement } from "../interfaces/statement";
import { IdentifierField } from "../fields/identifier-field";
import { inputKeyword } from "../keywords";
import { Frame } from "../interfaces/frame";
import { ElanSymbol } from "../interfaces/symbol";
import { StringType } from "../symbols/string-type";
import { Transforms } from "../syntax-nodes/transforms";
import { SymbolScope } from "../symbols/symbol-scope";
import { getParentScope } from "../symbols/symbol-helpers";
import { UnknownSymbol } from "../symbols/unknown-symbol";
import { mustBeOfSymbolType } from "../compile-rules";

export class Input extends AbstractFrame implements Statement, ElanSymbol {
  isStatement = true;
  varName: IdentifierField;

  constructor(parent: Parent) {
    super(parent);
    this.varName = new IdentifierField(this);
    this.varName.setPlaceholder("variable name");
  }
  initialKeywords(): string {
    return inputKeyword;
  }
  parseFrom(source: CodeSource): void {
    source.removeIndent();
    source.remove("input ");
    this.varName.parseFrom(source);
    source.removeNewLine();
  }
  getFields(): Field[] {
    return [this.varName];
  }
  getIdPrefix(): string {
    return "input";
  }

  renderAsHtml(): string {
    return `<statement class="${this.cls()}" id='${this.htmlId}' tabindex="0"><keyword>input </keyword>${this.varName.renderAsHtml()}${this.compileMsgAsHtml()}</statement>`;
  }

  renderAsSource(): string {
    return `${this.indent()}input ${this.varName.renderAsSource()}`;
  }

  compile(transforms: Transforms): string {
    this.compileErrors = [];

    const id = getParentScope(this).resolveSymbol(this.varName.text, transforms, this);
    let declare = "";

    if (id instanceof UnknownSymbol) {
      declare = "var ";
    } else {
      mustBeOfSymbolType(
        id.symbolType(transforms),
        StringType.Instance,
        this.compileErrors,
        this.htmlId,
      );
    }

    return `${this.indent()}${declare}${this.varName.compile(transforms)} = await system.input();`;
  }

  get symbolId() {
    return this.varName.text;
  }

  symbolType(transforms: Transforms) {
    return StringType.Instance;
  }

  symbolScope = SymbolScope.local;

  resolveSymbol(id: string | undefined, transforms: Transforms, initialScope: Frame): ElanSymbol {
    if (id === this.symbolId) {
      return this;
    }

    return super.resolveSymbol(id, transforms, initialScope);
  }
}
