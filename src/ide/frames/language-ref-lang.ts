import { OperationSymbol } from "../../compiler/syntax-nodes/operation-symbol";
import { TerminalSymbol } from "../../compiler/syntax-nodes/terminal-symbol";
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

export class LanguageRefLang extends LanguageAbstract {
  private constructor() {
    super();
  }

  static Instance: Language = new LanguageRefLang();

  commentRegex(): RegExp {
    return /# [^\r\n]*/;
  }
  languageHtmlClass = "elan";
  languageFullName: string = "Reference Language";
  defaultFileExtension: string = "reflang";
  defaultMimeType: string = "text/plain";

  annotation(_frame: Frame): string {
    return "";
  }

  renderSingleLineAsHtml(frame: Frame): string {
    let html = `Html not specified for this frame`;
    if (frame instanceof AssertStatement) {
      html = `<el-kw>assert </el-kw>${frame.actual.renderAsHtml()}<el-kw> evaluates to </el-kw>${frame.expected.renderAsHtml()}`;
    } else if (frame instanceof ProcedureCall) {
      html = `<el-kw>call </el-kw>${frame.procRef.renderAsHtml()}`;
    } else if (frame instanceof CommentFrame) {
      html = frame.text.renderAsHtml();
    } else if (frame instanceof ConstantGlobal) {
      // special case because the </el-top> needs to be placed part way through the line
      html = `<el-kw>constant </el-kw>${frame.name.renderAsHtml()}</el-top><el-kw> set to </el-kw>${frame.value.renderAsHtml()}`;
    } else if (frame instanceof Enum) {
      html = `<el-kw>enum </el-kw>${frame.name.renderAsHtml()} ${frame.values.renderAsHtml()}`;
    } else if (frame instanceof Property) {
      html = `${this.modifierAsHtml(frame)}<el-kw>property </el-kw>${frame.name.renderAsHtml()}<el-kw> as </el-kw>${frame.type.renderAsHtml()}`;
    } else if (frame instanceof ReturnStatement) {
      html = `<el-kw>return </el-kw>${frame.expr.renderAsHtml()}`;
    } else if (frame instanceof Assignment) {
      html = `<el-kw>assign </el-kw>${frame.assignable.renderAsHtml()}<el-kw> to </el-kw>${frame.expr.renderAsHtml()}`;
    } else if (frame instanceof ThrowStatement) {
      html = `<el-kw>throw</el-kw> ${frame.type.renderAsHtml()} ${frame.text.renderAsHtml()}`;
    } else if (frame instanceof VariableDefinition) {
      html = `<el-kw>variable </el-kw>${frame.name.renderAsHtml()}<el-kw> set to </el-kw>${frame.expr.renderAsHtml()}`;
    } else if (frame instanceof AbstractFunction) {
      html = `<el-kw>abstract function </el-kw><el-method>${frame.name.renderAsHtml()}</el-method>(${frame.params.renderAsHtml()})<el-kw> returns </el-kw>${frame.returnType.renderAsHtml()}`;
    } else if (frame instanceof AbstractProcedure) {
      html = `<el-kw>abstract procedure </el-kw><el-method>${frame.name.renderAsHtml()}</el-method>(${frame.params.renderAsHtml()})`;
    }
    return html;
  }

  renderSingleLineAsSource(frame: Frame): string {
    let source = `Source not specified for this frame`;
    if (frame instanceof AssertStatement) {
      source = `${frame.indent()}${this.ghost(frame)}assert ${frame.actual.renderAsSource()} evaluates to ${frame.expected.renderAsSource()}`;
    } else if (frame instanceof ProcedureCall) {
      source = `${frame.indent()}${this.ghost(frame)}call ${frame.procRef.renderAsSource()}`;
    } else if (frame instanceof CommentFrame) {
      source = `${frame.indent()}${this.ghost(frame)}${frame.text.renderAsSource()}`;
    } else if (frame instanceof ConstantGlobal) {
      source = `${this.ghost(frame)}constant ${frame.name.renderAsSource()} set to ${frame.value.renderAsSource()}`;
    } else if (frame instanceof Enum) {
      source = `${this.ghost(frame)}enum ${frame.name.renderAsSource()} ${frame.values.renderAsSource()}`;
    } else if (frame instanceof Property) {
      source = `${frame.indent()}${this.ghost(frame)}${this.modifierAsSource(frame)}property ${frame.name.renderAsSource()} as ${frame.type.renderAsSource()}`;
    } else if (frame instanceof ReturnStatement) {
      source = `${frame.indent()}return ${frame.expr.renderAsSource()}`;
    } else if (frame instanceof Assignment) {
      source = `${frame.indent()}${this.ghost(frame)}assign ${frame.assignable.renderAsSource()} to ${frame.expr.renderAsSource()}`;
    } else if (frame instanceof ThrowStatement) {
      source = `${frame.indent()}${this.ghost(frame)}throw ${frame.type.renderAsSource()} ${frame.text.renderAsSource()}`;
    } else if (frame instanceof VariableDefinition) {
      source = `${frame.indent()}${this.ghost(frame)}variable ${frame.name.renderAsSource()} set to ${frame.expr.renderAsSource()}`;
    } else if (frame instanceof AbstractFunction) {
      source = `${frame.indent()}${this.ghost(frame)}abstract function ${frame.name.renderAsSource()}(${frame.params.renderAsSource()}) returns ${frame.returnType.renderAsSource()}`;
    } else if (frame instanceof AbstractProcedure) {
      source = `${frame.indent()}${this.ghost(frame)}abstract procedure ${frame.name.renderAsSource()}(${frame.params.renderAsSource()})`;
    }
    return source;
  }

  ghost(frame: Frame) {
    return frame.isGhostedExplicitly() ? `ghosted ` : ``;
  }

  renderTopAsHtml(frame: Frame): string {
    let html = `Html not specified for this frame`;
    if (frame instanceof AbstractClass) {
      html = `<el-kw>abstract class </el-kw>${frame.name.renderAsHtml()}${this.inheritsFromTextAsHtml(frame.inheritance)}`;
    } else if (frame instanceof ConcreteClass) {
      html = `<el-kw>class </el-kw>${frame.name.renderAsHtml()}${this.inheritsFromTextAsHtml(frame.inheritance)}`;
    } else if (frame instanceof Constructor) {
      html = `<el-kw>constructor</el-kw>(${frame.params.renderAsHtml()})`;
    } else if (frame instanceof CatchClause) {
      html = `<el-kw>catch </el-kw>${frame.variable.renderAsHtml()} <el-kw>as</el-kw> ${frame.exceptionType.renderAsHtml()}`;
    } else if (frame instanceof ElseIfClause) {
      html = `<el-kw>elif </el-kw>${frame.condition.renderAsHtml()}<el-kw> then`;
    } else if (frame instanceof ElseClause) {
      html = `<el-kw>else`;
    } else if (frame instanceof ForLoop) {
      html = `<el-kw>for </el-kw>${frame.variable.renderAsHtml()}<el-kw> in </el-kw>${frame.iter.renderAsHtml()}`;
    } else if (frame instanceof FunctionMethod) {
      html = `${this.modifierAsHtml(frame)}<el-kw>function </el-kw>${frame.name.renderAsHtml()}(${frame.params.renderAsHtml()})<el-kw> returns </el-kw>${frame.returnType.renderAsHtml()}`;
    } else if (frame instanceof GlobalFunction) {
      html = `<el-kw>function </el-kw>${frame.name.renderAsHtml()}(${frame.params.renderAsHtml()})<el-kw> returns </el-kw>${frame.returnType.renderAsHtml()}`;
    } else if (frame instanceof GlobalProcedure) {
      html = `<el-kw>procedure </el-kw>${frame.name.renderAsHtml()}(${frame.params.renderAsHtml()})`;
    } else if (frame instanceof ProcedureMethod) {
      html = `${this.modifierAsHtml(frame)}<el-kw>procedure </el-kw>${frame.name.renderAsHtml()}(${frame.params.renderAsHtml()})`;
    } else if (frame instanceof IfStatement) {
      html = `<el-kw>if </el-kw>${frame.condition.renderAsHtml()}<el-kw> then</el-kw>`;
    } else if (frame instanceof MainRoutine) {
      html = `<el-kw>main</el-kw>`;
    } else if (frame instanceof TestFrame) {
      html = `<el-kw>test </el-kw>${frame.testName.renderAsHtml()}`;
    } else if (frame instanceof ThenClause) {
      html = ``; // no top to ThenClause
    } else if (frame instanceof TryClause) {
      html = ``; // no top to ThenClause
    } else if (frame instanceof TryStatement) {
      html = `<el-kw>try </el-kw>`;
    } else if (frame instanceof WhileLoop) {
      html = `<el-kw>while </el-kw>${frame.condition.renderAsHtml()}`;
    }
    return html;
  }

  renderTopAsSource(frame: Frame): string {
    let source = `Source not specified for this frame`;
    if (frame instanceof AbstractClass) {
      source = `${this.ghost(frame)}abstract class ${frame.name.renderAsSource()}${this.inheritsFromTextAsSource(frame.inheritance)}`;
    } else if (frame instanceof ConcreteClass) {
      source = `${this.ghost(frame)}class ${frame.name.renderAsSource()}${this.inheritsFromTextAsSource(frame.inheritance)}`;
    } else if (frame instanceof Constructor) {
      source = `${this.ghost(frame)}constructor(${frame.params.renderAsSource()})`;
    } else if (frame instanceof CatchClause) {
      source = `${this.ghost(frame)}catch ${frame.variable.renderAsSource()} as ${frame.exceptionType.renderAsSource()}`;
    } else if (frame instanceof ElseIfClause) {
      source = `${this.ghost(frame)}elif ${frame.condition.renderAsSource()} then`;
    } else if (frame instanceof ElseClause) {
      source = `${this.ghost(frame)}else`;
    } else if (frame instanceof ForLoop) {
      source = `${this.ghost(frame)}for ${frame.variable.renderAsSource()} in ${frame.iter.renderAsSource()}`;
    } else if (frame instanceof FunctionMethod) {
      source = `${this.ghost(frame)}${this.modifierAsSource(frame)}function ${frame.name.renderAsSource()}(${frame.params.renderAsSource()}) returns ${frame.returnType.renderAsSource()}`;
    } else if (frame instanceof GlobalFunction) {
      source = `${this.ghost(frame)}function ${frame.name.renderAsSource()}(${frame.params.renderAsSource()}) returns ${frame.returnType.renderAsSource()}`;
    } else if (frame instanceof GlobalProcedure) {
      source = `${this.ghost(frame)}procedure ${frame.name.renderAsSource()}(${frame.params.renderAsSource()})`;
    } else if (frame instanceof ProcedureMethod) {
      source = `${this.ghost(frame)}${this.modifierAsSource(frame)}procedure ${frame.name.renderAsSource()}(${frame.params.renderAsSource()})`;
    } else if (frame instanceof IfStatement) {
      source = `${this.ghost(frame)}if ${frame.condition.renderAsSource()} then`;
    } else if (frame instanceof MainRoutine) {
      source = `${this.ghost(frame)}main`;
    } else if (frame instanceof TestFrame) {
      source = `${this.ghost(frame)}test ${frame.testName.renderAsSource()}`;
    } else if (frame instanceof ThenClause) {
      source = ``; // no top to ThenClause
    } else if (frame instanceof TryClause) {
      source = ``; // no top to ThenClause
    } else if (frame instanceof TryStatement) {
      source = `${this.ghost(frame)}try`;
    } else if (frame instanceof WhileLoop) {
      source = `${this.ghost(frame)}while ${frame.condition.renderAsSource()}`;
    }
    return source;
  }

  inheritsFromTextAsHtml(field: FieldImpl): string {
    const frame = field.getHolder() as ClassFrame;
    return frame.doesInherit() ? ` <el-kw>inherits</el-kw> ${field.renderAsHtml()}` : ``;
  }

  inheritsFromTextAsSource(field: FieldImpl): string {
    const frame = field.getHolder() as ClassFrame;
    return frame.doesInherit() ? ` inherits ${field.renderAsSource()}` : ``;
  }

  renderBottomAsHtml(frame: Frame): string {
    const source = this.renderBottomAsSource(frame);
    return source === "" ? "" : `<el-kw>${source}</el-kw>`;
  }

  renderBottomAsSource(frame: Frame): string {
    return this.commonRenderBottom(frame);
  }

  renderFileImportsAsHtml(): string {
    return "";
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
  renderFileTrailerAsSource(_f: FileImpl): string {
    return "";
  }

  postProcessHtml(html: string): string {
    return html;
  }

  GHOSTED = "[ghosted]";

  INT_NAME: string = "Int";
  FLOAT_NAME: string = "Float";
  BOOL_NAME: string = "Boolean";
  STRING_NAME: string = "String";
  LIST_NAME: string = "List";
  DICT_NAME: string = "Dictionary";
  FUNC_NAME: string = "Func";

  OVERRIDES = "";
  IMPLEMENTS = "";

  functionFrameFields(frame: FunctionFrame): Field[] {
    return this.default_functionFrameFields(frame);
  }

  assertStatementFields(frame: AssertStatement): Field[] {
    return this.default_assertStatementFields(frame);
  }

  private modifierAsHtml(member: MemberFrame): string {
    return member.isPrivate ? `<el-kw>private </el-kw>` : "";
  }
  private modifierAsSource(member: MemberFrame): string {
    return member.isPrivate ? `private ` : "";
  }

  customiseStatementOptions(_options: [FrameType, string, string, boolean][]): void {
    // does nothing
  }

  COMMENT_MARKER = "#";

  private opMap = new Map<OperationSymbol, string>([
    [OperationSymbol.Add, "+"],
    [OperationSymbol.Minus, "-"],
    [OperationSymbol.Not, "not"],
    [OperationSymbol.Multiply, "*"],
    [OperationSymbol.And, "and"],
    [OperationSymbol.Equals, "is"],
    [OperationSymbol.LT, "<"],
    [OperationSymbol.GT, ">"],
    [OperationSymbol.GTE, ">="],
    [OperationSymbol.LTE, "<="],
    [OperationSymbol.Div, "div"],
    [OperationSymbol.Mod, "mod"],
    [OperationSymbol.Divide, "/"],
    [OperationSymbol.NotEquals, "isnt"],
    [OperationSymbol.Or, "or"],
    [OperationSymbol.Power, "^"],
  ]);

  private terminalMap = new Map<TerminalSymbol, string>([
    [TerminalSymbol.True, "true"],
    [TerminalSymbol.False, "false"],
    [TerminalSymbol.GenericStart, "<of "],
    [TerminalSymbol.GenericEnd, ">"],
    [TerminalSymbol.ThisInstance, "this"],
    [TerminalSymbol.Comment, "#"],
  ]);

  override mapOperation(op: string): OperationSymbol {
    op = op.trim();

    for (const e of this.opMap.entries()) {
      if (e[1] === op) {
        return e[0];
      }
    }
    return OperationSymbol.Unknown;
  }

  override mapOperationSymbol(op: OperationSymbol): string {
    if (op === OperationSymbol.Multiply || op === OperationSymbol.Divide) {
      return this.opMap.get(op)!;
    }

    return ` ${this.opMap.get(op) ?? ""} `;
  }

  mapTerminal(term: string): TerminalSymbol {
    term = term.trim();

    for (const e of this.terminalMap.entries()) {
      if (e[1] === term) {
        return e[0];
      }
    }
    return TerminalSymbol.Unknown;
  }

  mapTerminalSymbol(termSymbol: TerminalSymbol): string {
    return this.terminalMap.get(termSymbol) ?? "";
  }
}
