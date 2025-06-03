import { AbstractFrame } from "../abstract-frame";

import { mustBeUniqueNameInScope } from "../compile-rules";
import { ConstantValueField } from "../fields/constant-value-field";
import { IdentifierField } from "../fields/identifier-field";
import { CodeSource } from "../interfaces/code-source";
import { Collapsible } from "../interfaces/collapsible";
import { ElanSymbol } from "../interfaces/elan-symbol";
import { Field } from "../interfaces/field";
import { File } from "../interfaces/file";
import { GlobalFrame } from "../interfaces/global-frame";
import { Scope } from "../interfaces/scope";
import { Transforms } from "../interfaces/transforms";
import { constantKeyword } from "../keywords";
import { getGlobalScope } from "../symbols/symbol-helpers";
import { SymbolScope } from "../symbols/symbol-scope";

export class Constant extends AbstractFrame implements ElanSymbol, GlobalFrame, Collapsible {
  isCollapsible: boolean = true;
  isGlobal = true;
  name: IdentifierField;
  value: ConstantValueField;
  file: File;
  isConstant = true;
  hrefForFrameHelp: string = "LangRef.html#constant";

  constructor(parent: File) {
    super(parent);
    this.file = parent;
    this.name = new IdentifierField(this);
    this.value = new ConstantValueField(this);
    this.value.setPlaceholder("<i>literal value or data structure</i>");
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
    return `<el-const class="${this.cls()}" id='${this.htmlId}' tabindex="0" ${this.toolTip()}><el-top>${this.bpAsHtml()}<el-expand>+</el-expand><el-kw>constant </el-kw>${this.helpAsHtml()}${this.name.renderAsHtml()}</el-top><el-kw> set to </el-kw>${this.value.renderAsHtml()}${this.compileMsgAsHtml()}${this.getFrNo()}</el-const>`;
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

  resolveSymbol(id: string, transforms: Transforms, initialScope: Scope): ElanSymbol {
    if (id === this.symbolId) {
      return this;
    }

    return super.resolveSymbol(id, transforms, initialScope);
  }
}
