import { AbstractFrame } from "../abstract-frame";
import { IdentifierField } from "../fields/identifier-field";
import { ParamListField } from "../fields/param-list-field";
import { TypeField } from "../fields/type-field";
import { singleIndent } from "../frame-helpers";
import { ConcreteClass } from "../globals/concrete-class";
import { CodeSource } from "../interfaces/code-source";
import { ElanSymbol } from "../interfaces/elan-symbol";
import { Field } from "../interfaces/field";
import { Member } from "../interfaces/member";
import { Parent } from "../interfaces/parent";
import { Transforms } from "../interfaces/transforms";
import {
  abstractFunctionKeywords,
  abstractKeyword,
  functionKeyword,
  returnsKeyword,
} from "../keywords";
import { FunctionType } from "../symbols/function-type";
import { SymbolScope } from "../symbols/symbol-scope";

export class AbstractFunction extends AbstractFrame implements Member, ElanSymbol {
  isAbstract = true;
  isMember: boolean = true;
  private = false;
  public name: IdentifierField;
  public params: ParamListField;
  public returnType: TypeField;
  hrefForFrameHelp: string = "LangRef.html#Abstract_function";

  constructor(parent: Parent) {
    super(parent);
    this.name = new IdentifierField(this);
    this.params = new ParamListField(this);
    this.returnType = new TypeField(this);
  }

  getClass(): ConcreteClass {
    return this.getParent() as ConcreteClass;
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
    return `<el-func class="${this.cls()}" id='${this.htmlId}' tabindex="0" ${this.toolTip()}>
<el-top>${this.bpAsHtml()}<el-kw>${abstractKeyword} ${functionKeyword} </el-kw><el-method>${this.name.renderAsHtml()}</el-method>(${this.params.renderAsHtml()})<el-kw> ${returnsKeyword} </el-kw>${this.returnType.renderAsHtml()}${this.helpAsHtml()}</el-top>${this.compileMsgAsHtml()}${this.getFrNo()}</el-func>
`;
  }

  public override renderAsSource(): string {
    return `${this.indent()}${abstractKeyword} ${functionKeyword} ${this.name.renderAsSource()}(${this.params.renderAsSource()}) ${returnsKeyword} ${this.returnType.renderAsSource()}\r
`;
  }

  parseFrom(source: CodeSource): void {
    source.remove(`${abstractKeyword} ${functionKeyword} `);
    this.name.parseFrom(source);
    source.remove("(");
    this.params.parseFrom(source);
    source.remove(`) ${returnsKeyword} `);
    this.returnType.parseFrom(source);
  }

  get symbolId() {
    return this.name.text;
  }

  symbolType(transforms?: Transforms) {
    const [pn, pt] = this.params.symbolNamesAndTypes();
    const rt = this.returnType.symbolType(transforms);
    return new FunctionType(pn, pt, rt, false, true, true);
  }

  get symbolScope() {
    return SymbolScope.member;
  }
}
