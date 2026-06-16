import { AbstractProperty } from "./class-members/abstract-property";
import { Property } from "./class-members/property";
import { EnumValuesField } from "./fields/enum-values-field";
import { InheritsFromField } from "./fields/inherits-from-field";
import { FileImpl } from "./file-impl";
import { Field } from "./frame-interfaces/field";
import { Frame } from "./frame-interfaces/frame";
import { Language } from "./frame-interfaces/language";
import { ClassFrame } from "./globals/class-frame";
import { ConstantGlobal } from "./globals/constant-global";
import { FunctionFrame } from "./globals/function-frame";
import { TestFrame } from "./globals/test-frame";
import { LanguageCfamily } from "./language-c-family";
import { CSV } from "./parse-nodes/csv";
import { ExprNode } from "./parse-nodes/expr-node";
import { KeywordNode } from "./parse-nodes/keyword-node";
import { Lambda } from "./parse-nodes/lambda";
import { ListNode } from "./parse-nodes/list-node";
import { LitStringInterpolated } from "./parse-nodes/lit-string-interpolated";
import { NewInstance } from "./parse-nodes/new-instance";
import { ParamDefNode } from "./parse-nodes/param-def-node";
import { Space } from "./parse-nodes/parse-node-helpers";
import { PunctuationNode } from "./parse-nodes/punctuation-node";
import { SpaceNode } from "./parse-nodes/space-node";
import { TypeGenericNode } from "./parse-nodes/type-generic-node";
import { TypeTupleNode } from "./parse-nodes/type-tuple-node";
import { AssertStatement } from "./statements/assert-statement";
import { InputStatement } from "./statements/input-statement";
import { PrintStatement } from "./statements/print-statement";
import { ARROW, CLOSE_SQ_BRACKET, OPEN_SQ_BRACKET } from "./symbols";

export class LanguageCS extends LanguageCfamily {
  private constructor() {
    super();
  }

  static Instance: Language = new LanguageCS();

  languageHtmlClass = "cs";
  languageFullName: string = "C#";
  defaultFileExtension: string = "cs";
  defaultMimeType: string = "text/plain";

  annotation(frame: Frame): string {
    let annotation = "";
    if (frame instanceof Property) {
      annotation = frame.frameSpecificAnnotation();
    } else {
      annotation = this.common_Annotation(frame);
    }
    return annotation;
  }

  renderSingleLineAsHtml(frame: Frame): string {
    let html = "";
    if (frame instanceof AssertStatement) {
      html = `<el-type>Assert</el-type>.<el-method>AreEqual</el-method>(${frame.expected.renderAsHtml()}, ${frame.actual.renderAsHtml()});`;
    } else if (frame instanceof ConstantGlobal) {
      // special case because the </el-top> needs to be placed part way through the line
      html = `<el-kw>${this.CONST} </el-kw><el-type>${frame.value.getElanType()} </el-type>${frame.name.renderAsHtml()}</el-top> = ${frame.value.renderAsHtml()};`;
    } else if (frame instanceof InputStatement) {
      html = `<el-type>Console</el-type>.<el-method>WriteLine</el-method>(${frame.prompt.renderAsHtml()});<br>
      <el-kw>${this.VAR}</el-kw> ${frame.name.renderAsHtml()}<el-kw> = <el-type>Console</el-type>.<el-method>ReadLine</el-method>();`;
    } else if (frame instanceof PrintStatement) {
      html = `<el-type>Console</el-type>.<el-method>WriteLine(${frame.args.renderAsHtml()});`;
    } else if (frame instanceof Property) {
      html = `${this.modifierAsHtml(frame)}${frame.type.renderAsHtml()} ${frame.name.renderAsHtml()} {<el-kw>${this.GET}</el-kw>; <el-kw>${this.PRIVATE} ${this.SET}</el-kw>;}`;
    } else if (frame instanceof AbstractProperty) {
      html = `<el-kw>${this.ABSTRACT}</el-kw> ${frame.type.renderAsHtml()} ${frame.name.renderAsHtml()} {<el-kw>${this.GET}</el-kw>; <el-kw>${this.PRIVATE} ${this.SET}</el-kw>;}`;
    } else {
      html = this.common_renderSingleLineAsHtml(frame);
    }
    return html;
  }

  OVERRIDES = "override";
  IMPLEMENTS = "";
  INTERPOLATED_STRING_PREFIX: string = "$";

  renderTopAsHtml(frame: Frame): string {
    let html = "";
    if (frame instanceof TestFrame) {
      html = `[<el-type>TestMethod</el-type>] <el-kw>${this.STATIC} ${this.VOID} </el-kw>${frame.testName.renderAsHtml()}() {`;
    } else {
      html = this.common_renderTopAsHtml(frame);
    }
    return html;
  }

  inheritsFromTextAsHtml(field: InheritsFromField): string {
    const frame = field.getHolder() as ClassFrame;
    return frame.doesInherit() ? `: ${field.default_renderasHtml()}` : ``;
  }

  renderBottomAsHtml(frame: Frame): string {
    return this.common_renderBottomAsHtml(frame);
  }

  renderFileImportsAsHtml(): string {
    return "";
  }
  renderSpecificHeaderAsHtml(_f: FileImpl): string {
    return "";
  }
  renderFileTrailerAsHtml(_f: FileImpl): string {
    return "";
  }

  translateExpression(expr: string): string {
    return expr;
  }

  addNodesForParamDef(node: ParamDefNode): void {
    this.c_langs_addNodesForParamDef(node);
  }
  paramDefAsHtml(node: ParamDefNode): string {
    return this.c_langs_paramDefAsHtml(node);
  }

  addNodesForTypeGeneric(node: TypeGenericNode): void {
    this.c_langs_addNodesForTypeGeneric(node);
  }

  addNodesForTypeTuple(node: TypeTupleNode): void {
    this.addCommonElementsForTypeTuple(node);
  }

  typeGenericAsHtml(node: TypeGenericNode): string {
    return this.c_langs_typeGenericAsHtml(node);
  }

  addNodesForNewInstance(node: NewInstance): void {
    node.addElement(new KeywordNode(node.file, this.NEW_INSTANCE_PREFIX));
    node.addElement(new SpaceNode(node.file, Space.required));
    this.addCommonElementsForNewInstance(node);
  }

  addNodesForLambda(node: Lambda): void {
    node.params = new CSV(node.file, () => new ParamDefNode(node.file), 0);
    node.addElement(node.params);
    node.addElement(new SpaceNode(node.file, Space.added));
    node.addElement(new PunctuationNode(node.file, ARROW));
    node.addElement(new SpaceNode(node.file, Space.added));
    node.expr = new ExprNode(node.file);
    node.addElement(node.expr);
  }

  addNodesForList(node: ListNode): void {
    node.addElement(new KeywordNode(node.file, this.NEW_INSTANCE_PREFIX));
    node.addElement(new SpaceNode(node.file, Space.required));
    node.addElement(new PunctuationNode(node.file, OPEN_SQ_BRACKET));
    node.addElement(new PunctuationNode(node.file, CLOSE_SQ_BRACKET));
    node.addElement(new SpaceNode(node.file, Space.added));
    this.default_addNodesForList(node);
  }

  listAsHtml(node: ListNode): string {
    return `<el-kw>${this.NEW_INSTANCE_PREFIX}</el-kw> [] ${this.default_listAsHtml(node)}`;
  }

  lambdaAsHtml(node: Lambda): string {
    return `${node.params!.renderAsHtml()} ${ARROW} ${node.expr!.renderAsHtml()}`;
  }

  newInstanceAsHtml(node: NewInstance): string {
    return this.c_langs_newInstanceAsHtml(node);
  }

  litStringInterpolatedAsHtml(node: LitStringInterpolated): string {
    return this.default_litStringInterpolatedAsHtml(node);
  }
  standardiseInterpolatedString(node: LitStringInterpolated, text: string): string {
    return this.default_standardiseInterpolatedString(node, text);
  }

  typeTupleAsHtml(node: TypeTupleNode): string {
    return this.default_typeTupleAsHtml(node);
  }

  override enumValuesListAsHtml(field: EnumValuesField): string {
    return this.c_langs_enumValues(field);
  }

  functionFrameFields(frame: FunctionFrame): Field[] {
    return this.common_functionFrameFields(frame);
  }

  assertStatementFields(frame: AssertStatement): Field[] {
    return this.common_assertStatementFields(frame);
  }

  private GET: string = "get";
  private SET: string = "set";

  reservedWords: Set<string> = new Set<string>([
    `abstract`,
    `as`,
    `base`,
    `bool`,
    `break`,
    `byte`,
    `case`,
    `catch`,
    `char`,
    `checked`,
    `class`,
    `const`,
    `continue`,
    `decimal`,
    `default`,
    `delegate`,
    `do`,
    `double`,
    `else`,
    `enum`,
    `event`,
    `explicit`,
    `extern`,
    `false`,
    `finally`,
    `fixed`,
    `float`,
    `for`,
    `foreach`,
    `get`,
    `goto`,
    `if`,
    `implicit`,
    `in`,
    `int`,
    `interface`,
    `internal`,
    `is`,
    `lock`,
    `long`,
    `namespace`,
    `new`,
    `null`,
    `object`,
    `operator`,
    `out`,
    `override`,
    `params`,
    `private`,
    `protected`,
    `public`,
    `readonly`,
    `ref`,
    `return`,
    `sbyte`,
    `sealed`,
    `set`,
    `short`,
    `sizeof`,
    `stackalloc`,
    `static`,
    `string`,
    `struct`,
    `switch`,
    `this`,
    `throw`,
    `true`,
    `try`,
    `typeof`,
    `uint`,
    `ulong`,
    `unchecked`,
    `unsafe`,
    `ushort`,
    `using`,
    `virtual`,
    `void`,
    `volatile`,
    `while`,
  ]);
}
