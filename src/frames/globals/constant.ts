import { AbstractFrame } from "../abstract-frame";
import { CodeSource } from "../code-source";
import { mustBeUniqueNameInScope } from "../compile-rules";
import { ConstantValueField } from "../fields/constant-value-field";
import { IdentifierField } from "../fields/identifier-field";
import { Collapsible } from "../interfaces/collapsible";
import { ElanSymbol } from "../interfaces/elan-symbol";
import { Field } from "../interfaces/field";
import { File } from "../interfaces/file";
import { Frame } from "../interfaces/frame";
import { GlobalFrame } from "../interfaces/global-frame";
import { constantKeyword } from "../keywords";
import { getGlobalScope } from "../symbols/symbol-helpers";
import { SymbolScope } from "../symbols/symbol-scope";
import { Transforms } from "../syntax-nodes/transforms";

export class Constant extends AbstractFrame implements ElanSymbol, GlobalFrame, Collapsible {
  isCollapsible: boolean = true;
  isGlobal = true;
  name: IdentifierField;
  value: ConstantValueField;
  file: File;
  isConstant = true;

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
    return `<el-const class="${this.cls()}" id='${this.htmlId}' tabindex="0"><el-top><el-expand>+</el-expand><el-kw>constant </el-kw>${this.name.renderAsHtml()}</el-top><el-kw> set to </el-kw>${this.value.renderAsHtml()}${this.compileMsgAsHtml()}${this.getFrNo()}</el-const>`;
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

    return `${name} = ${this.value.compile(transforms)};\r
`;
  }

  get symbolId() {
    return this.name.renderAsSource();
  }

  symbolType(transforms?: Transforms) {
    return this.value.symbolType(transforms);
  }

  get symbolScope() {
    return SymbolScope.program;
  }

  resolveSymbol(id: string | undefined, transforms: Transforms, initialScope: Frame): ElanSymbol {
    if (id === this.symbolId) {
      return this;
    }

    return super.resolveSymbol(id, transforms, initialScope);
  }
}
