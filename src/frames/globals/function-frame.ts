import { MethodNameField } from "../fields/method-name-field";
import { ParamListField } from "../fields/param-list-field";
import { TypeField } from "../fields/type-field";
import { isReturnStatement } from "../frame-helpers";
import { FrameWithStatements } from "../frame-with-statements";
import { CodeSource } from "../interfaces/code-source";
import { ElanSymbol } from "../interfaces/elan-symbol";
import { Field } from "../interfaces/field";
import { File } from "../interfaces/file";
import { Parent } from "../interfaces/parent";
import { Profile } from "../interfaces/profile";
import { Scope } from "../interfaces/scope";
import { Transforms } from "../interfaces/transforms";
import { endKeyword, functionKeyword, returnKeyword, returnsKeyword } from "../keywords";
import { ReturnStatement } from "../statements/return-statement";
import { FunctionType } from "../symbols/function-type";
import { SymbolScope } from "../symbols/symbol-scope";
import { UnknownSymbol } from "../symbols/unknown-symbol";

export abstract class FunctionFrame extends FrameWithStatements implements Parent, ElanSymbol {
  public name: MethodNameField;
  public params: ParamListField;
  public returnType: TypeField;
  file: File;
  isFunction = true;

  constructor(parent: Parent) {
    super(parent);
    this.file = parent as File;
    this.name = new MethodNameField(this);
    this.params = new ParamListField(this);
    this.returnType = new TypeField(this);
    this.getChildren().push(new ReturnStatement(this));
  }
  initialKeywords(): string {
    return functionKeyword;
  }
  get symbolId() {
    return this.name.text;
  }

  symbolType(transforms?: Transforms) {
    const [pn, pt] = this.params.symbolNamesAndTypes(transforms);
    const rt = this.returnType.symbolType(transforms);
    return new FunctionType(pn, pt, rt, false, true, true);
  }

  get symbolScope() {
    return SymbolScope.program;
  }

  getProfile(): Profile {
    return this.getFile().getProfile();
  }

  minimumNumberOfChildrenExceeded(): boolean {
    return this.getChildren().length > 1; // return may be the only statement
  }

  getFields(): Field[] {
    return [this.name, this.params, this.returnType];
  }

  getIdPrefix(): string {
    return "func";
  }
  public renderAsHtml(): string {
    return `<el-func class="${this.cls()}" id='${this.htmlId}' tabindex="0" ${this.toolTip()}>
<el-top>${this.contextMenu()}${this.bpAsHtml()}<el-expand>+</el-expand><el-kw>${functionKeyword} </el-kw><el-method>${this.name.renderAsHtml()}</el-method>(${this.params.renderAsHtml()})<el-kw> ${returnsKeyword} </el-kw>${this.returnType.renderAsHtml()}${this.compileMsgAsHtml()}${this.getFrNo()}</el-top>
${this.renderChildrenAsHtml()}
<el-kw>${endKeyword} ${functionKeyword}</el-kw>
</el-func>`;
  }

  parseTop(source: CodeSource): void {
    source.remove(`${functionKeyword} `);
    this.name.parseFrom(source);
    source.remove("(");
    this.params.parseFrom(source);
    source.remove(`) ${returnsKeyword} `);
    this.returnType.parseFrom(source);
  }
  parseBottom(source: CodeSource): boolean {
    let result = false;
    const keyword = `${returnKeyword} `;
    source.removeIndent();
    if (source.isMatch(keyword)) {
      this.getReturnStatement().parseFrom(source);
      source.removeNewLine().removeIndent();
      this.parseStandardEnding(source, `${endKeyword} ${functionKeyword}`);
      result = true;
    }
    return result;
  }
  protected getReturnStatement(): ReturnStatement {
    return this.getChildren().filter((s) => isReturnStatement(s))[0];
  }

  resolveSymbol(id: string, transforms: Transforms, initialScope: Scope): ElanSymbol {
    if (this.name.text === id) {
      return this;
    }

    const s = this.params.resolveSymbol(id, transforms, initialScope);

    return s instanceof UnknownSymbol ? super.resolveSymbol(id, transforms, initialScope) : s;
  }

  public compile(transforms: Transforms): string {
    return `${this.name.compile(transforms)}(${this.params.compile(transforms)}) {\r
${this.breakPoint(this.debugSymbols())}${this.compileChildren(transforms)}\r`;
  }

  public override symbolMatches(id: string, all: boolean, initialScope: Scope): ElanSymbol[] {
    const matches = super.symbolMatches(id, all, initialScope);
    const localMatches = this.params.symbolMatches(id, all, initialScope);
    return localMatches.concat(matches);
  }
}
