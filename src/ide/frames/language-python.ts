import { AbstractFunction } from "./class-members/abstract-function";
import { AbstractProcedure } from "./class-members/abstract-procedure";
import { Constructor } from "./class-members/constructor";
import { FunctionMethod } from "./class-members/function-method";
import { ProcedureMethod } from "./class-members/procedure-method";
import { Property } from "./class-members/property";
import { CommentFrame } from "./comment-frame";
import { FieldImpl } from "./fields/field-impl";
import { FileImpl } from "./file-impl";
import { selfTypeAsHtml } from "./frame-helpers";
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
import { ProcedureFrame } from "./globals/procedure-frame";
import { TestFrame } from "./globals/test-frame";
import { LanguageAbstract } from "./language-abstract";
import { LanguageExportHelpers } from "./language-export-helpers";
import { LanguageExportPython } from "./language-export-python";
import { AssertStatement } from "./statements/assert-statement";
import { Assignment } from "./statements/assignment";
import { CatchClause } from "./statements/catch-clause";
import { ElseClause } from "./statements/else-clause";
import { ElseIfClause } from "./statements/elseIf-clause";
import { ForLoop } from "./statements/forLoop";
import { IfStatement } from "./statements/if-statement";
import { ProcedureCall } from "./statements/procedureCall";
import { ReturnStatement } from "./statements/return-statement";
import { ThrowStatement } from "./statements/throw-statement";
import { TryStatement } from "./statements/try-statement";
import { VariableStatement } from "./statements/variable-statement";
import { WhileLoop } from "./statements/whileLoop";

export class LanguagePython extends LanguageAbstract {
  static Instance: Language = new LanguagePython();

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
      frame instanceof ElseIfClause ||
      frame instanceof ProcedureFrame ||
      frame instanceof ProcedureCall ||
      frame instanceof Assignment ||
      frame instanceof CatchClause ||
      frame instanceof ConcreteClass ||
      frame instanceof AbstractClass ||
      frame instanceof Property ||
      frame instanceof FunctionMethod ||
      frame instanceof ProcedureMethod ||
      frame instanceof AbstractFunction ||
      frame instanceof AbstractProcedure
    ) {
      annotation = frame.frameSpecificAnnotation();
    }
    return annotation;
  }

  renderSingleLineAsHtml(frame: Frame): string {
    let html = `Html not specified for ${typeof frame}`;
    if (frame instanceof AbstractFunction) {
      html = `<el-comment>@abstractmethod</el-comment><br>${frame.indent()}<el-kw>${this.DEF} </el-kw>${frame.name.renderAsHtml()}(${frame.params.renderAsHtml()}) -> ${frame.returnType.renderAsHtml()}:<br>${frame.indent()}&nbsp;&nbsp;<el-kw>pass</el-kw>`;
    } else if (frame instanceof AbstractProcedure) {
      html = `<el-comment>@abstractmethod</el-comment><br>${frame.indent()}<el-kw>${this.DEF} </el-kw>${frame.name.renderAsHtml()}(${frame.params.renderAsHtml()}) -> <el-kw>${this.NONE}</el-kw><br>${frame.indent()}&nbsp;&nbsp;<el-kw>pass</el-kw>`;
    } else if (frame instanceof AssertStatement) {
      html = `<el-kw>self</el-kw>.<el-method>assertEqual</el-method>(${frame.actual.renderAsHtml()}, ${frame.expected.renderAsHtml()})`;
    } else if (frame instanceof ProcedureCall) {
      html = `${frame.proc.renderAsHtml()}(${frame.args.renderAsHtml()})`;
    } else if (frame instanceof CommentFrame) {
      html = frame.textIncludingMarkerSymboAndSpace.renderAsHtml();
    } else if (frame instanceof ConstantGlobal) {
      html = `${frame.name.renderAsHtml()}</el-top><el-punc> = </el-punc>${frame.value.renderAsHtml()}`;
    } else if (frame instanceof ElseIfClause) {
      html = `<el-kw>${this.ELIF} </el-kw>${frame.condition.renderAsHtml()}:`;
    } else if (frame instanceof ElseClause) {
      html = `<el-kw>${this.ELSE}</el-kw>:`;
    } else if (frame instanceof Enum) {
      html = `<el-kw>${this.CLASS}</el-kw> ${frame.name.renderAsHtml()}(<el-type>Enum</el-type>):${frame.values.renderAsHtml()}`;
    } else if (frame instanceof Property) {
      html = `${frame.name.renderAsHtml()}: ${frame.type.renderAsHtml()}`;
    } else if (frame instanceof ReturnStatement) {
      html = `<el-kw>${this.RETURN} </el-kw>${frame.expr.renderAsHtml()}`;
    } else if (frame instanceof Assignment) {
      html = `${frame.assignable.renderAsHtml()} = ${frame.expr.renderAsHtml()}`;
    } else if (frame instanceof ThrowStatement) {
      html = `<el-kw>${this.RAISE}</el-kw> ${frame.type.renderAsHtml()}(${frame.text.renderAsHtml()})`;
    } else if (frame instanceof VariableStatement) {
      html = `${frame.name.renderAsHtml()} = ${frame.expr.renderAsHtml()}`;
    }
    return html;
  }

  renderTopAsHtml(frame: Frame): string {
    let html = `Html not specified for ${typeof frame}`;
    if (frame instanceof AbstractClass) {
      html = `<el-kw>${this.CLASS} </el-kw><el-type>${frame.name.renderAsHtml()}</el-type>${this.inheritsFromTextAsHtml(frame.inheritance)}:`;
    } else if (frame instanceof ConcreteClass) {
      html = `<el-kw>${this.CLASS} </el-kw><el-type>${frame.name.renderAsHtml()}</el-type>${this.inheritsFromTextAsHtml(frame.inheritance)}:`;
    } else if (frame instanceof Constructor) {
      html = `<el-kw>${this.DEF}</el-kw> <el-method>__init__</el-method>(${this.paramListAsHtml(frame, frame.params)}) -> <el-kw>None</el-kw>:`;
    } else if (frame instanceof CatchClause) {
      html = `<el-kw>${this.EXCEPT}</el-kw> ${frame.exceptionType.renderAsHtml()} <el-kw>${this.AS}</el-kw> ${frame.variable.renderAsHtml()}:`;
    } else if (frame instanceof ForLoop) {
      html = `<el-kw>${this.FOR} </el-kw>${frame.variable.renderAsHtml()}<el-kw> ${this.IN} </el-kw>${frame.iter.renderAsHtml()}:`;
    } else if (frame instanceof GlobalFunction) {
      html = `<el-kw>${this.DEF} </el-kw>${frame.name.renderAsHtml()}(${frame.params.renderAsHtml()}) -> ${frame.returnType.renderAsHtml()}:`;
    } else if (frame instanceof GlobalProcedure) {
      html = `<el-kw>${this.DEF} </el-kw>${frame.name.renderAsHtml()}(${frame.params.renderAsHtml()}) -> <el-kw>${this.NONE}</el-kw>:`;
    } else if (frame instanceof IfStatement) {
      html = `<el-kw>${this.IF} </el-kw>${frame.condition.renderAsHtml()}:`;
    } else if (frame instanceof MainRoutine) {
      html = `<el-kw>${this.DEF} </el-kw><el-method>main</el-method>() -> <el-kw>${this.NONE}</el-kw>:`;
    } else if (frame instanceof FunctionMethod) {
      html = `<el-kw>${this.DEF} </el-kw>${frame.name.renderAsHtml()}(${this.paramListAsHtml(frame, frame.params)}) -> ${frame.returnType.renderAsHtml()}:`;
    } else if (frame instanceof ProcedureMethod) {
      html = `<el-kw>${this.DEF} </el-kw>${frame.name.renderAsHtml()}(${this.paramListAsHtml(frame, frame.params)}) -> <el-kw>${this.NONE}</el-kw>:`;
    } else if (frame instanceof TestFrame) {
      html = `<el-kw>class</el-kw> ${this.testClassNameAsHtml(frame)}(<el-id>unittest<el-id>.<el-type>TestCase</el-type>):<br>&nbsp;<el-kw>${this.DEF}</el-kw> ${this.testMethodNameAsHtml(frame)}(<el-kw>${this.SELF}</el-kw>) -> <el-kw>${this.NONE}</el-kw>:`;
    } else if (frame instanceof TryStatement) {
      html = `<el-kw>${this.TRY}</el-kw>:`;
    } else if (frame instanceof WhileLoop) {
      html = `<el-kw>${this.WHILE} </el-kw>${frame.condition.renderAsHtml()}:`;
    }
    return html;
  }

  paramListAsHtml(frame: MemberFrame, field: FieldImpl): string {
    const self: string = `<el-kw>${this.SELF}</el-kw>: ${selfTypeAsHtml(frame)}`;
    // if no params, wrap the comma to make it only appear
    // when the line (or parts of it) are selected
    // if there are params, the comma appears unconditionally
    const comma = field.text === "" ? `<el-place class="trailingcomma">, </el-place>` : ", ";
    return `${self}${comma}${field.renderAsHtml()}`;
  }

  inheritsFromTextAsHtml(field: FieldImpl): string {
    let result = "";
    const frame = field.getHolder() as ClassFrame;
    if (frame.doesInherit()) {
      result = `(${field.renderAsHtml()})`;
    } else if (frame.isAbstract) {
      result = `(<el-type>ABC</el-type>)`;
    }
    return result;
  }

  renderBottomAsHtml(frame: Frame): string {
    let html = "<el-comment># end ";
    if (frame instanceof AbstractClass || frame instanceof ConcreteClass) {
      html += this.CLASS;
    } else if (frame instanceof Constructor) {
      html += "constructor";
    } else if (frame instanceof FunctionMethod) {
      html += "function method";
    } else if (frame instanceof ProcedureMethod) {
      html += "procedure method";
    } else if (frame instanceof ForLoop) {
      html += this.FOR;
    } else if (frame instanceof GlobalFunction) {
      html += "function";
    } else if (frame instanceof GlobalProcedure) {
      html += "procedure";
    } else if (frame instanceof IfStatement) {
      html += "if";
    } else if (frame instanceof MainRoutine) {
      html += "main";
    } else if (frame instanceof TryStatement) {
      html += this.TRY;
    } else if (frame instanceof WhileLoop) {
      html += this.WHILE;
    } else if (frame instanceof TestFrame) {
      html += "test";
    }
    return html + "</el-comment>";
  }

  renderFileImportsAsHtml(): string {
    return this.languageExportHelpers.renderFileImportsAsHtml();
  }
  renderSpecificHeaderAsHtml(_f: FileImpl): string {
    return "";
  }
  renderFileTrailerAsHtml(f: FileImpl): string {
    return f.containsMain() ? "\n\n<el-method>main</el-method><el-punc>()</el-punc>" : "";
  }

  // make instances of the two classes needed for export of expressions
  private languageExportHelpers = new LanguageExportHelpers(new LanguageExportPython());

  postProcessHtml(html: string): string {
    return html;
  }

  private AS = "as";
  private DEF = "def";
  private CLASS = "class";
  private ELIF = "elif";
  private ELSE = "else";
  private EXCEPT = "except";
  private FOR = "for";
  private IF = "if";
  private IN = "in";
  private LAMBDA = "lambda";
  private NONE = "None";
  private RAISE = "raise";
  private RETURN = "return";
  private SELF = "self";
  private TRY = "try";
  private WHILE = "while";

  private OPEN_SQUARE_BRACKET = "[";
  private CLOSE_SQUARE_BRACKET = "]";

  MOD: string = "%";
  EQUAL: string = "==";
  NOT_EQUAL: string = "!=";
  AND: string = "and";
  OR: string = "or";
  NOT: string = "not";

  COMMENT_MARKER = "#";
  LIST_START: string = "[";
  LIST_END: string = "]";
  INTERPOLATED_STRING_PREFIX: string = "f";
  NEW_INSTANCE_PREFIX = ""; // i.e. there is no Python equivalent to 'new' keyword

  INT_NAME: string = "int";
  FLOAT_NAME: string = "float";
  BOOL_NAME: string = "bool";
  STRING_NAME: string = "str";
  LIST_NAME: string = "list";
  FUNC_NAME: string = "Callable";

  TUPLE_START = "tuple[";
  TUPLE_END = "]";

  TRUE: string = "True";
  FALSE: string = "False";
  BINARY_PREFIX: string = "0b";
  HEX_PREFIX: string = "0x";

  START_OF_GENERIC: string = "[";
  END_OF_GENERIC: string = "]";
  THIS_INSTANCE: string = this.SELF;
  OVERRIDES = "";
  IMPLEMENTS = "";

  EXPRESSION_KEYWORDS: string[] = [this.LAMBDA, this.SELF, this.NOT];
  DISALLOWED_IDENTIFIERS: string[] = [this.SELF, this.TRUE, this.FALSE];

  functionFrameFields(frame: FunctionFrame): Field[] {
    return this.default_functionFrameFields(frame);
  }

  assertStatementFields(frame: AssertStatement): Field[] {
    return this.default_assertStatementFields(frame);
  }

  reservedWords: Set<string> = new Set<string>([
    `false`,
    `await`,
    `else`,
    `import`,
    `pass`,
    `none`,
    `break`,
    `except`,
    `in`,
    `raise`,
    `true`,
    `class`,
    `finally`,
    `is`,
    `return`,
    `and`,
    `continue`,
    `for`,
    `lambda`,
    `try`,
    `as`,
    `def`,
    `from`,
    `nonlocal`,
    `while`,
    `assert`,
    `del`,
    `global`,
    `not`,
    `with`,
    `async`,
    `elif`,
    `if`,
    `or`,
    `yield`,
    `str`,
    `int`,
    `float`,
    `complex`,
    `list`,
    `tuple`,
    `range`,
    `dict`,
    `set`,
    `frozenset`,
    `bool`,
    `bytes`,
    `bytearray`,
    `memoryview`,
    `nonetype`,
  ]);
}
