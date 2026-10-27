import {
  abstractKeyword,
  asKeyword,
  assertKeyword,
  assignKeyword,
  beKeyword,
  callKeyword,
  catchKeyword,
  classKeyword,
  constantKeyword,
  constructorKeyword,
  elifKeyword,
  elseKeyword,
  endKeyword,
  enumKeyword,
  evaluatesKeyword,
  forKeyword,
  functionKeyword,
  ifKeyword,
  inheritsKeyword,
  inKeyword,
  lambdaKeyword,
  mainKeyword,
  newKeyword,
  ofKeyword,
  powKeyword,
  privateKeyword,
  procedureKeyword,
  propertyKeyword,
  returnKeyword,
  returnsKeyword,
  setKeyword,
  stepKeyword,
  testKeyword,
  thenKeyword,
  thisKeyword,
  throwKeyword,
  toKeyword,
  tryKeyword,
  variableKeyword,
  whileKeyword,
  withKeyword,
} from "../../compiler/elan-keywords";
import { AbstractFunction } from "./class-members/abstract-function";
import { AbstractProcedure } from "./class-members/abstract-procedure";
import { Constructor } from "./class-members/constructor";
import { FunctionMethod } from "./class-members/function-method";
import { ProcedureMethod } from "./class-members/procedure-method";
import { Property } from "./class-members/property";
import { CommentFrame } from "./comment-frame";
import { FieldImpl } from "./fields/field-impl";
import { FileImpl } from "./file-impl";
import { Field } from "./frame-interfaces/field";
import { Frame } from "./frame-interfaces/frame";
import { Language } from "./frame-interfaces/language";
import { MemberFrame } from "./frame-interfaces/member-frame";
import { AbstractClass } from "./globals/abstract-class";
import { ClassFrame } from "./globals/class-frame";
import { ConcreteClass } from "./globals/concrete-class";
import { ConstantGlobal } from "./globals/constant-global";
import { Enum } from "./globals/enum";
import { FunctionFrame } from "./globals/function-frame";
import { GlobalFunction } from "./globals/global-function";
import { GlobalProcedure } from "./globals/global-procedure";
import { MainRoutine } from "./globals/main-routine";
import { TestFrame } from "./globals/test-frame";
import { LanguageAbstract } from "./language-abstract";
import { AssertStatement } from "./statements/assert-statement";
import { Assignment } from "./statements/assignment";
import { CatchClause } from "./statements/catch-clause";
import { ElseClause } from "./statements/else-clause";
import { ElseIfClause } from "./statements/elseIf-clause";
import { ForLoop } from "./statements/forLoop";
import { IfStatement } from "./statements/if-statement";
import { ProcedureCall } from "./statements/procedureCall";
import { ReturnStatement } from "./statements/return-statement";
import { ThenClause } from "./statements/then-clause";
import { ThrowStatement } from "./statements/throw-statement";
import { TryClause } from "./statements/try-clause";
import { TryStatement } from "./statements/try-statement";
import { VariableStatement } from "./statements/variable-statement";
import { WhileLoop } from "./statements/whileLoop";

export class LanguageElan extends LanguageAbstract {
  private constructor() {
    super();
  }

  static Instance: Language = new LanguageElan();

  commentRegex(): RegExp {
    return /# [^\r\n]*/;
  }
  languageHtmlClass = "elan";
  languageFullName: string = "Reference Language";
  defaultFileExtension: string = "elan";
  defaultMimeType: string = "text/plain";

  annotation(_frame: Frame): string {
    return "";
  }

  renderSingleLineAsHtml(frame: Frame): string {
    let html = `Html not specified for this frame`;
    if (frame instanceof AssertStatement) {
      html = `<el-kw>${this.ASSERT} </el-kw>${frame.actual.renderAsHtml()}<el-kw> ${this.EVALUATES} ${this.TO} </el-kw>${frame.expected.renderAsHtml()}`;
    } else if (frame instanceof ProcedureCall) {
      html = `<el-kw>${this.CALL} </el-kw>${frame.procRef.renderAsHtml()}`;
    } else if (frame instanceof CommentFrame) {
      html = frame.textIncludingMarkerSymboAndSpace.renderAsHtml();
    } else if (frame instanceof ConstantGlobal) {
      // special case because the </el-top> needs to be placed part way through the line
      html = `<el-kw>${this.CONSTANT} </el-kw>${frame.name.renderAsHtml()}</el-top><el-kw> set to </el-kw>${frame.value.renderAsHtml()}`;
    } else if (frame instanceof Enum) {
      html = `<el-kw>${this.ENUM} </el-kw>${frame.name.renderAsHtml()} ${frame.values.renderAsHtml()}`;
    } else if (frame instanceof Property) {
      html = `${this.modifierAsHtml(frame)}<el-kw>${this.PROPERTY} </el-kw>${frame.name.renderAsHtml()}<el-kw> ${this.AS} </el-kw>${frame.type.renderAsHtml()}`;
    } else if (frame instanceof ReturnStatement) {
      html = `<el-kw>${this.RETURN} </el-kw>${frame.expr.renderAsHtml()}`;
    } else if (frame instanceof Assignment) {
      html = `<el-kw>${this.ASSIGN} </el-kw>${frame.assignable.renderAsHtml()}<el-kw> ${this.TO} </el-kw>${frame.expr.renderAsHtml()}`;
    } else if (frame instanceof ThrowStatement) {
      html = `<el-kw>${this.THROW}</el-kw> ${frame.type.renderAsHtml()} ${frame.text.renderAsHtml()}`;
    } else if (frame instanceof VariableStatement) {
      html = `<el-kw>${this.VARIABLE} </el-kw>${frame.name.renderAsHtml()}<el-kw> ${this.SET} ${this.TO} </el-kw>${frame.expr.renderAsHtml()}`;
    } else if (frame instanceof AbstractFunction) {
      html = `<el-kw>${this.ABSTRACT} ${this.FUNCTION} </el-kw><el-method>${frame.name.renderAsHtml()}</el-method>(${frame.params.renderAsHtml()})<el-kw> ${this.RETURNS} </el-kw>${frame.returnType.renderAsHtml()}`;
    } else if (frame instanceof AbstractProcedure) {
      html = `<el-kw>${this.ABSTRACT} ${this.PROCEDURE} </el-kw><el-method>${frame.name.renderAsHtml()}</el-method>(${frame.params.renderAsHtml()})`;
    }
    return html;
  }

  renderSingleLineAsExport(_frame: Frame): string {
    return ""; // At least for the time being, there is no reason to export a file being presented as Elan
  }

  renderTopAsHtml(frame: Frame): string {
    let html = `Html not specified for this frame`;
    if (frame instanceof AbstractClass) {
      html = `<el-kw>${this.ABSTRACT} ${this.CLASS} </el-kw>${frame.name.renderAsHtml()} ${this.inheritsFromTextAsHtml(frame.inheritance)}`;
    } else if (frame instanceof ConcreteClass) {
      html = `<el-kw>${this.CLASS} </el-kw>${frame.name.renderAsHtml()} ${this.inheritsFromTextAsHtml(frame.inheritance)}`;
    } else if (frame instanceof Constructor) {
      html = `<el-kw>${this.CONSTRUCTOR}</el-kw>(${frame.params.renderAsHtml()})`;
    } else if (frame instanceof CatchClause) {
      html = `<el-kw>${this.CATCH} </el-kw>${frame.variable.renderAsHtml()} <el-kw>${this.AS}</el-kw> ${frame.exceptionType.renderAsHtml()}`;
    } else if (frame instanceof ElseIfClause) {
      html = `<el-kw>${this.ELIF} </el-kw>${frame.condition.renderAsHtml()}<el-kw> ${this.THEN}`;
    } else if (frame instanceof ElseClause) {
      html = `<el-kw>${this.ELSE}`;
    } else if (frame instanceof ForLoop) {
      html = `<el-kw>${this.FOR} </el-kw>${frame.variable.renderAsHtml()}<el-kw> ${this.IN} </el-kw>${frame.iter.renderAsHtml()}`;
    } else if (frame instanceof FunctionMethod) {
      html = `${this.modifierAsHtml(frame)}<el-kw>${this.FUNCTION} </el-kw>${frame.name.renderAsHtml()}(${frame.params.renderAsHtml()})<el-kw> ${this.RETURNS} </el-kw>${frame.returnType.renderAsHtml()}`;
    } else if (frame instanceof GlobalFunction) {
      html = `<el-kw>${this.FUNCTION} </el-kw>${frame.name.renderAsHtml()}(${frame.params.renderAsHtml()})<el-kw> ${this.RETURNS} </el-kw>${frame.returnType.renderAsHtml()}`;
    } else if (frame instanceof GlobalProcedure) {
      html = `<el-kw>${this.PROCEDURE} </el-kw>${frame.name.renderAsHtml()}(${frame.params.renderAsHtml()})`;
    } else if (frame instanceof ProcedureMethod) {
      html = `${this.modifierAsHtml(frame)}<el-kw>${this.PROCEDURE} </el-kw>${frame.name.renderAsHtml()}(${frame.params.renderAsHtml()})`;
    } else if (frame instanceof IfStatement) {
      html = `<el-kw>${this.IF} </el-kw>${frame.condition.renderAsHtml()}<el-kw> ${this.THEN}</el-kw>`;
    } else if (frame instanceof MainRoutine) {
      html = `<el-kw>${this.MAIN}</el-kw>`;
    } else if (frame instanceof TestFrame) {
      html = `<el-kw>${this.TEST} </el-kw>${frame.testName.renderAsHtml()}`;
    } else if (frame instanceof ThenClause) {
      html = ``; // no top to ThenClause
    } else if (frame instanceof TryClause) {
      html = ``; // no top to ThenClause
    } else if (frame instanceof TryStatement) {
      html = `<el-kw>${this.TRY} </el-kw>`;
    } else if (frame instanceof WhileLoop) {
      html = `<el-kw>${this.WHILE} </el-kw>${frame.condition.renderAsHtml()}`;
    }
    return html;
  }

  inheritsFromTextAsHtml(field: FieldImpl): string {
    const frame = field.getHolder() as ClassFrame;
    return frame.doesInherit() ? ` <el-kw>${this.INHERITS}</el-kw> ${field.renderAsHtml()}` : ``;
  }

  renderTopAsExport(_frame: Frame): string {
    return ""; // At least for the time being, there is no reason to export a file being presented as Elan
  }

  renderBottomAsHtml(frame: Frame): string {
    let result = "";
    if (!("isClause" in frame)) {
      result = `<el-kw>${this.END} ${frame.initialKeywords()}</el-kw>`;
    }
    return result;
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

  postProcessHtml(html: string): string {
    return html;
  }

  private ABSTRACT = abstractKeyword;
  private AS = asKeyword;
  private ASSERT = assertKeyword;
  private ASSIGN = assignKeyword;
  private BE = beKeyword;
  private CALL = callKeyword;
  private CATCH = catchKeyword;
  private CLASS = classKeyword;
  private CONSTANT = constantKeyword;
  private CONSTRUCTOR = constructorKeyword;
  private ELIF = elifKeyword;
  private ELSE = elseKeyword;
  private END = endKeyword;
  private ENUM = enumKeyword;
  private EVALUATES = evaluatesKeyword;
  private FOR = forKeyword;
  private FUNCTION = functionKeyword;
  private IF = ifKeyword;
  private IN = inKeyword;
  private INHERITS = inheritsKeyword;
  private lambdaKeyword = lambdaKeyword;
  private MAIN = mainKeyword;
  private NEW = newKeyword;
  private OF = ofKeyword;
  private PRIVATE = privateKeyword;
  private PROCEDURE = procedureKeyword;
  private PROPERTY = propertyKeyword;
  private POW = powKeyword;
  private RETURN = returnKeyword;
  private RETURNS = returnsKeyword;
  private SET = setKeyword;
  private STEP = stepKeyword;
  private TEST = testKeyword;
  private THEN = thenKeyword;
  private THIS = thisKeyword;
  private THROW = throwKeyword;
  private TO = toKeyword;
  private TRY = tryKeyword;
  private VARIABLE = variableKeyword;
  private WHILE = whileKeyword;
  private WITH = withKeyword;

  POWER: string = "^";
  EQUAL: string = "is";
  NOT_EQUAL: string = "isnt";
  MOD = "mod";
  AND = "and";
  OR = "or";
  NOT = "not";

  COMMENT_MARKER = "#";
  LIST_START: string = "[";
  LIST_END: string = "]";
  INTERPOLATED_STRING_PREFIX: string = "$";
  NEW_INSTANCE_PREFIX = this.NEW;

  INT_NAME: string = "Int";
  FLOAT_NAME: string = "Float";
  BOOL_NAME: string = "Boolean";
  STRING_NAME: string = "String";
  LIST_NAME: string = "List";
  FUNC_NAME: string = "Func";

  TRUE: string = "true";
  FALSE: string = "false";
  BINARY_PREFIX: string = "0b";
  HEX_PREFIX: string = "0x";

  TUPLE_START = "tuple[";
  TUPLE_END = "]";

  START_OF_GENERIC: string = `<${this.OF} `;
  END_OF_GENERIC: string = `>`;
  THIS_INSTANCE: string = this.THIS;
  OVERRIDES = "";
  IMPLEMENTS = "";

  EXPRESSION_KEYWORDS: string[] = [this.NEW, this.IF, this.lambdaKeyword, this.THIS, this.NOT];
  DISALLOWED_IDENTIFIERS: string[] = [
    this.NEW,
    this.lambdaKeyword,
    this.THIS,
    this.NOT,
    this.TRUE,
    this.FALSE,
  ];

  functionFrameFields(frame: FunctionFrame): Field[] {
    return this.default_functionFrameFields(frame);
  }

  assertStatementFields(frame: AssertStatement): Field[] {
    return this.default_assertStatementFields(frame);
  }

  private modifierAsHtml(member: MemberFrame): string {
    return member.isPrivate ? `<el-kw>${this.PRIVATE} </el-kw>` : "";
  }

  // Elan keywords followed by JavaScript keywords
  reservedWords: Set<string> = new Set<string>([
    `abstract`,
    `and`,
    `as`,
    `assert`,
    `be`,
    `call`,
    `catch`,
    `class`,
    `constant`,
    `constructor`,
    `each`,
    `elif`,
    `else`,
    `end`,
    `enum`,
    `exception`,
    `for`,
    `from`,
    `function`,
    `global`,
    `if`,
    `if_`,
    `in`,
    `inherits`,
    `interface`,
    `is`,
    `isnt`,
    `lambda`,
    `library`,
    `main`,
    `mod`,
    `new`,
    `not`,
    `of`,
    `or`,
    `private`,
    `procedure`,
    `property`,
    `return`,
    `returns`,
    `set`,
    `step`,
    `test`,
    `then`,
    `this`,
    `throw`,
    `to`,
    `try`,
    `variable`,
    `while`,
    `action`,
    `arguments`,
    `array`,
    `async`,
    `await`,
    `boolean`,
    `break`,
    `by`,
    `byte`,
    `case`,
    `catch`,
    `char`,
    `const`,
    `continue`,
    `debugger`,
    `default`,
    `delete`,
    `do`,
    `double`,
    `eval`,
    `export`,
    `extends`,
    `final`,
    `finally`,
    `float`,
    `goto`,
    `implements`,
    `instanceof`,
    `int`,
    `into`,
    `list`,
    `long`,
    `match`,
    `mock`,
    `namespace`,
    `native`,
    `null`,
    `on`,
    `otherwise`,
    `record`,
    `package`,
    `partial`,
    `pattern`,
    `protected`,
    `public`,
    `scenario`,
    `short`,
    `static`,
    `stdlib`,
    `string`,
    `super`,
    `switch`,
    `system`,
    `synchronized`,
    `throws`,
    `transient`,
    `typeof`,
    `void`,
    `volatile`,
    `var`,
    `when`,
    `yield`,
  ]);
}
