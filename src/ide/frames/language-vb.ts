import { AbstractFunction } from "./class-members/abstract-function";
import { AbstractProcedure } from "./class-members/abstract-procedure";
import { Constructor } from "./class-members/constructor";
import { FunctionMethod } from "./class-members/function-method";
import { ProcedureMethod } from "./class-members/procedure-method";
import { Property } from "./class-members/property";
import { CommentFrame } from "./comment-frame";
import { FileImpl } from "./file-impl";
import { Field } from "./frame-interfaces/field";
import { Frame } from "./frame-interfaces/frame";
import { Language } from "./frame-interfaces/language";
import { MemberFrame } from "./frame-interfaces/member-frame";
import { AbstractClass } from "./globals/abstract-class";
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

export class LanguageVB extends LanguageAbstract {
  private constructor() {
    super();
  }

  static Instance: Language = new LanguageVB();

  commentRegex(): RegExp {
    return /' [^\r\n]*/;
  }
  languageHtmlClass = "vb";
  languageFullName: string = "VB.NET";
  defaultFileExtension: string = "vb";
  defaultMimeType: string = "text/plain";

  annotation(frame: Frame): string {
    let annotation = "";
    if (
      frame instanceof VariableStatement ||
      frame instanceof ProcedureFrame ||
      frame instanceof ProcedureCall ||
      frame instanceof Assignment
    ) {
      annotation = frame.frameSpecificAnnotation();
    }
    return annotation;
  }

  renderSingleLineAsHtml(frame: Frame): string {
    let html = `Html not specified for this frame`;
    if (frame instanceof AssertStatement) {
      html = `<el-type>Assert</el-type>.<el-method>AreEqual</el-method>(${frame.expected.renderAsHtml()}, ${frame.actual.renderAsHtml()})`;
    } else if (frame instanceof ProcedureCall) {
      html = `${frame.procRef.renderAsHtml()}`;
    } else if (frame instanceof CommentFrame) {
      html = `<el-kw>${this.SINGLE_QUOTE} </el-kw>${frame.text.renderAsHtml()}`;
    } else if (frame instanceof ConstantGlobal) {
      // special case because the </el-top> needs to be placed part way through the line
      html = `<el-kw>${this.CONST} </el-kw>${frame.name.renderAsHtml()}<el-kw></el-top><el-punc> = </el-punc>${frame.value.renderAsHtml()}`;
    } else if (frame instanceof ElseIfClause) {
      html = `<el-kw>${this.ELSEIF} </el-kw>${frame.condition.renderAsHtml()}<el-kw> ${this.THEN}`;
    } else if (frame instanceof ElseClause) {
      html = `<el-kw>${this.ELSE}`;
    } else if (frame instanceof Enum) {
      html = `<el-kw>${this.ENUM}</el-kw> ${frame.name.renderAsHtml()} ${frame.values.renderAsHtml()}`;
    } else if (frame instanceof Property) {
      html = `${this.modifierAsHtml(frame)}<el-kw>${this.PROPERTY} </el-kw>${frame.name.renderAsHtml()}<el-kw> ${this.AS} </el-kw>${frame.type.renderAsHtml()}`;
    } else if (frame instanceof ReturnStatement) {
      html = `<el-kw>${this.RETURN} </el-kw>${frame.expr.renderAsHtml()}`;
    } else if (frame instanceof Assignment) {
      html = `${frame.assignable.renderAsHtml()} = ${frame.expr.renderAsHtml()}`;
    } else if (frame instanceof ThrowStatement) {
      html = `<el-kw>${this.THROW} ${this.NEW_INSTANCE_PREFIX} </el-kw>${frame.type.renderAsHtml()}(${frame.text.renderAsHtml()})`;
    } else if (frame instanceof VariableStatement) {
      html = `<el-kw>${this.DIM} </el-kw>${frame.name.renderAsHtml()}<el-kw> = </el-kw>${frame.expr.renderAsHtml()}`;
    } else if (frame instanceof AbstractFunction) {
      html = `<el-kw>${this.MUST_OVERRIDE} ${this.FUNCTION} </el-kw><el-method>${frame.name.renderAsHtml()}</el-method>(${frame.params.renderAsHtml()})<el-kw> ${this.AS} </el-kw>${frame.returnType.renderAsHtml()}`;
    } else if (frame instanceof AbstractProcedure) {
      html = `<el-kw>${this.MUST_OVERRIDE} ${this.SUB} </el-kw><el-method>${frame.name.renderAsHtml()}</el-method>(${frame.params.renderAsHtml()})`;
    }
    return html;
  }

  renderTopAsHtml(frame: Frame): string {
    let html = `Html not specified for this frame`;
    if (frame instanceof AbstractClass) {
      html = `<el-kw>${this.MUST_INHERIT} ${this.CLASS} </el-kw>${frame.name.renderAsHtml()}${frame.inheritance.renderAsHtml()}`;
    } else if (frame instanceof ConcreteClass) {
      html = `<el-kw>${this.CLASS} </el-kw>${frame.name.renderAsHtml()}${frame.inheritance.renderAsHtml()}`;
    } else if (frame instanceof Constructor) {
      html = `<el-kw>${this.SUB} ${this.NEW_INSTANCE_PREFIX}</el-kw>(${frame.params.renderAsHtml()})`;
    } else if (frame instanceof CatchClause) {
      html = `<el-kw>${this.CATCH}</el-kw> ${frame.variable.renderAsHtml()} <el-kw>${this.AS}</el-kw> ${frame.exceptionType.renderAsHtml()}`;
    } else if (frame instanceof ForLoop) {
      html = `<el-kw>${this.FOR} ${this.EACH} </el-kw>${frame.variable.renderAsHtml()}<el-kw> ${this.IN} </el-kw>${frame.iter.renderAsHtml()}`;
    } else if (frame instanceof GlobalFunction) {
      html = `<el-kw>${this.FUNCTION} </el-kw>${frame.name.renderAsHtml()}(${frame.params.renderAsHtml()})<el-kw> ${this.AS} </el-kw>${frame.returnType.renderAsHtml()}`;
    } else if (frame instanceof GlobalProcedure) {
      html = `<el-kw>${this.SUB} </el-kw>${frame.name.renderAsHtml()}(${frame.params.renderAsHtml()})`;
    } else if (frame instanceof IfStatement) {
      html = `<el-kw>${this.IF} </el-kw>${frame.condition.renderAsHtml()}<el-kw> ${this.THEN}</el-kw>`;
    } else if (frame instanceof MainRoutine) {
      html = `<el-kw>${this.SUB}</el-kw> <el-method>main</el-method>()`;
    } else if (frame instanceof FunctionMethod) {
      html = `${this.modifierAsHtml(frame)}${this.overrides(frame)}<el-kw>${this.FUNCTION} </el-kw>${frame.name.renderAsHtml()}(${frame.params.renderAsHtml()})<el-kw> ${this.AS} </el-kw>${frame.returnType.renderAsHtml()}${this.implements(frame)}`;
    } else if (frame instanceof ProcedureMethod) {
      html = `${this.modifierAsHtml(frame)}${this.overrides(frame)}<el-kw>${this.SUB} </el-kw>${frame.name.renderAsHtml()}(${frame.params.renderAsHtml()})${this.implements(frame)}`;
    } else if (frame instanceof TestFrame) {
      html = `&lt;<el-type>TestClass</el-type> <el-kw>${this.CLASS}</el-kw> ${this.testClassNameAsHtml(frame)}<br>&nbsp;&lt;<el-type>TestMethod</el-type>&gt; <el-kw>${this.SUB} </el-kw>${frame.testName.renderAsHtml()}()`;
    } else if (frame instanceof TryStatement) {
      html = `<el-kw>${this.TRY} </el-kw>`;
    } else if (frame instanceof WhileLoop) {
      html = `<el-kw>${this.WHILE} </el-kw>${frame.condition.renderAsHtml()}`;
    }
    return html;
  }

  private modifierAsHtml(member: MemberFrame): string {
    let modifier = "";
    if (member.isPrivate && member.isOnAbstractClass()) {
      modifier = this.PROTECTED;
    } else if (member.isPrivate) {
      modifier = this.PRIVATE;
    }
    return modifier === "" ? "" : `<el-kw>${modifier} </el-kw>`;
  }

  renderBottomAsHtml(frame: Frame): string {
    let html = `Html not specified for this frame`;
    if (frame instanceof AbstractClass) {
      html = `<el-kw>${this.END} ${this.CLASS}</el-kw>`;
    } else if (frame instanceof ConcreteClass) {
      html = `<el-kw>${this.END} ${this.CLASS}</el-kw>`;
    } else if (frame instanceof Constructor) {
      html = `<el-kw>${this.END} ${this.SUB}</el-kw>`;
    } else if (frame instanceof ForLoop) {
      html = `<el-kw>${this.NEXT}</el-kw> <el-id>${frame.variable.renderAsElanSource()}</el-id>`;
    } else if (frame instanceof GlobalFunction || frame instanceof FunctionMethod) {
      html = `<el-kw>${this.END} ${this.FUNCTION}</el-kw>`;
    } else if (frame instanceof GlobalProcedure || frame instanceof ProcedureMethod) {
      html = `<el-kw>${this.END} ${this.SUB}</el-kw>`;
    } else if (frame instanceof IfStatement) {
      html = `<el-kw>${this.END} ${this.IF}</el-kw>`;
    } else if (frame instanceof MainRoutine) {
      html = `<el-kw>${this.END} ${this.SUB}</el-kw>`;
    } else if (frame instanceof TestFrame) {
      html = `<el-punc>&nbsp;</el-punc><el-kw>${this.END} ${this.SUB}</el-kw><br><el-kw>${this.END} ${this.CLASS}</el-kw><br>`;
    } else if (frame instanceof TryStatement) {
      html = `<el-kw>${this.END} ${this.TRY}</el-kw>`;
    } else if (frame instanceof WhileLoop) {
      html = `<el-kw>${this.END} ${this.WHILE}</el-kw>`;
    }
    return html;
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
    return html.replaceAll("[", "(").replaceAll("]", ")");
  }

  private AS = "As";
  private CATCH = "Catch";
  private CLASS = "Class";
  private CONST = "Const";
  private DIM = "Dim";
  private EACH = "Each";
  private ELSEIF = "ElseIf";
  private ELSE = "Else";
  private END = "End";
  private ENUM = "Enum";
  private FOR = "For";
  private FUNCTION = "Function";
  private IF = "If";
  private IN = "In";
  private INHERITS = "Inherits";
  private INTERFACE = "Interface";
  private IS = "Is";
  private ME = "Me";
  private MUST_INHERIT = "MustInherit";
  private MUST_OVERRIDE = "MustOverride";
  private NEW = "New";
  private NEXT = "Next";
  private OF = "Of";
  private PRIVATE = "Private";
  private PROPERTY = "Property";
  private PROTECTED = "Protected";
  private PUBLIC = "Public";
  private RETURN = "Return";
  private STEP = "Step";
  private SUB = "Sub";
  private THEN = "Then";
  private THROW = "Throw";
  private TO = "To";
  private TRY = "Try";
  private WHILE = "While";

  private SINGLE_QUOTE = "'";

  EQUAL: string = "=";
  NOT_EQUAL: string = "<>";
  MOD = "Mod";
  AND = "And";
  OR = "Or";
  NOT = "Not";

  COMMENT_MARKER: string = this.SINGLE_QUOTE;
  LIST_START: string = "{";
  LIST_END: string = "}";
  INTERPOLATED_STRING_PREFIX: string = "$";

  INT_NAME: string = "Integer";
  FLOAT_NAME: string = "Double";
  BOOL_NAME: string = "Boolean";
  STRING_NAME: string = "String";
  LIST_NAME: string = "List";
  NEW_INSTANCE_PREFIX = this.NEW;
  FUNC_NAME: string = "Func";

  TRUE: string = "True";
  FALSE: string = "False";
  BINARY_PREFIX: string = "&B";
  HEX_PREFIX: string = "&H";

  START_OF_GENERIC: string = `(${this.OF} `;
  END_OF_GENERIC: string = `)`;
  THIS_INSTANCE: string = this.ME;
  OVERRIDES = "Overrides";
  IMPLEMENTS = "Implements";

  TUPLE_START = "[";
  TUPLE_END = "]";

  EXPRESSION_KEYWORDS: string[] = [this.NEW, this.FUNCTION, this.ME, this.NOT];
  DISALLOWED_IDENTIFIERS: string[] = [this.ME, this.FUNCTION, this.NOT, this.TRUE, this.FALSE];

  functionFrameFields(frame: FunctionFrame): Field[] {
    return this.default_functionFrameFields(frame);
  }
  assertStatementFields(frame: AssertStatement): Field[] {
    return [frame.expected, frame.actual];
  }

  reservedWords: Set<string> = new Set<string>([
    `addhandler`,
    `addressof`,
    `alias`,
    `and`,
    `andalso`,
    `as`,
    `boolean`,
    `byref`,
    `byte`,
    `byval`,
    `call`,
    `case`,
    `catch`,
    `cbool`,
    `cbyte`,
    `cchar`,
    `cdate`,
    `cdbl`,
    `cdec`,
    `char`,
    `cint`,
    `class`,
    `class`,
    `clng`,
    `cobj`,
    `const`,
    `constraint`,
    `continue`,
    `csbyte`,
    `cshort`,
    `csng`,
    `cstr`,
    `ctype`,
    `cuint`,
    `culng`,
    `cushort`,
    `date`,
    `decimal`,
    `declare`,
    `default`,
    `delegate`,
    `dim`,
    `directcast`,
    `do`,
    `double`,
    `each`,
    `else`,
    `elseif`,
    `end`,
    `endif`,
    `enum`,
    `erase`,
    `error`,
    `event`,
    `exit`,
    `false`,
    `finally`,
    `for`,
    `for`,
    `friend`,
    `function`,
    `get`,
    `gettype`,
    `getxmlnamespace`,
    `global`,
    `gosub`,
    `goto`,
    `handles`,
    `if`,
    `implements`,
    `imports`,
    `in`,
    `inherits`,
    `integer`,
    `interface`,
    `is`,
    `isnot`,
    `let`,
    `lib`,
    `like`,
    `long`,
    `loop`,
    `me`,
    `mod`,
    `module`,
    `mustinherit`,
    `mustoverride`,
    `mybase`,
    `myclass`,
    `nameof`,
    `namespace`,
    `narrowing`,
    `new`,
    `next`,
    `not`,
    `nothing`,
    `notinheritable`,
    `notoverridable`,
    `object`,
    `of`,
    `on`,
    `operator`,
    `option`,
    `optional`,
    `or`,
    `orelse`,
    `out`,
    `overloads`,
    `overridable`,
    `overrides`,
    `paramarray`,
    `partial`,
    `private`,
    `property`,
    `protected`,
    `public`,
    `raiseevent`,
    `readonly`,
    `redim`,
    `rem`,
    `removehandler`,
    `resume`,
    `return`,
    `sbyte`,
    `select`,
    `set`,
    `shadows`,
    `shared`,
    `short`,
    `single`,
    `static`,
    `step`,
    `stop`,
    `string`,
    `structure`,
    `sub`,
    `synclock`,
    `then`,
    `throw`,
    `to`,
    `true`,
    `try`,
    `trycast`,
    `typeof`,
    `uinteger`,
    `ulong`,
    `ushort`,
    `using`,
    `variant`,
    `wend`,
    `when`,
    `while`,
    `widening`,
    `with`,
    `withevents`,
    `writeonly`,
    `xor`,
  ]);
}
