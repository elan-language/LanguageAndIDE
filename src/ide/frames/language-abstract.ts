import { Field } from "./frame-interfaces/field";
import { Frame } from "./frame-interfaces/frame";
import { Language } from "./frame-interfaces/language";
import { ParseNode } from "./frame-interfaces/parse-node";
import { ConstantGlobal } from "./globals/constant-global";
import { FunctionFrame } from "./globals/function-frame";
import { ProcedureFrame } from "./globals/procedure-frame";
import { BinaryOperation } from "./parse-nodes/binary-operation";
import { IndexDouble } from "./parse-nodes/index-double";
import { InheritanceNode } from "./parse-nodes/inheritanceNode";
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
      html = this.paramDefNodeAsHtml(node);
    } else  if (node instanceof BinaryOperation) {
      html = this.binaryOperationAsHtml(node);
    } else  if (node instanceof TypeGenericNode) {
      html = this.typeGenericNodeAsHtml(node);
    } else  if (node instanceof PropertyRef) {
      html = this.propertyRefAsHtml(node);
    } 
    return html;
  }

  abstract paramDefNodeAsHtml(node: ParamDefNode): string;
  abstract binaryOperationAsHtml(node: BinaryOperation): string;
  abstract typeGenericNodeAsHtml(node: TypeGenericNode): string;
  abstract propertyRefAsHtml(node: PropertyRef): string;

  parseText(node: ParseNode, text: string): boolean {
    let result = false;
    if (node instanceof ParamDefNode) {
      result = this.parseParamDefNode(node, text);
    }
    return result;
  }

  abstract parseParamDefNode(node: ParamDefNode, text: string): boolean;

  getFields(node: Frame): Field[] {
    return node ? [] : [];
  }

  abstract POWER: string;
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
}
