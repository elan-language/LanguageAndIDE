import { Field } from "./frame-interfaces/field";
import { Frame } from "./frame-interfaces/frame";
import { Language } from "./frame-interfaces/language";
import { ConstantGlobal } from "./globals/constant-global";
import { LanguageCfamily } from "./language-c-family";
import { ParamDefNode } from "./parse-nodes/param-def-node";
import { PropertyRef } from "./parse-nodes/property-ref";
import { TypeGenericNode } from "./parse-nodes/type-generic-node";
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
    let html = this.common_renderSingleLineAsHtml(frame);
    if (frame instanceof ConstantGlobal) {
      // special case because the </el-top> needs to be placed part way through the line
      html = `<el-kw>${this.CONST} </el-kw><el-type>${frame.value.getElanType()} </el-type>${frame.name.renderAsHtml()}</el-top><el-punc> = </el-punc>${frame.value.renderAsHtml()}`;
    } else if (frame instanceof ConstantStatement) {
      html = `<el-kw>${this.CONST} </el-kw><el-type>${frame.expr.getElanType()} </el-type>${frame.name.renderAsHtml()}<el-punc> = </el-punc>${frame.expr.renderAsHtml()}<el-punc>;</el-punc>`;
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

  parseParamDef(node: ParamDefNode, text: string): boolean {
    return this.common_parseParamDef(node, text);
  }
  paramDefAsHtml(node: ParamDefNode): string {
    return this.common_paramDefAsHtml(node);
  }

  paramDefCompletion(node: ParamDefNode): string {
    return this.common_paramDefCompletion(node);
  }

  parseTypeGeneric(node: TypeGenericNode, text: string): boolean {
    return this.common_parseTypeGeneric(node, text);
  }
  typeGenericAsHtml(node: TypeGenericNode): string {
    return this.common_typeGenericAsHtml(node);
  }

  propertyRefAsHtml(node: PropertyRef): string {
    return this.common_propertyRefAsHtml(node);
  }
}
