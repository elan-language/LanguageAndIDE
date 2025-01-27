import { CodeSource } from "../code-source";
import { MethodNameField } from "../fields/method-name-field";
import { ParamList } from "../fields/param-list";
import { TypeField } from "../fields/type-field";
import { FrameWithStatements } from "../frame-with-statements";
import { ElanSymbol } from "../interfaces/elan-symbol";
import { Field } from "../interfaces/field";
import { File } from "../interfaces/file";
import { Frame } from "../interfaces/frame";
import { Parent } from "../interfaces/parent";
import { Profile } from "../interfaces/profile";
import { endKeyword, functionKeyword, returnKeyword, returnsKeyword } from "../keywords";
import { ReturnStatement } from "../statements/return-statement";
import { FunctionType } from "../symbols/function-type";
import { allScopedSymbols } from "../symbols/symbol-helpers";
import { SymbolScope } from "../symbols/symbol-scope";
import { UnknownSymbol } from "../symbols/unknown-symbol";
import { Transforms } from "../syntax-nodes/transforms";

export abstract class FunctionFrame extends FrameWithStatements implements Parent, ElanSymbol {
  public name: MethodNameField;
  public params: ParamList;
  public returnType: TypeField;
  file: File;
  isFunction = true;

  constructor(parent: Parent) {
    super(parent);
    this.file = parent as File;
    this.name = new MethodNameField(this);
    this.params = new ParamList(this);
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
    return new FunctionType(pn, pt, rt, false);
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
    return `<el-func class="${this.cls()}" id='${this.htmlId}' tabindex="0">
<el-top><el-expand>+</el-expand><el-kw>${functionKeyword} </el-kw><el-method>${this.name.renderAsHtml()}</el-method>(${this.params.renderAsHtml()})<el-kw> ${returnsKeyword} </el-kw>${this.returnType.renderAsHtml()}${this.compileMsgAsHtml()}${this.getFrNo()}</el-top>
${this.renderChildrenAsHtml()}
<el-kw>${endKeyword} ${functionKeyword}</el-kw>${this.contextMenu()}
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
    return this.getChildren().filter((s) => "isReturnStatement" in s)[0] as ReturnStatement;
  }

  resolveSymbol(id: string | undefined, transforms: Transforms, initialScope: Frame): ElanSymbol {
    if (this.name.text === id) {
      return this;
    }

    const s = this.params.resolveSymbol(id, transforms, initialScope);

    return s instanceof UnknownSymbol ? super.resolveSymbol(id, transforms, initialScope) : s;
  }

  public compile(transforms: Transforms): string {
    const symbols = () => allScopedSymbols(this.getParent(), this);

    return `${this.name.compile(transforms)}(${this.params.compile(transforms)}) {\r
${this.breakPoint(symbols)}${this.compileStatements(transforms)}\r`;
  }

  public override symbolMatches(id: string, all: boolean, initialScope?: Frame): ElanSymbol[] {
    const matches = super.symbolMatches(id, all, initialScope);
    const localMatches = this.params.symbolMatches(id, all, initialScope);
    return localMatches.concat(matches);
  }
}
