import { implementsAbstractMethodOnClassOrInterface } from "../../compiler/symbols/symbol-helpers";
import { FunctionMethod } from "./class-members/function-method";
import { ProcedureMethod } from "./class-members/procedure-method";
import { Field } from "./frame-interfaces/field";
import { Frame } from "./frame-interfaces/frame";
import { Language } from "./frame-interfaces/language";
import { ClassFrame } from "./globals/class-frame";
import { ConstantGlobal } from "./globals/constant-global";
import { FunctionFrame } from "./globals/function-frame";
import { ProcedureFrame } from "./globals/procedure-frame";
import { ArgListNode } from "./parse-nodes/arg-list-node";
import { CSV } from "./parse-nodes/csv";
import { LitStringInterpolated } from "./parse-nodes/lit-string-interpolated";
import { NewInstance } from "./parse-nodes/new-instance";
import { ParamDefNode } from "./parse-nodes/param-def-node";
import { Space } from "./parse-nodes/parse-node-helpers";
import { PunctuationNode } from "./parse-nodes/punctuation-node";
import { SpaceNode } from "./parse-nodes/space-node";
import { TypeGenericNode } from "./parse-nodes/type-generic-node";
import { TypeNode } from "./parse-nodes/type-node";
import { TypeSimpleOrGeneric } from "./parse-nodes/type-simple-or-generic";
import { TypeTupleNode } from "./parse-nodes/type-tuple-node";
import { AssertStatement } from "./statements/assert-statement";
import { CallStatement } from "./statements/call-statement";
import { ConstantStatement } from "./statements/constant-statement";
import { SetStatement } from "./statements/set-statement";
import { VariableStatement } from "./statements/variable-statement";
import { TokenType } from "./symbol-completion-helpers";
import { CLOSE_BRACKET, OPEN_BRACKET } from "./symbols";

export abstract class LanguageAbstract implements Language {
  protected constructor() {}

  commentRegex(): RegExp {
    return /# [^\r\n]*/;
  }
  languageHtmlClass = "python";
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

  abstract renderFileImportsAsHtml(): string;
  abstract renderFileTrailerAsHtml(): string;

  abstract translateExpression(expr: string): string;

  abstract paramDefAsHtml(node: ParamDefNode): string;
  abstract typeGenericAsHtml(node: TypeGenericNode): string;
  abstract newInstanceAsHtml(node: NewInstance): string;
  abstract litStringInterpolatedAsHtml(node: LitStringInterpolated): string;
  abstract typeTupleAsHtml(node: TypeTupleNode): string;

  default_litStringInterpolatedAsHtml(node: LitStringInterpolated): string {
    return `${this.INTERPOLATED_STRING_PREFIX}"${node.segments!.renderAsHtml()}"`;
  }

  default_typeTupleAsHtml(node: TypeTupleNode): string {
    return `(${node.types?.renderAsHtml()})`;
  }

  abstract addNodesForParamDef(node: ParamDefNode): void;
  abstract addNodesForNewInstance(node: NewInstance): void;
  abstract addNodesForTypeGeneric(node: TypeGenericNode): void;
  abstract addNodesForTypeTuple(node: TypeTupleNode): void;
  abstract standardiseInterpolatedString(node: LitStringInterpolated, text: string): string;

  default_standardiseInterpolatedString(_node: LitStringInterpolated, text: string): string {
    return text.startsWith(this.INTERPOLATED_STRING_PREFIX) ? "$" + text.substring(1) : text;
  }

  protected addCommonElementsForNewInstance(node: NewInstance): void {
    node.type = new TypeSimpleOrGeneric(node.file, new Set<TokenType>([TokenType.type_concrete]));
    node.addElement(node.type);
    node.addElement(new SpaceNode(node.file, Space.ignored));
    node.addElement(new PunctuationNode(node.file, OPEN_BRACKET));
    node.addElement(new SpaceNode(node.file, Space.ignored));
    node.args = new ArgListNode(node.file, () => node.type!.matchedText);
    node.addElement(node.args);
    node.addElement(new SpaceNode(node.file, Space.ignored));
    node.addElement(new PunctuationNode(node.file, CLOSE_BRACKET));
  }

  protected addCommonElementsForTypeTuple(node: TypeTupleNode): void {
    node.types = new CSV(
      node.file,
      () =>
        new TypeNode(
          node.file,
          new Set<TokenType>([
            TokenType.type_concrete,
            TokenType.type_abstract,
            TokenType.type_notInheritable,
          ]),
        ),
      2,
    );
    node.addElement(new PunctuationNode(node.file, OPEN_BRACKET));
    node.addElement(node.types);
    node.addElement(new PunctuationNode(node.file, CLOSE_BRACKET));
  }

  getFields(frame: Frame): Field[] {
    let fields: Field[] = [];
    if (frame instanceof FunctionFrame) {
      fields = this.functionFrameFields(frame);
    } else if (frame instanceof AssertStatement) {
      fields = this.assertStatementFields(frame);
    }
    return fields;
  }

  abstract functionFrameFields(frame: FunctionFrame): Field[];

  default_functionFrameFields(frame: FunctionFrame): Field[] {
    return [frame.name, frame.params, frame.returnType];
  }

  abstract assertStatementFields(frame: AssertStatement): Field[];
  default_assertStatementFields(frame: AssertStatement): Field[] {
    return [frame.actual, frame.expected];
  }

  protected implements(frame: FunctionMethod | ProcedureMethod): string {
    const superImpl = implementsAbstractMethodOnClassOrInterface(
      frame.name,
      frame.getParent() as ClassFrame,
    );
    let implementsClause = "";
    if (superImpl[0] !== "" && !superImpl[1]) {
      implementsClause = ` <el-kw>${this.IMPLEMENTS}</el-kw> <el-type>${superImpl[0]}</el-type>.${frame.name.renderAsHtml()}`;
    }
    return implementsClause;
  }

  protected overrides(frame: FunctionMethod | ProcedureMethod) {
    const superImpl = implementsAbstractMethodOnClassOrInterface(
      frame.name,
      frame.getParent() as ClassFrame,
    );
    let overridesKw = "";
    if (superImpl[0] !== "" && superImpl[1]) {
      overridesKw = `<el-kw>${this.OVERRIDES}</el-kw> `;
    }
    return overridesKw;
  }

  abstract MOD: string;
  abstract EQUAL: string;
  abstract NOT_EQUAL: string;
  abstract AND: string;
  abstract OR: string;
  abstract NOT: string;

  abstract COMMENT_MARKER: string;
  abstract LIST_START: string;
  abstract LIST_END: string;
  abstract INTERPOLATED_STRING_PREFIX: string;

  abstract INT_NAME: string;
  abstract FLOAT_NAME: string;
  abstract BOOL_NAME: string;
  abstract STRING_NAME: string;
  abstract LIST_NAME: string;
  abstract NEW_INSTANCE_PREFIX: string;

  abstract TRUE: string;
  abstract FALSE: string;
  abstract BINARY_PREFIX: string;
  abstract HEX_PREFIX: string;

  abstract START_OF_GENERIC: string;
  abstract THIS_INSTANCE: string;
  abstract OVERRIDES: string;
  abstract IMPLEMENTS: string;

  protected spaced(text: string): string {
    return ` ${text} `;
  }

  abstract reservedWords: Set<string>;
}
