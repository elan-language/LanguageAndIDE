import { AbstractFrame } from "../abstract-frame";
import { CodeSource } from "../code-source";
import { mustBeUniqueNameInScope } from "../compile-rules";
import { IdentifierField } from "../fields/identifier-field";
import { ParamList } from "../fields/param-list";
import { TypeField } from "../fields/type-field";
import { singleIndent } from "../frame-helpers";
import { ClassFrame } from "../globals/class-frame";
import { ElanSymbol } from "../interfaces/elan-symbol";
import { Field } from "../interfaces/field";
import { Member } from "../interfaces/member";
import { Parent } from "../interfaces/parent";
import { abstractFunctionKeywords } from "../keywords";
import { FunctionType } from "../symbols/function-type";
import { getClassScope } from "../symbols/symbol-helpers";
import { SymbolScope } from "../symbols/symbol-scope";
import { Transforms } from "../syntax-nodes/transforms";

export class AbstractFunction extends AbstractFrame implements Member, ElanSymbol {
  isAbstract = true;
  isMember: boolean = true;
  private = false;
  public name: IdentifierField;
  public params: ParamList;
  public returnType: TypeField;

  constructor(parent: Parent) {
    super(parent);
    this.name = new IdentifierField(this);
    this.params = new ParamList(this);
    this.returnType = new TypeField(this);
  }

  getClass(): ClassFrame {
    return this.getParent() as ClassFrame;
  }

  initialKeywords(): string {
    return abstractFunctionKeywords;
  }
  getFields(): Field[] {
    return [this.name, this.params, this.returnType];
  }

  getIdPrefix(): string {
    return "func";
  }

  public override indent(): string {
    return singleIndent();
  }

  renderAsHtml(): string {
    return `<el-func class="${this.cls()}" id='${this.htmlId}' tabindex="0">
<el-top><el-kw>abstract function </el-kw><el-method>${this.name.renderAsHtml()}</el-method>(${this.params.renderAsHtml()})<el-kw> return </el-kw>${this.returnType.renderAsHtml()}</el-top>${this.compileMsgAsHtml()}${this.getFrNo()}</el-func>
`;
  }

  public override renderAsSource(): string {
    return `${this.indent()}abstract function ${this.name.renderAsSource()}(${this.params.renderAsSource()}) returns ${this.returnType.renderAsSource()}\r
`;
  }

  public override compile(transforms: Transforms): string {
    this.compileErrors = [];

    const name = this.name.compile(transforms);
    mustBeUniqueNameInScope(name, getClassScope(this), transforms, this.compileErrors, this.htmlId);

    if (name !== "asString") {
      return `${this.indent()}${name}(${this.params.compile(transforms)}) {\r
${this.indent()}${this.indent()}return ${this.returnType.compile(transforms)};\r
${this.indent()}}\r
`;
    }
    return "";
  }

  parseFrom(source: CodeSource): void {
    source.remove("abstract function ");
    this.name.parseFrom(source);
    source.remove("(");
    this.params.parseFrom(source);
    source.remove(") returns ");
    this.returnType.parseFrom(source);
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
    return SymbolScope.member;
  }
}
