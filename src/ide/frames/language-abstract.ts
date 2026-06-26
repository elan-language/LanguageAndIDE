import { implementsAbstractMethodOnClassOrInterface } from "../../compiler/symbols/symbol-helpers";
import { FunctionMethod } from "./class-members/function-method";
import { ProcedureMethod } from "./class-members/procedure-method";
import { EnumValuesField } from "./fields/enum-values-field";
import { InheritsFromField } from "./fields/inherits-from-field";
import { FileImpl } from "./file-impl";
import { Field } from "./frame-interfaces/field";
import { Frame } from "./frame-interfaces/frame";
import { Language } from "./frame-interfaces/language";
import { ClassFrame } from "./globals/class-frame";
import { ConstantGlobal } from "./globals/constant-global";
import { FunctionFrame } from "./globals/function-frame";
import { ProcedureFrame } from "./globals/procedure-frame";
import { TestFrame } from "./globals/test-frame";
import { Alternatives } from "./parse-nodes/alternatives";
import { ArgListNode } from "./parse-nodes/arg-list-node";
import { CSV } from "./parse-nodes/csv";
import { Lambda } from "./parse-nodes/lambda";
import { ListNode } from "./parse-nodes/list-node";
import { LitStringInterpolated } from "./parse-nodes/lit-string-interpolated";
import { LitStringInterpolatedInsert } from "./parse-nodes/lit-string-interpolated-insert";
import { LitStringText } from "./parse-nodes/lit-string-text";
import { Multiple } from "./parse-nodes/multiple";
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
import { LetStatement } from "./statements/let-statement";
import { ReAssignVariable } from "./statements/reassign-variable";
import { VariableStatement } from "./statements/variable-statement";
import { TokenType } from "./symbol-completion-helpers";
import { CLOSE_BRACKET, DOUBLE_QUOTES, OPEN_BRACKET } from "./symbols";

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
      frame instanceof LetStatement ||
      frame instanceof FunctionFrame ||
      frame instanceof ProcedureFrame ||
      frame instanceof CallStatement ||
      frame instanceof ReAssignVariable
    ) {
      annotation = frame.frameSpecificAnnotation();
    }
    return annotation;
  }

  abstract renderSingleLineAsHtml(frame: Frame): string;

  abstract renderTopAsHtml(frame: Frame): string;

  abstract renderBottomAsHtml(frame: Frame): string;

  abstract renderFileImportsAsHtml(): string;
  abstract renderSpecificHeaderAsHtml(f: FileImpl): string;
  abstract renderFileTrailerAsHtml(f: FileImpl): string;

  abstract translateExpression(expr: string): string;

  abstract addNodesForParamDef(node: ParamDefNode): void;
  abstract addNodesForNewInstance(node: NewInstance): void;
  abstract addNodesForTypeGeneric(node: TypeGenericNode): void;
  abstract addNodesForTypeTuple(node: TypeTupleNode): void;
  abstract addNodesForLambda(node: Lambda): void;
  abstract addNodesForList(node: ListNode): void;
  abstract parseInterpolatedString(node: LitStringInterpolated, text: string): void;

  abstract paramDefAsHtml(node: ParamDefNode): string;
  abstract typeGenericAsHtml(node: TypeGenericNode): string;
  abstract newInstanceAsHtml(node: NewInstance): string;
  abstract litStringInterpolatedAsHtml(node: LitStringInterpolated): string;
  abstract typeTupleAsHtml(node: TypeTupleNode): string;
  abstract enumValuesListAsHtml(field: EnumValuesField): string;
  abstract inheritsFromTextAsHtml(field: InheritsFromField): string;
  abstract lambdaAsHtml(node: Lambda): string;
  abstract listAsHtml(node: ListNode): string;

  default_parseInterpolatedString(node: LitStringInterpolated, prefix: string, text: string): void {
    const field = () => new LitStringInterpolatedInsert(node.file);
    const plainText = () => new LitStringText(node.file, /^[^%"\{]+/);
    const segment = () => new Alternatives(node.file, [field, plainText]);
    node.segments = new Multiple(node.file, segment, 1);
    node.addElement(new PunctuationNode(node.file, prefix));
    node.addElement(new PunctuationNode(node.file, DOUBLE_QUOTES));
    node.addElement(node.segments);
    node.addElement(new PunctuationNode(node.file, DOUBLE_QUOTES));
    node.defaultParse(text);
  }

  default_addNodesForList(node: ListNode): void {
    node.addElement(new PunctuationNode(node.file, this.LIST_START));
    node.csv = new CSV(node.file, node.elementConstructor, 1);
    node.addElement(node.csv);
    node.addElement(new SpaceNode(node.file, Space.ignored));
    node.addElement(new PunctuationNode(node.file, this.LIST_END));
  }

  default_listAsHtml(node: ListNode): string {
    return `${this.LIST_START}${node.csv?.renderAsHtml()}${this.LIST_END}`;
  }

  default_litStringInterpolatedAsHtml(node: LitStringInterpolated): string {
    return `${this.INTERPOLATED_STRING_PREFIX}"${node.segments!.renderAsHtml()}"`;
  }

  default_typeTupleAsHtml(node: TypeTupleNode): string {
    return `(${node.types?.renderAsHtml()})`;
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

  abstract postProcessHtml(html: string): string;

  protected testClassNameAsHtml(frame: TestFrame) {
    return `<el-type>Test_${frame.testName.text.substring(5)}</el-type>`;
  }
  protected testMethodNameAsHtml(frame: TestFrame) {
    return `<el-method>${frame.testName.renderAsHtml()}</el-method>`;
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
  abstract END_OF_GENERIC: string;
  abstract THIS_INSTANCE: string;
  abstract OVERRIDES: string;
  abstract IMPLEMENTS: string;

  abstract EXPRESSION_KEYWORDS: string[];

  protected spaced(text: string): string {
    return ` ${text} `;
  }

  abstract reservedWords: Set<string>;
}
