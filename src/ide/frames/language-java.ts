import { Field } from "./frame-interfaces/field";
import { Frame } from "./frame-interfaces/frame";
import { Language } from "./frame-interfaces/language";
import { ConstantGlobal } from "./globals/constant-global";
import { LanguageCfamily } from "./language-c-family";
import { KeywordNode } from "./parse-nodes/keyword-node";
import { LitStringField } from "./parse-nodes/lit-string-field";
import { LitStringInterpolated } from "./parse-nodes/lit-string-interpolated";
import { NewInstance } from "./parse-nodes/new-instance";
import { ParamDefNode } from "./parse-nodes/param-def-node";
import { Space } from "./parse-nodes/parse-node-helpers";
import { PropertyRef } from "./parse-nodes/property-ref";
import { SpaceNode } from "./parse-nodes/space-node";
import { TypeGenericNode } from "./parse-nodes/type-generic-node";
import { TypeTupleNode } from "./parse-nodes/type-tuple-node";
import { ConstantStatement } from "./statements/constant-statement";

export class LanguageJava extends LanguageCfamily {
  static Instance: Language = new LanguageJava();

  languageClass = "java";
  languageFullName: string = "Java";
  defaultFileExtension: string = "java";
  defaultMimeType: string = "text/plain";

  commentRegex(): RegExp {
    return this.common_commentRegex();
  }

  annotation(frame: Frame): string {
    let annotation = this.common_Annotation(frame);
    if (frame instanceof ConstantGlobal || frame instanceof ConstantStatement) {
      annotation = frame.frameSpecificAnnotation();
    }
    return annotation;
  }

  renderSingleLineAsHtml(frame: Frame): string {
    let html = this.common_renderSingleLineAsHtml(frame);
    if (frame instanceof ConstantGlobal) {
      // special case because the </el-top> needs to be placed part way through the line
      html = `<el-kw>${this.FINAL} </el-kw><el-type>${frame.value.getElanType()} </el-type>${frame.name.renderAsHtml()}</el-top><el-punc> = </el-punc>${frame.value.renderAsHtml()}`;
    } else if (frame instanceof ConstantStatement) {
      html = `<el-kw>${this.FINAL} </el-kw><el-type>${frame.expr.getElanType()} </el-type>${frame.name.renderAsHtml()}<el-punc> = </el-punc>${frame.expr.renderAsHtml()}<el-punc>;</el-punc>`;
    }
    return html;
  }

  renderTopAsHtml(frame: Frame): string {
    return this.common_renderTopAsHtml(frame);
  }

  renderBottomAsHtml(frame: Frame): string {
    return this.common_renderBottomAsHtml(frame);
  }

  getFields(frame: Frame): Field[] {
    return this.common_getFields(frame);
  }

  public FINAL = "final";

  public STRING_NAME: string = "String";

  INTERPOLATED_STRING_PREFIX: string = ""; // Indicates that interpolated string is not recognised by Java

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
  typeGenericAsHtml(node: TypeGenericNode): string {
    return this.c_langs_typeGenericAsHtml(node);
  }

  propertyRefAsHtml(node: PropertyRef): string {
    return this.c_langs_propertyRefAsHtml(node);
  }

  litStringInterpolatedAsHtml(node: LitStringInterpolated) {
    return `"<el-lit>${node.segments!.renderAsHtml()}</el-lit>"`; //i.e. without any prefix
  }

  litStringFieldAsHtml(_node: LitStringField) {
    return `" + (${_node.expr?.renderAsExport()}).asString() + "`; // i.e. it turns an interpolated string into a sequence of appended strings
  }

  addNodesForNewInstance(node: NewInstance): void {
    node.addElement(new KeywordNode(node.file, this.NEW));
    node.addElement(new SpaceNode(node.file, Space.required));
    this.addCommonElementsForNewInstance(node);
  }

  newInstanceAsHtml(node: NewInstance): string {
    return this.c_langs_newInstanceAsHtml(node);
  }

  addNodesForTypeTuple(node: TypeTupleNode): void {
    this.addCommonElementsForTypeTuple(node);
  }

  typeTupleAsHtml(node: TypeTupleNode): string {
    return this.default_typeTupleAsHtml(node);
  }

  reservedWords: Set<string> = new Set<string>([
    `abstract`,
    `continue`,
    `for`,
    `new`,
    `switch`,
    `assert`,
    `default`,
    `goto`,
    `package`,
    `synchronized`,
    `boolean`,
    `do`,
    `if`,
    `private`,
    `this`,
    `break`,
    `double`,
    `implements`,
    `protected`,
    `throw`,
    `byte`,
    `else`,
    `import`,
    `public`,
    `throws`,
    `case`,
    `enum`,
    `instanceof`,
    `return`,
    `transient`,
    `catch`,
    `extends`,
    `int`,
    `short`,
    `try`,
    `char`,
    `final`,
    `interface`,
    `static`,
    `void`,
    `class`,
    `finally`,
    `long`,
    `strictfp`,
    `volatile`,
    `const`,
    `float`,
    `native`,
    `super`,
    `while`,
  ]);
}
