import { Field } from "./frame-interfaces/field";
import { Frame } from "./frame-interfaces/frame";
import { Language } from "./frame-interfaces/language";
import { ParseNode } from "./frame-interfaces/parse-node";
import { ConstantGlobal } from "./globals/constant-global";
import { FunctionFrame } from "./globals/function-frame";
import { ProcedureFrame } from "./globals/procedure-frame";
import { BinaryOperation } from "./parse-nodes/binary-operation";
import { ParamDefNode } from "./parse-nodes/param-def-node";
import { PropertyRef } from "./parse-nodes/property-ref";
import { TypeGenericNode } from "./parse-nodes/type-generic-node";
import { CallStatement } from "./statements/call-statement";
import { ConstantStatement } from "./statements/constant-statement";
import { SetStatement } from "./statements/set-statement";
import { VariableStatement } from "./statements/variable-statement";

export abstract class LanguageAbstract implements Language {
  commentRegex(): RegExp {
    return /# [^\r\n]*/;
  }
  languageClass = "python";
  languageFullName: string = "Python";
  defaultFileExtension: string = "py";
  defaultMimeType: string = "text/x-python";

  annotation(frame: Frame): string {
    let annotation = "";
    if (
      frame instanceof VariableStatement ||
      frame instanceof ConstantGlobal ||
      frame instanceof ConstantStatement ||
      frame instanceof FunctionFrame ||
      frame instanceof ProcedureFrame ||
      frame instanceof CallStatement ||
      frame instanceof SetStatement
    ) {
      annotation = frame.frameSpecificAnnotation();
    }
    return annotation;
  }

  abstract renderSingleLineAsHtml(frame: Frame): string;

  abstract renderTopAsHtml(frame: Frame): string;

  abstract renderBottomAsHtml(frame: Frame): string;

  renderNodeAsHtml(node: ParseNode): string {
    let html = "";
    if (node instanceof ParamDefNode) {
      html = this.paramDefAsHtml(node);
    } else if (node instanceof BinaryOperation) {
      html = this.binaryOperationAsHtml(node);
    } else if (node instanceof TypeGenericNode) {
      html = this.typeGenericAsHtml(node);
    } else if (node instanceof PropertyRef) {
      html = this.propertyRefAsHtml(node);
    }
    return html;
  }

  abstract paramDefAsHtml(node: ParamDefNode): string;
  abstract typeGenericAsHtml(node: TypeGenericNode): string;
  abstract propertyRefAsHtml(node: PropertyRef): string;

  parseText(node: ParseNode, text: string): boolean {
    let result = false;
    if (node instanceof ParamDefNode) {
      result = this.parseParamDef(node, text);
    }
    if (node instanceof TypeGenericNode) {
      result = this.parseTypeGeneric(node, text);
    }
    return result;
  }

  abstract parseParamDef(node: ParamDefNode, text: string): boolean;
  abstract parseTypeGeneric(node: TypeGenericNode, text: string): boolean;

  getFields(node: Frame): Field[] {
    return node ? [] : [];
  }

  abstract MOD: string;
  abstract EQUAL: string;
  abstract NOT_EQUAL: string;
  abstract AND: string;
  abstract OR: string;
  abstract NOT: string;

  abstract COMMENT_MARKER: string;

  abstract INT_NAME: string;
  abstract FLOAT_NAME: string;
  abstract BOOL_NAME: string;
  abstract STRING_NAME: string;
  abstract LIST_NAME: string;

  protected spaced(text: string): string {
    return ` ${text} `;
  }

  binaryOperationAsHtml(node: BinaryOperation): string {
    //test for keyword -to add tags
    //test for * or / & otherwise add spaces.
    //return `${open}${text}${close}`;
    return node ? "" : "";
  }
}
