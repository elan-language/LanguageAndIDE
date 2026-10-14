import { implementsAbstractMethodOnClassOrInterface } from "../../compiler/symbols/symbol-helpers";
import { FunctionMethod } from "./class-members/function-method";
import { ProcedureMethod } from "./class-members/procedure-method";
import { FileImpl } from "./file-impl";
import { Field } from "./frame-interfaces/field";
import { Frame } from "./frame-interfaces/frame";
import { Language } from "./frame-interfaces/language";
import { ClassFrame } from "./globals/class-frame";
import { ConstantGlobal } from "./globals/constant-global";
import { FunctionFrame } from "./globals/function-frame";
import { ProcedureFrame } from "./globals/procedure-frame";
import { TestFrame } from "./globals/test-frame";
import { AssertStatement } from "./statements/assert-statement";
import { Assignment } from "./statements/assignment";
import { ProcedureCall } from "./statements/procedureCall";
import { VariableStatement } from "./statements/variable-statement";

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
      frame instanceof FunctionFrame ||
      frame instanceof ProcedureFrame ||
      frame instanceof ProcedureCall ||
      frame instanceof Assignment
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
  abstract FUNC_NAME: string;

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
  abstract DISALLOWED_IDENTIFIERS: string[];

  protected spaced(text: string): string {
    return ` ${text} `;
  }

  abstract reservedWords: Set<string>;

  abstract TUPLE_START: string;
  abstract TUPLE_END: string;
}
