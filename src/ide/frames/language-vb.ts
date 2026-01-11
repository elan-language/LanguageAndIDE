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
    return this.singleQuote;
  }
  renderSingleLineAsHtml(frame: Frame): string {
    let html = `Html not specified for this frame`;
    if (frame instanceof AssertStatement) {
      html = `<el-kw>assert </el-kw>${frame.actual.renderAsHtml()}<el-kw> is </el-kw>${frame.expected.renderAsHtml()}`;
    } else if (frame instanceof CallStatement) {
      html = `${frame.proc.renderAsHtml()}<el-punc>(</el-punc>${frame.args.renderAsHtml()}<el-punc>)<el-punc>`;
    } else if (frame instanceof CatchStatement) {
      html = `<el-kw>${this.catchKeyword} ${this.exceptionKeyword} ${this.inKeyword} </el-kw>${frame.variable.renderAsHtml()}`;
    } else if (frame instanceof CommentStatement) {
      html = `<el-kw>${this.singleQuote} </el-kw>${frame.text.renderAsHtml()}`;
    } else if (frame instanceof Constant) {
      // special case because the </el-top> needs to be placed part way through the line
      html = `<el-kw>${this.constKeyword} </el-kw>${frame.name.renderAsHtml()}<el-kw> ${this.asKeyword} </el-kw><el-type>??? </el-type></el-top><el-punc> = </el-punc>${frame.value.renderAsHtml()}`;
    } else if (frame instanceof Elif) {
      html = `<el-kw>${this.elseIfKeyword} </el-kw>${frame.condition.renderAsHtml()}<el-kw> ${this.thenKeyword}`;
    } else if (frame instanceof Else) {
      html = `<el-kw>${this.elseKeyword}`;
    } else if (frame instanceof Enum) {
      html = `<el-kw>${this.enumKeyword} </el-kw>${frame.name.renderAsHtml()} ${frame.values.renderAsHtml()}`;
    } else if (frame instanceof GlobalComment) {
      html = `<el-kw>${this.singleQuote} </el-kw>${frame.text.renderAsHtml()}`;
    } else if (frame instanceof LetStatement) {
      html = `${frame.name.renderAsHtml()}<el-punc> = </el-punc>${frame.expr.renderAsHtml()}`;
    } else if (frame instanceof Print) {
      html = `TODO`;
    } else if (frame instanceof Property) {
      html = `${modifierAsHtml(frame)}<el-kw>${this.propertyKeyword} </el-kw>${frame.name.renderAsHtml()}<el-kw> ${this.asKeyword} </el-kw>${frame.type.renderAsHtml()}`;
    } else if (frame instanceof ReturnStatement) {
      html = `<el-kw>${this.returnKeyword} </el-kw>${frame.expr.renderAsHtml()}`;
    } else if (frame instanceof SetStatement) {
      html = `${frame.assignable.renderAsHtml()}<el-punc> = </el-punc>${frame.expr.renderAsHtml()}`;
    } else if (frame instanceof Throw) {
      html = `<el-kw>${this.throwKeyword} ${this.exceptionKeyword} </el-kw>${frame.text.renderAsHtml()}`;
    } else if (frame instanceof VariableStatement) {
      html = `<el-kw>${this.dimKeyword} </el-kw>${frame.name.renderAsHtml()}<el-kw><el-punc> = </el-punc></el-kw>${frame.expr.renderAsHtml()}`;
    } else if (frame instanceof AbstractFunction) {
      html = `<el-kw>${this.abstractKeyword} ${this.functionKeyword} </el-kw><el-method>${frame.name.renderAsHtml()}</el-method><el-punc>(</el-punc>${frame.params.renderAsHtml()}<el-punc>)</el-punc><el-kw> ${this.asKeyword} </el-kw>${frame.returnType.renderAsHtml()}`;
    } else if (frame instanceof AbstractProcedure) {
      html = `<el-kw>${this.abstractKeyword} ${this.subKeyword} </el-kw><el-method>${frame.name.renderAsHtml()}</el-method><el-punc>(</el-punc>${frame.params.renderAsHtml()}<el-punc>)</el-punc>`;
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
      html = `<el-kw>${this.abstractKeyword} ${this.classKeyword} </el-kw>${frame.name.renderAsHtml()} ${frame.inheritanceAsHtml()}`;
    } else if (frame instanceof ConcreteClass) {
      html = `<el-kw>${this.classKeyword} </el-kw>${frame.name.renderAsHtml()} ${frame.inheritanceAsHtml()}`;
    } else if (frame instanceof Constructor) {
      html = `<el-kw>${this.publicKeyword} ${this.subKeyword} ${this.newKeyword}</el-kw><el-punc>(</el-punc>${frame.params.renderAsHtml()}<el-punc>)</el-punc>`;
    } else if (frame instanceof Each) {
      html = `<el-kw>${this.forKeyword} ${this.eachKeyword} </el-kw>${frame.variable.renderAsHtml()}<el-kw> ${this.inKeyword} </el-kw>${frame.iter.renderAsHtml()}`;
    } else if (frame instanceof For) {
      html = `<el-kw>${this.forKeyword} </el-kw>${frame.variable.renderAsHtml()}<el-punc> = </el-punc>${frame.from.renderAsHtml()}<el-kw> ${this.toKeyword} </el-kw>${frame.to.renderAsHtml()}<el-kw> ${this.stepKeyword} </el-kw>${frame.step.renderAsHtml()}`;
    } else if (frame instanceof FunctionMethod) {
      html = `${modifierAsHtml(frame)}<el-kw>${this.functionKeyword} </el-kw>${frame.name.renderAsHtml()}<el-punc>(</el-punc>${frame.params.renderAsHtml()}<el-punc>)</el-punc><el-kw> ${this.asKeyword} </el-kw>${frame.returnType.renderAsHtml()}`;
    } else if (frame instanceof GlobalFunction) {
      html = `<el-kw>${this.functionKeyword} </el-kw>${frame.name.renderAsHtml()}<el-punc>(</el-punc>${frame.params.renderAsHtml()}<el-punc>)</el-punc><el-kw> ${this.asKeyword} </el-kw>${frame.returnType.renderAsHtml()}`;
    } else if (frame instanceof GlobalProcedure) {
      html = `<el-kw>${this.subKeyword} </el-kw>${frame.name.renderAsHtml()}<el-punc>(</el-punc>${frame.params.renderAsHtml()}<el-punc>)</el-punc>`;
    } else if (frame instanceof IfStatement) {
      html = `<el-kw>${this.ifKeyword} </el-kw>${frame.condition.renderAsHtml()}<el-kw> ${this.thenKeyword}</el-kw>`;
    } else if (frame instanceof InterfaceFrame) {
      html = `<el-kw>${this.interfaceKeyword} </el-kw>${frame.name.renderAsHtml()} ${frame.inheritanceAsHtml()}`;
    } else if (frame instanceof MainFrame) {
      html = `<el-kw>${this.subKeyword}</el-kw> <el-method>main</el-method><el-punc>()</el-punc>`;
    } else if (frame instanceof ProcedureMethod) {
      html = `${modifierAsHtml(frame)}<el-kw>${this.subKeyword} </el-kw>${frame.name.renderAsHtml()}<el-punc>(</el-punc>${frame.params.renderAsHtml()}<el-punc>)</el-punc>`;
    } else if (frame instanceof RecordFrame) {
      html = `<el-kw>${this.classKeyword} </el-kw>${frame.name.renderAsHtml()}`;
    } else if (frame instanceof TestFrame) {
      html = `<el-kw>${this.subKeyword} </el-kw>${frame.testName.renderAsHtml()}`;
    } else if (frame instanceof TryStatement) {
      html = `<el-kw>${this.tryKeyword} </el-kw>`;
    } else if (frame instanceof While) {
      html = `<el-kw>${this.whileKeyword} </el-kw>${frame.condition.renderAsHtml()}`;
    }
    return html;
  }

  renderTopAsExport(frame: Frame): string {
    return frame ? "" : ""; // TODO
  }

  renderBottomAsHtml(frame: Frame): string {
    let html = `Html not specified for this frame`;
    if (frame instanceof AbstractClass) {
      html = `<el-kw>${this.endKeyword} ${this.classKeyword}`;
    } else if (frame instanceof ConcreteClass) {
      html = `<el-kw>${this.endKeyword} ${this.classKeyword}`;
    } else if (frame instanceof Constructor) {
      html = `<el-kw>${this.endKeyword} ${this.subKeyword}`;
    } else if (frame instanceof Each) {
      html = `<el-kw>${this.endKeyword} ${this.nextKeyword}`;
    } else if (frame instanceof For) {
      html = `<el-kw>${this.endKeyword} ${this.nextKeyword}`;
    } else if (frame instanceof FunctionMethod) {
      html = `<el-kw>${this.endKeyword} ${this.functionKeyword}`;
    } else if (frame instanceof GlobalFunction) {
      html = `<el-kw>${this.endKeyword} ${this.functionKeyword}`;
    } else if (frame instanceof GlobalProcedure) {
      html = `<el-kw>${this.endKeyword} ${this.subKeyword}`;
    } else if (frame instanceof IfStatement) {
      html = `<el-kw>${this.endKeyword} ${this.ifKeyword}`;
    } else if (frame instanceof InterfaceFrame) {
      html = `<el-kw>${this.endKeyword} ${this.interfaceKeyword}`;
    } else if (frame instanceof MainFrame) {
      html = `<el-kw>${this.endKeyword} ${this.subKeyword}`;
    } else if (frame instanceof ProcedureMethod) {
      html = `<el-kw>${this.endKeyword} ${this.subKeyword}`;
    } else if (frame instanceof RecordFrame) {
      html = `<el-kw>${this.endKeyword} ${this.classKeyword}`;
    } else if (frame instanceof TestFrame) {
      html = `<el-kw>${this.endKeyword} ${this.subKeyword}`;
    } else if (frame instanceof TryStatement) {
      html = `<el-kw>${this.endKeyword} ${this.tryKeyword}`;
    } else if (frame instanceof While) {
      html = `<el-kw>${this.endKeyword} ${this.whileKeyword}`;
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
        `<el-punc>[</el-punc><el-type>${chopped}</el-type><el-punc>]</el-punc>`;
    } else if (node instanceof ParamDefNode) {
      html = `${node.name?.renderAsHtml()}<el-kw> ${this.asKeyword} </el-kw>${node.type?.renderAsHtml()}`;
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
    return node ? "" : "";
  }

  // Not yet used - for illustration only
  lexer(): string {
    return `
IS:           'is';
PLUS:         '+';
`; //etc.
  }

  private abstractKeyword = "abstract";
  private andKeyword = "and";
  private asKeyword = "As";
  private assertKeyword = "assert";
  private beKeyword = "be";
  private catchKeyword = "Catch";
  private classKeyword = "Class";
  private constKeyword = "Const";
  private constructorKeyword = "constructor";
  private copyKeyword = "copy";
  private dimKeyword = "Dim";
  private eachKeyword = "Each";
  private elseIfKeyword = "ElseIf";
  private elseKeyword = "Else";
  private emptyKeyword = "empty";
  private endKeyword = "End";
  private enumKeyword = "enum";
  private exceptionKeyword = "exception";
  private forKeyword = "For";
  private fromKeyword = "from";
  private functionKeyword = "Function";
  private globalKeyword = "global";
  private ifKeyword = "If";
  private imageKeyword = "image";
  private importKeyword = "import";
  private inKeyword = "In";
  private inheritsKeyword = "inherits";
  private interfaceKeyword = "Interface";
  private isKeyword = "is";
  private isntKeyword = "isnt";
  private lambdaKeyword = "lambda";
  private letKeyword = "let";
  private libraryKeyword = "library";
  private modKeyword = "mod";
  private newKeyword = "New";
  private nextKeyword = "Next";
  private notKeyword = "not";
  private ofKeyword = "of";
  private orKeyword = "or";
  private outKeyword = "out";
  private privateKeyword = "Private";
  private propertyKeyword = "property";
  private publicKeyword = "Public";
  private returnKeyword = "Return";
  private stepKeyword = "Step";
  private subKeyword = "Sub";
  private thenKeyword = "Then";
  private throwKeyword = "Throw";
  private toKeyword = "To";
  private tryKeyword = "Try";
  private tupleKeyword = "tuple";
  private whileKeyword = "While";
  private withKeyword = "with";

  private singleQuote = "'";
}
