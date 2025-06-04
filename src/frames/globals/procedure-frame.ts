import { mustBeUniqueNameInScope } from "../compile-rules";
import { MethodNameField } from "../fields/method-name-field";
import { ParamListField } from "../fields/param-list-field";
import { FrameWithStatements } from "../frame-with-statements";
import { CodeSource } from "../interfaces/code-source";
import { ElanSymbol } from "../interfaces/elan-symbol";
import { Field } from "../interfaces/field";
import { File } from "../interfaces/file";
import { Parent } from "../interfaces/parent";
import { Scope } from "../interfaces/scope";
import { Transforms } from "../interfaces/transforms";
import { procedureKeyword } from "../keywords";
import { ProcedureType } from "../symbols/procedure-type";
import { getGlobalScope } from "../symbols/symbol-helpers";
import { SymbolScope } from "../symbols/symbol-scope";
import { UnknownSymbol } from "../symbols/unknown-symbol";

export abstract class ProcedureFrame extends FrameWithStatements implements ElanSymbol, Scope {
  public name: MethodNameField;
  public params: ParamListField;
  file: File;

  constructor(parent: Parent) {
    super(parent);
    this.file = parent as File;
    this.name = new MethodNameField(this);
    this.params = new ParamListField(this);
  }

  isProcedure = true;

  initialKeywords(): string {
    return procedureKeyword;
  }
  get symbolId() {
    return this.name.text;
  }

  abstract get symbolScope(): SymbolScope;

  symbolType(transforms?: Transforms) {
    const [pn, pt] = this.params.symbolNamesAndTypes(transforms);
    return new ProcedureType(pn, pt, false, true);
  }

  getFields(): Field[] {
    return [this.name, this.params];
  }

  getIdPrefix(): string {
    return "proc";
  }
  public renderAsHtml(): string {
    return `<el-proc class="${this.cls()}" id='${this.htmlId}' tabindex="0" ${this.toolTip()}>
<el-top>${this.contextMenu()}${this.bpAsHtml()}<el-expand>+</el-expand><el-kw>procedure </el-kw><el-method>${this.name.renderAsHtml()}</el-method>(${this.params.renderAsHtml()})${this.helpAsHtml()}${this.compileMsgAsHtml()}${this.getFrNo()}</el-top>
${this.renderChildrenAsHtml()}
<el-kw>end procedure</el-kw>
</el-proc>`;
  }

  parseTop(source: CodeSource): void {
    source.remove("procedure ");
    this.name.parseFrom(source);
    source.remove("(");
    this.params.parseFrom(source);
    source.remove(")");
  }
  parseBottom(source: CodeSource): boolean {
    return this.parseStandardEnding(source, "end procedure");
  }

  resolveSymbol(id: string, transforms: Transforms, initialScope: Scope): ElanSymbol {
    if (this.name.text === id) {
      return this;
    }
    const s = this.params.resolveSymbol(id, transforms, initialScope);

    return s instanceof UnknownSymbol ? super.resolveSymbol(id, transforms, initialScope) : s;
  }

  public compile(transforms: Transforms): string {
    const name = this.name.compile(transforms);
    mustBeUniqueNameInScope(
      name,
      getGlobalScope(this),
      transforms,
      this.compileErrors,
      this.htmlId,
    );

    return `${name}(${this.params.compile(transforms)}) {\r
${this.breakPoint(this.debugSymbols())}${this.compileChildren(transforms)}\r`;
  }

  public override symbolMatches(id: string, all: boolean, initialScope: Scope): ElanSymbol[] {
    const matches = super.symbolMatches(id, all, initialScope);
    const localMatches = this.params.symbolMatches(id, all, initialScope);
    return localMatches.concat(matches);
  }
}
