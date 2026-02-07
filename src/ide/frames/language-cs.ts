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
import { InheritanceNode } from "./parse-nodes/inheritanceNode";
import { ParamDefNode } from "./parse-nodes/param-def-node";
import { Space } from "./parse-nodes/parse-node-helpers";
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
import { ReturnStatement } from "./statements/return-statement";
import { SetStatement } from "./statements/set-statement";
import { Throw } from "./statements/throw";
import { TryStatement } from "./statements/try";
import { VariableStatement } from "./statements/variable-statement";
import { While } from "./statements/while";
import { TokenType } from "./symbol-completion-helpers";

export class LanguageCS implements Language {
  commentRegex(): RegExp {
    return /\/\/ [^\r\n]*/;
  }
  languageFullName: string = "C#";

  annotation(frame: Frame): string {
    let annotation = "";
    if (
      frame instanceof VariableStatement ||
      frame instanceof ProcedureFrame ||
      frame instanceof FunctionFrame ||
      frame instanceof CallStatement ||
      frame instanceof SetStatement
    ) {
      annotation = frame.frameSpecificAnnotation();
    }
    return annotation;
  }

  renderSingleLineAsHtml(frame: Frame): string {
    let html = `Html not specified for this frame`;
    if (frame instanceof AssertStatement) {
      html = `<el-kw>assert </el-kw>${frame.actual.renderAsHtml()}<el-kw> is </el-kw>${frame.expected.renderAsHtml()}`;
    } else if (frame instanceof CallStatement) {
      html = `${frame.proc.renderAsHtml()}<el-punc>(</el-punc>${frame.args.renderAsHtml()}<el-punc>);</el-punc>`;
    } else if (frame instanceof CatchStatement) {
      html = `<el-kw>${this.CATCH} <el-punc>(</el-punc><el-type>Exception</el-type>${frame.variable.renderAsHtml()}<el-punc>) {</el-punc>`;
    } else if (frame instanceof CommentStatement) {
      html = `<el-kw>${this.COMMENT_MARKER} </el-kw>${frame.text.renderAsHtml()}`;
    } else if (frame instanceof ConstantGlobal) {
      // special case because the </el-top> needs to be placed part way through the line
      html = `<el-kw>${this.CONST} </el-kw>${frame.name.renderAsHtml()}</el-top><el-punc> = </el-punc>${frame.value.renderAsHtml()}`;
    } else if (frame instanceof Elif) {
      html = `<el-punc>} </el-punc><el-kw>${this.ELSE} ${this.IF} </el-kw><el-punc>(</el-punc>${frame.condition.renderAsHtml()}<el-punc>) {</el-punc>`;
    } else if (frame instanceof Else) {
      html = `<el-punc>} </el-punc><el-kw>${this.ELSE}<el-punc> {</el-punc>`;
    } else if (frame instanceof Enum) {
      html = `<el-kw>${this.ENUM} </el-kw>${frame.name.renderAsHtml()} ${frame.values.renderAsHtml()}`;
    } else if (frame instanceof GlobalComment) {
      html = `<el-kw>${this.COMMENT_MARKER} </el-kw>${frame.text.renderAsHtml()}`;
    } else if (frame instanceof ConstantStatement) {
      html = `<el-kw>${this.CONST} </el-kw>${frame.name.renderAsHtml()}<el-punc> = </el-punc>${frame.expr.renderAsHtml()}<el-punc>;</el-punc>`;
    } else if (frame instanceof Property) {
      html = `${modifierAsHtml(frame)} ${frame.type.renderAsHtml()} </el-kw>${frame.name.renderAsHtml()}<el-punc>;</el-punc>`;
    } else if (frame instanceof ReturnStatement) {
      html = `<el-kw>${this.RETURN} </el-kw>${frame.expr.renderAsHtml()}`;
    } else if (frame instanceof SetStatement) {
      html = `${frame.assignable.renderAsHtml()}<el-kw><el-punc> = </el-punc></el-kw>${frame.expr.renderAsHtml()}<el-punc>;</el-punc>`;
    } else if (frame instanceof Throw) {
      html = `<el-kw>${this.THROW} <el-type>Exception</el-type> </el-kw>${frame.text.renderAsHtml()}`;
    } else if (frame instanceof VariableStatement) {
      html = `<el-kw>${this.VAR} </el-kw>${frame.name.renderAsHtml()}<el-punc> = </el-punc>${frame.expr.renderAsHtml()}<el-punc>;</el-punc>`;
    } else if (frame instanceof AbstractFunction) {
      html = `<el-kw>${this.ABSTRACT} </el-kw>${frame.returnType.renderAsHtml()} <el-method>${frame.name.renderAsHtml()}</el-method><el-punc>(</el-punc>${frame.params.renderAsHtml()}<el-punc>) ;</el-punc>`;
    } else if (frame instanceof AbstractProcedure) {
      html = `<el-kw>${this.ABSTRACT} ${this.VOID} </el-kw><el-method>${frame.name.renderAsHtml()}</el-method><el-punc>(</el-punc>${frame.params.renderAsHtml()}<el-punc>) ;</el-punc>`;
    } else if (frame instanceof AbstractProperty) {
      html = `<el-kw>${this.ABSTRACT} </el-kw>${frame.type.renderAsHtml()} <el-id>${frame.name.renderAsHtml()}</el-id><el-punc>;</el-punc>`;
    }
    return html;
  }

  renderTopAsHtml(frame: Frame): string {
    let html = `Html not specified for this frame`;
    if (frame instanceof AbstractClass) {
      html = `<el-kw>${this.ABSTRACT} ${this.CLASS} </el-kw>${frame.name.renderAsHtml()} ${frame.inheritanceAsHtml()}`;
    } else if (frame instanceof ConcreteClass) {
      html = `<el-kw>${this.CLASS} </el-kw>${frame.name.renderAsHtml()} ${frame.inheritanceAsHtml()}`;
    } else if (frame instanceof Constructor) {
      html = `TODO`;
    } else if (frame instanceof Each) {
      html = `<el-kw>${this.FOREACH} </el-kw></el-kw><el-punc>(</el-punc>${frame.variable.renderAsHtml()}<el-kw> ${this.IN} </el-kw>${frame.iter.renderAsHtml()}</el-kw><el-punc>) {</el-punc>`;
    } else if (frame instanceof For) {
      const v = frame.variable.renderAsHtml();
      html = `<el-kw>${this.FOR} </el-kw><el-punc>(</el-punc>${v}<el-punc> = </el-punc>${frame.from.renderAsHtml()}<el-punc>; </el-punc>${v} <el-punc>&lt;=</el-punc>${frame.to.renderAsHtml()}<el-punc>; </el-punc>${v}<el-punc> = </el-punc>${v}<el-punc> + </el-punc>${frame.step.renderAsHtml()}<el-punc>) {</el-punc>`;
    } else if (frame instanceof FunctionMethod) {
      html = `${modifierAsHtml(frame)} ${frame.returnType.renderAsHtml()} ${frame.name.renderAsHtml()}<el-punc>(</el-punc>${frame.params.renderAsHtml()}<el-punc>) {</el-punc>`;
    } else if (frame instanceof GlobalFunction) {
      html = `${frame.returnType.renderAsHtml()} ${frame.name.renderAsHtml()}<el-punc>(</el-punc>${frame.params.renderAsHtml()}<el-punc>) {</el-punc>`;
    } else if (frame instanceof GlobalProcedure) {
      html = `<el-kw>${this.VOID} </el-kw>${frame.name.renderAsHtml()}<el-punc>(</el-punc>${frame.params.renderAsHtml()}<el-punc>) {</el-punc>`;
    } else if (frame instanceof IfStatement) {
      html = `<el-kw>${this.IF} </el-kw><el-punc>(</el-punc>${frame.condition.renderAsHtml()}<el-punc>) {</el-punc>`;
    } else if (frame instanceof InterfaceFrame) {
      html = `<el-kw>${this.INTERFACE} </el-kw>${frame.name.renderAsHtml()} ${frame.inheritanceAsHtml()}`;
    } else if (frame instanceof MainFrame) {
      html = `<el-kw>${this.VOID}</el-kw> <el-method>main</el-method><el-punc>() {</el-punc>`;
    } else if (frame instanceof ProcedureMethod) {
      html = `${modifierAsHtml(frame)}<el-kw>${this.VOID} </el-kw>${frame.name.renderAsHtml()}<el-punc>(</el-punc>${frame.params.renderAsHtml()}<el-punc>) {</el-punc>`;
    } else if (frame instanceof RecordFrame) {
      html = `<el-kw>${this.CLASS} </el-kw>${frame.name.renderAsHtml()}`;
    } else if (frame instanceof TestFrame) {
      html = `<el-kw>${this.VOID} </el-kw>${frame.testName.renderAsHtml()}<el-punc>() {</el-punc>`;
    } else if (frame instanceof TryStatement) {
      html = `<el-kw>${this.TRY}</el-kw><el-punc> {</el-punc>`;
    } else if (frame instanceof While) {
      html = `<el-kw>${this.WHILE}<el-punc> (</el-punc></el-kw>${frame.condition.renderAsHtml()}<el-punc>) {</el-punc>`;
    }
    return html;
  }

  renderBottomAsHtml(frame: Frame): string {
    return frame ? `<el-punc>}<el-punc>` : ``;
  }

  renderNodeAsHtml(node: ParseNode): string {
    let html = ""; // If "" returned the node will use its own generic implementation
    if (node instanceof TypeGenericNode) {
      const generics = node.genericTypes?.renderAsHtml();
      const chopped = generics?.substring(22, generics.length - 4);
      html =
        node.simpleType?.renderAsHtml() +
        `<el-punc>&lt;</el-punc><el-type>${chopped}</el-type><el-punc>&gt;</el-punc>`;
    } else if (node instanceof ParamDefNode) {
      html = `${node.type?.renderAsHtml()} ${node.name?.renderAsHtml()}`;
    } else if (node instanceof BinaryOperation) {
      const open = node.keyword ? "<el-kw>" : "";
      const close = node.keyword ? "</el-kw>" : "";
      let text = node.matchedText.trim();
      if (text === "is") {
        text = this.spaced(this.EQUAL);
      } else if (text === "isnt") {
        text = this.spaced(this.NOT_EQUAL);
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
    } else if (node instanceof InheritanceNode) {
      html =
        node.matchedText.length > 0
          ? `<el-kw>${this.INHERITS} ${node.typeList?.renderAsHtml()}`
          : ``;
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

  private spaced(text: string): string {
    return ` ${text} `;
  }

  private ABSTRACT = "abstract";
  private CATCH = "catch";
  private CLASS = "class";
  private CONST = "const";
  private FOREACH = "foreach";
  private ELSE = "else";
  private ENUM = "enum";
  private FOR = "for";
  private IF = "if";
  private IN = "in";
  private INHERITS = "inherits";
  private INTERFACE = "interface";
  private NEW = "new";
  private PRIVATE = "private";
  private RETURN = "return";
  private STATIC = "static";
  private thisKeyword = "this";
  private THROW = "throw";
  private TRY = "try";
  private VAR = "var";
  private VOID = "void";
  private WHILE = "while";

  POWER: string = "^";
  EQUAL: string = "==";
  NOT_EQUAL: string = "!=";
  MOD = "%";
  AND = "&&";
  OR = "||";
  NOT = "!";

  COMMENT_MARKER = "//";

  INT_NAME: string = "int";
  FLOAT_NAME: string = "double";
  BOOL_NAME: string = "bool";
  STRING_NAME: string = "string";

  parseParamDefNode(node: ParamDefNode, text: string): boolean {
    node.type = new TypeNode(
      node.file,
      new Set<TokenType>([
        TokenType.type_concrete,
        TokenType.type_abstract,
        TokenType.type_notInheritable,
      ]),
    );
    node.addElement(node.type);
    node.addElement(new SpaceNode(node.file, Space.required));
    node.name = new IdentifierNode(node.file);
    node.addElement(node.name);
    return text ? true : true;
  }
}
