import { Field } from "./frame-interfaces/field";
import { Frame } from "./frame-interfaces/frame";
import { Language } from "./frame-interfaces/language";
import { ConstantGlobal } from "./globals/constant-global";
import { TestFrame } from "./globals/test-frame";
import { LanguageCfamily } from "./language-c-family";
import { KeywordNode } from "./parse-nodes/keyword-node";
import { LitStringInterpolated } from "./parse-nodes/lit-string-interpolated";
import { NewInstance } from "./parse-nodes/new-instance";
import { ParamDefNode } from "./parse-nodes/param-def-node";
import { Space } from "./parse-nodes/parse-node-helpers";
import { PropertyRef } from "./parse-nodes/property-ref";
import { SpaceNode } from "./parse-nodes/space-node";
import { TypeGenericNode } from "./parse-nodes/type-generic-node";
import { TypeTupleNode } from "./parse-nodes/type-tuple-node";
import { AssertStatement } from "./statements/assert-statement";
import { ConstantStatement } from "./statements/constant-statement";

export class LanguageCS extends LanguageCfamily {
  private constructor() {
    super();
  }

  static Instance: Language = new LanguageCS();

  languageClass = "cs";
  languageFullName: string = "C#";
  defaultFileExtension: string = "cs";
  defaultMimeType: string = "text/plain";

  annotation(frame: Frame): string {
    return this.common_Annotation(frame);
  }

  renderSingleLineAsHtml(frame: Frame): string {
    let html = "";
    if (frame instanceof AssertStatement) {
      html = `<el-type>Assert</el-type>.<el-method>AreEqual</el-method>(${frame.expected.renderAsHtml()}, ${frame.actual.renderAsHtml()}`;
    } else if (frame instanceof ConstantGlobal) {
      // special case because the </el-top> needs to be placed part way through the line
      html = `<el-kw>${this.CONST} </el-kw><el-type>${frame.value.getElanType()} </el-type>${frame.name.renderAsHtml()}</el-top><el-punc> = </el-punc>${frame.value.renderAsHtml()}`;
    } else if (frame instanceof ConstantStatement) {
      html = `<el-kw>${this.CONST} </el-kw><el-type>${frame.expr.getElanType()} </el-type>${frame.name.renderAsHtml()}<el-punc> = </el-punc>${frame.expr.renderAsHtml()}<el-punc>;</el-punc>`;
    } else {
      html = this.common_renderSingleLineAsHtml(frame);
    }
    return html;
  }

  INTERPOLATED_STRING_PREFIX: string = "$";

  renderTopAsHtml(frame: Frame): string {
    let html = "";
    if (frame instanceof TestFrame) {
      html = `[<el-type>TestMethod</el-type>] <el-kw>${this.STATIC} ${this.VOID} </el-kw>${frame.testName.renderAsHtml()}<el-punc>() {</el-punc>`;
    } else {
      html = this.common_renderTopAsHtml(frame);
    }
    return html;
  }

  renderBottomAsHtml(frame: Frame): string {
    return this.common_renderBottomAsHtml(frame);
  }

  getFields(frame: Frame): Field[] {
    return this.common_getFields(frame);
  }

  addNodesForParamDef(node: ParamDefNode): void {
    this.c_langs_addNodesForParamDef(node);
  }
  paramDefAsHtml(node: ParamDefNode): string {
    return this.c_langs_paramDefAsHtml(node);
  }

  paramDefCompletion(node: ParamDefNode): string {
    return this.c_langs_paramDefCompletion(node);
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

  propertyRefAsHtml(node: PropertyRef): string {
    return this.c_langs_propertyRefAsHtml(node);
  }

  addNodesForNewInstance(node: NewInstance): void {
    node.addElement(new KeywordNode(node.file, this.NEW));
    node.addElement(new SpaceNode(node.file, Space.required));
    this.addCommonElementsForNewInstance(node);
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
    ``,
    `event`,
    `explicit`,
    `extern`,
    `false`,
    `finally`,
    `fixed`,
    `float`,
    `for`,
    `foreach`,
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
    ``,
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
