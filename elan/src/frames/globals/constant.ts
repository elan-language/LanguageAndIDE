import { IdentifierField } from "../fields/identifier-field";
import { AbstractFrame } from "../abstract-frame";
import { File } from "../interfaces/file";
import { Field } from "../interfaces/field";
import { CodeSource } from "../code-source";
import { ConstantValueField } from "../fields/constant-value-field";
import { ElanSymbol } from "../interfaces/symbol";
import { constantKeyword } from "../keywords";
import { Frame } from "../interfaces/frame";
import { GlobalFrame } from "../interfaces/global-frame";
import { Transforms } from "../syntax-nodes/transforms";
import { SymbolScope } from "../symbols/symbol-scope";
import { Collapsible } from "../interfaces/collapsible";
import { mustBeUniqueNameInScope } from "../compile-rules";
import { getGlobalScope } from "../symbols/symbol-helpers";

export class Constant extends AbstractFrame implements ElanSymbol, GlobalFrame, Collapsible {
  isCollapsible: boolean = true;
  isGlobal = true;
  name: IdentifierField;
  value: ConstantValueField;
  file: File;

  constructor(parent: File) {
    super(parent);
    this.file = parent;
    this.name = new IdentifierField(this);
    this.value = new ConstantValueField(this);
    this.value.setPlaceholder("literal value or data structure");
  }
  initialKeywords(): string {
    return constantKeyword;
  }
  parseFrom(source: CodeSource): void {
    source.remove("constant ");
    this.name.parseFrom(source);
    source.remove(" set to ");
    this.value.parseFrom(source);
  }

  protected setClasses() {
    super.setClasses();
    this.pushClass(true, "multiline");
  }

  getFields(): Field[] {
    return [this.name, this.value];
  }

  getIdPrefix(): string {
    return "const";
  }
  renderAsHtml(): string {
    return `<constant class="${this.cls()}" id='${this.htmlId}' tabindex="0"><top><expand>+</expand><keyword>constant </keyword>${this.name.renderAsHtml()}</top><keyword> set to </keyword>${this.value.renderAsHtml()}${this.compileMsgAsHtml()}</constant>`;
  }

  indent(): string {
    return "";
  }
  renderAsSource(): string {
    return `constant ${this.name.renderAsSource()} set to ${this.value.renderAsSource()}\r
`;
  }

  compile(transforms: Transforms): string {
    this.compileErrors = [];
    const name = this.name.compile(transforms);
    mustBeUniqueNameInScope(
      name,
      getGlobalScope(this),
      transforms,
      this.compileErrors,
      this.htmlId,
    );

    return `const ${name} = ${this.value.compile(transforms)};\r
`;
  }

  get symbolId() {
    return this.name.renderAsSource();
  }

  symbolType(transforms?: Transforms) {
    return this.value.symbolType(transforms);
  }

  symbolScope = SymbolScope.program;

  resolveSymbol(id: string | undefined, transforms: Transforms, initialScope: Frame): ElanSymbol {
    if (id === this.symbolId) {
      return this;
    }

    return super.resolveSymbol(id, transforms, initialScope);
  }
}
