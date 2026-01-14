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
import { ConstantGlobal } from "./globals/constant-global";
import { Enum } from "./globals/enum";
import { FunctionFrame } from "./globals/function-frame";
import { GlobalComment } from "./globals/global-comment";
import { GlobalFunction } from "./globals/global-function";
import { GlobalProcedure } from "./globals/global-procedure";
import { InterfaceFrame } from "./globals/interface-frame";
import { MainFrame } from "./globals/main-frame";
import { ProcedureFrame } from "./globals/procedure-frame";
import { RecordFrame } from "./globals/record-frame";
import { TestFrame } from "./globals/test-frame";
import { BinaryOperation } from "./parse-nodes/binary-operation";
import { IdentifierNode } from "./parse-nodes/identifier-node";
import { IndexDouble } from "./parse-nodes/index-double";
import { InheritanceNode } from "./parse-nodes/inheritanceNode";
import { ParamDefNode } from "./parse-nodes/param-def-node";
import { Space } from "./parse-nodes/parse-node-helpers";
import { PunctuationNode } from "./parse-nodes/punctuation-node";
import { SpaceNode } from "./parse-nodes/space-node";
import { TypeGenericNode } from "./parse-nodes/type-generic-node";
import { TypeNode } from "./parse-nodes/type-node";
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
import { TokenType } from "./symbol-completion-helpers";
import { COLON } from "./symbols";

export class LanguagePython implements Language {
  commentRegex(): RegExp {
    return /# [^\r\n]*/;
  }
  languageFullName: string = "Python";

  annotation(frame: Frame): string {
    let annotation = "";
    if (
      frame instanceof VariableStatement ||
      frame instanceof ConstantGlobal ||
      frame instanceof ConstantStatement ||
      frame instanceof FunctionFrame ||
      frame instanceof ProcedureFrame ||
      frame instanceof CallStatement ||
      frame instanceof SetStatement
    ) {
      annotation = frame.frameSpecificAnnotation();
    }
    return annotation;
  }

  commentMarker(): string {
    return this.HASH;
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
      html = `${this.EXCEPT}<el-punc>:</el-punc>`;
    } else if (frame instanceof CommentStatement) {
      html = `<el-kw>${this.HASH} </el-kw>${frame.text.renderAsHtml()}`;
    } else if (frame instanceof ConstantGlobal) {
      html = `${frame.name.renderAsHtml()}<el-punc> = </el-punc>${frame.value.renderAsHtml()}`;
    } else if (frame instanceof Elif) {
      html = `<el-kw>${this.ELIF} </el-kw>${frame.condition.renderAsHtml()}<el-punc>:</el-punc>`;
    } else if (frame instanceof Else) {
      html = `<el-kw>${this.ELSE}</el-kw><el-punc>:</el-punc>`;
    } else if (frame instanceof Enum) {
      html = `${frame.name.renderAsHtml()} = <el-type>Enum</el-type>('${frame.name.renderAsHtml()}', '${frame.values.renderAsHtml()}')`;
    } else if (frame instanceof GlobalComment) {
      html = `<el-kw>${this.HASH} </el-kw>${frame.text.renderAsHtml()}`;
    } else if (frame instanceof ConstantStatement) {
      html = `${frame.name.renderAsHtml()}<el-punc> = </el-punc>${frame.expr.renderAsHtml()}`;
    } else if (frame instanceof Print) {
      html = `<el-method>print</el-method><el-punc>(</el-punc>${frame.expr.renderAsHtml()}<el-punc>)</el-punc>`;
    } else if (frame instanceof Property) {
      html = `${frame.name.renderAsHtml()}: ${frame.type.renderAsHtml()} = <el-kw>${this.NONE}</el-kw>`;
    } else if (frame instanceof ReturnStatement) {
      html = `<el-kw>${this.RETURN} </el-kw>${frame.expr.renderAsHtml()}`;
    } else if (frame instanceof SetStatement) {
      html = `${frame.assignable.renderAsHtml()}<el-punc> = </el-punc>${frame.expr.renderAsHtml()}`;
    } else if (frame instanceof Throw) {
      html = `<el-kw>${this.RAISE}</el-kw><el-punc>("</el-punc>${frame.text.renderAsHtml()}<el-punc>")</el-punc>`;
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
      source = `${this.EXCEPT}<el-punc>:</el-punc>`;
    } else if (frame instanceof CommentStatement) {
      source = `<el-kw>${this.HASH} </el-kw>${frame.text.renderAsExport()}`;
    } else if (frame instanceof ConstantGlobal) {
      source = `${frame.name.renderAsExport()}<el-punc> = </el-punc>${frame.value.renderAsExport()}`;
    } else if (frame instanceof Elif) {
      source = `<el-kw>${this.ELIF} </el-kw>${frame.condition.renderAsExport()}<el-punc>:</el-punc>`;
    } else if (frame instanceof Else) {
      source = `<el-kw>${this.ELSE}</el-kw><el-punc>:</el-punc>`;
    } else if (frame instanceof Enum) {
      source = `${frame.name.renderAsExport()} = <el-type>Enum</el-type>('${frame.name.renderAsExport()}', '${frame.values.renderAsExport()}')`;
    } else if (frame instanceof GlobalComment) {
      source = `<el-kw>${this.HASH} </el-kw>${frame.text.renderAsExport()}`;
    } else if (frame instanceof ConstantStatement) {
      source = `${frame.name.renderAsExport()}<el-punc> = </el-punc>${frame.expr.renderAsExport()}`;
    } else if (frame instanceof Print) {
      source = `<el-method>print</el-method><el-punc>(</el-punc>${frame.expr.renderAsExport()}<el-punc>)</el-punc>`;
    } else if (frame instanceof Property) {
      source = `${frame.name.renderAsExport()}: ${frame.type.renderAsExport()} = <el-kw>${this.NONE}</el-kw>`;
    } else if (frame instanceof ReturnStatement) {
      source = `<el-kw>${this.RETURN} </el-kw>${frame.expr.renderAsExport()}`;
    } else if (frame instanceof SetStatement) {
      source = `${frame.assignable.renderAsExport()}<el-punc> = </el-punc>${frame.expr.renderAsExport()}`;
    } else if (frame instanceof Throw) {
      source = `<el-kw>${this.RAISE}</el-kw><el-punc>("</el-punc>${frame.text.renderAsExport()}<el-punc>")</el-punc>`;
    } else if (frame instanceof VariableStatement) {
      source = `${frame.name.renderAsExport()}<el-punc> = </el-punc>${frame.expr.renderAsExport()}`;
    }
    return source;
  }

  renderTopAsHtml(frame: Frame): string {
    let html = `Html not specified for ${typeof frame}`;
    if (frame instanceof AbstractClass) {
      html = `<el-kw>${this.CLASS} </el-kw><el-type>${frame.name.renderAsHtml()}</el-type>${frame.inheritanceAsHtml()}`;
    } else if (frame instanceof ConcreteClass) {
      html = `<el-kw>${this.CLASS} </el-kw><el-type>${frame.name.renderAsHtml()}</el-type>${frame.inheritanceAsHtml()}`;
    } else if (frame instanceof Constructor) {
      html = `<el-kw>${this.DEF} </el-kw><el-punc>(</el-punc><el-kw>${this.SELF}</el-kw>: ${selfType(frame)},${frame.params.renderAsHtml()}<el-punc>):</el-punc> <el-kw>none</el-kw>`;
    } else if (frame instanceof Each) {
      html = `<el-kw>${this.FOR} </el-kw>${frame.variable.renderAsHtml()}<el-kw> ${this.IN} </el-kw>${frame.iter.renderAsHtml()}<el-punc>:</el-punc>`;
    } else if (frame instanceof Enum) {
      html = ``;
    } else if (frame instanceof For) {
      html = `<el-kw>${this.FOR} </el-kw>${frame.variable.renderAsHtml()}<el-kw> ${this.IN} </el-kw><el-method>range</el-method>(${frame.from.renderAsHtml()}, ${frame.to.renderAsHtml()}, ${frame.step.renderAsHtml()})<el-punc>:</el-punc>`;
    } else if (frame instanceof FunctionMethod) {
      html = `<el-kw>${this.DEF} </el-kw>${frame.name.renderAsHtml()}<el-punc>(</el-punc>${this.SELF}<el-punc>: </el-punc>${selfType(frame)}<el-punc>, </el-punc>${frame.params.renderAsHtml()}<el-punc>) -> </el-punc>${frame.returnType.renderAsHtml()}<el-punc>:</el-punc>`;
    } else if (frame instanceof GlobalFunction) {
      html = `<el-kw>${this.DEF} </el-kw>${frame.name.renderAsHtml()}<el-punc>(</el-punc>${frame.params.renderAsHtml()}<el-punc>) -> </el-punc>${frame.returnType.renderAsHtml()}<el-punc>:</el-punc>`;
    } else if (frame instanceof GlobalProcedure) {
      html = `<el-kw>${this.DEF} </el-kw>${frame.name.renderAsHtml()}<el-punc>(</el-punc>${frame.params.renderAsHtml()}<el-punc>) -> <el-punc><el-kw>${this.NONE}</el-kw></el-punc><el-punc>:</el-punc>`;
    } else if (frame instanceof IfStatement) {
      html = `<el-kw>${this.IF} </el-kw>${frame.condition.renderAsHtml()}<el-punc>:</el-punc>`;
    } else if (frame instanceof InterfaceFrame) {
      html = `<el-kw>${this.CLASS} </el-kw><el-type>${frame.name.renderAsHtml()}</el-type>${frame.inheritanceAsHtml()}`;
    } else if (frame instanceof MainFrame) {
      html = `<el-kw>${this.DEF} </el-kw><el-method>main</el-method>(): <el-kw>${this.NONE}</el-kw><el-punc>:</el-punc>`;
    } else if (frame instanceof ProcedureMethod) {
      html = `<el-kw>${this.DEF} </el-kw>${frame.name.renderAsHtml()}<el-punc>(</el-punc><el-kw>${this.SELF}</el-kw><el-punc>: </el-punc>${selfType(frame)}<el-punc>, </el-punc>${frame.params.renderAsHtml()}<el-punc>) -> </el-punc><el-kw>${this.NONE}</el-kw><el-punc>:</el-punc>`;
    } else if (frame instanceof Property) {
      html = ``;
    } else if (frame instanceof RecordFrame) {
      html = `<el-kw>${this.CLASS} </el-kw><el-type>${frame.name.renderAsHtml()}</el-type>`;
    } else if (frame instanceof TestFrame) {
      html = `<el-kw>${this.DEF} </el-kw> <el-method>${frame.testName.renderAsElanSource()}</el-method><el-punc>()-> </el-punc><el-kw>${this.NONE}</el-kw><el-punc>:</el-punc>`;
    } else if (frame instanceof TryStatement) {
      html = `${this.TRY}<el-punc>:</el-punc>`;
    } else if (frame instanceof While) {
      html = `<el-kw>${this.WHILE} </el-kw>${frame.condition.renderAsHtml()}<el-punc>:</el-punc>`;
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
      const simpleType = node.simpleType?.renderAsHtml();
      const generics = node.generic?.renderAsHtml();
      html = `${simpleType}${generics}`;
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
      } else if (text === "mod") {
        text = " % ";
      } else {
        text = node.renderAsElanSource();
      }
      html = `${open}${text}${close}`;
    } else if (node instanceof InheritanceNode) {
      html =
        node.matchedText.length > 0
          ? `<el-punc>(</el-punc>${node.typeList?.renderAsHtml()}<el-punc>)</el-punc>`
          : ``;
    } else if (node instanceof IndexDouble) {
      html = `<el-punc>[</el-punc>${node.index1?.renderAsHtml()}<el-punc>][</el-punc>${node.index2?.renderAsHtml()}<el-punc>]</el-punc>`;
    }
    return html;
  }

  parseText(node: ParseNode, text: string): boolean {
    let result = false;
    if (node instanceof ParamDefNode) {
      result = this.parseParamDefNode(node, text);
    }
    return result;
  }

  private DEF = "def";
  private CLASS = "class";
  private ELIF = "elif";
  private ELSE = "else";
  private EXCEPT = "EXCEPT";
  private FOR = "for";
  private IF = "if";
  private IN = "in";
  private NONE = "None";
  private RAISE = "raise";
  private RETURN = "return";
  private SELF = "self";
  private TRY = "try";
  private WHILE = "while";

  private OPEN_SQUARE_BRACKET = "[";
  private CLOSE_SQUARE_BRACKET = "]";
  private HASH = "#";

  parseParamDefNode(node: ParamDefNode, text: string): boolean {
    node.name = new IdentifierNode(node.file);
    node.addElement(node.name);
    node.addElement(new PunctuationNode(node.file, COLON));
    node.addElement(new SpaceNode(node.file, Space.required));
    node.type = new TypeNode(
      node.file,
      new Set<TokenType>([
        TokenType.type_concrete,
        TokenType.type_abstract,
        TokenType.type_notInheritable,
      ]),
    );
    node.addElement(node.type);
    return text ? true : true;
  }



}
