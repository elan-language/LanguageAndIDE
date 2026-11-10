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
import { Parent } from "./frame-interfaces/parent";
import { FrameType } from "./frame-type";
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
import { ThenClause } from "./statements/then-clause";
import { ThrowStatement } from "./statements/throw-statement";
import { TryClause } from "./statements/try-clause";
import { TryStatement } from "./statements/try-statement";
import { VariableDefinition } from "./statements/variable-definition";
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

  renderSingleLineAsHtml(frame: Frame): string {
    let html = `Html not specified for ${typeof frame}`;
    if (frame instanceof AbstractFunction) {
      html = `<el-comment>@abstractmethod</el-comment><br><el-kw>${this.DEF} </el-kw>${frame.name.renderAsHtml()}(${frame.params.renderAsHtml()}) -> ${frame.returnType.renderAsHtml()}:<br>${frame.indent()}&nbsp;&nbsp;<el-kw>pass</el-kw>`;
    } else if (frame instanceof AbstractProcedure) {
      html = `<el-comment>@abstractmethod</el-comment><br><el-kw>${this.DEF} </el-kw>${frame.name.renderAsHtml()}(${frame.params.renderAsHtml()}) -> <el-kw>${this.NONE}</el-kw><br>${frame.indent()}&nbsp;&nbsp;<el-kw>pass</el-kw>`;
    } else if (frame instanceof AssertStatement) {
      html = `<el-kw>self</el-kw>.<el-method>assertEqual</el-method>(${frame.actual.renderAsHtml()}, ${frame.expected.renderAsHtml()})`;
    } else if (frame instanceof ProcedureCall) {
      html = `${frame.indent()}${frame.procRef.renderAsHtml()}`;
    } else if (frame instanceof CommentFrame) {
      html = `${frame.indent()}${frame.text.renderAsHtml()}`;
    } else if (frame instanceof ConstantGlobal) {
      html = `${frame.name.renderAsHtml()}</el-top><el-punc> = </el-punc>${frame.value.renderAsHtml()}`;
    } else if (frame instanceof Enum) {
      html = `<el-kw>${this.CLASS}</el-kw> ${frame.name.renderAsHtml()}(<el-type>Enum</el-type>):${frame.values.renderAsHtml()}`;
    } else if (frame instanceof Property) {
      html = `${frame.name.renderAsHtml()}: ${frame.type.renderAsHtml()}`;
    } else if (frame instanceof ReturnStatement) {
      html = `<el-kw>${this.RETURN} </el-kw>${frame.expr.renderAsHtml()}`;
    } else if (frame instanceof Assignment) {
      html = `${frame.assignable.renderAsHtml()} = ${frame.expr.renderAsHtml()}<el-comment> # assignment</el-comment>`;
    } else if (frame instanceof ThrowStatement) {
      html = `<el-kw>${this.RAISE}</el-kw> ${frame.type.renderAsHtml()}(${frame.text.renderAsHtml()})`;
    } else if (frame instanceof VariableDefinition) {
      html = `${frame.name.renderAsHtml()} = ${frame.expr.renderAsHtml()}<el-comment> # variable definition</el-comment>`;
    }
    return html;
  }

  renderSingleLineAsSource(frame: Frame): string {
    let source = `Source not specified for ${typeof frame}`;
    if (frame instanceof AbstractFunction) {
      source = `${frame.indent()}${this.ghostSingle(frame)}@abstractmethod\n${frame.indent()}${this.DEF} ${frame.name.renderAsSource()}(${frame.params.renderAsSource()}) -> ${frame.returnType.renderAsSource()}:\n${frame.indent()}  pass`;
    } else if (frame instanceof AbstractProcedure) {
      source = `${frame.indent()}${this.ghostSingle(frame)}@abstractmethod\n${frame.indent()}${this.DEF} ${frame.name.renderAsSource()}(${frame.params.renderAsSource()}) -> ${this.NONE}\n${frame.indent()}  pass`;
    } else if (frame instanceof AssertStatement) {
      source = `${frame.indent()}${this.ghostSingle(frame)}self.assertEqual(${frame.actual.renderAsSource()}, ${frame.expected.renderAsSource()})`;
    } else if (frame instanceof ProcedureCall) {
      source = `${frame.indent()}${this.ghostSingle(frame)}${frame.procRef.renderAsSource()}`;
    } else if (frame instanceof CommentFrame) {
      source = `${frame.indent()}${this.ghostSingle(frame)}${frame.text.renderAsSource()}`;
    } else if (frame instanceof ConstantGlobal) {
      source = `${this.ghostSingle(frame)}${frame.name.renderAsSource()} = ${frame.value.renderAsSource()}`;
    } else if (frame instanceof Enum) {
      source = `${this.ghostSingle(frame)}${this.CLASS} ${frame.name.renderAsSource()}(Enum):${frame.values.renderAsSource()}`;
    } else if (frame instanceof Property) {
      source = `${frame.indent()}${this.ghostSingle(frame)}${frame.name.renderAsSource()}: ${frame.type.renderAsSource()}`;
    } else if (frame instanceof ReturnStatement) {
      source = `${frame.indent()}${this.ghostSingle(frame)}${this.RETURN} ${frame.expr.renderAsSource()}`;
    } else if (frame instanceof Assignment) {
      source = `${frame.indent()}${this.ghostSingle(frame)}${frame.assignable.renderAsSource()} = ${frame.expr.renderAsSource()}`;
    } else if (frame instanceof ThrowStatement) {
      source = `${frame.indent()}${this.ghostSingle(frame)}${this.RAISE} ${frame.type.renderAsSource()}(${frame.text.renderAsSource()})`;
    } else if (frame instanceof VariableDefinition) {
      source = `${frame.indent()}${this.ghostSingle(frame)}${frame.name.renderAsSource()} = ${frame.expr.renderAsSource()}`;
    }
    return source;
  }

  ghostSingle(frame: Frame) {
    return frame.isGhostedExplicitly() ? `${this.COMMENT_MARKER} ${this.GHOSTED} ` : ``;
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
      html = `<el-kw>class</el-kw> ${this.testClassNameAsHtml(frame)}(<el-id>unittest<el-id>.<el-type>TestCase</el-type>):&nbsp;<el-kw>${this.DEF}</el-kw> ${this.testMethodNameAsHtml(frame)}(<el-kw>${this.SELF}</el-kw>) -> <el-kw>${this.NONE}</el-kw>:`;
    } else if (frame instanceof ThenClause) {
      html = ``; // no top to ThenClause
    } else if (frame instanceof TryClause) {
      html = ``; // no top to ThenClause
    } else if (frame instanceof TryStatement) {
      html = `<el-kw>${this.TRY}</el-kw>:`;
    } else if (frame instanceof WhileLoop) {
      html = `<el-kw>${this.WHILE} </el-kw>${frame.condition.renderAsHtml()}:`;
    }
    return html;
  }

  renderTopAsSource(frame: Frame): string {
    let source = `Source not specified for ${typeof frame}`;
    if (frame instanceof AbstractClass) {
      source = `${this.ghostTop(frame)}${this.CLASS} ${frame.name.renderAsSource()}${this.inheritsFromTextAsSource(frame.inheritance)}:`;
    } else if (frame instanceof ConcreteClass) {
      source = `${this.ghostTop(frame)}${this.CLASS} ${frame.name.renderAsSource()}${this.inheritsFromTextAsSource(frame.inheritance)}:`;
    } else if (frame instanceof Constructor) {
      source = `${this.ghostTop(frame)}${this.DEF} __init__(${this.memberParamListAsSource(frame, frame.params)}) -> None:`;
    } else if (frame instanceof CatchClause) {
      source = `${this.ghostTop(frame)}${this.EXCEPT} ${frame.exceptionType.renderAsSource()} ${this.AS} ${frame.variable.renderAsSource()}:`;
    } else if (frame instanceof ElseIfClause) {
      source = `${this.ghostTop(frame)}${this.ELIF} ${frame.condition.renderAsSource()}:`;
    } else if (frame instanceof ElseClause) {
      source = `${this.ghostTop(frame)}${this.ELSE}:`;
    } else if (frame instanceof ForLoop) {
      source = `${this.ghostTop(frame)}${this.FOR} ${frame.variable.renderAsSource()} ${this.IN} ${frame.iter.renderAsSource()}:`;
    } else if (frame instanceof GlobalFunction) {
      source = `${this.ghostTop(frame)}${this.DEF} ${frame.name.renderAsSource()}(${frame.params.renderAsSource()}) -> ${frame.returnType.renderAsSource()}:`;
    } else if (frame instanceof GlobalProcedure) {
      source = `${this.ghostTop(frame)}${this.DEF} ${frame.name.renderAsSource()}(${frame.params.renderAsSource()}) -> ${this.NONE}:`;
    } else if (frame instanceof IfStatement) {
      source = `${this.ghostTop(frame)}${this.IF} ${frame.condition.renderAsSource()}:`;
    } else if (frame instanceof MainRoutine) {
      source = `${this.ghostTop(frame)}${this.DEF} main() -> ${this.NONE}:`;
    } else if (frame instanceof FunctionMethod) {
      source = `${this.DEF} ${frame.name.renderAsSource()}(${this.memberParamListAsSource(frame, frame.params)}) -> ${frame.returnType.renderAsSource()}:`;
    } else if (frame instanceof ProcedureMethod) {
      source = `${this.ghostTop(frame)}${this.DEF} ${frame.name.renderAsSource()}(${this.memberParamListAsSource(frame, frame.params)}) -> ${this.NONE}:`;
    } else if (frame instanceof TestFrame) {
      source = `${this.ghostTop(frame)}class ${this.testClassNameAsSource(frame)}(unittest.TestCase): ${this.DEF} ${frame.testName.renderAsSource()}(${this.SELF}) -> ${this.NONE}:`;
    } else if (frame instanceof ThenClause) {
      source = ``; // no top to ThenClause
    } else if (frame instanceof TryClause) {
      source = ``; // no top to ThenClause
    } else if (frame instanceof TryStatement) {
      source = `${this.ghostTop(frame)}${this.TRY}:`;
    } else if (frame instanceof WhileLoop) {
      source = `${this.ghostTop(frame)}${this.ghostTop(frame)}${this.WHILE} ${frame.condition.renderAsSource()}:`;
    }
    return source;
  }

  ghostTop(frame: Frame) {
    return frame.isGhostedExplicitly()
      ? `${this.MULTILINE_COMMENT_DELIMITER} ${this.GHOSTED} `
      : ``;
  }

  paramListAsHtml(frame: MemberFrame, field: FieldImpl): string {
    const self: string = `<el-kw>${this.SELF}</el-kw>: ${selfTypeAsHtml(frame)}`;
    // if no params, wrap the comma to make it only appear
    // when the line (or parts of it) are selected
    // if there are params, the comma appears unconditionally
    const comma = field.text === "" ? `<el-place class="trailingcomma">, </el-place>` : ", ";
    return `${self}${comma}${field.renderAsHtml()}`;
  }

  memberParamListAsSource(frame: MemberFrame, field: FieldImpl): string {
    const self: string = `${this.SELF}: ${selfTypeAsHtml(frame)}`;
    // if no params, wrap the comma to make it only appear
    // when the line (or parts of it) are selected
    // if there are params, the comma appears unconditionally
    const comma = field.text === "" ? `, ` : ", ";
    return `${self}${comma}${field.renderAsSource()}`;
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

  inheritsFromTextAsSource(field: FieldImpl): string {
    let result = "";
    const frame = field.getHolder() as ClassFrame;
    if (frame.doesInherit()) {
      result = `(${field.renderAsSource()})`;
    }
    return result;
  }

  renderBottomAsHtml(frame: Frame): string {
    const source = this.renderBottomAsSource(frame);
    return source === "" ? "" : `<el-comment>${source}</el-comment>`;
  }

  renderBottomAsSource(frame: Frame): string {
    let common = this.commonRenderBottom(frame);
    if (common.length > 0) {
      common = `${this.COMMENT_MARKER} ${common}`;
    }
    return `${common} ${this.ghostBottom(frame)}`;
  }

  ghostBottom(frame: Frame) {
    return frame.isGhostedExplicitly() ? ` ${this.MULTILINE_COMMENT_DELIMITER}` : ``;
  }

  renderFileImportsAsHtml(): string {
    return this.languageExportHelpers.renderFileImportsAsHtml();
  }
  renderSpecificHeaderAsHtml(_f: FileImpl): string {
    return "";
  }
  renderSpecificHeaderAsSource(_f: FileImpl): string {
    return "";
  }
  renderFileTrailerAsHtml(_f: FileImpl): string {
    return "";
  }
  renderFileTrailerAsSource(f: FileImpl): string {
    return f.containsMain() ? "\n\nmain()" : "";
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

  GHOSTED = "[ghosted]";
  COMMENT_MARKER = "#";
  MULTILINE_COMMENT_DELIMITER = "'''";
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

  customiseStatementOptions(
    options: [FrameType, string, string, (parent: Parent) => Frame, boolean][],
  ): void {
    const throwFrame: [FrameType, string, string, (parent: Parent) => Frame, boolean] =
      options.filter((o) => o[0] === FrameType.throwStatement)[0];
    throwFrame[1] = "r";
    throwFrame[2] = "<b>r</b>aise";
    const catchFrame: [FrameType, string, string, (parent: Parent) => Frame, boolean] =
      options.filter((o) => o[0] === FrameType.catchClause)[0];
    catchFrame[1] = "x";
    catchFrame[2] = "e<b>x</b>cept";
    const elseIfFrame: [FrameType, string, string, (parent: Parent) => Frame, boolean] =
      options.filter((o) => o[0] === FrameType.elseIfClause)[0];
    elseIfFrame[1] = "l";
    elseIfFrame[2] = "e<b>l</b>if";
  }
}
