import {} from "../../compiler/keywords";
import { AbstractFunction } from "./class-members/abstract-function";
import { AbstractProcedure } from "./class-members/abstract-procedure";
import { AbstractProperty } from "./class-members/abstract-property";
import { Constructor } from "./class-members/constructor";
import { FunctionMethod } from "./class-members/function-method";
import { ProcedureMethod } from "./class-members/procedure-method";
import { Property } from "./class-members/property";
import { selfType } from "./frame-helpers";
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

export class LanguagePython implements Language {
  languageFullName: string = "Python";

  annotation(frame: Frame): string {
    return frame.frameSpecificAnnotation();
  }

  commentMarker(): string {
    return this.hash;
  }

  renderSingleLineAsHtml(frame: Frame): string {
    let html = `Html not specified for ${typeof frame}`;
    if (frame instanceof AbstractFunction) {
      html = `TBD`;
    } else if (frame instanceof AbstractProcedure) {
      html = `TBD`;
    } else if (frame instanceof AbstractProperty) {
      html = `TBD`;
    } else if (frame instanceof AssertStatement) {
      html = `<el-method>assertEqual</el-method>(${frame.actual.renderAsHtml()}, ${frame.expected.renderAsHtml()})`;
    } else if (frame instanceof CallStatement) {
      html = `${frame.proc.renderAsHtml()}<el-punc>(</el-punc>${frame.args.renderAsHtml()}<el-punc>)</el-punc>`;
    } else if (frame instanceof CatchStatement) {
      html = `${this.exceptKeyword}<el-punc>:</el-punc>`;
    } else if (frame instanceof CommentStatement) {
      html = `<el-kw>${this.hash} </el-kw>${frame.text.renderAsHtml()}`;
    } else if (frame instanceof Constant) {
      html = `${frame.name.renderAsHtml()}<el-punc> = </el-punc>${frame.value.renderAsHtml()}`;
    } else if (frame instanceof Elif) {
      html = `<el-kw>${this.elifKeyword} </el-kw>${frame.condition.renderAsHtml()}<el-punc>:</el-punc>`;
    } else if (frame instanceof Else) {
      html = `<el-kw>${this.elseKeyword}</el-kw><el-punc>:</el-punc>`;
    } else if (frame instanceof Enum) {
      html = `${frame.name.renderAsHtml()} = <el-type>Enum</el-type>('${frame.name.renderAsHtml()}', '${frame.values.renderAsHtml()}')`;
    } else if (frame instanceof GlobalComment) {
      html = `<el-kw>${this.hash} </el-kw>${frame.text.renderAsHtml()}`;
    } else if (frame instanceof LetStatement) {
      html = `${frame.name.renderAsHtml()}<el-punc> = </el-punc>${frame.expr.renderAsHtml()}`;
    } else if (frame instanceof Print) {
      html = `<el-method>print</el-method><el-punc>(</el-punc>${frame.expr.renderAsHtml()}<el-punc>)</el-punc>`;
    } else if (frame instanceof Property) {
      html = `${frame.name.renderAsHtml()}: ${frame.type.renderAsHtml()} = <el-kw>${this.noneKeyword}</el-kw>`;
    } else if (frame instanceof ReturnStatement) {
      html = `<el-kw>${this.returnKeyword} </el-kw>${frame.expr.renderAsHtml()}`;
    } else if (frame instanceof SetStatement) {
      html = `${frame.assignable.renderAsHtml()}<el-punc> = </el-punc>${frame.expr.renderAsHtml()}`;
    } else if (frame instanceof Throw) {
      html = `<el-kw>${this.raiseKeyword}</el-kw><el-punc>("</el-punc>${frame.text.renderAsHtml()}<el-punc>")</el-punc>`;
    } else if (frame instanceof VariableStatement) {
      html = `${frame.name.renderAsHtml()}<el-punc> = </el-punc>${frame.expr.renderAsHtml()}`;
    }
    return html;
  }

  renderSingleLineAsExport(frame: Frame): string {
    let source = `Source not specified for ${typeof frame}`;
    if (frame instanceof AbstractFunction) {
      source = `TBD`;
    } else if (frame instanceof AbstractProcedure) {
      source = `TBD`;
    } else if (frame instanceof AbstractProperty) {
      source = `TBD`;
    } else if (frame instanceof AssertStatement) {
      source = `assertEqual(${frame.actual.renderAsExport()}, ${frame.expected.renderAsExport()})`;
    } else if (frame instanceof CallStatement) {
      source = `${frame.proc.renderAsExport()}<el-punc>(</el-punc>${frame.args.renderAsExport()}<el-punc>)</el-punc>`;
    } else if (frame instanceof CatchStatement) {
      source = `${this.exceptKeyword}<el-punc>:</el-punc>`;
    } else if (frame instanceof CommentStatement) {
      source = `<el-kw>${this.hash} </el-kw>${frame.text.renderAsExport()}`;
    } else if (frame instanceof Constant) {
      source = `${frame.name.renderAsExport()}<el-punc> = </el-punc>${frame.value.renderAsExport()}`;
    } else if (frame instanceof Elif) {
      source = `<el-kw>${this.elifKeyword} </el-kw>${frame.condition.renderAsExport()}<el-punc>:</el-punc>`;
    } else if (frame instanceof Else) {
      source = `<el-kw>${this.elseKeyword}</el-kw><el-punc>:</el-punc>`;
    } else if (frame instanceof Enum) {
      source = `${frame.name.renderAsExport()} = <el-type>Enum</el-type>('${frame.name.renderAsExport()}', '${frame.values.renderAsExport()}')`;
    } else if (frame instanceof GlobalComment) {
      source = `<el-kw>${this.hash} </el-kw>${frame.text.renderAsExport()}`;
    } else if (frame instanceof LetStatement) {
      source = `${frame.name.renderAsExport()}<el-punc> = </el-punc>${frame.expr.renderAsExport()}`;
    } else if (frame instanceof Print) {
      source = `<el-method>print</el-method><el-punc>(</el-punc>${frame.expr.renderAsExport()}<el-punc>)</el-punc>`;
    } else if (frame instanceof Property) {
      source = `${frame.name.renderAsExport()}: ${frame.type.renderAsExport()} = <el-kw>${this.noneKeyword}</el-kw>`;
    } else if (frame instanceof ReturnStatement) {
      source = `<el-kw>${this.returnKeyword} </el-kw>${frame.expr.renderAsExport()}`;
    } else if (frame instanceof SetStatement) {
      source = `${frame.assignable.renderAsExport()}<el-punc> = </el-punc>${frame.expr.renderAsExport()}`;
    } else if (frame instanceof Throw) {
      source = `<el-kw>${this.raiseKeyword}</el-kw><el-punc>("</el-punc>${frame.text.renderAsExport()}<el-punc>")</el-punc>`;
    } else if (frame instanceof VariableStatement) {
      source = `${frame.name.renderAsExport()}<el-punc> = </el-punc>${frame.expr.renderAsExport()}`;
    }
    return source;
  }

  renderTopAsHtml(frame: Frame): string {
    let html = `Html not specified for ${typeof frame}`;
    if (frame instanceof AbstractClass) {
      html = `<el-kw>${this.classKeyword} </el-kw><el-type>${frame.name.renderAsHtml()}</el-type>${frame.inheritanceAsHtml()}`;
    } else if (frame instanceof ConcreteClass) {
      html = `<el-kw>${this.classKeyword} </el-kw><el-type>${frame.name.renderAsHtml()}</el-type>${frame.inheritanceAsHtml()}`;
    } else if (frame instanceof Constructor) {
      html = `<el-kw>${this.defKeyword} </el-kw><el-punc>(</el-punc><el-kw>${this.selfKeyword}</el-kw>: ${selfType(frame)},${frame.params.renderAsHtml()}<el-punc>):</el-punc> <el-kw>none</el-kw>`;
    } else if (frame instanceof Each) {
      html = `<el-kw>${this.forKeyword} </el-kw>${frame.variable.renderAsHtml()}<el-kw> ${this.inKeyword} </el-kw>${frame.iter.renderAsHtml()}<el-punc>:</el-punc>`;
    } else if (frame instanceof Enum) {
      html = ``;
    } else if (frame instanceof For) {
      html = `<el-kw>${this.forKeyword} </el-kw>${frame.variable.renderAsHtml()}<el-kw> ${this.inKeyword} </el-kw><el-method>range</el-method>(${frame.from.renderAsHtml()}, ${frame.to.renderAsHtml()}, ${frame.step.renderAsHtml()})<el-punc>:</el-punc>`;
    } else if (frame instanceof FunctionMethod) {
      html = `<el-kw>${this.defKeyword} </el-kw>${frame.name.renderAsHtml()}<el-punc>(</el-punc>${this.selfKeyword}<el-punc>: </el-punc>${selfType(frame)}<el-punc>, </el-punc>${frame.params.renderAsHtml()}<el-punc>) -> </el-punc>${frame.returnType.renderAsHtml()}<el-punc>:</el-punc>`;
    } else if (frame instanceof GlobalFunction) {
      html = `<el-kw>${this.defKeyword} </el-kw>${frame.name.renderAsHtml()}<el-punc>(</el-punc>${frame.params.renderAsHtml()}<el-punc>) -> </el-punc>${frame.returnType.renderAsHtml()}<el-punc>:</el-punc>`;
    } else if (frame instanceof GlobalProcedure) {
      html = `<el-kw>${this.defKeyword} </el-kw>${frame.name.renderAsHtml()}<el-punc>(</el-punc>${frame.params.renderAsHtml()}<el-punc>) -> <el-punc><el-kw>${this.noneKeyword}</el-kw></el-punc><el-punc>:</el-punc>`;
    } else if (frame instanceof IfStatement) {
      html = `<el-kw>${this.ifKeyword} </el-kw>${frame.condition.renderAsHtml()}<el-punc>:</el-punc>`;
    } else if (frame instanceof InterfaceFrame) {
      html = `<el-kw>${this.classKeyword} </el-kw><el-type>${frame.name.renderAsHtml()}</el-type>${frame.inheritanceAsHtml()}`;
    } else if (frame instanceof MainFrame) {
      html = `<el-kw>${this.defKeyword} </el-kw><el-method>main</el-method>(): <el-kw>${this.noneKeyword}</el-kw><el-punc>:</el-punc>`;
    } else if (frame instanceof ProcedureMethod) {
      html = `<el-kw>${this.defKeyword} </el-kw>${frame.name.renderAsHtml()}<el-punc>(</el-punc><el-kw>${this.selfKeyword}</el-kw><el-punc>: </el-punc>${selfType(frame)}<el-punc>, </el-punc>${frame.params.renderAsHtml()}<el-punc>) -> </el-punc><el-kw>${this.noneKeyword}</el-kw><el-punc>:</el-punc>`;
    } else if (frame instanceof Property) {
      html = ``;
    } else if (frame instanceof RecordFrame) {
      html = `<el-kw>${this.classKeyword} </el-kw><el-type>${frame.name.renderAsHtml()}</el-type>`;
    } else if (frame instanceof TestFrame) {
      html = `<el-kw>${this.defKeyword} </el-kw> <el-method>test_${frame.testName.renderAsElanSource()}</el-method><el-punc>()-> </el-punc><el-kw>${this.noneKeyword}</el-kw><el-punc>:</el-punc>`;
    } else if (frame instanceof TryStatement) {
      html = `${this.tryKeyword}<el-punc>:</el-punc>`;
    } else if (frame instanceof While) {
      html = `<el-kw>${this.whileKeyword} </el-kw>${frame.condition.renderAsHtml()}<el-punc>:</el-punc>`;
    }
    return html;
  }

  renderTopAsExport(frame: Frame): string {
    return frame ? "TBD" : "TBD";
  }

  renderBottomAsHtml(frame: Frame): string {
    return frame ? "" : ""; // Python blocks have no textual ending;
  }

  renderBottomAsExport(frame: Frame): string {
    return frame ? "TBD" : "TBD";
  }

  renderNodeAsHtml(node: ParseNode): string {
    let html = "";
    if (node instanceof TypeGenericNode) {
      const generics = node.generic?.renderAsHtml();
      const chopped = generics?.substring(22, generics.length - 4);
      html =
        node.simpleType?.renderAsHtml() +
        `<el-punc>[</el-punc><el-type>${chopped}</el-type><el-punc>]</el-punc>`;
    } else if (node instanceof ParamDefNode) {
      html = node.name?.renderAsHtml() + ": " + node.type?.renderAsHtml();
    } else if (node instanceof BinaryOperation) {
      const open = node.keyword ? "<el-kw>" : "";
      const close = node.keyword ? "</el-kw>" : "";
      let text = node.matchedText.trim();
      if (text === "is") {
        text = " == ";
      } else if (text === "isnt") {
        text = " != ";
      } else {
        text = node.renderAsElanSource();
      }
      html = `${open}${text}${close}`;
    } else if (node instanceof InheritanceNode) {
      html =
        node.matchedText.length > 0
          ? `<el-punc>(</el-punc>${node.typeList?.renderAsHtml()}<el-punc>)</el-punc>`
          : ``;
    }
    return html;
  }

  // Not yet used - for illustration only
  grammarForNode(node: ParseNode): string {
    let grammar = "";
    if (node instanceof ParamDefNode) {
      grammar = "name COLON SPACE type";
    } else if (node instanceof BinaryOperation) {
      grammar = "EQ | NE | LT | GT | LE | GE | PLUS | MINUS "; // etc
    } else if (node instanceof TypeGenericNode) {
      grammar = "OPEN_SQ_BRACKET type CLOSE_SQ_BRACKET";
    }
    // etc
    return grammar;
  }

  // Not yet used - for illustration only
  lexer(): string {
    return `
EQ:           '==';
NE:           '!=';
`; //etc
  }

  private defKeyword = "def";
  private classKeyword = "class";
  private elifKeyword = "elif";
  private elseKeyword = "else";
  private exceptKeyword = "else";
  private forKeyword = "for";
  private ifKeyword = "if";
  private inKeyword = "in";
  private noneKeyword = "none";
  private raiseKeyword = "raise";
  private returnKeyword = "return";
  private selfKeyword = "self";
  private tryKeyword = "try";
  private whileKeyword = "while";

  private hash = "#";
}
