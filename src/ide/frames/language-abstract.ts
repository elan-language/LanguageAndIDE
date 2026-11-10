import { implementsAbstractMethodOnClassOrInterface } from "../../compiler/symbols/symbol-helpers";
import { Constructor } from "./class-members/constructor";
import { FunctionMethod } from "./class-members/function-method";
import { ProcedureMethod } from "./class-members/procedure-method";
import { FileImpl } from "./file-impl";
import { Field } from "./frame-interfaces/field";
import { Frame } from "./frame-interfaces/frame";
import { Language } from "./frame-interfaces/language";
import { FrameType } from "./frame-type";
import { AbstractClass } from "./globals/abstract-class";
import { ClassFrame } from "./globals/class-frame";
import { ConcreteClass } from "./globals/concrete-class";
import { FunctionFrame } from "./globals/function-frame";
import { GlobalFunction } from "./globals/global-function";
import { GlobalProcedure } from "./globals/global-procedure";
import { MainRoutine } from "./globals/main-routine";
import { TestFrame } from "./globals/test-frame";
import { AssertStatement } from "./statements/assert-statement";
import { ForLoop } from "./statements/forLoop";
import { IfStatement } from "./statements/if-statement";
import { TryStatement } from "./statements/try-statement";
import { WhileLoop } from "./statements/whileLoop";

export abstract class LanguageAbstract implements Language {
  protected constructor() {}

  commentRegex(): RegExp {
    return /# [^\r\n]*/;
  }
  languageHtmlClass = "python";
  languageFullName: string = "Python";
  defaultFileExtension: string = "py";
  defaultMimeType: string = "text/x-python";

  abstract renderSingleLineAsHtml(frame: Frame): string;
  abstract renderSingleLineAsSource(frame: Frame): string;

  abstract renderTopAsHtml(frame: Frame): string;
  abstract renderTopAsSource(frame: Frame): string;

  abstract renderBottomAsHtml(frame: Frame): string;
  abstract renderBottomAsSource(frame: Frame): string;

  abstract renderFileImportsAsHtml(): string;

  abstract renderSpecificHeaderAsHtml(f: FileImpl): string;
  abstract renderSpecificHeaderAsSource(f: FileImpl): string;

  abstract renderFileTrailerAsHtml(f: FileImpl): string;
  abstract renderFileTrailerAsSource(f: FileImpl): string;

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
  protected testClassNameAsSource(frame: TestFrame) {
    return `Test_${frame.testName.text.substring(5)}`;
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

  protected commonRenderBottom(frame: Frame): string {
    let source = "";
    if (frame instanceof AbstractClass || frame instanceof ConcreteClass) {
      source += "end class";
    } else if (frame instanceof Constructor) {
      source += "end constructor";
    } else if (frame instanceof FunctionMethod) {
      source += "end function";
    } else if (frame instanceof ProcedureMethod) {
      source += "end procedure";
    } else if (frame instanceof ForLoop) {
      source += "end for";
    } else if (frame instanceof GlobalFunction) {
      source += "end function";
    } else if (frame instanceof GlobalProcedure) {
      source += "end procedure";
    } else if (frame instanceof IfStatement) {
      source += "end if";
    } else if (frame instanceof MainRoutine) {
      source += "end main";
    } else if (frame instanceof TryStatement) {
      source += "end try";
    } else if (frame instanceof WhileLoop) {
      source += "end while";
    } else if (frame instanceof TestFrame) {
      source += "end test";
    }
    return source;
  }

  abstract customiseStatementOptions(options: [FrameType, string, string, boolean][]): void;
}
