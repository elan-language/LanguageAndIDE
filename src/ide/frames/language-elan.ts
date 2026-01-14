import { AbstractFunction } from "./class-members/abstract-function";
import { AbstractProcedure } from "./class-members/abstract-procedure";
import { AbstractProperty } from "./class-members/abstract-property";
import { Constructor } from "./class-members/constructor";
import { FunctionMethod } from "./class-members/function-method";
import { ProcedureMethod } from "./class-members/procedure-method";
import { Property } from "./class-members/property";
import { modifierAsHtml } from "./frame-helpers";
import { Frame } from "./frame-interfaces/frame";
import { Language } from "./frame-interfaces/language";
import { ParseNode } from "./frame-interfaces/parse-node";
import { AbstractClass } from "./globals/abstract-class";
import { ConcreteClass } from "./globals/concrete-class";
import { ConstantGlobal } from "./globals/constant-global";
import { Enum } from "./globals/enum";
import { GlobalComment } from "./globals/global-comment";
import { GlobalFunction } from "./globals/global-function";
import { GlobalProcedure } from "./globals/global-procedure";
import { InterfaceFrame } from "./globals/interface-frame";
import { MainFrame } from "./globals/main-frame";
import { RecordFrame } from "./globals/record-frame";
import { TestFrame } from "./globals/test-frame";
import { BinaryOperation } from "./parse-nodes/binary-operation";
import { ParamDefNode } from "./parse-nodes/param-def-node";
import { TypeGenericNode } from "./parse-nodes/type-generic-node";
import { AssertStatement } from "./statements/assert-statement";
import { CallStatement } from "./statements/call-statement";
import { CatchStatement } from "./statements/catch-statement";
import { CommentStatement } from "./statements/comment-statement";
import { ConstantStatement } from "./statements/constant-statement";
import { Each } from "./statements/each";
import { Elif } from "./statements/elif";
import { Else } from "./statements/else";
import { For } from "./statements/for";
import { IfStatement } from "./statements/if-statement";
import { Print } from "./statements/print";
import { ReturnStatement } from "./statements/return-statement";
import { SetStatement } from "./statements/set-statement";
import { Throw } from "./statements/throw";
import { TryStatement } from "./statements/try";
import { VariableStatement } from "./statements/variable-statement";
import { While } from "./statements/while";

export class LanguageElan implements Language {
  commentRegex(): RegExp {
    return /# [^\r\n]*/;
  }
  languageFullName: string = "Elan";

  annotation(frame: Frame): string {
    return frame ? "" : ""; //No *frame-specific* annotation needed for Elan (but must consume frame parameter!)
  }
  commentMarker(): string {
    return this.HASH;
  }
  renderSingleLineAsHtml(frame: Frame): string {
    let html = `Html not specified for this frame`;
    if (frame instanceof AssertStatement) {
      html = `<el-kw>assert </el-kw>${frame.actual.renderAsHtml()}<el-kw> is </el-kw>${frame.expected.renderAsHtml()}`;
    } else if (frame instanceof CallStatement) {
      html = `<el-kw>${this.CALL} </el-kw>${frame.proc.renderAsHtml()}<el-punc>(</el-punc>${frame.args.renderAsHtml()}<el-punc>)</el-punc>`;
    } else if (frame instanceof CatchStatement) {
      html = `<el-kw>${this.CATCH} ${this.EXCEPTION} ${this.IN} </el-kw>${frame.variable.renderAsHtml()}`;
    } else if (frame instanceof CommentStatement) {
      html = `<el-kw>${this.HASH} </el-kw>${frame.text.renderAsHtml()}`;
    } else if (frame instanceof ConstantGlobal) {
      // special case because the </el-top> needs to be placed part way through the line
      html = `<el-kw>${this.CONSTANT} </el-kw>${frame.name.renderAsHtml()}</el-top><el-kw> set to </el-kw>${frame.value.renderAsHtml()}`;
    } else if (frame instanceof Elif) {
      html = `<el-kw>${this.ELIF} </el-kw>${frame.condition.renderAsHtml()}<el-kw> ${this.THEN}`;
    } else if (frame instanceof Else) {
      html = `<el-kw>${this.ELSE}`;
    } else if (frame instanceof Enum) {
      html = `<el-kw>${this.ENUM} </el-kw>${frame.name.renderAsHtml()} ${frame.values.renderAsHtml()}`;
    } else if (frame instanceof GlobalComment) {
      html = `<el-kw>${this.HASH} </el-kw>${frame.text.renderAsHtml()}`;
    } else if (frame instanceof ConstantStatement) {
      html = `<el-kw>${this.CONSTANT} </el-kw>${frame.name.renderAsHtml()}<el-kw> ${this.SET} ${this.TO} </el-kw>${frame.expr.renderAsHtml()}`;
    } else if (frame instanceof Print) {
      html = `<el-kw>${this.PRINT} </el-kw>${frame.expr.renderAsHtml()}`;
    } else if (frame instanceof Property) {
      html = `${modifierAsHtml(frame)}<el-kw>${this.PROPERTY} </el-kw>${frame.name.renderAsHtml()}<el-kw> ${this.AS} </el-kw>${frame.type.renderAsHtml()}`;
    } else if (frame instanceof ReturnStatement) {
      html = `<el-kw>${this.RETURN} </el-kw>${frame.expr.renderAsHtml()}`;
    } else if (frame instanceof SetStatement) {
      html = `<el-kw>${this.SET} </el-kw>${frame.assignable.renderAsHtml()}<el-kw> ${this.TO} </el-kw>${frame.expr.renderAsHtml()}`;
    } else if (frame instanceof Throw) {
      html = `<el-kw>${this.THROW} ${this.EXCEPTION} </el-kw>${frame.text.renderAsHtml()}`;
    } else if (frame instanceof VariableStatement) {
      html = `<el-kw>${this.VARIABLE} </el-kw>${frame.name.renderAsHtml()}<el-kw> ${this.SET} ${this.TO} </el-kw>${frame.expr.renderAsHtml()}`;
    } else if (frame instanceof AbstractFunction) {
      html = `<el-kw>${this.ABSTRACT} ${this.FUNCTION} </el-kw><el-method>${frame.name.renderAsHtml()}</el-method><el-punc>(</el-punc>${frame.params.renderAsHtml()}<el-punc>)</el-punc><el-kw> ${this.RETURNS} </el-kw>${frame.returnType.renderAsHtml()}`;
    } else if (frame instanceof AbstractProcedure) {
      html = `<el-kw>${this.ABSTRACT} ${this.PROCEDURE} </el-kw><el-method>${frame.name.renderAsHtml()}</el-method><el-punc>(</el-punc>${frame.params.renderAsHtml()}<el-punc>)</el-punc>`;
    } else if (frame instanceof AbstractProperty) {
      html = ``;
    }
    return html;
  }

  renderSingleLineAsExport(frame: Frame): string {
    return frame ? "" : ""; // At least for the time being, there is no reason to export a file being presented as Elan
  }

  renderTopAsHtml(frame: Frame): string {
    let html = `Html not specified for this frame`;
    if (frame instanceof AbstractClass) {
      html = `<el-kw>${this.ABSTRACT} ${this.CLASS} </el-kw>${frame.name.renderAsHtml()} ${frame.inheritanceAsHtml()}`;
    } else if (frame instanceof ConcreteClass) {
      html = `<el-kw>${this.CLASS} </el-kw>${frame.name.renderAsHtml()} ${frame.inheritanceAsHtml()}`;
    } else if (frame instanceof Constructor) {
      html = `<el-kw>${this.CONSTRUCTOR}</el-kw><el-punc>(</el-punc>${frame.params.renderAsHtml()}<el-punc>)</el-punc>`;
    } else if (frame instanceof Each) {
      html = `<el-kw>${this.EACH} </el-kw>${frame.variable.renderAsHtml()}<el-kw> ${this.IN} </el-kw>${frame.iter.renderAsHtml()}`;
    } else if (frame instanceof For) {
      html = `<el-kw>${this.FOR} </el-kw>${frame.variable.renderAsHtml()}<el-kw> ${this.FROM} </el-kw>${frame.from.renderAsHtml()}<el-kw> ${this.TO} </el-kw>${frame.to.renderAsHtml()}<el-kw> ${this.STEP} </el-kw>${frame.step.renderAsHtml()}`;
    } else if (frame instanceof FunctionMethod) {
      html = `${modifierAsHtml(frame)}<el-kw>${this.FUNCTION} </el-kw>${frame.name.renderAsHtml()}<el-punc>(</el-punc>${frame.params.renderAsHtml()}<el-punc>)</el-punc><el-kw> ${this.RETURNS} </el-kw>${frame.returnType.renderAsHtml()}`;
    } else if (frame instanceof GlobalFunction) {
      html = `<el-kw>${this.FUNCTION} </el-kw>${frame.name.renderAsHtml()}<el-punc>(</el-punc>${frame.params.renderAsHtml()}<el-punc>)</el-punc><el-kw> ${this.RETURNS} </el-kw>${frame.returnType.renderAsHtml()}`;
    } else if (frame instanceof GlobalProcedure) {
      html = `<el-kw>${this.PROCEDURE} </el-kw>${frame.name.renderAsHtml()}<el-punc>(</el-punc>${frame.params.renderAsHtml()}<el-punc>)</el-punc>`;
    } else if (frame instanceof IfStatement) {
      html = `<el-kw>${this.IF} </el-kw>${frame.condition.renderAsHtml()}<el-kw> ${this.THEN}</el-kw>`;
    } else if (frame instanceof InterfaceFrame) {
      html = `<el-kw>${this.INTERFACE} </el-kw>${frame.name.renderAsHtml()} ${frame.inheritanceAsHtml()}`;
    } else if (frame instanceof MainFrame) {
      html = `<el-kw>${this.MAIN}</el-kw>`;
    } else if (frame instanceof ProcedureMethod) {
      html = `${modifierAsHtml(frame)}<el-kw>${this.PROCEDURE} </el-kw>${frame.name.renderAsHtml()}<el-punc>(</el-punc>${frame.params.renderAsHtml()}<el-punc>)</el-punc>`;
    } else if (frame instanceof RecordFrame) {
      html = `<el-kw>${this.RECORD} </el-kw>${frame.name.renderAsHtml()}`;
    } else if (frame instanceof TestFrame) {
      html = `<el-kw>${this.TEST} </el-kw>${frame.testName.renderAsHtml()}`;
    } else if (frame instanceof TryStatement) {
      html = `<el-kw>${this.TRY} </el-kw>`;
    } else if (frame instanceof While) {
      html = `<el-kw>${this.WHILE} </el-kw>${frame.condition.renderAsHtml()}`;
    }
    return html;
  }

  renderTopAsExport(frame: Frame): string {
    return frame ? "" : ""; // At least for the time being, there is no reason to export a file being presented as Elan
  }

  renderBottomAsHtml(frame: Frame): string {
    return `<el-kw>${this.END} ${frame.initialKeywords()}</el-kw>`;
  }

  renderBottomAsExport(frame: Frame): string {
    return frame ? "" : ""; // At least for the time being, there is no reason to export a file being presented as Elan
  }

  renderNodeAsHtml(node: ParseNode): string {
    let html = ""; // If "" returned the node will use its own generic implementation
    if (node instanceof TypeGenericNode) {
      html = `${node.simpleType?.renderAsHtml()}${node.generic?.renderAsHtml()}`;
    }
    return html;
  }

  // Not yet used - for illustration only
  grammarForNode(node: ParseNode): string {
    let grammar = "";
    if (node instanceof ParamDefNode) {
      grammar = "OUT? name SPACE AS SPACE type"; //We will be disallowing OUT shortly
    } else if (node instanceof BinaryOperation) {
      grammar = "IS | ISNT | PLUS | MINUS ..."; // etc
    } else if (node instanceof TypeGenericNode) {
      grammar = "LT OF SPACE type GT";
    }
    // etc.
    return grammar;
  }

  // Not yet used - for illustration only
  lexer(): string {
    return `
IS:           'is';
PLUS:         '+';
`; //etc.
  }

  private ABSTRACT = "abstract";
  private AND = "and";
  private AS = "as";
  private ASSERT = "assert";
  private BE = "be";
  private CALL = "call";
  private CATCH = "catch";
  private CLASS = "class";
  private CONSTANT = "constant";
  private CONSTRUCTOR = "constructor";
  private COPY = "copy";
  private DIV = "div";
  private EACH = "each";
  private ELIF = "elif";
  private ELSE = "else";
  private EMPTY = "empty";
  private END = "end";
  private ENUM = "enum";
  private EXCEPTION = "exception";
  private FOR = "for";
  private FROM = "from";
  private FUNCTION = "function";
  private GLOBAL = "global";
  private IF = "if";
  private IMAGE = "image";
  private IMPORT = "import";
  private IN = "in";
  private INHERITS = "inherits";
  private INTERFACE = "interface";
  private IS = "is";
  private ISNT = "isnt";
  private lambdaKeyword = "lambda";
  private letKeyword = "let";
  private LIBRARY = "library";
  private MAIN = "main";
  private MOD = "mod";
  private NEW = "new";
  private NOT = "not";
  private OF = "of";
  private OR = "or";
  private OUT = "out";
  private PRINT = "print";
  private PRIVATE = "private";
  private PROCEDURE = "procedure";
  private PROPERTY = "property";
  private RECORD = "record";
  private RETURN = "return";
  private RETURNS = "returns";
  private SET = "set";
  private STEP = "step";
  private TEST = "test";
  private THEN = "then";
  private THIS = "this";
  private THROW = "throw";
  private TO = "to";
  private TRY = "try";
  private TUPLE = "tuple";
  private VARIABLE = "variable";
  private WHILE = "while";
  private WITH = "with";

  private HASH = "#";
}
