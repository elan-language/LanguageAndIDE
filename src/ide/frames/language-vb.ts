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
import { Constant } from "./globals/constant";
import { Enum } from "./globals/enum";
import { GlobalComment } from "./globals/global-comment";
import { GlobalFunction } from "./globals/global-function";
import { GlobalProcedure } from "./globals/global-procedure";
import { InterfaceFrame } from "./globals/interface-frame";
import { MainFrame } from "./globals/main-frame";
import { RecordFrame } from "./globals/record-frame";
import { TestFrame } from "./globals/test-frame";
import { Index } from "./parse-nodes";
import { BinaryOperation } from "./parse-nodes/binary-operation";
import { InheritanceNode } from "./parse-nodes/inheritanceNode";
import { ParamDefNode } from "./parse-nodes/param-def-node";
import { TypeGenericNode } from "./parse-nodes/type-generic-node";
import { AssertStatement } from "./statements/assert-statement";
import { CallStatement } from "./statements/call-statement";
import { CatchStatement } from "./statements/catch-statement";
import { CommentStatement } from "./statements/comment-statement";
import { Each } from "./statements/each";
import { Elif } from "./statements/elif";
import { Else } from "./statements/else";
import { For } from "./statements/for";
import { IfStatement } from "./statements/if-statement";
import { LetStatement } from "./statements/let-statement";
import { Print } from "./statements/print";
import { ReturnStatement } from "./statements/return-statement";
import { SetStatement } from "./statements/set-statement";
import { Throw } from "./statements/throw";
import { TryStatement } from "./statements/try";
import { VariableStatement } from "./statements/variable-statement";
import { While } from "./statements/while";

export class LanguageVB implements Language {
  languageFullName: string = "VB";

  annotation(frame: Frame): string {
    return frame.frameSpecificAnnotation();
  }

  commentMarker(): string {
    return this.SINGLE_QUOTE;
  }
  renderSingleLineAsHtml(frame: Frame): string {
    let html = `Html not specified for this frame`;
    if (frame instanceof AssertStatement) {
      html = `<el-kw>assert </el-kw>${frame.actual.renderAsHtml()}<el-kw> is </el-kw>${frame.expected.renderAsHtml()}`;
    } else if (frame instanceof CallStatement) {
      html = `${frame.proc.renderAsHtml()}<el-punc>(</el-punc>${frame.args.renderAsHtml()}<el-punc>)<el-punc>`;
    } else if (frame instanceof CatchStatement) {
      html = `<el-kw>${this.CATCH} <el-type>Exception</el-type> ${this.IN} </el-kw>${frame.variable.renderAsHtml()}`;
    } else if (frame instanceof CommentStatement) {
      html = `<el-kw>${this.SINGLE_QUOTE} </el-kw>${frame.text.renderAsHtml()}`;
    } else if (frame instanceof Constant) {
      // special case because the </el-top> needs to be placed part way through the line
      html = `<el-kw>${this.CONST} </el-kw>${frame.name.renderAsHtml()}<el-kw></el-top><el-punc> = </el-punc>${frame.value.renderAsHtml()}`;
    } else if (frame instanceof Elif) {
      html = `<el-kw>${this.ELSEIF} </el-kw>${frame.condition.renderAsHtml()}<el-kw> ${this.THEN}`;
    } else if (frame instanceof Else) {
      html = `<el-kw>${this.ELSE}`;
    } else if (frame instanceof Enum) {
      html = `<el-kw>${this.ENUM} </el-kw>${frame.name.renderAsHtml()} ${frame.values.renderAsHtml()}`;
    } else if (frame instanceof GlobalComment) {
      html = `<el-kw>${this.SINGLE_QUOTE} </el-kw>${frame.text.renderAsHtml()}`;
    } else if (frame instanceof LetStatement) {
      html = `${frame.name.renderAsHtml()}<el-punc> = </el-punc>${frame.expr.renderAsHtml()}`;
    } else if (frame instanceof Print) {
      html = `<el-method>PRINT</el-method><el-punc>((</el-punc>${frame.expr.renderAsHtml()}<el-punc>).</el-punc><el-method>asString</el-method><el-punc>())</el-punc>`;
    } else if (frame instanceof Property) {
      html = `${modifierAsHtml(frame)}<el-kw>${this.PROPERTY} </el-kw>${frame.name.renderAsHtml()}<el-kw> ${this.AS} </el-kw>${frame.type.renderAsHtml()}`;
    } else if (frame instanceof ReturnStatement) {
      html = `<el-kw>${this.RETURN} </el-kw>${frame.expr.renderAsHtml()}`;
    } else if (frame instanceof SetStatement) {
      html = `${frame.assignable.renderAsHtml()}<el-punc> = </el-punc>${frame.expr.renderAsHtml()}`;
    } else if (frame instanceof Throw) {
      html = `<el-kw>${this.THROW} <el-type>Exception</el-type> </el-kw>${frame.text.renderAsHtml()}`;
    } else if (frame instanceof VariableStatement) {
      html = `<el-kw>${this.DIM} </el-kw>${frame.name.renderAsHtml()}<el-kw><el-punc> = </el-punc></el-kw>${frame.expr.renderAsHtml()}`;
    } else if (frame instanceof AbstractFunction) {
      html = `<el-kw>${this.ABSTRACT} ${this.FUNCTION} </el-kw><el-method>${frame.name.renderAsHtml()}</el-method><el-punc>(</el-punc>${frame.params.renderAsHtml()}<el-punc>)</el-punc><el-kw> ${this.AS} </el-kw>${frame.returnType.renderAsHtml()}`;
    } else if (frame instanceof AbstractProcedure) {
      html = `<el-kw>${this.ABSTRACT} ${this.SUB} </el-kw><el-method>${frame.name.renderAsHtml()}</el-method><el-punc>(</el-punc>${frame.params.renderAsHtml()}<el-punc>)</el-punc>`;
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
      html = `<el-kw>${this.PUBLIC} ${this.SUB} ${this.NEW}</el-kw><el-punc>(</el-punc>${frame.params.renderAsHtml()}<el-punc>)</el-punc>`;
    } else if (frame instanceof Each) {
      html = `<el-kw>${this.FOR} ${this.EACH} </el-kw>${frame.variable.renderAsHtml()}<el-kw> ${this.IN} </el-kw>${frame.iter.renderAsHtml()}`;
    } else if (frame instanceof For) {
      html = `<el-kw>${this.FOR} </el-kw>${frame.variable.renderAsHtml()}<el-punc> = </el-punc>${frame.from.renderAsHtml()}<el-kw> ${this.TO} </el-kw>${frame.to.renderAsHtml()}<el-kw> ${this.STEP} </el-kw>${frame.step.renderAsHtml()}`;
    } else if (frame instanceof FunctionMethod) {
      html = `${modifierAsHtml(frame)}<el-kw>${this.FUNCTION} </el-kw>${frame.name.renderAsHtml()}<el-punc>(</el-punc>${frame.params.renderAsHtml()}<el-punc>)</el-punc><el-kw> ${this.AS} </el-kw>${frame.returnType.renderAsHtml()}`;
    } else if (frame instanceof GlobalFunction) {
      html = `<el-kw>${this.FUNCTION} </el-kw>${frame.name.renderAsHtml()}<el-punc>(</el-punc>${frame.params.renderAsHtml()}<el-punc>)</el-punc><el-kw> ${this.AS} </el-kw>${frame.returnType.renderAsHtml()}`;
    } else if (frame instanceof GlobalProcedure) {
      html = `<el-kw>${this.SUB} </el-kw>${frame.name.renderAsHtml()}<el-punc>(</el-punc>${frame.params.renderAsHtml()}<el-punc>)</el-punc>`;
    } else if (frame instanceof IfStatement) {
      html = `<el-kw>${this.IF} </el-kw>${frame.condition.renderAsHtml()}<el-kw> ${this.THEN}</el-kw>`;
    } else if (frame instanceof InterfaceFrame) {
      html = `<el-kw>${this.INTERFACE} </el-kw>${frame.name.renderAsHtml()} ${frame.inheritanceAsHtml()}`;
    } else if (frame instanceof MainFrame) {
      html = `<el-kw>${this.SUB}</el-kw> <el-method>main</el-method><el-punc>()</el-punc>`;
    } else if (frame instanceof ProcedureMethod) {
      html = `${modifierAsHtml(frame)}<el-kw>${this.SUB} </el-kw>${frame.name.renderAsHtml()}<el-punc>(</el-punc>${frame.params.renderAsHtml()}<el-punc>)</el-punc>`;
    } else if (frame instanceof RecordFrame) {
      html = `<el-kw>${this.CLASS} </el-kw>${frame.name.renderAsHtml()}`;
    } else if (frame instanceof TestFrame) {
      html = `<el-kw>${this.SUB} </el-kw>${frame.testName.renderAsHtml()}`;
    } else if (frame instanceof TryStatement) {
      html = `<el-kw>${this.TRY} </el-kw>`;
    } else if (frame instanceof While) {
      html = `<el-kw>${this.WHILE} </el-kw>${frame.condition.renderAsHtml()}`;
    }
    return html;
  }

  renderTopAsExport(frame: Frame): string {
    return frame ? "" : ""; // TODO
  }

  renderBottomAsHtml(frame: Frame): string {
    let html = `Html not specified for this frame`;
    if (frame instanceof AbstractClass) {
      html = `<el-kw>${this.EMPTY} ${this.CLASS}`;
    } else if (frame instanceof ConcreteClass) {
      html = `<el-kw>${this.EMPTY} ${this.CLASS}`;
    } else if (frame instanceof Constructor) {
      html = `<el-kw>${this.EMPTY} ${this.SUB}`;
    } else if (frame instanceof Each) {
      html = `<el-kw>${this.EMPTY} ${this.NEXT}`;
    } else if (frame instanceof For) {
      html = `<el-kw>${this.EMPTY} ${this.NEXT}`;
    } else if (frame instanceof FunctionMethod) {
      html = `<el-kw>${this.EMPTY} ${this.FUNCTION}`;
    } else if (frame instanceof GlobalFunction) {
      html = `<el-kw>${this.EMPTY} ${this.FUNCTION}`;
    } else if (frame instanceof GlobalProcedure) {
      html = `<el-kw>${this.EMPTY} ${this.SUB}`;
    } else if (frame instanceof IfStatement) {
      html = `<el-kw>${this.EMPTY} ${this.IF}`;
    } else if (frame instanceof InterfaceFrame) {
      html = `<el-kw>${this.EMPTY} ${this.INTERFACE}`;
    } else if (frame instanceof MainFrame) {
      html = `<el-kw>${this.EMPTY} ${this.SUB}`;
    } else if (frame instanceof ProcedureMethod) {
      html = `<el-kw>${this.EMPTY} ${this.SUB}`;
    } else if (frame instanceof RecordFrame) {
      html = `<el-kw>${this.EMPTY} ${this.CLASS}`;
    } else if (frame instanceof TestFrame) {
      html = `<el-kw>${this.EMPTY} ${this.SUB}`;
    } else if (frame instanceof TryStatement) {
      html = `<el-kw>${this.EMPTY} ${this.TRY}`;
    } else if (frame instanceof While) {
      html = `<el-kw>${this.EMPTY} ${this.WHILE}`;
    }
    return html;
  }

  renderBottomAsExport(frame: Frame): string {
    return frame ? "" : ""; // At least for the time being, there is no reason to export a file being presented as Elan
  }

  renderNodeAsHtml(node: ParseNode): string {
    let html = ""; // If "" returned the node will use its own generic implementation
    if (node instanceof TypeGenericNode) {
      const generics = node.generic?.renderAsHtml();
      const chopped = generics?.substring(22, generics.length - 4);
      html =
        node.simpleType?.renderAsHtml() +
        `<el-punc>(</el-punc><el-kw>${this.OF} </el-kw><el-type>${chopped}</el-type><el-punc>)</el-punc>`;
    } else if (node instanceof ParamDefNode) {
      html = `${node.name?.renderAsHtml()}<el-kw> ${this.AS} </el-kw>${node.type?.renderAsHtml()}`;
    } else if (node instanceof BinaryOperation) {
      const open = node.keyword ? "<el-kw>" : "";
      const close = node.keyword ? "</el-kw>" : "";
      let text = node.matchedText.trim();
      if (text === "is") {
        text = this.spaced(this.EQUALS);
      } else if (text === "isnt") {
        text = this.spaced(this.NOT_EQUALS);
      } else if (text === "and") {
        text = this.spaced(this.AND);
      } else if (text === "or") {
        text = this.spaced(this.OR);
      } else if (text === "not") {
        text = this.spaced(this.NOT);
      } else if (text === "mod") {
        text = this.spaced(this.MOD);
      } else {
        text = node.renderAsElanSource();
      }
      html = `${open}${text}${close}`;
    } else if (node instanceof Index) {
      html = `<el-punc>(</el-punc>${node.contents?.renderAsHtml()}<el-punc>)</el-punc>`;
    } else if (node instanceof InheritanceNode) {
      html =
        node.matchedText.length > 0
          ? `<el-punc>(</el-punc>${node.typeList?.renderAsHtml()}<el-punc>)</el-punc>`
          : ``;
    }
    return html;
  }

  private spaced(text: string): string {
    return ` ${text} `;
  }

  // Not yet used - for illustration only
  grammarForNode(node: ParseNode): string {
    return node ? "" : "";
  }

  // Not yet used - for illustration only
  lexer(): string {
    return `
IS:           'is';
PLUS:         '+';
`; //etc.
  }

  private ABSTRACT = "abstract";
  private AND = "And";
  private AS = "As";
  private CATCH = "Catch";
  private CLASS = "Class";
  private CONST = "Const";
  private DIM = "Dim";
  private EACH = "Each";
  private ELSEIF = "ElseIf";
  private ELSE = "Else";
  private EMPTY = "End";
  private ENUM = "Enum";
  private FOR = "For";
  private FUNCTION = "Function";
  private IF = "If";
  private IN = "In";
  private INHERITS = "Inherits";
  private INTERFACE = "Interface";
  private IS = "Is";
  private MOD = "Mod";
  private NEW = "New";
  private NEXT = "Next";
  private NOT = "Not";
  private OF = "Of";
  private OR = "Or";
  private PRIVATE = "Private";
  private PROPERTY = "Property";
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
  private EQUALS = "=";
  private NOT_EQUALS = "<>";
}
